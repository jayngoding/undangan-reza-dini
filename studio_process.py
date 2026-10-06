"""
Studio-look processor untuk foto prewedding.
- AI segmentation (ISNet general + U2Net human) untuk memisahkan subjek dari background
- Background dinding diganti backdrop studio champagne yang halus & seragam
- Subjek TIDAK diubah (piksel asli), tepi di-feather + grain & grade seragam
  agar hasil terlihat seperti foto asli di studio, bukan hasil ganti-background.
"""
import os
import sys
import numpy as np
import cv2
from PIL import Image, ImageEnhance
from rembg import remove, new_session

PUB = os.path.join(os.path.dirname(__file__), "public")
NAMES = ["foto_1", "foto_2", "foto_3", "foto_4", "foto_5"]
MAX_W = 1600
SEED = 42

_sessions = {}


def get_session(name):
    if name not in _sessions:
        try:
            _sessions[name] = new_session(name)
        except Exception as e:
            print(f"  [warn] gagal memuat model {name}: {e}", flush=True)
            _sessions[name] = None
    return _sessions[name]


def get_subject_alpha(src: Image.Image) -> np.ndarray:
    """Union mask dari 2 model: general (termasuk bunga/objek) + human seg."""
    alphas = []
    for model in ("isnet-general-use", "u2net_human_seg"):
        s = get_session(model)
        if s is None:
            continue
        try:
            rgba = remove(src, session=s, post_process=True)
            alphas.append(np.array(rgba)[:, :, 3])
        except Exception as e:
            print(f"  [warn] inference {model} gagal: {e}", flush=True)
    if not alphas:
        raise RuntimeError("Tidak ada model segmentasi yang berhasil")
    a = np.maximum.reduce(alphas)
    # tutup lubang kecil di mask
    a = cv2.morphologyEx(a, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    # solidifikasi: area hampir-opaque dijadikan penuh, hampir-transparan dibuang,
    # sehingga tidak ada bayangan "hantu" semi-transparan di backdrop
    a = np.where(a > 200, 255, a)
    a = np.where(a < 45, 0, a)
    return a


def make_backdrop(w, h, cx, cy):
    """Backdrop studio champagne: gradasi vertikal + hotspot hangat + vignette."""
    yn, xn = np.mgrid[0:h, 0:w].astype(np.float32)
    xn = xn / w
    yn = yn / h
    top = np.array([243, 234, 221], np.float32)
    bot = np.array([202, 185, 163], np.float32)
    img = top[None, :] * (1 - yn[..., None]) + bot[None, :] * yn[..., None]

    # hotspot cahaya studio di belakang couple (mengikuti posisi subjek)
    d = np.sqrt(((xn - cx) * 0.95) ** 2 + ((yn - cy) * 1.4) ** 2)
    glow = np.exp(-((d / 0.48) ** 2)) * 0.50
    img = img + glow[..., None] * np.array([26, 22, 13], np.float32)

    # vignette sudut
    dv = np.sqrt(((xn - 0.5) * 2.2) ** 2 + ((yn - 0.5) * 2.0) ** 2)
    vig = np.clip(dv - 0.70, 0, 1) ** 1.6 * 0.34
    img *= 1 - vig[..., None]

    return np.clip(img, 0, 255).astype(np.uint8)


def process(name: str):
    path = os.path.join(PUB, f"{name}.jpeg")
    out_path = os.path.join(PUB, f"studio_{name.split('_')[1]}.jpeg")

    src = Image.open(path).convert("RGB")
    W, H = src.size
    scale = min(1.0, MAX_W / W)
    if scale < 1.0:
        src = src.resize((round(W * scale), round(H * scale)), Image.LANCZOS)
    W, H = src.size
    rgb = np.array(src).astype(np.float32)

    print(f"{name}: {W}x{H} — segmentasi...", flush=True)
    alpha = get_subject_alpha(src)

    # erode 1px agar pinggiran warna dinding yang menempel di subjek ikut tergantikan,
    # lalu feather lembut seperti bokeh lensa studio
    a_eroded = cv2.erode(alpha, np.ones((3, 3), np.uint8), iterations=1)
    Sw = cv2.GaussianBlur(a_eroded, (0, 0), 2.4).astype(np.float32) / 255.0
    Sw = np.clip(Sw, 0, 1)[..., None]

    # posisi hotspot: sedikit di atas kepala subjek
    ys, xs = np.nonzero(alpha > 128)
    if len(xs):
        cx = float(xs.mean()) / W
        cy = float(np.clip(ys.min() / H + 0.08, 0.22, 0.52))
    else:
        cx, cy = 0.5, 0.38

    bg = make_backdrop(W, H, cx, cy)
    bg = cv2.GaussianBlur(bg, (0, 0), 1.6)  # sedikit lembut seperti bokeh studio
    bgf = bg.astype(np.float32)

    out = rgb * Sw + bgf * (1 - Sw)

    # color grade hangat yang halus & seragam
    out[..., 0] = out[..., 0] * 1.012 + 1.5
    out[..., 1] = out[..., 1] * 1.004
    out[..., 2] = out[..., 2] * 0.984

    # grain film halus — menyatukan subjek & backdrop
    grain = np.random.default_rng(SEED + int(name.split("_")[1])).normal(
        0, 2.2, (H, W)
    ).astype(np.float32)
    out = np.clip(out + grain[..., None], 0, 255).astype(np.uint8)

    im = Image.fromarray(out)
    im = ImageEnhance.Color(im).enhance(1.045)
    im = ImageEnhance.Contrast(im).enhance(1.03)
    im.save(out_path, quality=88, optimize=True, progressive=True)
    print(f"{name}: tersimpan -> {out_path}", flush=True)


if __name__ == "__main__":
    only = sys.argv[1:] or NAMES
    for n in only:
        process(n)
    print("SELESAI", flush=True)
