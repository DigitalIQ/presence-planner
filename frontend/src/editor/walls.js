// Wall rule for drawing (same as NeonPlan): an edge shared by two rooms is an interior wall centred
// on the edge, an edge without a neighbour is an exterior wall fully outside the polygon. Edges are
// split where other rooms' edges start or end on them. Pure functions, no DOM.

import {
  EPS,
  add,
  clamp,
  dist,
  distToLine,
  dot,
  edgeOf,
  inwardNormal,
  isConvexVertex,
  normalize,
  pointInPolygon,
  projectOnSegment,
  scale,
  signedArea,
  sub,
} from "./geometry.js";

export const SHARED_TOL = 0.01; // 1 cm: edges closer than this count as the same wall line
export const DEFAULT_SETTINGS = { wall_exterior: 0.24, wall_interior: 0.12 };

function settingsOf(plan) {
  return { ...DEFAULT_SETTINGS, ...(plan && plan.settings) };
}

/**
 * Overlap of edge b0→b1 with edge a0→a1, as a parameter interval on a (0…1), or null.
 * Both edges must lie on the same line (within tol); direction does not matter.
 */
export function edgeOverlap(a0, a1, b0, b1, tol = SHARED_TOL) {
  const L = dist(a0, a1);
  if (L < EPS) return null;
  if (distToLine(b0, a0, a1) > tol || distToLine(b1, a0, a1) > tol) return null;
  const d = sub(a1, a0);
  const t0 = dot(sub(b0, a0), d) / (L * L);
  const t1 = dot(sub(b1, a0), d) / (L * L);
  const lo = Math.max(0, Math.min(t0, t1));
  const hi = Math.min(1, Math.max(t0, t1));
  if ((hi - lo) * L <= tol) return null;
  return [lo, hi];
}

/**
 * Edges of other rooms that share a stretch with edge `edge` of room `roomId`.
 * Returns [{ room_id, edge, t0, t1 }] with t0/t1 on the queried edge.
 */
export function sharedEdges(floor, roomId, edge, tol = SHARED_TOL) {
  const room = floor.rooms.find((r) => r.id === roomId);
  if (!room) return [];
  const [a0, a1] = edgeOf(room.points, edge);
  const out = [];
  for (const other of floor.rooms) {
    if (other.id === roomId) continue;
    const n = other.points.length;
    for (let j = 0; j < n; j++) {
      const [b0, b1] = edgeOf(other.points, j);
      const ov = edgeOverlap(a0, a1, b0, b1, tol);
      if (ov) out.push({ room_id: other.id, edge: j, t0: ov[0], t1: ov[1] });
    }
  }
  return out;
}

/**
 * Room edges that a wall setting on (roomId, edge) applies to: the edge itself plus every neighbour
 * edge that lies completely on this wall line. Neighbour edges that are only partly shared keep their
 * own value (their other part is a different wall) and are listed in `partial`.
 */
export function wallTargets(floor, roomId, edge, tol = SHARED_TOL) {
  const targets = [{ room_id: roomId, edge }];
  const partial = [];
  const room = floor.rooms.find((r) => r.id === roomId);
  if (!room) return { targets, partial };
  const [a0, a1] = edgeOf(room.points, edge);
  for (const s of sharedEdges(floor, roomId, edge, tol)) {
    const other = floor.rooms.find((r) => r.id === s.room_id);
    const [b0, b1] = edgeOf(other.points, s.edge);
    const ov = edgeOverlap(b0, b1, a0, a1, tol);
    const L = dist(b0, b1);
    if (ov && (ov[1] - ov[0]) * L >= L - 2 * tol) targets.push({ room_id: s.room_id, edge: s.edge });
    else partial.push(s.room_id);
  }
  return { targets, partial };
}

/**
 * Split one room edge into pieces: [{ t0, t1, a, b, neighbours: [{room_id, edge}] }].
 * A piece with neighbours is a shared (interior) wall stretch.
 */
export function edgePieces(floor, roomId, edge, tol = SHARED_TOL) {
  const room = floor.rooms.find((r) => r.id === roomId);
  if (!room) return [];
  const [a0, a1] = edgeOf(room.points, edge);
  const shared = sharedEdges(floor, roomId, edge, tol);
  const cuts = [0, 1];
  for (const s of shared) cuts.push(s.t0, s.t1);
  cuts.sort((x, y) => x - y);
  const L = dist(a0, a1);
  const ts = [];
  for (const c of cuts) if (!ts.length || (c - ts[ts.length - 1]) * L > tol / 2) ts.push(c);
  if (ts[ts.length - 1] < 1) ts[ts.length - 1] = 1;
  const pieces = [];
  for (let i = 0; i < ts.length - 1; i++) {
    const t0 = ts[i];
    const t1 = ts[i + 1];
    const mid = (t0 + t1) / 2;
    const neighbours = shared.filter((s) => s.t0 <= mid && s.t1 >= mid).map((s) => ({ room_id: s.room_id, edge: s.edge }));
    pieces.push({
      t0,
      t1,
      a: add(a0, scale(sub(a1, a0), t0)),
      b: add(a0, scale(sub(a1, a0), t1)),
      neighbours,
    });
  }
  return pieces;
}

