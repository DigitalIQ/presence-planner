// Panel translations: both languages complete, placeholders match, every used key exists.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createTranslator, createFormatter, pickLanguage } from "../src/i18n/index.js";

const en = JSON.parse(readFileSync(new URL("../src/i18n/en.json", import.meta.url)));
const de = JSON.parse(readFileSync(new URL("../src/i18n/de.json", import.meta.url)));
const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

test("en and de have the same keys and placeholders", () => {
  assert.deepEqual(Object.keys(de).sort(), Object.keys(en).sort());
  for (const k of Object.keys(en)) assert.deepEqual(placeholders(de[k]), placeholders(en[k]), k);
  for (const [k, v] of Object.entries(de)) assert.ok(v.trim().length, `empty German string ${k}`);
});

test("every literal key used in the panel and api code exists", () => {
  const dirs = ["../src/panel/", "../src/api/"];
  const used = new Set();
  for (const d of dirs) {
    const url = new URL(d, import.meta.url);
    for (const f of readdirSync(url).filter((x) => x.endsWith(".js"))) {
      const src = readFileSync(new URL(f, url), "utf8");
      for (const m of src.matchAll(/\bt\("([a-z0-9_.]+)"/g)) used.add(m[1]);
      for (const m of src.matchAll(/key: "([a-z0-9_.]+)"/g)) used.add(m[1]);
      for (const m of src.matchAll(/"(error\.[a-z_]+)"/g)) used.add(m[1]);
    }
  }
  const dynamic = [
    ...["2d", "3d", "split"].map((v) => `view.${v}`),
    ...["05", "09", "13"].flatMap((h) => [`height.h${h}`, `height.short${h}`]),
    ...["wall", "corner", "ceiling"].map((m) => `mount.${m}`),
    ...["open", "closed", "live"].map((m) => `assume.doors_${m}`),
  ];
  for (const k of [...used, ...dynamic]) assert.ok(k in en, `missing key ${k}`);
});

test("translator picks the language, falls back to English and fills placeholders", () => {
  assert.equal(pickLanguage("de-CH"), "de");
  assert.equal(pickLanguage("fr"), "en");
  const t = createTranslator("de");
  assert.equal(t("action.save"), "Speichern");
  assert.equal(t("status.revision", { revision: 4 }), "Revision 4");
  assert.equal(t("no.such.key"), "no.such.key");
  assert.equal(createTranslator("fr")("action.save"), "Save");
});

test("formatter uses the language", () => {
  assert.equal(createFormatter("de").pct(0.256), "26 %");
  assert.equal(createFormatter("de").num(1.5, 1), "1,5");
  assert.equal(createFormatter("en").num(1.5, 1), "1.5");
  assert.equal(createFormatter("en").pct(null), "–");
});

test("formatter never shows a negative zero", () => {
  assert.equal(createFormatter("de").num(-0.001, 2), "0,00");
  assert.equal(createFormatter("en").num(-0.004, 2), "0.00");
});
