import assert from 'node:assert';
import { describe, it } from 'node:test';
import {
  cartReducer,
  getDerivedCartState,
  ACTIONS,
  initialState
} from './cartReducer.ts';
import { products, discountCodes } from '../lib/mock-data.ts';
import type { CartState, Product, Variant } from '../types/index.ts';

describe('cartReducer', () => {
  const product1 = products[0];
  const variant1 = product1.variants[0];
  const product2 = products[1];
  const variant2 = product2.variants[0];

  it('should handle SET_INITIAL_STATE', () => {
    const payload: Partial<CartState> = {
      isLoaded: true,
      items: [{ id: variant1.sku, product: product1, variant: variant1, quantity: 2 }]
    };
    const newState = cartReducer(initialState, { type: ACTIONS.SET_INITIAL_STATE, payload });
    assert.strictEqual(newState.isLoaded, true);
    assert.strictEqual(newState.items.length, 1);
    assert.strictEqual(newState.items[0].id, variant1.sku);
  });

  it('should handle ADD_ITEM (new item)', () => {
    const action = {
      type: ACTIONS.ADD_ITEM,
      payload: { product: product1, variant: variant1, quantity: 1 }
    };
    const newState = cartReducer(initialState, action);
    assert.strictEqual(newState.items.length, 1);
    assert.strictEqual(newState.items[0].quantity, 1);
    assert.strictEqual(newState.items[0].variant.sku, variant1.sku);
  });

  it('should handle ADD_ITEM (existing item)', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ id: variant1.sku, product: product1, variant: variant1, quantity: 1 }]
    };
    const action = {
      type: ACTIONS.ADD_ITEM,
      payload: { product: product1, variant: variant1, quantity: 2 }
    };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.items.length, 1);
    assert.strictEqual(newState.items[0].quantity, 3);
  });

  it('should handle REMOVE_ITEM', () => {
    const startState: CartState = {
      ...initialState,
      items: [
        { id: variant1.sku, product: product1, variant: variant1, quantity: 1 },
        { id: variant2.sku, product: product2, variant: variant2, quantity: 1 }
      ]
    };
    const action = { type: ACTIONS.REMOVE_ITEM, payload: { sku: variant1.sku } };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.items.length, 1);
    assert.strictEqual(newState.items[0].variant.sku, variant2.sku);
  });

  it('should handle UPDATE_QUANTITY', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ id: variant1.sku, product: product1, variant: variant1, quantity: 1 }]
    };
    const action = { type: ACTIONS.UPDATE_QUANTITY, payload: { sku: variant1.sku, quantity: 5 } };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.items[0].quantity, 5);
  });

  it('should handle UPDATE_QUANTITY (remove if <= 0)', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ id: variant1.sku, product: product1, variant: variant1, quantity: 5 }]
    };
    const action = { type: ACTIONS.UPDATE_QUANTITY, payload: { sku: variant1.sku, quantity: 0 } };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.items.length, 0);
  });

  it('should handle APPLY_DISCOUNT (valid)', () => {
    const discount = discountCodes[0];
    const action = { type: ACTIONS.APPLY_DISCOUNT, payload: { code: discount.code } };
    const newState = cartReducer(initialState, action);
    assert.deepStrictEqual(newState.discountCode, discount);
  });

  it('should handle APPLY_DISCOUNT (invalid)', () => {
    const action = { type: ACTIONS.APPLY_DISCOUNT, payload: { code: 'INVALID' } };
    const newState = cartReducer(initialState, action);
    assert.strictEqual(newState.discountCode, null);
  });

  it('should handle REMOVE_DISCOUNT', () => {
    const startState: CartState = { ...initialState, discountCode: discountCodes[0] };
    const action = { type: ACTIONS.REMOVE_DISCOUNT };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.discountCode, null);
  });

  it('should handle CLEAR_CART', () => {
    const startState: CartState = {
      ...initialState,
      items: [{ id: variant1.sku, product: product1, variant: variant1, quantity: 1 }],
      wishlist: [product2],
      isLoaded: true
    };
    const action = { type: ACTIONS.CLEAR_CART };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.items.length, 0);
    assert.strictEqual(newState.wishlist.length, 1);
    assert.strictEqual(newState.isLoaded, true);
  });

  it('should handle TOGGLE_WISHLIST (add)', () => {
    const action = { type: ACTIONS.TOGGLE_WISHLIST, payload: { product: product1 } };
    const newState = cartReducer(initialState, action);
    assert.strictEqual(newState.wishlist.length, 1);
    assert.strictEqual(newState.wishlist[0].id, product1.id);
  });

  it('should handle TOGGLE_WISHLIST (remove)', () => {
    const startState: CartState = { ...initialState, wishlist: [product1] };
    const action = { type: ACTIONS.TOGGLE_WISHLIST, payload: { product: product1 } };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.wishlist.length, 0);
  });

  it('should handle CLEAR_WISHLIST', () => {
    const startState: CartState = { ...initialState, wishlist: [product1, product2] };
    const action = { type: ACTIONS.CLEAR_WISHLIST };
    const newState = cartReducer(startState, action);
    assert.strictEqual(newState.wishlist.length, 0);
  });
});

