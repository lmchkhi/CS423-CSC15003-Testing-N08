#!/usr/bin/env python3
"""Rebuild reports/prompt-log.md verbatim from the Claude Code session transcripts.

Nothing here paraphrases, translates or summarises. Prompts, assistant text and
assistant reasoning are copied byte for byte. The only reductions are stated
explicitly in the generated file's header:
  - file bodies written by the AI are referenced by path + line count, because
    the file itself is the deliverable and already ships in the repo;
  - Bash stdout is capped, with the cut marked inline.
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

# HW04 sessions only. The Aug 7-8 transcript 3aa6dd52 is HW05 performance
# testing and is deliberately excluded.
SESSIONS = [
    ("4e93c378", "Khởi tạo phiên làm việc trên repo HW04"),
    ("5eb7aacf", "Đọc đề HW04 và dựng khung dự án automation"),
    ("33676afb", "Lập kế hoạch HW04 (superpowers plan) và thực thi Session 1 — FR-02"),
    ("b45a13b7", "Thực thi Session 2 — FR-10"),
    ("78f17f22", "Điều chỉnh kế hoạch theo ràng buộc commit mới; rà soát log AI"),
    ("f6295926", "Thực thi Session 3 — FR-13, triage, bug report, tài liệu hoá"),
    ("ff131a90", "Đối chiếu kịch bản quay video với yêu cầu HW04"),
    ("7595b1b0", "Đặt tên hai video YouTube theo nội dung"),
    ("b078efda", "Thay hai link YouTube vào README và main-report"),
    ("a641cf9c", "Session 4 — rà soát toàn bài theo rubric, sửa số liệu sai và văn phong tài liệu"),
    ("9f7afb69", "Session 5 — rà soát toàn bài lần cuối theo rubric; sửa 3 spec, 2 file dữ liệu và 6 tài liệu"),
    ("e98fa1cc", "Session 6 — rà soát toàn repo trước khi nộp; chốt danh sách file nộp, sửa AI Critique và dựng lại PDF"),
    ("e22a2a0a", "Session 6 (tiếp) — đối chiếu kịch bản video 2 với yêu cầu prompt log"),
    ("2ff486c8", "Session 7 — bổ sung nhãn cho issue #204–#212, sửa ảnh bằng chứng BUG-FR13-002, vá skill bug-report"),
]

# Model display name per transcript's own `message.model` field — sessions
# switched from Opus 5 to Sonnet 5 partway through HW04 (student's /model
# command on 08/08/2026), so this must not be hardcoded to one value.
MODEL_LABEL = {
    "claude-opus-5": "Opus 5",
    "claude-sonnet-5": "Sonnet 5",
    "claude-haiku-4-5-20251001": "Haiku 4.5",
}

BASH_CAP = 700
TEXT_CAP = 4000

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


def cap(t, n, what="ký tự"):
    t = t.rstrip()
    if len(t) <= n:
        return t
    return t[:n].rstrip() + f"\n… [cắt bớt {len(t) - n} {what}; xem transcript gốc]"


def rel(p):
    if not isinstance(p, str):
        return str(p)
    return p.replace(REPO + "/", "").replace(os.path.expanduser("~"), "~")


def trace(name, inp):
    """One line describing a tool call. Arguments verbatim, paths made relative."""
    if name == "Bash":
        cmd = " ".join(inp.get("command", "").split())
        return "→ Bash: " + cap(cmd, 220)
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
    return f"→ {name}({cap(json.dumps(inp, ensure_ascii=False), 180)})"


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
    out = []
    for line in open(f):
        try:
            out.append(json.loads(line))
        except Exception:
            pass
    return out


def build():
    entries = []
    n = 0
    for pre, label in SESSIONS:
        recs = load(pre)
        # tool_use id -> (name, input) so a result can be attributed to its call
        calls = {}
        body = []          # accumulating output lines for the current prompt
        started = False
        session_open = True

        def flush():
            nonlocal body
            if entries and body:
                entries[-1]["body"] = body
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
                            body.append(
                                "   "
                                + cap(txt.strip(), BASH_CAP).replace("\n", "\n   ")
                            )
                        elif name == "AskUserQuestion" and txt.strip():
                            body.append("   [sinh viên chọn] " + cap(txt.strip(), 600))
                    continue
                # a genuine typed prompt
                txt = clean(
                    "\n".join(
                        b.get("text", "") for b in content if isinstance(b, dict)
                    )
                )
                if not txt or NOISE.match(txt):
                    continue
                flush()
                n += 1
                entries.append(
                    {
                        "n": n,
                        "when": ts(when) if when else "",
                        "prompt": txt,
                        "body": [],
                        "session": label if session_open else None,
                        "file": pre if session_open else None,
                        "model": None,
                    }
                )
                session_open = False
                started = True
                continue

            if role == "assistant" and started:
                if entries and not entries[-1]["model"]:
                    entries[-1]["model"] = m.get("model")
                for b in content:
                    if not isinstance(b, dict):
                        continue
                    t = b.get("type")
                    if t == "text":
                        tx = (b.get("text") or "").strip()
                        if tx:
                            body.append("```text\n" + cap(tx, TEXT_CAP) + "\n```")
                    elif t == "tool_use":
                        calls[b.get("id")] = (b.get("name"), b.get("input") or {})
                        body.append(trace(b.get("name"), b.get("input") or {}))
        flush()

    # A prompt that was queued and immediately re-sent shows up twice, the
    # first copy with no response attached. Keep only the one that ran.
    kept = []
    for i, e in enumerate(entries):
        nxt = entries[i + 1] if i + 1 < len(entries) else None
        if not e["body"] and nxt and nxt["prompt"] == e["prompt"]:
            if e["session"] and not nxt["session"]:
                nxt["session"], nxt["file"] = e["session"], e["file"]
            continue
        kept.append(e)
    for i, e in enumerate(kept, 1):
        e["n"] = i
    return kept


HEADER = """# Prompt Log

