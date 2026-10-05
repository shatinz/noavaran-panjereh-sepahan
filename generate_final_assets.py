import os
import sys
import re
from xml.etree import ElementTree as ET
from matplotlib.path import Path
from matplotlib.textpath import TextPath
from matplotlib.font_manager import FontProperties
from playwright.sync_api import sync_playwright
import fitz

sys.stdout.reconfigure(encoding='utf-8')

# Read original Corel SVG
corel_svg_path = r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.svg'
with open(corel_svg_path, 'r', encoding='utf-8') as f:
    corel_svg = f.read()

# Read public/logo.svg to extract exact vector glyphs for P Yekan
pdf_svg_path = r'c:\Users\PC\prj\noavaran\public\logo.svg'
with open(pdf_svg_path, 'r', encoding='utf-8') as f:
    pdf_svg = f.read()

glyph_defs = dict(re.findall(r'<path id="(font_4_[0-9]+)" d="([^"]+)"', pdf_svg))
uses = re.findall(r'<use data-text="([^"]*)" xlink:href="#(font_4_[0-9]+)" transform="matrix\(([^)]+)\)" fill="([^"]+)"', pdf_svg)

scale_factor = 6.720

# 1. Generate pure vector paths for "شماره ثبت: ۳۸۹۲"
# In public/logo.svg, uses[0:15] are the glyphs:
# 3, 8, 9, 2, :, space, ت(final), ب(medial), ث(initial), space, ه, ر, ا, م, ش
shomareh_paths = []
for dt, href, mat, fill in uses[:15]:
    vals = [float(x) for x in mat.split(',')]
    sx = vals[0] * scale_factor
    sy = vals[3] * scale_factor
    tx = vals[4] * scale_factor - 10.0
    ty = vals[5] * scale_factor - 14.0
    d = glyph_defs.get(href, "")
    if d:
        shomareh_paths.append(f'<path d="{d}" transform="matrix({sx:.3f},0,0,{sy:.3f},{tx:.2f},{ty:.2f})" fill="#FEFEFE" />')

# 2. Generate pure vector paths for "سهامی خاص"
sehami_paths = []
for dt, href, mat, fill in uses[15:]:
    vals = [float(x) for x in mat.split(',')]
    sx = vals[0] * scale_factor
    sy = vals[3] * scale_factor
    tx = vals[4] * scale_factor - 10.0
    ty = vals[5] * scale_factor - 14.0
    d = glyph_defs.get(href, "")
    if d:
        sehami_paths.append(f'<path d="{d}" transform="matrix({sx:.3f},0,0,{sy:.3f},{tx:.2f},{ty:.2f})" fill="#FEFEFE" />')

shomareh_svg_group = "\n  ".join(shomareh_paths)
sehami_svg_group = "\n  ".join(sehami_paths)

def path_to_svg_d(path, scale=1.0, offset_x=0.0, offset_y=0.0):
    cmds = []
    for vertices, code in path.iter_segments():
        if code == Path.MOVETO:
            cmds.append(f"M{vertices[0]*scale + offset_x:.2f},{-vertices[1]*scale + offset_y:.2f}")
        elif code == Path.LINETO:
            cmds.append(f"L{vertices[0]*scale + offset_x:.2f},{-vertices[1]*scale + offset_y:.2f}")
        elif code == Path.CURVE3:
            cmds.append(f"Q{vertices[0]*scale + offset_x:.2f},{-vertices[1]*scale + offset_y:.2f} {vertices[2]*scale + offset_x:.2f},{-vertices[3]*scale + offset_y:.2f}")
        elif code == Path.CURVE4:
            cmds.append(f"C{vertices[0]*scale + offset_x:.2f},{-vertices[1]*scale + offset_y:.2f} {vertices[2]*scale + offset_x:.2f},{-vertices[3]*scale + offset_y:.2f} {vertices[4]*scale + offset_x:.2f},{-vertices[5]*scale + offset_y:.2f}")
        elif code == Path.CLOSEPOLY:
            cmds.append("Z")
    return " ".join(cmds)

