// ===== LuxeCommerce Mock Data =====
// Data Blueprints based on PROJECT_SPEC.md §6
import type { Product, Category, User, Address, Order, DiscountCode, Review } from "../types/index.ts";

// ===== Categories =====
export const categories: Category[] = [
  { id: "cat-1", name: "Audio", slug: "audio", icon: "headphones", productCount: 24 },
  { id: "cat-2", name: "Computers", slug: "computers", icon: "laptop_mac", productCount: 18 },
  { id: "cat-3", name: "Watches", slug: "watches", icon: "watch", productCount: 15 },
  { id: "cat-4", name: "Accessories", slug: "accessories", icon: "devices_other", productCount: 32 },
  { id: "cat-5", name: "Phones", slug: "phones", icon: "smartphone", productCount: 21 },
  { id: "cat-6", name: "Gaming", slug: "gaming", icon: "sports_esports", productCount: 12 },
];

// ===== Products =====
export const products: Product[] = [
  {
    id: "prod-001",
    name: "Luxe Pro Watch 4",
    slug: "luxe-pro-watch-4",
    description: "The ultimate smartwatch experience. Crafted with surgical-grade titanium and featuring an always-on Retina display, health sensors, and 72-hour battery life.",
    base_price: 499.00,
    discount_price: null,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2dtZVC226ys07PtbTQx4YgkKNIQcWYrtiorBhs4vkb8M4XQxhWiv59oh6sNT3uN310X_p-DU1ixoX8YGMzPXdQKm7XDbXuwVNPpVknngvkAtFYbWS0RwboEb_4bhMJybhXIuY8kUMXZtOKeiZbRyder8UfzPLkDJxexZr03mXQmQDdZzuDKCDKTWa4pAHuPk77UtruIQxvzTXFVAtSBl_SnMROUJEMaRRK9i1KiDU2vYEDjB5sYQWTgG5nvrFsFkFCSUx962fWpI", alt_text: "Modern smartwatch with metal strap", is_thumbnail: true },
    ],
    category_id: "cat-3",
    tags: ["trending", "new-arrival", "best-seller"],
    variants: [
      { sku: "LPW4-SLV-40", price: 499.00, options_map: { size: "40mm", color: "Silver" }, stock_quantity: 24 },
      { sku: "LPW4-BLK-44", price: 549.00, options_map: { size: "44mm", color: "Midnight Black" }, stock_quantity: 18 },
      { sku: "LPW4-GLD-44", price: 599.00, options_map: { size: "44mm", color: "Gold" }, stock_quantity: 7 },
    ],
    weight: 0.15,
    rating: 4.9,
    reviewCount: 124,
    status: "PUBLISHED",
    created_at: "2025-11-15T10:00:00Z",
  },
  {
    id: "prod-002",
    name: "Zenith Air M2",
    slug: "zenith-air-m2",
    description: "Impossibly thin, incredibly powerful. Featuring an M2 chip, 15-hour battery life, and a stunning Liquid Retina display in a design that defies physics.",
    base_price: 1299.00,
    discount_price: 1199.00,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuANCrGd9qY7HHoEeG7gYPYBTC6WKMnxGJd1lbjDT2swZgT14lG8JhV3ZvFcUv6UMiEnHLia0zFXtQ0kdADyRj6Eza0qdbweiky5T1e2PV-LppZqoOHru0A2PZ_482LkUv3ew744ciOm5u8ksqgIYom6wgpgAdtdvBR15g9CrriW07kFE_iL4TjEPguv1LOtxx_Lo3eHYkyeCWafPIy73CCtXW4sfTDfmk2q6rkpjfID0GLiMwrggxzHcpuvVDuaofYLE3TcMtZqibE", alt_text: "Slim professional laptop on dark surface", is_thumbnail: true },
    ],
    category_id: "cat-2",
    tags: ["new-arrival"],
    variants: [
      { sku: "ZAM2-8-256", price: 1299.00, options_map: { ram: "8GB", storage: "256GB" }, stock_quantity: 42 },
      { sku: "ZAM2-16-512", price: 1599.00, options_map: { ram: "16GB", storage: "512GB" }, stock_quantity: 30 },
      { sku: "ZAM2-24-1T", price: 1999.00, options_map: { ram: "24GB", storage: "1TB" }, stock_quantity: 15 },
    ],
    weight: 1.24,
    rating: 4.8,
    reviewCount: 89,
    status: "PUBLISHED",
    created_at: "2025-10-01T10:00:00Z",
  },
  {
    id: "prod-003",
    name: "Luxe Audio Hub",
    slug: "luxe-audio-hub",
    description: "Studio-quality sound meets luxury design. Active noise cancellation, spatial audio, and 40-hour battery in premium hand-stitched leather and brushed aluminum.",
    base_price: 349.00,
    discount_price: null,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqRtFm-CMflUGVB7Hu1sptulbHG_33w-htQD1WZw-7w-p_ARefcMA-QWGHI7mQKRZmYPZbpIJ-5QI3c0PPjI9zf530DVWEv4yZ6fKexh_aeP4htuIq5nqHhuMiNJR8oGmsL-8CDaenNL4e-h6HPj26D7mVqwwi2yrEoz6eMVor2blDgP5ZldGjZOQ2H3ywUkfAFW34vRiuSmGhF_g3fCn9_FYyts5jDl8-XY7tUJLFpu1cUeR1ESOwT0ZYdEEPL4MLiQ8w5nBOEWU", alt_text: "High fidelity over-ear headphones", is_thumbnail: true },
    ],
    category_id: "cat-1",
    tags: ["best-seller"],
    variants: [
      { sku: "LAH-BLK", price: 349.00, options_map: { color: "Obsidian Black" }, stock_quantity: 56 },
      { sku: "LAH-WHT", price: 349.00, options_map: { color: "Pearl White" }, stock_quantity: 34 },
      { sku: "LAH-NVY", price: 369.00, options_map: { color: "Navy Blue" }, stock_quantity: 22 },
    ],
    weight: 0.32,
    rating: 4.7,
    reviewCount: 256,
    status: "PUBLISHED",
    created_at: "2025-09-20T10:00:00Z",
  },
  {
    id: "prod-004",
    name: "Elevate Earbuds Pro",
    slug: "elevate-earbuds-pro",
    description: "True wireless freedom. Crystal-clear audio, adaptive noise cancellation, and a sleek charging case that fits in the palm of your hand.",
    base_price: 199.00,
    discount_price: 159.00,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmjOSo4kXibkr6xpYp21EI0d7S9UghT22Un4CIq2qBSE3D4YAB_pHTbCDN-Ipo0OHXJPVUW7ik0yOONhuF6Jtzoeov5n0yQWe3hQLvm7e8un-DIntonuDrVnstmZ-0DDCqL0Aj0Vm5M8pWXHrkvgUis339Lrhz1Y9glucfRyvBExDKaXwvQDrr44u3FvjCCEhEPQpDgVE89LT07o6FK-sM5pFvFKTl7TqQUkTkr3pI9shYAgNUCZfYNQZ1feOStkJVHG_LBRp2w4w", alt_text: "Wireless earbuds with charging case", is_thumbnail: true },
    ],
    category_id: "cat-1",
    tags: ["trending", "sale"],
    variants: [
      { sku: "EEP-BLK", price: 199.00, options_map: { color: "Stealth Black" }, stock_quantity: 120 },
      { sku: "EEP-WHT", price: 199.00, options_map: { color: "Arctic White" }, stock_quantity: 85 },
    ],
    weight: 0.06,
    rating: 4.6,
    reviewCount: 312,
    status: "PUBLISHED",
    created_at: "2025-12-01T10:00:00Z",
  },
  {
    id: "prod-005",
    name: "Quantum Phone X",
    slug: "quantum-phone-x",
    description: "The future is here. A 6.7\" Super AMOLED display, 200MP camera system, and all-day battery with 120W hyper-charge capability.",
    base_price: 999.00,
    discount_price: null,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmjOSo4kXibkr6xpYp21EI0d7S9UghT22Un4CIq2qBSE3D4YAB_pHTbCDN-Ipo0OHXJPVUW7ik0yOONhuF6Jtzoeov5n0yQWe3hQLvm7e8un-DIntonuDrVnstmZ-0DDCqL0Aj0Vm5M8pWXHrkvgUis339Lrhz1Y9glucfRyvBExDKaXwvQDrr44u3FvjCCEhEPQpDgVE89LT07o6FK-sM5pFvFKTl7TqQUkTkr3pI9shYAgNUCZfYNQZ1feOStkJVHG_LBRp2w4w", alt_text: "Premium smartphone front view", is_thumbnail: true },
    ],
    category_id: "cat-5",
    tags: ["new-arrival", "trending"],
    variants: [
      { sku: "QPX-128-BLK", price: 999.00, options_map: { storage: "128GB", color: "Cosmos Black" }, stock_quantity: 45 },
      { sku: "QPX-256-BLU", price: 1099.00, options_map: { storage: "256GB", color: "Ocean Blue" }, stock_quantity: 28 },
      { sku: "QPX-512-GLD", price: 1299.00, options_map: { storage: "512GB", color: "Sunrise Gold" }, stock_quantity: 12 },
    ],
    weight: 0.21,
    rating: 4.5,
    reviewCount: 78,
    status: "PUBLISHED",
    created_at: "2025-12-15T10:00:00Z",
  },
  {
    id: "prod-006",
    name: "Stealth Gaming Controller",
    slug: "stealth-gaming-controller",
    description: "Precision engineered for competitive gaming. Hall effect thumbsticks, adaptive triggers, RGB lighting, and ultra-low latency wireless connectivity.",
    base_price: 79.99,
    discount_price: null,
    images: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqRtFm-CMflUGVB7Hu1sptulbHG_33w-htQD1WZw-7w-p_ARefcMA-QWGHI7mQKRZmYPZbpIJ-5QI3c0PPjI9zf530DVWEv4yZ6fKexh_aeP4htuIq5nqHhuMiNJR8oGmsL-8CDaenNL4e-h6HPj26D7mVqwwi2yrEoz6eMVor2blDgP5ZldGjZOQ2H3ywUkfAFW34vRiuSmGhF_g3fCn9_FYyts5jDl8-XY7tUJLFpu1cUeR1ESOwT0ZYdEEPL4MLiQ8w5nBOEWU", alt_text: "Gaming controller with RGB lighting", is_thumbnail: true },
    ],
    category_id: "cat-6",
    tags: ["best-seller"],
    variants: [
      { sku: "SGC-BLK", price: 79.99, options_map: { color: "Shadow Black" }, stock_quantity: 200 },
      { sku: "SGC-WHT", price: 79.99, options_map: { color: "Ghost White" }, stock_quantity: 150 },
    ],
    weight: 0.28,
    rating: 4.8,
    reviewCount: 445,
    status: "PUBLISHED",
    created_at: "2025-08-10T10:00:00Z",
  },
];

