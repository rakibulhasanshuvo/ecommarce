import assert from 'node:assert';
import {
  products,
  categories,
  getProductsByTag,
  getProductBySlug,
  getProductsByCategory,
  formatPrice,
  getDiscountPercent,
  getStockStatus,
} from './mock-data';

function testMockDataHelpers() {
  console.log('Running tests for mock-data.ts...');

  // Test getProductsByTag
  console.log('Testing getProductsByTag...');
  const trendingProducts = getProductsByTag('trending');
  assert.ok(trendingProducts.length > 0, 'Should find trending products');
  assert.strictEqual(
    trendingProducts.every(p => p.tags?.includes('trending')),
    true,
    'All returned products should have the trending tag'
  );

  const emptyTagProducts = getProductsByTag('');
  assert.strictEqual(emptyTagProducts.length, 0, 'Should return empty array for empty tag');

  const nonexistentTagProducts = getProductsByTag('nonexistent-tag');
  assert.strictEqual(nonexistentTagProducts.length, 0, 'Should return empty array for non-existent tag');

  // Test getProductBySlug
  console.log('Testing getProductBySlug...');
  const existingProduct = products[0];
  const foundProduct = getProductBySlug(existingProduct.slug);
  assert.deepStrictEqual(foundProduct, existingProduct, 'Should find existing product by slug');

  const notFoundProduct = getProductBySlug('nonexistent-slug');
  assert.strictEqual(notFoundProduct, undefined, 'Should return undefined for non-existent slug');

  // Test getProductsByCategory
  console.log('Testing getProductsByCategory...');
  const existingCategory = categories[0];
  const categoryProducts = getProductsByCategory(existingCategory.slug);
  assert.ok(categoryProducts.length > 0, 'Should find products for existing category');
  assert.strictEqual(
    categoryProducts.every(p => p.category_id === existingCategory.id),
    true,
    'All returned products should belong to the category'
  );

  const nonexistentCategoryProducts = getProductsByCategory('nonexistent-category-slug');
  assert.strictEqual(nonexistentCategoryProducts.length, 0, 'Should return empty array for non-existent category');

  // Test formatPrice
  console.log('Testing formatPrice...');
  assert.strictEqual(formatPrice(100), '$100.00', 'Should format whole number correctly');
  assert.strictEqual(formatPrice(99.99), '$99.99', 'Should format decimal number correctly');
  assert.strictEqual(formatPrice(0), '$0.00', 'Should format zero correctly');

  // Test getDiscountPercent
  console.log('Testing getDiscountPercent...');
  assert.strictEqual(getDiscountPercent(100, 80), 20, 'Should calculate correct percentage for valid discount');
  assert.strictEqual(getDiscountPercent(100, 0), 0, 'Should return 0 when discount is 0');
  assert.strictEqual(getDiscountPercent(100, 100), 0, 'Should return 0 when discount equals base price');
  assert.strictEqual(getDiscountPercent(100, 120), 0, 'Should return 0 when discount is greater than base price');
  assert.strictEqual(getDiscountPercent(0, 80), 0, 'Should return 0 when base price is 0');

  // Test getStockStatus
  console.log('Testing getStockStatus...');
  const outOfStockProduct = { ...products[0], variants: [{ sku: '1', price: 10, options_map: {}, stock_quantity: 0 }] };
  assert.deepStrictEqual(getStockStatus(outOfStockProduct as any).label, 'Out of Stock', 'Should identify out of stock');

  const lowStockProduct = { ...products[0], variants: [{ sku: '1', price: 10, options_map: {}, stock_quantity: 5 }] };
  assert.deepStrictEqual(getStockStatus(lowStockProduct as any).label, 'Low Stock', 'Should identify low stock');

  const inStockProduct = { ...products[0], variants: [{ sku: '1', price: 10, options_map: {}, stock_quantity: 20 }] };
  assert.deepStrictEqual(getStockStatus(inStockProduct as any).label, 'In Stock', 'Should identify in stock');

  console.log('All tests passed!');
}

testMockDataHelpers();