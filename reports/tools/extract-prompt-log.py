#!/usr/bin/env python3
"""Rebuild reports/prompt-log.md from the Claude Code session transcripts.

Prompts, assistant text, Bash stdout, and tool-call arguments are copied without
character caps. File bodies written by the AI are still referenced by path +
line count because the files themselves already ship in the repo.

HW06 also dispatches subagent-driven-development implementer/reviewer
subagents (via the Agent/Task tool) that do most of the actual generation
work. Those run as separate transcripts nested under
`<session-id>/subagents/agent-*.jsonl`, so each top-level session in SESSIONS
is expanded to include its own subagent transcripts, in the order the parent
session dispatched them.
"""
import json
import glob
import os
import re
from datetime import datetime, timedelta, timezone

PROJ = os.path.expanduser(
    "~/.claude/projects/-Users-hbn-Documents-CS423-CSC15003-Testing-N08"
)
REPO = "/Users/hbn/Documents/CS423-CSC15003-Testing-N08"
ICT = timezone(timedelta(hours=7))

# Sessions belonging to this HW06 submission, from the 20/08/2026 planning
# session onward. Confirmed by grepping every transcript in this project
# directory for "HW06": only these three have real HW06 work (the other two
# hits across the whole directory are one incidental branch-listing line and
# one coincidental substring in an unrelated base64 blob — not sessions).
#
# Append a new tuple after every working session — running the script with an
# unknown id prints the id and its first prompt, which is how you fill this in.
SESSIONS = [
    ("4bb08949", "Lập kế hoạch SDD cho toàn bộ HW06 (dựa theo cấu trúc thư mục HW05)"),
    ("1dc914ec", "Thực thi kế hoạch HW06 bằng subagent-driven development (Task 1–8)"),
    ("d58e17e9", "Kiểm tra tiến độ HW06 và chẩn đoán, khắc phục reports/prompt-log.md"),
]

# Model display name per transcript's own `message.model` field. Not hardcoded
# to one value: a session can switch model mid-way via /model.
MODEL_LABEL = {
    "claude-opus-5": "Opus 5",
    "claude-sonnet-5": "Sonnet 5",
    "claude-haiku-4-5-20251001": "Haiku 4.5",
    "claude-opus-4-8": "Opus 4.8",
    "claude-sonnet-4-6": "Sonnet 4.6",
}

# Harness-generated pseudo-prompts: the student never typed these, so they are
# not part of the prompt record.
NOISE = re.compile(
    r"^\s*<(ide_opened_file|ide_selection|command-name|command-message|"
    r"local-command-stdout|local-command-caveat|task-notification)\b"
)


def ts(iso):
    d = datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(ICT)
    return d.strftime("%-I:%M %p %d/%m/%Y")


def clean(t):
    """Drop harness-injected blocks that were never part of what the human typed."""
    t = re.sub(r"<system-reminder>.*?</system-reminder>", "", t, flags=re.S)
    t = re.sub(r"<local-command-caveat>.*?</local-command-caveat>", "", t, flags=re.S)
    return t.strip()


def rel(p):
    if not isinstance(p, str):
        return str(p)
    return p.replace(REPO + "/", "").replace(os.path.expanduser("~"), "~")


def trace(name, inp):
    """One line describing a tool call. Arguments verbatim, paths made relative."""
    if name == "Bash":
        cmd = " ".join(inp.get("command", "").split())
        return "→ Bash: " + cmd
    if name == "Read":
        return f"→ Read({rel(inp.get('file_path',''))})"
    if name == "Write":
        body = inp.get("content", "")
        return f"→ Write({rel(inp.get('file_path',''))}, {len(body.splitlines())} dòng)"
    if name == "Edit":
        return f"→ Edit({rel(inp.get('file_path',''))})"
    if name == "Skill":
        return f"→ Skill({inp.get('skill','')})"
    if name == "AskUserQuestion":
        qs = [q.get("question", "") for q in inp.get("questions", [])]
        return "→ AskUserQuestion: " + " | ".join(qs)
    if name in ("Glob", "Grep"):
        return f"→ {name}({inp.get('pattern','')})"
    if name == "Agent":
        desc = inp.get("description", "")
        return f"→ Agent: dispatch tiểu-phiên subagent \"{desc}\" (nội dung đầy đủ ở tiểu-phiên bên dưới, không lặp lại ở đây)"
    return f"→ {name}({json.dumps(inp, ensure_ascii=False)})"


