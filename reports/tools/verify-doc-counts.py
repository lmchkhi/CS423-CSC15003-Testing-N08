#!/usr/bin/env python3
"""Check that every document quoting the audit-entry counts agrees with reality.

`ai-audit-report.md` is the source of truth: the number of `## Entry #` headings
and the verdict stamped in each entry's `### (3) Verdict` section. Four other
places restate those numbers, and each new entry silently invalidates all four:

  - ai-audit-report.md  §5 summary table
  - ai-audit-report.md  §6 conclusion opening line
  - main-report.md      §6 review paragraph + §7 appendix table
  - ai-critique.md      closing sentence

This drifted twice before it was caught by hand (23 vs 21, then 25 vs 23).
Run it before submitting; exit status 0 means every document agrees.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPORTS = os.path.dirname(HERE)
AUDIT = os.path.join(REPORTS, "ai-audit-report.md")
MAIN = os.path.join(REPORTS, "main-report.md")
CRITIQUE = os.path.join(REPORTS, "ai-critique.md")


def truth():
    """(total, {verdict: count}) straight from the entries themselves."""
    text = open(AUDIT, encoding="utf-8").read()
    total = len(re.findall(r"^## Entry #\d+", text, re.M))
    verdicts = re.findall(r"^\*\*`(VALID|INVALID|INCOMPLETE)`\*\*", text, re.M)
    counts = {v: verdicts.count(v) for v in ("VALID", "INCOMPLETE", "INVALID")}
    return total, counts, text


def main():
    total, counts, audit = truth()
    problems = []

    if sum(counts.values()) != total:
        problems.append(
            f"{total} entries but {sum(counts.values())} verdict stamps — "
            "an entry is missing its `### (3) Verdict` line"
        )

    # §5 summary table rows: | `VALID` | 12 | 48.0% |
    for verdict, n in counts.items():
        row = re.search(rf"\|\s*`{verdict}`\s*\|\s*(\d+)\s*\|", audit)
        if not row:
            problems.append(f"audit §5: no table row for `{verdict}`")
        elif int(row.group(1)) != n:
            problems.append(
                f"audit §5: `{verdict}` row says {row.group(1)}, entries say {n}"
            )

    m = re.search(r"\*\*Tổng số entry đã audit\*\*\s*\|\s*\*\*(\d+)\*\*", audit)
    if not m:
        problems.append("audit §5: total row not found")
    elif int(m.group(1)) != total:
        problems.append(f"audit §5: total says {m.group(1)}, entries say {total}")

    # §6 conclusion opening line
    m = re.search(r"Nhìn trên toàn bộ (\d+) entry", audit)
    if not m:
        problems.append("audit §6: conclusion opening line not found")
    elif int(m.group(1)) != total:
        problems.append(f"audit §6: conclusion says {m.group(1)}, entries say {total}")

    main_md = open(MAIN, encoding="utf-8").read()
    m = re.search(
        r"(\d+) entry đã audit: (\d+) `VALID`, (\d+) `INCOMPLETE`, (\d+) `INVALID`",
        main_md,
    )
    if not m:
        problems.append("main-report §6: audit summary sentence not found")
    else:
        got = tuple(int(g) for g in m.groups())
        want = (total, counts["VALID"], counts["INCOMPLETE"], counts["INVALID"])
        if got != want:
            problems.append(f"main-report §6: says {got}, entries say {want}")

    m = re.search(r"ai-audit-report\.md\)\s*—\s*(\d+) entry", main_md)
    if not m:
        problems.append("main-report §7: appendix row not found")
    elif int(m.group(1)) != total:
        problems.append(f"main-report §7: says {m.group(1)}, entries say {total}")

    crit = open(CRITIQUE, encoding="utf-8").read()
    m = re.search(r"(\d+)/(\d+) entry", crit)
    if not m:
        problems.append("ai-critique: closing ratio not found")
    else:
        got = (int(m.group(1)), int(m.group(2)))
        want = (counts["INCOMPLETE"], total)
        if got != want:
            problems.append(f"ai-critique: says {got[0]}/{got[1]}, entries say {want[0]}/{want[1]}")

    print(
        f"audit entries: {total} "
        f"({counts['VALID']} VALID / {counts['INCOMPLETE']} INCOMPLETE / "
        f"{counts['INVALID']} INVALID)"
    )
    if problems:
        print(f"\n{len(problems)} document(s) out of sync:\n")
        for p in problems:
            print("  ✗ " + p)
        return 1
    print("✓ every document quoting these counts agrees")
    return 0


if __name__ == "__main__":
    sys.exit(main())
