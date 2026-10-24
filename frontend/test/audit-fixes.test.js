// Regression tests for the frontend audit findings (panel state, panel class with a fake client, core parity).
import test from "node:test";
import assert from "node:assert/strict";
import { buildModel } from "../src/core/index.js";
import { twoRooms } from "./core-helpers.js";
import * as S from "../src/panel/state.js";
import { PresencePlannerPanel } from "../src/panel/index.js";

const plan = () => ({ version: 1, floors: [{ id: "f", rooms: [{ id: "r", points: [[0, 0], [2, 0], [2, 2], [0, 2]] }] }] });
const sensor = (over = {}) => ({ entity_id: "binary_sensor.a", floor_id: "f", x: 1, z: 1, ...over });
const response = (over = {}) => ({ plan: plan(), revision: 1, sensors: [sensor()], ...over });

/** A panel without rendering: evaluation is stubbed, the client is a fake. */
function makePanel(client, res = response()) {
  const panel = new PresencePlannerPanel();
  panel._scheduleEval = () => {};
  panel._client = client;
  panel._s = S.applyLoad(S.initialState(), res);
  panel._rebuildModel();
  return panel;
}
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((a, b) => { resolve = a; reject = b; });
  return { promise, resolve, reject };
};

/* 1. equal revisions are no shortcut */

test("a remote event with the panel's own revision number still reloads (revision restarts at 0)", () => {
  const st = S.applyLoad(S.initialState(), response({ revision: 0 }));
  assert.equal(S.onRemoteRevision(st, 0).reload, true);
  const dirty = S.updateSensor(st, "binary_sensor.a", { x: 2 });
  assert.equal(S.onRemoteRevision(dirty, 0).state.remoteChanged, true);
});

test("events during the panel's own save do not trigger a reload", async () => {
  const gate = deferred();
  let loads = 0;
  let onEvent;
  const client = {
    subscribe: async (cb) => { onEvent = cb; return () => {}; },
    savePlan: async () => ({ revision: 2 }),
    saveSensors: () => gate.promise,
    get: async () => { loads++; return response({ revision: 2 }); },
  };
  const panel = makePanel(client);
  await panel._subscribe();
  panel._s = S.updateSensor(panel._s, "binary_sensor.a", { x: 1.5 });
  const saving = panel.save();
  onEvent({ revision: 2 });
  assert.equal(loads, 0);
  gate.resolve({ revision: 2 });
  await saving;
  assert.equal(loads, 1); // only the load that save() does itself
});

/* 2. edits during load and save */

test("_load does not wipe edits made while the request was running", async () => {
  const gate = deferred();
  const panel = makePanel({ get: () => gate.promise });
  const loading = panel._load();
  panel.patchSensor("binary_sensor.a", { x: 1.5 });
  gate.resolve(response({ revision: 5, sensors: [sensor({ x: 0.3 })] }));
  assert.equal(await loading, true);
  assert.equal(S.getSensor(panel._s, "binary_sensor.a").x, 1.5);
  assert.equal(panel._s.dirty, true);
  assert.equal(panel._s.remoteChanged, true);
  assert.equal(panel._status, null);
});

test("a plan drawn during the first load is kept without a false 'changed elsewhere' banner", async () => {
  const gate = deferred();
  const panel = new PresencePlannerPanel();
  panel._scheduleEval = () => {};
  panel._client = { get: () => gate.promise };
  const loading = panel._load();
  panel._startOwnPlan();
  gate.resolve({ plan: null, sensors: [], revision: 0, profiles: { version: 1, profiles: [] } });
  await loading;
  assert.equal(panel._s.editPlan.floors[0].id, "f1");
  assert.equal(panel._s.remoteChanged, false);
  assert.equal(panel._s.loading, false);
});

test("save sends and marks one snapshot; edits made during the save stay unsaved", async () => {
  const gate = deferred();
  const sentPayloads = [];
  let loads = 0;
  const client = {
    saveSensors: (sensors) => { sentPayloads.push(sensors); return gate.promise; },
    get: async () => { loads++; return response(); },
  };
  const panel = makePanel(client);
  panel.patchSensor("binary_sensor.a", { x: 1.5 });
  const saving = panel.save();
  panel.patchSensor("binary_sensor.a", { x: 1.9 });
  gate.resolve({ revision: 2 });
  await saving;
  assert.equal(sentPayloads[0][0].x, 1.5);
  assert.equal(S.getSensor(panel._s, "binary_sensor.a").x, 1.9);
  assert.equal(panel._s.dirty, true);
  assert.equal(panel._s.savedSensors[0].x, 1.5);
  assert.equal(panel._s.revision, 2);
  assert.equal(loads, 0); // a reload would have wiped the newer edit
  assert.equal(panel._status.key, "status.saved");
});

