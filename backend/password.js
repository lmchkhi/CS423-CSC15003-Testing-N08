const crypto = require("crypto");

const KEY_LENGTH = 64;
const PREFIX = "scrypt";

function hashPassword(password) {
  if (typeof password !== "string" || password.length === 0) {
    throw new TypeError("Password must be a non-empty string");
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${PREFIX}$${salt}$${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (typeof password !== "string" || typeof storedPassword !== "string") {
    return false;
  }

  const [prefix, salt, encodedHash] = storedPassword.split("$");
  if (prefix !== PREFIX || !salt || !encodedHash) {
    const actual = Buffer.from(password);
    const expected = Buffer.from(storedPassword);
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  }

  const expected = Buffer.from(encodedHash, "hex");
  const actual = crypto.scryptSync(password, salt, expected.length);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

module.exports = { hashPassword, verifyPassword };
