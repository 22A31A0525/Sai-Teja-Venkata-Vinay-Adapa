import test from "node:test";
import assert from "node:assert/strict";
import { contactErrorMessage, validateContact } from "../src/services/contact-validation.js";

test("whitespace-only names and messages cannot be submitted", () => {
  const result = validateContact({ name: "  ", email: "person@example.com", message: "\n " });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.message);
});
test("valid input is trimmed without changing message content", () => {
  const result = validateContact({ name: " Sai ", email: " sai@example.com ", message: " Hi\nTeam " });
  assert.equal(result.valid, true);
  assert.deepEqual(result.data, { name: "Sai", email: "sai@example.com", message: "Hi\nTeam" });
});
test("invalid email and oversized messages are rejected", () => {
  const result = validateContact({ name: "Person", email: "invalid@", message: "a".repeat(5001) });
  assert.equal(result.valid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.message);
});
test("service failures offer a contact fallback", () => {
  assert.match(contactErrorMessage({ code: "permission-denied" }), /email/);
  assert.match(contactErrorMessage({ code: "unavailable" }), /still here/);
  assert.match(contactErrorMessage(new Error("unknown")), /email/);
});
test("missing or non-text payload values are rejected safely", () => {
  assert.equal(validateContact(null).valid, false);
  assert.equal(validateContact({ name: {}, email: "valid@example.com", message: 123 }).valid, false);
});
