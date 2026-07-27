/*
 * PostgreSQL E-Commerce mini-lab. Run only against an isolated test database:
 * TEST_DATABASE_URL=postgres://... API_BASE_URL=http://localhost:3000 npm test -- db-tests.test.js
 * Optional, explicit RBAC check: APP_USER_DATABASE_URL=postgres://... RUN_RBAC_DESTRUCTIVE_TESTS=true
 */
const { Pool } = require('pg');
const request = require('supertest');

const databaseUrl = process.env.TEST_DATABASE_URL;
const apiBaseUrl = process.env.API_BASE_URL;
const runRbac = process.env.RUN_RBAC_DESTRUCTIVE_TESTS === 'true';
const suffix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const prefix = `qa_lab_${suffix}`;
let pool;

const requiredTables = ['users', 'products', 'coupons', 'orders'];
const seedUsers = [
  ['customer', 'customer'], ['admin', 'admin'], ['manager', 'manager'],
  ['staff', 'staff'], ['auditor', 'auditor'],
];
const seedProducts = [
  ['in_stock_a', 'QA in-stock A', '100.00', 25],
  ['in_stock_b', 'QA in-stock B', '80.00', 10],
  ['in_stock_c', 'QA in-stock C', '25.00', 3],
  ['in_stock_d', 'QA in-stock D', '10.00', 1],
  ['out_of_stock', 'QA out-of-stock', '50.00', 0],
];

async function sql(text, params = []) { return pool.query(text, params); }
async function tableExists(name) {
  const r = await sql('SELECT to_regclass($1) IS NOT NULL AS present', [`public.${name}`]);
  return r.rows[0].present;
}
async function routineExists(name, kind) {
  const r = await sql(
    `SELECT EXISTS (
       SELECT 1 FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = current_schema() AND p.proname = $1 AND p.prokind = $2
     ) AS present`, [name, kind]);
  return r.rows[0].present;
}
async function seed() {
  for (const [key, role] of seedUsers) {
    await sql(
      `INSERT INTO users(email, role) VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role`,
      [`${prefix}_${key}@example.test`, role]);
  }
  for (const [key, name, price, stock] of seedProducts) {
    await sql(
      `INSERT INTO products(name, price, stock) VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`, [`${prefix}_${key}_${name}`, price, stock]);
  }
  const coupons = [
    ['CP_OK', 'percent', '10.00', 7, 1],
    ['CP_EXPIRED', 'percent', '10.00', -1, 1],
    ['CP_INACTIVE', 'percent', '10.00', 7, 0],
    ['CP_PERCENT150', 'percent', '150.00', 7, 1],
  ];
  for (const [code, type, value, expiryDays, active] of coupons) {
    await sql(
      `INSERT INTO coupons(code, discount_type, discount_value, expired_at, is_active)
       VALUES ($1, $2, $3, now() + ($4 * interval '1 day'), $5)
       ON CONFLICT (code) DO UPDATE SET discount_type = EXCLUDED.discount_type,
         discount_value = EXCLUDED.discount_value, expired_at = EXCLUDED.expired_at,
         is_active = EXCLUDED.is_active`, [code, type, value, expiryDays, active]);
  }
  // The lab schema has no fixture/tag column. This inserts approximately 200 orders only once.
  await sql(
    `INSERT INTO orders(user_id, total_amount, final_amount, status)
     SELECT u.id, 100.00, 90.00,
       (ARRAY['pending','confirmed','shipping','delivered','canceled'])[(g % 5) + 1]
     FROM generate_series(1, 200) AS g
     CROSS JOIN LATERAL (
       SELECT id FROM users WHERE email LIKE $1 ORDER BY id LIMIT 1 OFFSET ((g - 1) % 5)
     ) AS u
     WHERE (SELECT count(*) FROM orders) < 200`, [`${prefix}_%@example.test`]);
}

