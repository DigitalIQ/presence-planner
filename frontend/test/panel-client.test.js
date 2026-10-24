// WebSocket client (frontend/src/api/client.js) against a fake connection.
import { test } from "node:test";
import assert from "node:assert/strict";
import { PlannerClient, PlannerError, mapError, normaliseDeviceProfiles } from "../src/api/client.js";

function fakeConnection(handler) {
  const sent = [];
  return {
    sent,
    sendMessagePromise: async (msg) => {
      sent.push(msg);
      return handler(msg);
    },
    subscribeMessage: async (cb, msg) => {
      sent.push(msg);
      cb({ revision: 7 });
      return () => sent.push({ type: "unsub" });
    },
  };
}

test("every command uses the presence_planner prefix and payload", async () => {
  const conn = fakeConnection(() => ({ ok: true }));
  const c = new PlannerClient(conn);
  await c.get();
  await c.saveSensors([{ entity_id: "binary_sensor.a" }]);
  await c.savePlan({ version: 1, floors: [] });
  await c.exportPlan();
  await c.importPlan({ format: "neonplan-import" });
  await c.deviceProfiles();
  assert.deepEqual(conn.sent.map((m) => m.type), [
    "presence_planner/get",
    "presence_planner/save_sensors",
    "presence_planner/save_plan",
    "presence_planner/export",
    "presence_planner/import",
    "presence_planner/device_profiles",
  ]);
  assert.deepEqual(conn.sent[1].sensors, [{ entity_id: "binary_sensor.a" }]);
  assert.deepEqual(conn.sent[2].plan, { version: 1, floors: [] });
  assert.deepEqual(conn.sent[4].data, { format: "neonplan-import" });
});

test("subscribe delivers revision events and returns the unsubscribe function", async () => {
  const conn = fakeConnection(() => ({}));
  const c = new PlannerClient(conn);
  const got = [];
  const unsub = await c.subscribe((ev) => got.push(ev.revision));
  assert.deepEqual(got, [7]);
  assert.equal(conn.sent[0].type, "presence_planner/subscribe");
  unsub();
  assert.equal(conn.sent.at(-1).type, "unsub");
});

test("errors are mapped to codes and i18n keys", async () => {
  const c = new PlannerClient(fakeConnection(() => { throw { code: "unauthorized", message: "Unauthorized" }; }));
  await assert.rejects(c.saveSensors([]), (e) => e instanceof PlannerError && e.code === "unauthorized" && e.i18nKey === "error.unauthorized");
  const c2 = new PlannerClient(fakeConnection(() => { throw { code: "invalid_format", message: "x" }; }));
  await assert.rejects(c2.importPlan({}), (e) => e.i18nKey === "error.invalid_format");
  assert.equal(mapError({ code: "unknown_command", message: "Unknown command." }).i18nKey, "error.not_loaded");
  assert.equal(mapError(new Error("boom")).i18nKey, "error.generic");
});

test("device profile suggestions are normalised", () => {
  assert.deepEqual(normaliseDeviceProfiles({ "binary_sensor.a": "aqara_fp300" }), { "binary_sensor.a": "aqara_fp300" });
  assert.deepEqual(normaliseDeviceProfiles({ profiles: { "binary_sensor.a": { profile: "aqara_p1" } } }), { "binary_sensor.a": "aqara_p1" });
  assert.deepEqual(normaliseDeviceProfiles([{ entity_id: "binary_sensor.b", profile_id: "aqara_fp2" }, { entity_id: "binary_sensor.c" }]), { "binary_sensor.b": "aqara_fp2" });
  assert.deepEqual(normaliseDeviceProfiles(null), {});
});

test("backend error codes map to their own messages", () => {
  for (const code of ["not_loaded", "no_plan", "invalid_format", "invalid_plan", "timeout"]) {
    assert.notEqual(mapError({ code, message: "x" }).i18nKey, "error.generic", code);
  }
  assert.deepEqual(normaliseDeviceProfiles({ suggestions: { "binary_sensor.a": { profile: "aqara_fp300", device: "Aqara FP300" } } }), { "binary_sensor.a": "aqara_fp300" });
});

test("exportPlan sends the plan only when one is given", async () => {
  const conn = fakeConnection(() => ({ ok: true }));
  const c = new PlannerClient(conn);
  await c.exportPlan();
  await c.exportPlan({ version: 1, floors: [] });
  assert.equal("plan" in conn.sent[0], false);
  assert.deepEqual(conn.sent[1].plan, { version: 1, floors: [] });
});