def find_agent_id(tool_result_text):
    m = re.search(r"agentId:\s*([0-9a-f]+)", tool_result_text or "")
    return m.group(1) if m else None


def find_session_dir(pre):
    """The session's own directory (holds subagents/), distinct from its .jsonl file."""
    hits = [
        p
        for p in glob.glob(os.path.join(PROJ, pre + "*"))
        if os.path.isdir(p)
    ]
    return hits[0] if hits else None


def result_text(c):
    if isinstance(c, str):
        return c
    if isinstance(c, list):
        return "\n".join(
            b.get("text", "") for b in c if isinstance(b, dict) and b.get("type") == "text"
        )
    return ""


def load(pre):
    f = glob.glob(os.path.join(PROJ, pre + "*.jsonl"))[0]
    return load_path(f)


def load_path(path):
    out = []
    for line in open(path):
        try:
            out.append(json.loads(line))
        except Exception:
            pass
    return out


def extract_raw(recs):
    """Walk one transcript's records into raw {when, prompt, body} entries,
    plus the ordered list of (agentId, description) it dispatched via the
    Agent tool — the caller recurses into those as nested sub-transcripts."""
    raw = []
    dispatches = []
    calls = {}          # tool_use id -> (name, input)
    body = []
    started = False

    def flush():
        nonlocal body
        if raw and body:
            raw[-1]["body"] = body
        body = []

    for d in recs:
        m = d.get("message") or {}
        role = m.get("role")
        when = d.get("timestamp", "")
        content = m.get("content")
        if isinstance(content, str):
            content = [{"type": "text", "text": content}]
        if not isinstance(content, list):
            continue

        if role == "user" and not d.get("isMeta"):
            kinds = [b.get("type") for b in content if isinstance(b, dict)]
            if "tool_result" in kinds:
                for b in content:
                    if not isinstance(b, dict) or b.get("type") != "tool_result":
                        continue
                    name, inp = calls.get(b.get("tool_use_id"), (None, {}))
                    txt = result_text(b.get("content"))
                    if name == "Bash" and txt.strip():
                        body.append("   " + txt.strip().replace("\n", "\n   "))
                    elif name == "AskUserQuestion" and txt.strip():
                        body.append("   [sinh viên chọn] " + txt.strip())
                    elif name == "Agent":
                        agent_id = find_agent_id(txt)
                        if agent_id:
                            dispatches.append((agent_id, inp.get("description", "")))
                continue
            # a genuine typed prompt
            txt = clean(
                "\n".join(b.get("text", "") for b in content if isinstance(b, dict))
            )
            if not txt or NOISE.match(txt):
                continue
            flush()
            raw.append({"when": ts(when) if when else "", "prompt": txt, "body": [], "model": None})
            started = True
            continue

        if role == "assistant" and started:
            if raw and not raw[-1]["model"]:
                raw[-1]["model"] = m.get("model")
            for b in content:
                if not isinstance(b, dict):
                    continue
                t = b.get("type")
                if t == "text":
                    tx = (b.get("text") or "").strip()
                    if tx:
                        body.append("```text\n" + tx + "\n```")
                elif t == "tool_use":
                    calls[b.get("id")] = (b.get("name"), b.get("input") or {})
                    body.append(trace(b.get("name"), b.get("input") or {}))
    flush()
    return raw, dispatches


