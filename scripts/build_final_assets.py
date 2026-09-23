import os
import sys
import xml.etree.ElementTree as ET
import fitz
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.pdf'
public_dir = r'c:\Users\PC\prj\noavaran\public'
images_dir = os.path.join(public_dir, 'images')
app_dir = r'c:\Users\PC\prj\noavaran\app'

os.makedirs(images_dir, exist_ok=True)
os.makedirs(app_dir, exist_ok=True)

# 1. Base vector SVG extracted from PDF
doc = fitz.open(pdf_path)
page = doc[0]
base_svg = page.get_svg_image()

# Save original logo.svg
with open(os.path.join(images_dir, 'logo.svg'), 'w', encoding='utf-8') as f:
    f.write(base_svg)
with open(os.path.join(public_dir, 'logo.svg'), 'w', encoding='utf-8') as f:
    f.write(base_svg)
print("Saved logo.svg")

# 2. Dark-mode logo SVG (white text for circular banner & white outer arc)
tree_dark = ET.fromstring(base_svg)
ns = {'svg': 'http://www.w3.org/2000/svg'}
# In ElementTree, tags have namespace prefix {http://www.w3.org/2000/svg}
for el in tree_dark.iter('{http://www.w3.org/2000/svg}path'):
    d = el.attrib.get('d', '')
    if d.startswith('M49.5777'):  # Circular Persian text
        el.attrib['fill'] = '#ffffff'
    if d.startswith('M92.0883 35.0779C17.8988'):  # Outer circular arc
        el.attrib['stroke'] = '#ffffff'

dark_svg_str = ET.tostring(tree_dark, encoding='utf-8', xml_declaration=True).decode('utf-8')
with open(os.path.join(images_dir, 'logo-dark.svg'), 'w', encoding='utf-8') as f:
    f.write(dark_svg_str)
with open(os.path.join(public_dir, 'logo-dark.svg'), 'w', encoding='utf-8') as f:
    f.write(dark_svg_str)
print("Saved logo-dark.svg")

# 3. Pure Icon SVG (central emblem, no outer arcs or circular text)
tree_icon = ET.fromstring(base_svg)
# find <g> that contains child paths
g_node = tree_icon.find('{http://www.w3.org/2000/svg}g')
to_remove = []
for el in g_node:
    d = el.attrib.get('d', '')
    if d.startswith('M49.5777') or d.startswith('M92.0883 35.0779C17.8988'):
        to_remove.append(el)

for el in to_remove:
    g_node.remove(el)

# Set square viewBox for the central emblem
tree_icon.attrib['viewBox'] = '52.5 92 520 520'
tree_icon.attrib['width'] = '520'
tree_icon.attrib['height'] = '520'

icon_svg_str = ET.tostring(tree_icon, encoding='utf-8', xml_declaration=True).decode('utf-8')
with open(os.path.join(images_dir, 'icon.svg'), 'w', encoding='utf-8') as f:
    f.write(icon_svg_str)
with open(os.path.join(public_dir, 'icon.svg'), 'w', encoding='utf-8') as f:
    f.write(icon_svg_str)
with open(os.path.join(app_dir, 'icon.svg'), 'w', encoding='utf-8') as f:
    f.write(icon_svg_str)
print("Saved icon.svg (app, public, images)")

# 4. Render high-res PNGs from PDF
# 4.1 Full Logo PNG
pix_full = page.get_pixmap(dpi=600, alpha=True)
im_full = Image.frombytes("RGBA", [pix_full.width, pix_full.height], pix_full.samples)
bbox_full = im_full.getbbox()
im_full_cropped = im_full.crop(bbox_full)

