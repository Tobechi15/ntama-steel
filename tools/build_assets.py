"""Derive the website image set from the supplied artwork.

Requires Python 3 with Pillow, numpy, opencv-python and scipy:

  python -m pip install pillow numpy opencv-python scipy
  python tools/build_assets.py

Sources (assets/raw):
  lift.png     lifting hook + sling + suspended pipe bundle in one layer
               (true alpha)
  crane.png    tower crane (true alpha)
  scene.png    industrial scene (flattened on a checkerboard)
  mockup.png   design mockup (product photo crops)

The scene asset was supplied with a baked-in transparency checkerboard. It is
recovered here as a genuine RGBA cutout: the neutral checker colours are
detected against the cloud/structure edges, removed to alpha 0 and the edge is
feathered so the layer can be composited over the page's own sky.

The crane's own hanging block is erased below its trolley so the supplied hook
layer is the only lifting assembly in the hero (no duplicated hook/rope).
"""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
RAW = ROOT / "assets" / "raw"
OUT.mkdir(parents=True, exist_ok=True)
RAW.mkdir(parents=True, exist_ok=True)

LIFT = RAW / "lift.png"  # hook + sling + pipes, kept as one layer
CRANE = RAW / "crane.png"
SCENE = RAW / "scene.png"
MOCKUP = RAW / "mockup.png"


def trim(im):
    box = im.getchannel("A").getbbox()
    return im.crop(box)


def save_webp(im, name, width=None, quality=82):
    if width and im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    path = OUT / name
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"{path.name:<28} {im.width}x{im.height}  {path.stat().st_size / 1024:6.1f} KB")
    return path


def scene_cutout():
    """Rebuild real alpha for the scene that was flattened on a checkerboard."""
    im = Image.open(SCENE).convert("RGB")
    arr = np.asarray(im).astype(np.int16)
    light, dark = np.array([253, 253, 253]), np.array([201, 202, 207])
    d_light = np.sqrt(((arr - light) ** 2).sum(axis=2))
    d_dark = np.sqrt(((arr - dark) ** 2).sum(axis=2))
    spread = arr.max(axis=2) - arr.min(axis=2)

    bg = ((np.minimum(d_light, d_dark) < 40) & (spread < 24)).astype(np.uint8) * 255
    bg = cv2.morphologyEx(bg, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    bg = cv2.morphologyEx(bg, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))

    # Only checker connected to the frame border is true background; isolated
    # bright cloud highlights inside the scene must survive.
    labels, count = ndimage.label(bg)
    edges = np.unique(np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]]))
    edges = edges[edges != 0]
    sizes = ndimage.sum(bg, labels, range(1, count + 1))
    keep = np.zeros(count + 1, bool)
    keep[edges] = True
    keep[1:] |= sizes > 20000
    bg = keep[labels]

    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = ndimage.binary_fill_holes(alpha > 0).astype(np.uint8) * 255
    alpha = cv2.erode(alpha, np.ones((3, 3), np.uint8))
    alpha_img = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.7))

    # Bleed cloud colour into the feathered edge so no checker-white halo remains.
    soft = np.asarray(alpha_img) < 252
    bgr = cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR)
    filled = cv2.inpaint(bgr, soft.astype(np.uint8) * 255, 8, cv2.INPAINT_TELEA)
    filled = cv2.cvtColor(filled, cv2.COLOR_BGR2RGB)
    rgb = np.where(soft[..., None], filled, np.asarray(im))

    base = np.dstack([rgb, np.asarray(alpha_img)])
    # Close the narrow gaps where hazy cloud was mistaken for checker, then
    # inpaint them from the surrounding cloud so no torn holes survive.
    solid = cv2.morphologyEx(
        (base[..., 3] > 127).astype(np.uint8), cv2.MORPH_CLOSE,
        cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (41, 41)),
    )
    added = (solid > 0) & (base[..., 3] < 128)
    bgr = cv2.cvtColor(base[..., :3], cv2.COLOR_RGB2BGR)
    filled = cv2.inpaint(bgr, added.astype(np.uint8) * 255, 10, cv2.INPAINT_NS)
    filled = cv2.cvtColor(filled, cv2.COLOR_BGR2RGB)
    rgb = np.where(added[..., None], filled, base[..., :3])
    alpha_img = Image.fromarray(cv2.GaussianBlur((solid * 255).astype(np.uint8), (3, 3), 0.6))

    out = Image.fromarray(np.dstack([rgb, np.asarray(alpha_img)])).convert("RGBA")
    out.save(RAW / "scene_cutout.png")
    return out