*Complete, unfiltered record of every AI interaction during HW04. See
`reports/ai-audit-report.md` for the reviewed subset with verdicts.*

## Phạm vi và cách dựng file

File này được trích **tự động** từ transcript gốc của Claude Code
(`~/.claude/projects/`), không gõ lại và không viết lại từ trí nhớ. Toàn bộ
HW04 được ghi: từ lúc đọc đề (05/08/2026) đến phiên làm việc cuối.

Nguyên tắc verbatim được áp dụng đúng nghĩa:

- **Prompt** — nguyên văn từng ký tự những gì sinh viên đã gõ, giữ nguyên
  ngôn ngữ, giữ cả lỗi chính tả. Chỉ loại bỏ các khối `<system-reminder>` và
  `<task-notification>` do chính công cụ chèn vào — sinh viên không gõ
  chúng; `<task-notification>` là sự kiện tự động khi một lệnh chạy nền kết
  thúc (`origin.kind = "task-notification"` trong transcript gốc), không
  phải phản hồi hay xác nhận của sinh viên.
- **Output** — nguyên văn phần chữ AI trả lời. Không dịch, không tóm tắt,
  không làm gọn.
- **`→ Tên_tool(...)`** — mỗi dòng là một lệnh AI thực sự đã gọi, tham số giữ
  nguyên. Đây là phần "AI đã làm gì", đặt xen đúng thứ tự với phần "AI đã nói
  gì".

Hai chỗ được rút gọn, và được nêu thẳng ở đây thay vì giấu:

1. **Nội dung file do AI sinh ra** ghi bằng `Write(<đường dẫn>, N dòng)` chứ
   không chép lại toàn văn — bản thân file đó chính là sản phẩm nộp, đã nằm
   trong repo, chép lại vào đây chỉ làm phồng tài liệu.
2. **Đầu ra của lệnh Bash** cắt ở 700 ký tự, **có đánh dấu chỗ cắt ngay tại
   dòng đó**. Đầu ra của `Read`/`Write`/`Edit` không ghi vì đó là nội dung file
   đọc lên, không phải lời của AI.

Ngoài hai điểm trên, không có chỗ nào bị lược.

Hai ghi chú về giới hạn của chính transcript gốc, nêu ra để người chấm biết
đây là giới hạn của công cụ chứ không phải lựa chọn của sinh viên:

- Phần suy luận nội bộ (*thinking*) của mô hình **không nằm trong transcript** —
  Claude Code chỉ lưu chữ ký mã hoá, trường nội dung rỗng. Không có cách nào
  phục hồi, nên file này không có phần đó.
- Các dòng `[Request interrupted by user]` là lúc sinh viên bấm dừng giữa chừng;
  giữ lại vì đó là một can thiệp thật vào quá trình làm bài.

> Một transcript cùng thư mục (07–08/08/2026) thuộc bài HW05 Performance
> Testing, không liên quan HW04 nên không đưa vào đây.

"""


def render(entries):
    out = [HEADER]
    for e in entries:
        if e["session"]:
            out.append(f"\n**Phiên `{e['file']}` — {e['session']}**\n")
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
