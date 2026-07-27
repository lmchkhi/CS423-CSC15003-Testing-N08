-- N09 mini lab: PostgreSQL performance evidence.
-- Run after sql/schema.sql and sql/seed.sql have been loaded.

-- 1. Measure before creating the index.
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

-- 2. Create index and refresh statistics.
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
ANALYZE orders;

-- 3. Measure again after creating the index.
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

-- Interpretation note:
-- With about 200 rows and an aggregate over the whole table, PostgreSQL may still
-- choose Seq Scan after the index. Report the actual scan type, Execution Time,
-- and Buffers instead of assuming index usage is required.
