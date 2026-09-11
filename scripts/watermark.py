from PIL import Image, ImageDraw, ImageFont
import os
from pathlib import Path

base = Path("public/east-of-kailash-images")
text = "EastOfKailash.com"

# Try to load a decent font, fallback to default
font = None
for p in [
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]:
    if os.path.exists(p):
        try:
            font = ImageFont.truetype(p, 32)
            print(f"Using font: {p}")
            break
        except: pass

if font is None:
    font = ImageFont.load_default()
    print("Using default font (small)")

count = 0
for root, dirs, files in os.walk(base):
    for fname in files:
        if not fname.lower().endswith(('.jpeg','.jpg')):
            continue
        fpath = os.path.join(root, fname)
        try:
            img = Image.open(fpath).convert("RGB")
            w, h = img.size
            # scale font size to image width (~2.8%)
            fontsize = max(18, int(w * 0.028))
            if font and hasattr(font, 'font'):
                try:
                    # reload with correct size if truetype
                    for p in ["C:/Windows/Fonts/arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]:
                        if os.path.exists(p):
                            font = ImageFont.truetype(p, fontsize)
                            break
                except: pass

            draw = ImageDraw.Draw(img)
            # text size
            bbox = draw.textbbox((0,0), text, font=font, stroke_width=2)
            tw = bbox[2] - bbox[0]
            th = bbox[3] - bbox[1]
            pad_x, pad_y = int(w*0.02), int(h*0.02)
            x = w - tw - pad_x
            y = pad_y

            # semi-transparent black bg behind text for contrast
            bg_pad = 6
            draw.rounded_rectangle(
                [x - bg_pad, y - bg_pad, x + tw + bg_pad, y + th + bg_pad],
                radius=4,
                fill=(0,0,0,110) if img.mode=="RGBA" else (0,0,0)
            )
            # need RGBA for transparency; convert if needed
            if img.mode != "RGBA":
                # draw bg solid black with opacity via overlay
                overlay = Image.new("RGBA", img.size, (0,0,0,0))
                odraw = ImageDraw.Draw(overlay, "RGBA")
                odraw.rounded_rectangle([x - bg_pad, y - bg_pad, x + tw + bg_pad, y + th + bg_pad], radius=4, fill=(0,0,0,90))
                img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
                draw = ImageDraw.Draw(img)

            # white text with black stroke
            draw.text((x, y), text, font=font, fill="white", stroke_width=2, stroke_fill="black")

            img.save(fpath, "JPEG", quality=82, optimize=True)
            count += 1
            if count % 50 == 0:
                print(f"  {count} done...")
        except Exception as e:
            print(f"  failed {fpath}: {e}")

print(f"Done: {count} images watermarked")
