-- Mini Lab - PostgreSQL Performance Testing
-- Student ID: 23127062
--
-- Run in psql while connected to the mini-lab test database:
--   \o performance-results.txt
--   \i performance.sql
--   \o
--
-- Keep the complete output as evidence for REPORT.md.

\echo '=== ENVIRONMENT ==='
SELECT
  CURRENT_TIMESTAMP AS measured_at,
  current_database() AS database_name,
  current_user AS database_user,
  version() AS postgres_version;

\echo '=== DATA VOLUME ==='
SELECT COUNT(*) AS order_count FROM orders;

\echo '=== REMOVE PREVIOUS LAB INDEX FOR A REPEATABLE BASELINE ==='
DROP INDEX IF EXISTS idx_orders_user_id;
ANALYZE orders;

\echo '=== BEFORE INDEX ==='
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

\echo '=== CREATE INDEX AND UPDATE STATISTICS ==='
CREATE INDEX idx_orders_user_id ON orders(user_id);
ANALYZE orders;

\echo '=== INDEX DEFINITION ==='
SELECT indexdef
FROM pg_indexes
WHERE schemaname = current_schema()
  AND tablename = 'orders'
  AND indexname = 'idx_orders_user_id';

\echo '=== AFTER INDEX ==='
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

\echo '=== INTERPRETATION NOTE ==='
\echo 'For approximately 200 rows, PostgreSQL may retain a sequential scan.'
\echo 'That is not automatically a defect: reading the whole small table can'
\echo 'cost less than traversing an index plus fetching heap pages.'