// ===== Users / Customers =====
export const users: User[] = [
  {
    id: "user-001",
    email: "alex.morgan@email.com",
    first_name: "Alex",
    last_name: "Morgan",
    phone: "+1 (555) 012-3456",
    is_admin: false,
    default_shipping_address_id: "addr-001",
    created_at: "2025-06-15T09:30:00Z",
  },
  {
    id: "user-002",
    email: "sarah.chen@email.com",
    first_name: "Sarah",
    last_name: "Chen",
    phone: "+1 (555) 789-0123",
    is_admin: false,
    default_shipping_address_id: "addr-002",
    created_at: "2025-07-20T14:15:00Z",
  },
  {
    id: "user-admin",
    email: "admin@luxecommerce.com",
    first_name: "Admin",
    last_name: "User",
    phone: "+1 (555) 000-0000",
    is_admin: true,
    default_shipping_address_id: null,
    created_at: "2025-01-01T00:00:00Z",
  },
];

// ===== Addresses =====
export const addresses: Address[] = [
  {
    id: "addr-001",
    user_id: "user-001",
    street: "123 Innovation Drive",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "US",
    is_default: true,
  },
  {
    id: "addr-002",
    user_id: "user-002",
    street: "456 Tech Park Lane",
    city: "Austin",
    state: "TX",
    zip: "73301",
    country: "US",
    is_default: true,
  },
];

