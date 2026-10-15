import test from "node:test";
import assert from "node:assert/strict";
import { effectiveMotionReduction, readMotionPreference, saveMotionPreference } from "../src/motion/motion-policy.js";

test("device reduction cannot be overridden by the saved user preference", () => {
  assert.equal(effectiveMotionReduction(true, false), true);
  assert.equal(effectiveMotionReduction(false, true), true);
  assert.equal(effectiveMotionReduction(false, false), false);
});
test("motion choices persist using the established key", () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  saveMotionPreference(storage, true);
  assert.equal(values.get("portfolio-motion"), "reduced");
  assert.equal(readMotionPreference(storage), true);
  saveMotionPreference(storage, false);
  assert.equal(readMotionPreference(storage), false);
});
test("unavailable storage does not break motion controls", () => {
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.equal(readMotionPreference(storage), false);
  assert.doesNotThrow(() => saveMotionPreference(storage, true));
});
