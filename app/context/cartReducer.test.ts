import assert from "node:assert";
import { test, describe } from "node:test";
import { cartReducer, getDerivedCartState, ACTIONS, initialState } from "./cartReducer";
import { products, discountCodes } from "../lib/mock-data";

describe("cartReducer", () => {
  const testProduct = products[0];
  const testVariant = testProduct.variants[0];

  test("SET_INITIAL_STATE updates state correctly", () => {
    const newState = cartReducer(initialState, {
      type: ACTIONS.SET_INITIAL_STATE,
      payload: { isLoaded: true },
    });
    assert.strictEqual(newState.isLoaded, true);
  });

  test("ADD_ITEM adds a new item to the cart", () => {
    const newState = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 2 },
    });
    assert.strictEqual(newState.items.length, 1);
    assert.strictEqual(newState.items[0].id, testVariant.sku);
    assert.strictEqual(newState.items[0].quantity, 2);
  });

  test("ADD_ITEM increases quantity if item already exists", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    });
    state = cartReducer(state, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 2 },
    });
    assert.strictEqual(state.items.length, 1);
    assert.strictEqual(state.items[0].quantity, 3);
  });

  test("REMOVE_ITEM removes an item by sku", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    });
    state = cartReducer(state, {
      type: ACTIONS.REMOVE_ITEM,
      payload: { sku: testVariant.sku },
    });
    assert.strictEqual(state.items.length, 0);
  });

  test("UPDATE_QUANTITY updates item quantity", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    });
    state = cartReducer(state, {
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { sku: testVariant.sku, quantity: 5 },
    });
    assert.strictEqual(state.items[0].quantity, 5);
  });

  test("UPDATE_QUANTITY removes item if quantity is <= 0", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    });
    state = cartReducer(state, {
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { sku: testVariant.sku, quantity: 0 },
    });
    assert.strictEqual(state.items.length, 0);
  });

  test("APPLY_DISCOUNT applies a valid discount code", () => {
    const validCode = discountCodes[0];
    const state = cartReducer(initialState, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: validCode.code },
    });
    assert.deepStrictEqual(state.discountCode, validCode);
  });

  test("APPLY_DISCOUNT ignores an invalid discount code", () => {
    const state = cartReducer(initialState, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: "INVALID" },
    });
    assert.strictEqual(state.discountCode, null);
  });

  test("REMOVE_DISCOUNT removes an applied discount code", () => {
    const validCode = discountCodes[0];
    let state = cartReducer(initialState, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: validCode.code },
    });
    state = cartReducer(state, { type: ACTIONS.REMOVE_DISCOUNT });
    assert.strictEqual(state.discountCode, null);
  });

  test("CLEAR_CART removes all items and discounts but keeps wishlist and isLoaded", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.SET_INITIAL_STATE,
      payload: { isLoaded: true },
    });
    state = cartReducer(state, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    });
    state = cartReducer(state, {
      type: ACTIONS.TOGGLE_WISHLIST,
      payload: { product: testProduct },
    });
    state = cartReducer(state, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: discountCodes[0].code },
    });

    state = cartReducer(state, { type: ACTIONS.CLEAR_CART });
    assert.strictEqual(state.items.length, 0);
    assert.strictEqual(state.discountCode, null);
    assert.strictEqual(state.wishlist.length, 1); // Preserved
    assert.strictEqual(state.isLoaded, true); // Preserved
  });

  test("TOGGLE_WISHLIST adds to wishlist if not present", () => {
    const state = cartReducer(initialState, {
      type: ACTIONS.TOGGLE_WISHLIST,
      payload: { product: testProduct },
    });
    assert.strictEqual(state.wishlist.length, 1);
    assert.strictEqual(state.wishlist[0].id, testProduct.id);
  });

  test("TOGGLE_WISHLIST removes from wishlist if already present", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.TOGGLE_WISHLIST,
      payload: { product: testProduct },
    });
    state = cartReducer(state, {
      type: ACTIONS.TOGGLE_WISHLIST,
      payload: { product: testProduct },
    });
    assert.strictEqual(state.wishlist.length, 0);
  });

  test("CLEAR_WISHLIST empties the wishlist", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.TOGGLE_WISHLIST,
      payload: { product: testProduct },
    });
    state = cartReducer(state, { type: ACTIONS.CLEAR_WISHLIST });
    assert.strictEqual(state.wishlist.length, 0);
  });
});

