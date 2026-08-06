#!/usr/bin/env python3
"""Trích inventory test case Markdown cho HW04 Task 1."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


SECTION_RE = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)


def section(markdown: str, name: str) -> str:
    matches = list(SECTION_RE.finditer(markdown))
    for index, match in enumerate(matches):
        if match.group(1).strip().lower() == name.lower():
            start = match.end()
            end = matches[index + 1].start() if index + 1 < len(matches) else len(markdown)
            return markdown[start:end].strip()
    return ""


def parse_case(path: Path) -> dict[str, str]:
    markdown = path.read_text(encoding="utf-8")
    first_line = markdown.splitlines()[0].strip() if markdown.splitlines() else ""
    title_match = re.match(r"^#\s+([^:]+):\s+(.+)$", first_line)
    case_id = title_match.group(1).strip() if title_match else path.stem
    title = title_match.group(2).strip() if title_match else first_line.lstrip("# ").strip()
    module_type = section(markdown, "Module / Test type / Technique")
    technique = module_type.split("/")[-1].strip() if "/" in module_type else module_type

    return {
        "id": case_id,
        "title": title,
        "requirement": section(markdown, "Requirement ID"),
        "technique": technique,
        "path": str(path),
        "test_data": section(markdown, "Test data"),
        "steps": section(markdown, "Test steps"),
        "expected": section(markdown, "Expected result"),
        "status_related_bugs": section(markdown, "Status / Related bugs"),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Xuất JSON inventory từ test case Markdown.")
    parser.add_argument("paths", nargs="+", help="Thư mục hoặc file test case Markdown")
    parser.add_argument("--output", "-o", help="File JSON output; mặc định in ra stdout")
    args = parser.parse_args()

    files: list[Path] = []
    for raw_path in args.paths:
        path = Path(raw_path)
        if path.is_dir():
            files.extend(sorted(path.rglob("TC-*.md")))
        elif path.is_file():
            files.append(path)

    cases = [parse_case(path) for path in sorted(files)]
    payload = {
        "total": len(cases),
        "cases": cases,
    }
    output = json.dumps(payload, ensure_ascii=False, indent=2)

    if args.output:
        Path(args.output).write_text(output + "\n", encoding="utf-8")
    else:
        print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
