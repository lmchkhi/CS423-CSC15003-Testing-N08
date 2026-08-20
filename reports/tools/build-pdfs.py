#!/usr/bin/env python3
"""Render the Markdown deliverables HW05 §14 wants as PDF too.

§14 asks for the main report, the AI Critique and the AI Audit Report as
"Markdown + PDF". The Markdown files are the source of truth; this script is
the only way the PDFs are produced, so the two can never drift by hand.

Rendering goes Markdown -> HTML -> PDF through headless Chromium, which is what
keeps Vietnamese diacritics correct in body text, tables and code blocks alike.
First run needs the toolchain:

    cd reports/tools && npm install && npx playwright install chromium

Then, from anywhere in the repo:

    python3 reports/tools/build-pdfs.py
"""
import json
import pathlib
import subprocess
import sys
import tempfile

import markdown

REPO = pathlib.Path(__file__).resolve().parents[2]

# (source markdown, output pdf, title shown in the PDF footer)
DOCS = [
    ("reports/main-report.md", "reports/pdf/main-report.pdf",
     "HW05 — Báo cáo chính"),
    ("reports/ai-critique.md", "reports/pdf/ai-critique.pdf",
     "HW05 — AI Critique"),
    ("reports/ai-audit-report.md", "reports/pdf/ai-audit-report.pdf",
     "HW05 — AI Audit Report"),
    # §6 Task 2 (the misinterpretation hunt) and §6 Task 3 (the continuous
    # performance-testing proposal) are linked from the main report rather than
    # inlined, so each ships as its own PDF.
    ("reports/ai-analysis-review.md", "reports/pdf/ai-analysis-review.pdf",
     "HW05 — Rà soát phân tích của AI"),
    ("reports/continuous-perf-proposal.md",
     "reports/pdf/continuous-perf-proposal.pdf",
     "HW05 — Đề xuất Continuous Performance Testing"),
]

# Helvetica Neue / Menlo both carry the full Vietnamese diacritic set on macOS.
# The audit report puts Vietnamese inside code fences (test titles), so the
# monospace stack needs the coverage just as much as the body stack does.
CSS = """
@page { margin: 18mm 16mm; }
* { box-sizing: border-box; }
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10.5pt; line-height: 1.55; color: #111; margin: 0;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { line-height: 1.3; margin: 1.4em 0 .5em; page-break-after: avoid; }
h1 { font-size: 19pt; border-bottom: 2px solid #222; padding-bottom: .25em; }
h2 { font-size: 15pt; border-bottom: 1px solid #bbb; padding-bottom: .2em; }
h3 { font-size: 12.5pt; }
h4 { font-size: 11pt; }
p, li { orphans: 2; widows: 2; }
a { color: #0b4fa0; text-decoration: none; word-break: break-all; }
blockquote {
  margin: 1em 0; padding: .4em 1em; border-left: 3px solid #ccc;
  background: #fafafa; color: #333;
}
code {
  font-family: Menlo, "SF Mono", Monaco, Consolas, monospace;
  font-size: 9pt; background: #f2f2f2; padding: .1em .3em; border-radius: 3px;
}
pre {
  background: #f6f6f6; border: 1px solid #e0e0e0; border-radius: 4px;
  padding: .7em .9em; overflow: visible;
}
/* Long transcript lines must wrap instead of being clipped at the page edge. */
pre code {
  display: block; background: none; padding: 0; font-size: 8.4pt;
  line-height: 1.45; white-space: pre-wrap; word-break: break-word;
}
/* `auto`, not `fixed`: the requirement ledger has eight columns of wildly
   different widths, and equal-width columns shred the long path cells into
   unreadable vertical strips. */
table {
  border-collapse: collapse; width: 100%; margin: 1em 0;
  table-layout: auto; font-size: 8.8pt;
}
/* break-word, not anywhere: `anywhere` lets the layout squeeze a column until
   even "Feature" splits into "Fe/atu/re". break-word only breaks a word that
   genuinely cannot fit on a line of its own. */
th, td {
  border: 1px solid #c8c8c8; padding: .35em .45em;
  text-align: left; vertical-align: top;
  overflow-wrap: break-word; word-break: normal;
}
/* Inline code inside a table must be allowed to wrap, or a long file path
   sets an unbreakable minimum width and pushes the table off the page. */
td code, th code { font-size: 8pt; overflow-wrap: anywhere; }
th { background: #efefef; font-weight: 600; }
tr { page-break-inside: avoid; }
hr { border: none; border-top: 1px solid #ddd; margin: 1.6em 0; }
img { max-width: 100%; }
"""

def render_html(md_path: pathlib.Path, title: str) -> str:
    text = md_path.read_text(encoding="utf-8")
    # No nl2br: these documents are hard-wrapped at ~76 columns, and treating
    # every newline as a <br> would shred every paragraph into ragged lines.
    body = markdown.markdown(
        text,
        extensions=["tables", "fenced_code", "sane_lists", "attr_list"],
    )
    return (
        f'<!doctype html><html lang="vi"><head><meta charset="utf-8">'
        f"<title>{title}</title><style>{CSS}</style></head>"
        f"<body>{body}</body></html>"
    )


def main() -> int:
    out_dir = REPO / "reports" / "pdf"
    out_dir.mkdir(parents=True, exist_ok=True)

    # The HTML is staged next to the sources so relative links (images in the
    # bug reports) resolve the same way they do in the Markdown.
    stage = pathlib.Path(tempfile.mkdtemp(prefix="hw05-pdf-"))
    jobs = []
    for src, dst, title in DOCS:
        src_path = REPO / src
        if not src_path.exists():
            print(f"  MISSING SOURCE {src}", file=sys.stderr)
            return 1
        html_path = stage / (src_path.stem + ".html")
        html_path.write_text(render_html(src_path, title), encoding="utf-8")
        jobs.append({"html": str(html_path), "pdf": str(REPO / dst),
                     "title": title})

    jobs_file = stage / "jobs.json"
    jobs_file.write_text(json.dumps(jobs), encoding="utf-8")

    # `playwright` resolves out of reports/tools/node_modules, so run there.
    tools = REPO / "reports" / "tools"
    if not (tools / "node_modules" / "playwright").exists():
        print("  MISSING TOOLCHAIN — run: cd reports/tools && npm install "
              "&& npx playwright install chromium", file=sys.stderr)
        return 1
    result = subprocess.run(
        ["node", str(tools / "html-to-pdf.mjs"), str(jobs_file)],
        cwd=tools,
    )
    if result.returncode != 0:
        return result.returncode

    for _, dst, _ in DOCS:
        print(f"  {dst}  ({(REPO / dst).stat().st_size / 1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
