# Project Specification: E-Commerce Practice Platform

This document provides a comprehensive, "gold-standard" specification for building a full-featured E-Commerce platform. It is designed for developers to use as a practice roadmap, covering the Customer Storefront and the Admin Dashboard in exhaustive detail.

---

## 1. Customer Storefront

The Customer Storefront is the public-facing side of the application where users browse, search, and purchase products.

### 1.1 Core Pages & UI Components

#### **Home Page**
- **Header:**
  - Sticky navigation bar.
  - Brand Logo (linked to Home).
  - Search bar with autocomplete suggestions.
  - Category dropdown menu.
  - User Account icon (Login/Register or Profile/Logout).
  - Cart icon with a dynamic item count badge.
- **Hero Section:**
  - Auto-playing/manual slider for promotions and featured collections.
  - Call-to-action (CTA) buttons (e.g., "Shop Now").
- **Featured Collections:**
  - Grid of "New Arrivals," "Best Sellers," and "Trending Items."
  - Each item displays: Image, Title, Price, Star Rating, and a "Quick Add" button.
- **Newsletter Subscription:**
  - Email input and "Subscribe" button with validation.
- **Footer:**
  - Links to About Us, FAQ, Terms of Service, Privacy Policy.
  - Social media icons.
  - Accepted payment methods icons.

#### **Product Listing Page (PLP)**
- **Sidebar Filters:**
  - Category tree.
  - Price Range (slider or min/max inputs).
  - Brand/Manufacturer checkboxes.
  - Ratings (4 stars & up, etc.).
  - Size/Color/Material (dynamic based on category).
  - "Clear All" button.
- **Sorting Options:**
  - Dropdown: Popularity, Newest, Price (Low to High), Price (High to Low).
- **Product Grid:**
  - Responsive cards with hover effects.
  - Pagination or "Load More" button.
  - Empty state message if no products match filters.

#### **Product Detail Page (PDP)**
- **Image Gallery:**
  - Main high-res image with zoom-on-hover.
  - Thumbnail carousel for multiple views.
- **Product Info:**
  - Breadcrumbs (e.g., Home > Electronics > Headphones).
  - Product Title and SKU.
  - Price (Current, Original, and % Discount).
  - Availability status (In Stock, Low Stock, Out of Stock).
- **Selection Options:**
  - Quantity selector (with min/max limits).
  - Variant selectors (Size, Color, etc.).
- **Actions:**
  - "Add to Cart" button.
  - "Add to Wishlist" toggle.
- **Tabs/Accordions:**
  - Detailed Description.
  - Technical Specifications.
  - Shipping & Returns Policy.
- **Reviews Section:**
  - Average rating summary.
  - Filterable list of reviews with user photos and "Verified Purchase" badges.

#### **Shopping Cart Page**
- **Item List:**
  - Table showing Item Image, Name, Variants, Unit Price, Quantity (editable), and Subtotal.
  - "Remove" button for each item.
- **Order Summary Sidebar:**
  - Subtotal.
  - Estimated Shipping (toggle/zip code input).
  - Estimated Tax.
  - Promo Code input field.
  - Grand Total.
  - "Proceed to Checkout" CTA.

#### **Checkout Flow (Multi-step)**
1.  **Authentication:** Guest checkout vs. Login/Register.
2.  **Shipping Address:** Form with validation, saved addresses for logged-in users.
3.  **Shipping Method:** Selection of options (Standard, Express, etc.) with real-time price updates.
4.  **Payment Method:** Credit Card (form with mask), PayPal, or other integrations.
5.  **Review & Place Order:** Final summary of all items and costs.

---

## 2. Admin Dashboard

The Admin Dashboard is the internal tool used by site owners to manage the business.

### 2.1 Core Modules

#### **Dashboard Overview (Analytics)**
- **Key Metrics Cards:** Total Sales, Number of Orders, New Customers, Average Order Value (AOV).
- **Charts:**
  - Sales over time (Line/Bar chart).
  - Sales by Category (Pie chart).
- **Recent Activity:** List of the last 10 orders or new user registrations.

#### **Product Management**
- **Product List:**
  - Table with bulk actions (Delete, Publish/Unpublish).
  - Search and filter by Status (Draft, Active, Archived).
