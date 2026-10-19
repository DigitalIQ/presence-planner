// Pure 2D geometry helpers for the floor plan editor. No DOM access.
// Plan coordinates: x to the right, z down the plan, metres. Points are [x, z].

export const EPS = 1e-9;

/** Round to millimetres so stored coordinates stay readable. */
export function roundMm(v) {
  const r = Math.round(v * 1000) / 1000;
  return Object.is(r, -0) ? 0 : r;
}

export function roundPoint(p) {
  return [roundMm(p[0]), roundMm(p[1])];
}

export function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

export function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

export function scale(a, k) {
  return [a[0] * k, a[1] * k];
}

export function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/** z-component of the 2D cross product; > 0 means b is clockwise from a on screen (z down). */
export function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

export function len(a) {
  return Math.hypot(a[0], a[1]);
}

export function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

export function normalize(a) {
  const l = len(a);
  return l < EPS ? [0, 0] : [a[0] / l, a[1] / l];
}

export function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function deg2rad(d) {
  return (d * Math.PI) / 180;
}

export function rad2deg(r) {
  return (r * 180) / Math.PI;
}

/** Normalise an angle in degrees to 0 … <360. */
export function normDeg(d) {
  const r = ((d % 360) + 360) % 360;
  return roundMm(r) === 360 ? 0 : roundMm(r);
}

/** Rotate a vector clockwise on screen (z down) by `deg` degrees. */
export function rotate(v, deg) {
  const r = deg2rad(deg);
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c];
}

/** Shoelace area, signed. Positive for clockwise-on-screen order with z down (e.g. [0,0],[1,0],[1,1],[0,1]). */
export function signedArea(points) {
  let a = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[(i + 1) % n];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

export function polygonArea(points) {
  return Math.abs(signedArea(points));
}

/** Area centroid; falls back to the vertex mean for degenerate polygons. */
export function polygonCentroid(points) {
  const n = points.length;
  if (!n) return [0, 0];
  const a = signedArea(points);
  if (Math.abs(a) < EPS) {
    let sx = 0;
    let sz = 0;
    for (const p of points) {
      sx += p[0];
      sz += p[1];
    }
    return [sx / n, sz / n];
  }
  let cx = 0;
  let cz = 0;
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const q = points[(i + 1) % n];
    const f = p[0] * q[1] - q[0] * p[1];
    cx += (p[0] + q[0]) * f;
    cz += (p[1] + q[1]) * f;
  }
  return [cx / (6 * a), cz / (6 * a)];
}

