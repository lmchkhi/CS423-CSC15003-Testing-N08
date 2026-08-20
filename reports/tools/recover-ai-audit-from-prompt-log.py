#!/usr/bin/env python3
"""Append recovered Claude Code prompt-log entries to the HW05 AI audit report.

The prompt log is rebuilt from Claude's JSONL transcripts. This helper copies
those recovered prompt/output blocks into audit entries so the audit report can
catch up without reconstructing anything from memory.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROMPT_LOG = ROOT / "reports" / "prompt-log.md"
AUDIT = ROOT / "reports" / "ai-audit-report.md"

JUDGMENTS = {
    1: ("INCOMPLETE", "Phiên dựng repo ban đầu tạo khung hữu ích nhưng còn kéo theo vật liệu không thuộc phạm vi HW05; sinh viên yêu cầu làm sạch ở entry kế tiếp."),
    2: ("VALID", "Yêu cầu làm sạch phạm vi được thực hiện và tạo baseline sạch cho HW05."),
    3: ("VALID", "Phiên lập kế hoạch SDD sinh plan/spec dùng làm xương sống cho toàn bộ bài; các mâu thuẫn được ghi lại trong ledger."),
    4: ("VALID", "Ràng buộc không có `Co-Authored-By` được đưa vào quy trình và các commit sau đó được kiểm tra theo ràng buộc này."),
    5: ("INCOMPLETE", "Phiên kiểm tra skill diagram không trở thành hướng chính; pipeline PDF/Mermaid được hoàn thiện sau bằng commit riêng."),
    6: ("VALID", "Plan cuối được sinh và dùng làm tài liệu điều phối chính cho các task sau."),
    7: ("INCOMPLETE", "Phiên thực thi đầu tiên tạo nhiều artifact nhưng cũng phát hiện các lỗi cần sửa qua review: PID SUT, CSV delimiter, oracle verdict."),
    8: ("INCOMPLETE", "Phiên tiếp tục task tạo script/artifact hữu ích nhưng bị ngắt giữa quá trình và cần các vòng fix/re-review trong ledger."),
    9: ("INCOMPLETE", "Không có output AI đáng kể vì background agent bị dừng; ghi lại để audit không có khoảng trống thời gian."),
    10: ("INCOMPLETE", "Request bị ngắt bởi sinh viên, không tạo artifact hoàn chỉnh."),
    11: ("VALID", "Phiên này ghi nhận quyết định scope bỏ k6 theo cách nhất quán với rubric và cập nhật kế hoạch tương ứng."),
    12: ("INCOMPLETE", "Phiên agentic lớn hoàn thành nhiều task cốt lõi nhưng kết quả cần nhiều review/ruling sau đó, nên không thể đánh dấu hợp lệ tuyệt đối."),
    13: ("VALID", "Phiên xử lý quyền Screen Recording xác nhận lại evidence capture sau khi sinh viên cấp quyền."),
    14: ("INCOMPLETE", "Phiên quota-limit tạo các deliverable quan trọng nhưng cố ý giảm ceremony và để lại phần skill/video/PDF cần finalization sau."),
}


def parse_prompt_log() -> list[dict[str, str]]:
    text = PROMPT_LOG.read_text()
    pattern = re.compile(
        r"^## \[(\d+)\] (?P<tool>[^\n]+?) — (?P<timestamp>[^\n]+)\n+"
        r"\*\*Prompt:\*\*\n+(?P<prompt>.*?)\n\*\*Output:\*\*\n+(?P<output>.*?)(?=\n---\n)",
        re.S | re.M,
    )
    entries = []
    for m in pattern.finditer(text):
        prompt = strip_fence(m.group("prompt"))
        output = m.group("output").strip()
        entries.append({
            "n": int(m.group(1)),
            "tool": m.group("tool"),
            "timestamp": m.group("timestamp"),
            "prompt": prompt,
            "output": output,
        })
    return entries


def strip_fence(text: str) -> str:
    text = text.strip()
    if text.startswith("```text\n") and text.endswith("\n```"):
        return text.removeprefix("```text\n").removesuffix("\n```")
    return text


def artifact_type(entry: dict[str, str]) -> str:
    first = entry["prompt"].strip().splitlines()[0][:120]
    return f"Recovered Claude prompt-log entry #{entry['n']} — {first}"


def render_entry(num: int, entry: dict[str, str]) -> str:
    verdict, reasoning = JUDGMENTS.get(entry["n"], ("INCOMPLETE", "Recovered after the fact from Claude transcripts; no detailed per-artifact review was recorded at the time."))
    fix = (
        "Đã phục hồi prompt/output từ transcript Claude vào `reports/prompt-log.md` "
        "và đưa entry này vào audit report; các sửa kỹ thuật cụ thể nằm trong commit/ledger tương ứng."
    )
    return f"""## Entry #{num}

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | {entry['tool']} |
| **Timestamp**     | {entry['timestamp']} |
| **Artifact type** | {artifact_type(entry)} |

**Full prompt:**

````text
{entry['prompt']}
````

### (2) AI Output

````text
{entry['output']}
````

### (3) Verdict

**`{verdict}`**

### (4) Reasoning

{reasoning}

### (5) Student Fix

{fix}

---
"""


def summary(verdicts: list[str]) -> str:
    total = len(verdicts)
    counts = {v: verdicts.count(v) for v in ("VALID", "INVALID", "INCOMPLETE")}
    def pct(v: str) -> str:
        return f"{round(counts[v] * 100 / total):.0f}%" if total else "0%"

    return f"""## 4. Tổng hợp độ chính xác của AI

*(Cập nhật lại sau mỗi entry — tổng số entry, số VALID / INVALID / INCOMPLETE và
tỉ lệ phần trăm.)*

| Verdict | Số entry | Tỉ lệ |
|---|---:|---:|
| `VALID` | {counts['VALID']} | {pct('VALID')} |
| `INVALID` | {counts['INVALID']} | {pct('INVALID')} |
| `INCOMPLETE` | {counts['INCOMPLETE']} | {pct('INCOMPLETE')} |
| **Tổng** | **{total}** | **100%** |
"""


def main() -> None:
    audit = AUDIT.read_text()
    before, rest = audit.split("## 4. Tổng hợp độ chính xác của AI", 1)
    conclusion = "## 5. Kết luận" + rest.split("## 5. Kết luận", 1)[1]
    if "\n## Entry #2\n" in before:
        before = before.split("\n## Entry #2\n", 1)[0].rstrip() + "\n"

    existing_numbers = [int(n) for n in re.findall(r"^## Entry #(\d+)", before, re.M)]
    next_num = max(existing_numbers, default=0) + 1

    prompt_entries = parse_prompt_log()
    recovered = []
    for entry in prompt_entries:
        recovered.append(render_entry(next_num, entry))
        next_num += 1

    verdicts = re.findall(r"\*\*`(VALID|INVALID|INCOMPLETE)`\*\*", before)
    verdicts += [JUDGMENTS.get(e["n"], ("INCOMPLETE", ""))[0] for e in prompt_entries]

    AUDIT.write_text(before.rstrip() + "\n\n" + "\n".join(recovered) + "\n" + summary(verdicts) + "\n" + conclusion)
    print(f"appended {len(recovered)} recovered audit entries; total verdicts={len(verdicts)}")


if __name__ == "__main__":
    main()
