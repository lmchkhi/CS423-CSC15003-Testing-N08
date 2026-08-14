#!/usr/bin/env python3
"""Recompute performance metrics straight from a raw JMeter .jtl.

HW05 Task 2 asks for AI misinterpretations to be corrected with "the correct
value from your raw .jtl log". This script is how those values are produced, so
a TA can rerun it against the attached logs and get the same numbers.

Percentiles use the nearest-rank method on the sorted sample list, which is
what JMeter's own Aggregate Report does, so the numbers here and in the HTML
dashboard agree.

Usage:
    python3 perf/scripts/analyze_jtl.py perf/results/jtl/<file>.jtl
    python3 perf/scripts/analyze_jtl.py <file>.jtl --json
"""
import argparse
import csv
import json
import math
import pathlib
from collections import Counter, defaultdict

PERCENTILES = (50, 90, 95, 99)


def load_samples(path):
    """Read a .jtl (CSV with a header row) into a list of normalised dicts."""
    out = []
    with open(path, newline="", encoding="utf-8", errors="replace") as fh:
        for row in csv.DictReader(fh):
            if not row.get("timeStamp"):
                continue
            out.append({
                "ts": int(row["timeStamp"]),
                "elapsed": int(row["elapsed"]),
                "label": row["label"],
                "code": row["responseCode"],
                "success": row["success"].strip().lower() == "true",
                "failure": row.get("failureMessage") or "",
                "threads": int(row.get("allThreads") or 0),
            })
    return out


def percentile(values, p):
    """Nearest-rank percentile over an already-sorted list."""
    if not values:
        return 0
    if p >= 100:
        return values[-1]
    rank = max(1, math.ceil(p / 100.0 * len(values)))
    return values[rank - 1]


def steady_state(samples, skip_seconds):
    """Drop every sample that started within skip_seconds of the run's start.

    Ramp-up inflates the mean and hides the plateau. Reporting a steady-state
    figure alongside the whole-run figure is the honest way to describe a
    ramped test, and it is how the Task 2 corrections are computed.
    """
    if not samples or skip_seconds <= 0:
        return list(samples)
    cutoff = min(s["ts"] for s in samples) + skip_seconds * 1000
    return [s for s in samples if s["ts"] >= cutoff]


def _stats(samples):
    elapsed = sorted(s["elapsed"] for s in samples)
    count = len(samples)
    errors = sum(1 for s in samples if not s["success"])
    first, last = min(s["ts"] for s in samples), max(s["ts"] for s in samples)
    # JMeter's throughput denominator is the wall-clock span from the first
    # sample's start to the *last sample's end* (ts + elapsed), not to the
    # last sample's start. Using start-to-start would overstate throughput
    # whenever the final sample in the window is slow — and on this SUT
    # (one SQLite file) a slow last sample under checkout write-contention
    # is the expected case, not an edge case. Keep this as ts+elapsed so the
    # figure agrees with the .jtl's own HTML dashboard; do not "simplify"
    # it back to last - first.
    window_end = max(s["ts"] + s["elapsed"] for s in samples)
    window = (window_end - first) / 1000.0
    stats = {
        "count": count,
        "errors": errors,
        "error_pct": round(100.0 * errors / count, 3) if count else 0.0,
        "mean": round(sum(elapsed) / count, 1) if count else 0.0,
        "min": elapsed[0] if elapsed else 0,
        "max": elapsed[-1] if elapsed else 0,
        "throughput": round(count / window, 3) if window > 0 else float(count),
        "codes": dict(Counter(s["code"] for s in samples)),
        "start_ms": first,
        "end_ms": last,
    }
    for p in PERCENTILES:
        stats[f"p{p}"] = percentile(elapsed, p)
    return stats


def summarize(samples):
    if not samples:
        return {"overall": None, "by_label": {}}
    by_label = defaultdict(list)
    for s in samples:
        by_label[s["label"]].append(s)
    return {
        "overall": _stats(samples),
        "by_label": {label: _stats(rows) for label, rows in by_label.items()},
    }


def _fmt(name, s):
    return (f"{name:<34} {s['count']:>7} {s['errors']:>7} {s['error_pct']:>7.2f} "
            f"{s['mean']:>9.1f} {s['p50']:>7} {s['p90']:>7} {s['p95']:>7} "
            f"{s['p99']:>7} {s['max']:>8} {s['throughput']:>9.2f}")


def render(result, title):
    lines = [f"== {title}", "",
             f"{'label':<34} {'count':>7} {'errors':>7} {'err%':>7} "
             f"{'mean':>9} {'p50':>7} {'p90':>7} {'p95':>7} {'p99':>7} "
             f"{'max':>8} {'req/s':>9}",
             "-" * 128]
    for label in sorted(result["by_label"]):
        lines.append(_fmt(label, result["by_label"][label]))
    lines.append("-" * 128)
    lines.append(_fmt("ALL", result["overall"]))
    lines.append("")
    lines.append("Response codes per label:")
    for label in sorted(result["by_label"]):
        codes = result["by_label"][label]["codes"]
        lines.append(f"  {label:<34} " + ", ".join(f"{k}={v}" for k, v in sorted(codes.items())))
    return "\n".join(lines)


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("jtl", type=pathlib.Path)
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--skip-ramp", type=int, default=0, metavar="SECONDS",
                    help="exclude samples started within SECONDS of the run start")
    args = ap.parse_args()

    samples = load_samples(args.jtl)
    title = args.jtl.name
    if args.skip_ramp:
        before = len(samples)
        samples = steady_state(samples, args.skip_ramp)
        title += f" (steady state, first {args.skip_ramp}s dropped: " \
                 f"{before - len(samples)} of {before} samples)"
    result = summarize(samples)
    if result["overall"] is None:
        print(f"{args.jtl}: no samples")
        return
    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print(render(result, title))


if __name__ == "__main__":
    main()
