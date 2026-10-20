// Pure geometry helpers for <pp-view3d>. No DOM, no three.js: everything here
// returns plain arrays so it can be unit-tested with node:test.
//
// Coordinates: plan x -> scene x, plan z -> scene z, height y -> scene y (up).
// Angles in degrees. phi 0 = +x, 90 = +z, tilt 0 = level, 90 = straight down.

export const DEG = Math.PI / 180;

/** Plan point (+ optional height) to scene coordinates. Identity mapping, kept explicit. */
export function planToScene(x, z, y = 0) {
  return [x, y, z];
}

// ---------------------------------------------------------------- vectors

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

// ---------------------------------------------------------------- sensors

/** Sensor position in scene coordinates: (x, height, z). */
export function sensorPosition(s) {
  return planToScene(s.x, s.z, s.height ?? 1.9);
}

/**
 * Orthonormal basis of a wall/corner sensor, same definition as the core detect():
 * forward f = (cos phi cos tau, -sin tau, sin phi cos tau), right r = normalize(f x up),
 * up u = r x f. For r the closed form (-sin phi, 0, cos phi) is used, which also
 * stays defined when the sensor looks straight down.
 */
export function sensorBasis(s) {
  const phi = (s.phi ?? 0) * DEG;
  const tau = (s.tilt ?? 0) * DEG;
  const f = [Math.cos(phi) * Math.cos(tau), -Math.sin(tau), Math.sin(phi) * Math.cos(tau)];
  const r = [-Math.sin(phi), 0, Math.cos(phi)];
  const u = cross(r, f);
  return { f, r, u };
}

/**
 * Basis for the sensor box mesh: columns (right, up, -forward) form a right-handed frame,
 * so the box's local -z axis points where the sensor looks. Ceiling sensors look down.
 */
export function sensorMeshBasis(s) {
  const b = sensorBasis(s.mount === 'ceiling' ? { ...s, tilt: 90 } : s);
  return { x: b.r, y: b.u, z: mul(b.f, -1) };
}

/** Direction for yaw/pitch (degrees) in the sensor basis, the inverse of the core's yaw/pitch. */
export function directionAt(basis, yawDeg, pitchDeg) {
  const Y = yawDeg * DEG;
  const P = pitchDeg * DEG;
  const cp = Math.cos(P);
  return norm(
    add(add(mul(basis.f, cp * Math.cos(Y)), mul(basis.r, cp * Math.sin(Y))), mul(basis.u, Math.sin(P))),
  );
}

/** Distance along unit direction d from apex before leaving the slab yMin..yMax (capped by reach). */
export function clipDistance(apex, d, reach, yMin = 0, yMax = Infinity) {
  let t = reach;
  if (d[1] < -1e-9 && Number.isFinite(yMin)) t = Math.min(t, Math.max(0, (apex[1] - yMin) / -d[1]));
  if (d[1] > 1e-9 && Number.isFinite(yMax)) t = Math.min(t, Math.max(0, (yMax - apex[1]) / d[1]));
  return t;
}

/**
 * Field-of-view volume of a sensor.
 *  wall/corner: pyramid, corners at yaw +-fov_h/2 and pitch +-fov_v/2, distance `reach`
 *  ceiling: cone around straight down, half angle ceilingFov/2 (fallback max(fov_h, fov_v)/2)
 * Rays are clipped to the slab yMin..yMax (floor and ceiling) when given.
 * Returns { apex, corners, positions (flat xyz), indices, edges (flat xyz pairs) }.
 */
export function frustumGeometry(sensor, opts = {}) {
  const yMin = opts.yMin ?? 0;
  const yMax = opts.yMax ?? Infinity;
  const segments = opts.segments ?? 28;
  const apex = sensorPosition(sensor);
  const reach = sensor.reach > 0 ? sensor.reach : 5;
  const fh = sensor.fov_h > 0 ? sensor.fov_h : 90;
  const fv = sensor.fov_v > 0 ? sensor.fov_v : 90;

  if (sensor.mount === 'ceiling') {
    const full = sensor.ceiling_fov > 0 ? sensor.ceiling_fov : Math.max(fh, fv);
    const a = Math.min(full / 2, 89) * DEG;
    const verts = [apex];
    for (let i = 0; i < segments; i++) {
      const th = (i / segments) * 2 * Math.PI;
      const d = [Math.sin(a) * Math.cos(th), -Math.cos(a), Math.sin(a) * Math.sin(th)];
      verts.push(add(apex, mul(d, clipDistance(apex, d, reach, yMin, yMax))));
    }
    const centreT = clipDistance(apex, [0, -1, 0], reach, yMin, yMax);
    verts.push(add(apex, [0, -centreT, 0]));
    const cap = verts.length - 1;
    const indices = [];
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      indices.push(0, 1 + j, 1 + i); // cone side
      indices.push(cap, 1 + i, 1 + j); // bottom cap
    }
    const edges = [];
    const spokes = 4;
    for (let k = 0; k < spokes; k++) {
      const v = verts[1 + Math.round((k / spokes) * segments) % segments];
      edges.push(...apex, ...v);
    }
    for (let i = 0; i < segments; i++) {
      edges.push(...verts[1 + i], ...verts[1 + ((i + 1) % segments)]);
    }
    return { apex, corners: verts.slice(1, 1 + segments), positions: verts.flat(), indices, edges };
  }

  const basis = sensorBasis(sensor);
  const hy = Math.min(fh / 2, 89);
  const hp = Math.min(fv / 2, 89);
  const signs = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const corners = signs.map(([sy, sp]) => {
    const d = directionAt(basis, sy * hy, sp * hp);
    return add(apex, mul(d, clipDistance(apex, d, reach, yMin, yMax)));
  });
  const verts = [apex, ...corners];
  const indices = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1, 1, 3, 2, 1, 4, 3];
  const edges = [];
  for (let i = 0; i < 4; i++) {
    edges.push(...apex, ...corners[i]);
    edges.push(...corners[i], ...corners[(i + 1) % 4]);
  }
  return { apex, corners, positions: verts.flat(), indices, edges };
}

