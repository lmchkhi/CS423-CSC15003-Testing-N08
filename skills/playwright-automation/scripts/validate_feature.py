#!/usr/bin/env python3
"""Validate the artifacts for one Playwright feature using stdlib only."""

from __future__ import annotations

import argparse
import base64
import csv
import io
import json
import re
import sys
import zipfile
from pathlib import Path


CASE_HEADINGS = (
    "## Requirement ID",
    "## Module / Test type / Technique",
    "## Preconditions",
    "## Test data",
    "## Test steps",
    "## Expected result",
    "## Status / Related bugs",
)
BUG_HEADINGS = (
    "## Found by Test Case",
    "## Requirement liên quan",
    "## Severity / Priority",
    "## Environment",
    "## Steps to reproduce",
    "## Expected result",
    "## Actual result",
    "## Evidence",
)
ISO_RE = re.compile(r"\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})\b")
ASSERTION_RE = re.compile(r"\bexpect(?:\.soft)?\s*\([^;]*?\)\s*\.\s*(to[A-Z]\w*)", re.DOTALL)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--feature", required=True)
    parser.add_argument("--student-id", required=True)
    parser.add_argument("--require-reports", action="store_true")
    parser.add_argument("--test-cases-dir", type=Path)
    parser.add_argument("--data-file", type=Path)
    parser.add_argument("--spec-file", type=Path)
    parser.add_argument("--reports-dir", type=Path)
    parser.add_argument("--bugs-dir", type=Path)
    return parser.parse_args()


def resolve(root: Path, override: Path | None, default: Path) -> Path:
    path = override or default
    return path if path.is_absolute() else root / path


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def searchable_report_text(path: Path) -> str:
    """Return HTML plus text embedded in Playwright's base64 ZIP payload."""
    html = read_text(path)
    chunks = [html]
    payloads = re.findall(
        r"data:application/(?:zip|octet-stream);base64,([A-Za-z0-9+/=\r\n]+)",
        html,
    )
    for payload in payloads:
        try:
            decoded = base64.b64decode(re.sub(r"\s+", "", payload), validate=True)
            with zipfile.ZipFile(io.BytesIO(decoded)) as archive:
                for info in archive.infolist():
                    if not info.is_dir() and info.file_size <= 10_000_000:
                        chunks.append(archive.read(info).decode("utf-8", errors="replace"))
        except (ValueError, zipfile.BadZipFile, OSError):
            continue
    return "\n".join(chunks)


