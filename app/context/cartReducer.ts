import { CartState, Product, Variant, DiscountCode } from "../types/index";
import { discountCodes } from "../lib/mock-data";

export const STORAGE_KEYS = {
  CART: "luxe_cart",
  WISHLIST: "luxe_wishlist",
};

// ===== Initial State =====
export const initialState: CartState = {
  items: [],
  wishlist: [],
  discountCode: null,
  isLoaded: false,
};

// ===== Action Types =====
export const ACTIONS = {
  SET_INITIAL_STATE: "SET_INITIAL_STATE" as const,
  ADD_ITEM: "ADD_ITEM" as const,
  REMOVE_ITEM: "REMOVE_ITEM" as const,
  UPDATE_QUANTITY: "UPDATE_QUANTITY" as const,
  APPLY_DISCOUNT: "APPLY_DISCOUNT" as const,
  REMOVE_DISCOUNT: "REMOVE_DISCOUNT" as const,
  CLEAR_CART: "CLEAR_CART" as const,
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST" as const,
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST" as const,
  TOGGLE_WISHLIST: "TOGGLE_WISHLIST" as const,
  CLEAR_WISHLIST: "CLEAR_WISHLIST" as const,
};

export type Action =
  | { type: typeof ACTIONS.SET_INITIAL_STATE; payload: Partial<CartState> }
  | { type: typeof ACTIONS.ADD_ITEM; payload: { product: Product; variant: Variant; quantity?: number } }
  | { type: typeof ACTIONS.REMOVE_ITEM; payload: { sku: string } }
  | { type: typeof ACTIONS.UPDATE_QUANTITY; payload: { sku: string; quantity: number } }
  | { type: typeof ACTIONS.APPLY_DISCOUNT; payload: { code: string } }
  | { type: typeof ACTIONS.REMOVE_DISCOUNT }
  | { type: typeof ACTIONS.CLEAR_CART }
  | { type: typeof ACTIONS.ADD_TO_WISHLIST; payload: { product: Product } }
  | { type: typeof ACTIONS.REMOVE_FROM_WISHLIST; payload: { productId: string } }
  | { type: typeof ACTIONS.TOGGLE_WISHLIST; payload: { product: Product } }
  | { type: typeof ACTIONS.CLEAR_WISHLIST };

// ===== Reducer (pure – no side effects) =====
export function cartReducer(state: CartState, action: Action): CartState {
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
        newItems = [...state.items, { id: variant.sku, product, variant, quantity }];
      }

      return { ...state, items: newItems };
    }

    case ACTIONS.REMOVE_ITEM: {
      const { sku } = action.payload;
      const newItems = state.items.filter((item) => item.variant.sku !== sku);
      return { ...state, items: newItems };
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
      return { ...state, items: newItems };
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
      return { ...state, discountCode: null };
    }

    case ACTIONS.CLEAR_CART: {
      return { ...initialState, wishlist: state.wishlist, isLoaded: state.isLoaded };
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
      return { ...state, wishlist: newWishlist };
    }

    case ACTIONS.CLEAR_WISHLIST: {
      return { ...state, wishlist: [] };
    }

    default:
      return state;
  }
}

// ===== Derived State Selectors (pure – no side effects) =====
export function getDerivedCartState(state: CartState) {
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.variant?.price || 0) * item.quantity,
    0
  );

  let discountAmount = 0;
  if (state.discountCode) {
    const d = state.discountCode;
    if (subtotal >= (d.min_spend || 0)) {
      if (d.type === "percentage") {
        discountAmount = (subtotal * d.value) / 100;
      } else if (d.type === "fixed") {
        discountAmount = Math.min(d.value, subtotal);
      }
    }
  }

  let shippingCost = 0;
  if (state.items.length > 0) {
    if (state.discountCode?.type === "free_shipping") {
      shippingCost = 0;
    } else if (subtotal >= 100) {
      shippingCost = 0; // free shipping over $100
    } else {
      shippingCost = 9.99;
    }
  }

  const tax = (subtotal - discountAmount) * 0.08;

  const total = subtotal - discountAmount + shippingCost + tax;

  return {
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    tax,
    total,
  };
}
