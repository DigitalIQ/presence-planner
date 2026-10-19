// Undo/redo stack for immutable plans. Pure functions; every call returns a new history object.

export const HISTORY_LIMIT = 100;

export function createHistory(present, limit = HISTORY_LIMIT) {
  return { past: [], present, future: [], limit };
}

/** Record a new state. Same reference as the present state is ignored; the redo branch is dropped. */
export function pushState(h, next) {
  if (next === h.present) return h;
  const past = [...h.past, h.present];
  while (past.length > h.limit) past.shift();
  return { ...h, past, present: next, future: [] };
}

export function canUndo(h) {
  return h.past.length > 0;
}

export function canRedo(h) {
  return h.future.length > 0;
}

export function undo(h) {
  if (!canUndo(h)) return h;
  const past = h.past.slice(0, -1);
  return { ...h, past, present: h.past[h.past.length - 1], future: [h.present, ...h.future] };
}

export function redo(h) {
  if (!canRedo(h)) return h;
  const [next, ...future] = h.future;
  return { ...h, past: [...h.past, h.present], present: next, future };
}

/** Replace the present state without an undo step (e.g. the host sent an equal plan). */
export function replacePresent(h, present) {
  return { ...h, present };
}