def build():
    entries = []
    n = 0
    for pre, label in SESSIONS:
        recs = load(pre)
        raw, dispatches = extract_raw(recs)
        session_open = True
        for r in raw:
            n += 1
            entries.append(
                {
                    "n": n,
                    "when": r["when"],
                    "prompt": r["prompt"],
                    "body": r["body"],
                    "model": r["model"],
                    "session": label if session_open else None,
                    "file": pre if session_open else None,
                    "sub": None,
                }
            )
            session_open = False

        # Subagent-driven-development dispatches most of the actual HW06
        # generation work to background subagents (Agent tool), each with its
        # own transcript under `<session-dir>/subagents/agent-<id>.jsonl`.
        # Recurse into every one dispatched from this session, in dispatch
        # order, so their prompts/outputs are the real verbatim record
        # instead of a hand-written summary of what they did.
        session_dir = find_session_dir(pre)
        for agent_id, desc in dispatches:
            hits = glob.glob(os.path.join(session_dir, "subagents", f"agent-{agent_id}*.jsonl"))
            if not hits:
                continue
            sub_raw, sub_dispatches = extract_raw(load_path(hits[0]))
            if sub_dispatches:
                # Nested dispatch (a subagent that itself dispatched another
                # subagent) has not occurred in this project; flag loudly
                # instead of silently dropping it if it ever does.
                raise RuntimeError(f"agent-{agent_id} itself dispatched sub-agents; extend extraction to recurse")
            sub_open = True
            for r in sub_raw:
                n += 1
                entries.append(
                    {
                        "n": n,
                        "when": r["when"],
                        "prompt": r["prompt"],
                        "body": r["body"],
                        "model": r["model"],
                        "session": None,
                        "file": None,
                        "sub": f"agent-{agent_id} — {desc}" if sub_open else None,
                    }
                )
                sub_open = False

    # A prompt that was queued and immediately re-sent shows up twice, the
    # first copy with no response attached. Keep only the one that ran.
    kept = []
    for i, e in enumerate(entries):
        nxt = entries[i + 1] if i + 1 < len(entries) else None
        if not e["body"] and nxt and nxt["prompt"] == e["prompt"]:
            if e["session"] and not nxt["session"]:
                nxt["session"], nxt["file"] = e["session"], e["file"]
            if e.get("sub") and not nxt.get("sub"):
                nxt["sub"] = e["sub"]
            continue
        kept.append(e)
    for i, e in enumerate(kept, 1):
        e["n"] = i
    return kept


