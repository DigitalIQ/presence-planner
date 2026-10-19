// Pure 2D helpers for the planner map: point-in-polygon, snapping, viewport, hit testing, cones.
// Plan coordinates follow ARCHITECTURE.md: x right, z down, phi 0 = +x, 90 = +z (clockwise on screen).

const RAD = Math.PI / 180;

export function pointInPoly(p, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [x1, z1] = poly[i];
    const [x2, z2] = poly[j];
    if ((z1 > p[1]) !== (z2 > p[1]) && p[0] < ((x2 - x1) * (p[1] - z1)) / (z2 - z1) + x1) c = !c;
  }
  return c;
}

/** Room id containing (x, z), or null. */
export function roomAt(model, x, z) {
  const r = ((model && model.rooms) || []).find((room) => pointInPoly([x, z], room.points));
  return r ? r.id : null;
}

/** Distance from p to segment a–b and the parameter t (0…1). */
export function segDistance(p, a, b) {
  const bx = b[0] - a[0];
  const bz = b[1] - a[1];
  const L2 = bx * bx + bz * bz;
  if (L2 < 1e-12) return { d: Math.hypot(p[0] - a[0], p[1] - a[1]), t: 0 };
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * bx + (p[1] - a[1]) * bz) / L2));
  return { d: Math.hypot(p[0] - a[0] - bx * t, p[1] - a[1] - bz * t), t };
}

/**
 * Snaps p to the nearest wall face (model.faces: {a, b, n, room}, n = inward normal).
 * The snapped point sits `inset` in front of the face and at least `endGap` from the face ends.
 * Returns { x, z, d, along: [from start, to end] in metres, phi (face normal direction), room } or null.
 */
export function snapToFaces(faces, p, { maxDist = 0.4, inset = 0.03, endGap = 0.04 } = {}) {
  let best = null;
  for (const f of faces || []) {
    const bx = f.b[0] - f.a[0];
    const bz = f.b[1] - f.a[1];
    const L = Math.hypot(bx, bz);
    if (L < 1e-6) continue;
    let t = ((p[0] - f.a[0]) * bx + (p[1] - f.a[1]) * bz) / (L * L);
    const g = Math.min(0.5, endGap / L);
    t = Math.max(g, Math.min(1 - g, t));
    const px = f.a[0] + bx * t;
    const pz = f.a[1] + bz * t;
    const d = Math.hypot(p[0] - px, p[1] - pz);
    if (!best || d < best.d) {
      const n = f.n || [0, 0];
      best = { d, x: px + n[0] * inset, z: pz + n[1] * inset, along: [t * L, (1 - t) * L], phi: normPhi(Math.atan2(n[1], n[0]) / RAD), room: f.room };
    }
  }
  return best && best.d <= maxDist ? best : null;
}

export const normPhi = (deg) => ((deg % 360) + 360) % 360;

/** Direction in degrees from (x0, z0) to (x1, z1), optionally rounded to `step`. */
export function angleTo(x0, z0, x1, z1, step = 0) {
  let a = Math.atan2(z1 - z0, x1 - x0) / RAD;
  if (step) a = Math.round(a / step) * step;
  return normPhi(Math.round(a * 10) / 10);
}

/** Fits plan bounds into a w × h pixel box with a margin. */
export function fitViewport(bounds, w, h, margin = 8) {
  const bw = Math.max(0.1, bounds.x1 - bounds.x0);
  const bh = Math.max(0.1, bounds.z1 - bounds.z0);
  const scale = Math.max(1, Math.min((w - 2 * margin) / bw, (h - 2 * margin) / bh));
  const ox = (w - bw * scale) / 2 - bounds.x0 * scale;
  const oy = (h - bh * scale) / 2 - bounds.z0 * scale;
  return {
    scale,
    ox,
    oy,
    sx: (x) => x * scale + ox,
    sz: (z) => z * scale + oy,
    wx: (px) => (px - ox) / scale,
    wz: (py) => (py - oy) / scale,
  };
}

export const HANDLE_M = 0.75;

/** Screen position of a sensor's rotation handle. */
export function handlePos(vp, s) {
  const a = s.phi * RAD;
  const len = Math.max(28, HANDLE_M * vp.scale);
  return [vp.sx(s.x) + Math.cos(a) * len, vp.sz(s.z) + Math.sin(a) * len];
}

