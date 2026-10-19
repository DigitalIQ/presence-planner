import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { edgeInfo, edgeOverlap, edgePieces, nearestEdge, openingGeometry, roomAt, sharedEdges, wallBands } from "../src/editor/walls.js";
import { setNoWall } from "../src/editor/plan-ops.js";

const demo = JSON.parse(readFileSync(new URL("../../shared/demo-plan.json", import.meta.url))).plan;
const floor = demo.floors[0];
const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

test("edge overlap works in both directions and rejects parallel offsets", () => {
  assert.deepEqual(edgeOverlap([0, 0], [4, 0], [4, 0], [0, 0]), [0, 1]);
  const ov = edgeOverlap([0, 0], [4, 0], [1, 0], [3, 0]);
  close(ov[0], 0.25);
  close(ov[1], 0.75);
  assert.equal(edgeOverlap([0, 0], [4, 0], [1, 0.05], [3, 0.05]), null);
  assert.equal(edgeOverlap([0, 0], [4, 0], [4, 0], [6, 0]), null, "touching at one point is not shared");
});

test("shared edges in the demo flat", () => {
  // living edge 3 (3,4.2)→(0,4.2) is the kitchen's edge 0
  assert.deepEqual(sharedEdges(floor, "living", 3).map((s) => [s.room_id, s.edge]), [["kitchen", 0]]);
  // living edge 1 (5,0)→(5,4.2) is the bedroom's edge 4
  assert.deepEqual(sharedEdges(floor, "living", 1).map((s) => [s.room_id, s.edge]), [["bedroom", 4]]);
  // living edge 0 is exterior
  assert.deepEqual(sharedEdges(floor, "living", 0), []);
  // bedroom edge 2 (8.6,4.2)→(7.4,4.2) is exterior, edge 3 is shared with the bath
  assert.deepEqual(sharedEdges(floor, "bedroom", 2), []);
  assert.deepEqual(sharedEdges(floor, "bedroom", 3).map((s) => s.room_id), ["bath"]);
});

test("an edge is split where a smaller room meets it", () => {
  const f = {
    rooms: [
      { id: "a", points: [[0, 0], [6, 0], [6, 3], [0, 3]] },
      { id: "b", points: [[2, 3], [4, 3], [4, 5], [2, 5]] },
    ],
  };
  const pieces = edgePieces(f, "a", 2);
  assert.equal(pieces.length, 3);
  close(pieces[0].t1, 1 / 3);
  close(pieces[1].t0, 1 / 3);
  close(pieces[1].t1, 2 / 3);
  assert.deepEqual(pieces.map((p) => p.neighbours.length), [0, 1, 0]);
  assert.deepEqual(pieces[1].neighbours, [{ room_id: "b", edge: 0 }]);
  const bands = wallBands({ settings: { wall_exterior: 0.3, wall_interior: 0.1 } }, f);
  const onEdge = bands.filter((b) => b.room_id === "a" && b.edge === 2);
  assert.deepEqual(onEdge.map((b) => b.kind), ["exterior", "interior", "exterior"]);
  // the interior stretch is centred on z = 3, the exterior ones lie fully outside room a (z > 3)
  const zs = (b) => b.poly.map((p) => p[1]);
  close(Math.min(...zs(onEdge[1])), 2.95);
  close(Math.max(...zs(onEdge[1])), 3.05);
  close(Math.min(...zs(onEdge[0])), 3);
  close(Math.max(...zs(onEdge[0])), 3.3);
  // b's shared edge is not drawn a second time
  assert.equal(bands.filter((b) => b.room_id === "b" && b.kind === "interior").length, 0);
});

test("demo wall bands: interior once with the larger thickness, exterior outside", () => {
  const bands = wallBands(demo, floor);
  const interior = bands.filter((b) => b.kind === "interior");
  // living-bedroom, living-kitchen, living-hall, bedroom-bath, kitchen-hall, hall-bath
  assert.equal(interior.length, 6);
  const lk = interior.find((b) => b.room_id === "living" && b.edge === 3);
  close(lk.thickness, 0.175);
  const kh = interior.find((b) => b.room_id === "kitchen" && b.edge === 1);
  close(kh.thickness, 0.1);
  const ext = bands.find((b) => b.room_id === "living" && b.edge === 0);
  assert.equal(ext.kind, "exterior");
  const zs = ext.poly.map((p) => p[1]);
  close(Math.min(...zs), -0.3);
  close(Math.max(...zs), 0);
  // exterior corners are closed: the band starts 0.3 m before x = 0
  close(Math.min(...ext.poly.map((p) => p[0])), -0.3);
});

test("a shared wall takes the larger thickness of both rooms", () => {
  const f = {
    rooms: [
      { id: "a", points: [[0, 0], [3, 0], [3, 3], [0, 3]], wall_thickness: [null, 0.08, null, null] },
      { id: "b", points: [[3, 0], [6, 0], [6, 3], [3, 3]], wall_thickness: [null, null, null, 0.2] },
    ],
  };
  const plan = { settings: { wall_exterior: 0.3, wall_interior: 0.115 } };
  const info = edgeInfo(plan, f, "a", 1);
  assert.equal(info.shared, true);
  assert.deepEqual(info.neighbours, ["b"]);
  close(info.thickness, 0.2);
  const ext = edgeInfo(plan, f, "a", 0);
  assert.equal(ext.shared, false);
  close(ext.thickness, 0.3);
});

test("no wall removes the band on both sides of a shared edge", () => {
  const p2 = setNoWall(demo, "demo", "living", 2, true);
  const f2 = p2.floors[0];
  const before = wallBands(demo, floor).filter((b) => b.kind === "interior").length;
  const after = wallBands(p2, f2).filter((b) => b.kind === "interior").length;
  assert.equal(after, before - 1);
  assert.equal(f2.rooms.find((r) => r.id === "hall").wall_heights[0], 0);
  assert.equal(edgeInfo(p2, f2, "living", 2).noWall, true);
});

test("nearest edge prefers the room the point is in", () => {
  const inKitchen = nearestEdge(floor, [1.5, 4.25], 0.2);
  assert.equal(inKitchen.room_id, "kitchen");
  assert.equal(inKitchen.edge, 0);
  const inLiving = nearestEdge(floor, [1.5, 4.15], 0.2);
  assert.equal(inLiving.room_id, "living");
  assert.equal(inLiving.edge, 3);
  assert.equal(nearestEdge(floor, [1.5, 2], 0.2), null);
  assert.equal(roomAt(floor, [6, 6]).id, "bath");
});

test("door geometry: hinge side and swing direction", () => {
  const d = floor.openings.find((o) => o.id === "d_living"); // hall edge 0, offset 1, width 0.8, hinge left, swing out
  const g = openingGeometry(demo, floor, d);
  assert.equal(g.shared, true);
  close(g.centre[0], 4);
  close(g.centre[1], 4.2);
  close(g.hinge[0], 3.6);
  close(g.hinge[1], 4.2 - 0.0575);
  close(g.tip[0], 3.6);
  close(g.tip[1], 4.2 - 0.0575 - 0.8);
  const w = openingGeometry(demo, floor, floor.openings.find((o) => o.id === "w_living"));
  assert.equal(w.shared, false);
  close(w.n0, -0.3);
  close(w.n1, 0);
  assert.equal(w.hinge, undefined);
});
