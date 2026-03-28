import assert from "node:assert";
import { describe, test } from "node:test";
import { getDiscountPercent } from "./mock-data";

describe("getDiscountPercent", () => {
  test("Calculates correct percentage for happy path", () => {
    assert.strictEqual(getDiscountPercent(100, 80), 20, "20% discount (100 -> 80)");
    assert.strictEqual(getDiscountPercent(250, 150), 40, "40% discount (250 -> 150)");
    assert.strictEqual(getDiscountPercent(99.99, 49.99), 50, "50% discount (99.99 -> 49.99)");
  });

  test("Returns 0 for edge cases and invalid inputs", () => {
    assert.strictEqual(getDiscountPercent(100, null), 0, "null discountPrice returns 0");
    assert.strictEqual(getDiscountPercent(0, 80), 0, "0 basePrice returns 0");
    assert.strictEqual(getDiscountPercent(-100, 80), 0, "negative basePrice returns 0");
    assert.strictEqual(getDiscountPercent(100, 100), 0, "discountPrice equal to basePrice returns 0");
    assert.strictEqual(getDiscountPercent(100, 150), 0, "discountPrice greater than basePrice returns 0");
    assert.strictEqual(getDiscountPercent(100, -20), 0, "negative discountPrice returns 0");
  });

  test("Rounds correctly to nearest integer", () => {
    assert.strictEqual(getDiscountPercent(100, 33.33), 67, "Rounds correctly (66.67% -> 67%)");
  });
});
