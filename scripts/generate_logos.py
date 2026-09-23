import os
import sys
import fitz  # PyMuPDF
from PIL import Image
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.pdf'
svg_source_path = r'C:\Users\PC\Downloads\Eitaa Desktop\Untitled-1.svg'

output_dir_public = r'c:\Users\PC\prj\noavaran\public'
output_dir_images = os.path.join(output_dir_public, 'images')
output_dir_app = r'c:\Users\PC\prj\noavaran\app'

os.makedirs(output_dir_images, exist_ok=True)

print("Opening PDF:", pdf_path)
doc = fitz.open(pdf_path)
page = doc[0]

# 1. Extract pure vector SVG
svg_text = page.get_svg_image()

# Save original vector SVG
logo_svg_path = os.path.join(output_dir_images, 'logo.svg')
with open(logo_svg_path, 'w', encoding='utf-8') as f:
    f.write(svg_text)
print(f"Saved {logo_svg_path} (len: {len(svg_text)})")

# Also save into public/logo.svg
public_logo_svg = os.path.join(output_dir_public, 'logo.svg')
with open(public_logo_svg, 'w', encoding='utf-8') as f:
    f.write(svg_text)

# 2. Create dark-mode optimized SVG (white text for circular banner and base)
# In pdf_extracted.svg, the dark charcoal color used for text and strokes is #373435 or rgb(55,52,53)
# Let's inspect colors in svg_text
print("Unique fill/stroke colors in SVG:")
import re
fills = set(re.findall(r'fill="([^"]+)"', svg_text))
strokes = set(re.findall(r'stroke="([^"]+)"', svg_text))
print("Fills:", fills)
print("Strokes:", strokes)

# Render ultra high-res raster pixmap (600 DPI)
print("Rendering 600 DPI pixmap from vector PDF...")
pix = page.get_pixmap(dpi=600, alpha=True)
img_full = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
print(f"Rendered image size: {img_full.size}")

# Crop to non-transparent bounding box
bbox = img_full.getbbox()
print("Full logo bounding box:", bbox)
cropped_full = img_full.crop(bbox)

# Add comfortable 4% padding
w, h = cropped_full.size
pad = int(max(w, h) * 0.04)
square_size = max(w, h) + 2 * pad
logo_canvas = Image.new("RGBA", (square_size, square_size), (0, 0, 0, 0))
paste_x = (square_size - w) // 2
paste_y = (square_size - h) // 2
logo_canvas.paste(cropped_full, (paste_x, paste_y), cropped_full)

# Save standard full logo PNG at 1024x1024 and 512x512
logo_1024 = logo_canvas.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_512 = logo_canvas.resize((512, 512), Image.Resampling.LANCZOS)

logo_1024.save(os.path.join(output_dir_images, 'logo.png'), format='PNG')
logo_512.save(os.path.join(output_dir_images, 'logo-512.png'), format='PNG')
logo_512.save(os.path.join(output_dir_public, 'logo.png'), format='PNG')
print("Saved full logo PNGs (1024, 512)")

# 3. Create dark-mode / white-text version of the logo
# Charcoal color is rgb(55, 52, 53)
# In the raster image, any pixel that is near charcoal (r~55, g~52, b~53) and has alpha > 0
# can be tinted to bright silver-white (#F4F4F6) while keeping alpha
arr = np.array(logo_canvas).copy()
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Detect charcoal pixels: dark neutral gray (r, g, b all < 80, and max(r,g,b)-min(r,g,b) < 25)
# Note: we must NOT touch red (r > 100, g < 60) or blue (b > 150)
charcoal_mask = (r < 80) & (g < 80) & (b < 80) & (a > 20) & (np.abs(r.astype(int) - g.astype(int)) < 18) & (np.abs(r.astype(int) - b.astype(int)) < 18)

# Replace charcoal text/stroke with #FFFFFF
arr[charcoal_mask, 0] = 255
arr[charcoal_mask, 1] = 255
arr[charcoal_mask, 2] = 255

logo_canvas_white = Image.fromarray(arr)
logo_white_1024 = logo_canvas_white.resize((1024, 1024), Image.Resampling.LANCZOS)
logo_white_512 = logo_canvas_white.resize((512, 512), Image.Resampling.LANCZOS)

