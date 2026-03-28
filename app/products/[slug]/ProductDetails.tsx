"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import {
  formatPrice,
  getDiscountPercent,
  getStockStatus,
} from "@/app/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Variant } from "@/app/types";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  verified: boolean;
  created_at: string;
}

interface ProductDetailsProps {
  product: Product;
  productReviews: Review[];
}

export default function ProductDetails({ product, productReviews }: ProductDetailsProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  const discount = getDiscountPercent(product.base_price, product.discount_price);
  const stock = getStockStatus(product);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Get variant option keys
  const optionKeys = Object.keys(product.variants[0]?.options_map || {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 overflow-hidden">
      {/* Left — Image Gallery */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 glass">
          <motion.img
            src={product.images[0]?.url}
            alt={product.images[0]?.alt_text || product.name}
            className="w-full h-full object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 badge badge-danger text-sm px-3 py-1">
              -{discount}% OFF
            </span>
          )}
        </div>
        {/* Thumbnail Row */}
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                className="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary/50 bg-white/5"
              >
                <img
                  src={img.url}
                  alt={img.alt_text}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Right — Product Info */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col"
      >
        {/* Tags */}
        <motion.div variants={fadeUpVariant} className="flex gap-2 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`badge uppercase tracking-wider ${
                tag === "trending"
                  ? "badge-primary"
                  : tag === "sale"
                  ? "badge-danger"
                  : tag === "new-arrival"
                  ? "badge-success"
                  : "badge-warning"
              }`}
            >
              {tag.replace(/-/g, " ")}
            </span>
          ))}
        </motion.div>

        {/* Product Name */}
        <motion.h1 variants={fadeUpVariant} className="text-2xl md:text-3xl font-bold">{product.name}</motion.h1>

        {/* Rating */}
        <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`material-symbols-outlined text-lg ${
                  i < Math.round(product.rating || 0)
                    ? "star-filled"
                    : "text-text-muted"
                }`}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-text-secondary text-sm">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </motion.div>

        {/* Price */}
        <motion.div variants={fadeUpVariant} className="flex items-baseline gap-3 mt-4">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(selectedVariant.price)}
          </span>
          {discount > 0 && (
            <span className="text-text-muted text-lg line-through">
              {formatPrice(product.base_price)}
            </span>
          )}
        </motion.div>

        {/* Stock Status */}
        <motion.div variants={fadeUpVariant} className="flex items-center gap-2 mt-2">
          <span
            className={`w-2 h-2 rounded-full ${
              stock.color === "success"
                ? "bg-success"
                : stock.color === "warning"
                ? "bg-warning"
                : "bg-danger"
            }`}
          />
          <span className="text-xs text-text-secondary">{stock.label}</span>
          <span className="text-xs text-text-muted">
            ({selectedVariant.stock_quantity} units available)
          </span>
        </motion.div>

        {/* Divider */}
        <motion.hr variants={fadeUpVariant} className="border-border-subtle my-5" />

        {/* Variant Selectors */}
        {optionKeys.map((key) => {
          const uniqueValues = [
            ...new Set(product.variants.map((v) => v.options_map[key])),
          ];

          const otherKeys = optionKeys.filter((k) => k !== key);
          const valueToVariant: Record<string, Variant> = {};
          product.variants.forEach((v) => {
            const matchesOthers = otherKeys.every(
              (k) => v.options_map[k] === selectedVariant.options_map[k]
            );
            if (matchesOthers) {
              const val = v.options_map[key];
              if (val) valueToVariant[val] = v;
            }
          });

          return (
            <motion.div variants={fadeUpVariant} key={key} className="mb-4">
              <label className="text-sm font-semibold capitalize mb-2 block">
                {key}:{" "}
                <span className="text-primary font-normal">
                  {selectedVariant.options_map[key]}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {uniqueValues.map((value) => {
                  if (!value) return null;
                  const matchingVariant = valueToVariant[value];
                  const isSelected = selectedVariant.options_map[key] === value;
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        if (matchingVariant) setSelectedVariant(matchingVariant);
                      }}
                      disabled={!matchingVariant}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-white shadow-lg glow-primary"
                          : matchingVariant
                          ? "glass hover:bg-white/10"
                          : "glass opacity-30 cursor-not-allowed"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Quantity + Add to Cart */}
        <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center glass rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2.5 hover:bg-white/5 transition-colors disabled:opacity-30"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
            <span className="px-4 py-2.5 text-sm font-bold min-w-[40px] text-center">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(
                  Math.min(selectedVariant.stock_quantity, quantity + 1)
                )
              }
              className="px-3 py-2.5 hover:bg-white/5 transition-colors disabled:opacity-30"
              disabled={quantity >= selectedVariant.stock_quantity}
              aria-label="Increase quantity"
            >
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>

          <button
            id="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={selectedVariant.stock_quantity === 0}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
              addedToCart
                ? "bg-success text-white"
                : "btn-primary"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <span className="material-symbols-outlined text-lg">
              {addedToCart ? "check_circle" : "shopping_cart"}
            </span>
            {addedToCart ? "Added to Cart!" : "Add to Cart"}
          </button>
        </motion.div>

        {/* Wishlist */}
        <motion.button
          variants={fadeUpVariant}
          onClick={() => toggleWishlist(product)}
          className={`mt-3 w-full text-sm flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all ${
            isInWishlist(product.id)
              ? "bg-primary/10 text-primary border border-primary/30"
              : "btn-ghost"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {isInWishlist(product.id) ? "favorite" : "favorite"}
          </span>
          {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
        </motion.button>

        {/* Divider */}
        <motion.hr variants={fadeUpVariant} className="border-border-subtle my-5" />

        {/* Tabs: Description / Reviews */}
        <motion.div variants={fadeUpVariant} className="flex gap-1 bg-white/5 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "description"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "reviews"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Reviews ({productReviews.length})
          </button>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <AnimatePresence mode="wait">
            {activeTab === "description" ? (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="text-text-secondary text-sm leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="glass rounded-xl p-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      local_shipping
                    </span>
                    <span className="text-xs text-text-secondary">
                      Free shipping over $100
                    </span>
                  </div>
                  <div className="glass rounded-xl p-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      autorenew
                    </span>
                    <span className="text-xs text-text-secondary">
                      30-day returns
                    </span>
                  </div>
                  <div className="glass rounded-xl p-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      verified
                    </span>
                    <span className="text-xs text-text-secondary">
                      2-year warranty
                    </span>
                  </div>
                  <div className="glass rounded-xl p-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">
                      lock
                    </span>
                    <span className="text-xs text-text-secondary">
                      Secure checkout
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {productReviews.length === 0 ? (
                  <p className="text-text-muted text-sm text-center py-8">
                    No reviews yet. Be the first to leave one!
                  </p>
                ) : (
                  productReviews.map((review) => (
                    <div key={review.id} className="glass rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {review.user_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {review.user_name}
                              {review.verified && (
                                <span className="ml-1.5 text-success text-[10px] font-normal">
                                  ✓ Verified
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-sm ${
                                i < review.rating
                                  ? "star-filled"
                                  : "text-text-muted"
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
