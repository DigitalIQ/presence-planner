// Line icons for the editor toolbar, drawn on a 24 × 24 grid with stroke="currentColor".
import { html } from "lit";

const PATHS = {
  select: "M6 3l12 7-5.5 1.6L15 18l-2.4 1.2-2.6-6.3L6 16.5z",
  room: "M4 5h10l6 5v9H4z",
  wall: "M3 6h18v12H3z M3 12h18 M9 6v6 M15 12v6",
  door: "M5 20h14 M7 20V4h8 M15 4a12 12 0 0 1 3 16 M7 4l8 16",
  window: "M4 5h16v14H4z M12 5v14 M4 12h16",
  freewall: "M5 18L18 5 M8 21L21 8 M5 18l3 3 M18 5l3 3",
  furniture: "M4 11v7h16v-7 M6 11V7h12v4 M4 18v2 M20 18v2 M4 11h3v3h10v-3h3",
  background: "M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1 1 0 1 0 0.01 0",
  measure: "M3 16.5L16.5 3l4.5 4.5L7.5 21z M7 12.5l2 2 M10 9.5l2 2 M13 6.5l2 2",
  undo: "M9 15L4 10l5-5 M4 10h10a5 5 0 0 1 0 10h-3",
  redo: "M15 15l5-5-5-5 M20 10H10a5 5 0 0 0 0 10h3",
  zoomIn: "M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M10.5 7.5v6 M7.5 10.5h6",
  zoomOut: "M10.5 4a6.5 6.5 0 1 0 0.01 0 M15.5 15.5L21 21 M7.5 10.5h6",
  fit: "M4 9V4h5 M15 4h5v5 M20 15v5h-5 M9 20H4v-5",
  plus: "M12 5v14 M5 12h14",
  trash: "M5 7h14 M10 7V4h4v3 M7 7l1 13h8l1-13",
  rotateLeft: "M4 4v5h5 M4.5 9A8 8 0 1 1 6 17",
  rotateRight: "M20 4v5h-5 M19.5 9A8 8 0 1 0 18 17",
  upload: "M12 16V4 M7 9l5-5 5 5 M5 20h14",
  ruler: "M4 18L18 4 M4 18l-1-3 M4 18l3 1 M18 4l3 1 M18 4l-1-3",
  check: "M5 12l5 5 9-10",
  close: "M6 6l12 12 M18 6L6 18",
};

export function icon(name) {
  return html`<svg class="icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"
    fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${PATHS[name] || ""}></path></svg>`;
}