// ---------------------------------------------------------------- polygons

/** Drop repeated points (including a closing point equal to the first). */
export function cleanPoly(poly) {
  const out = [];
  for (const p of poly || []) {
    const q = out[out.length - 1];
    if (!q || Math.abs(q[0] - p[0]) > 1e-9 || Math.abs(q[1] - p[1]) > 1e-9) out.push([p[0], p[1]]);
  }
  while (out.length > 1 && Math.abs(out[0][0] - out[out.length - 1][0]) < 1e-9 && Math.abs(out[0][1] - out[out.length - 1][1]) < 1e-9) out.pop();
  return out;
}

/** Shoelace area on (x, z); positive = counter-clockwise in a x-right, z-up drawing. */
export function signedArea(poly) {
  let s = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, z1] = poly[i];
    const [x2, z2] = poly[(i + 1) % poly.length];
    s += x1 * z2 - x2 * z1;
  }
  return s / 2;
}

function pointInTriangle(p, a, b, c) {
  const d1 = (p[0] - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (p[1] - b[1]);
  const d2 = (p[0] - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (p[1] - c[1]);
  const d3 = (p[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (p[1] - a[1]);
  const neg = d1 < -1e-12 || d2 < -1e-12 || d3 < -1e-12;
  const pos = d1 > 1e-12 || d2 > 1e-12 || d3 > 1e-12;
  return !(neg && pos);
}

/**
 * Ear clipping for a simple polygon (no holes). Returns triangles as index triples
 * into `poly`, each counter-clockwise (positive shoelace area). Degenerate input
 * falls back to a fan instead of looping forever.
 */
export function triangulate(poly) {
  const n = poly.length;
  if (n < 3) return [];
  let idx = [...Array(n).keys()];
  if (signedArea(poly) < 0) idx.reverse();
  const tris = [];
  let guard = 0;
  while (idx.length > 3 && guard++ < n * n) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const ia = idx[(i - 1 + idx.length) % idx.length];
      const ib = idx[i];
      const ic = idx[(i + 1) % idx.length];
      const a = poly[ia];
      const b = poly[ib];
      const c = poly[ic];
      const cr = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      if (cr <= 1e-12) continue;
      let ear = true;
      for (const k of idx) {
        if (k === ia || k === ib || k === ic) continue;
        const p = poly[k];
        if (pointInTriangle(p, a, b, c)) {
          ear = false;
          break;
        }
      }
      if (!ear) continue;
      tris.push([ia, ib, ic]);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) {
      // Collinear or self-touching input: drop the vertex with the smallest turn.
      tris.push([idx[0], idx[1], idx[2]]);
      idx.splice(1, 1);
    }
  }
  if (idx.length === 3) tris.push([idx[0], idx[1], idx[2]]);
  return tris.filter(([a, b, c]) => {
    const A = poly[a];
    const B = poly[b];
    const C = poly[c];
    return Math.abs((B[0] - A[0]) * (C[1] - A[1]) - (B[1] - A[1]) * (C[0] - A[0])) > 1e-12;
  });
}

/**
 * Prism from a plan polygon between heights y0 and y1 (y0 === y1 gives a flat cap
 * facing up). Triangles are wound so normals point outwards.
 * Returns { positions (flat xyz), indices }.
 */
export function prismData(polyIn, y0, y1) {
  const poly = cleanPoly(polyIn);
  if (poly.length < 3) return { positions: [], indices: [] };
  if (signedArea(poly) < 0) poly.reverse();
  const positions = [];
  const indices = [];
  const tris = triangulate(poly);
  const flat = Math.abs(y1 - y0) < 1e-9;

  // Top cap (normal +y): reverse the ccw order.
  const topBase = positions.length / 3;
  for (const p of poly) positions.push(p[0], y1, p[1]);
  for (const [a, b, c] of tris) indices.push(topBase + a, topBase + c, topBase + b);
  if (flat) return { positions, indices };

  const botBase = positions.length / 3;
  for (const p of poly) positions.push(p[0], y0, p[1]);
  for (const [a, b, c] of tris) indices.push(botBase + a, botBase + b, botBase + c);

  for (let i = 0; i < poly.length; i++) {
    const j = (i + 1) % poly.length;
    const base = positions.length / 3;
    positions.push(poly[i][0], y0, poly[i][1], poly[j][0], y0, poly[j][1], poly[j][0], y1, poly[j][1], poly[i][0], y1, poly[i][1]);
    indices.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
  return { positions, indices };
}

/** Concatenate several { positions, indices } parts into one. */
export function mergeData(parts) {
  const positions = [];
  const indices = [];
  for (const p of parts) {
    const off = positions.length / 3;
    for (const v of p.positions) positions.push(v);
    for (const i of p.indices) indices.push(i + off);
  }
  return { positions, indices };
}

/** Signed volume of a closed triangle mesh (positive when normals point outwards). */
export function meshVolume(data) {
  const P = data.positions;
  let v = 0;
  for (let i = 0; i < data.indices.length; i += 3) {
    const a = data.indices[i] * 3;
    const b = data.indices[i + 1] * 3;
    const c = data.indices[i + 2] * 3;
    const A = [P[a], P[a + 1], P[a + 2]];
    const B = [P[b], P[b + 1], P[b + 2]];
    const C = [P[c], P[c + 1], P[c + 2]];
    v += dot(A, cross(B, C)) / 6;
  }
  return v;
}

/** Sutherland-Hodgman clip of a plan polygon against dot(p, d) <= limit (keep='le') or >= limit. */
export function clipHalfPlane(poly, d, limit, keep) {
  const sign = keep === 'le' ? 1 : -1;
  const f = (p) => sign * (p[0] * d[0] + p[1] * d[1] - limit);
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    const fp = f(p);
    const fq = f(q);
    if (fp <= 0) out.push(p);
    if ((fp < 0 && fq > 0) || (fp > 0 && fq < 0)) {
      const t = fp / (fp - fq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return out;
}

export function pointNearPolygon(p, poly, tol = 0.02) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > p[1] !== zj > p[1] && p[0] < ((xj - xi) * (p[1] - zi)) / (zj - zi) + xi) inside = !inside;
  }
  if (inside) return true;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const ex = b[0] - a[0];
    const ez = b[1] - a[1];
    const l2 = ex * ex + ez * ez || 1;
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ex + (p[1] - a[1]) * ez) / l2));
    if (Math.hypot(p[0] - (a[0] + ex * t), p[1] - (a[1] + ez * t)) <= tol) return true;
  }
  return false;
}

