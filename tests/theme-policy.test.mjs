import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { normalizeTheme, readThemePreference, saveThemePreference } from "../src/theme/theme-policy.js";

test("new or invalid preferences retain the existing dark default", () => {
  for (const value of [null, undefined, "system", "invalid", "LIGHT"]) assert.equal(normalizeTheme(value), "dark");
  assert.equal(normalizeTheme("light"), "light");
});
test("theme selection persists independently of motion preferences", () => {
  const values = new Map([["portfolio-motion", "reduced"]]);
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  saveThemePreference(storage, "light");
  assert.equal(readThemePreference(storage), "light");
  assert.equal(values.get("portfolio-motion"), "reduced");
  saveThemePreference(storage, "dark");
  assert.equal(readThemePreference(storage), "dark");
});
test("blocked storage does not prevent theme switching", () => {
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.equal(readThemePreference(storage), "dark");
  assert.doesNotThrow(() => saveThemePreference(storage, "light"));
});
test("pre-paint initialization restores light theme safely before hydration", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const bootstrap = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  assert.ok(html.indexOf("portfolio-theme") < html.indexOf('id="root"'));
  for (const stored of ["light", "dark", "invalid", null]) {
    const document = { documentElement: { dataset: {} } };
    runInNewContext(bootstrap, { document, localStorage: { getItem: () => stored } });
    assert.equal(document.documentElement.dataset.theme, normalizeTheme(stored));
  }
  const document = { documentElement: { dataset: {} } };
  runInNewContext(bootstrap, { document, localStorage: { getItem() { throw new Error("blocked"); } } });
  assert.equal(document.documentElement.dataset.theme, "dark");
});
