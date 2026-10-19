"""Plain 2D geometry helpers for the presence planner core (stdlib only).

Plan coordinates are metres, ``x`` to the right, ``z`` down the plan.  Points
are ``[x, z]`` lists or tuples.  Nothing in here knows about rooms or sensors.
"""

from __future__ import annotations

import math

# Tolerance (metres) used when snapping vertices to edges and matching walls.
EPS = 0.005


def dist(a, b) -> float:
    return math.hypot(b[0] - a[0], b[1] - a[1])


def orient(u, v, w) -> float:
    """Twice the signed area of the triangle u, v, w."""
    return (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0])


def point_in_polygon(px: float, pz: float, poly) -> bool:
    """Even-odd point in polygon test."""
    inside = False
    j = len(poly) - 1
    for i in range(len(poly)):
        x1, z1 = poly[i]
        x2, z2 = poly[j]
        if (z1 > pz) != (z2 > pz) and px < (x2 - x1) * (pz - z1) / (z2 - z1) + x1:
            inside = not inside
        j = i
    return inside


def polygon_area(poly) -> float:
    """Signed area (positive when the vertices run counter-clockwise in x/z maths axes)."""
    s = 0.0
    j = len(poly) - 1
    for i in range(len(poly)):
        s += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1]
        j = i
    return s / 2.0


def bbox(poly):
    xs = [p[0] for p in poly]
    zs = [p[1] for p in poly]
    return (min(xs), max(xs), min(zs), max(zs))


def segments_cross(p, q, a, b) -> bool:
    """Strict proper crossing of segment p-q with segment a-b."""
    d1 = orient(a, b, p)
    d2 = orient(a, b, q)
    d3 = orient(p, q, a)
    d4 = orient(p, q, b)
    return d1 * d2 < 0 and d3 * d4 < 0


def dist_point_segment(px: float, pz: float, a, b) -> float:
    dx = b[0] - a[0]
    dz = b[1] - a[1]
    l2 = dx * dx + dz * dz
    if l2 < 1e-12:
        return math.hypot(px - a[0], pz - a[1])
    t = max(0.0, min(1.0, ((px - a[0]) * dx + (pz - a[1]) * dz) / l2))
    return math.hypot(px - (a[0] + t * dx), pz - (a[1] + t * dz))


def near_polygon(px: float, pz: float, poly, margin: float) -> bool:
    """True when the point is inside the polygon or closer than ``margin`` to its outline."""
    if point_in_polygon(px, pz, poly):
        return True
    n = len(poly)
    for i in range(n):
        if dist_point_segment(px, pz, poly[i], poly[(i + 1) % n]) < margin:
            return True
    return False


def rect_poly(x: float, z: float, w: float, d: float, rot_deg: float, grow: float = 0.0):
    """Furniture footprint.  Local corner (a, b) maps to (x + a*cos r - b*sin r, z + a*sin r + b*cos r)."""
    t = math.radians(rot_deg)
    c = math.cos(t)
    s = math.sin(t)
    hw = w / 2 + grow
    hd = d / 2 + grow
    return [[x + a * c - b * s, z + a * s + b * c] for a, b in ((-hw, -hd), (hw, -hd), (hw, hd), (-hw, hd))]


def seg_rect(a, b, t: float):
    """Rectangle of a wall running from a to b with thickness t, centred on the line."""
    length = dist(a, b) or 1.0
    nx = -(b[1] - a[1]) / length * t / 2
    nz = (b[0] - a[0]) / length * t / 2
    return [[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]]


def halfplanes(poly):
    """Half-plane form of a convex polygon: list of ``(ax, az, ex, ez)`` edges.

    A point ``p`` is inside when ``ex*(pz-az) - ez*(px-ax) >= 0`` for every edge.  The edges are
    reoriented so that this holds for the interior whatever the vertex order is.
    """
    flip = polygon_area(poly) < 0
    pts = list(reversed(poly)) if flip else list(poly)
    out = []
    n = len(pts)
    for i in range(n):
        a = pts[i]
        b = pts[(i + 1) % n]
        out.append((a[0], a[1], b[0] - a[0], b[1] - a[1]))
    return out


def clip_segment(hp, sx: float, sz: float, px: float, pz: float):
    """Clip the segment s->p against a convex polygon given as half-planes.

    Returns ``(t_in, t_out, start_inside)`` with ``0 <= t_in <= t_out <= 1`` or ``None`` when the
    segment misses the polygon.  ``start_inside`` is true when ``s`` lies in the polygon.
    """
    dx = px - sx
    dz = pz - sz
    lo = 0.0
    hi = 1.0
    start_inside = True
    for ax, az, ex, ez in hp:
        g0 = ex * (sz - az) - ez * (sx - ax)
        g1 = ex * dz - ez * dx
        if g0 < 0:
            start_inside = False
        if g1 == 0.0:
            if g0 < 0:
                return None
            continue
        t = -g0 / g1
        if g1 > 0:
            lo = max(lo, t)
        else:
            hi = min(hi, t)
        if lo > hi:
            return None
    return lo, hi, start_inside


def snap_key(v: float) -> int:
    """Quantise a coordinate to a 5 mm grid for matching wall pieces of different rooms."""
    return math.floor(v * 200 + 0.5)


def normalize_angle(deg: float) -> float:
    return deg % 360.0


def angle_diff(a: float, b: float) -> float:
    return abs(((a - b + 540.0) % 360.0) - 180.0)
