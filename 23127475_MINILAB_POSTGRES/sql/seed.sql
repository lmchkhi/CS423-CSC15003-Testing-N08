TRUNCATE order_items, orders, coupons, products, users RESTART IDENTITY CASCADE;

INSERT INTO users(email, role)
VALUES
  ('customer1@example.test', 'customer'),
  ('customer2@example.test', 'customer'),
  ('admin@example.test', 'admin'),
  ('app-user@example.test', 'app_user'),
  ('customer3@example.test', 'customer');

INSERT INTO products(name, price, stock)
VALUES
  ('Keyboard', 100.00, 10),
  ('Mouse', 50.00, 8),
  ('Monitor', 300.00, 5),
  ('USB Cable', 10.00, 30),
  ('Out of Stock Item', 25.00, 0);

INSERT INTO coupons(code, discount_type, discount_value, expired_at, is_active)
VALUES
  ('CP_OK', 'percent', 10, NOW() + INTERVAL '30 days', 1),
  ('CP_EXPIRED', 'fixed', 20, NOW() - INTERVAL '1 day', 1),
  ('CP_INACTIVE', 'fixed', 20, NOW() + INTERVAL '30 days', 0),
  ('CP_PERCENT150', 'percent', 150, NOW() + INTERVAL '30 days', 1);

INSERT INTO orders(user_id, total_amount, final_amount, status)
SELECT
  ((g - 1) % 5) + 1,
  100 + (g % 20),
  100 + (g % 20),
  CASE WHEN g = 1 THEN 'canceled' ELSE 'pending' END
FROM generate_series(1, 200) AS g;
