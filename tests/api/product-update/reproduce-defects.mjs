import fs from "node:fs";
import path from "node:path";

const envPath = process.argv[2] || "/tmp/product-update-runtime.postman_environment.json";
const outputPath = process.argv[3] || "test-reports/evidence/product-update/reproduction.txt";
const env = JSON.parse(fs.readFileSync(envPath, "utf8"));
const value = (key) => env.values.find((item) => item.key === key)?.value;
const baseUrl = value("baseUrl") || "http://localhost:3000";
const adminToken = value("adminToken");
const userToken = value("userToken");
if (!adminToken || !userToken) throw new Error("Runtime tokens are missing");
const studentId = "23127062";
const valid = { name: "Reproduction product", price: 100000, description: "repro", imageUrl: "https://example.test/repro.png", category_id: 1 };
const original = { name: "iPhone 15 Pro Max", price: 30000000, description: "Điện thoại cao cấp của Apple", imageUrl: "https://placehold.co/300x300/png?text=iPhone+15", category_id: 1 };

async function send(label, { id = "1", body, token = adminToken, contentType = "application/json", raw }) {
  const headers = { "X-Student-Id": studentId };
  if (contentType) headers["Content-Type"] = contentType;
  if (token !== null) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "PUT",
    headers,
    ...(raw !== undefined ? { body: raw } : body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const text = await response.text();
  return [
    `## ${label}`,
    `PUT /api/products/${id}`,
    `X-Student-Id: ${studentId}`,
    `Authorization: ${token === null ? "<missing>" : token === userToken ? "Bearer <userToken-redacted>" : "Bearer <adminToken-redacted>"}`,
    `Content-Type request: ${contentType || "<missing>"}`,
    `HTTP ${response.status}`,
    `Content-Type response: ${response.headers.get("content-type") || "<missing>"}`,
    `Body: ${text}`,
    "",
  ].join("\n");
}

const chunks = [
  `Reproduction timestamp: ${new Date().toISOString()}`,
  `Endpoint: PUT /api/products/:id`,
  `X-Student-Id: ${studentId}`,
  "",
];

// Broken access control: same representative data and smallest equivalent request.
chunks.push(await send("Access control - same as TC-PRODUCT-UPDATE-004", { body: valid, token: userToken }));
chunks.push(await send("Access control - minimal request without token", { body: { name: "A", price: 1, category_id: 1 }, token: null }));

// Invalid/nonexistent path falsely reports success.
chunks.push(await send("Nonexistent ID - same as TC-PRODUCT-UPDATE-008", { id: "999999", body: valid }));
chunks.push(await send("Nonexistent ID - minimal valid required fields", { id: "999999", body: { name: "A", price: 1, category_id: 1 } }));

// Missing validation: price boundary representative and minimal request.
chunks.push(await send("Input validation - same as TC-PRODUCT-UPDATE-025", { body: { ...valid, price: 0 } }));
chunks.push(await send("Input validation - minimal required fields with price zero", { body: { name: "A", price: 0, category_id: 1 } }));

// Unsupported content type causes an unhandled 500 HTML response.
chunks.push(await send("Content-Type confusion - same as TC-PRODUCT-UPDATE-037", { raw: JSON.stringify(valid), contentType: "text/plain" }));
chunks.push(await send("Content-Type confusion - minimal text body", { raw: "{}", contentType: "text/plain" }));

// Primitive JSON produces parser HTML instead of controlled JSON.
chunks.push(await send("Primitive JSON - same as TC-PRODUCT-UPDATE-044", { raw: JSON.stringify("invalid-body"), contentType: "application/json" }));
chunks.push(await send("Primitive JSON - repeated minimal request", { raw: JSON.stringify("x"), contentType: "application/json" }));

// Restore the seeded target after reproduction using a normal API call.
chunks.push(await send("Cleanup - restore product ID 1", { body: original }));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, chunks.join("\n"));
console.log(`Wrote redacted reproduction evidence to ${outputPath}`);