/**
 * Cut openings (doors, windows) out of one wall band. Every opening is
 * { a, b, y0, y1 }: the span a..b is removed between heights y0 and y1, so a
 * door keeps a lintel above it and a window keeps the parapet below and the wall above.
 * Pieces are { poly, y0, y1 }. If the opening is not inside the band (the core already
 * cut it out), the band is returned unchanged. Assumes convex bands (one per wall segment).
 */
export function splitBandByOpenings(band, openings, wallH) {
  const bandPoly = cleanPoly(band);
  let pieces = [{ poly: bandPoly, y0: 0, y1: wallH }];
  for (const op of openings) {
    const mid = [(op.a[0] + op.b[0]) / 2, (op.a[1] + op.b[1]) / 2];
    if (!pointNearPolygon(mid, bandPoly, 0.03)) continue;
    const len = Math.hypot(op.b[0] - op.a[0], op.b[1] - op.a[1]);
    if (len < 1e-6) continue;
    const d = [(op.b[0] - op.a[0]) / len, (op.b[1] - op.a[1]) / len];
    const la = op.a[0] * d[0] + op.a[1] * d[1];
    const lb = op.b[0] * d[0] + op.b[1] * d[1];
    const next = [];
    const keep = (poly, y0, y1) => {
      if (poly.length >= 3 && Math.abs(signedArea(poly)) > 1e-6 && y1 - y0 > 1e-6) next.push({ poly, y0, y1 });
    };
    for (const p of pieces) {
      keep(clipHalfPlane(p.poly, d, la, 'le'), p.y0, p.y1);
      keep(clipHalfPlane(p.poly, d, lb, 'ge'), p.y0, p.y1);
      const slab = clipHalfPlane(clipHalfPlane(p.poly, d, la, 'ge'), d, lb, 'le');
      if (op.y0 > p.y0) keep(slab, p.y0, Math.min(op.y0, p.y1));
      if (op.y1 < p.y1) keep(slab, Math.max(op.y1, p.y0), p.y1);
    }
    pieces = next;
  }
  return pieces;
}