# Make square with 4% padding
w, h = im_full_cropped.size
pad = int(max(w, h) * 0.04)
sq_full_size = max(w, h) + 2 * pad
sq_full = Image.new("RGBA", (sq_full_size, sq_full_size), (0, 0, 0, 0))
sq_full.paste(im_full_cropped, ((sq_full_size - w)//2, (sq_full_size - h)//2), im_full_cropped)

# Save logo.png
logo_1024 = sq_full.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_512 = sq_full.resize((512, 512), Image.Resampling.LANCZOS)
logo_1024.save(os.path.join(images_dir, 'logo.png'), format='PNG')
logo_512.save(os.path.join(images_dir, 'logo-512.png'), format='PNG')
logo_512.save(os.path.join(public_dir, 'logo.png'), format='PNG')
print("Saved full logo PNGs")

# 4.2 Dark Mode Logo PNG
# Use PyMuPDF to render SVG directly or adjust pixels
# We can load dark_svg_str into PyMuPDF directly!
doc_dark = fitz.open("svg", dark_svg_str.encode('utf-8'))
page_dark = doc_dark[0]
pix_dark = page_dark.get_pixmap(dpi=600, alpha=True)
im_dark = Image.frombytes("RGBA", [pix_dark.width, pix_dark.height], pix_dark.samples)
bbox_dark = im_dark.getbbox()
im_dark_cropped = im_dark.crop(bbox_dark)
w_d, h_d = im_dark_cropped.size
sq_dark = Image.new("RGBA", (sq_full_size, sq_full_size), (0, 0, 0, 0))
sq_dark.paste(im_dark_cropped, ((sq_full_size - w_d)//2, (sq_full_size - h_d)//2), im_dark_cropped)

logo_dark_1024 = sq_dark.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_dark_512 = sq_dark.resize((512, 512), Image.Resampling.LANCZOS)
logo_dark_1024.save(os.path.join(images_dir, 'logo-dark.png'), format='PNG')
logo_dark_512.save(os.path.join(images_dir, 'logo-dark-512.png'), format='PNG')
logo_dark_512.save(os.path.join(public_dir, 'logo-dark.png'), format='PNG')
print("Saved dark-mode logo PNGs")

# 4.3 Icon PNG and Favicons from icon_svg_str
doc_icon = fitz.open("svg", icon_svg_str.encode('utf-8'))
page_icon = doc_icon[0]
pix_icon = page_icon.get_pixmap(dpi=600, alpha=True)
im_icon = Image.frombytes("RGBA", [pix_icon.width, pix_icon.height], pix_icon.samples)
bbox_icon = im_icon.getbbox()
im_icon_cropped = im_icon.crop(bbox_icon)

iw, ih = im_icon_cropped.size
isize = max(iw, ih)
ipad = int(isize * 0.05)
isquare_size = isize + 2 * ipad
icon_sq = Image.new("RGBA", (isquare_size, isquare_size), (0, 0, 0, 0))
icon_sq.paste(im_icon_cropped, ((isquare_size - iw)//2, (isquare_size - ih)//2), im_icon_cropped)

# Save icon.png at 512, 192, 180, 64, 32, 16
icon_512 = icon_sq.resize((512, 512), Image.Resampling.LANCZOS)
icon_192 = icon_sq.resize((192, 192), Image.Resampling.LANCZOS)
icon_180 = icon_sq.resize((180, 180), Image.Resampling.LANCZOS)

icon_512.save(os.path.join(app_dir, 'icon.png'), format='PNG')
icon_512.save(os.path.join(public_dir, 'icon.png'), format='PNG')
icon_512.save(os.path.join(images_dir, 'icon.png'), format='PNG')

icon_180.save(os.path.join(app_dir, 'apple-icon.png'), format='PNG')
icon_180.save(os.path.join(public_dir, 'apple-touch-icon.png'), format='PNG')
icon_192.save(os.path.join(public_dir, 'icon-192.png'), format='PNG')

# Multi-resolution favicon.ico
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
icon_sq.save(os.path.join(public_dir, 'favicon.ico'), format='ICO', sizes=ico_sizes)
icon_sq.save(os.path.join(app_dir, 'favicon.ico'), format='ICO', sizes=ico_sizes)
print("Saved favicon.ico and app icons successfully!")

# Remove temporary files
for temp_file in ['scratch_pdf_render.png', 'pdf_extracted.svg', 'test_svg_render.png', 'test_corel_svg_render.png', 'test_emblem_clean.png', 'test_icon_pure.svg', 'test_preview.html']:
    if os.path.exists(temp_file):
        os.remove(temp_file)
        print(f"Cleaned up {temp_file}")

print("=== ALL ASSETS GENERATED & CLEANED SUCCESSFULLY ===")
