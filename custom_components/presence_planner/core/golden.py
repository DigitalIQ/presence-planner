"""Generate the golden files that the JS core is checked against.

Run ``python -m custom_components.presence_planner.core.golden`` from the repository root.  The output is
deterministic: fixed sample lists, a seeded random generator and every float rounded to 4 decimals.

Files written to ``shared/golden/``:

* ``demo-detect.json``   sensor/point samples with the expected quality (``detect``)
* ``demo-evaluate.json`` ``evaluate`` on the demo plan, doors open and doors closed, without grid
* ``demo-spill.json``    ``spill_detail`` per demo sensor
* ``demo-optimize.json`` best mount point per room (cell 0.2, weight 1)
"""

from __future__ import annotations

import json
import math
import random
from pathlib import Path

from . import build_model, detect, evaluate, load_profiles, optimize, resolve_sensor, spill_detail
from .detection import SensorCtx
from .geometry import dist_point_segment

ROOT = Path(__file__).resolve().parents[3]
DEMO_PLAN = ROOT / "shared" / "demo-plan.json"
GOLDEN_DIR = ROOT / "shared" / "golden"
SEED = 20261020
EVAL_OPTS = {"heights": [0.5, 0.9, 1.3], "thin_db": 10, "cell": 0.1}
OPT_OPTS = {"heights": [0.5, 0.9, 1.3], "doors": "open", "thin_db": 10, "cell": 0.2}


def load_demo() -> tuple[dict, list]:
    with DEMO_PLAN.open(encoding="utf-8") as fh:
        data = json.load(fh)
    return data["plan"], data["sensors"]


def _r(v: float) -> float:
    v = round(v, 4)
    return 0.0 if v == 0 else v


