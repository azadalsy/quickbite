const assert = require("node:assert");
const test = require("node:test");

const calculateOrderTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

test("order total is calculated from item prices and quantities", () => {
  const total = calculateOrderTotal([
    { price: 39, quantity: 2 },
    { price: 18, quantity: 1 },
  ]);

  assert.strictEqual(total, 96);
});

test("empty order total is zero", () => {
  assert.strictEqual(calculateOrderTotal([]), 0);
});
