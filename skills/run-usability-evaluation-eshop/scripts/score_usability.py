#!/usr/bin/env python3
import argparse
import csv
import statistics
import sys


def parse_number(value, label):
    try:
        return float(value)
    except ValueError:
        raise ValueError(f"{label} must be numeric, got {value!r}")


def read_rows(path, expected_count):
    with open(path, newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        required = ["participant_id"] + [f"q{i}" for i in range(1, expected_count + 1)]
        missing = [column for column in required if column not in (reader.fieldnames or [])]
        if missing:
            raise ValueError(f"Missing columns: {', '.join(missing)}")
        return list(reader)


def score_sus(path):
    rows = read_rows(path, 10)
    results = []
    for row in rows:
        values = [parse_number(row[f"q{i}"], f"{row['participant_id']} q{i}") for i in range(1, 11)]
        for idx, value in enumerate(values, start=1):
            if value < 1 or value > 5 or value != int(value):
                raise ValueError(f"{row['participant_id']} q{idx} must be an integer from 1 to 5")
        contribution = 0
        for idx, value in enumerate(values, start=1):
            contribution += value - 1 if idx % 2 == 1 else 5 - value
        results.append((row["participant_id"], contribution * 2.5))
    return results


def score_ueqs(path):
    rows = read_rows(path, 8)
    results = []
    for row in rows:
        values = [parse_number(row[f"q{i}"], f"{row['participant_id']} q{i}") for i in range(1, 9)]
        for idx, value in enumerate(values, start=1):
            if value < -3 or value > 3:
                raise ValueError(f"{row['participant_id']} q{idx} must be from -3 to 3")
        pragmatic = statistics.mean(values[:4])
        hedonic = statistics.mean(values[4:])
        overall = statistics.mean(values)
        results.append((row["participant_id"], pragmatic, hedonic, overall))
    return results


def sus_rating(score):
    if score >= 85:
        return "Excellent"
    if score >= 70:
        return "Good/acceptable"
    if score >= 50:
        return "Marginal"
    return "Poor"


def print_sus(results):
    scores = [score for _, score in results]
    print("| Participant | SUS score | Rating |")
    print("| --- | ---: | --- |")
    for participant, score in results:
        print(f"| {participant} | {score:.1f} | {sus_rating(score)} |")
    print()
    print(f"- Mean SUS: {statistics.mean(scores):.1f}")
    print(f"- Min SUS: {min(scores):.1f}")
    print(f"- Max SUS: {max(scores):.1f}")


def print_ueqs(results):
    pragmatic = [row[1] for row in results]
    hedonic = [row[2] for row in results]
    overall = [row[3] for row in results]
    print("| Participant | Pragmatic | Hedonic | Overall |")
    print("| --- | ---: | ---: | ---: |")
    for participant, pragmatic_score, hedonic_score, overall_score in results:
        print(f"| {participant} | {pragmatic_score:.2f} | {hedonic_score:.2f} | {overall_score:.2f} |")
    print()
    print(f"- Mean pragmatic: {statistics.mean(pragmatic):.2f}")
    print(f"- Mean hedonic: {statistics.mean(hedonic):.2f}")
    print(f"- Mean overall: {statistics.mean(overall):.2f}")


def main():
    parser = argparse.ArgumentParser(description="Score SUS or UEQ-S usability responses from CSV.")
    parser.add_argument("scale", choices=["sus", "ueqs"])
    parser.add_argument("csv_path")
    args = parser.parse_args()

    try:
        if args.scale == "sus":
            print_sus(score_sus(args.csv_path))
        else:
            print_ueqs(score_ueqs(args.csv_path))
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
