"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { formatPrice } from "@/app/lib/mock-data";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    tax,
    shippingCost,
    discountAmount,
    discountCode,
    total,
    removeFromCart,
    updateQuantity,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    if (!discountInput.trim()) return;
    
    // Test if valid
    applyDiscount(discountInput);
    
    // In our context, if it didn't apply and we didn't receive an error back, 
    // it just ignores it if invalid. For UX, let's pretend we check if it applied.
    setTimeout(() => {
        // Just clearing input for simplicity. The context handles real validation against mock-data.
        setDiscountInput("");
    }, 100);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 flex flex-col items-center text-center animate-fade-in">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-text-muted">
          <span className="material-symbols-outlined text-4xl">shopping_cart</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
        </p>
        <Link href="/collections" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Shopping <span className="text-gradient">Cart</span>
        <span className="text-text-muted text-lg font-normal ml-3">
          ({itemCount} item{itemCount !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.variant.sku}
              className="glass p-4 rounded-2xl flex flex-col sm:flex-row gap-4 sm:items-center relative"
            >
              {/* Image */}
              <Link href={`/products/${item.product.slug}`} className="block w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-white/5 rounded-xl overflow-hidden">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="pr-8">
                  <Link href={`/products/${item.product.slug}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-text-secondary mt-1">
                    {Object.entries(item.variant.options_map)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(" | ")}
                  </p>
                  <p className="text-sm font-semibold text-primary mt-2">
                    {formatPrice(item.variant.price)}{" "}
                    {item.variant.price < item.product.base_price && (
                      <span className="text-text-muted line-through text-xs font-normal">
                        {formatPrice(item.product.base_price)}
                      </span>
                    )}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center glass rounded-lg overflow-hidden h-9">
                    <button
                      onClick={() => updateQuantity(item.variant.sku, item.quantity - 1)}
                      className="px-2.5 h-full hover:bg-white/5 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="px-3 text-xs font-bold min-w-[30px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variant.sku, item.quantity + 1)}
                      disabled={item.quantity >= item.variant.stock_quantity}
                      className="px-2.5 h-full hover:bg-white/5 transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Total & Remove */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between py-1 border-t border-border-subtle pt-4 sm:pt-0 sm:border-t-0 sm:border-l sm:pl-4">
                <p className="font-bold hidden sm:block text-lg">
                  {formatPrice(item.variant.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.variant.sku)}
                  className="text-text-muted hover:text-danger transition-colors p-2 absolute top-2 right-2 sm:relative sm:top-0 sm:right-0"
                  aria-label="Remove item"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-success font-medium">
                  <span>Discount ({discountCode?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-text-secondary">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Estimated Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <hr className="border-border-subtle my-4" />

              <div className="flex justify-between items-end">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Discount Code */}
            <div className="mt-6 pt-6 border-t border-border-subtle">
              {!discountCode ? (
                <form onSubmit={handleApplyDiscount} className="flex gap-2">
                  <input
                    type="text"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    placeholder="Discount code"
                    className="flex-1 bg-white/5 border border-border-default rounded-xl px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:ring-1 focus:ring-primary outline-none"
                  />
                  <button type="submit" className="glass hover:bg-white/10 px-4 rounded-xl text-sm font-semibold transition-colors">
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-success/10 border border-success/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-success">
                    <span className="material-symbols-outlined text-[18px]">local_offer</span>
                    <span className="text-sm font-bold">{discountCode.code}</span>
                  </div>
                  <button onClick={removeDiscount} className="text-text-muted hover:text-text-primary text-xs flex items-center">
                    Remove
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/checkout"
              className="btn-primary w-full mt-8 py-3.5 flex justify-center text-sm font-bold shadow-lg shadow-primary/20"
            >
              Proceed to Checkout
            </Link>
            
            <p className="text-xs text-text-muted text-center mt-4 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Secure SSL Encrypted Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
