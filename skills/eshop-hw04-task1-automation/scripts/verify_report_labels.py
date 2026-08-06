#!/usr/bin/env python3
"""Kiểm tra Playwright HTML report có nhãn Run by và sinh manifest."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def inspect_report(index_file: Path, student_id: str) -> dict[str, object]:
    html = index_file.read_text(encoding="utf-8", errors="ignore")
    expected_label = f"Run by: {student_id}"
    return {
        "report": str(index_file.parent),
        "index": str(index_file),
        "has_run_by": expected_label in html,
        "has_placeholder": "{StudentID}" in html,
        "size_bytes": index_file.stat().st_size,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Quét report Playwright và kiểm tra nhãn Run by: <student-id>."
    )
    parser.add_argument("report_root", help="Thư mục gốc chứa các report HTML")
    parser.add_argument("--student-id", required=True, help="Mã số sinh viên thật")
    parser.add_argument("--manifest", help="File JSON manifest output")
    args = parser.parse_args()

    root = Path(args.report_root)
    index_files = [
        path
        for path in sorted(root.rglob("*.html"))
        if "trace" not in path.relative_to(root).parts
    ] if root.exists() else []
    results = [inspect_report(path, args.student_id) for path in index_files]
    ok = (
        bool(results)
        and any(item["has_run_by"] for item in results)
        and not any(item["has_placeholder"] for item in results)
    )

    payload = {
        "checked_at": datetime.now(timezone.utc).isoformat(),
        "student_id": args.student_id,
        "report_root": str(root),
        "total_reports": len(results),
        "ok": ok,
        "reports": results,
    }

    output = json.dumps(payload, ensure_ascii=False, indent=2)
    if args.manifest:
        Path(args.manifest).write_text(output + "\n", encoding="utf-8")
    print(output)
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
