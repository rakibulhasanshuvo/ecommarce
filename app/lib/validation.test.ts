import assert from "node:assert";
import { test } from "node:test";
import { validateEmail } from "./validation.ts";

test("validateEmail - happy paths", () => {
  assert.strictEqual(validateEmail("test@example.com"), true, "Standard email should pass");
  assert.strictEqual(validateEmail("user.name+tag@example.co.uk"), true, "Complex email should pass");
  assert.strictEqual(validateEmail("user@sub.domain.com"), true, "Subdomain email should pass");
});

test("validateEmail - invalid emails", () => {
  assert.strictEqual(validateEmail("test@example"), false, "Missing top-level domain should fail");
  assert.strictEqual(validateEmail("testexample.com"), false, "Missing @ should fail");
  assert.strictEqual(validateEmail("@example.com"), false, "Missing local part should fail");
  assert.strictEqual(validateEmail("test@.com"), false, "Missing domain part should fail");
  assert.strictEqual(validateEmail("test@example."), false, "Trailing dot should fail");
  assert.strictEqual(validateEmail(""), false, "Empty string should fail");
});

test("validateEmail - edge cases with whitespace", () => {
  assert.strictEqual(validateEmail(" test@example.com"), false, "Leading whitespace should fail");
  assert.strictEqual(validateEmail("test@example.com "), false, "Trailing whitespace should fail");
  assert.strictEqual(validateEmail("test @example.com"), false, "Inner whitespace should fail");
});
