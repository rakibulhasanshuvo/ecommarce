"use client";

import React, { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from "react";
import { decodeData, encodeData } from "@/app/lib/storage";
import { STORAGE_KEYS, initialState, ACTIONS, cartReducer, getDerivedCartState } from "./cartReducer";
import { CartContextValue, Product, Variant } from "../types";

// ===== Context =====
const CartContext = createContext<CartContextValue | null>(null);

// ===== Provider =====
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount (with error handling)
  useEffect(() => {
    if (typeof window !== "undefined") {
      let parsedCart = [];
      let parsedWishlist = [];

      try {
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
        if (savedCart) {
          const decoded = decodeData(savedCart);
          if (decoded) parsedCart = decoded;
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
        localStorage.removeItem(STORAGE_KEYS.CART);
      }

      try {
        const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        if (savedWishlist) {
          const decoded = decodeData(savedWishlist);
          if (decoded) parsedWishlist = decoded;
        }
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
        localStorage.removeItem(STORAGE_KEYS.WISHLIST);
      }

      dispatch({
        type: ACTIONS.SET_INITIAL_STATE,
        payload: {
          items: Array.isArray(parsedCart) ? parsedCart : [],
          wishlist: Array.isArray(parsedWishlist) ? parsedWishlist : [],
          isLoaded: true,
        }
      });
    }
  }, []);

  // Save to localStorage whenever cart/wishlist changes (after initial load)
  useEffect(() => {
    if (state.isLoaded && typeof window !== "undefined") {
      try {
        const encodedCart = encodeData(state.items);
        const encodedWishlist = encodeData(state.wishlist);

        if (encodedCart) localStorage.setItem(STORAGE_KEYS.CART, encodedCart);
        if (encodedWishlist) localStorage.setItem(STORAGE_KEYS.WISHLIST, encodedWishlist);
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }
    }
  }, [state.items, state.wishlist, state.isLoaded]);

  const addToCart = useCallback((product: Product, variant: Variant, quantity: number = 1) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { product, variant, quantity } });
  }, []);

  const removeFromCart = useCallback((sku: string) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { sku } });
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { sku, quantity } });
  }, []);

  const applyDiscount = useCallback((code: string) => {
    dispatch({ type: ACTIONS.APPLY_DISCOUNT, payload: { code } });
    return true;
  }, []);

  const removeDiscount = useCallback(() => {
    dispatch({ type: ACTIONS.REMOVE_DISCOUNT });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    dispatch({ type: ACTIONS.TOGGLE_WISHLIST, payload: { product } });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_WISHLIST });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return state.wishlist.some(p => p.id === productId);
  }, [state.wishlist]);

  const wishlistCount = useMemo(() => state.wishlist.length, [state.wishlist]);

  // Derived values
  const {
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    tax,
    total,
  } = useMemo(() => getDerivedCartState(state), [state]);

  const value = useMemo(
    () => ({
      items: state.items,
      wishlist: state.wishlist,
      discountCode: state.discountCode,
      isLoaded: state.isLoaded,
      itemCount,
      subtotal,
      discountAmount,
      shippingCost,
      tax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyDiscount,
      removeDiscount,
      clearCart,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
      wishlistCount,
    }),
    [
      state.items,
      state.wishlist,
      state.discountCode,
      state.isLoaded,
      itemCount,
      subtotal,
      discountAmount,
      shippingCost,
      tax,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      applyDiscount,
      removeDiscount,
      clearCart,
      toggleWishlist,
      clearWishlist,
      isInWishlist,
      wishlistCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ===== Hook =====
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
