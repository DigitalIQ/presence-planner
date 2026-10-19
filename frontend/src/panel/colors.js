// Sensor colours and colour helpers. Pure functions.

export const PALETTE = {
  light: ["#1f7a4d", "#1f5f99", "#8a4b9c", "#c06a14", "#56616b", "#b23a6f", "#2f7f8f", "#7a6a12"],
  dark: ["#43b37b", "#5a9be0", "#c08bd2", "#eb9a45", "#9aa6b1", "#e07aa8", "#5cc3d3", "#d4c04a"],
};

/** Colour per entity_id, stable by position in the full sensor list. */
export function sensorColors(sensors, dark) {
  const pal = PALETTE[dark ? "dark" : "light"];
  const out = {};
  (sensors || []).forEach((s, i) => {
    out[s.entity_id] = pal[i % pal.length];
  });
  return out;
}

/** "#rrggbb" / "#rgb" / "rgb(…)" → "rgba(r,g,b,a)". Unknown formats are returned unchanged. */
export function withAlpha(color, a) {
  const c = String(color || "").trim();
  let m = c.match(/^#([0-9a-f]{3})$/i);
  if (m) {
    const [r, g, b] = m[1].split("").map((h) => parseInt(h + h, 16));
    return `rgba(${r},${g},${b},${a})`;
  }
  m = c.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }
  m = c.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).slice(0, 3).join(",");
    return `rgba(${p},${a})`;
  }
  return c;
}
