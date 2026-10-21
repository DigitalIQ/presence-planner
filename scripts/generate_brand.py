"""Generate the repository-owned radar/floor-plan icon deterministically."""

from pathlib import Path

from PIL import Image, ImageDraw

size = 1024
im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
d = ImageDraw.Draw(im)
d.rounded_rectangle((40, 40, 984, 984), radius=220, fill="#123348")
d.line([(250, 785), (250, 245), (785, 245), (785, 785), (540, 785)], fill="#e6f3f8", width=44)
d.line([(515, 245), (515, 445)], fill="#e6f3f8", width=32)
for r in (140, 265, 390):
    d.arc((280-r, 745-r, 280+r, 745+r), 270, 360, fill="#50d6a2", width=28)
d.ellipse((244, 709, 316, 781), fill="#50d6a2")
out = Path(__file__).resolve().parents[1] / "custom_components/presence_planner/brand/icon.png"
out.parent.mkdir(parents=True, exist_ok=True)
im.resize((256, 256), Image.Resampling.LANCZOS).save(out)
