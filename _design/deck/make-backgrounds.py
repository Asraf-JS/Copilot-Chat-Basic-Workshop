"""Backgrounds and logo variants for the trainer deck.

Abstract art in Asraf's brand colours: soft mesh-gradient glows with flowing
ribbons of fine strands, in the spirit of Microsoft's Copilot-era decks and
marketing. Run from the repository root:

    python3 _design/deck/make-backgrounds.py

Writes JPEG backgrounds and transparent logo PNGs to _design/deck/bg/, which
build-deck.cjs uses. Deterministic: the same script always gives the same files.
"""
from pathlib import Path

import numpy as np
from PIL import Image

W, H = 1920, 1080
HERE = Path(__file__).parent
OUT = HERE / "bg"
LOGO = HERE.parent.parent / "logo.png"


def hexrgb(h):
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], np.float32)


# Brand colours: the logo's cyan and ink, and the course sites' navy, teal and purple.
CYAN = hexrgb("00EEFC")
TEAL = hexrgb("028090")
NAVY = hexrgb("1E2761")
DEEP = hexrgb("0D1236")
PURPLE = hexrgb("6B5DD3")
VIOLET = hexrgb("9B7BFF")
SKY = hexrgb("8FD3FF")

Y, X = np.mgrid[0:H, 0:W].astype(np.float32)


def canvas(base):
    img = np.empty((H, W, 3), np.float32)
    img[:] = base
    return img


def glow(img, rgb, cx, cy, r, k):
    """A soft colour field. cx, cy and r are fractions of the width."""
    a = (k * np.exp(-((X - cx * W) ** 2 + (Y - cy * W) ** 2) / (r * W) ** 2))[..., None]
    return img * (1 - a) + rgb * a


def ribbon(img, y0, amp, freq, phase, slope, c1, c2, strands=26, spread=0.11, k=0.55,
           x0=0.0, x1=1.0, width=1.6, band=0.6):
    """A flowing ribbon of fine strands, coloured c1 to c2 along its length.

    The centre line is y = y0 + slope*x + amp*sin(2*pi*freq*x + phase), in fractions of
    the height. Strands fan out from the centre and fade at the ends.
    """
    u = X / W
    fade = np.clip((u - x0) / 0.18, 0, 1) * np.clip((x1 - u) / 0.18, 0, 1)
    t = ((u - x0) / max(x1 - x0, 1e-3)).clip(0, 1)[..., None]
    col = c1 * (1 - t) + c2 * t
    for i in range(strands):
        f = i / (strands - 1) - 0.5
        yc = (y0 + slope * u + amp * (1 + 0.8 * f) * np.sin(2 * np.pi * freq * u + phase + 1.6 * f)
              + spread * f * (0.6 + 0.4 * np.sin(2 * np.pi * u + phase))) * H
        d = np.abs(Y - yc)
        line = np.exp(-(d / width) ** 2)
        a = (k * line * fade * (1 - abs(f) * 0.9))[..., None]
        img = img * (1 - a) + col * a
    # A soft band of colour under the strands gives the ribbon body.
    yc = (y0 + slope * u + amp * np.sin(2 * np.pi * freq * u + phase)) * H
    body = np.exp(-((Y - yc) / (spread * H * band)) ** 2) * fade
    a = (0.22 * k * body)[..., None]
    return img * (1 - a) + col * a


def save(img, name):
    rng = np.random.default_rng(7)
    img = img + rng.normal(0, 1.2, img.shape)  # hides banding
    Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(OUT / name, quality=90, optimize=True)
    print("wrote", OUT / name)


OUT.mkdir(exist_ok=True)

# Title and closing: deep navy, glows of purple and teal, two ribbons sweeping across the right.
img = canvas(DEEP)
img = glow(img, PURPLE, 0.92, 0.50, 0.40, 0.70)
img = glow(img, TEAL, 0.62, 0.66, 0.30, 0.55)
img = glow(img, NAVY, 0.30, 0.10, 0.45, 0.60)
img = ribbon(img, 1.00, 0.10, 0.9, 0.4, -0.32, TEAL, CYAN, k=0.75, x0=0.30, spread=0.15, strands=34)
img = ribbon(img, 1.10, 0.08, 0.7, 2.2, -0.40, PURPLE, VIOLET, k=0.60, x0=0.40, spread=0.10, strands=30)
save(img, "title.jpg")

# Section dividers: navy to purple, with a cyan-to-violet ribbon on the right.
img = canvas(NAVY)
img = glow(img, PURPLE, 0.85, 0.30, 0.45, 0.80)
img = glow(img, TEAL, 0.95, 0.62, 0.30, 0.55)
img = glow(img, DEEP, 0.05, 0.55, 0.40, 0.55)
img = ribbon(img, 1.06, 0.12, 0.8, 1.1, -0.45, CYAN, VIOLET, k=0.75, x0=0.40, spread=0.14, strands=34)
save(img, "divider.jpg")

# Content: near-white, with a small ribbon in the top right corner.
img = canvas(hexrgb("F8F9FC"))
img = glow(img, SKY, 1.02, -0.05, 0.25, 0.22)
img = glow(img, VIOLET, 0.92, -0.05, 0.16, 0.10)
img = ribbon(img, 0.02, 0.05, 1.0, 0.8, 0.10, TEAL, PURPLE, k=0.32, x0=0.70, spread=0.06, strands=18)
save(img, "content.jpg")

# Key messages: pale lavender, a wide ribbon across the bottom.
img = canvas(hexrgb("F3F4FD"))
img = glow(img, SKY, 0.95, 0.60, 0.40, 0.30)
img = glow(img, VIOLET, 0.70, 0.62, 0.30, 0.20)
img = ribbon(img, 0.95, 0.07, 0.8, 0.3, -0.12, TEAL, PURPLE, k=0.45, x0=0.0, spread=0.10)
save(img, "statement.jpg")

# Screenshot panels: a soft teal-to-purple field that screenshots float on.
img = canvas(hexrgb("DDE6FA"))
img = glow(img, SKY, 0.10, 0.10, 0.45, 0.50)
img = glow(img, VIOLET, 0.90, 0.45, 0.45, 0.35)
img = glow(img, hexrgb("7ED6DF"), 0.05, 0.55, 0.30, 0.25)
img = ribbon(img, 0.85, 0.08, 0.9, 0.6, -0.20, hexrgb("FFFFFF"), hexrgb("FFFFFF"), k=0.35, spread=0.10)
save(img, "panel.jpg")

# Logo variants with transparent backgrounds: ink for light slides, white for dark ones.
src = np.asarray(Image.open(LOGO).convert("RGB")).astype(np.float32)
cyan = (src[..., 2] > 180) & (src[..., 0] < 120)
ink_alpha = np.clip((255 - src.min(axis=2)) * 1.2, 0, 255)
for name, ink in (("logo-dark.png", (17, 17, 17)), ("logo-light.png", (255, 255, 255))):
    out = np.zeros((*src.shape[:2], 4), np.uint8)
    out[..., :3] = ink
    out[..., 3] = ink_alpha.astype(np.uint8)
    out[cyan, :3] = (0, 238, 252)
    out[cyan, 3] = 255
    Image.fromarray(out, "RGBA").save(OUT / name, optimize=True)
    print("wrote", OUT / name)
