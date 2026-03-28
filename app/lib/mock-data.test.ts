import assert from 'node:assert';
import { getProductsByTag, products } from './mock-data';

function testGetProductsByTag() {
  console.log("Running getProductsByTag tests...");

  // Test 1: Empty tag should return empty array
  assert.deepStrictEqual(
    getProductsByTag(""),
    [],
    "Expected empty string tag to return empty array"
  );

  // Test 2: Valid tag that exists ("trending")
  const trendingExpected = products.filter(p => p.tags?.includes("trending"));
  const trendingActual = getProductsByTag("trending");
  assert.deepStrictEqual(
    trendingActual,
    trendingExpected,
    "Expected getProductsByTag to return all products with the 'trending' tag"
  );
  assert.ok(
    trendingExpected.length > 0,
    "Test requires at least one product with 'trending' tag to be meaningful"
  );

  // Test 3: Valid tag that exists ("new-arrival")
  const newArrivalExpected = products.filter(p => p.tags?.includes("new-arrival"));
  const newArrivalActual = getProductsByTag("new-arrival");
  assert.deepStrictEqual(
    newArrivalActual,
    newArrivalExpected,
    "Expected getProductsByTag to return all products with the 'new-arrival' tag"
  );
  assert.ok(
    newArrivalExpected.length > 0,
    "Test requires at least one product with 'new-arrival' tag to be meaningful"
  );

  // Test 4: Tag that does not exist
  assert.deepStrictEqual(
    getProductsByTag("non-existent-tag-123"),
    [],
    "Expected non-existent tag to return empty array"
  );

  // Test 5: Partial match should not match (e.g. "trend" instead of "trending")
  assert.deepStrictEqual(
    getProductsByTag("trend"),
    [],
    "Expected partial match to return empty array"
  );

  // Test 6: Case sensitive tag (e.g., "Trending" instead of "trending")
  assert.deepStrictEqual(
    getProductsByTag("Trending"),
    [],
    "Expected tags to be case-sensitive, returning empty array for unmatched case"
  );

  console.log("getProductsByTag tests passed! ✅");
}

testGetProductsByTag();
