"""Small plans and sensors for the core tests (synthetic, no real floor plans)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEMO_PATH = ROOT / "shared" / "demo-plan.json"


def load_demo():
    data = json.loads(DEMO_PATH.read_text(encoding="utf-8"))
    return data["plan"], data["sensors"]


def make_plan(rooms, openings=None, walls=None, furniture=None, settings=None, height=2.6):
    return {
        "version": 1,
        "settings": settings or {"wall_exterior": 0.24, "wall_interior": 0.12},
        "floors": [
            {
                "id": "f",
                "name": "Test",
                "elevation": 0,
                "height": height,
                "rooms": rooms,
                "openings": openings or [],
                "walls": walls or [],
                "furniture": furniture or [],
                "outdoor": [],
                "background": None,
            }
        ],
    }


def rect(rid, x0, z0, x1, z1, thickness=None, **kw):
    room = {"id": rid, "name": rid, "points": [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]}
    if thickness is not None:
        room["wall_thickness"] = thickness
    room.update(kw)
    return room


def sensor(x, z, height=1.9, phi=0, tilt=0, mount="wall", fov_h=120, fov_v=90, reach=6, **kw):
    s = {
        "entity_id": "binary_sensor.test",
        "floor_id": "f",
        "x": x,
        "z": z,
        "height": height,
        "phi": phi,
        "tilt": tilt,
        "mount": mount,
        "profile": "custom",
        "fov_h": fov_h,
        "fov_v": fov_v,
        "reach": reach,
        "active": True,
    }
    s.update(kw)
    return s


def expected_quality(d, reach):
    """Quality for a point inside the field of view and not attenuated: 1 up to 0.58 reach, then down to 0.6."""
    k = 0.58 * reach
    return 1.0 if d <= k else 1 - 0.4 * (d - k) / (reach - k)
