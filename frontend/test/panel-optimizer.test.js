// Optimizer worker runner (frontend/src/panel/optimizer.js) with a fake worker.
import { test } from "node:test";
import assert from "node:assert/strict";
import { OptimizerRunner, workerUrl, WORKER_PATH } from "../src/panel/optimizer.js";

class FakeWorker {
  constructor(reply) {
    this.reply = reply;
    this.posted = [];
    this.terminated = false;
  }
  postMessage(msg) {
    this.posted.push(msg);
    queueMicrotask(() => this.reply(msg, (data) => this.onmessage({ data })));
  }
  terminate() {
    this.terminated = true;
  }
}

test("runs one request per room and reports progress", async () => {
  const worker = new FakeWorker((msg, send) => {
    send({ id: msg.id, progress: 0.5 });
    send({ id: msg.id, result: [{ x: 1, z: 2, room: msg.roomId }] });
  });
  const r = new OptimizerRunner({ createWorker: () => worker });
  const progress = [];
  const out = await r.run({ plan: {}, floorId: "f1", roomIds: ["a", "b"], profileId: "aqara_fp300", opts: { cell: 0.2 }, weight: 1 }, (p) => progress.push(p));
  assert.deepEqual(Object.keys(out), ["a", "b"]);
  assert.equal(out.b[0].room, "b");
  assert.equal(worker.posted[0].type, "optimize");
  assert.equal(worker.posted[0].roomId, "a");
  assert.equal(worker.posted[0].profileId, "aqara_fp300");
  assert.equal(progress.at(-1), 1);
  assert.ok(progress.includes(0.25));
});

test("errors per room are kept, other rooms continue", async () => {
  const worker = new FakeWorker((msg, send) => {
    if (msg.roomId === "a") send({ id: msg.id, error: "bad room" });
    else send({ id: msg.id, type: "result", results: [] });
  });
  const out = await new OptimizerRunner({ createWorker: () => worker }).run({ roomIds: ["a", "b"] });
  assert.deepEqual(out.a, { error: "bad room" });
  assert.deepEqual(out.b, []);
});

test("falls back to the main thread when no worker can be created", async () => {
  const r = new OptimizerRunner({ createWorker: () => { throw new Error("no workers"); }, fallback: (req) => [{ room: req.roomId }] });
  const out = await r.run({ roomIds: ["x"] });
  assert.deepEqual(out.x, [{ room: "x" }]);
});

test("cancel terminates the worker and stops the run", async () => {
  let worker;
  const r = new OptimizerRunner({ createWorker: () => (worker = new FakeWorker(() => {})) });
  const p = r.run({ roomIds: ["a", "b"] });
  await new Promise((res) => setTimeout(res, 5));
  r.cancel();
  const out = await p;
  assert.equal(worker.terminated, true);
  assert.deepEqual(out, {});
});

test("worker URL sits next to the bundle", () => {
  assert.equal(workerUrl("http://ha.local:8123/presence_planner/frontend/presence-planner-panel.js?v=3"), "http://ha.local:8123/presence_planner/frontend/presence-planner-worker.js?v=3");
  assert.equal(workerUrl("file:///x/index.js"), WORKER_PATH);
  assert.equal(workerUrl(undefined), WORKER_PATH);
});
