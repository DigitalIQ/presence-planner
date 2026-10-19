import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  addFloor,
  addFreeWall,
  addFurniture,
  addOpening,
  addRoom,
  clampOffset,
  deleteFloor,
  deleteRoom,
  deleteSelection,
  deleteVertex,
  emptyPlan,
  getFloor,
  insertVertex,
  moveOpeningTo,
  moveRoom,
  moveVertex,
  newId,
  normalizePlan,
  nudgeSelection,
  setBackground,
  setFloorProps,
  setNoWall,
  setRoomProps,
  setWallThickness,
  snapTargets,
  updateBackground,
  updateFurniture,
  updateOpening,
} from "../src/editor/plan-ops.js";
import { edgeInfo } from "../src/editor/walls.js";

const raw = JSON.parse(readFileSync(new URL("../../shared/demo-plan.json", import.meta.url))).plan;
const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

function deepFreeze(o) {
  if (o && typeof o === "object" && !Object.isFrozen(o)) {
    Object.freeze(o);
    for (const v of Object.values(o)) deepFreeze(v);
  }
  return o;
}
const demo = deepFreeze(structuredClone(raw));
const snapshot = JSON.stringify(demo);
const F = "demo";

/** World centre of an opening on its room edge. */
function world(plan, id) {
  const f = getFloor(plan, F);
  const o = f.openings.find((x) => x.id === id);
  const pts = f.rooms.find((r) => r.id === o.room_id).points;
  const a = pts[o.edge];
  const b = pts[(o.edge + 1) % pts.length];
  const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return [a[0] + ((b[0] - a[0]) * o.offset) / L, a[1] + ((b[1] - a[1]) * o.offset) / L];
}
const closeP = (p, q, eps = 1e-6) => {
  close(p[0], q[0], eps);
  close(p[1], q[1], eps);
};

test("ids and normalisation", () => {
  assert.equal(newId("room", ["room_1", "room_3"]), "room_2");
  const p = normalizePlan(null);
  assert.deepEqual(p, emptyPlan());
  assert.equal(normalizePlan(demo), demo);
});

test("floors: add stacks elevations, set props, delete", () => {
  let p = addFloor(demo, { name: "Upstairs" });
  assert.equal(p.floors.length, 2);
  const f2 = p.floors[1];
  assert.equal(f2.id, "floor_1");
  close(f2.elevation, 2.6);
  assert.deepEqual(f2.rooms, []);
  p = setFloorProps(p, "floor_1", { name: "OG", ha_floor: "og", height: 2.5, rooms: "ignored" });
  assert.equal(p.floors[1].name, "OG");
  assert.equal(p.floors[1].ha_floor, "og");
  assert.deepEqual(p.floors[1].rooms, []);
  p = deleteFloor(p, "floor_1");
  assert.equal(p.floors.length, 1);
  assert.equal(p.floors[0], demo.floors[0], "untouched floor is shared");
  const fromEmpty = addFloor(null);
  assert.equal(fromEmpty.floors[0].elevation, 0);
});

test("rooms: add, rename, assign area, delete with its openings", () => {
  const bad = addRoom(demo, F, [[0, 0], [1, 0]]);
  assert.equal(bad.id, null);
  const { plan, id } = addRoom(demo, F, [[10, 0], [12, 0], [12, 2], [10, 2], [10, 0]]);
  assert.equal(id, "room_1");
  const r = getFloor(plan, F).rooms.at(-1);
  assert.equal(r.points.length, 4, "closing duplicate removed");
  let p = setRoomProps(plan, F, id, { name: "Office", area_id: "office", points: [] });
  const r2 = getFloor(p, F).rooms.at(-1);
  assert.equal(r2.name, "Office");
  assert.equal(r2.area_id, "office");
  assert.equal(r2.points.length, 4);
  p = deleteRoom(demo, F, "hall");
  const f = getFloor(p, F);
  assert.equal(f.rooms.some((x) => x.id === "hall"), false);
  assert.equal(f.openings.some((o) => o.room_id === "hall"), false);
  assert.equal(f.openings.length, 5);
});

