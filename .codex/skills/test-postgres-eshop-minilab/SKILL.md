---
name: test-postgres-eshop-minilab
description: Implement and review the N09 mini exercise for PostgreSQL E-Commerce database testing with Node.js, Jest, Supertest, performance.sql, REPORT.md, and optional MCP Database Server schema analysis. Use when Codex needs to create, fix, or evaluate database tests for schema constraints, functions, triggers, stored procedures, transactions, API/security checks, SQL injection, RBAC, EXPLAIN ANALYZE, or MCP logs for this mini lab.
---

# PostgreSQL EShop Mini Lab

Use this skill to complete or review the N09 PostgreSQL E-Commerce mini lab. Start from the repository context and treat the assignment PDF as the source of truth when present.

## Workflow

1. Inspect the existing backend structure before writing tests:
   - Locate the database connection helper, app/server export, routes, migrations, seed files, and package scripts.
   - Prefer existing helpers over creating a parallel test harness.
   - Identify how stored procedures/functions are called in this project.

2. Read [references/assignment.md](references/assignment.md) when implementing or reviewing deliverables.

3. Produce or update the required artifacts:
   - `db-tests.test.js`: Jest tests for database objects, API behavior, and security.
   - `performance.sql`: before/after `EXPLAIN (ANALYZE, BUFFERS)` measurements and index creation.
   - `REPORT.md`: test summary, detected bugs, performance results, MCP prompt/response summary, and verification notes.

4. Keep test data deterministic:
   - Create the minimum users, products, coupons, and orders needed by each test.
   - Use setup/cleanup, transactions, truncation, or unique values so reruns do not contaminate later tests.
   - Never hard-code a production password or secret connection string in submitted files.

5. Validate AI/MCP output instead of treating it as evidence by itself:
   - Record the prompt and a concise summary in `REPORT.md`.
   - Verify tables, constraints, triggers, functions, procedures, and plans with SQL queries or automated tests.

## Test Coverage Targets

Cover the seven assignment aspects:

- Schema: reject duplicate `users.email` and other declared constraints.
- Functional: reject expired/inactive coupons and invalid order status transitions.
- Trigger: prove negative stock updates are blocked.
- Stored Procedure: prove checkout rollback restores all changed stock and leaves no partial order.
- Function: prove discount calculation cannot exceed the order amount, including `percent` value over 100.
- Security: test SQL injection behavior and RBAC permissions such as denying `DROP TABLE` for `app_user`.
- Performance: compare actual plans, execution time, scan type, and buffers before/after indexing.

## MCP Guidance

Use MCP Database Server only if it is available or the user has configured it. The assignment names `@modelcontextprotocol/server-postgres`, but MCP is a support tool, not the test oracle.

If MCP is unavailable, do not block the lab. Use direct SQL against PostgreSQL to inspect `information_schema`, `pg_catalog`, triggers, functions, procedures, and `EXPLAIN ANALYZE`, then state in `REPORT.md` that MCP was not configured and list the equivalent SQL verification performed.

Do not suggest installing an MCP server unless the user explicitly wants live AI/MCP integration or the grading environment requires an MCP log generated from a real server.

## Reporting Standard

For every bug or risk, include:

- Input/setup
- Expected result
- Actual result
- Test case or SQL evidence
- Likely root cause
- Suggested fix

For performance, report the actual PostgreSQL planner choice. With about 200 `orders`, a sequential scan after adding `idx_orders_user_id` can be valid; explain it instead of labeling it as a failure automatically.