test("a failed second request still marks the plan that was saved", async () => {
  const client = { savePlan: async () => ({ revision: 2 }), saveSensors: async () => { throw { code: "invalid_plan", message: "no" }; } };
  const panel = makePanel(client);
  panel._onPlanChanged({ detail: { plan: { ...plan(), floors: [{ ...plan().floors[0], name: "x" }] } } });
  panel.patchSensor("binary_sensor.a", { x: 1.5 });
  await panel.save();
  assert.equal(panel._s.planDirty, false);
  assert.equal(panel._s.dirty, true);
  assert.equal(panel._status.error, true);
});

/* 3. weight invalidates the optimizer */

test("changing the weight cancels a running optimizer and drops its result", async () => {
  const panel = makePanel(null);
  let finish;
  let cancelled = 0;
  panel._runner = { cancel() { cancelled++; }, run() { return new Promise((r) => { finish = r; }); } };
  const running = panel.runOptimizer(true);
  assert.equal(panel._opt.running, true);
  panel.setOption("weight", 2);
  assert.equal(panel._opt.running, false);
  assert.ok(cancelled >= 1);
  finish({ r: [{ x: 90, z: 90, height: 1.9, phi: 0, tilt: 10 }] });
  await running;
  assert.equal(panel._opt.results, null);
  assert.equal(panel._s.weight, 2);
});

/* 4. sensors of a deleted floor */

test("deleting a floor drops its sensors and marks the sensor list changed", () => {
  const p = plan();
  p.floors.push({ id: "g", rooms: [] });
  let st = S.applyLoad(S.initialState(), { plan: p, revision: 1, sensors: [sensor(), sensor({ entity_id: "binary_sensor.g", floor_id: "g" })] });
  st = S.selectFloor(st, "g");
  assert.equal(st.selected, "binary_sensor.g");
  st = S.setEditPlan(st, { ...p, floors: [p.floors[0]] });
  assert.deepEqual(st.sensors.map((s) => s.entity_id), ["binary_sensor.a"]);
  assert.equal(st.dirty, true);
  assert.equal(st.selected, null);
  assert.equal(S.resetChanges(st).sensors.length, 2);
  // an edit that keeps all floors does not touch the sensors
  const same = S.setEditPlan(S.applyLoad(S.initialState(), response()), plan());
  assert.equal(same.dirty, false);
});

test("the editor event drops sensors of a deleted floor in the panel", () => {
  const p = plan();
  p.floors.push({ id: "g", rooms: [] });
  const panel = makePanel(null, { plan: p, revision: 1, sensors: [sensor({ floor_id: "g" })] });
  panel._onPlanChanged({ detail: { plan: { ...p, floors: [p.floors[0]] } } });
  assert.equal(panel._s.sensors.length, 0);
  assert.equal(panel._s.floorId, "f");
});

/* 5. subscription lifecycle */

test("a subscription that resolves after a disconnect is released, not leaked", async () => {
  const gate = deferred();
  let released = 0;
  const panel = makePanel({ subscribe: () => gate.promise });
  const subscribing = panel._subscribe();
  panel._unsubscribe(); // what disconnectedCallback does
  gate.resolve(() => { released++; });
  await subscribing;
  assert.equal(released, 1);
  assert.equal(panel._unsub, null);
});

test("a second subscribe while one is pending does not subscribe twice", async () => {
  const gate = deferred();
  let calls = 0;
  const panel = makePanel({ subscribe: () => { calls++; return gate.promise; } });
  const first = panel._subscribe();
  await panel._subscribe();
  gate.resolve(() => {});
  await first;
  assert.equal(calls, 1);
  assert.equal(typeof panel._unsub, "function");
});

test("after a re-attach a clean panel reloads and a dirty one only flags a newer revision", async () => {
  let loads = 0;
  const panel = makePanel({ get: async () => { loads++; return response({ revision: 7 }); } });
  await panel._resync();
  assert.equal(loads, 1);
  assert.equal(panel._s.revision, 7);
  panel.patchSensor("binary_sensor.a", { x: 1.5 });
  await panel._resync();
  assert.equal(panel._s.remoteChanged, false); // same revision 7, nothing missed
  panel._s = { ...panel._s, revision: 3 };
  await panel._resync();
  assert.equal(panel._s.remoteChanged, true);
  assert.equal(S.getSensor(panel._s, "binary_sensor.a").x, 1.5);
});

/* 6. import warnings */

function importPanel(client) {
  const panel = makePanel(client);
  globalThis.window = { confirm: () => true };
  return panel;
}
const fileEvent = (data) => ({ target: { files: [{ text: async () => JSON.stringify(data) }], value: "x" } });

