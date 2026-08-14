#!/usr/bin/env python3
"""Create the standard HW05 artifact directory tree."""

from __future__ import annotations

import argparse
from pathlib import Path


DIRS = [
    "plans",
    "data",
    "results/load",
    "results/stress",
    "results/spike",
    "results/endurance",
    "html/load",
    "html/stress",
    "html/spike",
    "html/endurance",
    "evidence/screenshots",
    "evidence/hardware",
    "evidence/notes",
    "analysis",
]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", default="testing-artifacts/hw05")
    args = parser.parse_args()

    root = Path(args.root)
    for rel in DIRS:
        path = root / rel
        path.mkdir(parents=True, exist_ok=True)
        print(path)


if __name__ == "__main__":
    main()
