const assert = require("node:assert");
const crypto = require("node:crypto");
const test = require("node:test");

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

test("password hashing returns a stable sha256 hash", () => {
  const firstHash = hashPassword("admin");
  const secondHash = hashPassword("admin");

  assert.strictEqual(firstHash, secondHash);
  assert.strictEqual(firstHash.length, 64);
  assert.notStrictEqual(firstHash, "admin");
});

test("different passwords create different hashes", () => {
  assert.notStrictEqual(hashPassword("admin"), hashPassword("customer"));
});