/** Flat quad (a..b) between y0 and y1 as { positions, indices }; thickness > 0 makes a thin slab. */
export function panelData(a, b, y0, y1) {
  return {
    positions: [a[0], y0, a[1], b[0], y0, b[1], b[0], y1, b[1], a[0], y1, a[1]],
    indices: [0, 1, 2, 0, 2, 3],
  };
}

/**
 * All static meshes of a model as merged position/index data per category.
 * Walls come from model.bands (openings cut as described above), free walls and
 * furniture from their footprints, windows as panes, doors as a floor threshold.
 */
/**
 * Static geometry of the floor. `opts.cutY` cuts walls, free walls, tall furniture and windows at that height
 * (a "dollhouse" cut, so the voxels inside stay visible).
 */
export function buildStaticData(model, opts = {}) {
  const fullH = model?.floor?.height > 0 ? model.floor.height : 2.6;
  const cut = opts.cutY > 0 ? Math.min(opts.cutY, fullH) : fullH;
  const H = fullH;
  const doors = model?.doors || [];
  const windows = model?.windows || [];
  const openings = [
    ...doors.map((d) => ({
      a: d.a,
      b: d.b,
      y0: d.sill ?? 0,
      y1: Math.min(H, (d.sill ?? 0) + (d.height ?? 2.0)),
    })),
    ...windows.map((w) => {
      const y0 = w.sill ?? 0.9;
      return { a: w.a, b: w.b, y0, y1: Math.min(H, y0 + (w.height ?? 1.1)) };
    }),
  ];

  // Floors are thin slabs below 0: a zero-height prism has its top and bottom face in one plane, and the two
  // fight for the same pixels (flicker while orbiting).
  const floors = [];
  for (const r of model?.rooms || []) floors.push(prismData(r.points, -0.05, 0));

  const walls = [];
  for (const band of model?.bands || []) {
    for (const piece of splitBandByOpenings(band, openings, H)) {
      if (piece.y0 >= cut - 1e-6) continue;
      walls.push(prismData(piece.poly, piece.y0, Math.min(piece.y1, cut)));
    }
  }

  const freeWalls = [];
  for (const fw of model?.freeWalls || []) freeWalls.push(prismData(fw.poly, 0, Math.min(fw.height ?? H, cut)));

  const furniture = [];
  const obstacles = [];
  for (const f of model?.furniture || []) {
    (f.obstacle ? obstacles : furniture).push(prismData(f.poly, 0, Math.min(f.h ?? 0.5, cut)));
  }

  const windowPanes = windows
    .map((w, i) => ({ w, o: openings[doors.length + i] }))
    .filter(({ o }) => o.y0 < cut - 1e-6)
    .map(({ w, o }) => panelData(w.a, w.b, o.y0, Math.min(o.y1, cut)));

  const thresholds = doors.map((d) => {
    const dx = d.b[0] - d.a[0];
    const dz = d.b[1] - d.a[1];
    const l = Math.hypot(dx, dz) || 1;
    const nx = (-dz / l) * 0.06;
    const nz = (dx / l) * 0.06;
    return prismData(
      [
        [d.a[0] - nx, d.a[1] - nz],
        [d.b[0] - nx, d.b[1] - nz],
        [d.b[0] + nx, d.b[1] + nz],
        [d.a[0] + nx, d.a[1] + nz],
      ],
      0,
      0.012,
    );
  });

  return {
    wallHeight: H,
    cutY: cut,
    floors: mergeData(floors),
    walls: mergeData(walls),
    freeWalls: mergeData(freeWalls),
    furniture: mergeData(furniture),
    obstacles: mergeData(obstacles),
    windows: mergeData(windowPanes),
    thresholds: mergeData(thresholds),
  };
}

// ---------------------------------------------------------------- camera framing

/**
 * Camera placement that frames model bounds.
 *  view 'iso': three-quarter view from the south side (+z), 50 degrees elevation
 *  view 'top': straight down, plan top (small z) at the top of the screen
 * Returns { target, position, distance, near, far, minDistance, maxDistance }.
 */
