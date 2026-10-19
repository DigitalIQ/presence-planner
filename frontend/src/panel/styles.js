// Panel styles. Colours come from the Home Assistant theme variables.
import { css } from "lit";

export const panelStyles = css`
  :host {
    /* Fallbacks only matter outside Home Assistant; inside, the theme variables are always set. */
    --pp-fb-bg: #fafafa;
    --pp-fb-surface: #ffffff;
    --pp-fb-text: #212121;
    --pp-fb-muted: #727272;
    --pp-fb-line: #dddddd;
    display: block;
    min-height: 100%;
    background: var(--primary-background-color, var(--pp-fb-bg));
    color: var(--pp-text);
    font-family: var(--paper-font-body1_-_font-family, var(--ha-font-family-body, Roboto, sans-serif));
    font-size: 14px;
    --pp-gap: 12px;
    --pp-radius: 8px;
    --pp-text: var(--primary-text-color, var(--pp-fb-text));
    --pp-surface: var(--card-background-color, var(--ha-card-background, var(--pp-fb-surface)));
    --pp-line: var(--divider-color, var(--pp-fb-line));
    --pp-muted: var(--secondary-text-color, var(--pp-fb-muted));
    --pp-accent: var(--primary-color, #03a9f4);
    --pp-on-accent: var(--text-primary-color, #fff);
    --pp-warn: var(--warning-color, #c77700);
    --pp-error: var(--error-color, #db4437);
  }
  :host([dark]) {
    --pp-fb-bg: #111111;
    --pp-fb-surface: #1c1c1c;
    --pp-fb-text: #e1e1e1;
    --pp-fb-muted: #9b9b9b;
    --pp-fb-line: #3a3a3a;
  }
  * { box-sizing: border-box; }
  [hidden] { display: none !important; }
  .app { display: grid; gap: var(--pp-gap); padding: var(--pp-gap); max-width: 1800px; margin: 0 auto; }

  /* Top bar */
  .top { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
  .top h1 { margin: 0; font-size: 22px; font-weight: 400; }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; font-size: 12px; border: 1px solid var(--pp-line); color: var(--pp-muted); white-space: nowrap; }
  .badge.np { border-color: var(--pp-accent); color: var(--pp-accent); }
  .badge.warn { border-color: var(--pp-warn); color: var(--pp-warn); }
  .status { flex: 1 1 200px; min-width: 0; color: var(--pp-muted); font-size: 13px; }
  .status.err { color: var(--pp-error); }
  .actions { display: flex; flex-wrap: wrap; gap: 6px; }

  button, .btn { font: inherit; font-size: 13px; color: var(--pp-text); background: transparent; border: 1px solid var(--pp-line); border-radius: 6px; padding: 6px 12px; cursor: pointer; min-height: 32px; }
  button:hover:not(:disabled) { border-color: var(--pp-accent); }
  button.primary, button[aria-pressed="true"], button.on { background: var(--pp-accent); border-color: var(--pp-accent); color: var(--pp-on-accent); }
  button:disabled { opacity: 0.5; cursor: default; }
  button.link { border: none; padding: 2px 4px; color: var(--pp-accent); min-height: 0; }
  button:focus-visible, select:focus-visible, input:focus-visible, [role="tab"]:focus-visible, summary:focus-visible {
    outline: 2px solid var(--pp-accent); outline-offset: 2px;
  }
  select, input[type="number"], input[type="text"] { font: inherit; font-size: 13px; padding: 4px 6px; border: 1px solid var(--pp-line); border-radius: 4px; background: var(--pp-surface); color: var(--pp-text); min-height: 30px; max-width: 100%; }
  input[type="number"] { width: 72px; }
  input[type="range"] { width: 100%; accent-color: var(--pp-accent); }
  input[type="checkbox"] { accent-color: var(--pp-accent); }

  .banner { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 8px 12px; border-radius: var(--pp-radius); background: var(--pp-warn); color: #fff; font-size: 13px; }
  .banner.err { background: var(--pp-error); }
  .banner button { color: #fff; border-color: #fff; }

  /* Tabs */
  .tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--pp-line); }
  [role="tab"] { border: none; border-bottom: 2px solid transparent; border-radius: 0; padding: 8px 14px; background: transparent; color: var(--pp-muted); }
  [role="tab"][aria-selected="true"] { color: var(--pp-accent); border-bottom-color: var(--pp-accent); background: transparent; }

  /* Planner layout */
  .planner { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: var(--pp-gap); align-items: start; }
  :host([narrow]) .planner { grid-template-columns: minmax(0, 1fr); }
  @media (max-width: 1100px) { .planner { grid-template-columns: minmax(0, 1fr); } }
  .stage { display: grid; gap: 8px; min-width: 0; position: sticky; top: var(--pp-gap); }
  :host([narrow]) .stage { position: static; }
  @media (max-width: 1100px) { .stage { position: static; } }
  .toolbar { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; }
  .seg { display: inline-flex; border: 1px solid var(--pp-line); border-radius: 6px; overflow: hidden; }
  .seg button { border: none; border-radius: 0; min-height: 30px; }
  .seg button + button { border-left: 1px solid var(--pp-line); }
  .views { display: grid; gap: 8px; min-width: 0; }
  .views.split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  :host([narrow]) .views.split { grid-template-columns: minmax(0, 1fr); }
  @media (max-width: 700px) { .views.split { grid-template-columns: minmax(0, 1fr); } }
  .view { border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); min-width: 0; height: clamp(320px, calc(100vh - 230px), 860px); overflow: hidden; }
  :host([narrow]) .view { height: clamp(280px, 70vw, 560px); }
  .view > * { width: 100%; height: 100%; display: block; }
  .legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; color: var(--pp-muted); }
  .legend i { display: inline-block; width: 14px; height: 10px; border-radius: 2px; margin-right: 4px; vertical-align: -1px; }
  .hint { font-size: 12px; color: var(--pp-muted); }

  /* Side panel */
  .side { display: grid; gap: var(--pp-gap); min-width: 0; }
  .box { border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); padding: 12px; display: grid; gap: 10px; min-width: 0; }
  h2 { margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--pp-muted); font-weight: 500; }
  .row { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center; }
  .row > select { flex: 1 1 160px; min-width: 0; }
  .muted { color: var(--pp-muted); font-size: 12px; }
  .warn { color: var(--pp-warn); font-size: 12px; }
  .spill { color: var(--pp-error); }

  .cards { display: grid; gap: 8px; }
  .card { display: grid; grid-template-columns: 12px minmax(0, 1fr) auto; gap: 4px 8px; align-items: center; padding: 8px 10px; border: 1px solid var(--pp-line); border-radius: 6px; cursor: pointer; }
  .card.sel { border-color: var(--pp-accent); box-shadow: inset 3px 0 0 var(--pp-accent); cursor: default; }
  .card.off .namebtn, .card.off .meta { opacity: 0.6; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .namebtn, .namebtn[aria-pressed="true"] { font-weight: 500; overflow-wrap: anywhere; text-align: left; border: none; padding: 2px 0; min-height: 0; background: transparent; color: var(--pp-text); }
  .meta { grid-column: 2 / 4; color: var(--pp-muted); font-size: 12px; font-variant-numeric: tabular-nums; }
  .fields { grid-column: 1 / 4; display: grid; grid-template-columns: minmax(90px, auto) minmax(0, 1fr) auto; gap: 6px 8px; align-items: center; font-size: 13px; margin-top: 4px; }
  .fields .wide { grid-column: 2 / 4; min-width: 0; }
  .fields .full { grid-column: 1 / 4; }
  .unverified { display: inline-block; font-size: 11px; padding: 1px 6px; border-radius: 4px; border: 1px solid var(--pp-warn); color: var(--pp-warn); margin-top: 2px; }
  label.chk { display: inline-flex; gap: 6px; align-items: center; font-size: 13px; cursor: pointer; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 4px; border-bottom: 1px solid var(--pp-line); vertical-align: top; }
  th { color: var(--pp-muted); font-weight: 500; font-size: 12px; }
  td.num, th.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .bar { height: 4px; background: var(--pp-line); border-radius: 2px; overflow: hidden; margin-top: 3px; }
  .bar i { display: block; height: 100%; background: var(--pp-accent); }
  .table-wrap { overflow-x: auto; }
  ul { margin: 0; padding-left: 18px; font-size: 13px; }
  .kv { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 3px 10px; font-size: 13px; }
  .kv .v { text-align: right; font-variant-numeric: tabular-nums; }

  .slider { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 8px; align-items: center; font-size: 12px; color: var(--pp-muted); }
  progress { width: 100%; height: 6px; accent-color: var(--pp-accent); }
  .results { display: grid; gap: 6px; }
  .result { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 2px 8px; align-items: center; padding: 6px 8px; border: 1px solid var(--pp-line); border-radius: 6px; font-size: 13px; }
  .result .meta { grid-column: 1 / 2; }
  details summary { cursor: pointer; font-size: 13px; }
  details p { margin: 6px 0 0; color: var(--pp-muted); font-size: 12px; }

  .editor { min-height: 70vh; border: 1px solid var(--pp-line); border-radius: var(--pp-radius); background: var(--pp-surface); overflow: hidden; }
  .editor > pp-editor { display: block; width: 100%; min-height: 70vh; }
  .empty { padding: 32px; text-align: center; color: var(--pp-muted); }

  @media (prefers-reduced-motion: no-preference) {
    button, .card { transition: border-color 0.15s ease, background-color 0.15s ease; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
  }
`;