describe('getDerivedCartState', () => {
  const product1 = products[0];
  const variant1 = product1.variants[0]; // Price depends on mock data, let's use fixed price for predictable test if possible or read from mock

  it('should calculate empty cart correctly', () => {
    const state = getDerivedCartState(initialState);
    assert.strictEqual(state.itemCount, 0);
    assert.strictEqual(state.subtotal, 0);
    assert.strictEqual(state.discountAmount, 0);
    assert.strictEqual(state.shippingCost, 0);
    assert.strictEqual(state.tax, 0);
    assert.strictEqual(state.total, 0);
  });

  it('should calculate subtotal, tax and total correctly', () => {
    // Manually creating a state to control prices
    const customVariant: Variant = { sku: 'TEST-SKU', price: 100, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 2 }]
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.subtotal, 200);
    assert.strictEqual(derived.itemCount, 2);
    assert.strictEqual(derived.shippingCost, 0); // subtotal >= 100
    assert.strictEqual(derived.tax, 200 * 0.08);
    assert.strictEqual(derived.total, 200 + 200 * 0.08);
  });

  it('should handle shipping cost for small orders', () => {
    const customVariant: Variant = { sku: 'TEST-SKU', price: 50, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 1 }]
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.subtotal, 50);
    assert.strictEqual(derived.shippingCost, 9.99);
  });

  it('should handle percentage discount', () => {
    const customVariant: Variant = { sku: 'TEST-SKU', price: 100, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 1 }],
      discountCode: { code: 'SAVE10', type: 'percentage', value: 10, min_spend: 50, usage_limit: null, times_used: 0, active: true }
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.discountAmount, 10);
    assert.strictEqual(derived.tax, (100 - 10) * 0.08);
  });

  it('should handle fixed discount (capped by subtotal)', () => {
    const customVariant: Variant = { sku: 'TEST-SKU', price: 40, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 1 }],
      discountCode: { code: 'SAVE50', type: 'fixed', value: 50, min_spend: 0, usage_limit: null, times_used: 0, active: true }
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.discountAmount, 40); // Capped
    assert.strictEqual(derived.subtotal, 40);
  });

  it('should handle free shipping discount', () => {
    const customVariant: Variant = { sku: 'TEST-SKU', price: 50, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 1 }],
      discountCode: { code: 'FREESHIP', type: 'free_shipping', value: 0, min_spend: 0, usage_limit: null, times_used: 0, active: true }
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.shippingCost, 0);
  });

  it('should respect minimum spend for discounts', () => {
    const customVariant: Variant = { sku: 'TEST-SKU', price: 40, options_map: {}, stock_quantity: 10 };
    const customProduct: Product = { ...products[0], id: 'test-id', variants: [customVariant] };

    const state: CartState = {
      ...initialState,
      items: [{ id: customVariant.sku, product: customProduct, variant: customVariant, quantity: 1 }],
      discountCode: { code: 'SAVE10', type: 'percentage', value: 10, min_spend: 100, usage_limit: null, times_used: 0, active: true }
    };

    const derived = getDerivedCartState(state);
    assert.strictEqual(derived.discountAmount, 0);
  });
});