export function frameBounds(bounds, opts = {}) {
  const b = bounds && Number.isFinite(bounds.x1 - bounds.x0) ? bounds : { x0: 0, x1: 10, z0: 0, z1: 10 };
  const fov = (opts.fov ?? 40) * DEG;
  const aspect = opts.aspect > 0 ? opts.aspect : 1.5;
  const H = opts.height ?? 2.6;
  const spanX = Math.max(b.x1 - b.x0, 1);
  const spanZ = Math.max(b.z1 - b.z0, 1);
  const cx = (b.x0 + b.x1) / 2;
  const cz = (b.z0 + b.z1) / 2;
  const tanV = Math.tan(fov / 2);
  const tanH = tanV * aspect;
  let target;
  let direction;
  let distance;
  if (opts.view === 'top') {
    target = [cx, 0, cz];
    direction = [0, 1, 0.0001];
    distance = Math.max(spanZ / 2 / tanV, spanX / 2 / tanH) * 1.08 + H;
  } else {
    target = [cx, H * 0.25, cz];
    const el = 50 * DEG;
    const az = 20 * DEG;
    direction = [Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)];
    // Exact fit: the nearest distance at which all 8 box corners stay inside the frustum,
    // with the projected box centred (near corners look larger, so the box centre is not
    // the image centre). A bounding sphere is too loose for narrow canvases (split view).
    const dn0 = norm(direction);
    const right = norm(cross(mul(dn0, -1), [0, 1, 0]));
    const up = cross(right, mul(dn0, -1));
    const inset = Math.max(0, Math.min(opts.inset ?? 0, (spanX - 1) / 2, (spanZ - 1) / 2));
    const corners = [];
    for (const x of [b.x0 + inset, b.x1 - inset]) {
      for (const z of [b.z0 + inset, b.z1 - inset]) {
        for (const y of [0, H]) corners.push([x, y, z]);
      }
    }
    for (let iter = 0; iter < 6; iter++) {
      distance = 0;
      for (const c of corners) {
        const v = sub(c, target);
        const depth = dot(v, dn0);
        distance = Math.max(distance, depth + Math.abs(dot(v, right)) / tanH, depth + Math.abs(dot(v, up)) / tanV);
      }
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const c of corners) {
        const v = sub(c, target);
        const ahead = distance - dot(v, dn0);
        const sx = dot(v, right) / ahead / tanH;
        const sy = dot(v, up) / ahead / tanV;
        x0 = Math.min(x0, sx); x1 = Math.max(x1, sx); y0 = Math.min(y0, sy); y1 = Math.max(y1, sy);
      }
      const ox = ((x0 + x1) / 2) * tanH * distance;
      const oy = ((y0 + y1) / 2) * tanV * distance;
      if (Math.abs(ox) < 1e-4 && Math.abs(oy) < 1e-4) break;
      target = add(target, add(mul(right, ox), mul(up, oy)));
    }
    distance *= 1.04;
  }
  const dn = norm(direction);
  const position = add(target, mul(dn, distance));
  return {
    target,
    position,
    distance,
    near: Math.max(0.05, distance / 200),
    far: distance * 12 + 50,
    minDistance: 0.5,
    maxDistance: distance * 4,
  };
}

/** True when two bounds differ by more than tol metres anywhere. */
export function boundsChanged(a, b, tol = 0.05) {
  if (!a || !b) return true;
  return ['x0', 'x1', 'z0', 'z1'].some((k) => Math.abs(a[k] - b[k]) > tol);
}

// ---------------------------------------------------------------- colours and palettes

export const DEFAULT_SENSOR_COLORS = [
  '#2f7de1',
  '#e8832a',
  '#2aa876',
  '#a05bd6',
  '#d6477c',
  '#c9a400',
  '#17a2b8',
  '#7a8794',
];

export const PALETTES = {
  light: {
    background: '#eef1f4',
    floor: '#dde2e8',
    wall: '#b7bfc9',
    freeWall: '#98a2ae',
    furniture: '#8d9bb0',
    obstacle: '#6f819b',
    window: '#8ec9ff',
    door: '#c99a55',
    spill: '#e5484d',
    sensorBody: '#2b3138',
    selected: '#f59f00',
    inactive: '#9aa3ad',
  },
  dark: {
    background: '#12161b',
    floor: '#242b34',
    wall: '#4b5666',
    freeWall: '#5f6b7c',
    furniture: '#7a89a0',
    obstacle: '#94a4bd',
    window: '#4f9fe0',
    door: '#b98a4a',
    spill: '#ff6b6b',
    sensorBody: '#d8dee6',
    selected: '#ffc53d',
    inactive: '#6b7480',
  },
};

export function getPalette(dark) {
  return dark ? PALETTES.dark : PALETTES.light;
}

/** Parse #rgb, #rrggbb, rgb()/rgba() to [r, g, b] (0..255). Anything else gives null. */
export function parseColor(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim().toLowerCase();
  let m = /^#([0-9a-f]{3})$/.exec(s);
  if (m) return [...m[1]].map((c) => parseInt(c + c, 16));
  m = /^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/.exec(s);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(s);
  if (m) return [m[1], m[2], m[3]].map((v) => Math.max(0, Math.min(255, Math.round(Number(v)))));
  return null;
}

/** Index into the colour list: explicit colour index of the sensor, else its list position. */
export function sensorColourIndex(sensor, position) {
  for (const k of ['colour_index', 'color_index', 'colourIndex', 'colorIndex', 'colour', 'color']) {
    if (Number.isInteger(sensor?.[k]) && sensor[k] >= 0) return sensor[k];
  }
  return position;
}

/** RGB for a colour index from a user list; unparsable entries fall back to the defaults. */
export function colourRgb(colors, index) {
  const list = Array.isArray(colors) && colors.length ? colors : DEFAULT_SENSOR_COLORS;
  const own = parseColor(list[index % list.length]);
  if (own) return own;
  return parseColor(DEFAULT_SENSOR_COLORS[index % DEFAULT_SENSOR_COLORS.length]);
}

