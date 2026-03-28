import assert from 'node:assert';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { STORAGE_KEYS } from './cartReducer';

// Setup JSDOM globally to run React
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
global.window = dom.window as any;
global.document = dom.window.document;
Object.defineProperty(global, 'navigator', { value: dom.window.navigator });

test('CartContext ignores invalid localStorage and clears it on mount', () => {
  let removeCalledWith: string[] = [];

  const localStorageMock = {
    getItem: (key: string) => {
      // Simulate throwing an error when parsing/accessing corrupted local storage
      throw new Error(`Simulated corruption error for ${key}`);
    },
    setItem: () => {},
    removeItem: (key: string) => {
      removeCalledWith.push(key);
    },
    clear: () => {}
  };

  // Override local storage globally
  Object.defineProperty(global.window, 'localStorage', { value: localStorageMock });
  Object.defineProperty(global, 'localStorage', { value: localStorageMock, configurable: true });

  // Render a mock component to initialize CartContext and run its useEffect
  function TestComponent() {
    const cart = useCart();
    return <div data-testid="is-loaded">{cart.isLoaded ? 'true' : 'false'}</div>;
  }

  // Act: Render the provider
  const { unmount } = render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );

  // Assert: verify that the catch blocks triggered and cleared the corrupted keys
  assert.ok(removeCalledWith.includes(STORAGE_KEYS.CART), "Should have called removeItem for CART");
  assert.ok(removeCalledWith.includes(STORAGE_KEYS.WISHLIST), "Should have called removeItem for WISHLIST");

  // Cleanup
  unmount();
  cleanup();
});
