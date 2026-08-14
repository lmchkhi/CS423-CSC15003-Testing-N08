#!/usr/bin/env python3
"""Summarize JMeter CSV JTL metrics by label and overall."""

from __future__ import annotations

import argparse
import csv
import math
from collections import defaultdict
from pathlib import Path
from typing import Iterable


def percentile(values: list[float], pct: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    rank = (len(ordered) - 1) * pct
    low = math.floor(rank)
    high = math.ceil(rank)
    if low == high:
        return ordered[int(rank)]
    return ordered[low] * (high - rank) + ordered[high] * (rank - low)


def is_success(row: dict[str, str]) -> bool:
    value = (row.get("success") or row.get("Success") or "").strip().lower()
    if value in {"true", "1", "yes"}:
        return True
    if value in {"false", "0", "no"}:
        return False
    code = row.get("responseCode") or row.get("response_code") or ""
    return code.startswith(("2", "3"))


def elapsed(row: dict[str, str]) -> float:
    for key in ("elapsed", "Elapsed", "time", "Time"):
        if key in row and row[key] != "":
            return float(row[key])
    raise KeyError("Cannot find elapsed/time column in JTL")


def timestamp(row: dict[str, str]) -> float:
    for key in ("timeStamp", "timestamp", "time"):
        if key in row and row[key] != "":
            return float(row[key])
    return 0.0


def summarize(rows: Iterable[dict[str, str]]) -> list[dict[str, float | str | int]]:
    groups: dict[str, list[dict[str, str]]] = defaultdict(list)
    all_rows: list[dict[str, str]] = []
    for row in rows:
        label = row.get("label") or row.get("Label") or "unknown"
        groups[label].append(row)
        all_rows.append(row)
    groups["OVERALL"] = all_rows

    output: list[dict[str, float | str | int]] = []
    for label, items in groups.items():
        times = [elapsed(item) for item in items]
        failures = sum(0 if is_success(item) else 1 for item in items)
        stamps = [timestamp(item) for item in items if timestamp(item) > 0]
        duration_s = ((max(stamps) - min(stamps)) / 1000.0) if len(stamps) > 1 else 0.0
        throughput = (len(items) / duration_s) if duration_s > 0 else 0.0
        output.append(
            {
                "label": label,
                "samples": len(items),
                "errors": failures,
                "error_rate_pct": round(failures * 100 / len(items), 4) if items else 0,
                "avg_ms": round(sum(times) / len(times), 2) if times else 0,
                "min_ms": round(min(times), 2) if times else 0,
                "max_ms": round(max(times), 2) if times else 0,
                "p50_ms": round(percentile(times, 0.50), 2),
                "p90_ms": round(percentile(times, 0.90), 2),
                "p95_ms": round(percentile(times, 0.95), 2),
                "p99_ms": round(percentile(times, 0.99), 2),
                "throughput_rps": round(throughput, 4),
            }
        )
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("jtl", help="Path to a JMeter CSV JTL file")
    parser.add_argument("--out", help="Optional CSV output path")
    args = parser.parse_args()

    with Path(args.jtl).open(newline="", encoding="utf-8-sig") as fh:
        reader = csv.DictReader(fh)
        result = summarize(reader)

    fieldnames = [
        "label",
        "samples",
        "errors",
        "error_rate_pct",
        "avg_ms",
        "min_ms",
        "max_ms",
        "p50_ms",
        "p90_ms",
        "p95_ms",
        "p99_ms",
        "throughput_rps",
    ]
    if args.out:
        out = Path(args.out)
        out.parent.mkdir(parents=True, exist_ok=True)
        with out.open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(result)
    else:
        writer = csv.DictWriter(__import__("sys").stdout, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(result)


if __name__ == "__main__":
    main()