/**
 * RGB of one sensor. The panel passes a map entity_id -> css colour (the same palette as the 2D map);
 * a list is read by colour index. Without either, the default list is used.
 */
export function sensorRgb(colors, sensor, position) {
  if (colors && typeof colors === 'object' && !Array.isArray(colors)) {
    const own = parseColor(colors[sensor?.entity_id]);
    if (own) return own;
  }
  return colourRgb(Array.isArray(colors) ? colors : null, sensorColourIndex(sensor, position));
}

/** Map entity_id -> rgb for a sensor list. */
export function sensorColourMap(sensors, colors) {
  const out = new Map();
  (sensors || []).forEach((s, i) => out.set(s.entity_id, sensorRgb(colors, s, i)));
  return out;
}

// ---------------------------------------------------------------- coverage volume

/**
 * The coverage volume as an RGBA 3D texture (x fastest, then y, then z, as WebGL expects for a
 * Data3DTexture of size nx × ny × nz). rgb is the owning sensor's colour, a the detection strength;
 * cells a sensor of another room sees get the spill colour at `spillStrength`. Empty cells stay 0, so
 * linear filtering fades the light out softly at walls.
 * Returns { data, nx, ny, nz, origin: [x, y, z] of the first cell's lower corner, size: [sx, sy, sz] }.
 */
export function volumeTexture(volume, bounds, opts = {}) {
  const cell = volume?.cell || 0.2;
  const step = volume?.step || 0.2;
  const heights = (volume?.heights || []).slice().sort((a, b) => a - b);
  if (!bounds || !heights.length) return null;
  const colorFor = opts.colorFor || (() => [31, 95, 153]);
  const spillRgb = opts.spillColor || [229, 72, 77];
  const spillStrength = opts.spillStrength ?? 0.7;
  const sel = opts.selected || null;
  // Optional light falloff: { entity_id: [x, y, z, reach] }. The strength then drops with the distance to
  // the owning sensor, so the coverage reads as light coming from the sensor and not as a filled room.
  const lights = opts.lights || null;
  const falloff = (id, x, y, z) => {
    const l = lights && lights[id];
    if (!l) return 1;
    // like a lamp: bright at the sensor, about half at 2 m, a quarter at 4 m; never fully dark inside the
    // covered area, and nothing beyond the reach (the model already ends the coverage there)
    const d = Math.hypot(x - l[0], y - l[1], z - l[2]);
    if (d > (l[3] || 6)) return 0.06;
    return 0.06 + 0.94 / (1 + (d / 1.4) ** 2);
  };
  const x0 = bounds.x0;
  const z0 = bounds.z0;
  const nx = Math.max(1, Math.ceil((bounds.x1 - bounds.x0) / cell));
  const nz = Math.max(1, Math.ceil((bounds.z1 - bounds.z0) / cell));
  const ny = heights.length;
  const data = new Uint8Array(nx * ny * nz * 4);
  // room per cell (-1 = no room: wall or outside), for the room-aware blur
  const rooms = new Int16Array(nx * ny * nz).fill(-1);
  const roomIds = new Map();
  heights.forEach((h, yi) => {
    for (const c of volume.grid?.[String(h)] || []) {
      const xi = Math.floor((c.x - x0) / cell);
      const zi = Math.floor((c.z - z0) / cell);
      if (xi < 0 || zi < 0 || xi >= nx || zi >= nz) continue;
      if (!roomIds.has(c.room)) roomIds.set(c.room, roomIds.size);
      rooms[(zi * ny + yi) * nx + xi] = roomIds.get(c.room);
      const spill = c.spill && c.spill.length > 0;
      let rgb;
      let a;
      if (spill) {
        rgb = spillRgb;
        a = spillStrength * (sel && !c.spill.includes(sel) ? 0.3 : 1);
      } else if (c.own > 0 && c.own_sensor) {
        rgb = colorFor(c.own_sensor);
        a = Math.min(1, c.own) * falloff(c.own_sensor, c.x, h, c.z) * (sel && c.own_sensor !== sel ? 0.3 : 1);
      } else continue;
      const i = ((zi * ny + yi) * nx + xi) * 4;
      data[i] = rgb[0];
      data[i + 1] = rgb[1];
      data[i + 2] = rgb[2];
      data[i + 3] = Math.round(a * 255);
    }
  });
  if (opts.blur > 0) blurInRooms(data, rooms, nx, ny, nz, opts.blur);
  if (opts.dilate) dilateXZ(data, nx, ny, nz);
  return { data, nx, ny, nz, origin: [x0, heights[0] - step / 2, z0], size: [nx * cell, ny * step, nz * cell] };
}

/**
 * Soften the volume with a separable [1 2 1] blur along x, y and z, a few passes. Only cells of the same
 * room are mixed, so no colour bleeds through a wall; colour is blurred premultiplied by strength.
 */
