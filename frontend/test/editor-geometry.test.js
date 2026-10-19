import { test } from "node:test";
import assert from "node:assert/strict";
import {
  backgroundCorners,
  backgroundScaleFromPoints,
  cleanPolygon,
  dist,
  furnitureCorners,
  handleRotation,
  inwardNormal,
  isConvexVertex,
  pointInPolygon,
  polygonArea,
  polygonCentroid,
  projectOnSegment,
  signedArea,
  snapPoint,
  snapToGrid,
  snapTranslation,
} from "../src/editor/geometry.js";

const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);
const closeP = (p, q, eps = 1e-6) => {
  close(p[0], q[0], eps);
  close(p[1], q[1], eps);
};

test("polygon area of rectangle, L shape and both orientations", () => {
  const rect = [[0, 0], [5, 0], [5, 4.2], [0, 4.2]];
  close(polygonArea(rect), 21);
  assert.ok(signedArea(rect) > 0);
  close(polygonArea([...rect].reverse()), 21);
  assert.ok(signedArea([...rect].reverse()) < 0);
  const L = [[0, 0], [4, 0], [4, 2], [2, 2], [2, 4], [0, 4]];
  close(polygonArea(L), 12);
  // collinear extra vertex does not change the area
  close(polygonArea([[0, 0], [5, 0], [5, 4.2], [3, 4.2], [0, 4.2]]), 21);
  close(polygonArea([[0, 0], [1, 1]]), 0);
});

test("centroid and point in polygon", () => {
  closeP(polygonCentroid([[0, 0], [4, 0], [4, 2], [0, 2]]), [2, 1]);
  const L = [[0, 0], [4, 0], [4, 2], [2, 2], [2, 4], [0, 4]];
  assert.equal(pointInPolygon([1, 3], L), true);
  assert.equal(pointInPolygon([3, 3], L), false);
  assert.equal(pointInPolygon([3, 1], L), true);
});

test("inward normal and convex vertex for both orientations", () => {
  const cw = [[0, 0], [4, 0], [4, 2], [0, 2]];
  closeP(inwardNormal(cw[0], cw[1], signedArea(cw)), [0, 1]);
  const ccw = [...cw].reverse(); // (0,2) (4,2) (4,0) (0,0)
  closeP(inwardNormal(ccw[0], ccw[1], signedArea(ccw)), [0, -1]);
  const L = [[0, 0], [4, 0], [4, 2], [2, 2], [2, 4], [0, 4]];
  assert.equal(isConvexVertex(L, 1), true);
  assert.equal(isConvexVertex(L, 3), false);
  const Lr = [...L].reverse();
  assert.equal(isConvexVertex(Lr, Lr.findIndex((p) => p[0] === 2 && p[1] === 2)), false);
  assert.equal(isConvexVertex(Lr, 0), true);
});

test("project on segment clamps to the ends", () => {
  const pr = projectOnSegment([2, 1], [0, 0], [4, 0]);
  close(pr.t, 0.5);
  close(pr.dist, 1);
  close(pr.along, 2);
  close(projectOnSegment([-3, 0], [0, 0], [4, 0]).t, 0);
  close(projectOnSegment([9, 0], [0, 0], [4, 0]).t, 1);
});

test("grid snapping to 5 cm", () => {
  assert.deepEqual(snapToGrid([1.234, 2.976], 0.05), [1.25, 3]);
  assert.deepEqual(snapToGrid([-0.024, 0.026], 0.05), [0, 0.05]);
});

test("snapPoint prefers vertices, then edges, then grid", () => {
  const vertices = [[1, 1]];
  const segments = [[[0, 3], [4, 3]]];
  const v = snapPoint([1.08, 0.95], { grid: 0.05, tol: 0.15, vertices, segments });
  assert.equal(v.kind, "vertex");
  assert.deepEqual(v.point, [1, 1]);
  const e = snapPoint([2.013, 3.1], { grid: 0.05, tol: 0.15, vertices, segments });
  assert.equal(e.kind, "edge");
  assert.deepEqual(e.point, [2, 3]);
  const g = snapPoint([2.013, 2.2], { grid: 0.05, tol: 0.15, vertices, segments });
  assert.equal(g.kind, "grid");
  assert.deepEqual(g.point, [2, 2.2]);
  // a slanted edge: the snapped point lies exactly on the edge
  const s = snapPoint([1.02, 0.98], { grid: 0.05, tol: 0.15, segments: [[[0, 0], [3, 3]]] });
  assert.equal(s.kind, "edge");
  close(s.point[0], s.point[1], 1e-3);
});

test("snapTranslation lands on a target vertex or keeps the first vertex on the grid", () => {
  const pts = [[0, 0], [2, 0], [2, 2], [0, 2]];
  assert.deepEqual(snapTranslation(pts, [2.93, 0.04], { grid: 0.05, tol: 0.15, targets: [[5, 0]] }), [3, 0]);
  assert.deepEqual(snapTranslation(pts, [1.234, 0.012], { grid: 0.05, tol: 0.1, targets: [] }), [1.25, 0]);
});

test("furniture corners follow the rotation rule", () => {
  const c0 = furnitureCorners({ x: 1, z: 1, w: 2, d: 1, rotation: 0 });
  closeP(c0[0], [0, 0.5]);
  closeP(c0[2], [2, 1.5]);
  const c90 = furnitureCorners({ x: 0, z: 0, w: 2, d: 1, rotation: 90 });
  // local (a, b) → (−b, a) for 90°
  closeP(c90[0], [0.5, -1]);
  closeP(c90[2], [-0.5, 1]);
  close(handleRotation([0, 0], [0, -1]), 0);
  close(handleRotation([0, 0], [1, 0]), 90);
  close(handleRotation([0, 0], [0, 1]), 180);
  close(handleRotation([0, 0], [-1, 0]), 270);
});

test("background scale from two points keeps the first point fixed", () => {
  const bg = { x: 1, z: 2, width: 10, rotation: 0, opacity: 0.5 };
  // the user clicked two points 4 m apart in plan units that are really 6 m apart
  const p1 = [3, 3];
  const p2 = [7, 3];
  const out = backgroundScaleFromPoints(bg, p1, p2, 6);
  close(out.width, 15);
  // p1 is 2 m right and 1 m down from the origin → becomes 3 m / 1.5 m after scaling
  close(out.x, 0);
  close(out.z, 1.5);
  assert.equal(out.opacity, 0.5);
  assert.equal(bg.width, 10, "input not changed");
});

test("background scale with rotation", () => {
  const bg = { x: 0, z: 0, width: 8, rotation: 90 };
  const p1 = [-1, 1]; // image-local (1, 1) rotated by 90°
  const p2 = [-1, 3];
  const out = backgroundScaleFromPoints(bg, p1, p2, 1);
  close(out.width, 4);
  // p1 stays on the same image pixel: local (1,1) → (0.5, 0.5) after scaling
  const corners = backgroundCorners(out, 1);
  closeP(corners[0], [out.x, out.z]);
  const local = [0.5, 0.5];
  const back = [out.x - local[1], out.z + local[0]]; // rotate (0.5,0.5) by 90°: (−0.5, 0.5)
  closeP(back, p1, 1e-3);
  assert.equal(backgroundScaleFromPoints(bg, p1, p1, 3), bg, "zero distance changes nothing");
});

test("cleanPolygon removes duplicates and a closing point", () => {
  assert.deepEqual(cleanPolygon([[0, 0], [0, 0], [1, 0], [1, 1], [0, 0]]), [[0, 0], [1, 0], [1, 1]]);
  close(dist([0, 0], [3, 4]), 5);
});