/** Hit test at pixel (px, py): rotation handle first, then the sensor dot. */
export function hitTest(vp, sensors, px, py, { handleR = 12, dotR = 15 } = {}) {
  const list = [...(sensors || [])].reverse();
  for (const s of list) {
    if (s.mount === "ceiling") continue;
    const [hx, hy] = handlePos(vp, s);
    if (Math.hypot(px - hx, py - hy) <= handleR) return { entity_id: s.entity_id, mode: "rotate" };
  }
  for (const s of list) {
    if (Math.hypot(px - vp.sx(s.x), py - vp.sz(s.z)) <= dotR) return { entity_id: s.entity_id, mode: "move" };
  }
  return null;
}

/**
 * Plan outline of the field of view, as a polygon in plan metres.
 * Wall/corner: a wedge of `fov_h` with the horizontal reach at the floor tilt.
 * Ceiling: the circle where the cone meets the floor, limited by reach.
 */
export function conePolygon(s, segments = 24) {
  const reach = s.reach || 0;
  if (s.mount === "ceiling") {
    const half = Math.min(89, (s.fov_h || 120) / 2) * RAD;
    const r = Math.min(reach, Math.max(0.2, (s.height || 2.5) * Math.tan(half)));
    const pts = [];
    for (let i = 0; i < segments * 2; i++) {
      const a = (i / (segments * 2)) * 2 * Math.PI;
      pts.push([s.x + Math.cos(a) * r, s.z + Math.sin(a) * r]);
    }
    return pts;
  }
  const r = reach * Math.cos(Math.min(80, s.tilt || 0) * RAD);
  const half = Math.min(180, (s.fov_h || 120) / 2);
  const pts = half >= 180 ? [] : [[s.x, s.z]];
  for (let i = 0; i <= segments; i++) {
    const a = (s.phi - half + (2 * half * i) / segments) * RAD;
    pts.push([s.x + Math.cos(a) * r, s.z + Math.sin(a) * r]);
  }
  return pts;
}

/** Label point per room: the sample inside the polygon farthest from its edges. */
export function labelPoint(points, step = 0.2) {
  const xs = points.map((p) => p[0]);
  const zs = points.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const z0 = Math.min(...zs);
  const z1 = Math.max(...zs);
  const s = Math.max(step, Math.min(x1 - x0, z1 - z0) / 40);
  let best = null;
  for (let x = x0 + s / 2; x < x1; x += s) {
    for (let z = z0 + s / 2; z < z1; z += s) {
      if (!pointInPoly([x, z], points)) continue;
      let m = Infinity;
      for (let i = 0; i < points.length; i++) m = Math.min(m, segDistance([x, z], points[i], points[(i + 1) % points.length]).d);
      if (!best || m > best.m) best = { x, z, m };
    }
  }
  if (best) return best;
  return { x: xs.reduce((a, b) => a + b, 0) / xs.length, z: zs.reduce((a, b) => a + b, 0) / zs.length, m: 0 };
}

/** Bounds of the plan if the model has none. */
export function boundsOf(model) {
  if (model && model.bounds) return model.bounds;
  const pts = ((model && model.rooms) || []).flatMap((r) => r.points);
  if (!pts.length) return { x0: 0, x1: 1, z0: 0, z1: 1 };
  const xs = pts.map((p) => p[0]);
  const zs = pts.map((p) => p[1]);
  return { x0: Math.min(...xs) - 0.4, x1: Math.max(...xs) + 0.4, z0: Math.min(...zs) - 0.4, z1: Math.max(...zs) + 0.4 };
}

/** A rectangle around segment a–b, `half` metres to each side (door / window cut-outs). */
export function segmentRect(a, b, half) {
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const nx = (-(b[1] - a[1]) / L) * half;
  const nz = ((b[0] - a[0]) / L) * half;
  return [[a[0] + nx, a[1] + nz], [b[0] + nx, b[1] + nz], [b[0] - nx, b[1] - nz], [a[0] - nx, a[1] - nz]];
}

/** Moves a sensor only if the target stays inside a room (sensors outside the plan are not useful). */
export function allowedPosition(model, x, z) {
  return roomAt(model, x, z) !== null;
}
