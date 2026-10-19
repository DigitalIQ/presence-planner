// 2D map helpers (frontend/src/panel/geometry.js) and colours.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as G from "../src/panel/geometry.js";
import { withAlpha, sensorColors, PALETTE } from "../src/panel/colors.js";

const square = [[0, 0], [4, 0], [4, 3], [0, 3]];
const model = {
  rooms: [{ id: "a", points: square }, { id: "b", points: [[4, 0], [7, 0], [7, 3], [4, 3]] }],
  faces: [
    { a: [0, 0], b: [4, 0], n: [0, 1], room: "a" },
    { a: [0, 0], b: [0, 3], n: [1, 0], room: "a" },
  ],
  bounds: { x0: -0.5, x1: 7.5, z0: -0.5, z1: 3.5 },
};

test("pointInPoly and roomAt", () => {
  assert.equal(G.pointInPoly([1, 1], square), true);
  assert.equal(G.pointInPoly([5, 1], square), false);
  assert.equal(G.roomAt(model, 5, 1), "b");
  assert.equal(G.roomAt(model, 9, 1), null);
});

test("snapToFaces snaps 3 cm in front of the nearest face with distances to the ends", () => {
  const s = G.snapToFaces(model.faces, [1.2, 0.2]);
  assert.ok(s);
  assert.equal(s.x, 1.2);
  assert.ok(Math.abs(s.z - 0.03) < 1e-9);
  assert.ok(Math.abs(s.along[0] - 1.2) < 1e-9);
  assert.ok(Math.abs(s.along[1] - 2.8) < 1e-9);
  assert.equal(s.phi, 90);
  assert.equal(s.room, "a");
});

test("snapToFaces respects the maximum distance and the end gap", () => {
  assert.equal(G.snapToFaces(model.faces, [2, 1.5]), null);
  const s = G.snapToFaces(model.faces, [-0.1, 0.1], { maxDist: 1 });
  assert.ok(s.along[0] >= 0.04 - 1e-9);
});

test("viewport round trip", () => {
  const vp = G.fitViewport(model.bounds, 800, 400, 0);
  assert.equal(vp.scale, 100);
  const x = 3.3, z = 1.7;
  assert.ok(Math.abs(vp.wx(vp.sx(x)) - x) < 1e-9);
  assert.ok(Math.abs(vp.wz(vp.sz(z)) - z) < 1e-9);
});

test("angleTo follows phi convention (0 = +x, 90 = +z)", () => {
  assert.equal(G.angleTo(0, 0, 1, 0), 0);
  assert.equal(G.angleTo(0, 0, 0, 1), 90);
  assert.equal(G.angleTo(0, 0, -1, 0), 180);
  assert.equal(G.angleTo(0, 0, 0, -1), 270);
  assert.equal(G.angleTo(0, 0, 1, 0.05, 5), 5);
});

test("hitTest finds handle before dot, skips handles of ceiling sensors", () => {
  const vp = G.fitViewport(model.bounds, 800, 400, 0);
  const s = { entity_id: "s1", x: 1, z: 1, phi: 0, mount: "wall" };
  const [hx, hy] = G.handlePos(vp, s);
  assert.deepEqual(G.hitTest(vp, [s], hx, hy), { entity_id: "s1", mode: "rotate" });
  assert.deepEqual(G.hitTest(vp, [s], vp.sx(1), vp.sz(1)), { entity_id: "s1", mode: "move" });
  assert.equal(G.hitTest(vp, [{ ...s, mount: "ceiling" }], hx, hy), null);
  assert.equal(G.hitTest(vp, [s], 5, 5), null);
});

test("conePolygon: wedge for wall, circle for ceiling", () => {
  const w = G.conePolygon({ x: 0, z: 0, phi: 0, fov_h: 90, reach: 4, tilt: 0, mount: "wall" }, 4);
  assert.deepEqual(w[0], [0, 0]);
  assert.equal(w.length, 6);
  const mid = w[3];
  assert.ok(Math.abs(mid[0] - 4) < 1e-9 && Math.abs(mid[1]) < 1e-9);
  const c = G.conePolygon({ x: 0, z: 0, phi: 0, fov_h: 120, reach: 4, height: 2.5, mount: "ceiling" }, 8);
  const r = Math.hypot(c[0][0], c[0][1]);
  assert.ok(Math.abs(r - 4) < 1e-9, "ceiling circle limited by reach");
});

test("labelPoint lies inside and away from edges", () => {
  const l = G.labelPoint(square);
  assert.ok(G.pointInPoly([l.x, l.z], square));
  assert.ok(l.m > 1.2);
});

test("segmentRect and boundsOf", () => {
  const r = G.segmentRect([0, 0], [2, 0], 0.5);
  assert.deepEqual(r, [[0, 0.5], [2, 0.5], [2, -0.5], [0, -0.5]]);
  assert.deepEqual(G.boundsOf({ rooms: [{ points: square }] }), { x0: -0.4, x1: 4.4, z0: -0.4, z1: 3.4 });
});

test("withAlpha and sensorColors", () => {
  assert.equal(withAlpha("#ff0000", 0.5), "rgba(255,0,0,0.5)");
  assert.equal(withAlpha("#0f0", 1), "rgba(0,255,0,1)");
  assert.equal(withAlpha("rgb(1, 2, 3)", 0.2), "rgba(1,2,3,0.2)");
  const c = sensorColors([{ entity_id: "a" }, { entity_id: "b" }], true);
  assert.equal(c.a, PALETTE.dark[0]);
  assert.equal(c.b, PALETTE.dark[1]);
});
