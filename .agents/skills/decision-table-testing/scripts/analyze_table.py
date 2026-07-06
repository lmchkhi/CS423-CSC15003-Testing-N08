#!/usr/bin/env python3
"""Analyze CSV decision tables for common defects."""

from __future__ import annotations

import argparse
import csv
import sys
from collections import defaultdict
from pathlib import Path

WILDCARDS = {"", "-", "any", "*", "n/a", "na"}
OUTCOME_HINTS = ("outcome", "action", "result", "expected", "response", "decision")


def normalize(value: str | None) -> str:
    return "" if value is None else value.strip()


def is_wildcard(value: str) -> bool:
    return normalize(value).lower() in WILDCARDS


def compatible(left: str, right: str) -> bool:
    return is_wildcard(left) or is_wildcard(right) or normalize(left) == normalize(right)


def detect_columns(headers: list[str]) -> tuple[str | None, list[str], list[str]]:
    rule_col = next((h for h in headers if h.strip().lower() in {"rule", "rule id", "rule_id", "id"}), None)
    outcome_cols = [h for h in headers if any(h.strip().lower().find(hint) >= 0 for hint in OUTCOME_HINTS)]

    if not outcome_cols and headers:
        outcome_cols = [headers[-1]]

    condition_cols = [h for h in headers if h != rule_col and h not in outcome_cols]
    return rule_col, condition_cols, outcome_cols


def row_id(row: dict[str, str], rule_col: str | None, fallback: int) -> str:
    if rule_col and normalize(row.get(rule_col)):
        return normalize(row.get(rule_col))
    return f"row-{fallback}"


def tuple_for(row: dict[str, str], columns: list[str]) -> tuple[str, ...]:
    return tuple(normalize(row.get(col)) for col in columns)


def format_tuple(columns: list[str], values: tuple[str, ...]) -> str:
    return ", ".join(f"{col}={value or '<blank>'}" for col, value in zip(columns, values))


def analyze(path: Path) -> int:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            print("ERROR: CSV has no header row.", file=sys.stderr)
            return 2

        headers = [h for h in reader.fieldnames if h is not None]
        rows = list(reader)

    rule_col, condition_cols, outcome_cols = detect_columns(headers)
    if not condition_cols or not outcome_cols:
        print("ERROR: Need at least one condition column and one outcome/action column.", file=sys.stderr)
        return 2

    print(f"Rows: {len(rows)}")
    print(f"Rule column: {rule_col or '<none>'}")
    print(f"Condition columns: {', '.join(condition_cols)}")
    print(f"Outcome columns: {', '.join(outcome_cols)}")
    print()

    issues = 0
    missing_outcomes: list[str] = []
    by_conditions: dict[tuple[str, ...], list[tuple[str, tuple[str, ...]]]] = defaultdict(list)

    for index, row in enumerate(rows, start=1):
        rid = row_id(row, rule_col, index)
        conditions = tuple_for(row, condition_cols)
        outcomes = tuple_for(row, outcome_cols)
        by_conditions[conditions].append((rid, outcomes))
        if all(is_wildcard(value) for value in outcomes):
            missing_outcomes.append(rid)

    if missing_outcomes:
        issues += len(missing_outcomes)
        print("Missing outcomes:")
        for rid in missing_outcomes:
            print(f"  - {rid}")
        print()

    duplicates_found = False
    for conditions, entries in by_conditions.items():
        if len(entries) <= 1:
            continue
        outcomes = {outcome for _, outcome in entries}
        if len(outcomes) == 1:
            duplicates_found = True
            issues += len(entries) - 1
            ids = ", ".join(rid for rid, _ in entries)
            print(f"Duplicate equivalent rows: {ids} ({format_tuple(condition_cols, conditions)})")
    if duplicates_found:
        print()

    conflicts: list[str] = []
    indexed = [
        (row_id(row, rule_col, idx), tuple_for(row, condition_cols), tuple_for(row, outcome_cols))
        for idx, row in enumerate(rows, start=1)
    ]
    for i, (left_id, left_conditions, left_outcomes) in enumerate(indexed):
        for right_id, right_conditions, right_outcomes in indexed[i + 1 :]:
            if left_outcomes == right_outcomes:
                continue
            if all(compatible(left, right) for left, right in zip(left_conditions, right_conditions)):
                conflicts.append(
                    f"{left_id} overlaps {right_id}: "
                    f"{format_tuple(condition_cols, left_conditions)} vs "
                    f"{format_tuple(condition_cols, right_conditions)}"
                )

    if conflicts:
        issues += len(conflicts)
        print("Potential conflicting overlaps:")
        for conflict in conflicts:
            print(f"  - {conflict}")
        print()

    print("Condition domains:")
    for col in condition_cols:
        values = sorted({normalize(row.get(col)) or "<blank>" for row in rows})
        print(f"  - {col}: {', '.join(values)}")

    print()
    if issues:
        print(f"Result: {issues} issue(s) found.")
        return 1

    print("Result: no common decision-table defects found.")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Analyze a CSV decision table for common defects.")
    parser.add_argument("csv_path", type=Path, help="Path to the CSV decision table")
    args = parser.parse_args()

    if not args.csv_path.exists():
        print(f"ERROR: File not found: {args.csv_path}", file=sys.stderr)
        return 2
    return analyze(args.csv_path)


if __name__ == "__main__":
    raise SystemExit(main())
