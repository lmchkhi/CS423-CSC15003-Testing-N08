#!/usr/bin/env python3
"""Convert HW03 markdown deliverables to PDF using Google Chrome headless.

HW03 §14 requires a PDF alongside the Markdown for the main report, the AI
Critique and the AI Audit Report. README and the raw prompt log are exported
too so the whole submission reads the same offline.
"""

import subprocess
import tempfile
import base64
import re
from pathlib import Path

# Markdown source -> PDF destination.
# The first three are the PDFs §14 requires; the rest are for convenience.
EXPORTS = [
    ("reports/main-report.md", "reports/main-report.pdf"),
    ("reports/ai-critique.md", "reports/ai-critique.pdf"),
    ("reports/ai-audit-report.md", "reports/ai-audit-report.pdf"),
    ("README.md", "README.pdf"),
    ("reports/prompt-log.md", "reports/prompt-log.pdf"),
]

BASE_DIR = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def inline_images(html_content, md_dir):
    """Replace relative <img> src with base64 data URIs."""

    def replace_src(match):
        src = match.group(1)
        # Skip external URLs
        if src.startswith("http"):
            return match.group(0)

        # Resolve absolute path
        img_path = Path(md_dir, src).resolve()
        if not img_path.exists():
            return f'<img src="" alt="(image not found: {src})" style="max-width:100%;height:auto;border:2px solid red;">'

        with open(img_path, "rb") as f:
            data = f.read()

        ext = img_path.suffix.lower()
        mime = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".webp": "image/webp",
        }.get(ext, "image/png")

        b64 = base64.b64encode(data).decode("ascii")
        return (
            f'<img src="data:{mime};base64,{b64}" '
            f'style="max-width:100%;height:auto;">'
        )

    # Match <img ... src="..." ...>
    return re.sub(r'<img\s+[^>]*src="([^"]+)"[^>]*>', replace_src, html_content)


def md_to_html(md_path):
    """Convert markdown to basic HTML, inlining local images."""
    import markdown

    with open(md_path, "r", encoding="utf-8") as f:
        md_content = f.read()

    md_dir = Path(md_path).parent

    html_content = markdown.markdown(
        md_content,
        extensions=["tables", "fenced_code", "nl2br", "sane_lists"],
    )

    # Inline images as base64
    html_content = inline_images(html_content, md_dir)

    title = Path(md_path).name.replace(".md", "").replace(".txt", "")

    template = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>{title}</title>
<style>
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    max-width: 900px;
    margin: 2cm auto;
    padding: 0 1cm;
    color: #222;
  }}
  h1 {{ font-size: 20pt; border-bottom: 2px solid #333; padding-bottom: 8px; margin-top: 24px; }}
  h2 {{ font-size: 16pt; border-bottom: 1px solid #aaa; padding-bottom: 4px; margin-top: 20px; }}
  h3 {{ font-size: 13pt; margin-top: 16px; }}
  h4 {{ font-size: 11pt; margin-top: 14px; }}
  table {{ border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 10pt; }}
  th, td {{ border: 1px solid #aaa; padding: 6px 8px; text-align: left; }}
  th {{ background: #f0f0f0; font-weight: bold; }}
  tr:nth-child(even) {{ background: #fafafa; }}
  code {{ background: #f5f5f5; padding: 1px 4px; border-radius: 3px; font-size: 9pt; }}
  pre {{ background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 9pt; }}
  img {{ max-width: 100%; height: auto; }}
  details {{ border: 1px solid #ddd; padding: 8px; margin: 8px 0; }}
  summary {{ font-weight: 600; }}
  blockquote {{ border-left: 3px solid #ccc; margin-left: 0; padding-left: 12px; color: #555; }}
  a {{ color: #0066cc; }}
  hr {{ border: none; border-top: 1px solid #ccc; margin: 20px 0; }}
  .mermaid {{ background: #fff; }}
</style>
</head>
<body>
{html_content}
</body>
</html>"""

    return template


def export_to_pdf(html_path, pdf_path):
    """Export HTML to PDF using Chrome headless."""
    cmd = [
        CHROME,
        "--headless=new",
        "--no-sandbox",
        f"--print-to-pdf={pdf_path}",
        # Newer Chrome renamed this flag; pass both so the date/temp-path
        # header and footer are suppressed whichever build is installed.
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        html_path.as_uri(),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    return result.returncode == 0


def main():
    if not Path(CHROME).exists():
        raise SystemExit(f"Google Chrome not found at: {CHROME}")

    for md_file, pdf_file in EXPORTS:
        md_path = BASE_DIR / md_file
        pdf_path = BASE_DIR / pdf_file
        if not md_path.exists():
            print(f"  SKIP  {md_file} - not found")
            continue

        pdf_path.parent.mkdir(parents=True, exist_ok=True)
        html = md_to_html(md_path)
        with tempfile.NamedTemporaryFile(
            suffix=".html", delete=False, mode="w", encoding="utf-8"
        ) as f:
            f.write(html)
            tmp_html = Path(f.name)

        print(f"  Exporting {md_file} -> {pdf_file} ...", end=" ", flush=True)
        ok = export_to_pdf(tmp_html, pdf_path)
        tmp_html.unlink(missing_ok=True)

        if ok:
            print("OK")
        else:
            print("FAILED")

    print("\nDone.")


if __name__ == "__main__":
    main()
