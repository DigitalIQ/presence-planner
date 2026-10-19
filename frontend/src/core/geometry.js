// Plain 2D geometry helpers. No DOM, no dependencies. Plan view: x to the right, z down.

export const DEG = Math.PI / 180;
export const RAD = 180 / Math.PI;

export const dist = (a, b) => Math.hypot(b[0] - a[0], b[1] - a[1]);
export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
export const round4 = (v) => Math.round(v * 1e4) / 1e4;
export const normDeg = (a) => ((a % 360) + 360) % 360;

/** Even-odd point in polygon test, polygon is a list of [x, z]. */
export function insideXZ(x, z, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const x1 = poly[i][0], z1 = poly[i][1], x2 = poly[j][0], z2 = poly[j][1];
    if ((z1 > z) !== (z2 > z) && x < ((x2 - x1) * (z - z1)) / (z2 - z1) + x1) c = !c;
  }
  return c;
}
export const inside = (p, poly) => insideXZ(p[0], p[1], poly);

export const orient = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);

/** True if segments p-q and a-b cross properly (strictly inside both). */
export function cross(p, q, a, b) {
  const d1 = orient(a, b, p), d2 = orient(a, b, q), d3 = orient(p, q, a), d4 = orient(p, q, b);
  return d1 * d2 < 0 && d3 * d4 < 0;
}

/**
 * Crossing test used by the ray code, identical to the Python RayCaster: sensor and point must lie strictly
 * on different sides of the wall line, and the wall ends must lie on different sides of the ray (half-open),
 * so a ray through a wall vertex counts once.
 */
export function crossXZ(px, pz, qx, qz, ax, az, bx, bz) {
  const ex = bx - ax, ez = bz - az;
  if ((ex * (pz - az) - ez * (px - ax)) * (ex * (qz - az) - ez * (qx - ax)) >= 0) return false;
  const rx = qx - px, rz = qz - pz;
  return (rx * (az - pz) - rz * (ax - px) >= 0) !== (rx * (bz - pz) - rz * (bx - px) >= 0);
}

/** Rectangle polygon for a furniture item; rotation clockwise in degrees, `grow` enlarges every side. */
export function rectPoly(x, z, w, d, rotDeg, grow = 0) {
  const t = rotDeg * DEG, c = Math.cos(t), s = Math.sin(t), hw = w / 2 + grow, hd = d / 2 + grow;
  return [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]].map(([a, b]) => [x + a * c - b * s, z + a * s + b * c]);
}

/** Rectangle around the segment a-b with total thickness t. */
export function segRect(a, b, t) {
  const L = dist(a, b) || 1, nx = (-(b[1] - a[1]) / L) * (t / 2), nz = ((b[0] - a[0]) / L) * (t / 2);
  return [[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]];
}

export function polyArea(poly) {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    s += p[0] * q[1] - q[0] * p[1];
  }
  return s / 2;
}

/** Minimal distance from a point to a segment. */
export function distToSeg(px, pz, a, b) {
  const bx = b[0] - a[0], bz = b[1] - a[1], L2 = bx * bx + bz * bz;
  let t = L2 > 0 ? ((px - a[0]) * bx + (pz - a[1]) * bz) / L2 : 0;
  t = clamp(t, 0, 1);
  return Math.hypot(px - (a[0] + bx * t), pz - (a[1] + bz * t));
}

/**
 * Prepared convex polygon for segment clipping (furniture and free walls are rectangles).
 * Returns edge data for Cyrus-Beck clipping.
 */
export function prepConvex(poly) {
  const s = polyArea(poly) >= 0 ? 1 : -1;
  const n = poly.length, ex = new Float64Array(n), ez = new Float64Array(n), px = new Float64Array(n), pz = new Float64Array(n);
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (let i = 0; i < n; i++) {
    const p = poly[i], q = poly[(i + 1) % n];
    ex[i] = q[0] - p[0]; ez[i] = q[1] - p[1]; px[i] = p[0]; pz[i] = p[1];
    x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]);
  }
  return { n, s, ex, ez, px, pz, x0, x1, z0, z1 };
}

/**
 * Clip the segment (ax,az)-(bx,bz) against a prepared convex polygon.
 * Writes [tEnter, tExit] into `out` and returns true when the overlap has a real length.
 * `out[2]` is 1 when the segment starts inside the polygon.
 */
export function clipConvex(P, ax, az, bx, bz, out) {
  if (Math.max(ax, bx) < P.x0 || Math.min(ax, bx) > P.x1 || Math.max(az, bz) < P.z0 || Math.min(az, bz) > P.z1) return false;
  const dx = bx - ax, dz = bz - az;
  let t0 = 0, t1 = 1, startInside = 1;
  for (let i = 0; i < P.n; i++) {
    const f0 = P.s * (P.ex[i] * (az - P.pz[i]) - P.ez[i] * (ax - P.px[i]));
    const f1 = P.s * (P.ex[i] * dz - P.ez[i] * dx);
    if (f0 < 0) startInside = 0;
    if (f1 === 0) {
      if (f0 < 0) return false;
    } else {
      const t = -f0 / f1;
      if (f1 > 0) { if (t > t0) t0 = t; } else if (t < t1) t1 = t;
      if (t0 > t1) return false;
    }
  }
  out[0] = t0; out[1] = t1; out[2] = startInside;
  return true;
}
