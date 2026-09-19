#!/usr/bin/env python3
"""Generate OG image for Contract Checked"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create a 1200x630 image with dark background
width, height = 1200, 630
bg_color = (28, 35, 51)  # #1C2333
accent_color = (82, 183, 136)  # #52B788
white = (255, 255, 255)

# Create image
img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img)

# Try to use system fonts
try:
    # Try to find a good bold font
    title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 90)
    subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 48)
except:
    # Fallback to default font
    print("Using default font")
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()

# Draw title "Contract Checked"
title_text = "Contract Checked"
title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
title_width = title_bbox[2] - title_bbox[0]
title_x = (width - title_width) // 2
title_y = 200

draw.text((title_x, title_y), title_text, font=title_font, fill=accent_color)

# Draw subtitle "Free Contract Checker"
subtitle_text = "Free Contract Checker"
subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = (width - subtitle_width) // 2
subtitle_y = 360

draw.text((subtitle_x, subtitle_y), subtitle_text, font=subtitle_font, fill=white)

# Save
output_path = '/workspace/public/og-image.png'
img.save(output_path, 'PNG', quality=95, optimize=True)
print(f"✓ Created OG image: {output_path}")
print(f"  Size: {width}x{height}px")
print(f"  Format: PNG")
