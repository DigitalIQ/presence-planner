import { test } from "node:test";
import assert from "node:assert/strict";
import { fitBounds, MAX_SCALE, panBy, pinchView, toPlan, toScreen, zoomAt } from "../src/editor/view.js";

const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) <= eps, `${a} != ${b}`);

test("toScreen and toPlan are inverse", () => {
  const v = { scale: 50, tx: 10, ty: -20 };
  const p = toPlan(v, toScreen(v, [3.2, 1.1]));
  close(p[0], 3.2);
  close(p[1], 1.1);
});

test("zoomAt keeps the point under the cursor", () => {
  const v = { scale: 50, tx: 0, ty: 0 };
  const at = [200, 100];
  const before = toPlan(v, at);
  const z = zoomAt(v, at, 2);
  close(z.scale, 100);
  const after = toPlan(z, at);
  close(after[0], before[0]);
  close(after[1], before[1]);
  assert.equal(zoomAt({ scale: MAX_SCALE, tx: 0, ty: 0 }, at, 4).scale, MAX_SCALE);
  assert.equal(panBy(v, 5, 6).tx, 5);
});

test("fitBounds centres the bounds", () => {
  const v = fitBounds({ x0: 0, x1: 8.6, z0: 0, z1: 7 }, 400, 300, 20);
  const c = toScreen(v, [4.3, 3.5]);
  close(c[0], 200);
  close(c[1], 150);
  assert.ok(8.6 * v.scale <= 360 + 1e-6 && 7 * v.scale <= 260 + 1e-6);
});

test("pinch zooms with the finger distance and pans with the midpoint", () => {
  const v = { scale: 40, tx: 0, ty: 0 };
  const start = [[100, 100], [200, 100]];
  const now = [[80, 120], [280, 120]];
  const out = pinchView(v, start, now);
  close(out.scale, 80);
  const anchor = toPlan(v, [150, 100]);
  const s = toScreen(out, anchor);
  close(s[0], 180);
  close(s[1], 120);
});
