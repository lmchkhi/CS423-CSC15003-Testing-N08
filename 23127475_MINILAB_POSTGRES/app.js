const express = require("express");

function createApp(pool) {
  const app = express();
  app.use(express.json());

  app.post("/api/apply-coupon", async (req, res) => {
    const { code, order_amount } = req.body;

    try {
      const result = await pool.query(
        `SELECT code, discount_type, discount_value, expired_at, is_active
         FROM coupons
         WHERE code = $1`,
        [code],
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Coupon not found" });
      }

      const coupon = result.rows[0];
      if (!coupon.is_active || new Date(coupon.expired_at) <= new Date()) {
        return res.status(400).json({ error: "Coupon is expired or inactive" });
      }

      const discount = await pool.query(
        "SELECT fn_calculate_discount($1, $2, $3) AS discount",
        [coupon.discount_type, coupon.discount_value, order_amount],
      );

      return res.json({
        code: coupon.code,
        discount: Number(discount.rows[0].discount),
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/admin/orders/:id/status", async (req, res) => {
    const { status } = req.body;

    try {
      const current = await pool.query("SELECT status FROM orders WHERE id = $1", [
        req.params.id,
      ]);

      if (current.rowCount === 0) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (current.rows[0].status === "canceled" && status === "delivered") {
        return res.status(400).json({ error: "Invalid status transition" });
      }

      await pool.query("UPDATE orders SET status = $1 WHERE id = $2", [
        status,
        req.params.id,
      ]);
      return res.json({ message: "Order status updated" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const q = `%${req.query.q || ""}%`;
      const result = await pool.query(
        "SELECT id, name, price, stock FROM products WHERE name ILIKE $1 ORDER BY id",
        [q],
      );
      return res.json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  return app;
}

module.exports = { createApp };