function blurInRooms(data, rooms, nx, ny, nz, passes) {
  const n = nx * ny * nz;
  let cur = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const a = data[i * 4 + 3] / 255;
    cur[i * 4] = data[i * 4] * a;
    cur[i * 4 + 1] = data[i * 4 + 1] * a;
    cur[i * 4 + 2] = data[i * 4 + 2] * a;
    cur[i * 4 + 3] = a;
  }
  let next = new Float32Array(n * 4);
  const strides = [1, nx, nx * ny];
  const dims = [nx, ny, nz];
  for (let pass = 0; pass < passes; pass++) {
    for (let axis = 0; axis < 3; axis++) {
      const st = strides[axis];
      for (let z = 0; z < nz; z++) {
        for (let y = 0; y < ny; y++) {
          for (let x = 0; x < nx; x++) {
            const i = (z * ny + y) * nx + x;
            const r = rooms[i];
            if (r < 0) {
              for (let k = 0; k < 4; k++) next[i * 4 + k] = cur[i * 4 + k];
              continue;
            }
            const pos = axis === 0 ? x : axis === 1 ? y : z;
            let w = 2;
            let s0 = cur[i * 4] * 2, s1 = cur[i * 4 + 1] * 2, s2 = cur[i * 4 + 2] * 2, s3 = cur[i * 4 + 3] * 2;
            for (const d of [-1, 1]) {
              const q = pos + d;
              if (q < 0 || q >= dims[axis]) continue;
              const j = i + d * st;
              if (rooms[j] !== r) continue;
              s0 += cur[j * 4]; s1 += cur[j * 4 + 1]; s2 += cur[j * 4 + 2]; s3 += cur[j * 4 + 3];
              w += 1;
            }
            next[i * 4] = s0 / w; next[i * 4 + 1] = s1 / w; next[i * 4 + 2] = s2 / w; next[i * 4 + 3] = s3 / w;
          }
        }
      }
      [cur, next] = [next, cur];
    }
  }
  for (let i = 0; i < n; i++) {
    if (rooms[i] < 0) continue;
    const a = cur[i * 4 + 3];
    data[i * 4 + 3] = Math.round(Math.min(1, a) * 255);
    if (a > 1e-4) {
      data[i * 4] = Math.round(Math.min(255, cur[i * 4] / a));
      data[i * 4 + 1] = Math.round(Math.min(255, cur[i * 4 + 1] / a));
      data[i * 4 + 2] = Math.round(Math.min(255, cur[i * 4 + 2] / a));
    }
  }
}

/**
 * Fill empty cells next to filled ones (in x and z) with the mean of their filled neighbours, at half
 * strength. Wall faces rarely sit on the 20 cm grid; without this, linear filtering mixes in empty
 * cells along a wall and draws stripes. Only empty cells change, so rooms do not bleed into each other.
 */
function dilateXZ(data, nx, ny, nz) {
  const src = data.slice();
  for (let z = 0; z < nz; z++) {
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        const i = ((z * ny + y) * nx + x) * 4;
        if (src[i + 3] > 0) continue;
        let r = 0, g = 0, b = 0, a = 0, n = 0;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const xx = x + dx;
          const zz = z + dz;
          if (xx < 0 || zz < 0 || xx >= nx || zz >= nz) continue;
          const j = ((zz * ny + y) * nx + xx) * 4;
          if (src[j + 3] === 0) continue;
          r += src[j]; g += src[j + 1]; b += src[j + 2]; a += src[j + 3]; n++;
        }
        if (!n) continue;
        data[i] = Math.round(r / n);
        data[i + 1] = Math.round(g / n);
        data[i + 2] = Math.round(b / n);
        data[i + 3] = Math.round(a / n / 2);
      }
    }
  }
}

/** Layer heights for the coverage volume: cell centres from the floor to just below the ceiling. */
export function volumeHeights(ceiling, step = 0.2) {
  const H = ceiling > 0 ? ceiling : 2.6;
  const out = [];
  for (let h = step / 2; h < H - 0.05; h += step) out.push(Math.round(h * 1000) / 1000);
  return out;
}

/**
 * Voxels of a coverage volume (evaluate() with many heights and grid: true), up to maxY.
 * Colour: the owning sensor's colour, paler where the detection is weak; cells that a sensor of another
 * room sees are drawn in the spill colour. With a selected sensor, everything else fades.
 * Returns flat arrays (x, y, z per voxel; r, g, b 0..255 per voxel) so the scene can fill one InstancedMesh.
 */