test("insert corner keeps openings on the right edge and at the same place", () => {
  // hall: edges 0 d_living, 1 d_bath (offset 1.4), 2 d_entry, 3 d_kitchen
  const before = {};
  for (const id of ["d_living", "d_bath", "d_entry", "d_kitchen"]) before[id] = world(demo, id);
  const { plan, index } = insertVertex(demo, F, "hall", 1, [5.02, 5.0]);
  assert.equal(index, 2);
  const f = getFloor(plan, F);
  const hall = f.rooms.find((r) => r.id === "hall");
  assert.deepEqual(hall.points, [[3, 4.2], [5, 4.2], [5, 5], [5, 7], [3, 7]]);
  assert.deepEqual(hall.wall_thickness, [0.115, 0.08, 0.08, 0.3, 0.1]);
  const o = Object.fromEntries(f.openings.map((x) => [x.id, x]));
  assert.equal(o.d_living.edge, 0);
  assert.equal(o.d_bath.edge, 2, "d_bath centre (1.4 m) lies beyond the new corner (0.8 m)");
  close(o.d_bath.offset, 0.6);
  assert.equal(o.d_entry.edge, 3);
  assert.equal(o.d_kitchen.edge, 4);
  for (const id of Object.keys(before)) closeP(world(plan, id), before[id]);
  // other rooms' openings are untouched
  assert.equal(o.w_kitchen, demo.floors[0].openings.find((x) => x.id === "w_kitchen"));
});

test("insert corner before an opening keeps it on the first half", () => {
  const before = world(demo, "w_kitchen"); // kitchen edge 3 (0,7)→(0,4.2), offset 1.4
  const { plan } = insertVertex(demo, F, "kitchen", 3, [0, 5]);
  const o = getFloor(plan, F).openings.find((x) => x.id === "w_kitchen");
  assert.equal(o.edge, 3);
  close(o.offset, 1.4);
  closeP(world(plan, "w_kitchen"), before);
  const { plan: p2 } = insertVertex(demo, F, "kitchen", 3, [0, 6.5]);
  const o2 = getFloor(p2, F).openings.find((x) => x.id === "w_kitchen");
  assert.equal(o2.edge, 4);
  close(o2.offset, 0.9);
  closeP(world(p2, "w_kitchen"), before);
  assert.equal(insertVertex(demo, F, "kitchen", 3, [0, 7]).index, null, "no corner on top of a corner");
});

function testRoomPlan() {
  // 5 corners; corner 3 at (2, 4) sits on the straight line from (4, 4) to (0, 4)
  return deepFreeze({
    version: 1,
    settings: { wall_exterior: 0.3, wall_interior: 0.1 },
    floors: [
      {
        id: F,
        rooms: [
          {
            id: "r",
            points: [[0, 0], [4, 0], [4, 4], [2, 4], [0, 4]],
            wall_thickness: [0.1, 0.2, 0.3, 0.4, 0.5],
            wall_heights: [null, null, 0, null, null],
          },
        ],
        openings: [
          { id: "o1", room_id: "r", edge: 1, offset: 2, width: 0.8, type: "door" },
          { id: "o2", room_id: "r", edge: 2, offset: 1, width: 0.8, type: "door" },
          { id: "o3", room_id: "r", edge: 3, offset: 1, width: 0.8, type: "window" },
          { id: "o4", room_id: "r", edge: 4, offset: 2, width: 0.8, type: "window" },
        ],
        walls: [],
        furniture: [],
      },
    ],
  });
}

test("delete corner merges two edges and re-indexes openings", () => {
  const p0 = testRoomPlan();
  const before = Object.fromEntries(["o1", "o2", "o3", "o4"].map((id) => [id, world(p0, id)]));
  const p = deleteVertex(p0, F, "r", 3);
  const f = getFloor(p, F);
  const r = f.rooms[0];
  assert.deepEqual(r.points, [[0, 0], [4, 0], [4, 4], [0, 4]]);
  assert.deepEqual(r.wall_thickness, [0.1, 0.2, 0.3, 0.5], "merged edge keeps the edge before the corner");
  assert.deepEqual(r.wall_heights, [null, null, 0, null]);
  const o = Object.fromEntries(f.openings.map((x) => [x.id, x]));
  assert.deepEqual([o.o1.edge, o.o2.edge, o.o3.edge, o.o4.edge], [1, 2, 2, 3]);
  close(o.o2.offset, 1);
  close(o.o3.offset, 3, 1e-6);
  for (const id of Object.keys(before)) closeP(world(p, id), before[id]);
});