def build_tracked_text_path(text, font_prop, size=100, tracking=0.0):
    cmds = []
    cur_x = 0.0
    all_vertices = []
    all_codes = []
    for char in text:
        tp = TextPath((cur_x, 0), char, size=size, prop=font_prop)
        if len(tp.vertices) > 0:
            all_vertices.extend(tp.vertices)
            all_codes.extend(tp.codes)
            bbox = tp.get_extents()
            cur_x = bbox.x1 + tracking * size
        else:
            cur_x += size * 0.3 + tracking * size
    import numpy as np
    return Path(np.array(all_vertices), np.array(all_codes))

# 3. Build domain vector path with Montserrat-Bold (700)
montserrat_font_path = os.path.abspath('Montserrat-700.ttf')
fp_bold = FontProperties(fname=montserrat_font_path)

def make_logo_svg(domain_text, target_width, tracking=0.025, y_baseline=4520.0):
    tp = build_tracked_text_path(domain_text, fp_bold, size=100, tracking=tracking)
    bbox = tp.get_extents()
    scale = target_width / bbox.width
    offset_x = 2095.88 - (bbox.x0 + bbox.x1) * scale / 2.0
    offset_y = y_baseline
    
    text_d = path_to_svg_d(tp, scale=scale, offset_x=offset_x, offset_y=offset_y)
    
    # Replace the text elements in corel_svg
    svg_out = corel_svg
    # Remove FontID0 and FontID1 in defs if desired or keep clean
    svg_out = re.sub(r'<text[^>]+>3892: تبث هرامش</text>', shomareh_svg_group, svg_out)
    svg_out = re.sub(r'<text[^>]+>سهامی خاص</text>', sehami_svg_group, svg_out)
    domain_tag = f'<path class="fil12" d="{text_d}" />'
    svg_out = re.sub(r'<g transform="matrix\(0\.622123[^>]+>.*?</g>', domain_tag, svg_out, flags=re.DOTALL)
    return svg_out

# Generate SVGs
svg_with_www = make_logo_svg("www.NoavaranPanjereh.com", target_width=3050.0, tracking=0.025)
svg_no_www = make_logo_svg("NoavaranPanjereh.com", target_width=2750.0, tracking=0.035)

output_files = [
    # 1. Main repo public locations
    (r'c:\Users\PC\prj\noavaran\public\logo.svg', svg_with_www),
    (r'c:\Users\PC\prj\noavaran\public\images\logo.svg', svg_with_www),
    (r'c:\Users\PC\prj\noavaran\public\logo-nowww.svg', svg_no_www),
    # 2. User Downloads locations
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo.svg', svg_with_www),
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo-nowww.svg', svg_no_www),
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.svg', svg_with_www),
]

for file_path, content in output_files:
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Saved SVG: {file_path}")

# 4. Generate Vector PDFs using Playwright (Chromium Skia vector engine)
pdf_targets = [
    (r'c:\Users\PC\prj\noavaran\public\logo.pdf', r'c:\Users\PC\prj\noavaran\public\logo.svg'),
    (r'c:\Users\PC\prj\noavaran\public\images\logo.pdf', r'c:\Users\PC\prj\noavaran\public\logo.svg'),
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo.pdf', r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo.svg'),
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo-nowww.pdf', r'C:\Users\PC\Downloads\Eitaa Desktop\Noavaran-Logo-nowww.svg'),
    (r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.pdf', r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.svg'),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for pdf_out, svg_in in pdf_targets:
        page = browser.new_page()
        page.goto(f'file:///{os.path.abspath(svg_in).replace(os.sep, "/")}')
        svg_box = page.locator('svg').bounding_box()
        page.pdf(
            path=pdf_out,
            width=f'{int(svg_box["width"])}px',
            height=f'{int(svg_box["height"])}px',
            print_background=True,
            margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
        )
        print(f"Saved Vector PDF: {pdf_out}")
    browser.close()

print("All vector SVGs and PDFs successfully generated!")