describe("getDerivedCartState", () => {
  const testProduct = products[0];
  const testVariant = testProduct.variants[0]; // Price: 499.00
  const testProduct2 = products[1];
  const testVariant2 = testProduct2.variants[0]; // Price: 1299.00

  test("calculates empty cart correctly", () => {
    const derived = getDerivedCartState(initialState);
    assert.strictEqual(derived.itemCount, 0);
    assert.strictEqual(derived.subtotal, 0);
    assert.strictEqual(derived.discountAmount, 0);
    assert.strictEqual(derived.shippingCost, 0);
    assert.strictEqual(derived.tax, 0);
    assert.strictEqual(derived.total, 0);
  });

  test("calculates cart with items correctly (no discount)", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 2 },
    });
    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.itemCount, 2);
    assert.strictEqual(derived.subtotal, 499.00 * 2); // 998.00
    assert.strictEqual(derived.shippingCost, 0); // Free shipping over $100
    assert.strictEqual(derived.tax, 998.00 * 0.08); // 79.84
    assert.strictEqual(derived.total, 998.00 + 79.84); // 1077.84
  });

  test("calculates shipping cost correctly (under $100)", () => {
    const cheapProduct = { ...testProduct, id: "cheap" };
    const cheapVariant = { ...testVariant, sku: "cheap-sku", price: 50.00 };

    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: cheapProduct, variant: cheapVariant, quantity: 1 },
    });
    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.subtotal, 50.00);
    assert.strictEqual(derived.shippingCost, 9.99);
  });

  test("calculates percentage discount correctly", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    }); // Subtotal: 499.00

    const percentDiscount = discountCodes.find(d => d.type === "percentage"); // e.g., 20%
    if (!percentDiscount) throw new Error("No percentage discount found");

    state = cartReducer(state, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: percentDiscount.code },
    });

    const derived = getDerivedCartState(state);
    const expectedDiscount = (499.00 * percentDiscount.value) / 100;
    assert.strictEqual(derived.discountAmount, expectedDiscount);
  });

  test("calculates fixed discount correctly", () => {
    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: testProduct, variant: testVariant, quantity: 1 },
    }); // Subtotal: 499.00

    const fixedDiscount = discountCodes.find(d => d.type === "fixed"); // e.g., $50 off
    if (!fixedDiscount) throw new Error("No fixed discount found");

    state = cartReducer(state, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: fixedDiscount.code },
    });

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.discountAmount, fixedDiscount.value);
  });

  test("calculates free shipping discount correctly", () => {
    const cheapProduct = { ...testProduct, id: "cheap" };
    const cheapVariant = { ...testVariant, sku: "cheap-sku", price: 50.00 };

    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: cheapProduct, variant: cheapVariant, quantity: 1 },
    }); // Subtotal: 50.00 (would normally have $9.99 shipping)

    const freeShippingDiscount = discountCodes.find(d => d.type === "free_shipping");
    if (!freeShippingDiscount) throw new Error("No free shipping discount found");

    state = cartReducer(state, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: freeShippingDiscount.code },
    });

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.shippingCost, 0);
  });

  test("does not apply discount if min_spend is not met", () => {
    const fixedDiscount = discountCodes.find(d => d.type === "fixed"); // Min spend e.g. 200
    if (!fixedDiscount) throw new Error("No fixed discount found");

    const cheapProduct = { ...testProduct, id: "cheap" };
    const cheapVariant = { ...testVariant, sku: "cheap-sku", price: fixedDiscount.min_spend - 10 };

    let state = cartReducer(initialState, {
      type: ACTIONS.ADD_ITEM,
      payload: { product: cheapProduct, variant: cheapVariant, quantity: 1 },
    });

    state = cartReducer(state, {
      type: ACTIONS.APPLY_DISCOUNT,
      payload: { code: fixedDiscount.code },
    });

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.discountAmount, 0); // Not applied due to min spend
  });
});
