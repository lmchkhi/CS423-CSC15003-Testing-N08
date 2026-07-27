-- Run only on the isolated lab/test database. Save the two resulting plans in REPORT.md.
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
