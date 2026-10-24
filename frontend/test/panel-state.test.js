// Pure panel state logic (frontend/src/panel/state.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import * as S from "../src/panel/state.js";

const demo = JSON.parse(readFileSync(new URL("../../shared/demo-plan.json", import.meta.url)));
const profiles = JSON.parse(readFileSync(new URL("../../shared/profiles.json", import.meta.url)));
const floorId = demo.plan.floors[0].id;

const sensor = (over = {}) => ({ entity_id: "binary_sensor.a", floor_id: floorId, x: 1, z: 1, height: 1.9, phi: 0, tilt: 10, mount: "wall", profile: "aqara_fp300", fov_h: 120, fov_v: 90, reach: 6, active: true, ...over });
const loaded = (sensors = [sensor()], extra = {}) => S.applyLoad(S.initialState(), { revision: 3, plan: demo.plan, sensors, profiles, options: { thin_db: 12 }, neonplan: { installed: true, linked: false }, ...extra });

test("applyLoad sets plan, floor, selection and options", () => {
  const st = loaded();
  assert.equal(st.loading, false);
  assert.equal(st.floorId, floorId);
  assert.equal(st.selected, "binary_sensor.a");
  assert.equal(st.thinDb, 12);
  assert.equal(st.dirty, false);
  assert.notEqual(st.editPlan, st.plan);
  assert.deepEqual(st.editPlan, st.plan);
});

test("applyLoad keeps the editor tab", () => {
  const st = S.applyLoad({ ...S.initialState(), tab: "editor" }, { plan: demo.plan, sensors: [] });
  assert.equal(st.tab, "editor");
});

test("updateSensor cleans values and marks dirty", () => {
  let st = loaded();
  st = S.updateSensor(st, "binary_sensor.a", { phi: -5, height: "9", reach: "abc", fov_h: 1 });
  const s = S.getSensor(st, "binary_sensor.a");
  assert.equal(s.phi, 355);
  assert.equal(s.height, 4);
  assert.equal(s.reach, 6);
  assert.equal(s.fov_h, 10);
  assert.equal(st.dirty, true);
});

test("updateSensor without change returns the same state", () => {
  const st = loaded();
  assert.equal(S.updateSensor(st, "binary_sensor.a", { x: 1 }), st);
});

test("resetChanges restores the loaded sensors", () => {
  let st = loaded();
  st = S.updateSensor(st, "binary_sensor.a", { x: 2.5 });
  st = S.resetChanges(st);
  assert.equal(S.getSensor(st, "binary_sensor.a").x, 1);
  assert.equal(st.dirty, false);
});

test("setProfile takes fov and reach from the profile; null fov_v uses the default", () => {
  let st = loaded([sensor({ profile: "custom", fov_h: 50, reach: 2 })]);
  st = S.setProfile(st, "binary_sensor.a", "aqara_fp400");
  const s = S.getSensor(st, "binary_sensor.a");
  assert.equal(s.profile, "aqara_fp400");
  assert.equal(s.fov_h, 120);
  assert.equal(s.reach, 10);
  assert.equal(s.fov_v, 90);
});

test("setProfile switches to a supported mount", () => {
  let st = loaded([sensor({ mount: "ceiling", profile: "aqara_fp300" })]);
  st = S.setProfile(st, "binary_sensor.a", "everything_presence_one");
  assert.equal(S.getSensor(st, "binary_sensor.a").mount, "wall");
});

test("setMount ceiling uses room height, tilt 90 and the ceiling profile values", () => {
  let st = loaded([sensor({ profile: "aqara_fp400" })]);
  st = S.setMount(st, "binary_sensor.a", "ceiling", 2.6);
  let s = S.getSensor(st, "binary_sensor.a");
  assert.equal(s.tilt, 90);
  assert.equal(s.height, 2.6);
  assert.equal(s.reach, 4);
  st = S.setMount(st, "binary_sensor.a", "wall");
  s = S.getSensor(st, "binary_sensor.a");
  assert.equal(s.tilt, 10);
  assert.equal(s.height, 1.9);
  assert.equal(s.reach, 10);
});

test("newSensor and addSensor", () => {
  const st0 = loaded([]);
  const s = S.newSensor("binary_sensor.new", { floorId, x: 1.23456, z: 2, profileId: "aqara_p1", profiles });
  assert.equal(s.x, 1.235);
  assert.equal(s.profile, "aqara_p1");
  assert.equal(s.reach, 7);
  assert.equal(s.height, 1.9);
  const st = S.addSensor(st0, s);
  assert.equal(st.selected, "binary_sensor.new");
  assert.equal(st.dirty, true);
  assert.equal(S.addSensor(st, s), st, "no duplicates");
});

test("unknown profile id falls back to custom", () => {
  const s = S.newSensor("binary_sensor.x", { floorId, x: 0, z: 0, profileId: "nope", profiles });
  assert.equal(s.profile, "custom");
});