def round_floats(obj):
    if isinstance(obj, float):
        return _r(obj)
    if isinstance(obj, dict):
        return {k: round_floats(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [round_floats(v) for v in obj]
    return obj


# --- detect samples --------------------------------------------------------------------------------------


def _extra_sensors(profiles: dict) -> dict:
    """Hypothetical sensors that exercise tilt, other profiles and the ceiling cone (not part of the demo plan)."""

    def mk(**kw):
        base = {"floor_id": "demo", "active": True}
        base.update(kw)
        return resolve_sensor(base, profiles)

    return {
        "living_tilt30": mk(
            entity_id="binary_sensor.extra_living_tilt",
            x=0.05,
            z=2.1,
            height=2.2,
            phi=0,
            tilt=30,
            mount="wall",
            profile="everything_presence_one",
        ),
        "living_ceiling_fp400": mk(
            entity_id="binary_sensor.extra_living_ceiling",
            x=2.5,
            z=2.1,
            height=2.6,
            phi=0,
            tilt=90,
            mount="ceiling",
            profile="aqara_fp400",
        ),
        "kitchen_wall": mk(
            entity_id="binary_sensor.extra_kitchen_wall",
            x=1.5,
            z=6.97,
            height=1.9,
            phi=270,
            tilt=10,
            mount="wall",
            profile="aqara_fp300",
        ),
        "bedroom_pir": mk(
            entity_id="binary_sensor.extra_bedroom_pir",
            x=5.1,
            z=2.6,
            height=1.5,
            phi=0,
            tilt=0,
            mount="wall",
            profile="aqara_p1",
        ),
        "open_room": mk(
            entity_id="binary_sensor.extra_open_room",
            x=0.1,
            z=2.1,
            height=1.9,
            phi=0,
            tilt=10,
            mount="wall",
            profile="aqara_fp300",
        ),
        # Free of walls: shows the edge taper because the reach (3 m) is short compared with the sample distances.
        "outdoor": mk(
            entity_id="binary_sensor.extra_outdoor",
            x=-8.0,
            z=2.0,
            height=2.4,
            phi=0,
            tilt=0,
            mount="wall",
            profile="custom",
            fov_h=120,
            fov_v=60,
            reach=3.0,
        ),
        "custom_assumed": mk(
            entity_id="binary_sensor.extra_custom",
            x=2.0,
            z=3.0,
            height=1.9,
            phi=45,
            tilt=20,
            mount="wall",
            profile="custom",
            fov_v=None,
        ),
    }


def _frame_point(s: dict, yaw_deg: float, pitch_deg: float, length: float) -> list:
    """Point at the given yaw/pitch (in the sensor frame, see ARCHITECTURE.md) and distance from a wall/corner sensor."""
    ctx = SensorCtx(s)
    y, p = math.radians(yaw_deg), math.radians(pitch_deg)
    cy, sy, cp, sp = math.cos(y), math.sin(y), math.cos(p), math.sin(p)
    vx = length * (cp * (cy * ctx.fx + sy * ctx.rx) + sp * ctx.ux)
    vy = length * (cp * (cy * ctx.fy) + sp * ctx.uy)
    vz = length * (cp * (cy * ctx.fz + sy * ctx.rz) + sp * ctx.uz)
    return [s["x"] + vx, s["height"] + vy, s["z"] + vz]


def _cone_point(s: dict, theta_deg: float, azimuth_deg: float, length: float) -> list:
    t, a = math.radians(theta_deg), math.radians(azimuth_deg)
    return [
        s["x"] + length * math.sin(t) * math.cos(a),
        s["height"] - length * math.cos(t),
        s["z"] + length * math.sin(t) * math.sin(a),
    ]


def _degenerate(model, s: dict, point) -> bool:
    """True for samples that sit on a wall line or send the ray through a wall end point (fragile in any port)."""
    sp = (s["x"], s["z"])
    pp = (point[0], point[2])
    segs = [(g["a"], g["b"]) for g in model.segments] + [(d["a"], d["b"]) for d in model.doors]
    for a, b in segs:
        if dist_point_segment(sp[0], sp[1], a, b) < 0.003 or dist_point_segment(pp[0], pp[1], a, b) < 0.003:
            return True
        if dist_point_segment(a[0], a[1], sp, pp) < 0.003 or dist_point_segment(b[0], b[1], sp, pp) < 0.003:
            return True
    polys = [w["poly"] for w in model.free_walls] + [f["poly"] for f in model.furniture if f["obstacle"]]
    for poly in polys:
        for i in range(len(poly)):
            if dist_point_segment(pp[0], pp[1], poly[i], poly[(i + 1) % len(poly)]) < 0.003:
                return True
    return False


def detect_samples(plan: dict, demo_sensors: list) -> list:
    model = build_model(plan, "demo")
    profiles = load_profiles()
    rng = random.Random(SEED)
    sensors = {s["entity_id"].split(".")[1]: resolve_sensor(s, profiles) for s in demo_sensors}
    extras = _extra_sensors(profiles)
    everything = list(sensors.values()) + list(extras.values())
    samples: list[dict] = []

    def add(tag: str, s: dict, point, doors="open", thin_db=10):
        pt = [_r(point[0]), _r(point[1]), _r(point[2])]
        if _degenerate(model, s, pt):
            return
        opts = {"doors": doors, "thin_db": thin_db}
        q = detect(model, s, tuple(pt), opts)
        samples.append({"tag": tag, "sensor": round_floats(s), "point": pt, "opts": opts, "quality": _r(q)})

    bounds = model.bounds
    # 1. scattered points over the whole flat for every sensor
    for s in everything:
        for _ in range(16):
            add(
                "scatter",
                s,
                [
                    rng.uniform(bounds["x0"] + 0.4, bounds["x1"] - 0.4),
                    rng.choice([0.5, 0.9, 1.3]),
                    rng.uniform(bounds["z0"] + 0.4, bounds["z1"] - 0.4),
                ],
            )
    # 2. behind thin and brick walls: straight lines through the hall/bath wall, the kitchen/hall wall and the living/kitchen wall
    hall, bath, kitchen, living = (
        sensors["demo_hall_motion"],
        sensors["demo_bath_presence"],
        sensors["demo_kitchen_presence"],
        sensors["demo_living_presence"],
    )
    for dz in (-1.2, -0.8, -0.4, 0.0, 0.4, 0.8, 1.2):
        add("thin_wall", hall, [5.15, 1.3, 5.6 + dz])
        add("thin_wall", hall, [5.6, 1.3, 5.6 + dz])
        add("thin_wall", hall, [5.15, 1.3, 5.6 + dz], thin_db=20)
        add("brick_wall", hall, [2.85, 1.3, 5.6 + dz])
        add("brick_wall", hall, [4.0 + dz * 0.5, 1.3, 4.05])
    for x in (5.2, 5.5, 5.9, 6.4):
        add("thin_wall", bath, [x - 0.8 * (x - 5.0), 1.3, 5.0])
        add("thin_wall", bath, [4.85, 0.9, 4.4 + (x - 5.2)])
    for x in (0.5, 1.0, 1.5, 2.0, 2.5):
        add("brick_wall", living, [x, 1.3, 4.45])
        add("brick_wall", kitchen, [x, 1.3, 3.95])
    # 3. through doors: continue the ray sensor -> door centre, open and closed
    door_lines = [
        (hall, "d_kitchen", [3.0, 5.4]),
        (hall, "d_living", [4.0, 4.2]),
        (hall, "d_bath", [5.0, 5.6]),
        (kitchen, "d_kitchen", [3.0, 5.4]),
        (bath, "d_bath", [5.0, 5.6]),
        (living, "d_bed", [5.0, 3.3]),
        (sensors["demo_bedroom_presence"], "d_bed", [5.0, 3.3]),
    ]
    for s, _door, c in door_lines:
        dx, dz = c[0] - s["x"], c[1] - s["z"]
        length = math.hypot(dx, dz)
        for beyond in (0.3, 0.9, 1.6, 2.2):
            f = 1 + beyond / length
            for h in (0.9, 1.3):
                for doors in ("open", "closed"):
                    add("door_" + doors, s, [s["x"] + dx * f, h, s["z"] + dz * f], doors=doors)
    add("door_dict", hall, [2.0, 1.3, 5.2], doors={"d_kitchen": False})
    add("door_dict", hall, [2.0, 1.3, 5.2], doors={"d_kitchen": True})
    add("door_dict", hall, [4.0, 1.3, 3.2], doors={"d_kitchen": False})
    # 4. near the edges of the field of view (yaw, pitch) and along the reach ramp, in open space
    open_room = extras["open_room"]
    for s in [
        open_room,
        extras["living_tilt30"],
        extras["bedroom_pir"],
        extras["custom_assumed"],
        extras["kitchen_wall"],
        extras["outdoor"],
    ]:
        half_h, half_v = s["fov_h"] / 2, s["fov_v"] / 2
        lengths = (1.8, 2.4, 2.9) if s is extras["outdoor"] else (1.6, 2.4)
        for dy in (-20, -14, -8, -1, 1):
            for sign in (1, -1):
                for length in lengths:
                    add("fov_edge_yaw", s, _frame_point(s, sign * (half_h + dy), 0, length))
        for dp in (-12, -6, -1, 1):
            for sign in (1, -1):
                for length in lengths[:2]:
                    p = _frame_point(s, 10, sign * (half_v + dp), length)
                    if p[1] >= 0.05:
                        add("fov_edge_pitch", s, p)
        if s is extras["outdoor"]:
            for dy, dp in ((-5, -5), (-10, -6), (-3, -2), (1, -3)):
                for length in (1.4, 1.9):
                    add("fov_edge_both", s, _frame_point(s, half_h + dy, half_v + dp, length))
                    add("fov_edge_both", s, _frame_point(s, -(half_h + dy), -(half_v + dp), length))
    for dx in (0.5, 1.5, 3.0, 3.5, 4.0, 4.5, 4.85):
        for h in (1.9, 1.3):
            add("reach_ramp", open_room, [open_room["x"] + dx, h, open_room["z"]])
    # 5. below and beside the sensor
    for s in everything:
        for off in (0.0, 0.15, 0.4, 0.8):
            for h in (0.5, 1.3):
                add("below", s, [s["x"] + off, h, s["z"] + off * 0.5])
    # 6. ceiling cone: angle from straight down around the opening angle, three azimuths
    for s in (sensors["demo_hall_motion"], extras["living_ceiling_fp400"]):
        half = (s.get("ceiling_fov") or max(s["fov_h"], s["fov_v"])) / 2
        for d in (-30, -16, -8, -1, 1, 6):
            for az in (0, 120, 250):
                add("ceiling_cone", s, _cone_point(s, half + d, az, 2.2))
        for h in (0.5, 1.3, 2.2):
            for r in (0.0, 0.5, 1.2, 2.4):
                add("ceiling_height", s, [s["x"] + r, h, s["z"]])
    # 7. tall furniture and the free wall
    living_s = sensors["demo_living_presence"]
    for z in (0.5, 0.9, 1.2, 1.5, 1.9):
        add("furniture", living_s, [4.9, 1.3, z])
        add("furniture", living_s, [4.9, 2.3, z])
    add("furniture", kitchen, [2.7, 1.3, 6.9])
    add("furniture", extras["kitchen_wall"], [2.7, 1.3, 5.0])
    add("free_wall", kitchen, [0.45, 1.3, 6.9])
    add("free_wall", kitchen, [0.45, 1.3, 6.7])
    add("free_wall", extras["kitchen_wall"], [0.45, 1.3, 5.9])
    add("free_wall", extras["kitchen_wall"], [0.45, 0.5, 6.0])
    return samples


# --- evaluate / spill / optimize -----------------------------------------------------------------------------


def evaluate_golden(plan: dict, demo_sensors: list) -> dict:
    model = build_model(plan, "demo")
    profiles = load_profiles()
    sensors = [resolve_sensor(s, profiles) for s in demo_sensors]
    return {
        "version": 1,
        "floor_id": "demo",
        "opts": dict(EVAL_OPTS),
        "sensors": round_floats(sensors),
        "open": round_floats(evaluate(model, sensors, dict(EVAL_OPTS, doors="open"))),
        "closed": round_floats(evaluate(model, sensors, dict(EVAL_OPTS, doors="closed"))),
    }


def spill_golden(plan: dict, demo_sensors: list) -> dict:
    model = build_model(plan, "demo")
    profiles = load_profiles()
    sensors = [resolve_sensor(s, profiles) for s in demo_sensors]
    opts = dict(EVAL_OPTS)
    return {
        "version": 1,
        "floor_id": "demo",
        "opts": opts,
        "sensors": [{"sensor": round_floats(s), "spill": round_floats(spill_detail(model, s, opts))} for s in sensors],
    }


def optimize_golden(plan: dict) -> dict:
    model = build_model(plan, "demo")
    out: dict = {
        "version": 1,
        "floor_id": "demo",
        "opts": dict(OPT_OPTS),
        "weight": 1.0,
        "note": "best candidate per room; candidates with equal score are ordered by smaller x, then smaller z; "
        "tied_with_best counts the returned candidates (max 5, distinct positions) whose score equals the best one",
    }
    for key, profile in (None, "aqara_fp300"), ("wall_corner", "everything_presence_lite"):
        rooms = {}
        for r in model.rooms:
            res = optimize(model, r["id"], profile, dict(OPT_OPTS), 1.0)
            best = res[0]
            rooms[r["id"]] = {
                "best": round_floats(best),
                "tied_with_best": sum(1 for c in res if abs(c["score"] - best["score"]) < 1e-9),
            }
        if key is None:
            out["profile"] = profile
            out["rooms"] = rooms
        else:
            out[key] = {"profile": profile, "rooms": rooms}
    return out


def generate() -> dict:
    plan, sensors = load_demo()
    return {
        "demo-detect.json": {"version": 1, "floor_id": "demo", "samples": detect_samples(plan, sensors)},
        "demo-evaluate.json": evaluate_golden(plan, sensors),
        "demo-spill.json": spill_golden(plan, sensors),
        "demo-optimize.json": optimize_golden(plan),
    }


# --- writer ----------------------------------------------------------------------------------------------------


def dumps(obj, depth: int = 0) -> str:
    """JSON with the first two levels expanded and deeper levels on one line (stable and diff friendly)."""
    if depth >= 2 or not isinstance(obj, (dict, list)) or not obj:
        return json.dumps(obj, separators=(", ", ": "), ensure_ascii=False)
    pad = "  " * (depth + 1)
    end = "  " * depth
    if isinstance(obj, dict):
        body = ",\n".join(f"{pad}{json.dumps(k)}: {dumps(v, depth + 1)}" for k, v in obj.items())
        return "{\n" + body + "\n" + end + "}"
    body = ",\n".join(pad + dumps(v, depth + 1) for v in obj)
    return "[\n" + body + "\n" + end + "]"


def main() -> None:
    GOLDEN_DIR.mkdir(parents=True, exist_ok=True)
    for name, data in generate().items():
        (GOLDEN_DIR / name).write_text(dumps(data) + "\n", encoding="utf-8")
        print(f"wrote {name}")


if __name__ == "__main__":
    main()
