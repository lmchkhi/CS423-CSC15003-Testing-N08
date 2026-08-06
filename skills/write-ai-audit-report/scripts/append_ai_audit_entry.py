#!/usr/bin/env python3
"""Append một entry vào reports/ai-audit-report.md."""

from __future__ import annotations

import argparse
import re
from datetime import datetime, timedelta, timezone
from pathlib import Path


DEFAULT_STUDENT_NAME = "Ngô Hồng Thanh"
DEFAULT_STUDENT_ID = "23127475"
DEFAULT_CLASS = "CS423 / CSC13003"
DEFAULT_ASSIGNMENT = "HW04"
DEFAULT_TOOL = "Codex"


def read_text_arg(value: str | None, file_value: str | None) -> str:
    if file_value:
        return Path(file_value).read_text(encoding="utf-8").strip()
    return (value or "").strip()


def vietnam_timestamp() -> str:
    vn_tz = timezone(timedelta(hours=7))
    return datetime.now(vn_tz).strftime("%d/%m/%Y %H:%M GMT+7")


def header(student_name: str, student_id: str, class_name: str, assignment: str, tool: str) -> str:
    return f"""# AI Audit Report (HW04)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | {student_name}              |
| **MSSV:**               | {student_id}              |
| **Lớp / Khoá:**         | {class_name}              |
| **Mã bài tập :**        | {assignment}                    |
| **Công cụ AI đã dùng:** | {tool}                   |
"""


def next_entry_number(markdown: str) -> int:
    numbers = [
        int(match.group(1))
        for match in re.finditer(r"^## Entry #(\d+)\s*$", markdown, re.MULTILINE)
    ]
    return max(numbers, default=0) + 1


def entry(number: int, tool: str, timestamp: str, artifact_type: str, prompt: str, output: str) -> str:
    return f"""
## Entry #{number}

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | {tool}                  |
| **Timestamp**     | {timestamp}             |
| **Artifact type** | {artifact_type}         |

**Full prompt:**

```text
{prompt}
```

### (2) AI Output

```text
{output}
```
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Append AI audit entry theo format Markdown của bài nộp.")
    parser.add_argument("--report", default="reports/ai-audit-report.md", help="File AI audit report")
    parser.add_argument("--prompt", help="Prompt của user")
    parser.add_argument("--prompt-file", help="File chứa prompt của user")
    parser.add_argument("--output", help="Tóm tắt output của AI")
    parser.add_argument("--output-file", help="File chứa tóm tắt output của AI")
    parser.add_argument("--artifact-type", required=True, help="Loại artifact/tương tác")
    parser.add_argument("--tool", default=DEFAULT_TOOL, help="Tên công cụ AI")
    parser.add_argument("--student-name", default=DEFAULT_STUDENT_NAME, help="Họ tên sinh viên")
    parser.add_argument("--student-id", default=DEFAULT_STUDENT_ID, help="MSSV")
    parser.add_argument("--class-name", default=DEFAULT_CLASS, help="Lớp / Khoá")
    parser.add_argument("--assignment", default=DEFAULT_ASSIGNMENT, help="Mã bài tập")
    parser.add_argument("--timestamp", help="Timestamp thủ công, mặc định giờ Việt Nam")
    args = parser.parse_args()

    prompt = read_text_arg(args.prompt, args.prompt_file)
    output = read_text_arg(args.output, args.output_file)
    if not prompt:
        raise SystemExit("Missing prompt content")
    if not output:
        raise SystemExit("Missing output content")

    report = Path(args.report)
    report.parent.mkdir(parents=True, exist_ok=True)
    current = report.read_text(encoding="utf-8") if report.exists() else ""
    if not current.strip():
        current = header(args.student_name, args.student_id, args.class_name, args.assignment, args.tool)

    number = next_entry_number(current)
    timestamp = args.timestamp or vietnam_timestamp()
    updated = current.rstrip() + "\n" + entry(number, args.tool, timestamp, args.artifact_type, prompt, output).rstrip() + "\n"
    report.write_text(updated, encoding="utf-8")
    print(f"Appended Entry #{number} to {report}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
