# N09 Mini Exercise Reference

Use this reference when working on the PostgreSQL E-Commerce mini lab from `N09-mini_exercise.pdf`.

## Required Stack and Deliverables

- Stack: Node.js, PostgreSQL, Jest, Supertest.
- Optional AI/MCP support: `@modelcontextprotocol/server-postgres`.
- Deliverables:
  - `db-tests.test.js`
  - `performance.sql`
  - `REPORT.md`

## Schema Under Test

Core tables:

- `users(id, email UNIQUE NOT NULL, role DEFAULT 'customer')`
- `products(id, name NOT NULL, price NUMERIC(10,2) NOT NULL, stock INT DEFAULT 0 CHECK stock >= 0)`
- `coupons(id, code UNIQUE NOT NULL, discount_type IN ('percent','fixed'), discount_value, expired_at, is_active DEFAULT 1)`
- `orders(id, user_id REFERENCES users(id) ON DELETE CASCADE, total_amount, final_amount, status IN ('pending','confirmed','shipping','delivered','canceled'))`

Objects expected to contain or expose logic defects:

- `fn_calculate_discount(type, value, order_amount)`: discount may exceed order amount.
- `sp_process_checkout(...)`: may fail to rollback the whole transaction when an item is out of stock.
- `trg_prevent_negative_stock`: must actually block negative stock updates.

## Minimum Test Data

- `users`: 5 unique emails with roles suitable for RBAC tests.
- `products`: 5 products, including at least one in-stock product and one out-of-stock product.
- `orders`: about 200 rows linked to random or deterministic users.
- `coupons`: `CP_OK`, `CP_EXPIRED`, `CP_INACTIVE`, `CP_PERCENT150`.

## Required Test Ideas

Database tests:

- Function: `fn_calculate_discount('percent', 150, 200)` must be `<= 200`.
- Trigger: `UPDATE products SET stock = -5 WHERE id = ...` must throw.
- Stored procedure atomicity: checkout containing an out-of-stock product must throw, restore all previously changed stock, and leave no dangling partial order.
- Schema constraint: duplicate `users.email` must throw.

API/security tests:

- `POST /api/apply-coupon` rejects `CP_EXPIRED` with a client error such as `400`.
- Admin order status API rejects transition from `canceled` to `delivered`.
- Product search handles SQL injection input such as `' OR '1'='1` without HTTP 500, without broad unintended results, and without modifying data.
- `app_user` must not be able to `DROP TABLE products`.

Performance:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

CREATE INDEX idx_orders_user_id ON orders(user_id);
ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;
```

Record execution time, scan type, and buffers before and after the index. Explain PostgreSQL planner behavior; a sequential scan can still be reasonable for a tiny aggregate over about 200 rows.

## REPORT.md Structure

Use this structure unless the user requests another format:

```markdown
# BAO CAO KET QUA KIEM THU

## 1. Tong quan Test Run
- Moi truong:
- Tong so test / Pass / Fail:

## 2. Danh sach Loi Phat hien
1. **fn_calculate_discount**
   - Expected / Actual / Root cause / Fix de xuat
2. **sp_process_checkout**
   - Du lieu truoc va sau transaction
3. **trg_prevent_negative_stock**
   - Dat / Khong dat

## 3. Ket qua Hieu nang
- Truoc index:
- Sau index:
- Nhan xet ve PostgreSQL planner:

## 4. Nhat ky MCP
- Prompt:
- Tom tat phan hoi:
- Cach kiem chung:

## 5. Ket luan va Khuyen nghi
```

## Grading Weights

- DB Unit Testing: 40%
- Functional and Security Testing: 25%
- Performance Testing: 15%
- MCP integration and analysis log: 10%
- `REPORT.md` presentation: 10%

## Submission Checklist

- `db-tests.test.js` runs and has clear assertions.
- `performance.sql` includes before/after index measurements.
- `REPORT.md` includes pass/fail, bugs, performance, and MCP log.
- Data-changing tests have setup/cleanup or rollback.
- No passwords or sensitive connection strings are committed.
- AI/MCP conclusions are checked against actual execution.
