import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HELP_LINKS } from "../src/panel/links.js";

const lang = (code) => JSON.parse(readFileSync(new URL(`../src/i18n/${code}.json`, import.meta.url), "utf8"));

test("help links point to the project's GitHub and have texts in both languages", () => {
  const en = lang("en");
  const de = lang("de");
  assert.deepEqual(HELP_LINKS.map((l) => l.key), ["help.bug", "help.idea", "help.question", "help.manual"]);
  for (const l of HELP_LINKS) {
    assert.match(l.href, /^https:\/\/github\.com\/DigitalIQ\/presence-planner[/#]/);
    assert.ok(en[l.key] && de[l.key], l.key);
  }
  assert.ok(en["help.label"] && de["help.label"]);
});
