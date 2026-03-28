"use client";

import React from "react";
import { useCart } from "@/app/context/CartContext";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useCart();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-gradient">
              Your Wishlist
            </h1>
            <p className="text-text-muted text-lg max-w-xl">
              Keep track of the products you love. They'll be waiting here whenever you're ready.
            </p>
          </div>
          
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="px-6 py-3 rounded-2xl glass border border-white/5 hover:border-red-500/30 text-text-secondary hover:text-red-400 transition-all flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">
                delete_sweep
              </span>
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="glass-surface border border-white/5 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 animate-pulse">
              <span className="material-symbols-outlined text-4xl text-text-muted">
                favorite
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-text-muted mb-8 max-w-sm">
              Discover something you love and save it here to keep an eye on it.
            </p>
            <Link
              href="/collections"
              className="px-8 py-4 bg-primary text-background-dark font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(255,193,7,0.3)]"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
