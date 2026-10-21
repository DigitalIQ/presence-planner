"""3D detection of a point by one sensor: field of view, edge taper, wall/door/obstacle attenuation.

``SensorCtx`` holds the precomputed view frame of one sensor, ``RayCaster`` computes the 2D attenuation
along the plan projection of a ray.  Both are used by ``detect`` and, in tight loops, by ``evaluate``,
``spill_detail`` and ``optimize``.
"""

from __future__ import annotations

import math

from .geometry import angle_diff, clip_segment
from .model import Model
from .profiles import ensure_resolved

DEFAULT_OPTS = {"heights": [0.5, 0.9, 1.3], "doors": "open", "thin_db": 10, "cell": 0.1}
BRICK_DB = 25.0
CLOSED_DOOR_DB = 6.0
OBSTACLE_DB = 10.0
ANGLE_EPS = 1e-9


def normalize_opts(opts: dict | None) -> dict:
    """Fill defaults.  ``doors`` is ``"open"``, ``"closed"`` or ``{door_id: is_open}`` (missing id = open)."""
    out = dict(DEFAULT_OPTS)
    if opts:
        for k, v in opts.items():
            if v is not None:
                out[k] = v
    out["heights"] = list(out["heights"])
    return out


def closed_door_ids(model: Model, doors) -> frozenset:
    """Ids of the doors that count as closed for this ``doors`` option."""
    if doors == "closed":
        return frozenset(d["id"] for d in model.doors)
    if isinstance(doors, dict):
        return frozenset(d["id"] for d in model.doors if doors.get(d["id"], True) is False)
    return frozenset()


def height_key(h: float) -> str:
    return f"{h:g}"


class SensorCtx:
    """View frame of one sensor.  Build once per sensor (or per optimizer candidate)."""

    __slots__ = (
        "ceiling",
        "deg_c",
        "deg_h",
        "deg_v",
        "fx",
        "fy",
        "fz",
        "half_c",
        "half_h",
        "half_v",
        "reach",
        "rx",
        "rz",
        "tan_h",
        "ux",
        "uy",
        "uz",
        "x",
        "y",
        "z",
    )

    def __init__(self, sensor: dict):
        s = ensure_resolved(sensor)
        self.x = float(s["x"])
        self.z = float(s["z"])
        self.y = float(s.get("height", 1.9))
        self.reach = float(s["reach"])
        self.ceiling = s["mount"] == "ceiling"
        fov_h = float(s["fov_h"])
        fov_v = float(s["fov_v"])
        self.deg_h = fov_h / 2
        self.deg_v = fov_v / 2
        self.half_h = math.radians(self.deg_h)
        self.half_v = math.radians(self.deg_v)
        cone = s.get("ceiling_fov")
        self.deg_c = (float(cone) if cone else max(fov_h, fov_v)) / 2
        self.half_c = math.radians(self.deg_c)
        phi = math.radians(float(s.get("phi", 0.0)))
        tau = math.radians(float(s.get("tilt", 0.0)))
        cp, sp, ct, st = math.cos(phi), math.sin(phi), math.cos(tau), math.sin(tau)
        # Forward f, right r = normalize(f x up), up' = r x f (y is up).
        self.fx, self.fy, self.fz = cp * ct, -st, sp * ct
        self.rx, self.rz = -sp, cp
        self.ux, self.uy, self.uz = cp * st, ct, sp * st
        self.tan_h = math.tan(self.half_h) + 1e-6 if self.half_h < math.pi / 2 - 1e-6 else None

    def fov_gain(self, vx: float, vy: float, vz: float, d: float):
        """Edge taper factor 0.6…1 for a vector inside the field of view, ``None`` outside."""
        if self.ceiling:
            c = -vy / d
            theta = math.acos(1.0 if c > 1.0 else (max(c, -1.0)))
            if theta > self.half_c + ANGLE_EPS:
                return None
            k = (math.degrees(theta) - (self.deg_c - 15.0)) / 15.0
            return 1.0 - 0.4 * (0.0 if k < 0.0 else (min(k, 1.0)))
        a = vx * self.fx + vy * self.fy + vz * self.fz
        if a <= 0.0:
            return None
        b = vx * self.rx + vz * self.rz
        if self.tan_h is not None and abs(b) > a * self.tan_h:
            return None
        yaw = abs(math.atan2(b, a))
        if yaw > self.half_h + ANGLE_EPS:
            return None
        c = vx * self.ux + vy * self.uy + vz * self.uz
        pitch = abs(math.atan2(c, math.hypot(a, b)))
        if pitch > self.half_v + ANGLE_EPS:
            return None
        ky = (math.degrees(yaw) - (self.deg_h - 15.0)) / 15.0
        kp = (math.degrees(pitch) - (self.deg_v - 10.0)) / 10.0
        gy = 1.0 - 0.4 * (0.0 if ky < 0.0 else (min(ky, 1.0)))
        gp = 1.0 - 0.4 * (0.0 if kp < 0.0 else (min(kp, 1.0)))
        return gy * gp

    def quality(self, px: float, py: float, pz: float, rc: RayCaster) -> float:
        """Detection quality 0…1 of the point ``(px, py, pz)`` (``py`` is the height)."""
        vx = px - self.x
        vy = py - self.y
        vz = pz - self.z
        d2 = vx * vx + vy * vy + vz * vz
        reach = self.reach
        if d2 < 1e-12 or d2 > reach * reach:
            return 0.0
        d = math.sqrt(d2)
        g = self.fov_gain(vx, vy, vz, d)
        if g is None or d > reach * g:
            return 0.0
        loss = rc.loss(px, pz, py)
        if loss is None or d > reach * g * 10.0 ** (-loss / 20.0):
            return 0.0
        return distance_quality(d, reach)


