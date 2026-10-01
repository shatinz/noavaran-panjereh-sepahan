import os
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

sys.stdout.reconfigure(encoding='utf-8')

width, height = 1200, 630

# Create base canvas with deep black/burgundy background
img = Image.new('RGBA', (width, height), (10, 0, 2, 255))
draw = ImageDraw.Draw(img)

# Draw radial subtle glow in top right / center
glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
for r in range(400, 0, -10):
    alpha = int(35 * (1 - r / 400.0))
    glow_draw.ellipse([600 - r, 315 - r, 600 + r, 315 + r], fill=(171, 0, 23, alpha))
glow = glow.filter(ImageFilter.GaussianBlur(30))
img = Image.alpha_composite(img, glow)

# Overlay background architectural project image subtly if available
proj_path = os.path.join('public', 'projects', 'proj-1.webp')
if os.path.exists(proj_path):
    try:
        bg_proj = Image.open(proj_path).convert('RGBA')
        bg_proj = bg_proj.resize((width, height), Image.Resampling.LANCZOS)
        # Create dark mask
        mask = Image.new('L', (width, height), 35) # 14% opacity
        img.paste(bg_proj, (0, 0), mask)
    except Exception as e:
        print("Bg proj error:", e)

# Add sleek metallic borders
draw = ImageDraw.Draw(img)
# Outer red accent border
draw.rectangle([20, 20, width - 21, height - 21], outline=(171, 0, 23, 180), width=2)
# Inner silver hairline
draw.rectangle([26, 26, width - 27, height - 27], outline=(203, 204, 203, 60), width=1)

# Corner industrial ticks
corner_len = 30
# Top-left
draw.line([(15, 20), (15 + corner_len, 20)], fill=(227, 26, 42, 255), width=3)
draw.line([(20, 15), (20, 15 + corner_len)], fill=(227, 26, 42, 255), width=3)
# Top-right
draw.line([(width - 15 - corner_len, 20), (width - 15, 20)], fill=(227, 26, 42, 255), width=3)
draw.line([(width - 20, 15), (width - 20, 15 + corner_len)], fill=(227, 26, 42, 255), width=3)
# Bottom-left
draw.line([(15, height - 20), (15 + corner_len, height - 20)], fill=(227, 26, 42, 255), width=3)
draw.line([(20, height - 15 - corner_len), (20, height - 15)], fill=(227, 26, 42, 255), width=3)
# Bottom-right
draw.line([(width - 15 - corner_len, height - 20), (width - 15, height - 20)], fill=(227, 26, 42, 255), width=3)
draw.line([(width - 20, height - 15 - corner_len), (width - 20, height - 15)], fill=(227, 26, 42, 255), width=3)

# Load logo
logo_path = os.path.join('public', 'images', 'logo-white.png')
if not os.path.exists(logo_path):
    logo_path = os.path.join('public', 'logo-white.png')

if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert('RGBA')
    # Resize keeping aspect ratio
    logo_w, logo_h = logo.size
    target_h = 160
    target_w = int(logo_w * (target_h / logo_h))
    logo = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    img.paste(logo, ((width - target_w) // 2, 90), logo)

# Load font (try Windows Tahoma / Arial or Segoe UI)
font_large = None
font_sub = None
font_badge = None

for font_candidate in ["tahoma.ttf", "segoeui.ttf", "arial.ttf"]:
    try:
        font_large = ImageFont.truetype(font_candidate, 42)
        font_sub = ImageFont.truetype(font_candidate, 22)
        font_badge = ImageFont.truetype(font_candidate, 18)
        break
    except Exception:
        continue

if not font_large:
    font_large = ImageFont.load_default()
    font_sub = font_large
    font_badge = font_large

# Draw Title in Persian / English
draw = ImageDraw.Draw(img)

# Subtitle
sub_text = "NOAVARAN PANJEREH SEPAHAN | ARCHITECTURAL FACADES & WINDOWS"
bbox_sub = draw.textbbox((0, 0), sub_text, font=font_sub)
sub_w = bbox_sub[2] - bbox_sub[0]
draw.text(((width - sub_w) // 2, 280), sub_text, fill=(227, 26, 42, 240), font=font_sub)

# Headline
headline = "طراحی، مهندسی محاسبات و تولید صنعتی نماهای مدرن و پنجره‌های ترمال‌بریک"
bbox_head = draw.textbbox((0, 0), headline, font=font_large)
head_w = bbox_head[2] - bbox_head[0]
draw.text(((width - head_w) // 2, 330), headline, fill=(255, 255, 255, 255), font=font_large)

# Badge bar at bottom
badge_y = 440
badges = [
    "كرتين‌وال و فريم‌لس",
    "پنجره دوجداره ترمال‌بريك",
    "جام‌بالكنى (شيشه بالكن)",
    "كارخانه ۱۵۰۰ مترى اصفهان",
    "۳۰+ سال سابقه"
]

total_badges = len(badges)
badge_w = 200
badge_h = 42
spacing = 15
start_x = (width - (total_badges * badge_w + (total_badges - 1) * spacing)) // 2

for i, b in enumerate(badges):
    bx = start_x + i * (badge_w + spacing)
    # Badge background
    draw.rectangle([bx, badge_y, bx + badge_w, badge_y + badge_h], fill=(22, 22, 24, 200), outline=(171, 0, 23, 160), width=1)
    bbox_b = draw.textbbox((0, 0), b, font=font_badge)
    bw = bbox_b[2] - bbox_b[0]
    bh = bbox_b[3] - bbox_b[1]
    draw.text((bx + (badge_w - bw) // 2, badge_y + (badge_h - bh) // 2 - 2), b, fill=(203, 204, 203, 255), font=font_badge)

# Bottom footer line
domain_text = "www.noavaranpanjereh.ir  |  تلفن: ۳۳۶۸۷۷۵۵-۰۳۱  |  اصفهان"
bbox_dom = draw.textbbox((0, 0), domain_text, font=font_sub)
dom_w = bbox_dom[2] - bbox_dom[0]
draw.text(((width - dom_w) // 2, 545), domain_text, fill=(160, 160, 160, 230), font=font_sub)

# Save
out_dir = os.path.join('public', 'images')
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, 'og-image.png')
img.convert('RGB').save(out_file, 'PNG', quality=95)
print(f"Generated {out_file} successfully.")
