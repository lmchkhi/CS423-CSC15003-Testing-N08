import fs from "node:fs";
import path from "node:path";

const envPath = process.argv[2];
const attempt = process.argv[3];
const outputPath = process.argv[4];
if (!envPath || !attempt || !outputPath) {
  throw new Error("Usage: reproduce-defects.mjs <runtime-env.json> <attempt> <output.txt>");
}

const env = JSON.parse(fs.readFileSync(envPath, "utf8"));
const token = env.values.find((item) => item.key === "userToken")?.value;
if (!token) throw new Error("userToken is missing");

const baseUrl = "http://localhost:3000";
const studentId = "23127062";
const suffix = `${attempt}-${Date.now()}`;

async function request(method, path, { body, contentType = "application/json" } = {}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "X-Student-Id": studentId,
  };
  if (contentType) headers["Content-Type"] = contentType;
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: contentType === "application/json" ? JSON.stringify(body) : String(body) } : {}),
  });
  let responseBody;
  try { responseBody = await response.json(); } catch { responseBody = await response.text(); }
  return { status: response.status, contentType: response.headers.get("content-type"), body: responseBody };
}

const lines = [
  `Reproduction attempt: ${attempt}`,
  `Executed at: ${new Date().toISOString()}`,
  `Base URL: ${baseUrl}`,
  `X-Student-Id: ${studentId}`,
  "Authorization: Bearer <redacted>",
];

const duplicateId = `repro-duplicate-${suffix}`;
const duplicateFirst = await request("POST", "/api/cart", { body: { id: duplicateId, name: "Duplicate repro", price: 100000, quantity: 1 } });
const duplicateSecond = await request("POST", "/api/cart", { body: { id: duplicateId, name: "Duplicate repro", price: 100000, quantity: 2 } });
const duplicateCart = await request("GET", "/api/cart");
const duplicateRows = Array.isArray(duplicateCart.body) ? duplicateCart.body.filter((item) => item?.id === duplicateId) : [];
lines.push("", "[BUG-CART-001] Same product is duplicated", `POST #1: HTTP ${duplicateFirst.status}`, `POST #2: HTTP ${duplicateSecond.status}`, `Matching rows after GET: ${JSON.stringify(duplicateRows)}`, `Observed row count: ${duplicateRows.length}; expected: 1`, `Observed merged quantity: ${duplicateRows[0]?.quantity ?? "missing"}; expected: 3`);

const invalidId = `repro-quantity-${suffix}`;
const invalidQuantity = await request("POST", "/api/cart", { body: { id: invalidId, name: "Invalid quantity repro", price: 100000, quantity: 0 } });
const invalidCart = await request("GET", "/api/cart");
const storedInvalid = Array.isArray(invalidCart.body) ? invalidCart.body.find((item) => item?.id === invalidId) : undefined;
lines.push("", "[BUG-CART-002] quantity=0 is accepted and stored", `POST response: HTTP ${invalidQuantity.status} ${JSON.stringify(invalidQuantity.body)}`, `Stored row after GET: ${JSON.stringify(storedInvalid)}`, "Expected: reject quantity below minimum 1 and do not store it");

const beforePlain = Array.isArray(invalidCart.body) ? invalidCart.body.length : null;
const plainResponse = await request("POST", "/api/cart", { body: '{"id":1}', contentType: "text/plain" });
const afterPlainCart = await request("GET", "/api/cart");
const afterPlain = Array.isArray(afterPlainCart.body) ? afterPlainCart.body.length : null;
lines.push("", "[BUG-CART-003] text/plain body is accepted", `POST response: HTTP ${plainResponse.status} ${JSON.stringify(plainResponse.body)}`, `Cart length before: ${beforePlain}; after: ${afterPlain}`, `Last stored value: ${JSON.stringify(afterPlainCart.body?.at?.(-1))}`, "Expected: reject non-JSON Content-Type with controlled 4xx response");

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`);
console.log(lines.join("\n"));