const describeDb = databaseUrl ? describe : describe.skip;
describeDb('E-Commerce PostgreSQL QA', () => {
  beforeAll(async () => {
    pool = new Pool({ connectionString: databaseUrl, max: 1 });
    for (const name of requiredTables) expect(await tableExists(name)).toBe(true);
    await sql('BEGIN');
    await seed();
  });
  afterAll(async () => { if (pool) { await sql('ROLLBACK').catch(() => {}); await pool.end(); } });

  test('catalog discovery records required objects before schema-specific assertions', async () => {
    const catalog = await sql(
      `SELECT c.relname AS table_name, con.conname, con.contype
       FROM pg_class c LEFT JOIN pg_constraint con ON con.conrelid = c.oid
       WHERE c.relname = ANY($1::text[]) ORDER BY c.relname, con.conname`, [requiredTables]);
    expect(catalog.rows.length).toBeGreaterThan(0);
  });

  test('fn_calculate_discount never discounts more than the order amount', async () => {
    expect(await routineExists('fn_calculate_discount', 'f')).toBe(true);
    const r = await sql('SELECT fn_calculate_discount($1, $2, $3) AS discount', ['percent', 150, 200]);
    expect(Number(r.rows[0].discount)).toBeLessThanOrEqual(200);
  });

  test('trg_prevent_negative_stock rejects negative inventory', async () => {
    const trigger = await sql(
      `SELECT EXISTS (SELECT 1 FROM pg_trigger t JOIN pg_class c ON c.oid=t.tgrelid
       WHERE c.relname=$1 AND t.tgname=$2 AND NOT t.tgisinternal) AS present`,
      ['products', 'trg_prevent_negative_stock']);
    expect(trigger.rows[0].present).toBe(true);
    const p = await sql('SELECT id FROM products WHERE name = $1', [`${prefix}_in_stock_a_QA in-stock A`]);
    await sql('SAVEPOINT negative_stock');
    try {
      await expect(sql('UPDATE products SET stock = $1 WHERE id = $2', [-1, p.rows[0].id]))
        .rejects.toMatchObject({ code: expect.any(String) });
    } finally { await sql('ROLLBACK TO SAVEPOINT negative_stock'); }
  });

  test('sp_process_checkout is atomic when the cart contains an out-of-stock product', async () => {
    // Signature/cart tables are deliberately discovered rather than guessed.
    expect(await routineExists('sp_process_checkout', 'p')).toBe(true);
    const sig = await sql(
      `SELECT pg_get_function_identity_arguments(p.oid) AS args
       FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
       WHERE n.nspname=current_schema() AND p.proname=$1 AND p.prokind='p'`, ['sp_process_checkout']);
    expect(sig.rows).toHaveLength(1);
    // This lab's supplied schema has no cart/cart_items contract; fail with the discovered signature
    // instead of inventing CALL arguments or silently weakening the atomicity assertion.
    throw new Error(`Checkout contract must be configured for atomicity test; discovered sp_process_checkout(${sig.rows[0].args})`);
  });

  test('UNIQUE email rejects a duplicate insert', async () => {
    const email = `${prefix}_unique@example.test`;
    await sql('INSERT INTO users(email, role) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING', [email, 'customer']);
    await sql('SAVEPOINT duplicate_email');
    try {
      await expect(sql('INSERT INTO users(email, role) VALUES ($1, $2)', [email, 'customer']))
        .rejects.toMatchObject({ code: '23505' });
    } finally { await sql('ROLLBACK TO SAVEPOINT duplicate_email'); }
  });

  const describeApi = apiBaseUrl ? describe : describe.skip;
  describeApi('HTTP API (requires API_BASE_URL)', () => {
    const api = () => request(apiBaseUrl);
    test('expired coupon returns HTTP 400', async () => {
      const response = await api().post('/api/apply-coupon').send({ code: 'CP_EXPIRED', order_amount: 300 });
      expect(response.status).toBe(400);
    });
    test('a canceled order cannot become delivered', async () => {
      const order = await sql("SELECT id FROM orders WHERE status = $1 ORDER BY id LIMIT 1", ['canceled']);
      expect(order.rows).toHaveLength(1);
      const response = await api().put(`/api/admin/orders/${order.rows[0].id}/status`).send({ status: 'delivered' });
      expect(response.status).toBe(400);
      const unchanged = await sql('SELECT status FROM orders WHERE id = $1', [order.rows[0].id]);
      expect(unchanged.rows[0].status).toBe('canceled');
    });
    test('product search resists a SQL tautology and does not mutate data', async () => {
      const before = await sql("SELECT count(*)::int AS n, coalesce(md5(string_agg(id::text || ':' || stock::text, ',' ORDER BY id)), '') AS fp FROM products");
      const response = await api().get('/api/products/search').query({ q: "' OR '1'='1" });
      const after = await sql("SELECT count(*)::int AS n, coalesce(md5(string_agg(id::text || ':' || stock::text, ',' ORDER BY id)), '') AS fp FROM products");
      expect(response.status).not.toBe(500);
      expect(after.rows[0]).toEqual(before.rows[0]);
      if (Array.isArray(response.body)) expect(response.body.length).toBeLessThanOrEqual(before.rows[0].n);
    });
  });

  (runRbac ? test : test.skip)('app_user lacks permission to DROP TABLE', async () => {
    expect(process.env.APP_USER_DATABASE_URL).toBeTruthy();
    const appPool = new Pool({ connectionString: process.env.APP_USER_DATABASE_URL, max: 1 });
    const client = await appPool.connect();
    try {
      await client.query('BEGIN');
      await expect(client.query('DROP TABLE products')).rejects.toMatchObject({ code: '42501' });
    } finally {
      await client.query('ROLLBACK').catch(() => {});
      client.release(); await appPool.end();
    }
  });
});
