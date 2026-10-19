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
  await c.linkNeonplan();
  await c.deviceProfiles();
  assert.deepEqual(conn.sent.map((m) => m.type), [
    "presence_planner/get",
    "presence_planner/save_sensors",
    "presence_planner/save_plan",
    "presence_planner/export",
    "presence_planner/import",
    "presence_planner/link_neonplan",
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
  const c2 = new PlannerClient(fakeConnection(() => { throw { code: "neonplan_incompatible", message: "x" }; }));
  await assert.rejects(c2.get(), (e) => e.i18nKey === "error.neonplan_incompatible");
  assert.equal(mapError({ code: "home_assistant_error", message: "neonplan_incompatible: storage v9" }).code, "neonplan_incompatible");
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
  for (const code of ["not_loaded", "neonplan_rejected", "neonplan_unavailable", "no_plan", "invalid_format"]) {
    assert.notEqual(mapError({ code, message: "x" }).i18nKey, "error.generic", code);
  }
  assert.deepEqual(normaliseDeviceProfiles({ suggestions: { "binary_sensor.a": { profile: "aqara_fp300", device: "Aqara FP300" } } }), { "binary_sensor.a": "aqara_fp300" });
});
