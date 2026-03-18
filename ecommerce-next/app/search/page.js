"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/app/lib/mock-data";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  // Sync input state if query param changes (e.g., from header search)
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter mb-6">
          Search <span className="text-gradient">Results</span>
        </h1>

        <form action="/search" className="relative max-w-2xl">
          <input
            type="text"
            name="q"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for products, categories, tags..."
            className="w-full bg-white/5 border border-border-default rounded-2xl px-6 py-4 text-lg text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary outline-none transition-all pr-16 shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>

      {query ? (
        <div>
          <p className="text-text-secondary mb-8">
            Found {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass rounded-3xl">
              <span className="material-symbols-outlined text-6xl text-text-muted mb-4">
                search_off
              </span>
              <h2 className="text-xl font-bold mb-2">No products found</h2>
              <p className="text-text-muted mb-8">
                Try searching for something else or browse our collections.
              </p>
              <Link href="/collections" className="btn-primary px-8 py-3">
                Browse Collections
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <span className="material-symbols-outlined text-6xl text-text-muted mb-4">
            manage_search
          </span>
          <h2 className="text-xl font-bold mb-2">Ready to search?</h2>
          <p className="text-text-muted mb-8">
            Enter a keyword above to find exactly what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
