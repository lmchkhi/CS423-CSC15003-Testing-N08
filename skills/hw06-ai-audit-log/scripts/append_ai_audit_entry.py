#!/usr/bin/env python3
"""Append một entry vào reports/ai-audit-report.md."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path


DEFAULT_HEADER = """# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh          |
| **MSSV:**               | 23127475                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW06                    |
| **Công cụ AI đã dùng:** | Codex                   |
"""


def read_text_arg(value: str | None, file_value: str | None) -> str:
    if file_value:
        return Path(file_value).read_text(encoding="utf-8").strip()
    return (value or "").strip()


def timestamp() -> str:
    try:
        result = subprocess.run(
            ["date", "+%d/%m/%Y %H:%M GMT+7"],
            check=True,
            capture_output=True,
            text=True,
        )
        return result.stdout.strip()
    except Exception:
        return "DD/MM/YYYY HH:mm GMT+7"


def next_entry_number(content: str) -> int:
    numbers = [int(match) for match in re.findall(r"^## Entry #(\d+)\s*$", content, re.MULTILINE)]
    return max(numbers, default=0) + 1


def fenced(text: str) -> str:
    if "```" not in text:
        return text
    return text.replace("```", "'''")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", default="reports/ai-audit-report.md")
    parser.add_argument("--tool", default="Codex")
    parser.add_argument("--timestamp")
    parser.add_argument("--artifact-type", required=True)
    parser.add_argument("--prompt")
    parser.add_argument("--prompt-file")
    parser.add_argument("--output")
    parser.add_argument("--output-file")
    args = parser.parse_args()

    report = Path(args.report)
    report.parent.mkdir(parents=True, exist_ok=True)
    content = report.read_text(encoding="utf-8") if report.exists() else ""
    if not content.strip():
        content = DEFAULT_HEADER.rstrip() + "\n"

    number = next_entry_number(content)
    prompt = read_text_arg(args.prompt, args.prompt_file)
    output = read_text_arg(args.output, args.output_file)
    stamp = args.timestamp or timestamp()

    entry = f"""

## Entry #{number}

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | {args.tool} |
| **Timestamp**     | {stamp} |
| **Artifact type** | {args.artifact_type} |

**Full prompt:**

```text
{fenced(prompt)}
```

### (2) AI Output

```text
{fenced(output)}
```
"""

    report.write_text(content.rstrip() + entry, encoding="utf-8")
    print(f"Appended Entry #{number} to {report}")


if __name__ == "__main__":
    main()
