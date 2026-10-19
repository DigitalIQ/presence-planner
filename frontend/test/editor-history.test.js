import { test } from "node:test";
import assert from "node:assert/strict";
import { canRedo, canUndo, createHistory, pushState, redo, replacePresent, undo } from "../src/editor/history.js";

test("undo and redo walk the stack", () => {
  let h = createHistory("a");
  assert.equal(canUndo(h), false);
  h = pushState(h, "b");
  h = pushState(h, "c");
  assert.equal(h.present, "c");
  h = undo(h);
  assert.equal(h.present, "b");
  assert.equal(canRedo(h), true);
  h = undo(h);
  assert.equal(h.present, "a");
  assert.equal(undo(h), h, "undo at the start is a no-op");
  h = redo(h);
  h = redo(h);
  assert.equal(h.present, "c");
  assert.equal(redo(h), h);
});

test("a new edit drops the redo branch", () => {
  let h = createHistory(1);
  h = pushState(h, 2);
  h = pushState(h, 3);
  h = undo(h);
  h = pushState(h, 4);
  assert.equal(canRedo(h), false);
  assert.deepEqual(h.past, [1, 2]);
  assert.equal(h.present, 4);
});

test("pushing the same state is ignored and the limit holds", () => {
  const x = { a: 1 };
  let h = createHistory(x, 3);
  assert.equal(pushState(h, x), h);
  for (let i = 0; i < 10; i++) h = pushState(h, i);
  assert.equal(h.past.length, 3);
  assert.deepEqual(h.past, [6, 7, 8]);
  const h2 = replacePresent(h, 99);
  assert.equal(h2.present, 99);
  assert.deepEqual(h2.past, h.past);
  assert.equal(h.present, 9, "pure");
});