- **Add/Edit Product Form:**
  - Basic Info: Title, Slug, Description (Rich Text Editor).
  - Media: Drag-and-drop image uploader with reordering.
  - Pricing: Base Price, Compare-at Price, Cost per Item.
  - Inventory: SKU, Barcode, Track Quantity toggle, Stock level.
  - Variants: Ability to add attributes (Size, Color) and manage individual SKU/Price/Stock per variant.

#### **Order Management**
- **Order List:** Table with Order ID, Date, Customer Name, Payment Status, Fulfillment Status, and Total.
- **Order Details View:**
  - Customer contact info and shipping address.
  - Timeline of order status changes (Pending -> Paid -> Shipped -> Delivered).
  - Fulfillment UI: Mark items as shipped, add Tracking Number.
  - Refund/Cancellation buttons.

#### **Customer Management**
- **Customer List:** Table with Name, Email, Location, Total Orders, and Total Spent.
- **Customer Detail:**
  - History of all orders placed by the user.
  - Ability to add internal notes about a customer.
  - Reset password / Deactivate account actions.

#### **Marketing & Promotions (Admin)**
- **Discount Code Manager:**
  - Create codes with specific parameters (Start/End Date, Usage Limit, Type).
  - Track usage count and revenue generated per code.
- **Banners & Announcements:**
  - CMS-style editor to change the Home Page hero text and images without code changes.

#### **Settings & Configurations (Admin)**
- **Store Settings:** Name, Contact Email, Currency selection, Unit system (Metric/Imperial).
- **Tax Rules:** Define tax rates by country/state.
- **Shipping Zones:** Set flat rates or weight-based rates for different geographical regions.

---

## 3. Customer Account Features (Storefront)

#### **User Profile**
- **Personal Info:** Name, Email, Phone, Birthday.
- **Security:** Change password, Enable Two-Factor Authentication (2FA).
- **Address Book:** Manage multiple shipping and billing addresses.

#### **Order History**
- **List View:** All past orders with status and date.
- **Order Details:** Ability to download invoices, track current shipments, and initiate returns.

#### **Wishlist**
- Save items for later.
- Move items from Wishlist to Cart.
- Share Wishlist via public link.

---

## 4. Technical UI Standards

#### **Responsive Breakpoints**
- **Mobile (Small):** < 640px (Single column product grids, hamburger menu).
- **Tablet (Medium):** 640px - 1024px (2-column grids, sidebar becomes drawer).
- **Desktop (Large):** > 1024px (4-column grids, persistent sidebars).

#### **Accessibility (a11y)**
- **Semantic HTML:** Proper use of `<main>`, `<nav>`, `<section>`, `<article>`, and `<header>`.
- **Keyboard Navigation:** All interactive elements must be focusable and reachable via `Tab`.
- **ARIA Labels:** For complex components like quantity selectors and image carousels.
- **Alt Text:** Mandatory for all product images.
- **Color Contrast:** Minimum ratio of 4.5:1 for text.

---

## 5. Advanced Features & Edge Cases

### 5.1 States & Feedback
- **Loading States:** Skeleton screens for product grids and detail pages while data is fetching.
- **Empty States:**
  - Empty Cart: "Your cart is empty" with a "Start Shopping" button.
  - No Search Results: "We couldn't find anything for '[query]'" with suggested categories.
  - No Order History: "You haven't placed any orders yet."
- **Success/Error Feedback:**
  - Toast notifications for "Item added to cart."
  - Inline validation errors for checkout forms (e.g., "Invalid ZIP code").
  - Modal confirmations for destructive actions in Admin (e.g., "Are you sure you want to delete this product?").

### 5.2 Search & SEO
- **SEO Metadata:** Dynamic generation of Meta Titles and Descriptions for every PDP and PLP.
- **Canonical URLs:** To prevent duplicate content issues with filtered listings.
- **Sitemap:** Automatically generated XML sitemap for search engines.
- **URL Structure:**
  - PLP: `/collections/[category-slug]`
  - PDP: `/products/[product-slug]`
  - Search: `/search?q=[query]`

### 5.3 Email Notifications
- **Customer Emails:**
  - Welcome Email (on registration).
  - Order Confirmation (with receipt PDF).
  - Shipping Confirmation (with tracking link).
  - Order Delivered.
  - Password Reset Request.
- **Admin Emails:**
  - New Order Alert.
  - Low Stock Warning.
  - Customer Support Inquiry.

