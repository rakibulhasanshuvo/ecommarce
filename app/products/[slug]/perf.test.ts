import { describe, test } from "node:test";
import { products, reviews } from "../../lib/mock-data";

describe("Performance Optimization", () => {
  const product = products[0];
  const iterations = 10000;

  // Inflate data for better measurement
  const largeProducts = Array.from({ length: 1000 }, (_, i) => ({
    ...products[i % products.length],
    id: `p-${i}`,
    category_id: i % 10 === 0 ? product.category_id : 'other'
  }));

  const largeReviews = Array.from({ length: 1000 }, (_, i) => ({
    ...reviews[i % reviews.length],
    id: `r-${i}`,
    product_id: i % 5 === 0 ? product.id : 'other'
  }));

  test("Baseline vs Optimized", () => {
    // Baseline
    const startBaseline = performance.now();
    for (let i = 0; i < iterations; i++) {
      const productReviews = largeReviews.filter((r) => r.product_id === product.id);
      const relatedProducts = largeProducts
        .filter((p) => p.category_id === product.category_id && p.id !== product.id)
        .slice(0, 4);

      const mappedReviews = productReviews.map(r => ({
        ...r,
        verified: true
      }));
    }
    const endBaseline = performance.now();
    const baselineTime = endBaseline - startBaseline;

    // Optimized
    const startOptimized = performance.now();
    for (let i = 0; i < iterations; i++) {
      const productReviews = largeReviews.filter((r) => r.product_id === product.id);

      const relatedProducts = [];
      for (const p of largeProducts) {
        if (p.category_id === product.category_id && p.id !== product.id) {
          relatedProducts.push(p);
          if (relatedProducts.length === 4) break;
        }
      }

      const mappedReviews = productReviews; // No map
    }
    const endOptimized = performance.now();
    const optimizedTime = endOptimized - startOptimized;

    console.log(`Baseline: ${baselineTime.toFixed(2)}ms`);
    console.log(`Optimized: ${optimizedTime.toFixed(2)}ms`);
    console.log(`Improvement: ${(((baselineTime - optimizedTime) / baselineTime) * 100).toFixed(2)}%`);
  });
});
