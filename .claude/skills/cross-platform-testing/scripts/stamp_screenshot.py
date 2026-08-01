#!/usr/bin/env python3
"""Overlay a username watermark onto a cross-platform screenshot.

HW03 requires every cross-platform screenshot to overlay the username in the
form StudentID@hcmus.edu.vn (spec §6, Task 3). This stamps it directly onto
the image so it can't be cropped out accidentally, rather than relying on the
student to remember to type it into a browser dev-tools overlay each time.

Usage:
    python3 stamp_screenshot.py <input.png> <output.png> "23127300@hcmus.edu.vn" \
        [--corner br|bl|tr|tl] [--label "Chrome / Windows 11"]
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

CORNERS = {"br": "bottom-right", "bl": "bottom-left", "tr": "top-right", "tl": "top-left"}


def find_font(size: int) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def stamp(input_path: str, output_path: str, username: str, corner: str = "br", label: str | None = None) -> None:
    img = Image.open(input_path).convert("RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    font_size = max(14, img.width // 45)
    font = find_font(font_size)
    small_font = find_font(max(11, int(font_size * 0.75)))

    if label is None:
        extra = []
    elif isinstance(label, str):
        extra = [label]
    else:
        extra = list(label)
    lines = [username] + extra
    text_sizes = [draw.textbbox((0, 0), line, font=font if i == 0 else small_font) for i, line in enumerate(lines)]
    pad = int(font_size * 0.6)
    block_w = max(b[2] - b[0] for b in text_sizes) + pad * 2
    block_h = sum((b[3] - b[1]) for b in text_sizes) + pad * (len(lines) + 1)

    if corner == "br":
        x0, y0 = img.width - block_w - 12, img.height - block_h - 12
    elif corner == "bl":
        x0, y0 = 12, img.height - block_h - 12
    elif corner == "tr":
        x0, y0 = img.width - block_w - 12, 12
    else:
        x0, y0 = 12, 12

    draw.rectangle([x0, y0, x0 + block_w, y0 + block_h], fill=(0, 0, 0, 160))

    y = y0 + pad
    for i, line in enumerate(lines):
        f = font if i == 0 else small_font
        draw.text((x0 + pad, y), line, font=f, fill=(255, 255, 255, 255))
        bbox = draw.textbbox((0, 0), line, font=f)
        y += (bbox[3] - bbox[1]) + pad

    img.save(output_path)
    print(f"Stamped {input_path} -> {output_path} ({CORNERS[corner]}: {username!r}"
          + (f", {label!r}" if label else "") + ")")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("username", help="e.g. 23127300@hcmus.edu.vn")
    parser.add_argument("--corner", choices=CORNERS.keys(), default="br")
    parser.add_argument("--label", action="append", default=None,
                        help="extra line under the username; repeat for several lines "
                             "(e.g. --label 'Ha Bao Ngoc' --label 'Chrome 150 / macOS 26.5.2')")
    args = parser.parse_args()

    if "@hcmus.edu.vn" not in args.username:
        print("warning: username doesn't look like <StudentID>@hcmus.edu.vn — check §6 format", file=sys.stderr)

    stamp(args.input, args.output, args.username, args.corner, args.label)
