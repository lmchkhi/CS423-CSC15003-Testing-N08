/**
 * Mini Lab - Database Testing with PostgreSQL, Jest, and Supertest
 * Student ID: 23127062
 *
 * Required environment:
 *   DATABASE_URL=postgresql://test_owner:password@localhost:5432/minilab
 *   APP_USER_DATABASE_URL=postgresql://app_user:password@localhost:5432/minilab
 *   API_BASE_URL=http://localhost:3000
 *   ADMIN_TOKEN=<JWT for an admin account>
 *
 * Optional endpoint overrides:
 *   APPLY_COUPON_PATH=/api/apply-coupon
 *   PRODUCT_SEARCH_PATH=/api/products/search
 *   ADMIN_ORDER_STATUS_PATH=/api/admin/orders
 *   CHECKOUT_SQL=CALL sp_process_checkout($1, $2::int[])
 *
 * Run:
 *   npx jest db-tests.test.js --runInBand
 */

const { Pool } = require("pg");
const request = require("supertest");

jest.setTimeout(60_000);

const DATABASE_URL = process.env.DATABASE_URL;
const APP_USER_DATABASE_URL = process.env.APP_USER_DATABASE_URL;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const APPLY_COUPON_PATH =
  process.env.APPLY_COUPON_PATH || "/api/apply-coupon";
const PRODUCT_SEARCH_PATH =
  process.env.PRODUCT_SEARCH_PATH || "/api/products/search";
const ADMIN_ORDER_STATUS_PATH =
  process.env.ADMIN_ORDER_STATUS_PATH || "/api/admin/orders";
const CHECKOUT_SQL =
  process.env.CHECKOUT_SQL ||
  "CALL sp_process_checkout($1, $2::int[])";

const TEST_PREFIX = "MINILAB_23127062";
const TEST_EMAILS = Array.from(
  { length: 5 },
  (_, index) => `${TEST_PREFIX.toLowerCase()}_user_${index + 1}@example.test`,
);
const TEST_PRODUCT_NAMES = Array.from(
  { length: 5 },
  (_, index) => `${TEST_PREFIX}_PRODUCT_${index + 1}`,
);
const TEST_COUPON_CODES = [
  "CP_OK",
  "CP_EXPIRED",
  "CP_INACTIVE",
  "CP_PERCENT150",
];

let db;
let seededUserIds = [];
let seededProductIds = [];
let canceledOrderId;

function requireEnvironment(name, value) {
  if (!value) {
    throw new Error(
      `${name} is required. Configure the standalone PostgreSQL/API test environment before running the suite.`,
    );
  }
}

async function assertRequiredSchema() {
  const requiredColumns = {
    users: ["id", "email", "role"],
    products: ["id", "name", "price", "stock"],
    coupons: [
      "id",
      "code",
      "discount_type",
      "discount_value",
      "expired_at",
      "is_active",
    ],
    orders: [
      "id",
      "user_id",
      "total_amount",
      "final_amount",
      "status",
    ],
  };

  for (const [tableName, columnNames] of Object.entries(requiredColumns)) {
    const result = await db.query(
      `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = current_schema()
          AND table_name = $1
      `,
      [tableName],
    );
    const actualColumns = new Set(result.rows.map((row) => row.column_name));
    const missingColumns = columnNames.filter(
      (columnName) => !actualColumns.has(columnName),
    );

    if (missingColumns.length > 0) {
      throw new Error(
        `Table ${tableName} is missing required column(s): ${missingColumns.join(", ")}`,
      );
    }
  }
}

async function removeSeedData() {
  if (!db) return;

  await db.query(
    `
      DELETE FROM orders
      WHERE user_id IN (SELECT id FROM users WHERE email = ANY($1::text[]))
    `,
    [TEST_EMAILS],
  );
  await db.query("DELETE FROM coupons WHERE code = ANY($1::text[])", [
    TEST_COUPON_CODES,
  ]);
  await db.query("DELETE FROM products WHERE name = ANY($1::text[])", [
    TEST_PRODUCT_NAMES,
  ]);
  await db.query("DELETE FROM users WHERE email = ANY($1::text[])", [
    TEST_EMAILS,
  ]);
}