def main() -> int:
    args = parse_args()
    root = args.root.resolve()
    feature = args.feature
    errors: list[str] = []
    warnings: list[str] = []

    cases_dir = resolve(root, args.test_cases_dir, Path("tests/test-cases") / feature)
    data_file = resolve(root, args.data_file, Path("tests/data") / f"{feature}.json")
    if args.data_file is None and not data_file.exists():
        csv_candidate = data_file.with_suffix(".csv")
        if csv_candidate.exists():
            data_file = csv_candidate
    spec_file = resolve(root, args.spec_file, Path("tests/e2e") / f"{feature}.spec.ts")
    if args.spec_file is None and not spec_file.exists():
        candidates = sorted((root / "tests/e2e").glob(f"{feature}.spec.*")) if (root / "tests/e2e").exists() else []
        if candidates:
            spec_file = candidates[0]
    reports_dir = resolve(root, args.reports_dir, Path("reports") / feature)
    bugs_dir = resolve(root, args.bugs_dir, Path("bugs") / feature)

    case_files = sorted(cases_dir.glob("TC-*.md")) if cases_dir.exists() else []
    if len(case_files) < 12:
        errors.append(f"Expected at least 12 test-case files in {cases_dir}; found {len(case_files)}")

    case_ids: set[str] = set()
    for path in case_files:
        text = read_text(path)
        title = re.search(r"^#\s+(TC-[A-Z0-9-]+-\d{3}):\s+\S", text, re.MULTILINE)
        if not title:
            errors.append(f"Invalid or missing test-case title in {path}")
        else:
            case_id = title.group(1)
            if case_id in case_ids:
                errors.append(f"Duplicate test-case ID {case_id}")
            case_ids.add(case_id)
            if path.stem != case_id:
                warnings.append(f"Filename {path.name} does not match ID {case_id}")
        missing = [heading for heading in CASE_HEADINGS if heading not in text]
        if missing:
            errors.append(f"{path}: missing headings: {', '.join(missing)}")

    data_text = ""
    if not data_file.exists():
        errors.append(f"Missing external JSON/CSV data file: {data_file}")
    else:
        data_text = read_text(data_file)
        try:
            if data_file.suffix.lower() == ".json":
                payload = json.loads(data_text)
                if payload in ({}, [], None):
                    errors.append(f"Data file is empty: {data_file}")
            elif data_file.suffix.lower() == ".csv":
                with data_file.open(newline="", encoding="utf-8-sig") as handle:
                    rows = list(csv.DictReader(handle))
                if not rows:
                    errors.append(f"CSV has no data rows: {data_file}")
            else:
                errors.append(f"Data file must be .json or .csv: {data_file}")
        except (json.JSONDecodeError, csv.Error) as exc:
            errors.append(f"Cannot parse {data_file}: {exc}")

    spec_text = ""
    if not spec_file.exists():
        errors.append(f"Missing Playwright spec: {spec_file}")
    else:
        spec_text = read_text(spec_file)
        if "waitForTimeout" in spec_text:
            errors.append(f"Arbitrary waitForTimeout found in {spec_file}")
        matchers = sorted(set(ASSERTION_RE.findall(spec_text)))
        if len(matchers) < 3:
            errors.append(f"Expected at least 3 assertion matcher patterns; found {matchers}")
        for case_id in sorted(case_ids):
            if case_id not in spec_text and case_id not in data_text:
                errors.append(f"Test-case ID not traceable from spec/data: {case_id}")
        if not re.search(r"(?:from\s+['\"].*(?:\.json|\.csv)['\"]|readFileSync|createReadStream)", spec_text):
            warnings.append("Could not prove that the spec loads external JSON/CSV test data")

    configs = [p for pattern in ("playwright.config.ts", "playwright.config.js", "playwright.config.mjs") for p in root.glob(pattern)]
    config_text = "\n".join(read_text(path) for path in configs)
    if not configs:
        errors.append("Missing playwright.config.ts/js/mjs")
    for browser in ("chromium", "firefox", "webkit"):
        if browser not in config_text.lower():
            errors.append(f"Playwright config does not mention project/browser: {browser}")
    if "STUDENT_ID" not in config_text or "RUN_TIMESTAMP" not in config_text:
        warnings.append("Could not prove report identity comes from STUDENT_ID and RUN_TIMESTAMP")

    if args.require_reports:
        for browser in ("chromium", "firefox", "webkit"):
            browser_dir = reports_dir / browser
            html_files = sorted(browser_dir.rglob("*.html")) if browser_dir.exists() else []
            if not html_files:
                errors.append(f"Missing real HTML report for {browser}: {browser_dir}")
                continue
            report_text = "\n".join(searchable_report_text(path) for path in html_files)
            identity = f"Run by: {args.student_id}"
            if identity not in report_text:
                errors.append(f"Report for {browser} does not visibly contain '{identity}'")
            if not ISO_RE.search(report_text):
                errors.append(f"Report for {browser} does not contain an ISO-8601 timestamp")

    if bugs_dir.exists():
        for path in sorted(bugs_dir.glob("*.md")):
            text = read_text(path)
            if not re.search(r"^#\s+\[BUG\]\[[^]]+\]\s+\S", text, re.MULTILINE):
                errors.append(f"Invalid bug title in {path}")
            missing = [heading for heading in BUG_HEADINGS if heading not in text]
            if missing:
                errors.append(f"{path}: missing headings: {', '.join(missing)}")

    warnings.append("Manual review still required: meaningful coverage, hard-coded domain values, assertion strength, and product-bug confirmation")
    for item in errors:
        print(f"ERROR: {item}")
    for item in warnings:
        print(f"WARN: {item}")
    if errors:
        print(f"FAILED: {len(errors)} error(s), {len(warnings)} warning(s)")
        return 1
    print(f"PASSED: {len(case_files)} test cases, {len(warnings)} warning(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
