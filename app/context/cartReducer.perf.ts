import { describe, test } from "node:test";
import assert from "node:assert";
import { getDerivedCartState } from "./cartReducer.ts";
import { products } from "../lib/mock-data.ts";
import type { CartState } from "../types/index.ts";

describe("cartReducer Performance", () => {
  const iterations = 100000;

  // Create a large cart state
  const largeCartItems = Array.from({ length: 100 }, (_, i) => ({
    id: `sku-${i}`,
    product: products[0],
    variant: { ...products[0].variants[0], price: 10 + i },
    quantity: i + 1,
  }));

  const state: CartState = {
    items: largeCartItems,
    wishlist: [],
    discountCode: null,
    isLoaded: true,
  };

  test("Benchmark getDerivedCartState", () => {
    // Warm up
    for (let i = 0; i < 1000; i++) {
      getDerivedCartState(state);
    }

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      getDerivedCartState(state);
    }
    const end = performance.now();

    console.log(`Execution time for ${iterations} iterations: ${(end - start).toFixed(2)}ms`);
    console.log(`Average time per call: ${((end - start) / iterations).toFixed(4)}ms`);
  });

  test("Correctness", () => {
    const result = getDerivedCartState(state);
    let expectedCount = 0;
    let expectedSubtotal = 0;
    for (const item of state.items) {
      expectedCount += item.quantity;
      expectedSubtotal += (item.variant?.price || 0) * item.quantity;
    }

    assert.strictEqual(result.itemCount, expectedCount);
    assert.strictEqual(result.subtotal, expectedSubtotal);
  });
});
