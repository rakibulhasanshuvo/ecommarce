import { test, describe } from "node:test";
import assert from "node:assert";
import { getProductsByTag } from "./mock-data.js";

describe("getProductsByTag", () => {
  test("returns correct products for existing tag", () => {
    const trendingProducts = getProductsByTag("trending");
    assert.strictEqual(Array.isArray(trendingProducts), true, "Should return an array");
    assert.strictEqual(trendingProducts.length > 0, true, "Should return at least one product for 'trending'");

    trendingProducts.forEach((product) => {
      assert.strictEqual(product.tags?.includes("trending"), true, `Product ${product.id} should have the 'trending' tag`);
    });
  });

  test("returns empty array for non-existent tag", () => {
    const nonExistentProducts = getProductsByTag("non-existent-tag-123");
    assert.strictEqual(Array.isArray(nonExistentProducts), true, "Should return an array");
    assert.strictEqual(nonExistentProducts.length, 0, "Should return an empty array for non-existent tag");
  });

  test("returns empty array for empty string tag", () => {
    const emptyStringProducts = getProductsByTag("");
    assert.strictEqual(Array.isArray(emptyStringProducts), true, "Should return an array");
    assert.strictEqual(emptyStringProducts.length, 0, "Should return an empty array for empty string tag");
  });

  test("returns empty array for undefined tag", () => {
    const undefinedProducts = getProductsByTag(undefined as any);
    assert.strictEqual(Array.isArray(undefinedProducts), true, "Should return an array");
    assert.strictEqual(undefinedProducts.length, 0, "Should return an empty array for undefined tag");
  });
});