test("delete corner 0 wraps the merged edge to the end", () => {
  const p0 = testRoomPlan();
  // move corner 0 onto the line between corner 4 (0,4) and corner 1 (4,0)? use a fresh square with a collinear first corner
  const plan = deepFreeze({
    ...p0,
    floors: [
      {
        ...p0.floors[0],
        rooms: [{ id: "r", points: [[2, 0], [4, 0], [4, 4], [0, 4], [0, 0]], wall_thickness: [0.1, 0.2, 0.3, 0.4, 0.5] }],
        openings: [
          { id: "a", room_id: "r", edge: 0, offset: 1, width: 0.6, type: "window" }, // at (3, 0)
          { id: "b", room_id: "r", edge: 4, offset: 1, width: 0.6, type: "window" }, // at (1, 0)
          { id: "c", room_id: "r", edge: 2, offset: 2, width: 0.6, type: "door" },
        ],
      },
    ],
  });
  const before = Object.fromEntries(["a", "b", "c"].map((id) => [id, world(plan, id)]));
  const p = deleteVertex(plan, F, "r", 0);
  const f = getFloor(p, F);
  assert.deepEqual(f.rooms[0].points, [[4, 0], [4, 4], [0, 4], [0, 0]]);
  assert.deepEqual(f.rooms[0].wall_thickness, [0.2, 0.3, 0.4, 0.5]);
  const o = Object.fromEntries(f.openings.map((x) => [x.id, x]));
  assert.deepEqual([o.a.edge, o.b.edge, o.c.edge], [3, 3, 1]);
  for (const id of Object.keys(before)) closeP(world(p, id), before[id]);
  // a triangle cannot lose a corner
  const tri = deleteVertex(p, F, "r", 0);
  const tri2 = deleteVertex(tri, F, "r", 0);
  assert.equal(getFloor(tri, F).rooms[0].points.length, 3);
  assert.equal(tri2, tri);
});

test("move corner keeps openings on their edges, clamped to the new length", () => {
  const p0 = testRoomPlan();
  // shorten edge 1 (4,0)→(4,4) to (4,0)→(4,1): o1 (offset 2, width 0.8) must stay on the edge
  const p = moveVertex(p0, F, "r", 2, [4, 1]);
  const o1 = getFloor(p, F).openings.find((o) => o.id === "o1");
  assert.equal(o1.edge, 1);
  close(o1.offset, 0.6);
  // moving a corner along an edge keeps the opening in place
  const p2 = moveVertex(p0, F, "r", 2, [4, 4.5]);
  closeP(world(p2, "o1"), world(p0, "o1"));
});

test("move room moves furniture inside, openings follow", () => {
  const p = moveRoom(demo, F, "bedroom", [1, 0.5]);
  const f = getFloor(p, F);
  assert.deepEqual(f.rooms.find((r) => r.id === "bedroom").points[0], [6, 0.5]);
  const bed = f.furniture.find((x) => x.type === "bed");
  const bed0 = demo.floors[0].furniture.find((x) => x.type === "bed");
  close(bed.x, bed0.x + 1);
  close(bed.z, bed0.z + 0.5);
  const sofa = f.furniture.find((x) => x.type === "sofa_l");
  assert.equal(sofa, demo.floors[0].furniture.find((x) => x.type === "sofa_l"));
  closeP(world(p, "w_bed"), [world(demo, "w_bed")[0] + 1, 0.5]);
});

test("wall thickness on a shared edge is set on both rooms", () => {
  const p = setWallThickness(demo, F, "living", 3, 0.24);
  const f = getFloor(p, F);
  assert.equal(f.rooms.find((r) => r.id === "living").wall_thickness[3], 0.24);
  assert.equal(f.rooms.find((r) => r.id === "kitchen").wall_thickness[0], 0.24);
  close(edgeInfo(p, f, "kitchen", 0).thickness, 0.24);
  // thinner than before also works because both sides change
  const p2 = setWallThickness(demo, F, "kitchen", 0, 0.05);
  close(edgeInfo(p2, getFloor(p2, F), "living", 3).thickness, 0.05);
  // null resets to default, a missing array is created
  const r = addRoom(demo, F, [[20, 0], [22, 0], [22, 2], [20, 2]]);
  const p3 = setWallThickness(r.plan, F, r.id, 1, 0.2);
  assert.deepEqual(getFloor(p3, F).rooms.at(-1).wall_thickness, [null, 0.2, null, null]);
  const p4 = setWallThickness(p3, F, r.id, 1, null);
  assert.deepEqual(getFloor(p4, F).rooms.at(-1).wall_thickness, [null, null, null, null]);
});

test("a partly shared neighbour edge keeps its own thickness", () => {
  // a 2 m room next to the bedroom's 4.2 m edge (8.6, 0)→(8.6, 4.2)
  const r = addRoom(demo, F, [[8.6, 0], [10.6, 0], [10.6, 2], [8.6, 2]]);
  const p = setWallThickness(r.plan, F, r.id, 3, 0.2);
  const f = getFloor(p, F);
  assert.equal(f.rooms.at(-1).wall_thickness[3], 0.2);
  assert.equal(f.rooms.find((x) => x.id === "bedroom").wall_thickness[1], 0.3, "bedroom edge unchanged");
  const info = edgeInfo(p, f, r.id, 3);
  assert.deepEqual(info.partial, ["bedroom"]);
  close(info.thickness, 0.3, 1e-9);
});

