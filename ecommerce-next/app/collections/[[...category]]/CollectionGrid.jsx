"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/app/components/ProductCard";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export default function CollectionGrid({ products }) {
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort(
          (a, b) =>
            (a.discount_price || a.base_price) -
            (b.discount_price || b.base_price)
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            (b.discount_price || b.base_price) -
            (a.discount_price || a.base_price)
        );
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
    }
    return sorted;
  }, [products, sortBy]);

  return (
    <>
      {/* Sort & View Controls */}
      <div className="flex items-center justify-between mb-6">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-muted text-lg">
            sort
          </span>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-border-default rounded-lg px-3 py-2 text-xs text-text-primary outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface-dark">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-border-subtle">
          <button
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
          </button>
          <button
            className={`p-1.5 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text-primary"
            }`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <span className="material-symbols-outlined text-lg">view_list</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-text-muted text-5xl mb-4">
            inventory_2
          </span>
          <p className="text-text-muted text-sm">
            No products found in this category.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              variant="featured"
            />
          ))}
        </div>
      )}
    </>
  );
}