def distance_quality(d: float, reach: float) -> float:
    """1 up to 0.58·reach, then linear down to 0.6 at reach."""
    k = 0.58 * reach
    if d <= k:
        return 1.0
    return 1.0 - 0.4 * (d - k) / (reach - k)


class RayCaster:
    """Attenuation of the 2D ray from a sensor position to a point.

    Wall pieces cross-test with a half-open rule on the ray side so a ray that passes exactly through a
    wall vertex is counted once, not twice and not zero times.
    """

    __slots__ = ("all_doors", "blockers", "closed", "obstacles", "sx", "sy", "sz", "walls")

    def __init__(
        self, model: Model, sx: float, sz: float, sy: float, reach: float, closed_ids=frozenset(), thin_db: float = 10.0
    ):
        self.sx, self.sz, self.sy = sx, sz, sy
        fast = model.fast
        lx, hx, lz, hz = sx - reach, sx + reach, sz - reach, sz + reach
        walls = []
        for ax, az, bx, bz, kind, x0, x1, z0, z1 in fast["walls"]:
            if x1 < lx or x0 > hx or z1 < lz or z0 > hz:
                continue
            db = None if kind == 0 else (BRICK_DB if kind == 1 else float(thin_db))
            walls.append((ax, az, bx, bz, db, x0, x1, z0, z1))
        self.walls = walls
        self.closed = []
        self.all_doors = []
        for did, ax, az, bx, bz, x0, x1, z0, z1, outside in fast["doors"]:
            if x1 < lx or x0 > hx or z1 < lz or z0 > hz:
                continue
            self.all_doors.append((did, ax, az, bx, bz, x0, x1, z0, z1))
            if did in closed_ids:
                self.closed.append((ax, az, bx, bz, x0, x1, z0, z1))
        # Polygons that contain the sensor itself are ignored (the sensor stands on or in them).
        self.blockers = []
        for hp, (x0, x1, z0, z1) in fast["blockers"]:
            if x1 < lx or x0 > hx or z1 < lz or z0 > hz:
                continue
            if not _contains(hp, sx, sz):
                self.blockers.append((hp, x0, x1, z0, z1))
        self.obstacles = []
        for hp, (x0, x1, z0, z1), h in fast["obstacles"]:
            if x1 < lx or x0 > hx or z1 < lz or z0 > hz:
                continue
            if not _contains(hp, sx, sz):
                self.obstacles.append((hp, x0, x1, z0, z1, h))

    def loss(self, px: float, pz: float, py: float):
        """Total attenuation in dB along the ray, or ``None`` when a blocking wall is in the way."""
        sx, sz = self.sx, self.sz
        if px < sx:
            minx, maxx = px, sx
        else:
            minx, maxx = sx, px
        if pz < sz:
            minz, maxz = pz, sz
        else:
            minz, maxz = sz, pz
        rx = px - sx
        rz = pz - sz
        total = 0.0
        for ax, az, bx, bz, db, x0, x1, z0, z1 in self.walls:
            if x1 < minx or x0 > maxx or z1 < minz or z0 > maxz:
                continue
            ex = bx - ax
            ez = bz - az
            if (ex * (sz - az) - ez * (sx - ax)) * (ex * (pz - az) - ez * (px - ax)) >= 0.0:
                continue
            if ((rx * (az - sz) - rz * (ax - sx)) >= 0.0) == ((rx * (bz - sz) - rz * (bx - sx)) >= 0.0):
                continue
            if db is None:
                return None
            total += db
        for ax, az, bx, bz, x0, x1, z0, z1 in self.closed:
            if x1 < minx or x0 > maxx or z1 < minz or z0 > maxz:
                continue
            ex = bx - ax
            ez = bz - az
            if (ex * (sz - az) - ez * (sx - ax)) * (ex * (pz - az) - ez * (px - ax)) >= 0.0:
                continue
            if ((rx * (az - sz) - rz * (ax - sx)) >= 0.0) == ((rx * (bz - sz) - rz * (bx - sx)) >= 0.0):
                continue
            total += CLOSED_DOOR_DB
        for hp, x0, x1, z0, z1 in self.blockers:
            if x1 < minx or x0 > maxx or z1 < minz or z0 > maxz:
                continue
            if clip_segment(hp, sx, sz, px, pz) is not None:
                return None
        if self.obstacles:
            sy = self.sy
            for hp, x0, x1, z0, z1, h in self.obstacles:
                if x1 < minx or x0 > maxx or z1 < minz or z0 > maxz:
                    continue
                hit = clip_segment(hp, sx, sz, px, pz)
                if hit is None:
                    continue
                lo, hi, _ = hit
                # Height of the ray where it is over the footprint; damped if it is below the top anywhere.
                if min(sy + (py - sy) * lo, sy + (py - sy) * hi) < h:
                    total += OBSTACLE_DB
        return total

    def doors_crossed(self, px: float, pz: float) -> tuple[str, ...]:
        """All crossed doors, in stable ID order independent of plan ordering."""
        crossed = set()
        sx, sz = self.sx, self.sz
        rx = px - sx
        rz = pz - sz
        for did, ax, az, bx, bz, x0, x1, z0, z1 in self.all_doors:
            ex = bx - ax
            ez = bz - az
            if (ex * (sz - az) - ez * (sx - ax)) * (ex * (pz - az) - ez * (px - ax)) >= 0.0:
                continue
            if ((rx * (az - sz) - rz * (ax - sx)) >= 0.0) == ((rx * (bz - sz) - rz * (bx - sx)) >= 0.0):
                continue
            crossed.add(did)
        return tuple(sorted(crossed))

    def door_crossed(self, px: float, pz: float):
        """Compatibility accessor for callers interested in a single crossed door."""
        return next(iter(self.doors_crossed(px, pz)), None)


