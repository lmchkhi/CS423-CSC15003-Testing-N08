DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

DROP PROCEDURE IF EXISTS sp_process_checkout(INT, INT[]);
DROP FUNCTION IF EXISTS fn_calculate_discount(TEXT, NUMERIC, NUMERIC);
DROP FUNCTION IF EXISTS prevent_negative_stock();

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'customer'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INT DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(20)
    CHECK (discount_type IN ('percent', 'fixed')) NOT NULL,
  discount_value NUMERIC(10, 2) NOT NULL,
  expired_at TIMESTAMP NOT NULL,
  is_active INT DEFAULT 1
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10, 2) NOT NULL,
  final_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20)
    CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'canceled'))
    DEFAULT 'pending'
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL
);

CREATE OR REPLACE FUNCTION fn_calculate_discount(
  discount_type TEXT,
  discount_value NUMERIC,
  order_amount NUMERIC
)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
  calculated NUMERIC;
BEGIN
  IF order_amount < 0 THEN
    RAISE EXCEPTION 'order_amount must be non-negative';
  END IF;

  IF discount_type = 'percent' THEN
    calculated := order_amount * discount_value / 100;
  ELSIF discount_type = 'fixed' THEN
    calculated := discount_value;
  ELSE
    RAISE EXCEPTION 'invalid discount type: %', discount_type;
  END IF;

  RETURN GREATEST(0, LEAST(calculated, order_amount));
END;
$$;

CREATE OR REPLACE FUNCTION prevent_negative_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.stock < 0 THEN
    RAISE EXCEPTION 'stock cannot be negative';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_negative_stock
BEFORE INSERT OR UPDATE OF stock ON products
FOR EACH ROW
EXECUTE FUNCTION prevent_negative_stock();

CREATE OR REPLACE PROCEDURE sp_process_checkout(
  p_user_id INT,
  p_product_ids INT[]
)
LANGUAGE plpgsql
AS $$
DECLARE
  product_id INT;
  current_product products%ROWTYPE;
  order_id INT;
  total NUMERIC(10, 2) := 0;
BEGIN
  FOREACH product_id IN ARRAY p_product_ids LOOP
    SELECT * INTO current_product
    FROM products
    WHERE id = product_id
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'product % not found', product_id;
    END IF;

    IF current_product.stock <= 0 THEN
      RAISE EXCEPTION 'product % is out of stock', product_id;
    END IF;

    total := total + current_product.price;
  END LOOP;

  INSERT INTO orders(user_id, total_amount, final_amount, status)
  VALUES (p_user_id, total, total, 'pending')
  RETURNING id INTO order_id;

  FOREACH product_id IN ARRAY p_product_ids LOOP
    SELECT * INTO current_product
    FROM products
    WHERE id = product_id
    FOR UPDATE;

    UPDATE products
    SET stock = stock - 1
    WHERE id = product_id;

    INSERT INTO order_items(order_id, product_id, quantity, unit_price)
    VALUES (order_id, product_id, 1, current_product.price);
  END LOOP;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_user') THEN
    CREATE ROLE app_user LOGIN PASSWORD 'app_user';
  END IF;
END;
$$;

GRANT CONNECT ON DATABASE eshop_test TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE ON users, products, coupons, orders, order_items TO app_user;
REVOKE CREATE ON SCHEMA public FROM app_user;