test("removeSensor moves the selection", () => {
  let st = loaded([sensor(), sensor({ entity_id: "binary_sensor.b" })]);
  st = S.removeSensor(st, "binary_sensor.a");
  assert.equal(st.selected, "binary_sensor.b");
  assert.equal(st.sensors.length, 1);
});

test("doorsOption: open, closed and live from contact states", () => {
  const floor = { openings: [
    { id: "d1", type: "door", contact: "binary_sensor.c1" },
    { id: "d2", type: "door", contact: "binary_sensor.c2" },
    { id: "d3", type: "door" },
    { id: "w1", type: "window", contact: "binary_sensor.w" },
  ] };
  const states = { "binary_sensor.c1": { state: "on" }, "binary_sensor.c2": { state: "off" } };
  assert.equal(S.doorsOption("open", floor, states), "open");
  assert.equal(S.doorsOption("closed", floor, states), "closed");
  assert.deepEqual(S.doorsOption("live", floor, states), { d1: true, d2: false, d3: true });
});

test("coreOptions full and fast", () => {
  const st = { ...loaded(), height: 0.9, thinDb: 8 };
  const full = S.coreOptions(st, {});
  assert.deepEqual(full, { heights: [0.5, 0.9, 1.3], doors: "open", thin_db: 8, cell: 0.1, grid: true });
  const fast = S.coreOptions(st, {}, { fast: true });
  assert.deepEqual(fast.heights, [0.9]);
  assert.equal(fast.cell, 0.2);
});

test("sensorCandidates lists unplaced presence, occupancy and motion sensors", () => {
  const states = {
    "binary_sensor.a": { state: "off", attributes: { device_class: "presence", friendly_name: "A" } },
    "binary_sensor.b": { state: "off", attributes: { device_class: "motion", friendly_name: "Bath" } },
    "binary_sensor.c": { state: "off", attributes: { device_class: "occupancy" } },
    "binary_sensor.door": { state: "off", attributes: { device_class: "door" } },
    "sensor.lux": { state: "3", attributes: { device_class: "illuminance" } },
  };
  const c = S.sensorCandidates(states, [sensor()]);
  assert.deepEqual(c.map((x) => x.entity_id), ["binary_sensor.b", "binary_sensor.c"]);
});

test("keyPatch moves and rotates", () => {
  const s = sensor({ x: 1, z: 1, phi: 2 });
  assert.deepEqual(S.keyPatch(s, "ArrowLeft"), { x: 0.95 });
  assert.deepEqual(S.keyPatch(s, "ArrowDown", true), { z: 1.01 });
  assert.deepEqual(S.keyPatch(s, "q"), { phi: 357 });
  assert.deepEqual(S.keyPatch(s, "E", true), { phi: 3 });
  assert.equal(S.keyPatch(s, "x"), null);
});

test("remote revision: reload when clean, banner when dirty, ignore own revision", () => {
  const st = loaded();
  assert.equal(S.onRemoteRevision(st, 3).reload, false);
  assert.equal(S.onRemoteRevision(st, 4).reload, true);
  const dirty = S.updateSensor(st, "binary_sensor.a", { x: 2 });
  const r = S.onRemoteRevision(dirty, 4);
  assert.equal(r.reload, false);
  assert.equal(r.state.remoteChanged, true);
});

test("sensorsForSave rounds values and drops derived flags", () => {
  const st = loaded([sensor({ x: 1.23456, phi: 361.4, fov_v_assumed: true })]);
  const [s] = S.sensorsForSave(st);
  assert.equal(s.x, 1.235);
  assert.equal(s.phi, 1);
  assert.equal("fov_v_assumed" in s, false);
});

test("applyCandidate and optimizerTarget", () => {
  let st = loaded([sensor(), sensor({ entity_id: "binary_sensor.b", x: 6 })]);
  const roomOf = (s) => (s.x < 5 ? "living" : "bedroom");
  assert.equal(S.optimizerTarget(st, "living", roomOf), "binary_sensor.a");
  assert.equal(S.optimizerTarget(st, "bedroom", roomOf), "binary_sensor.b");
  st = S.applyCandidate(st, "binary_sensor.b", { x: 7, z: 0.2, height: 1.9, phi: 90, tilt: 10, mount: "wall" });
  const b = S.getSensor(st, "binary_sensor.b");
  assert.equal(b.x, 7);
  assert.equal(b.phi, 90);
});

test("profileList accepts dict, list and map", () => {
  assert.equal(S.profileList(profiles).length, profiles.profiles.length);
  assert.equal(S.profileList(profiles.profiles).length, profiles.profiles.length);
  assert.equal(S.profileList({ a: { name: "A" } })[0].id, "a");
  assert.equal(S.profileDict(profiles.profiles).default_fov_v, 90);
});

test("cycleSelection wraps around", () => {
  let st = loaded([sensor(), sensor({ entity_id: "binary_sensor.b" })]);
  st = S.cycleSelection(st, 1);
  assert.equal(st.selected, "binary_sensor.b");
  st = S.cycleSelection(st, 1);
  assert.equal(st.selected, "binary_sensor.a");
});
