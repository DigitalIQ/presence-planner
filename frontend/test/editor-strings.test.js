import { test } from "node:test";
import assert from "node:assert/strict";
import { EDITOR_STRINGS, formatNumber, parseNumber, translate } from "../src/editor/strings.js";
import { FURNITURE_GROUPS, FURNITURE_SIZE, FURNITURE_TYPES } from "../src/editor/furniture.js";

test("English and German have the same keys", () => {
  const en = Object.keys(EDITOR_STRINGS.en).sort();
  const de = Object.keys(EDITOR_STRINGS.de).sort();
  assert.deepEqual(de, en);
  for (const [k, v] of Object.entries(EDITOR_STRINGS.de)) assert.ok(v.trim().length > 0, k);
});

test("every furniture kind and group has a name and a default size", () => {
  for (const t of FURNITURE_TYPES) {
    assert.ok(EDITOR_STRINGS.en[`furn_${t}`], `en furn_${t}`);
    assert.ok(EDITOR_STRINGS.de[`furn_${t}`], `de furn_${t}`);
    assert.equal(FURNITURE_SIZE[t].length, 3, t);
  }
  for (const g of Object.keys(FURNITURE_GROUPS)) assert.ok(EDITOR_STRINGS.de[`group_${g}`], g);
});

test("no dashes as sentence punctuation in UI strings", () => {
  for (const lang of ["en", "de"]) {
    for (const [k, v] of Object.entries(EDITOR_STRINGS[lang])) assert.ok(!/[—–]/.test(v), `${lang}.${k}`);
  }
});

test("translate fills placeholders and falls back to English", () => {
  assert.equal(translate("de", "corner", { n: 3 }), "Ecke 3");
  assert.equal(translate("de-AT", "undo"), "Rückgängig");
  assert.equal(translate("fr", "undo"), "Undo");
  assert.equal(translate("de", "missing_key"), "missing_key");
});

test("numbers use the language's decimal separator and parse either way", () => {
  assert.equal(formatNumber("de", 12.5), "12,5");
  assert.equal(formatNumber("en", 12.5), "12.5");
  assert.equal(formatNumber("de", 1234.5678, 2), "1234,57");
  assert.equal(parseNumber("0,24"), 0.24);
  assert.equal(parseNumber(" 2.6 "), 2.6);
  assert.equal(parseNumber(""), null);
  assert.ok(Number.isNaN(parseNumber("abc")));
});