test("no wall can be set and removed again", () => {
  const p = setNoWall(demo, F, "kitchen", 1, true);
  const f = getFloor(p, F);
  assert.deepEqual(f.rooms.find((r) => r.id === "kitchen").wall_heights, [null, 0, null, null]);
  assert.equal(f.rooms.find((r) => r.id === "hall").wall_heights[3], 0);
  const back = setNoWall(p, F, "kitchen", 1, false);
  assert.equal("wall_heights" in getFloor(back, F).rooms.find((r) => r.id === "kitchen"), false);
});

test("openings: add with defaults, clamp, slide along the edge, update", () => {
  const { plan, id } = addOpening(demo, F, "kitchen", 2, 0.1, "door");
  assert.equal(id, "door_1");
  let o = getFloor(plan, F).openings.at(-1);
  assert.equal(o.width, 0.9);
  close(o.offset, 0.45, 1e-9);
  assert.equal(o.swing, "in");
  const p2 = moveOpeningTo(plan, F, id, [1.23, 7.3]);
  o = getFloor(p2, F).openings.at(-1);
  // kitchen edge 2 runs (3,7)→(0,7): x = 1.23 is 1.77 m from the start → 1.75 on the 5 cm grid
  close(o.offset, 1.75);
  const p3 = updateOpening(p2, F, id, { width: 5, contact: "" });
  o = getFloor(p3, F).openings.at(-1);
  close(o.width, 3);
  close(o.offset, 1.5);
  assert.equal(o.contact, null);
  const short = addOpening(demo, F, "bedroom", 2, 0.6, "window"); // edge length 1.2
  close(getFloor(short.plan, F).openings.at(-1).width, 1.1);
  assert.equal(clampOffset(0, 1, 0.5), 0.25);
});

test("free walls, furniture and background", () => {
  const w = addFreeWall(demo, F, [1, 1], [1, 1.01]);
  assert.equal(w.id, null, "too short");
  const w2 = addFreeWall(demo, F, [1, 1], [2, 1], { thickness: 0.4 });
  assert.equal(getFloor(w2.plan, F).walls.at(-1).thickness, 0.4);
  const fu = addFurniture(demo, F, "armchair", 2, 2);
  const it = getFloor(fu.plan, F).furniture.at(-1);
  assert.deepEqual([it.w, it.d, it.h, it.rotation], [0.85, 0.85, 0.8, 0]);
  const p = updateFurniture(fu.plan, F, fu.id, { rotation: -90, w: "1.2" });
  const it2 = getFloor(p, F).furniture.at(-1);
  assert.equal(it2.rotation, 270);
  assert.equal(it2.w, 1.2);
  const bg = setBackground(demo, F, { image: "data:image/png;base64,AAAA", x: 0, z: 0, width: 9, rotation: 0, opacity: 0.5 });
  const bg2 = updateBackground(bg, F, { opacity: 0.3 });
  assert.equal(getFloor(bg2, F).background.opacity, 0.3);
  assert.equal(getFloor(bg2, F).background.width, 9);
  assert.equal(getFloor(deleteSelection(bg2, F, { kind: "background" }), F).background, null);
});

test("selection helpers: nudge and delete", () => {
  const p = nudgeSelection(demo, F, { kind: "opening", id: "d_living" }, [0.1, 0.3]);
  close(getFloor(p, F).openings.find((o) => o.id === "d_living").offset, 1.1);
  const p2 = nudgeSelection(demo, F, { kind: "corner", id: "living", index: 3 }, [0, 0.05]);
  assert.deepEqual(getFloor(p2, F).rooms[0].points[3], [3, 4.25]);
  const p3 = deleteSelection(demo, F, { kind: "corner", id: "living", index: 3 });
  assert.equal(getFloor(p3, F).rooms[0].points.length, 4);
  const p4 = deleteSelection(demo, F, { kind: "wall", id: "chimney" });
  assert.equal(getFloor(p4, F).walls.length, 0);
  const t = snapTargets(getFloor(demo, F), "living");
  assert.equal(t.vertices.length, 5 + 4 + 4 + 4 + 2);
});

test("no operation changes its input", () => {
  // the demo plan is deep-frozen, so any in-place write would have thrown already
  assert.equal(JSON.stringify(demo), snapshot);
});