test("import keeps the warnings of the server", async () => {
  const panel = importPanel({
    importPlan: async () => ({ plan: plan(), sensors: [], warnings: ["room_skipped", "room_skipped", "door_not_on_edge"] }),
    get: async () => response({ revision: 2 }),
  });
  await panel._importFile(fileEvent({ x: 1 }));
  assert.deepEqual(S.groupWarnings(panel._importWarnings), [{ code: "room_skipped", count: 2 }, { code: "door_not_on_edge", count: 1 }]);
  assert.equal(panel._status.key, "status.imported");
});

test("import does not claim success when the reload failed", async () => {
  const panel = importPanel({
    importPlan: async () => ({ plan: plan(), sensors: [], warnings: [] }),
    get: async () => { throw { code: "timeout", message: "late" }; },
  });
  await panel._importFile(fileEvent({ x: 1 }));
  assert.equal(panel._status.error, true);
  assert.equal(panel._status.key, "error.timeout");
});

/* 7. own plan before the first save */

test("a plan drawn locally leaves the saved baseline null; Reset returns to the empty state", () => {
  const panel = new PresencePlannerPanel();
  panel._scheduleEval = () => {};
  panel._s = { ...S.applyLoad(S.initialState(), { plan: null, sensors: [], revision: 0 }) };
  panel._startOwnPlan();
  assert.equal(panel._s.plan, null);
  assert.equal(S.hasPlan(panel._s), true);
  assert.equal(panel._s.planDirty, true);
  panel.reset();
  assert.equal(S.hasPlan(panel._s), false);
  assert.equal(panel._s.floorId, null);
});

/* 8. model error status */

test("a model error status disappears once the next rebuild works", () => {
  const panel = makePanel(null);
  const bad = plan();
  bad.floors[0].rooms[0].points[1][0] = 1e100;
  panel._s = { ...panel._s, editPlan: bad };
  panel._rebuildModel();
  assert.equal(panel._status.key, "error.model");
  panel._s = { ...panel._s, editPlan: plan() };
  panel._rebuildModel();
  assert.equal(panel._status, null);
  assert.ok(panel._model);
});

test("an evaluation error status disappears once an evaluation works", () => {
  const panel = makePanel(null);
  panel._status = { key: "error.model", error: true, detail: "x" };
  panel._runEval(true);
  assert.equal(panel._status, null);
  panel._status = { key: "status.saved" };
  panel._runEval(true);
  assert.equal(panel._status.key, "status.saved"); // other statuses stay
});

/* 9. parity: a no-wall piece removes the faces of the whole shared wall */

test("buildModel: one no-wall piece removes the faces of its sibling on the shared wall (as in Python)", () => {
  const p = twoRooms();
  p.floors[0].rooms[0].wall_heights = [null, 0, null, null];
  const m = buildModel(p, "f");
  assert.equal(m.faces.some((fc) => fc.room === "A" && fc.a[0] === 6 && fc.b[0] === 6), false);
  assert.equal(m.faces.some((fc) => fc.room === "B" && fc.a[0] === 6 && fc.b[0] === 6), false);
  assert.equal(m.segments.some((s) => s.shared), false);
  // the rest of the walls keep their faces
  assert.ok(m.faces.some((fc) => fc.room === "B"));
});

/* 10. export with unsaved edits */

function exportPanel(admin, mutate) {
  const calls = [];
  const panel = makePanel({ exportPlan: async (plan) => { calls.push(plan); return { format: "x" }; } });
  panel.hass = { user: { is_admin: admin } };
  globalThis.document = { createElement: () => ({ click() {}, remove() {} }), body: { appendChild() {} } };
  globalThis.URL.createObjectURL = () => "blob:x";
  globalThis.URL.revokeObjectURL = () => {};
  mutate(panel);
  return { panel, calls };
}
const editPlan = (panel) => panel._onPlanChanged({ detail: { plan: { ...plan(), floors: [{ ...plan().floors[0], name: "edited" }] } } });

test("export sends unsaved plan edits for admins", async () => {
  const { panel, calls } = exportPanel(true, editPlan);
  await panel.exportPlan();
  assert.equal(calls[0].floors[0].name, "edited");
  assert.equal(panel._status.key, "status.exported");
});

test("export warns non-admins and sensor edits that unsaved changes are not in the file", async () => {
  let r = exportPanel(false, editPlan);
  await r.panel.exportPlan();
  assert.equal(r.calls[0], undefined);
  assert.equal(r.panel._status.key, "status.exported_unsaved");
  r = exportPanel(true, (p) => p.patchSensor("binary_sensor.a", { x: 1.5 }));
  await r.panel.exportPlan();
  assert.equal(r.calls[0], undefined);
  assert.equal(r.panel._status.key, "status.exported_unsaved");
  r = exportPanel(true, () => {});
  await r.panel.exportPlan();
  assert.equal(r.panel._status.key, "status.exported");
});
