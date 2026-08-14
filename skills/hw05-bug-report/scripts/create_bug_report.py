#!/usr/bin/env python3
"""Create a HW05 bug report Markdown file from the repo issue template."""

from __future__ import annotations

import argparse
import re
import unicodedata
from pathlib import Path


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = "".join(char for char in text if not unicodedata.combining(char))
    text = text.replace("đ", "d").replace("Đ", "D")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", text.lower()).strip("-")
    return slug[:80] or "bug"


def read_value(value: str | None, file_path: str | None) -> str:
    if file_path:
        return Path(file_path).read_text(encoding="utf-8").strip()
    return (value or "").strip()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--template", default=".github/ISSUE_TEMPLATE/bug-report-template.md")
    parser.add_argument("--out-dir", default="reports/bug-reports")
    parser.add_argument("--module", required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--test-case", required=True)
    parser.add_argument("--requirement", required=True)
    parser.add_argument("--severity", required=True)
    parser.add_argument("--priority", required=True)
    parser.add_argument("--environment", required=True)
    parser.add_argument("--steps")
    parser.add_argument("--steps-file")
    parser.add_argument("--expected", required=True)
    parser.add_argument("--actual", required=True)
    parser.add_argument("--evidence", required=True)
    parser.add_argument("--filename")
    args = parser.parse_args()

    template = Path(args.template).read_text(encoding="utf-8")
    title = f"[BUG][{args.module}] {args.summary}"
    steps = read_value(args.steps, args.steps_file)
    if steps and not steps.lstrip().startswith("1."):
        steps = "\n".join(f"{index}. {line}" for index, line in enumerate(steps.splitlines(), start=1))

    body = template
    body = body.replace('title: "[BUG][<Module>] <Name of bug>"', f'title: "{title}"')
    body = body.replace("TC-<Module_Name>-<TC_NUM>", args.test_case)
    body = body.replace("FR-<Module_Name>-<ID_NUM>", args.requirement)
    body = body.replace("<!-- (Major / Minor / Trivial / Critical / Block) / (P0 / P1 / P2 / P3)-->", f"{args.severity} / {args.priority}")
    body = body.replace("<!--Browser, OS, URL, build/commit-->", args.environment)
    steps_block = steps.rstrip() + "\n" if steps else ""
    body = re.sub(r"<!---\n1\. Mở trang Login\n2\. Nhập email hợp lệ\n3\. Nhập password sai\n4\. Bấm Login\n--->", steps_block, body)
    body = body.replace("<!--Không cho đăng nhập và hiển thị lỗi.-->", args.expected)
    body = body.replace("<!--Hệ thống vẫn đăng nhập thành công.-->", args.actual)
    body = body.replace("<!--Screenshot / video / console log-->", args.evidence)

    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    filename = args.filename or f"BUG-HW05-{slugify(args.module)}-{slugify(args.summary)}.md"
    path = out_dir / filename
    path.write_text(body.rstrip() + "\n", encoding="utf-8")
    print(path)


if __name__ == "__main__":
    main()
