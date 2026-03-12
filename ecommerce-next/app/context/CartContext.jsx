"use client";

import { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from "react";
import { discountCodes } from "@/app/lib/mock-data";

const STORAGE_KEYS = {
  CART: "luxe_cart",
  WISHLIST: "luxe_wishlist",
};

// ===== Initial State =====
const initialState = {
  items: [], // { product, variant, quantity }
  wishlist: [], // [product]
  discountCode: null,
  discountAmount: 0,
};

// ===== Action Types =====
const ACTIONS = {
  SET_INITIAL_STATE: "SET_INITIAL_STATE",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  APPLY_DISCOUNT: "APPLY_DISCOUNT",
  REMOVE_DISCOUNT: "REMOVE_DISCOUNT",
  CLEAR_CART: "CLEAR_CART",
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  TOGGLE_WISHLIST: "TOGGLE_WISHLIST",
  CLEAR_WISHLIST: "CLEAR_WISHLIST",
};

// ===== Reducer =====
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_INITIAL_STATE:
      return { ...state, ...action.payload };

    case ACTIONS.ADD_ITEM: {
      const { product, variant, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.variant.sku === variant.sku
      );

      let newItems;
      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, variant, quantity }];
      }

      const newState = { ...state, items: newItems };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newState.items));
      }
      return newState;
    }

    case ACTIONS.REMOVE_ITEM: {
      const { sku } = action.payload;
      const newItems = state.items.filter((item) => item.variant.sku !== sku);
      const newState = { ...state, items: newItems };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newState.items));
      }
      return newState;
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { sku, quantity } = action.payload;
      let newItems;
      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.variant.sku !== sku);
      } else {
        newItems = state.items.map((item) =>
          item.variant.sku === sku ? { ...item, quantity } : item
        );
      }
      const newState = { ...state, items: newItems };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newState.items));
      }
      return newState;
    }

    case ACTIONS.APPLY_DISCOUNT: {
      const { code } = action.payload;
      const discount = discountCodes.find(
        (d) => d.code.toUpperCase() === code.toUpperCase() && d.active
      );
      if (!discount) return state;
      return { ...state, discountCode: discount };
    }

    case ACTIONS.REMOVE_DISCOUNT: {
      return { ...state, discountCode: null, discountAmount: 0 };
    }

    case ACTIONS.CLEAR_CART: {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.CART);
      }
      return { ...initialState, wishlist: state.wishlist };
    }

    case ACTIONS.ADD_TO_WISHLIST: {
      const { product } = action.payload;
      if (state.wishlist.find((p) => p.id === product.id)) return state;
      const newWishlist = [...state.wishlist, product];
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(newWishlist));
      }
      return { ...state, wishlist: newWishlist };
    }

    case ACTIONS.REMOVE_FROM_WISHLIST: {
      const { productId } = action.payload;
      const newWishlist = state.wishlist.filter((p) => p.id !== productId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(newWishlist));
      }
      return { ...state, wishlist: newWishlist };
    }

    case ACTIONS.TOGGLE_WISHLIST: {
      const { product } = action.payload;
      const exists = state.wishlist.find((p) => p.id === product.id);
      let newWishlist;
      if (exists) {
        newWishlist = state.wishlist.filter((p) => p.id !== product.id);
      } else {
        newWishlist = [...state.wishlist, product];
      }
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(newWishlist));
      }
      return { ...state, wishlist: newWishlist };
    }

    case ACTIONS.CLEAR_WISHLIST: {
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.WISHLIST);
      }
      return { ...state, wishlist: [] };
    }

    default:
      return state;
  }
}

// ===== Context =====
const CartContext = createContext(null);

// ===== Provider =====
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      
      dispatch({
        type: ACTIONS.SET_INITIAL_STATE,
        payload: {
          items: savedCart ? JSON.parse(savedCart) : [],
          wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
        }
      });
    }
  }, []);

  const addToCart = useCallback((product, variant, quantity = 1) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { product, variant, quantity } });
  }, []);

  const removeFromCart = useCallback((sku) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { sku } });
  }, []);

  const updateQuantity = useCallback((sku, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { sku, quantity } });
  }, []);

  const applyDiscount = useCallback((code) => {
    dispatch({ type: ACTIONS.APPLY_DISCOUNT, payload: { code } });
  }, []);

  const removeDiscount = useCallback(() => {
    dispatch({ type: ACTIONS.REMOVE_DISCOUNT });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  }, []);

  const toggleWishlist = useCallback((product) => {
    dispatch({ type: ACTIONS.TOGGLE_WISHLIST, payload: { product } });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_WISHLIST });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return state.wishlist.some(p => p.id === productId);
  }, [state.wishlist]);

  const wishlistCount = useMemo(() => state.wishlist.length, [state.wishlist]);

  // Derived values
  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + (item.variant?.price || 0) * item.quantity,
        0
      ),
    [state.items]
  );

  const discountAmount = useMemo(() => {
    if (!state.discountCode) return 0;
    const d = state.discountCode;
    if (subtotal < (d.min_spend || 0)) return 0;
    if (d.type === "percentage") return (subtotal * d.value) / 100;
    if (d.type === "fixed") return Math.min(d.value, subtotal);
    return 0;
  }, [state.discountCode, subtotal]);

  const shippingCost = useMemo(() => {
    if (state.items.length === 0) return 0;
    if (state.discountCode?.type === "free_shipping") return 0;
    if (subtotal >= 100) return 0; // free shipping over $100
    return 9.99;
  }, [subtotal, state.discountCode, state.items.length]);

  const tax = useMemo(() => (subtotal - discountAmount) * 0.08, [subtotal, discountAmount]);

  const total = useMemo(
    () => subtotal - discountAmount + shippingCost + tax,
    [subtotal, discountAmount, shippingCost, tax]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      wishlist: state.wishlist,
      discountCode: state.discountCode,
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
