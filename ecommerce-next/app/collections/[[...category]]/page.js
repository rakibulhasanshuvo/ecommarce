import Link from "next/link";
import { categories, products } from "@/app/lib/mock-data";
import CollectionGrid from "./CollectionGrid";

export default async function CollectionsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const categoryPath = resolvedParams?.category;
  const categorySlug = Array.isArray(categoryPath) ? categoryPath[0] : categoryPath;
  const filterTag = resolvedSearchParams?.filter;

  // Get current category or "All"
  const currentCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : null;

  // Filter products
  let filteredProducts = [...products];

  if (currentCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category_id === currentCategory.id
    );
  }

  if (filterTag) {
    filteredProducts = filteredProducts.filter((p) =>
      p.tags.includes(filterTag)
    );
  }

  const pageTitle = currentCategory
    ? currentCategory.name
    : filterTag
    ? filterTag
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "All Products";

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-xs text-text-muted">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <span className="material-symbols-outlined text-[12px]">
              chevron_right
            </span>
          </li>
          <li>
            <Link
              href="/collections"
              className="hover:text-primary transition-colors"
            >
              Collections
            </Link>
          </li>
          {currentCategory && (
            <>
              <li>
                <span className="material-symbols-outlined text-[12px]">
                  chevron_right
                </span>
              </li>
              <li className="text-text-primary font-medium">
                {currentCategory.name}
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{pageTitle}</h1>
          <p className="text-text-muted text-sm mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 && "s"} found
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <Link
          href="/collections"
          className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            !currentCategory && !filterTag
              ? "bg-primary text-white shadow-lg"
              : "glass hover:bg-white/5"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/collections/${cat.slug}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              currentCategory?.id === cat.id
                ? "bg-primary text-white shadow-lg"
                : "glass hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {cat.icon}
            </span>
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid with sort/view controls */}
      <CollectionGrid products={filteredProducts} />
    </div>
  );
}