async function seedMinimumData() {
  await removeSeedData();

  const userResult = await db.query(
    `
      INSERT INTO users (email, role)
      SELECT email, CASE WHEN ordinal = 1 THEN 'admin' ELSE 'customer' END
      FROM unnest($1::text[]) WITH ORDINALITY AS seed(email, ordinal)
      RETURNING id
    `,
    [TEST_EMAILS],
  );
  seededUserIds = userResult.rows.map((row) => row.id);

  for (let index = 0; index < TEST_PRODUCT_NAMES.length; index += 1) {
    const productResult = await db.query(
      `
        INSERT INTO products (name, price, stock)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [
        TEST_PRODUCT_NAMES[index],
        (index + 1) * 100,
        index === TEST_PRODUCT_NAMES.length - 1 ? 0 : 10,
      ],
    );
    seededProductIds.push(productResult.rows[0].id);
  }

  await db.query(
    `
      INSERT INTO coupons
        (code, discount_type, discount_value, expired_at, is_active)
      VALUES
        ('CP_OK',         'percent', 10,  CURRENT_TIMESTAMP + INTERVAL '30 days', 1),
        ('CP_EXPIRED',    'percent', 10,  CURRENT_TIMESTAMP - INTERVAL '1 day',   1),
        ('CP_INACTIVE',   'fixed',   25,  CURRENT_TIMESTAMP + INTERVAL '30 days', 0),
        ('CP_PERCENT150', 'percent', 150, CURRENT_TIMESTAMP + INTERVAL '30 days', 1)
    `,
  );

  await db.query(
    `
      INSERT INTO orders
        (user_id, total_amount, final_amount, status)
      SELECT
        ($1::int[])[1 + floor(random() * array_length($1::int[], 1))::int],
        100 + sequence_number,
        100 + sequence_number,
        'pending'
      FROM generate_series(1, 199) AS seed(sequence_number)
    `,
    [seededUserIds],
  );

  const canceledOrderResult = await db.query(
    `
      INSERT INTO orders
        (user_id, total_amount, final_amount, status)
      VALUES ($1, 300, 300, 'canceled')
      RETURNING id
    `,
    [seededUserIds[0]],
  );
  canceledOrderId = canceledOrderResult.rows[0].id;
}

beforeAll(async () => {
  requireEnvironment("DATABASE_URL", DATABASE_URL);
  db = new Pool({ connectionString: DATABASE_URL });
  await db.query("SELECT 1");
  await assertRequiredSchema();
  await seedMinimumData();
});

afterAll(async () => {
  if (db) {
    await removeSeedData();
    await db.end();
  }
});

describe("Schema discovery and constraints", () => {
  test("required function, trigger, and stored procedure exist", async () => {
    const functionResult = await db.query(
      `
        SELECT COUNT(*)::int AS count
        FROM pg_proc
        WHERE proname = 'fn_calculate_discount'
          AND prokind = 'f'
      `,
    );
    const procedureResult = await db.query(
      `
        SELECT COUNT(*)::int AS count
        FROM pg_proc
        WHERE proname = 'sp_process_checkout'
          AND prokind = 'p'
      `,
    );
    const triggerResult = await db.query(
      `
        SELECT COUNT(*)::int AS count
        FROM pg_trigger
        WHERE tgname = 'trg_prevent_negative_stock'
          AND NOT tgisinternal
      `,
    );

    expect(functionResult.rows[0].count).toBeGreaterThan(0);
    expect(procedureResult.rows[0].count).toBeGreaterThan(0);
    expect(triggerResult.rows[0].count).toBeGreaterThan(0);
  });

  test("users.email rejects duplicate values through UNIQUE", async () => {
    const duplicateEmail = `${TEST_PREFIX.toLowerCase()}_duplicate@example.test`;

    try {
      await db.query("INSERT INTO users (email) VALUES ($1)", [duplicateEmail]);
      await expect(
        db.query("INSERT INTO users (email) VALUES ($1)", [duplicateEmail]),
      ).rejects.toMatchObject({ code: "23505" });
    } finally {
      await db.query("DELETE FROM users WHERE email = $1", [duplicateEmail]);
    }
  });

  test("orders reject an unknown user through the foreign key", async () => {
    await expect(
      db.query(
        `
          INSERT INTO orders
            (user_id, total_amount, final_amount, status)
          VALUES (-2147483648, 100, 100, 'pending')
        `,
      ),
    ).rejects.toMatchObject({ code: "23503" });
  });

  test("orders reject an invalid status through CHECK", async () => {
    await expect(
      db.query(
        `
          INSERT INTO orders
            (user_id, total_amount, final_amount, status)
          VALUES ($1, 100, 100, 'not-a-valid-status')
        `,
        [seededUserIds[0]],
      ),
    ).rejects.toMatchObject({ code: "23514" });
  });
});

describe("Function testing", () => {
  test("150 percent discount cannot exceed the order amount", async () => {
    const result = await db.query(
      `
        SELECT fn_calculate_discount('percent', 150, 200) AS discount
      `,
    );

    const discount = Number(result.rows[0].discount);
    expect(discount).toBeGreaterThanOrEqual(0);
    expect(discount).toBeLessThanOrEqual(200);
  });

  test.each([
    ["percent", 10, 200, 20],
    ["fixed", 25, 200, 25],
  ])(
    "%s discount returns the expected value",
    async (discountType, discountValue, orderAmount, expectedDiscount) => {
      const result = await db.query(
        `
          SELECT fn_calculate_discount($1, $2, $3) AS discount
        `,
        [discountType, discountValue, orderAmount],
      );

      expect(Number(result.rows[0].discount)).toBe(expectedDiscount);
    },
  );
});

describe("Trigger testing", () => {
  test("negative stock update is rejected and leaves stock unchanged", async () => {
    const productId = seededProductIds[0];
    const before = await db.query(
      "SELECT stock FROM products WHERE id = $1",
      [productId],
    );

    await expect(
      db.query("UPDATE products SET stock = -5 WHERE id = $1", [productId]),
    ).rejects.toThrow();

    const after = await db.query(
      "SELECT stock FROM products WHERE id = $1",
      [productId],
    );
    expect(after.rows[0].stock).toBe(before.rows[0].stock);
  });
});

describe("Stored procedure testing", () => {
  test("checkout is atomic when one requested product is out of stock", async () => {
    const inStockProductIds = seededProductIds.slice(0, 2);
    const outOfStockProductId =
      seededProductIds[seededProductIds.length - 1];
    const requestedProductIds = [
      ...inStockProductIds,
      outOfStockProductId,
    ];

    const stockBefore = await db.query(
      `
        SELECT id, stock
        FROM products
        WHERE id = ANY($1::int[])
        ORDER BY id
      `,
      [requestedProductIds],
    );
    const orderCountBefore = await db.query(
      "SELECT COUNT(*)::int AS count FROM orders WHERE user_id = $1",
      [seededUserIds[1]],
    );

    let checkoutError;
    try {
      await db.query(CHECKOUT_SQL, [seededUserIds[1], requestedProductIds]);
    } catch (error) {
      checkoutError = error;
    }

    expect(checkoutError).toBeDefined();
    expect(checkoutError.message).not.toMatch(
      /does not exist|syntax error|bind message supplies/i,
    );

    const stockAfter = await db.query(
      `
        SELECT id, stock
        FROM products
        WHERE id = ANY($1::int[])
        ORDER BY id
      `,
      [requestedProductIds],
    );
    const orderCountAfter = await db.query(
      "SELECT COUNT(*)::int AS count FROM orders WHERE user_id = $1",
      [seededUserIds[1]],
    );

    expect(stockAfter.rows).toEqual(stockBefore.rows);
    expect(orderCountAfter.rows[0].count).toBe(
      orderCountBefore.rows[0].count,
    );
  });
});

describe("Functional API testing with Supertest", () => {
  test("expired coupon is rejected", async () => {
    const response = await request(API_BASE_URL)
      .post(APPLY_COUPON_PATH)
      .send({ code: "CP_EXPIRED", order_amount: 300 });

    expect(response.status).toBe(400);
    expect(JSON.stringify(response.body)).toMatch(/expired|hết hạn/i);
  });

  test("canceled order cannot transition to delivered", async () => {
    requireEnvironment("ADMIN_TOKEN", ADMIN_TOKEN);

    const response = await request(API_BASE_URL)
      .put(`${ADMIN_ORDER_STATUS_PATH}/${canceledOrderId}/status`)
      .set("Authorization", `Bearer ${ADMIN_TOKEN}`)
      .send({ status: "delivered" });

    expect(response.status).toBe(400);

    const orderResult = await db.query(
      "SELECT status FROM orders WHERE id = $1",
      [canceledOrderId],
    );
    expect(orderResult.rows[0].status).toBe("canceled");
  });
});

describe("Security testing", () => {
  test("product search resists SQL injection without changing data", async () => {
    const injectionPayload = "' OR '1'='1";
    const countBefore = await db.query(
      "SELECT COUNT(*)::int AS count FROM products",
    );

    const response = await request(API_BASE_URL)
      .get(PRODUCT_SEARCH_PATH)
      .query({ q: injectionPayload });

    expect(response.status).toBeLessThan(500);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);

    const countAfter = await db.query(
      "SELECT COUNT(*)::int AS count FROM products",
    );
    expect(countAfter.rows[0].count).toBe(countBefore.rows[0].count);
  });

  test("app_user cannot drop products and the table remains present", async () => {
    requireEnvironment("APP_USER_DATABASE_URL", APP_USER_DATABASE_URL);
    const appUserDb = new Pool({
      connectionString: APP_USER_DATABASE_URL,
      max: 1,
    });

    try {
      await expect(
        appUserDb.query("DROP TABLE products"),
      ).rejects.toMatchObject({ code: "42501" });
    } finally {
      await appUserDb.end();
    }

    const tableResult = await db.query(
      "SELECT to_regclass(current_schema() || '.products') AS table_name",
    );
    expect(tableResult.rows[0].table_name).toBe("products");
  });
});
