import os
import re
import fitz
from PIL import Image

sys_base = r'c:\Users\PC\prj\noavaran'
public_images = os.path.join(sys_base, 'public', 'images')
public_dir = os.path.join(sys_base, 'public')
app_dir = os.path.join(sys_base, 'app')

# 1. Read public/images/logo.svg
with open(os.path.join(public_images, 'logo.svg'), 'r', encoding='utf-8') as f:
    svg_data = f.read()

# 2. Remove the domain path (.fil12)
svg_clean = re.sub(r'<path class="fil12"[^>]+/>\s*', '', svg_data)

# 3. Square centered viewBox without domain
# The circular logo has bounds x: 19.4 to 4172.3, y: 0 to 3999.5
# Center: x=2095.85, y=1999.75. Radius ~ 2076.5. With padding, size=4443.0
vb_min_x = -125.65
vb_min_y = -221.75
vb_size = 4443.0

svg_clean = re.sub(
    r'viewBox="[^"]+"',
    f'viewBox="{vb_min_x:.2f} {vb_min_y:.2f} {vb_size:.2f} {vb_size:.2f}"',
    svg_clean
)
svg_clean = re.sub(r'width="[^"]+"', 'width="8.65in"', svg_clean)
svg_clean = re.sub(r'height="[^"]+"', 'height="8.65in"', svg_clean)

# Save SVG to all relevant paths
for p in [
    os.path.join(public_images, 'logo.svg'),
    os.path.join(public_dir, 'logo.svg'),
    os.path.join(public_dir, 'logo-nowww.svg')
]:
    with open(p, 'w', encoding='utf-8') as f:
        f.write(svg_clean)
    print("Saved SVG:", p)

# 4. Render clean vector raster PNGs from svg_clean
doc = fitz.open('svg', svg_clean.encode('utf-8'))
page = doc[0]
pix = page.get_pixmap(dpi=300, alpha=True)
img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)

bbox = img.getbbox()
print("Non-empty bbox:", bbox)
cropped = img.crop(bbox)
w, h = cropped.size

# Make perfectly square canvas with 4% padding
pad = int(max(w, h) * 0.04)
sq_size = max(w, h) + 2 * pad
sq = Image.new("RGBA", (sq_size, sq_size), (0, 0, 0, 0))
sq.paste(cropped, ((sq_size - w)//2, (sq_size - h)//2), cropped)

logo_1024 = sq.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_512 = sq.resize((512, 512), Image.Resampling.LANCZOS)

logo_1024.save(os.path.join(public_images, 'logo.png'), format='PNG')
logo_512.save(os.path.join(public_images, 'logo-512.png'), format='PNG')
logo_512.save(os.path.join(public_dir, 'logo.png'), format='PNG')
print("Saved clean logo PNGs (1024 and 512) without domain")

# 5. Render clean Vector PDF
pdf_doc = fitz.open()
pdf_page = pdf_doc.new_page(width=sq_size * 72 / 300, height=sq_size * 72 / 300)
# We can use fitz to save vector svg to pdf
# Alternatively write with pymupdf
svg_doc = fitz.open('svg', svg_clean.encode('utf-8'))
pdf_bytes = svg_doc.convert_to_pdf()
for pdf_path in [os.path.join(public_images, 'logo.pdf'), os.path.join(public_dir, 'logo.pdf')]:
    with open(pdf_path, 'wb') as f:
        f.write(pdf_bytes)
    print("Saved vector PDF:", pdf_path)

# 6. Fix icon.svg to ensure upper roof is RED (#9B2130)
with open(os.path.join(public_images, 'icon.svg'), 'r', encoding='utf-8') as f:
    icon_content = f.read()

# Replace the gray roof path with red
# Specifically: <path transform="matrix(1,0,0,-1,1,595.093)" d="M436.5275 371.7541 ... fill="#58595b"
icon_fixed = re.sub(
    r'(d="M436\.5275 371\.7541[^"]+"\s+fill=")#58595b(")',
    r'\g<1>#9B2130\g<2>',
    icon_content
)

for icon_p in [
    os.path.join(public_images, 'icon.svg'),
    os.path.join(public_dir, 'icon.svg'),
    os.path.join(app_dir, 'icon.svg')
]:
    with open(icon_p, 'w', encoding='utf-8') as f:
        f.write(icon_fixed)
    print("Saved fixed icon.svg with red upper roof:", icon_p)

# 7. Render clean icon.png from fixed icon.svg
doc_icon = fitz.open('svg', icon_fixed.encode('utf-8'))
pix_icon = doc_icon[0].get_pixmap(dpi=300, alpha=True)
img_icon = Image.frombytes("RGBA", [pix_icon.width, pix_icon.height], pix_icon.samples)
bbox_i = img_icon.getbbox()
cropped_i = img_icon.crop(bbox_i)
iw, ih = cropped_i.size
isq_size = max(iw, ih) + int(max(iw, ih) * 0.05)
icon_sq = Image.new("RGBA", (isq_size, isq_size), (0, 0, 0, 0))
icon_sq.paste(cropped_i, ((isq_size - iw)//2, (isq_size - ih)//2), cropped_i)

icon_512 = icon_sq.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = icon_sq.resize((192, 192), Image.Resampling.LANCZOS)
icon_48 = icon_sq.resize((48, 48), Image.Resampling.LANCZOS)

icon_512.save(os.path.join(public_images, 'icon.png'), format='PNG')
icon_512.save(os.path.join(public_dir, 'icon.png'), format='PNG')
icon_512.save(os.path.join(public_dir, 'icon-512.png'), format='PNG')
icon_192.save(os.path.join(public_dir, 'icon-192.png'), format='PNG')
icon_48.save(os.path.join(public_dir, 'icon-48.png'), format='PNG')
icon_512.save(os.path.join(app_dir, 'icon.png'), format='PNG')
print("Saved updated app & public icons successfully!")

print("=== ALL ASSETS REGENERATED WITH AUTHENTIC RED COLORS AND NO DOMAIN ===")