def _contains(hp, px: float, pz: float) -> bool:
    for ax, az, ex, ez in hp:
        if ex * (pz - az) - ez * (px - ax) < 0:
            return False
    return True


def make_caster(model: Model, s: dict, doors="open", thin_db: float = 10.0) -> RayCaster:
    return RayCaster(
        model,
        float(s["x"]),
        float(s["z"]),
        float(s.get("height", 1.9)),
        float(s["reach"]),
        closed_door_ids(model, doors),
        thin_db,
    )


def detect(model: Model, sensor: dict, point, opts: dict | None = None) -> float:
    """Detection quality 0…1 of ``point = (x, y, z)`` (``y`` = height) by ``sensor``."""
    o = normalize_opts(opts)
    s = ensure_resolved(sensor)
    ctx = SensorCtx(s)
    rc = make_caster(model, s, o["doors"], o["thin_db"])
    return ctx.quality(float(point[0]), float(point[1]), float(point[2]), rc)


def glass_score(model: Model, sensor: dict) -> float:
    """How strongly the sensor faces exterior windows (0 = not at all).  Ceiling mounts score 0."""
    s = ensure_resolved(sensor)
    if s["mount"] == "ceiling" or not model.glass:
        return 0.0
    sx, sz = float(s["x"]), float(s["z"])
    reach = float(s["reach"])
    phi = float(s.get("phi", 0.0))
    limit = max(10.0, float(s["fov_h"]) / 2 - 10.0)
    pen = 0.0
    for g in model.glass:
        a, b, n = g["a"], g["b"], g["n"]
        for k in range(11):
            px = a[0] + (b[0] - a[0]) * k / 10
            pz = a[1] + (b[1] - a[1]) * k / 10
            dx, dz = px - sx, pz - sz
            d = math.hypot(dx, dz)
            if d < 0.3 or d > reach:
                continue
            if angle_diff(math.degrees(math.atan2(dz, dx)), phi) > limit:
                continue
            pen += abs(dx * n[0] + dz * n[1]) / d * (1 - d / reach) / 11
    return pen
