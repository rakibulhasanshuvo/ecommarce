"use client";

import React from "react";
import Link from "next/link";
import { formatPrice, getDiscountPercent } from "@/app/lib/mock-data";
import { useCart } from "@/app/context/CartContext";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = getDiscountPercent(product.base_price, product.discount_price);
  const displayPrice = product.discount_price || product.base_price;
  const defaultVariant = product.variants?.[0] || { sku: product.id, price: displayPrice, stock_quantity: 10, options_map: {} };

  const isWishlisted = isInWishlist(product.id);
  const isOutOfStock = defaultVariant.stock_quantity <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, defaultVariant, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (variant === "featured") {
    return (
      <div className="col-span-2 glass rounded-2xl p-4 flex gap-4 items-center card-hover group cursor-pointer relative">
        <Link
          href={`/products/${product.slug}`}
          className="w-1/3 aspect-square rounded-xl overflow-hidden bg-white/5 block shrink-0 relative"
        >
          <img
            alt={product.images[0]?.alt_text || product.name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
            src={product.images[0]?.url}
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 border border-white/50 backdrop-blur-md rounded-md">
                Sold Out
              </span>
            </div>
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              {product.tags.includes("trending") && (
                <span className="badge badge-primary uppercase tracking-wider text-[8px]">
                  Trending
                </span>
              )}
              {product.tags.includes("new-arrival") && !product.tags.includes("trending") && (
                <span className="badge badge-success uppercase tracking-wider text-[8px]">
                  New
                </span>
              )}
            </div>
            <button 
              onClick={handleToggleWishlist}
              className="p-1 hover:text-primary transition-colors active:scale-90"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <span className={`material-symbols-outlined text-lg ${isWishlisted ? 'star-filled' : ''}`}>
                favorite
              </span>
            </button>
          </div>
          <Link href={`/products/${product.slug}`}>
            <h4 className="mt-2 font-bold text-sm truncate hover:text-primary transition-colors">
              {product.name}
            </h4>
          </Link>
          <div className="flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[12px] star-filled">
              star
            </span>
            <span className="text-[10px] text-text-secondary">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-primary">
                {formatPrice(displayPrice)}
              </span>
              {discount > 0 && (
                <span className="text-text-muted text-xs line-through">
                  {formatPrice(product.base_price)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`${isOutOfStock ? 'bg-border-default cursor-not-allowed opacity-50' : 'bg-primary hover:bg-primary-light active:scale-90 shadow-lg'} size-8 rounded-lg flex items-center justify-center transition-all z-10 relative`}
              aria-label={isOutOfStock ? "Out of stock" : `Add ${product.name} to cart`}
            >
              <span className="material-symbols-outlined text-white text-lg pointer-events-none">
                {isOutOfStock ? 'block' : 'add'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-3 flex flex-col group cursor-pointer card-hover relative">
      <div className="absolute top-2 right-2 z-20">
        <button 
          onClick={handleToggleWishlist}
          className="size-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-primary/20 hover:text-primary transition-all active:scale-90"
        >
          <span className={`material-symbols-outlined text-lg ${isWishlisted ? 'star-filled' : ''}`}>
            favorite
          </span>
        </button>
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="aspect-square rounded-xl overflow-hidden bg-white/5 mb-3 block relative"
      >
        <img
          alt={product.images[0]?.alt_text || product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
          src={product.images[0]?.url}
          loading="lazy"
        />
        {discount > 0 && !isOutOfStock && (
          <span className="absolute top-2 left-2 badge badge-danger">
            -{discount}%
          </span>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border border-white/50 backdrop-blur-md rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </Link>
      <Link href={`/products/${product.slug}`}>
        <h4 className="font-bold text-sm truncate hover:text-primary transition-colors">
          {product.name}
        </h4>
      </Link>
      <div className="flex items-center gap-1 mt-1">
        <span className="material-symbols-outlined text-[12px] star-filled">
          star
        </span>
        <span className="text-[10px] text-text-secondary">
          {product.rating}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-primary font-bold text-sm">
          {formatPrice(displayPrice)}
        </p>
        {discount > 0 && (
          <p className="text-text-muted text-xs line-through">
            {formatPrice(product.base_price)}
          </p>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={`mt-3 w-full border border-border-default rounded-xl py-2 text-xs font-medium transition-all active:scale-95 z-10 relative ${
          isOutOfStock 
          ? 'bg-border-default text-text-muted border-transparent cursor-not-allowed opacity-50' 
          : 'bg-white/5 hover:bg-primary hover:text-white hover:border-primary'
        }`}
        aria-label={isOutOfStock ? "Out of stock" : `Quick add ${product.name}`}
      >
        {isOutOfStock ? 'Sold Out' : 'Quick Add'}
      </button>
    </div>
  );
}