// ===== Orders =====
export const orders: Order[] = [
  {
    id: "order-001",
    order_number: "#ORD-1001",
    customer_id: "user-001",
    customer_name: "Alex Morgan",
    items: [
      { product_id: "prod-001", variant_id: "LPW4-BLK-44", product_name: "Luxe Pro Watch 4", quantity: 1, price_at_purchase: 549.00 },
      { product_id: "prod-003", variant_id: "LAH-BLK", product_name: "Luxe Audio Hub", quantity: 1, price_at_purchase: 349.00 },
    ],
    shipping_address: { street: "123 Innovation Drive", city: "San Francisco", state: "CA", zip: "94105", country: "US" },
    subtotal: 898.00,
    tax: 71.84,
    shipping_cost: 0.00,
    discount_total: 89.80,
    total: 880.04,
    payment_status: "PAID",
    fulfillment_status: "FULFILLED",
    created_at: "2025-12-20T15:30:00Z",
  },
  {
    id: "order-002",
    order_number: "#ORD-1002",
    customer_id: "user-002",
    customer_name: "Sarah Chen",
    items: [
      { product_id: "prod-002", variant_id: "ZAM2-16-512", product_name: "Zenith Air M2", quantity: 1, price_at_purchase: 1599.00 },
    ],
    shipping_address: { street: "456 Tech Park Lane", city: "Austin", state: "TX", zip: "73301", country: "US" },
    subtotal: 1599.00,
    tax: 131.92,
    shipping_cost: 0.00,
    discount_total: 0.00,
    total: 1730.92,
    payment_status: "PAID",
    fulfillment_status: "PARTIAL",
    created_at: "2025-12-22T09:45:00Z",
  },
];

