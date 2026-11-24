#!/usr/bin/env python3
"""Check that every label in an inline SVG diagram fits.

scripts/check-svg-labels.py measures each <text> element with DejaVu Sans metrics
(the font resvg falls back to for `system-ui`) and reports labels that overflow
their box, leave the viewBox, or collide with another label. It is the mechanical
proof for models that cannot view the rendered image.

Needs Pillow: `pip install pillow`.

Usage:
    python3 scripts/check-svg-labels.py file.svg [min_label_px=12]

Exit status 0 when there are no problems, 1 otherwise.
"""

import sys
import xml.etree.ElementTree as ET

from PIL import ImageFont

REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
NS = "{http://www.w3.org/2000/svg}"
PARENTS = {}
FONTS = {}


def font(size, weight):
    key = (round(size), weight)
    if key not in FONTS:
        FONTS[key] = ImageFont.truetype(BOLD if weight >= 600 else REGULAR, max(1, round(size)))
    return FONTS[key]


def num(value, default=0.0):
    try:
        return float(str(value).replace("px", ""))
    except (TypeError, ValueError):
        return default


def inherited(el, attr, default=None):
    node = el
    while node is not None:
        if attr in node.attrib:
            return node.attrib[attr]
        node = PARENTS.get(node)
    return default


def main(path, min_px):
    root = ET.parse(path).getroot()
    PARENTS.clear()
    PARENTS.update({child: parent for parent in root.iter() for child in parent})
    vx, vy, vw, vh = [float(v) for v in root.attrib.get("viewBox", "0 0 800 600").split()]
    problems, rects, texts = [], [], []
    for el in root.iter():
        tag = el.tag.replace(NS, "")
        if tag == "rect":
            w, h = num(el.attrib.get("width")), num(el.attrib.get("height"))
            if w > 40 and h > 18:
                rects.append((num(el.attrib.get("x")), num(el.attrib.get("y")), w, h))
        elif tag == "text":
            if el.attrib.get("transform"):
                problems.append("label with a transform, not measured: %r" % ((el.text or "")[:50]))
                continue
            content = "".join(el.itertext()).strip()
            if not content:
                continue
            size = num(inherited(el, "font-size", "14"), 14)
            weight_raw = str(inherited(el, "font-weight", "400")).strip()
            weight = 600 if "bold" in weight_raw or weight_raw in ("600", "700", "800") else 400
            anchor = inherited(el, "text-anchor", "start")
            x, y = num(el.attrib.get("x")), num(el.attrib.get("y"))
            lines = content.split("\n")
            width = max(font(size, weight).getlength(line) for line in lines)
            left = x - width / 2 if anchor == "middle" else (x - width if anchor == "end" else x)
            top = y - size * 0.78
            height = size * 1.0 + (len(lines) - 1) * size * 1.25
            texts.append((left, top, width, height, content, size))
            if size < min_px:
                problems.append("label smaller than %gpx (%gpx): %r" % (min_px, size, content[:50]))
    for left, top, width, height, content, size in texts:
        if left < vx - 1 or left + width > vx + vw + 1 or top < vy - 1 or top + height > vy + vh + 1:
            problems.append("label leaves the viewBox: %r" % content[:60])
    for left, top, width, height, content, size in texts:
        cx, cy = left + width / 2, top + height / 2
        inside = [r for r in rects if r[0] <= cx <= r[0] + r[2] and r[1] <= cy <= r[1] + r[3]]
        if not inside:
            continue
        rx, ry, rw, rh = min(inside, key=lambda r: r[2] * r[3])
        if left < rx + 6 or left + width > rx + rw - 6:
            problems.append("label wider than its box (%.0fpx text in a %.0fpx box): %r" % (width, rw, content[:60]))
        if top < ry + 2 or top + height > ry + rh - 2:
            problems.append("label taller than its box: %r" % content[:60])
    for i, a in enumerate(texts):
        for b in texts[i + 1:]:
            if a[0] < b[0] + b[2] and b[0] < a[0] + a[2] and a[1] < b[1] + b[3] and b[1] < a[1] + a[3]:
                problems.append("labels collide: %r and %r" % (a[4][:40], b[4][:40]))
    print("%s: %d labels, %d boxes, %d problem(s)" % (path, len(texts), len(rects), len(problems)))
    for problem in problems:
        print("  -", problem)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1], float(sys.argv[2]) if len(sys.argv) > 2 else 12.0))
