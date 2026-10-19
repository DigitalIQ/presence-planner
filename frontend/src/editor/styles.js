// Styles of <pp-editor>. Colours come from the Home Assistant theme variables; the fallbacks
// apply outside HA (light by default, dark with the `dark` attribute).
import { css } from "lit";

export const editorStyles = css`
  :host {
    --pp-text: var(--primary-text-color, #1f2328);
    --pp-muted: var(--secondary-text-color, #5f6b76);
    --pp-surface: var(--card-background-color, #ffffff);
    --pp-canvas: var(--primary-background-color, #f4f5f7);
    --pp-divider: var(--divider-color, rgba(0, 0, 0, 0.14));
    --pp-accent: var(--primary-color, #03a9f4);
    --pp-error: var(--error-color, #db4437);
    --pp-wall: var(--pp-text);
    display: block;
    container-type: inline-size;
    color: var(--pp-text);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, system-ui, sans-serif));
    font-size: 14px;
    min-width: 0;
  }
  :host([dark]) {
    --pp-text: var(--primary-text-color, #e3e6ea);
    --pp-muted: var(--secondary-text-color, #9aa4ae);
    --pp-surface: var(--card-background-color, #1f2226);
    --pp-canvas: var(--primary-background-color, #121416);
    --pp-divider: var(--divider-color, rgba(255, 255, 255, 0.16));
  }
  * {
    box-sizing: border-box;
  }
  .root {
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    min-height: 0;
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }
  .toolbar {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: thin;
    padding: 2px;
  }
  .sep {
    flex: 0 0 1px;
    align-self: stretch;
    background: var(--pp-divider);
    margin: 0 2px;
  }
  button,
  select,
  input,
  label.file {
    font: inherit;
    color: inherit;
  }
  button,
  label.file {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-height: 36px;
    padding: 4px 10px;
    border: 1px solid var(--pp-divider);
    border-radius: 8px;
    background: var(--pp-surface);
    cursor: pointer;
    white-space: nowrap;
    touch-action: manipulation;
  }
  .tool {
    flex-direction: column;
    gap: 2px;
    min-width: 58px;
    padding: 4px 6px;
    font-size: 12px;
  }
  button[aria-pressed="true"] {
    background: color-mix(in srgb, var(--pp-accent) 18%, var(--pp-surface));
    border-color: var(--pp-accent);
    color: var(--pp-text);
  }
  button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  button.danger {
    color: var(--pp-error);
    border-color: color-mix(in srgb, var(--pp-error) 50%, var(--pp-divider));
  }
  button.primary {
    background: var(--pp-accent);
    border-color: var(--pp-accent);
    color: var(--text-primary-color, #fff);
  }
  button:focus-visible,
  select:focus-visible,
  input:focus-visible,
  label.file:focus-within,
  .canvas:focus-visible {
    outline: 2px solid var(--pp-accent);
    outline-offset: 2px;
  }
  select,
  input[type="text"] {
    min-height: 36px;
    padding: 4px 8px;
    border: 1px solid var(--pp-divider);
    border-radius: 8px;
    background: var(--pp-surface);
    min-width: 0;
    width: 100%;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--pp-accent);
  }
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--pp-accent);
  }
  .floor-select {
    width: auto;
    max-width: 220px;
  }
  .main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 290px;
    gap: 8px;
    flex: 1 1 auto;
    min-height: 0;
  }
  @container (max-width: 700px) {
    .main {
      grid-template-columns: minmax(0, 1fr);
    }
    .tool span {
      font-size: 11px;
    }
  }
  .canvas {
    position: relative;
    min-height: 320px;
    height: var(--pp-editor-canvas-height, min(70vh, 640px));
    border: 1px solid var(--pp-divider);
    border-radius: 12px;
    background: var(--pp-canvas);
    overflow: hidden;
    outline: none;
  }
  .canvas svg.plan {
    display: block;
    width: 100%;
    height: 100%;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .canvas.tool-room svg.plan,
  .canvas.tool-freewall svg.plan,
  .canvas.tool-door svg.plan,
  .canvas.tool-window svg.plan,
  .canvas.tool-furniture svg.plan,
  .canvas.calib svg.plan {
    cursor: crosshair;
  }
  .canvas.panning svg.plan {
    cursor: grabbing;
  }
  .zoom {
    position: absolute;
    right: 8px;
    bottom: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .zoom button {
    min-width: 36px;
    padding: 4px;
  }
  .panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid var(--pp-divider);
    border-radius: 12px;
    background: var(--pp-surface);
    overflow: auto;
    min-width: 0;
    max-height: var(--pp-editor-canvas-height, min(70vh, 640px));
  }
  @container (max-width: 700px) {
    .panel {
      max-height: none;
    }
  }
  .panel h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }
  .hint {
    margin: 0;
    color: var(--pp-muted);
    font-size: 13px;
    line-height: 1.4;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .field > span {
    font-size: 12px;
    color: var(--pp-muted);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .value {
    font-variant-numeric: tabular-nums;
  }
  .empty {
    padding: 24px;
    text-align: center;
    color: var(--pp-muted);
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  /* plan drawing */
  .grid-line {
    stroke: color-mix(in srgb, var(--pp-text) 9%, transparent);
  }
  .grid-major {
    stroke: color-mix(in srgb, var(--pp-text) 16%, transparent);
  }
  .room {
    fill: color-mix(in srgb, var(--pp-accent) 7%, transparent);
    stroke: color-mix(in srgb, var(--pp-text) 30%, transparent);
    vector-effect: non-scaling-stroke;
  }
  .room.selected {
    fill: color-mix(in srgb, var(--pp-accent) 18%, transparent);
    stroke: var(--pp-accent);
  }
  .tool-select .room,
  .tool-select .item,
  .tool-select .opening-hit,
  .tool-select .free-wall {
    cursor: move;
  }
  .band {
    fill: var(--pp-wall);
  }
  .band.interior {
    fill: color-mix(in srgb, var(--pp-wall) 70%, transparent);
  }
  .free-wall {
    fill: color-mix(in srgb, var(--pp-wall) 85%, transparent);
  }
  .free-wall.selected,
  .item.selected {
    stroke: var(--pp-accent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .opening-gap {
    fill: var(--pp-canvas);
  }
  .opening-line {
    fill: none;
    stroke: var(--pp-text);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
  }
  .opening-arc {
    fill: none;
    stroke: var(--pp-muted);
    stroke-width: 1px;
    stroke-dasharray: 4 3;
    vector-effect: non-scaling-stroke;
  }
  .window-pane {
    fill: color-mix(in srgb, var(--pp-accent) 25%, var(--pp-canvas));
    stroke: var(--pp-text);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .opening-hit {
    fill: transparent;
    stroke: transparent;
  }
  .opening-hit.selected {
    stroke: var(--pp-accent);
    stroke-width: 2.5px;
    vector-effect: non-scaling-stroke;
  }
  .item {
    fill: color-mix(in srgb, var(--pp-text) 9%, var(--pp-canvas));
    stroke: color-mix(in srgb, var(--pp-text) 45%, transparent);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .item.obstacle {
    fill: color-mix(in srgb, var(--pp-text) 22%, var(--pp-canvas));
  }
  .item-front {
    stroke: color-mix(in srgb, var(--pp-text) 60%, transparent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .label {
    fill: var(--pp-text);
    paint-order: stroke;
    stroke: var(--pp-canvas);
    stroke-linejoin: round;
    pointer-events: none;
    font-family: inherit;
  }
  .label.muted {
    fill: var(--pp-muted);
  }
  .label.dim {
    fill: var(--pp-accent);
  }
  .edge-hover,
  .edge-selected {
    stroke: var(--pp-accent);
    stroke-width: 5px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    fill: none;
    opacity: 0.75;
  }
  .edge-selected {
    opacity: 1;
  }
  .handle {
    fill: var(--pp-surface);
    stroke: var(--pp-accent);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
    cursor: grab;
  }
  .handle.active {
    fill: var(--pp-accent);
  }
  .handle.add {
    stroke-dasharray: 2 2;
  }
  .handle-plus {
    stroke: var(--pp-accent);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
    pointer-events: none;
  }
  .handle-hit {
    fill: transparent;
    cursor: grab;
  }
  .rot-line {
    stroke: var(--pp-accent);
    stroke-width: 1px;
    vector-effect: non-scaling-stroke;
  }
  .draft-line {
    fill: color-mix(in srgb, var(--pp-accent) 10%, transparent);
    stroke: var(--pp-accent);
    stroke-width: 2px;
    stroke-dasharray: 6 4;
    vector-effect: non-scaling-stroke;
  }
  .draft-point {
    fill: var(--pp-accent);
  }
  .snap-mark {
    fill: none;
    stroke: var(--pp-accent);
    stroke-width: 1.5px;
    vector-effect: non-scaling-stroke;
    pointer-events: none;
  }
  .calib-line {
    stroke: var(--pp-error);
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }
  .calib-point {
    fill: var(--pp-error);
  }
  .bg-outline {
    fill: none;
    stroke: var(--pp-accent);
    stroke-width: 1px;
    stroke-dasharray: 5 4;
    vector-effect: non-scaling-stroke;
  }
  .bg-image.movable {
    cursor: move;
  }
`;