export function volumeVoxels(volume, opts = {}) {
  const grid = volume?.grid || {};
  const heights = (volume?.heights || Object.keys(grid).map(Number)).filter((h) => Number.isFinite(h)).sort((a, b) => a - b);
  const maxY = opts.maxY ?? Infinity;
  const fade = opts.fadeColor || [255, 255, 255];
  const spillRgb = opts.spillColor || [229, 72, 77];
  const sel = opts.selected || null;
  const colorFor = opts.colorFor || (() => [31, 95, 153]);
  const mix = (c, k) => [0, 1, 2].map((i) => Math.round(fade[i] + (c[i] - fade[i]) * k));
  const pos = [];
  const rgb = [];
  for (const h of heights) {
    if (h > maxY + 1e-6) continue;
    for (const cell of grid[String(h)] || []) {
      const spill = cell.spill && cell.spill.length > 0;
      const own = cell.own > 0 && cell.own_sensor;
      if (!spill && !own) continue;
      let c;
      if (spill) {
        c = sel && !cell.spill.includes(sel) ? mix(spillRgb, 0.25) : spillRgb;
      } else {
        const k = 0.35 + 0.65 * Math.min(1, cell.own);
        c = mix(colorFor(cell.own_sensor), sel && cell.own_sensor !== sel ? k * 0.25 : k);
      }
      pos.push(cell.x, h, cell.z);
      rgb.push(c[0], c[1], c[2]);
    }
  }
  return { count: pos.length / 3, positions: pos, colors: rgb, cell: volume?.cell || 0.2, step: volume?.step || 0.2 };
}

// ---------------------------------------------------------------- coverage raster

/** Smallest positive spacing between distinct coordinates, in metres (fallback 0.1). */
export function inferCellSize(cells) {
  const step = (key) => {
    const vals = [...new Set(cells.map((c) => Math.round(c[key] * 10000)))].sort((a, b) => a - b);
    let m = Infinity;
    for (let i = 1; i < vals.length; i++) {
      const dlt = vals[i] - vals[i - 1];
      if (dlt > 1) m = Math.min(m, dlt);
    }
    return m / 10000;
  };
  const s = Math.min(step('x'), step('z'));
  return Number.isFinite(s) ? s : 0.1;
}

/**
 * Rasterise grid cells into an RGBA image covering the plan bounds.
 *  own cell (own > 0): sensor colour, alpha grows with quality
 *  spill cell (seen by sensors of other rooms): red; with a selection only if the
 *  selected sensor is one of them. With a selection, cells owned by other sensors are dimmed.
 * Row 0 is z0 (north edge of the plan), column 0 is x0.
 * Returns { width, height, data (Uint8Array RGBA), x0, z0, x1, z1, ppm, cellSize }.
 */
export function rasterizeCells(cells, opts) {
  const list = cells || [];
  const cellSize = opts.cellSize || inferCellSize(list);
  const b = opts.bounds;
  const pad = cellSize / 2;
  const x0 = b.x0 - pad;
  const z0 = b.z0 - pad;
  const x1 = b.x1 + pad;
  const z1 = b.z1 + pad;
  const span = Math.max(x1 - x0, z1 - z0, 1e-6);
  const ppm = Math.min(opts.maxPixels ? opts.maxPixels / span : 2048 / span, opts.maxPpm ?? 50);
  const width = Math.max(1, Math.ceil((x1 - x0) * ppm));
  const height = Math.max(1, Math.ceil((z1 - z0) * ppm));
  const data = new Uint8Array(width * height * 4);
  const spillRgb = opts.spillColor || [229, 72, 77];
  const selected = opts.selected || null;
  const colorFor = opts.colorFor || (() => [128, 128, 128]);

  for (const c of list) {
    const spillBy = c.spill || [];
    const isSpill = spillBy.length > 0 && (!selected || spillBy.includes(selected));
    let rgb;
    let alpha;
    if (isSpill) {
      rgb = spillRgb;
      alpha = 0.55;
    } else if (c.own > 0 && c.own_sensor) {
      rgb = colorFor(c.own_sensor);
      alpha = 0.2 + 0.55 * Math.max(0, Math.min(1, c.own));
      if (selected && c.own_sensor !== selected) alpha *= 0.45;
    } else {
      continue;
    }
    const px0 = Math.max(0, Math.round((c.x - cellSize / 2 - x0) * ppm));
    let px1 = Math.min(width, Math.round((c.x + cellSize / 2 - x0) * ppm));
    const pz0 = Math.max(0, Math.round((c.z - cellSize / 2 - z0) * ppm));
    let pz1 = Math.min(height, Math.round((c.z + cellSize / 2 - z0) * ppm));
    if (px1 <= px0) px1 = Math.min(width, px0 + 1);
    if (pz1 <= pz0) pz1 = Math.min(height, pz0 + 1);
    const a = Math.round(alpha * 255);
    for (let y = pz0; y < pz1; y++) {
      for (let x = px0; x < px1; x++) {
        const o = (y * width + x) * 4;
        data[o] = rgb[0];
        data[o + 1] = rgb[1];
        data[o + 2] = rgb[2];
        data[o + 3] = a;
      }
    }
  }
  return { width, height, data, x0, z0, x1, z1, ppm, cellSize };
}