def sky(w, h, top, bottom):
    grad = np.zeros((h, w, 3), np.uint8)
    for y in range(h):
        t = y / max(h - 1, 1)
        grad[y, :] = (np.array(top) * (1 - t) + np.array(bottom) * t).astype(np.uint8)
    return Image.fromarray(grad, "RGB").convert("RGBA")


def main():
    # --- hero: hook + sling + suspended pipes (single hanging layer) ----------
    # Trimmed to the artwork edges; the cable leaves the frame at ~48.5% of the
    # width, which is the pivot used by the sway animation in globals.css.
    lift = trim(Image.open(LIFT).convert("RGBA"))
    save_webp(lift, "hero-lift-1100.webp", 1100, 88)
    save_webp(lift, "hero-lift-720.webp", 720, 84)

    # --- hero: crane, without its own duplicate block --------------------------
    crane = trim(Image.open(CRANE).convert("RGBA"))
    w, h = crane.size
    alpha = np.asarray(crane.getchannel("A")).copy()
    x0, x1 = int(0.175 * w), int(0.258 * w)
    y0 = int(0.285 * h)
    # soften the erased area so the cutout does not read as a hard box
    alpha[y0:, x0:x1] = 0
    fade = 10
    alpha[y0 : y0 + fade, x0:x1] = 0
    crane.putalpha(Image.fromarray(alpha))
    crane = trim(crane)
    save_webp(crane, "hero-crane-1800.webp", 1800, 84)
    save_webp(crane, "hero-crane-1000.webp", 1000, 82)

    # --- hero: industrial scene, genuine alpha ---------------------------------
    scene = scene_cutout()
    save_webp(scene, "hero-scene-1500.webp", 1500, 80)
    save_webp(scene, "hero-scene-900.webp", 900, 78)

    # --- about: steel frame cutout composited on a cool sky -------------------
    frame = scene.crop((0, int(0.20 * scene.height), int(0.68 * scene.width), scene.height))
    about_w, about_h = 1000, 820
    about = sky(about_w, about_h, (150, 172, 195), (226, 231, 232))
    layer = frame.resize((about_w, round(frame.height * about_w / frame.width)), Image.LANCZOS)
    about.alpha_composite(layer, (0, about_h - layer.height))
    save_webp(about.convert("RGB"), "about-steel-frame.webp", 1000, 80)

    # --- industries: skyline cutout composited on a dusk sky ------------------
    city = scene.crop(
        (int(0.42 * scene.width), int(0.60 * scene.height), scene.width, scene.height)
    )
    ind_w, ind_h = 1300, 900
    ind = sky(ind_w, ind_h, (86, 104, 126), (225, 186, 152))
    layer = city.resize((ind_w, round(city.height * ind_w / city.width)), Image.LANCZOS)
    ind.alpha_composite(layer, (0, ind_h - layer.height))
    save_webp(ind.convert("RGB"), "industries-skyline.webp", 1300, 82)

    # --- product cards: crop the mockup photos, remove the baked-in labels ----
    mock = cv2.imread(str(MOCKUP))
    card_boxes = [(316, 622, 479, 752), (489, 622, 651, 752), (661, 622, 825, 752), (836, 622, 986, 752)]
    names = ["product-rebar", "product-beams", "product-roofing", "product-pipes"]
    for box, name in zip(card_boxes, names):
        x0, y0, x1, y1 = box
        card = mock[y0:y1, x0:x1].copy()
        rgb = cv2.cvtColor(card, cv2.COLOR_BGR2RGB).astype(np.int16)
        lum = rgb.mean(axis=2)
        chroma = rgb.max(axis=2) - rgb.min(axis=2)
        mask = np.zeros(lum.shape, np.uint8)
        label_area = np.zeros_like(mask, bool)
        label_area[int(lum.shape[0] * 0.62) :, : int(lum.shape[1] * 0.98)] = True
        mask[(lum > 150) & (chroma < 30) & label_area] = 255
        mask = cv2.dilate(mask, np.ones((3, 3), np.uint8))
        card = cv2.inpaint(card, mask, 3, cv2.INPAINT_TELEA)
        card = cv2.resize(card, (480, 384), interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(str(OUT / f"{name}.webp"), card, [cv2.IMWRITE_WEBP_QUALITY, 78])
        print(f"{name + '.webp':<28} 480x384  {(OUT / (name + '.webp')).stat().st_size / 1024:6.1f} KB")

    # --- brand mark ------------------------------------------------------------
    print("done")


if __name__ == "__main__":
    main()
