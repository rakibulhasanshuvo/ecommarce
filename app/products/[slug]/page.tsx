import React from "react";
import Link from "next/link";
import { products, categories, reviews, productsBySlug } from "@/app/lib/mock-data";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails";
import ProductCard from "@/app/components/ProductCard";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsBySlug[resolvedParams.slug];
  if (!product) return {};
  return {
    title: `${product.name} — LuxeCommerce`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = productsBySlug[resolvedParams.slug];

  if (!product) notFound();

  const category = categories.find((c) => c.id === product.category_id);
  const productReviews = reviews.filter((r) => r.product_id === product.id);

  const relatedProducts = [];
  for (const p of products) {
    if (p.category_id === product.category_id && p.id !== product.id) {
      relatedProducts.push(p);
      if (relatedProducts.length === 4) break;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-6">
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
          {category && (
            <>
              <li>
                <Link
                  href={`/collections/${category.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
              <li>
                <span className="material-symbols-outlined text-[12px]">
                  chevron_right
                </span>
              </li>
            </>
          )}
          <li className="text-text-primary font-medium truncate max-w-[200px]">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Product Details (Client Component) */}
      <ProductDetails
        product={product}
        productReviews={productReviews}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12" aria-label="Related products">
          <h3 className="text-lg font-bold mb-5">
            You Might Also <span className="text-gradient">Like</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
