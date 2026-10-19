// Pan and zoom of the editor canvas. A view maps plan metres to screen pixels:
// screen = plan * scale + [tx, ty]. Pure functions, no DOM.

export const MIN_SCALE = 8; // px per metre
export const MAX_SCALE = 800;

export function clampScale(s) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

export function toScreen(view, p) {
  return [p[0] * view.scale + view.tx, p[1] * view.scale + view.ty];
}

export function toPlan(view, s) {
  return [(s[0] - view.tx) / view.scale, (s[1] - view.ty) / view.scale];
}

/** Zoom by factor k keeping the screen point `at` fixed. */
export function zoomAt(view, at, k) {
  const scale = clampScale(view.scale * k);
  const p = toPlan(view, at);
  return { scale, tx: at[0] - p[0] * scale, ty: at[1] - p[1] * scale };
}

export function panBy(view, dx, dy) {
  return { ...view, tx: view.tx + dx, ty: view.ty + dy };
}

/** View that shows bounds {x0, x1, z0, z1} inside a width × height viewport with a pixel margin. */
export function fitBounds(bounds, width, height, margin = 24) {
  const b = bounds || { x0: 0, x1: 10, z0: 0, z1: 8 };
  const bw = Math.max(1, b.x1 - b.x0);
  const bh = Math.max(1, b.z1 - b.z0);
  const w = Math.max(1, width - 2 * margin);
  const h = Math.max(1, height - 2 * margin);
  const scale = clampScale(Math.min(w / bw, h / bh));
  return {
    scale,
    tx: width / 2 - ((b.x0 + b.x1) / 2) * scale,
    ty: height / 2 - ((b.z0 + b.z1) / 2) * scale,
  };
}

/**
 * Two-finger gesture: the plan point under the first midpoint follows the finger midpoint and the
 * zoom follows the finger distance. start/now: [[x, y], [x, y]] screen points.
 */
export function pinchView(startView, start, now) {
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const d0 = d(start[0], start[1]);
  const d1 = d(now[0], now[1]);
  const k = d0 > 1 ? d1 / d0 : 1;
  const m0 = mid(start[0], start[1]);
  const m1 = mid(now[0], now[1]);
  const anchor = toPlan(startView, m0);
  const scale = clampScale(startView.scale * k);
  return { scale, tx: m1[0] - anchor[0] * scale, ty: m1[1] - anchor[1] * scale };
}
