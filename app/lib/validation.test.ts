import assert from "node:assert";
import { validateForm, SHIPPING_RULES, PAYMENT_RULES } from "./validation.ts";

// Mock `trim` to ensure node:assert doesn't choke on values without trim
function runTests() {
  console.log("Running validation tests...");

  // --------------------------------------------------------------------------
  // Test validateForm with basic required rules
  // --------------------------------------------------------------------------
  console.log("  Testing validateForm (basic required rules)...");

  const rules = {
    field1: { required: true },
    field2: { required: false },
    field3: { required: true }
  };

  const emptyData = {};
  const emptyErrors = validateForm(emptyData, rules);
  assert.strictEqual(emptyErrors.field1, "Required");
  assert.strictEqual(emptyErrors.field2, undefined);
  assert.strictEqual(emptyErrors.field3, "Required");

  const partialData = { field1: "value", field2: "value2" };
  const partialErrors = validateForm(partialData, rules);
  assert.strictEqual(partialErrors.field1, undefined);
  assert.strictEqual(partialErrors.field3, "Required");

  const whitespaceData = { field1: "   ", field3: "\t" };
  const whitespaceErrors = validateForm(whitespaceData, rules);
  assert.strictEqual(whitespaceErrors.field1, "Required");
  assert.strictEqual(whitespaceErrors.field3, "Required");

  // --------------------------------------------------------------------------
  // Test SHIPPING_RULES
  // --------------------------------------------------------------------------
  console.log("  Testing SHIPPING_RULES...");

  const validShipping = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "Anytown",
    zip: "12345"
  };
  assert.deepStrictEqual(validateForm(validShipping, SHIPPING_RULES), {}, "Valid shipping data should have no errors");

  const invalidShipping = {
    firstName: " ",
    lastName: "",
    email: "not-an-email",
    address: "",
    city: "   ",
    zip: "12" // Invalid zip
  };

  const shippingErrors = validateForm(invalidShipping, SHIPPING_RULES);
  assert.strictEqual(shippingErrors.firstName, "Required");
  assert.strictEqual(shippingErrors.lastName, "Required");
  assert.strictEqual(shippingErrors.email, "Invalid email");
  assert.strictEqual(shippingErrors.address, "Required");
  assert.strictEqual(shippingErrors.city, "Required");
  assert.strictEqual(shippingErrors.zip, "Invalid ZIP");

  // Additional Zip checks
  assert.strictEqual(validateForm({ ...validShipping, zip: "123" }, SHIPPING_RULES).zip, "Invalid ZIP");
  assert.strictEqual(validateForm({ ...validShipping, zip: "12345678901" }, SHIPPING_RULES).zip, "Invalid ZIP");
  assert.strictEqual(validateForm({ ...validShipping, zip: "abcde" }, SHIPPING_RULES).zip, "Invalid ZIP");
  assert.strictEqual(validateForm({ ...validShipping, zip: "12 34 5" }, SHIPPING_RULES).zip, undefined, "Spaces in zip should be allowed");

  // Additional Email checks
  assert.strictEqual(validateForm({ ...validShipping, email: "john@example" }, SHIPPING_RULES).email, "Invalid email");
  assert.strictEqual(validateForm({ ...validShipping, email: "john.com" }, SHIPPING_RULES).email, "Invalid email");
  assert.strictEqual(validateForm({ ...validShipping, email: "@example.com" }, SHIPPING_RULES).email, "Invalid email");


  // --------------------------------------------------------------------------
  // Test PAYMENT_RULES
  // --------------------------------------------------------------------------
  console.log("  Testing PAYMENT_RULES...");

  const validPayment = {
    nameOnCard: "John Doe",
    cardNumber: "1111 2222 3333 4444",
    expDate: "12/25",
    cvv: "123"
  };
  assert.deepStrictEqual(validateForm(validPayment, PAYMENT_RULES), {}, "Valid payment data should have no errors");

  const invalidPayment = {
    nameOnCard: "",
    cardNumber: "123", // Too short
    expDate: "12-25", // Wrong format
    cvv: "12" // Too short
  };

  const paymentErrors = validateForm(invalidPayment, PAYMENT_RULES);
  assert.strictEqual(paymentErrors.nameOnCard, "Required");
  assert.strictEqual(paymentErrors.cardNumber, "Invalid card number");
  assert.strictEqual(paymentErrors.expDate, "Use MM/YY");
  assert.strictEqual(paymentErrors.cvv, "Invalid CVV");

  // Additional Card Number checks
  assert.strictEqual(validateForm({ ...validPayment, cardNumber: "123456789012" }, PAYMENT_RULES).cardNumber, "Invalid card number"); // 12 digits
  assert.strictEqual(validateForm({ ...validPayment, cardNumber: "1234567890123" }, PAYMENT_RULES).cardNumber, undefined); // 13 digits
  assert.strictEqual(validateForm({ ...validPayment, cardNumber: "1111222233334444" }, PAYMENT_RULES).cardNumber, undefined); // No spaces

  // Additional Exp Date checks
  assert.strictEqual(validateForm({ ...validPayment, expDate: "1/25" }, PAYMENT_RULES).expDate, "Use MM/YY");
  assert.strictEqual(validateForm({ ...validPayment, expDate: "12/5" }, PAYMENT_RULES).expDate, "Use MM/YY");
  assert.strictEqual(validateForm({ ...validPayment, expDate: "1225" }, PAYMENT_RULES).expDate, "Use MM/YY");

  // Additional CVV checks
  assert.strictEqual(validateForm({ ...validPayment, cvv: "12345" }, PAYMENT_RULES).cvv, "Invalid CVV");
  assert.strictEqual(validateForm({ ...validPayment, cvv: "abc" }, PAYMENT_RULES).cvv, "Invalid CVV");
  assert.strictEqual(validateForm({ ...validPayment, cvv: "1234" }, PAYMENT_RULES).cvv, undefined); // 4 digits allowed

  console.log("All validation tests passed! 🎉");
}

runTests();