/** Stored thickness of a room edge, or null when missing. */
function storedThickness(room, edge) {
  const t = room.wall_thickness && room.wall_thickness[edge];
  return typeof t === "number" && t > 0 ? t : null;
}

/** True when the room marks this edge as "no wall". */
export function isNoWall(room, edge) {
  return !!(room.wall_heights && room.wall_heights[edge] === 0);
}

/**
 * Effective wall data of one edge of a room, used by the wall tool panel.
 * Returns { length, shared: bool, neighbours: [room_id], partial: [room_id], thickness, stored, noWall, pieces }.
 */
export function edgeInfo(plan, floor, roomId, edge) {
  const s = settingsOf(plan);
  const room = floor.rooms.find((r) => r.id === roomId);
  if (!room) return null;
  const pieces = edgePieces(floor, roomId, edge);
  const neighbours = [...new Set(pieces.flatMap((p) => p.neighbours.map((n) => n.room_id)))];
  const shared = neighbours.length > 0;
  const stored = storedThickness(room, edge);
  let thickness = stored ?? (shared ? s.wall_interior : s.wall_exterior);
  if (shared) {
    for (const p of pieces) {
      for (const n of p.neighbours) {
        const other = floor.rooms.find((r) => r.id === n.room_id);
        const t = (other && storedThickness(other, n.edge)) ?? s.wall_interior;
        thickness = Math.max(thickness, t);
      }
    }
  }
  const [a, b] = edgeOf(room.points, edge);
  const partial = shared ? wallTargets(floor, roomId, edge).partial : [];
  return { length: dist(a, b), shared, neighbours, partial, thickness, stored, noWall: isNoWall(room, edge), pieces };
}

/**
 * All wall bands of a floor for drawing.
 * Returns [{ room_id, edge, a, b, kind: "interior" | "exterior", thickness, poly, n0, n1, normal }]
 * where `normal` points into room_id and n0…n1 is the band's extent along that normal.
 * A shared stretch is emitted once (by the room listed first).
 */
export function wallBands(plan, floor) {
  const s = settingsOf(plan);
  const rooms = floor.rooms || [];
  const index = new Map(rooms.map((r, i) => [r.id, i]));
  const bands = [];
  for (let ri = 0; ri < rooms.length; ri++) {
    const room = rooms[ri];
    const pts = room.points || [];
    if (pts.length < 3) continue;
    const area = signedArea(pts);
    for (let e = 0; e < pts.length; e++) {
      const [ea, eb] = edgeOf(pts, e);
      if (dist(ea, eb) < EPS) continue;
      const normal = inwardNormal(ea, eb, area);
      const pieces = edgePieces(floor, room.id, e);
      for (const piece of pieces) {
        const shared = piece.neighbours.length > 0;
        if (shared) {
          // emitted by the first room only; "no wall" on either side removes it
          if (piece.neighbours.some((n) => index.get(n.room_id) < ri)) continue;
          if (isNoWall(room, e) || piece.neighbours.some((n) => isNoWall(rooms[index.get(n.room_id)], n.edge))) continue;
          let t = storedThickness(room, e) ?? s.wall_interior;
          for (const n of piece.neighbours) t = Math.max(t, storedThickness(rooms[index.get(n.room_id)], n.edge) ?? s.wall_interior);
          const ext0 = piece.t0 === 0 ? t / 2 : 0;
          const ext1 = piece.t1 === 1 ? t / 2 : 0;
          bands.push(makeBand(room.id, e, piece.a, piece.b, "interior", t, normal, -t / 2, t / 2, ext0, ext1));
        } else {
          if (isNoWall(room, e)) continue;
          const t = storedThickness(room, e) ?? s.wall_exterior;
          // close the outer corner at convex vertices with the neighbouring edge's thickness
          const n = pts.length;
          const prevT = storedThickness(room, (e - 1 + n) % n) ?? s.wall_exterior;
          const nextT = storedThickness(room, (e + 1) % n) ?? s.wall_exterior;
          const ext0 = piece.t0 === 0 && isConvexVertex(pts, e) ? prevT : 0;
          const ext1 = piece.t1 === 1 && isConvexVertex(pts, (e + 1) % n) ? nextT : 0;
          bands.push(makeBand(room.id, e, piece.a, piece.b, "exterior", t, normal, -t, 0, ext0, ext1));
        }
      }
    }
  }
  return bands;
}

