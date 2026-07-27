---
name: postgresql-ecommerce-db-testing
description: Create a PostgreSQL E-Commerce mini-lab deliverable for database QA. Use when asked to execute, implement, or report the "MINI LAB — DATABASE TESTING CƠ BẢN & TÍCH HỢP AI/MCP", especially Jest/Supertest tests for schema, functional/API, trigger, stored procedure, function, performance, and security checks; generate db-tests.test.js, performance.sql, and REPORT.md.
---

# PostgreSQL E-Commerce Database Testing

Produce a safe, executable QA deliverable for the discovered E-Commerce PostgreSQL schema. Work in Vietnamese unless the requester uses another language.

## Discovery and MCP

Before writing schema-specific assertions, inspect migrations, API routes, existing tests, and environment templates. Never print a password, token, or full connection string.

If an MCP Database Server is available, send this exact prompt and retain a concise, non-sensitive summary for the report:

> Liệt kê danh sách bảng, khóa ngoại, ràng buộc, trigger, function và stored procedure trong schema hiện tại. Với mỗi đối tượng, nêu tên, bảng liên quan và mục đích chính.

Cross-check the MCP response with PostgreSQL catalog queries and the generated tests. If MCP is unavailable, say so and use catalog queries only; do not invent MCP results.

## Data and test isolation

Provide idempotent seed/setup SQL for five role-varied users, five products (including in-stock and out-of-stock products), four coupons `CP_OK`, `CP_EXPIRED`, `CP_INACTIVE`, and `CP_PERCENT150`, plus about 200 randomly linked orders. Match actual table and column names after discovery.

Every test that mutates data must be isolated: prefer a per-test transaction with `BEGIN` and unconditional `ROLLBACK` in `finally`; use `afterEach` cleanup for API calls that use a different connection. Generate unique fixture identifiers. Do not execute DDL/DML against an unspecified or production database.

## Required test suite

Generate `db-tests.test.js` using the project's Node.js/Jest conventions and `supertest` where API endpoints exist. Load database settings from non-committed environment variables. Use parameterized SQL (`$1`, `$2`, ...) only.

Cover these checks, adapting names/routes/status codes only when evidence requires it:

1. **Function:** `fn_calculate_discount` caps a 150% coupon discount at 100% of the eligible amount.
2. **Trigger:** `trg_prevent_negative_stock` rejects a stock update below zero.
3. **Stored procedure:** `sp_process_checkout` is atomic: a cart containing an out-of-stock product fails and leaves order creation, stock, coupon usage, and related rows unchanged.
4. **Schema:** duplicate email insertion violates the `UNIQUE` constraint.
5. **Functional/API:** expired coupon yields HTTP 400; an order cannot transition from `canceled` to `delivered`.
6. **Security:** search input such as a quote/tautology cannot broaden results, cause a server error, or alter data. Assert the response behavior and before/after row fingerprints/counts, demonstrating parameterization rather than merely accepting a non-500 status.
7. **RBAC:** under a connection authenticated as `app_user`, `DROP TABLE` fails due to insufficient privilege. Guard this test behind an explicit non-production test role/configuration and roll back any transaction; never test it with an owner or superuser account.

Use clear assertions for SQLSTATE/error codes where stable. Mark a test as skipped with a precise reason only when an expected endpoint/object is demonstrably absent; never silently weaken an assertion.

## Performance analysis

Generate `performance.sql` containing:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount) AS total_final_amount
FROM orders
GROUP BY user_id;

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
ANALYZE orders;

EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount) AS total_final_amount
FROM orders
GROUP BY user_id;
```

Keep the before/after plans and report execution time, scan type, and buffer metrics. Explain that a `Seq Scan` after indexing a table with roughly 200 rows can be the planner's correct cheaper choice, not a defect.

## Report and handoff

Generate `REPORT.md` with environment, test totals (Pass/Fail/Skipped if applicable), evidence of each required check, and an MCP log that distinguishes actual output from unavailable/assumed information. Include three defect records—function calculation, missing procedure rollback, and negative-stock trigger—with input, actual vs expected result, root cause, and proposed fix. If any defect was not reproduced, label it as a test scenario/template rather than a finding.

When the user asks **“Thực thi bài lab E-Commerce PostgreSQL”**, return the complete contents of exactly these three artifacts in separate fenced code blocks, headed `db-tests.test.js`, `performance.sql`, and `REPORT.md`. Do not reveal credentials or sensitive connection strings.