logo_white_1024.save(os.path.join(output_dir_images, 'logo-white.png'), format='PNG')
logo_white_512.save(os.path.join(output_dir_images, 'logo-white-512.png'), format='PNG')
logo_white_512.save(os.path.join(output_dir_public, 'logo-white.png'), format='PNG')
print("Saved white/dark-mode logo PNGs")

# Also create SVG version for dark mode by replacing charcoal hex/rgb in svg_text
svg_white_text = svg_text
# In PyMuPDF SVG output, colors are like #373435 or rgb(21.568627%,20.392157%,20.784314%)
# Let's see what PyMuPDF used:
for c in set(re.findall(r'#[0-9a-fA-F]{6}', svg_text)):
    print("Found hex color in SVG:", c)
for c in set(re.findall(r'rgb\([^)]+\)', svg_text)):
    print("Found rgb color in SVG:", c)

# 4. Create central emblem icon (for favicon and app icon)
# Let's find the bounding box of the central emblem (red letters + window + roof + base)
# The circular text arc is around the perimeter.
# Let's crop the central emblem:
# We know the red letters have high R and low G, B
red_pixels = (r > 120) & (g < 60) & (b < 70) & (a > 50)
y_red, x_red = np.where(red_pixels)
min_x_red, max_x_red = x_red.min(), x_red.max()
min_y_red, max_y_red = y_red.min(), y_red.max()

# The emblem includes the roof above the red letters and the window & base
# Let's find bounds around the emblem:
# In the original image:
emblem_x1 = max(0, min_x_red - int(w * 0.04))
emblem_x2 = min(logo_canvas.width, max_x_red + int(w * 0.04))
emblem_y1 = max(0, min_y_red - int(h * 0.08)) # roof above
emblem_y2 = min(logo_canvas.height, max_y_red + int(h * 0.12)) # base below

emblem_crop = logo_canvas.crop((emblem_x1, emblem_y1, emblem_x2, emblem_y2))
emblem_bbox = emblem_crop.getbbox()
emblem_tight = emblem_crop.crop(emblem_bbox)

# Make emblem square with 5% padding
ew, eh = emblem_tight.size
esize = max(ew, eh)
epad = int(esize * 0.06)
esquare_size = esize + 2 * epad
emblem_square = Image.new("RGBA", (esquare_size, esquare_size), (0, 0, 0, 0))
emblem_square.paste(emblem_tight, ((esquare_size - ew) // 2, (esquare_size - eh) // 2), emblem_tight)

# Also generate full-crest icon version
crest_square = logo_canvas

# Let's save icons
# 1) app/icon.png (512x512)
app_icon = emblem_square.resize((512, 512), Image.Resampling.LANCZOS)
app_icon.save(os.path.join(output_dir_app, 'icon.png'), format='PNG')
app_icon.save(os.path.join(output_dir_public, 'icon.png'), format='PNG')
app_icon.save(os.path.join(output_dir_images, 'icon.png'), format='PNG')

# 2) app/apple-icon.png and public/apple-touch-icon.png (180x180)
apple_icon = emblem_square.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save(os.path.join(output_dir_app, 'apple-icon.png'), format='PNG')
apple_icon.save(os.path.join(output_dir_public, 'apple-touch-icon.png'), format='PNG')

# 3) Multi-resolution favicon.ico (16, 32, 48, 64)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
emblem_square.save(
    os.path.join(output_dir_public, 'favicon.ico'),
    format='ICO',
    sizes=ico_sizes
)
# Also save favicon.ico in app/
emblem_square.save(
    os.path.join(output_dir_app, 'favicon.ico'),
    format='ICO',
    sizes=ico_sizes
)
print("Saved favicon.ico with sizes:", ico_sizes)

# 4) Also save full-crest version as logo-crest.png
crest_512 = crest_square.resize((512, 512), Image.Resampling.LANCZOS)
crest_512.save(os.path.join(output_dir_images, 'logo-crest.png'), format='PNG')

print("All logo and icon assets generated successfully!")