function makeBand(roomId, edge, a, b, kind, thickness, normal, n0, n1, ext0, ext1) {
  const d = normalize(sub(b, a));
  const a2 = sub(a, scale(d, ext0));
  const b2 = add(b, scale(d, ext1));
  const poly = [add(a2, scale(normal, n0)), add(b2, scale(normal, n0)), add(b2, scale(normal, n1)), add(a2, scale(normal, n1))];
  return { room_id: roomId, edge, a, b, kind, thickness, poly, n0, n1, normal };
}

/** Band of a free wall (chimney, partition): centred rectangle from a to b. */
export function freeWallPoly(w) {
  const t = w.thickness || 0.1;
  const d = normalize(sub(w.b, w.a));
  const n = [-d[1], d[0]];
  const h = t / 2;
  return [add(w.a, scale(n, -h)), add(w.b, scale(n, -h)), add(w.b, scale(n, h)), add(w.a, scale(n, h))];
}

/**
 * Drawing geometry of an opening: centre, direction, the wall band extent and, for doors, the
 * hinge point and the open leaf tip. Returns null if the room or edge is missing.
 */
export function openingGeometry(plan, floor, opening) {
  const room = floor.rooms.find((r) => r.id === opening.room_id);
  if (!room || !room.points || room.points.length < 3) return null;
  const n = room.points.length;
  if (!(opening.edge >= 0 && opening.edge < n)) return null;
  const [a, b] = edgeOf(room.points, opening.edge);
  const L = dist(a, b);
  if (L < EPS) return null;
  const d = normalize(sub(b, a));
  const normal = inwardNormal(a, b, signedArea(room.points));
  const w = Math.min(opening.width || 0.8, L);
  const offset = clamp(opening.offset ?? L / 2, w / 2, L - w / 2);
  const centre = add(a, scale(d, offset));
  const info = edgeInfo(plan, floor, room.id, opening.edge);
  const t = info ? info.thickness : settingsOf(plan).wall_exterior;
  // find the piece under the opening centre to know whether it is shared
  const tc = offset / L;
  const piece = info ? info.pieces.find((p) => p.t0 <= tc && p.t1 >= tc) : null;
  const shared = !!(piece && piece.neighbours.length);
  const n0 = shared ? -t / 2 : -t;
  const n1 = shared ? t / 2 : 0;
  const start = sub(centre, scale(d, w / 2));
  const end = add(centre, scale(d, w / 2));
  const poly = [add(start, scale(normal, n0)), add(end, scale(normal, n0)), add(end, scale(normal, n1)), add(start, scale(normal, n1))];
  const out = { a: start, b: end, centre, dir: d, normal, n0, n1, poly, width: w, offset, edgeLength: L, shared };
  if (opening.type === "door") {
    const hingeEnd = opening.hinge === "right";
    const side = opening.swing === "out" ? -1 : 1;
    // the leaf turns on the face of the wall towards the swing side
    const face = side > 0 ? n1 : n0;
    const hinge = add(hingeEnd ? end : start, scale(normal, face));
    const closed = add(hingeEnd ? start : end, scale(normal, face));
    const tip = add(hinge, scale(normal, side * w));
    out.hinge = hinge;
    out.closed = closed;
    out.tip = tip;
  }
  return out;
}

/**
 * Nearest room edge to p within tol. Between shared edges at the same distance the room that
 * contains p wins. Returns { room_id, edge, t, along, length, dist, point } or null.
 */
export function nearestEdge(floor, p, tol) {
  let best = null;
  for (const room of floor.rooms || []) {
    const pts = room.points || [];
    if (pts.length < 3) continue;
    const inside = pointInPolygon(p, pts);
    for (let e = 0; e < pts.length; e++) {
      const [a, b] = edgeOf(pts, e);
      const pr = projectOnSegment(p, a, b);
      if (pr.dist > tol) continue;
      const cand = { room_id: room.id, edge: e, t: pr.t, along: pr.along, length: pr.length, dist: pr.dist, point: pr.point, inside };
      if (!best || cand.dist < best.dist - 1e-3 || (Math.abs(cand.dist - best.dist) <= 1e-3 && cand.inside && !best.inside)) best = cand;
    }
  }
  if (best) delete best.inside;
  return best;
}

/** Room containing p (first match), or null. */
export function roomAt(floor, p) {
  for (const room of floor.rooms || []) {
    if ((room.points || []).length >= 3 && pointInPolygon(p, room.points)) return room;
  }
  return null;
}
