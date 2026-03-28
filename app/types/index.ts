// ===== LuxeCommerce Global Types =====

export type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export interface Image {
  url: string;
  alt_text: string;
  is_thumbnail: boolean;
}

export interface Variant {
  sku: string;
  price: number;
  options_map: Record<string, string>;
  stock_quantity: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number;
  discount_price: number | null;
  images: Image[];
  category_id: string;
  tags: string[];
  variants: Variant[];
  weight: number;
  rating: number;
  reviewCount: number;
  status: Status;
  created_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_admin: boolean;
  default_shipping_address_id: string | null;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  variant_id: string;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  items: OrderItem[];
  shipping_address: Partial<Address>;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount_total: number;
  total: number;
  payment_status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  fulfillment_status: "UNFULFILLED" | "PARTIAL" | "FULFILLED" | "RETURNED";
  created_at: string;
}

export interface DiscountCode {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  min_spend: number;
  usage_limit: number | null;
  times_used: number;
  active: boolean;
}

export interface CartItem {
  id: string; // SKU
  product: Product;
  variant: Variant;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  wishlist: Product[];
  discountCode: DiscountCode | null;
  isLoaded: boolean;
}

export interface CartContextValue extends CartState {
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  tax: number;
  total: number;
  addToCart: (product: Product, variant: Variant, quantity?: number) => void;
  removeFromCart: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}
