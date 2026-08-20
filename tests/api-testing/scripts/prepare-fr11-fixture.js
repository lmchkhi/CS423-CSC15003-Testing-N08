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
  "fr-11-local.postman_environment.json",
);
const secret = "super_secret_key_that_should_not_be_here";

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

async function main() {
  const userA = await get("SELECT id FROM users WHERE email = ?", ["test@eshop.com"]);
  if (!userA) throw new Error("Default User A was not initialized by the SUT");

  await run("DELETE FROM orders");
  await run("DELETE FROM users WHERE email IN (?, ?)", [
    "fr11.userb@eshop.test",
    "fr11.userc@eshop.test",
  ]);

  const userB = await run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["FR11 User B", "fr11.userb@eshop.test", "Fr11UserB123!", "user"],
  );
  const userC = await run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["FR11 User C", "fr11.userc@eshop.test", "Fr11UserC123!", "user"],
  );

  const a1 = await run(
    "INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)",
    [userA.id, 111111, "pending", "FR11-A1-OWNED"],
  );
  const a2 = await run(
    "INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)",
    [userA.id, 222222, "confirmed", "FR11-A2-OWNED"],
  );
  const cancelOrder = await run(
    "INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)",
    [userA.id, 333333, "pending", "FR11-A-CANCEL"],
  );
  const b1 = await run(
    "INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (?, ?, ?, ?)",
    [userB.lastID, 444444, "shipping", "FR11-B1-FOREIGN"],
  );

  const tokenA = jwt.sign({ id: userA.id, role: "user" }, secret);
  const tokenB = jwt.sign({ id: userB.lastID, role: "user" }, secret);
  const tokenC = jwt.sign({ id: userC.lastID, role: "user" }, secret);
  const expiredToken = jwt.sign({ id: userA.id, role: "user" }, secret, {
    expiresIn: -1,
  });
  const missingIdentityToken = jwt.sign({ role: "user" }, secret);

  const tokenParts = tokenA.split(".");
  const changedPayload = Buffer.from(
    JSON.stringify({ id: userB.lastID, role: "user", forged: true }),
  ).toString("base64url");
  const tamperedPayloadToken = `${tokenParts[0]}.${changedPayload}.${tokenParts[2]}`;
  const tamperedSignatureToken = `${tokenParts[0]}.${tokenParts[1]}.${tokenParts[2].slice(0, -1)}x`;

  const values = [
    environmentValue("baseUrl", "http://localhost:3000"),
    environmentValue("studentId", "23127464"),
    environmentValue("tokenA", tokenA, "secret"),
    environmentValue("tokenB", tokenB, "secret"),
    environmentValue("tokenC", tokenC, "secret"),
    environmentValue("expiredToken", expiredToken, "secret"),
    environmentValue("missingIdentityToken", missingIdentityToken, "secret"),
    environmentValue("tamperedPayloadToken", tamperedPayloadToken, "secret"),
    environmentValue("tamperedSignatureToken", tamperedSignatureToken, "secret"),
    environmentValue("ownedA1Id", a1.lastID),
    environmentValue("ownedA2Id", a2.lastID),
    environmentValue("cancelOrderId", cancelOrder.lastID),
    environmentValue("foreignB1Id", b1.lastID),
    environmentValue("markerA1", "FR11-A1-OWNED"),
    environmentValue("markerA2", "FR11-A2-OWNED"),
    environmentValue("markerCancel", "FR11-A-CANCEL"),
    environmentValue("markerB1", "FR11-B1-FOREIGN"),
  ];

  const environment = {
    id: "23127464-fr11-local",
    name: "23127464 FR-11 Local Runtime",
    values,
    _postman_variable_scope: "environment",
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: "Codex fixture generator",
  };
  fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`, "utf8");

  console.log(
    JSON.stringify({
      userAId: userA.id,
      userBId: userB.lastID,
      userCId: userC.lastID,
      ownedA1Id: a1.lastID,
      ownedA2Id: a2.lastID,
      cancelOrderId: cancelOrder.lastID,
      foreignB1Id: b1.lastID,
      environmentPath,
    }),
  );
}

main()
  .then(() => db.close())
  .catch((error) => {
    console.error(error.stack || error.message);
    db.close();
    process.exitCode = 1;
  });
