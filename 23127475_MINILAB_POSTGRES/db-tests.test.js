const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const request = require("supertest");
const { createApp } = require("./app");

const DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/eshop_test";
const APP_USER_DATABASE_URL =
  process.env.APP_USER_DATABASE_URL ||
  "postgres://app_user:app_user@localhost:5432/eshop_test";

const db = new Pool({ connectionString: DATABASE_URL });
const appUserDb = new Pool({ connectionString: APP_USER_DATABASE_URL });
const api = request(createApp(db));

let userIds = [];
let productIds = [];
let canceledOrderId;
const runId = Date.now();

async function execSqlFile(relativePath) {
  const sql = fs.readFileSync(path.join(__dirname, relativePath), "utf8");
  await db.query(sql);
}

async function seedData() {
  await execSqlFile("sql/seed.sql");

  const users = await db.query("SELECT id FROM users ORDER BY id");
  userIds = users.rows.map((row) => row.id);

  const products = await db.query("SELECT id FROM products ORDER BY id");
  productIds = products.rows.map((row) => row.id);

  const canceled = await db.query(
    "SELECT id FROM orders WHERE status = 'canceled' ORDER BY id LIMIT 1",
  );
  canceledOrderId = canceled.rows[0].id;
}

async function countProducts() {
  const result = await db.query("SELECT COUNT(*)::int AS count FROM products");
  return result.rows[0].count;
}

beforeAll(async () => {
  await execSqlFile("sql/schema.sql");
  await seedData();
});

afterAll(async () => {
  await db.end();
  await appUserDb.end();
});

describe("Database object testing", () => {
  test("Function: discount must not exceed order amount", async () => {
    const result = await db.query(
      "SELECT fn_calculate_discount('percent', 150, 200) AS discount",
    );

    expect(Number(result.rows[0].discount)).toBeLessThanOrEqual(200);
  });

  test("Trigger: prevent updating stock to a negative value", async () => {
    await expect(
      db.query("UPDATE products SET stock = -5 WHERE id = $1", [productIds[0]]),
    ).rejects.toThrow(/stock cannot be negative|violates check constraint/i);
  });

  test("Stored procedure: checkout rolls back every stock change when one item is out of stock", async () => {
    const beforeProducts = await db.query(
      "SELECT id, stock FROM products WHERE id = ANY($1::int[]) ORDER BY id",
      [[productIds[0], productIds[1], productIds[4]]],
    );
    const beforeOrders = await db.query("SELECT COUNT(*)::int AS count FROM orders");

    await expect(
      db.query("CALL sp_process_checkout($1, $2)", [
        userIds[0],
        [productIds[0], productIds[1], productIds[4]],
      ]),
    ).rejects.toThrow(/out of stock/i);

    const afterProducts = await db.query(
      "SELECT id, stock FROM products WHERE id = ANY($1::int[]) ORDER BY id",
      [[productIds[0], productIds[1], productIds[4]]],
    );
    const afterOrders = await db.query("SELECT COUNT(*)::int AS count FROM orders");

    expect(afterProducts.rows).toEqual(beforeProducts.rows);
    expect(afterOrders.rows[0].count).toBe(beforeOrders.rows[0].count);
  });

  test("Schema: duplicate user email is rejected by UNIQUE constraint", async () => {
    const email = `duplicate.${runId}@example.test`;
    await db.query("INSERT INTO users(email) VALUES ($1)", [email]);

    await expect(
      db.query("INSERT INTO users(email) VALUES ($1)", [email]),
    ).rejects.toThrow(/duplicate key|unique/i);
  });
});

describe("Functional API and security testing", () => {
  test("Functional: expired coupon is rejected", async () => {
    const res = await api
      .post("/api/apply-coupon")
      .send({ code: "CP_EXPIRED", order_amount: 300 });

    expect(res.status).toBe(400);
  });

  test("Functional: canceled order cannot move to delivered", async () => {
    const res = await api
      .put(`/api/admin/orders/${canceledOrderId}/status`)
      .send({ status: "delivered" });

    expect(res.status).toBe(400);
  });

  test("Security: product search resists SQL injection", async () => {
    const before = await countProducts();
    const res = await api.get("/api/products/search").query({ q: "' OR '1'='1" });
    const after = await countProducts();

    expect(res.status).toBe(200);
    expect(after).toBe(before);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test("Security: app_user cannot drop products table", async () => {
    await expect(appUserDb.query("DROP TABLE products")).rejects.toThrow(
      /permission denied|must be owner|privilege/i,
    );
  });
});
