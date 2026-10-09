import os
import re
import subprocess
from playwright.sync_api import sync_playwright
from PIL import Image
import numpy as np

sys_base = r'c:\Users\PC\prj\noavaran'
public_images = os.path.join(sys_base, 'public', 'images')
public_dir = os.path.join(sys_base, 'public')
app_dir = os.path.join(sys_base, 'app')

# 1. Get original clean SVG from dcbe49b (before black silhouette bug)
svg_raw = subprocess.check_output(['git', 'show', 'dcbe49b:public/images/logo.svg']).decode('utf-8')

# 2. Remove ONLY the domain text (.fil12)
svg_clean = re.sub(r'<path class="fil12"[^>]+/>\s*', '', svg_raw)

# 3. Adjust viewBox to square centered on the circular badge without the bottom domain
vb_x = -124.0
vb_y = -220.0
vb_size = 4440.0

svg_square = re.sub(
    r'viewBox="[^"]+"',
    f'viewBox="{vb_x:.2f} {vb_y:.2f} {vb_size:.2f} {vb_size:.2f}"',
    svg_clean
)
svg_square = re.sub(r'width="[^"]+"', 'width="8.65in"', svg_square)
svg_square = re.sub(r'height="[^"]+"', 'height="8.65in"', svg_square)

temp_svg = os.path.abspath('temp_logo_clean.svg')
with open(temp_svg, 'w', encoding='utf-8') as f:
    f.write(svg_square)

# Save SVG to all locations
for p in [
    os.path.join(public_images, 'logo.svg'),
    os.path.join(public_dir, 'logo.svg'),
    os.path.join(public_dir, 'logo-nowww.svg')
]:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(svg_square)
    print("Saved clean SVG:", p)

temp_png = os.path.abspath('temp_logo_2048.png')
pdf_out_images = os.path.join(public_images, 'logo.pdf')
pdf_out_public = os.path.join(public_dir, 'logo.pdf')

# 4. Render using Chromium Playwright for 100% color and CSS fidelity
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 2048, 'height': 2048}, device_scale_factor=2)
    page.goto(f'file:///{temp_svg.replace(os.sep, "/")}')
    svg_el = page.locator('svg')
    svg_el.screenshot(path=temp_png, omit_background=True)
    
    # Also save vector PDF
    svg_box = svg_el.bounding_box()
    for pdf_out in [pdf_out_images, pdf_out_public]:
        page.pdf(
            path=pdf_out,
            width=f'{int(svg_box["width"])}px',
            height=f'{int(svg_box["height"])}px',
            print_background=True,
            margin={'top': '0', 'right': '0', 'bottom': '0', 'left': '0'}
        )
        print("Saved vector PDF via Chromium:", pdf_out)
    browser.close()

# 5. Crop and square PNG
im = Image.open(temp_png)
bbox = im.getbbox()
cropped = im.crop(bbox)
w, h = cropped.size
pad = int(max(w, h) * 0.04)
sq_size = max(w, h) + 2 * pad
sq = Image.new("RGBA", (sq_size, sq_size), (0, 0, 0, 0))
sq.paste(cropped, ((sq_size - w) // 2, (sq_size - h) // 2), cropped)

logo_1024 = sq.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_512 = sq.resize((512, 512), Image.Resampling.LANCZOS)

logo_1024.save(os.path.join(public_images, 'logo.png'), format='PNG')
logo_512.save(os.path.join(public_images, 'logo-512.png'), format='PNG')
logo_512.save(os.path.join(public_dir, 'logo.png'), format='PNG')
print("Saved logo.png (1024 and 512)")

# 6. Central emblem crest
# Crop central emblem from logo_1024
# Center is at (512, 512)
crest_crop = logo_1024.crop((180, 180, 844, 844))
crest_512 = crest_crop.resize((512, 512), Image.Resampling.LANCZOS)
crest_512.save(os.path.join(public_images, 'logo-crest.png'), format='PNG')
print("Saved logo-crest.png")

# 7. Clean up temporary files
for tf in [temp_svg, temp_png]:
    if os.path.exists(tf):
        os.remove(tf)

print("=== ALL BRAND LOGO ASSETS REGENERATED WITH AUTHENTIC ORIGINAL COLORS VIA CHROMIUM ===")