---

## 6. Data Blueprints (Object Definitions)

### 6.1 User / Customer Object
- `id` (UUID)
- `email` (String, Unique)
- `password_hash` (String)
- `first_name` (String)
- `last_name` (String)
- `default_shipping_address_id` (UUID)
- `phone` (String)
- `is_admin` (Boolean)
- `created_at` (Timestamp)

### 6.2 Product Object
- `id` (UUID)
- `name` (String)
- `slug` (String, URL-friendly)
- `description` (Markdown/HTML)
- `base_price` (Decimal)
- `discount_price` (Decimal, optional)
- `images` (Array of Objects: `url`, `alt_text`, `is_thumbnail`)
- `category_id` (UUID)
- `tags` (Array of Strings)
- `variants` (Array of Variant Objects: `sku`, `price`, `options_map`, `stock_quantity`)
- `weight` (Decimal, for shipping)
- `status` (Enum: `DRAFT`, `PUBLISHED`, `ARCHIVED`)
- `created_at` (Timestamp)

### 6.3 Order Object
- `id` (UUID)
- `order_number` (String, e.g., #ORD-1001)
- `customer_id` (UUID)
- `items` (Array of OrderItem Objects: `product_id`, `variant_id`, `quantity`, `price_at_purchase`)
- `shipping_address` (Address Object: `street`, `city`, `state`, `zip`, `country`)
- `subtotal` (Decimal)
- `tax` (Decimal)
- `shipping_cost` (Decimal)
- `discount_total` (Decimal)
- `total` (Decimal)
- `payment_status` (Enum: `PENDING`, `PAID`, `FAILED`, `REFUNDED`)
- `fulfillment_status` (Enum: `UNFULFILLED`, `PARTIAL`, `FULFILLED`, `RETURNED`)

---

## 7. Key Business Logic

### 7.1 Cart & Pricing
- **Price Calculation:** `Total = (Sum of Items) - Discounts + Shipping + Tax`.
- **Tax Logic:** Tax should be calculated based on the shipping address's state/region.
- **Stock Validation:** Users cannot add more items to the cart than are currently in stock. Stock is "reserved" upon checkout completion, not when added to the cart.

### 7.2 Discount Codes
- **Types:** Percentage-off, Fixed Amount, Free Shipping.
- **Requirements:** Minimum spend, specific collections, or one-time use per customer.
- **Conflict Resolution:** Only one discount code allowed per order (unless stackable).

### 7.3 Order Fulfillment
- An order is only "Ready to Ship" when `payment_status` is `PAID`.
- Stock levels must be decremented immediately when an order is paid.
- If an order is canceled, stock must be incremented back (restocked).

---

## 8. User Flows

### 8.1 The "Purchase Journey"
1.  **Browse:** User lands on Home, searches for "Running Shoes."
2.  **Filter:** User filters by Brand "Nike" and Size "10."
3.  **Selection:** User clicks a product, views details, selects "Red," and clicks "Add to Cart."
4.  **Review:** User opens cart, applies promo code "FIRST20," sees price update.
5.  **Checkout:** User enters shipping info, chooses "Express Shipping."
6.  **Payment:** User enters credit card details.
7.  **Confirmation:** User sees "Order Successful" page and receives an automated email.

### 8.2 The "Merchant Workflow"
1.  **Inventory Alert:** Merchant sees a "Low Stock" notification on the Dashboard.
2.  **Restock:** Merchant navigates to Product Management, edits the product, and updates quantity.
3.  **Fulfillment:** Merchant checks Order List for "Paid" orders.
4.  **Shipping:** Merchant packages the item, clicks "Fulfill Order" in the Admin UI, and pastes the tracking number.
5.  **Notification:** System automatically emails the customer with the tracking link.

### 8.3 The "Return/Refund Process"
1.  **Request:** Customer goes to Order History and clicks "Return Item" for a delivered order.
2.  **Reason:** Customer selects a reason (e.g., "Wrong Size") and uploads a photo.
3.  **Approval:** Merchant receives notification, reviews the request in Admin, and clicks "Approve."
4.  **Return Label:** System generates a return shipping label for the customer.
5.  **Reception:** Merchant receives the package and clicks "Mark as Received & Refund."
6.  **Resolution:** System triggers a refund via the payment gateway and updates stock.
