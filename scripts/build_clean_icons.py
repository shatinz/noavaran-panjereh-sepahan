import os
import sys
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# Source image: master official logo (1024x1024)
master_logo_path = 'public/images/logo.png'
logo = Image.open(master_logo_path).convert('RGBA')

# The architectural emblem is located from Y=40 to Y=825 (above the bottom text "شماره ثبت...")
emblem_crop = logo.crop((0, 40, 1024, 825))
emblem_bbox = emblem_crop.getbbox()
emblem_tight = emblem_crop.crop(emblem_bbox)
ew, eh = emblem_tight.size
print(f"Extracted pure emblem: {ew}x{eh}")

# Create square canvas with 5% padding so the emblem breathes cleanly
dim = max(ew, eh)
pad = int(dim * 0.05)
canvas_size = dim + 2 * pad
square_emblem = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
paste_x = (canvas_size - ew) // 2
paste_y = (canvas_size - eh) // 2
square_emblem.paste(emblem_tight, (paste_x, paste_y), emblem_tight)

# Target paths
paths = {
    'icon-48': ['public/icon-48.png'],
    'icon-96': ['public/icon-96.png'],
    'icon-144': ['public/icon-144.png'],
    'icon-192': ['public/icon-192.png'],
    'icon-512': ['public/icon-512.png', 'public/icon.png', 'app/icon.png', 'public/images/icon.png'],
    'apple': ['public/apple-touch-icon.png', 'app/apple-icon.png'],
}

# 1. Generate PNGs
square_emblem.resize((48, 48), Image.Resampling.LANCZOS).save('public/icon-48.png', format='PNG')
print("Saved public/icon-48.png (48x48)")

square_emblem.resize((96, 96), Image.Resampling.LANCZOS).save('public/icon-96.png', format='PNG')
print("Saved public/icon-96.png (96x96)")

square_emblem.resize((144, 144), Image.Resampling.LANCZOS).save('public/icon-144.png', format='PNG')
print("Saved public/icon-144.png (144x144)")

square_emblem.resize((192, 192), Image.Resampling.LANCZOS).save('public/icon-192.png', format='PNG')
print("Saved public/icon-192.png (192x192)")

icon_512 = square_emblem.resize((512, 512), Image.Resampling.LANCZOS)
for p in paths['icon-512']:
    icon_512.save(p, format='PNG')
    print(f"Saved {p} (512x512)")

apple_180 = square_emblem.resize((180, 180), Image.Resampling.LANCZOS)
for p in paths['apple']:
    apple_180.save(p, format='PNG')
    print(f"Saved {p} (180x180)")

# 2. Multi-resolution favicon.ico
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
square_emblem.save('public/favicon.ico', format='ICO', sizes=ico_sizes)
square_emblem.save('app/favicon.ico', format='ICO', sizes=ico_sizes)
print("Saved public/favicon.ico and app/favicon.ico with sizes:", ico_sizes)

# 3. Save a dedicated pure emblem high-res image
square_emblem.resize((1024, 1024), Image.Resampling.LANCZOS).save('public/images/logo-emblem.png', format='PNG')
print("Saved public/images/logo-emblem.png (1024x1024)")

# 4. Generate clean standalone vector SVG for icon.svg
import base64
import io

buffered = io.BytesIO()
icon_512.save(buffered, format="PNG")
img_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,{img_b64}" />
</svg>
'''

with open('public/icon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
with open('app/icon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)
print("Saved public/icon.svg and app/icon.svg")

print("All icons successfully generated!")
