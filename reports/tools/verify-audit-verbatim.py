#!/usr/bin/env python3
"""Check that every quoted English line in ai-audit-report.md is really verbatim.

The audit report promises that Full prompt and AI Output are byte-for-byte what
happened. This proves it: each quoted line is searched for in the raw Claude Code
transcripts. A line that cannot be found is either paraphrased or invented, and
either way it must not ship.

Vietnamese lines are skipped — those are the student's own Reasoning / Student
Fix, which are meant to be original prose, not quotations.

Exit status 0 = every quote traces to a transcript.
"""
import glob
import json
import os
import re
import sys

PROJ = os.path.expanduser(
    "~/.claude/projects/-Users-hbn-Documents-CS423-CSC15003-Testing-N08"
)
REPORT = os.path.join(os.path.dirname(__file__), "..", "ai-audit-report.md")

VIETNAMESE = re.compile(
    r"[àáâãèéêìíòóôõùúýăđĩũơưạảấầẩậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]"
)
MIN_LEN = 25   # shorter lines are too generic to attribute meaningfully


def corpus():
    """Every piece of text that ever crossed the wire, normalised to one blob."""
    parts = []
    for f in glob.glob(os.path.join(PROJ, "*.jsonl")):
        for line in open(f):
            try:
                d = json.loads(line)
            except Exception:
                continue
            c = (d.get("message") or {}).get("content")
            if isinstance(c, str):
                parts.append(c)
            elif isinstance(c, list):
                for b in c:
                    if not isinstance(b, dict):
                        continue
                    if b.get("type") == "text":
                        parts.append(b.get("text", ""))
                    elif b.get("type") == "tool_result":
                        r = b.get("content")
                        if isinstance(r, str):
                            parts.append(r)
                        elif isinstance(r, list):
                            for x in r:
                                if isinstance(x, dict) and x.get("type") == "text":
                                    parts.append(x.get("text", ""))
    return " ".join(" ".join(parts).split())


def main():
    blob = corpus()
    text = open(REPORT).read()
    checked, missing = 0, []
    # Fences may be longer than three backticks (an entry whose quoted output
    # itself contains ``` opens with ````). Match the opening run and require
    # the same run to close it, or the pairing drifts and later entries get
    # scanned as if prose were quoted text.
    fenced = re.compile(r"^(`{3,})[^\n]*\n(.*?)\n\1[ \t]*$", re.S | re.M)
    for _, block in fenced.findall(text):
        for ln in [l for l in block.strip().split("\n") if l.strip()]:
            if VIETNAMESE.search(ln.lower()) or len(ln.strip()) < MIN_LEN:
                continue
            checked += 1
            if " ".join(ln.split()) not in blob:
                missing.append(ln.strip())
    print(f"checked {checked} quoted lines against {len(blob)/1000:.0f}k chars of transcript")
    if missing:
        print(f"\n{len(missing)} line(s) NOT found — not verbatim:\n")
        for m in missing:
            print("  ✗ " + m[:110])
        return 1
    print("✓ every quoted line traces to a transcript")
    return 0


if __name__ == "__main__":
    sys.exit(main())
