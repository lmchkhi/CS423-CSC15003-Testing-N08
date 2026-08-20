const fs = require("fs");
const path = require("path");

const workspace = path.resolve(__dirname, "../../..");
const backendDir = path.join(workspace, "src", "eshop-sut", "backend");
const sqlite3 = require(path.join(backendDir, "node_modules", "sqlite3")).verbose();
const jwt = require(path.join(backendDir, "node_modules", "jsonwebtoken"));

const dbPath = path.join(backendDir, "database.sqlite");
const environmentPath = path.join(
  workspace,
  "tests",
  "api-testing",
  "environments",
  "fr-16-local.postman_environment.json",
);
const secret = "super_secret_key_that_should_not_be_here";
const runId = `FR16-RUN-${Date.now()}`;
const sentinelName = "FR16-BASELINE-SENTINEL";
const fixtureCategoryName = "FR16 Fixture Category";

const db = new sqlite3.Database(dbPath);
const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function callback(error) {
      if (error) reject(error);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => (error ? reject(error) : resolve(row)));
  });

function environmentValue(key, value, type = "default") {
  return { key, value: String(value), type, enabled: true };
}

async function waitForSeededSchema() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const tables = await get(
        "SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name IN ('users', 'categories', 'products')",
      );
      if (tables.count === 3) {
        const users = await get("SELECT COUNT(*) AS count FROM users");
        const categories = await get("SELECT COUNT(*) AS count FROM categories");
        const products = await get("SELECT COUNT(*) AS count FROM products");
        if (users.count >= 2 && categories.count >= 3 && products.count >= 5) return;
      }
    } catch (error) {
      if (!String(error.message).includes("no such table") && !String(error.message).includes("database is locked")) {
        throw error;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("SUT database schema/seed did not become ready for FR-16 fixture preparation");
}

async function main() {
  await waitForSeededSchema();
  await run("DELETE FROM products WHERE name LIKE 'FR16-RUN-%' OR name = ?", [sentinelName]);
  await run("DELETE FROM users WHERE email IN (?, ?)", [
    "fr16.admin@eshop.test",
    "fr16.user@eshop.test",
  ]);
  await run("DELETE FROM categories WHERE name = ?", [fixtureCategoryName]);

  const admin = await run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["FR16 Admin", "fr16.admin@eshop.test", "Fr16Admin123!", "admin"],
  );
  const user = await run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["FR16 User", "fr16.user@eshop.test", "Fr16User123!", "user"],
  );
  const category = await run("INSERT INTO categories (name) VALUES (?)", [fixtureCategoryName]);
  await run(
    "INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)",
    [sentinelName, 777, "Must survive injection-oriented imports", "https://example.test/sentinel.png", category.lastID],
  );

  const baseline = await get("SELECT COUNT(*) AS count FROM products");
  const adminToken = jwt.sign({ id: admin.lastID, role: "admin" }, secret, { expiresIn: "1h" });
  const nonAdminToken = jwt.sign({ id: user.lastID, role: "user" }, secret, { expiresIn: "1h" });
  const expiredToken = jwt.sign({ id: admin.lastID, role: "admin" }, secret, { expiresIn: -1 });
  const missingIdentityToken = jwt.sign({ role: "admin" }, secret, { expiresIn: "1h" });

  const tokenParts = adminToken.split(".");
  const changedPayload = Buffer.from(
    JSON.stringify({ id: user.lastID, role: "admin", forged: true }),
  ).toString("base64url");
  const tamperedPayloadToken = `${tokenParts[0]}.${changedPayload}.${tokenParts[2]}`;
  const lastSignatureChar = tokenParts[2].slice(-1);
  const replacement = lastSignatureChar === "a" ? "b" : "a";
  const tamperedSignatureToken = `${tokenParts[0]}.${tokenParts[1]}.${tokenParts[2].slice(0, -1)}${replacement}`;

  const environment = {
    id: "23127464-fr16-local",
    name: "23127464 FR-16 Local Runtime",
    values: [
      environmentValue("baseUrl", "http://127.0.0.1:3000"),
      environmentValue("studentId", "23127464"),
      environmentValue("runId", runId),
      environmentValue("adminToken", adminToken, "secret"),
      environmentValue("nonAdminToken", nonAdminToken, "secret"),
      environmentValue("expiredToken", expiredToken, "secret"),
      environmentValue("tamperedPayloadToken", tamperedPayloadToken, "secret"),
      environmentValue("tamperedSignatureToken", tamperedSignatureToken, "secret"),
      environmentValue("missingIdentityToken", missingIdentityToken, "secret"),
      environmentValue("categoryId", category.lastID),
      environmentValue("baselineProductCount", baseline.count),
      environmentValue("sentinelName", sentinelName),
    ],
    _postman_variable_scope: "environment",
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: "Codex FR-16 fixture generator",
  };

  fs.mkdirSync(path.dirname(environmentPath), { recursive: true });
  fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({
    runId,
    adminUserId: admin.lastID,
    nonAdminUserId: user.lastID,
    categoryId: category.lastID,
    baselineProductCount: baseline.count,
    sentinelName,
    environmentPath,
    tokensCreated: [
      "adminToken",
      "nonAdminToken",
      "expiredToken",
      "tamperedPayloadToken",
      "tamperedSignatureToken",
      "missingIdentityToken",
    ],
  }));
}

main()
  .then(() => db.close())
  .catch((error) => {
    console.error(error.stack || error.message);
    db.close();
    process.exitCode = 1;
  });
