#!/usr/bin/env python3
"""Update GitHub issues from local bug-report Markdown files.

This script expects GitHub CLI (`gh`) to be installed and authenticated.
It uses each report's H1 as the issue title, and the body below the H1 as
the issue body. The local self-link section (`## GitHub Issue`) is omitted
from the remote body because the issue page already provides that context.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path


REPO = "lmchkhi/CS423-CSC15003-Testing-N08"
BUG_REPORT_DIR = Path("bug-reports")
ISSUE_URL_RE = re.compile(r"https://github\.com/[^/\s]+/[^/\s]+/issues/(\d+)")


def parse_report(path: Path) -> tuple[int, str, str]:
    text = path.read_text(encoding="utf-8").strip() + "\n"
    lines = text.splitlines()
    if not lines or not lines[0].startswith("# "):
        raise ValueError(f"{path}: missing H1 title")

    title = lines[0].removeprefix("# ").strip()
    match = ISSUE_URL_RE.search(text)
    if not match:
        raise ValueError(f"{path}: missing GitHub issue URL")
    issue_number = int(match.group(1))

    body = "\n".join(lines[1:]).strip()
    body = re.split(r"\n## GitHub Issue\n", body, maxsplit=1)[0].strip() + "\n"
    return issue_number, title, body


def update_issue(path: Path, dry_run: bool) -> None:
    issue_number, title, body = parse_report(path)
    print(f"#{issue_number}: {title}")

    if dry_run:
        print(f"  body chars: {len(body)}")
        return

    subprocess.run(
        [
            "gh",
            "issue",
            "edit",
            str(issue_number),
            "--repo",
            REPO,
            "--title",
            title,
            "--body",
            body,
        ],
        check=True,
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    reports = sorted(BUG_REPORT_DIR.glob("BUG-*.md"))
    if not reports:
        print("No bug reports found.", file=sys.stderr)
        return 1

    for path in reports:
        update_issue(path, args.dry_run)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