/** Even-odd point in polygon test. Points on the boundary may go either way. */
export function pointInPolygon(p, points) {
  let inside = false;
  const n = points.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const [xi, zi] = points[i];
    const [xj, zj] = points[j];
    if (zi > p[1] !== zj > p[1] && p[0] < ((xj - xi) * (p[1] - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

/** Edge `i` of a polygon: point i to point i+1. */
export function edgeOf(points, i) {
  const n = points.length;
  return [points[((i % n) + n) % n], points[(((i + 1) % n) + n) % n]];
}

export function edgeLength(points, i) {
  const [a, b] = edgeOf(points, i);
  return dist(a, b);
}

/**
 * Project p onto segment ab. Returns { t (0…1 clamped), point, dist, along (metres from a), length }.
 */
export function projectOnSegment(p, a, b) {
  const d = sub(b, a);
  const l2 = dot(d, d);
  const length = Math.sqrt(l2);
  let t = l2 < EPS ? 0 : dot(sub(p, a), d) / l2;
  t = clamp(t, 0, 1);
  const point = lerp(a, b, t);
  return { t, point, dist: dist(p, point), along: t * length, length };
}

/** Distance from p to the infinite line through a, b. */
export function distToLine(p, a, b) {
  const d = sub(b, a);
  const l = len(d);
  if (l < EPS) return dist(p, a);
  return Math.abs(cross(d, sub(p, a))) / l;
}

/** Unit normal of edge a→b pointing into the polygon, given the polygon's signed area. */
export function inwardNormal(a, b, area) {
  const d = normalize(sub(b, a));
  // for positive signed area (clockwise on screen) the interior is on (-dz, dx)
  return area >= 0 ? [-d[1], d[0]] : [d[1], -d[0]];
}

/** True if the polygon vertex i is convex (turns towards the interior). */
export function isConvexVertex(points, i) {
  const n = points.length;
  const prev = points[(i - 1 + n) % n];
  const cur = points[i];
  const next = points[(i + 1) % n];
  const c = cross(sub(cur, prev), sub(next, cur));
  const area = signedArea(points);
  return area >= 0 ? c > EPS : c < -EPS;
}

/** Remove consecutive duplicate points (and a closing duplicate of the first point). */
export function cleanPolygon(points, tol = 1e-4) {
  const out = [];
  for (const p of points) {
    if (!out.length || dist(out[out.length - 1], p) > tol) out.push(p);
  }
  while (out.length > 1 && dist(out[0], out[out.length - 1]) <= tol) out.pop();
  return out;
}

/** Snap a value to a grid step. */
export function snapValue(v, step) {
  if (!step) return v;
  return roundMm(Math.round(v / step) * step);
}

export function snapToGrid(p, step) {
  return [snapValue(p[0], step), snapValue(p[1], step)];
}

/**
 * Snap a point. Priority: existing vertices, then existing edges (closest point on the edge,
 * the position along the edge also kept on the grid when that stays on the edge), then the grid.
 * options: { grid: 0.05, tol: metres, vertices: [[x,z]], segments: [[a,b]] }
 * Returns { point, kind: "vertex" | "edge" | "grid" | "none", ref }.
 */
export function snapPoint(p, options = {}) {
  const { grid = 0.05, tol = 0.15, vertices = [], segments = [] } = options;
  let best = null;
  for (let i = 0; i < vertices.length; i++) {
    const d = dist(p, vertices[i]);
    if (d <= tol && (!best || d < best.d)) best = { d, point: vertices[i], ref: i };
  }
  if (best) return { point: roundPoint(best.point), kind: "vertex", ref: best.ref };
  for (let i = 0; i < segments.length; i++) {
    const [a, b] = segments[i];
    const pr = projectOnSegment(p, a, b);
    if (pr.dist <= tol && (!best || pr.dist < best.d)) best = { d: pr.dist, pr, a, b, ref: i };
  }
  if (best) {
    const { pr, a, b } = best;
    let point = pr.point;
    if (grid && pr.length > EPS) {
      // keep the point on the edge but at a grid distance from the edge start
      const along = clamp(Math.round(pr.along / grid) * grid, 0, pr.length);
      point = lerp(a, b, along / pr.length);
    }
    return { point: roundPoint(point), kind: "edge", ref: best.ref };
  }
  if (grid) return { point: snapToGrid(p, grid), kind: "grid", ref: null };
  return { point: roundPoint(p), kind: "none", ref: null };
}

/**
 * Snap the translation of a whole polygon. Tries to land any moved vertex on one of
 * `targets` (within tol); otherwise keeps the first vertex on the grid.
 * Returns [dx, dz].
 */
export function snapTranslation(points, delta, options = {}) {
  const { grid = 0.05, tol = 0.15, targets = [] } = options;
  let best = null;
  for (const p of points) {
    const q = add(p, delta);
    for (const t of targets) {
      const d = dist(q, t);
      if (d <= tol && (!best || d < best.d)) best = { d, corr: sub(t, q) };
    }
  }
  if (best) return [roundMm(delta[0] + best.corr[0]), roundMm(delta[1] + best.corr[1])];
  if (!points.length || !grid) return [roundMm(delta[0]), roundMm(delta[1])];
  const first = add(points[0], delta);
  const snapped = snapToGrid(first, grid);
  return [roundMm(snapped[0] - points[0][0]), roundMm(snapped[1] - points[0][1])];
}

/** Footprint corners of a furniture item (centre x, z; w along the front, d depth; rotation clockwise). */
export function furnitureCorners(f) {
  const hw = (f.w || 0) / 2;
  const hd = (f.d || 0) / 2;
  const r = deg2rad(f.rotation || 0);
  const c = Math.cos(r);
  const s = Math.sin(r);
  return [
    [-hw, -hd],
    [hw, -hd],
    [hw, hd],
    [-hw, hd],
  ].map(([a, b]) => [f.x + a * c - b * s, f.z + a * s + b * c]);
}

/** Rectangle polygon of a straight wall from a to b with the given thickness, centred on the line. */
export function segmentBand(a, b, thickness, n0 = -thickness / 2, n1 = thickness / 2, ext0 = 0, ext1 = 0) {
  const d = normalize(sub(b, a));
  const n = [-d[1], d[0]];
  const a2 = sub(a, scale(d, ext0));
  const b2 = add(b, scale(d, ext1));
  return [add(a2, scale(n, n0)), add(b2, scale(n, n0)), add(b2, scale(n, n1)), add(a2, scale(n, n1))];
}

/** Direction angle (degrees, clockwise from +x) of the vector from c to p, used for rotation handles. */
export function handleRotation(c, p) {
  // the rotation handle sits at local (0, -d) i.e. "above" an unrotated item
  const v = sub(p, c);
  return normDeg(rad2deg(Math.atan2(v[0], -v[1])));
}

/** Bounds of a point list: { x0, x1, z0, z1 } or null. */
export function boundsOf(points) {
  if (!points.length) return null;
  let x0 = Infinity;
  let x1 = -Infinity;
  let z0 = Infinity;
  let z1 = -Infinity;
  for (const [x, z] of points) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (z < z0) z0 = z;
    if (z > z1) z1 = z;
  }
  return { x0, x1, z0, z1 };
}

/**
 * Background calibration: the user clicked p1 and p2 on the image and says they are `length` metres apart.
 * Returns the new background with width scaled so that distance becomes `length`, p1 staying on the same
 * image pixel. bg: { x, z, width, rotation } with the image's top-left corner at (x, z), rotated about it.
 */
export function backgroundScaleFromPoints(bg, p1, p2, length) {
  const measured = dist(p1, p2);
  if (!(measured > EPS) || !(length > 0)) return bg;
  const k = length / measured;
  const origin = [bg.x || 0, bg.z || 0];
  const rot = bg.rotation || 0;
  // p1 in image-local metres, before and after scaling
  const local = rotate(sub(p1, origin), -rot);
  const scaled = scale(local, k);
  const newOrigin = sub(p1, rotate(scaled, rot));
  return { ...bg, x: roundMm(newOrigin[0]), z: roundMm(newOrigin[1]), width: roundMm((bg.width || 0) * k) };
}

/** Corners of a background image: width w (m), aspect = height / width. */
export function backgroundCorners(bg, aspect) {
  const w = bg.width || 0;
  const h = w * (aspect || 1);
  const o = [bg.x || 0, bg.z || 0];
  return [
    [0, 0],
    [w, 0],
    [w, h],
    [0, h],
  ].map((p) => add(o, rotate(p, bg.rotation || 0)));
}