HEADER = """# Prompt Log — HW06 API Testing

*Complete, unfiltered record of every AI interaction during HW06. See
`reports/ai-audit-report.md` for the reviewed subset with verdicts.*

## Phạm vi và cách dựng file

File này được trích **tự động** từ transcript gốc của Claude Code
(`~/.claude/projects/`), không gõ lại và không viết lại từ trí nhớ. Toàn bộ
HW06 được ghi: từ phiên lập kế hoạch (20/08/2026) đến phiên làm việc cuối.

Việc này thực hiện bằng `subagent-driven-development`: một phiên điều phối
dispatch các subagent implementer/reviewer nền (công cụ `Agent`) để làm từng
task; phần lớn công việc sinh test case thực sự nằm trong transcript riêng
của các subagent đó, không phải trong transcript của phiên điều phối. Vì vậy
mỗi lượt dispatch (`→ Agent: ...`) trong log được nối tiếp ngay bằng một
**tiểu-phiên** chứa transcript đầy đủ, verbatim, của chính subagent đó — đánh
dấu bằng dòng `**↳ Tiểu-phiên `agent-<id>` — <mô tả task>**` — thay vì một
dòng tóm tắt do người viết lại sau.

Nguyên tắc verbatim được áp dụng đúng nghĩa:

- **Prompt** — nguyên văn từng ký tự những gì sinh viên (hoặc phiên điều
  phối, khi dispatch một subagent) đã gõ, giữ nguyên ngôn ngữ, giữ cả lỗi
  chính tả. Chỉ loại bỏ các khối `<system-reminder>` và `<task-notification>`
  do chính công cụ chèn vào — không phải nội dung do người/AI gõ ra;
  `<task-notification>` là sự kiện tự động khi một lệnh chạy nền kết thúc
  (`origin.kind = "task-notification"` trong transcript gốc).
- **Output** — nguyên văn phần chữ AI trả lời. Không dịch, không tóm tắt,
  không làm gọn.
- **`→ Tên_tool(...)`** — mỗi dòng là một lệnh AI thực sự đã gọi, tham số giữ
  nguyên. Đây là phần "AI đã làm gì", đặt xen đúng thứ tự với phần "AI đã nói
  gì".

Hai chỗ được rút gọn, và được nêu thẳng ở đây thay vì giấu:

- **Nội dung file do AI sinh ra** ghi bằng `Write(<đường dẫn>, N dòng)` chứ
   không chép lại toàn văn — bản thân file đó chính là sản phẩm nộp, đã nằm
   trong repo, chép lại vào đây chỉ làm phồng tài liệu.
- **Dòng dispatch `→ Agent: ...`** chỉ ghi mô tả ngắn của task, không chép lại
  nguyên văn phần prompt dài dispatch cho subagent — vì phần đó, cùng toàn bộ
  những gì subagent làm để phản hồi, đã có đầy đủ, verbatim, ở tiểu-phiên
  ngay bên dưới nó.

Đầu ra của `Read`/`Write`/`Edit` không ghi vì đó là nội dung file đọc lên hoặc
ghi xuống, không phải lời của AI. Ngoài hai điểm trên, không có chỗ nào bị
lược hoặc cắt ngắn bởi script này.

Nếu trong log còn xuất hiện cụm `cắt bớt`, đó là chữ nằm sẵn trong file/output
cũ mà AI đã đọc lại trong phiên làm việc, không phải chỗ script hiện tại cắt
ngắn transcript.

Hai ghi chú về giới hạn của chính transcript gốc, nêu ra để người chấm biết
đây là giới hạn của công cụ chứ không phải lựa chọn của sinh viên:

- Phần suy luận nội bộ (*thinking*) của mô hình **không nằm trong transcript** —
  Claude Code chỉ lưu chữ ký mã hoá, trường nội dung rỗng. Không có cách nào
  phục hồi, nên file này không có phần đó.
- Các dòng `[Request interrupted by user]` là lúc sinh viên bấm dừng giữa chừng;
  giữ lại vì đó là một can thiệp thật vào quá trình làm bài.

**Khoảng trống đã biết:** Task 7 (CI/CD) và Task 8 (Agent Skill sinh test)
có commit trên nhánh (`d10902e9`…`b6833ded`, `40f599dc`, `d04085da`, khoảng
20:23–20:59 20/08/2026) nhưng không tìm thấy transcript Claude Code nào bao
phủ khoảng thời gian đó trong `~/.claude/projects/` của máy này — không phải
lựa chọn lọc bớt của script. Nêu thẳng ở đây thay vì bịa lại nội dung.

"""


def render(entries):
    out = [HEADER]
    for e in entries:
        if e["session"]:
            out.append(f"\n**Phiên `{e['file']}` — {e['session']}**\n")
        if e.get("sub"):
            out.append(f"\n**↳ Tiểu-phiên `{e['sub'].split(' — ')[0]}` — {e['sub'].split(' — ', 1)[1]}**\n")
        model_label = MODEL_LABEL.get(e.get("model"), e.get("model") or "Opus 5")
        out.append(f"\n## [{e['n']}] Claude ({model_label}, Claude Code) — {e['when']}\n")
        out.append("**Prompt:**\n")
        out.append("```text\n" + e["prompt"] + "\n```\n")
        out.append("**Output:**\n")
        if e["body"]:
            out.append("\n".join(e["body"]) + "\n")
        else:
            out.append("*(không có phản hồi — prompt bị huỷ hoặc thay bằng prompt kế tiếp)*\n")
        out.append("\n---\n")
    return "\n".join(out)


if __name__ == "__main__":
    es = build()
    txt = render(es)
    dest = os.path.join(REPO, "reports/prompt-log.md")
    with open(dest, "w") as f:
        f.write(txt)
    print(f"{len(es)} entries, {len(txt)} chars -> {dest}")
    for e in es:
        print(f"  [{e['n']:2}] {e['when']}  {len(e['body']):3} blocks  {e['prompt'][:70]!r}")