// ===== Discount Codes =====
export const discountCodes: DiscountCode[] = [
  { code: "FIRST20", type: "percentage", value: 20, min_spend: 50, usage_limit: 1, times_used: 342, active: true },
  { code: "FREESHIP", type: "free_shipping", value: 0, min_spend: 100, usage_limit: null, times_used: 1205, active: true },
  { code: "SAVE50", type: "fixed", value: 50, min_spend: 200, usage_limit: 100, times_used: 67, active: true },
];

// ===== Navigation Links =====
export const navLinks = {
  shop: [
    { label: "Audio", href: "/collections/audio" },
    { label: "Computers", href: "/collections/computers" },
    { label: "Watches", href: "/collections/watches" },
    { label: "Accessories", href: "/collections/accessories" },
  ],
  support: [
    { label: "Tracking", href: "/tracking" },
    { label: "Returns", href: "/returns" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "About Us", href: "/about" },
  ],
};

// ===== Hero Slides =====
export const heroSlides = [
  {
    id: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmjOSo4kXibkr6xpYp21EI0d7S9UghT22Un4CIq2qBSE3D4YAB_pHTbCDN-Ipo0OHXJPVUW7ik0yOONhuF6Jtzoeov5n0yQWe3hQLvm7e8un-DIntonuDrVnstmZ-0DDCqL0Aj0Vm5M8pWXHrkvgUis339Lrhz1Y9glucfRyvBExDKaXwvQDrr44u3FvjCCEhEPQpDgVE89LT07o6FK-sM5pFvFKTl7TqQUkTkr3pI9shYAgNUCZfYNQZ1feOStkJVHG_LBRp2w4w",
    alt: "Premium audio equipment",
    tagline: "New Generation",
    title: "Elevate Your Reality",
    cta: "Shop Now",
    href: "/collections/audio",
  },
];

// ===== Reviews =====
export const reviews: Review[] = [
  {
    id: "rev-001",
    product_id: "prod-001",
    user_name: "Alex Morgan",
    rating: 5,
    comment: "Absolutely love this watch! The battery life is amazing and the display is super crisp.",
    verified: true,
    created_at: "2025-12-25T10:00:00Z",
  },
  {
    id: "rev-002",
    product_id: "prod-001",
    user_name: "Jordan Lee",
    rating: 4,
    comment: "Great watch, but a bit pricey. The health tracking features are top notch though.",
    verified: false,
    created_at: "2025-12-26T14:30:00Z",
  },
  {
    id: "rev-003",
    product_id: "prod-003",
    user_name: "Sarah Chen",
    rating: 5,
    comment: "The noise cancellation on these headphones is unreal. Highly recommend for travel.",
    verified: true,
    created_at: "2025-12-28T09:15:00Z",
  },
];

// ===== Helper: Get products by tag =====
export function getProductsByTag(tag: string): Product[] {
  if (!tag) return [];
  return products.filter(p => p.tags?.includes(tag));
}

// ===== Helper: O(1) Lookup Maps =====
export const productsBySlug = products.reduce((acc, product) => {
  acc[product.slug] = product;
  return acc;
}, {} as Record<string, Product>);

// ===== Helper: Get product by slug =====
export function getProductBySlug(slug: string): Product | undefined {
  return productsBySlug[slug];
}

// ===== Helper: Get products by category =====
export function getProductsByCategory(categorySlug: string): Product[] {
  const cat = categories.find(c => c.slug === categorySlug);
  if (!cat) return [];
  return products.filter(p => p.category_id === cat.id);
}

// ===== Helper: Format price =====
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// ===== Helper: Calculate discount percentage =====
export function getDiscountPercent(basePrice: number, discountPrice: number | null): number {
  if (!discountPrice || !basePrice || basePrice <= 0 || discountPrice >= basePrice || discountPrice < 0) {
    return 0;
  }
  return Math.round(((basePrice - discountPrice) / basePrice) * 100);
}

// ===== Helper: Get stock status =====
export function getStockStatus(product: Product): { label: string; color: "success" | "warning" | "danger" } {
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock_quantity, 0);
  if (totalStock === 0) return { label: "Out of Stock", color: "danger" };
  if (totalStock <= 10) return { label: "Low Stock", color: "warning" };
  return { label: "In Stock", color: "success" };
}
