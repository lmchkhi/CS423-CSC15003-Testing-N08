# BÁO CÁO KẾT QUẢ KIỂM THỬ

## 1. Tổng quan Test Run

- Môi trường: Node.js, Jest, Supertest, PostgreSQL 16.
- Cách ly bài tập: Toàn bộ artifact nằm trong `23127475_MINILAB_POSTGRES`, không dùng các thư mục `backend`, `frontend-admin`, `frontend-web`, `frontend-mobile`.
- MCP: Không cài MCP theo yêu cầu. Thay thế bằng SQL trực tiếp và test tự động.
- Test suite: `db-tests.test.js`.
- API test: Express app tối thiểu trong `app.js`, dùng chung PostgreSQL test database.
- Tổng số test: 8.
- Pass / Fail thực tế: 8 / 0.
- Kết quả chạy trong môi trường local: `Test Suites: 1 passed, Tests: 8 passed`.

Lệnh chạy:

```bash
npm install
npm run db:up
npm test
npm run db:perf
```

Biến môi trường mặc định:

- `TEST_DATABASE_URL=postgres://postgres:postgres@localhost:5432/eshop_test`
- `APP_USER_DATABASE_URL=postgres://app_user:app_user@localhost:5432/eshop_test`

## 2. Danh sách lỗi phát hiện

1. **fn_calculate_discount**
   - Input: `fn_calculate_discount('percent', 150, 200)`.
   - Expected: Mức giảm giá không vượt tổng đơn hàng, tối đa `200`.
   - Actual với schema nộp kèm: Pass; hàm trả về giá trị `<= 200`.
   - Test case: `Function: discount must not exceed order amount`.
   - Root cause nếu fail trong schema lỗi: Hàm tính `order_amount * percent / 100` nhưng không giới hạn mức giảm theo tổng đơn.
   - Fix đề xuất: Dùng `LEAST(calculated, order_amount)` và `GREATEST(0, ...)`.

2. **sp_process_checkout**
   - Input: Checkout gồm 2 sản phẩm còn hàng và 1 sản phẩm hết hàng.
   - Expected: Thủ tục ném lỗi, rollback tất cả thay đổi tồn kho, không tạo đơn hàng dang dở.
   - Actual với schema nộp kèm: Pass; tồn kho và số lượng order giữ nguyên sau lỗi.
   - Test case: `Stored procedure: checkout rolls back every stock change when one item is out of stock`.
   - Root cause nếu fail trong schema lỗi: Trừ stock hoặc tạo order từng phần trước khi phát hiện hết hàng, không bảo toàn transaction.
   - Fix đề xuất: Kiểm tra và lock tất cả sản phẩm trước khi tạo order/trừ stock; nếu lỗi thì raise exception để PostgreSQL rollback statement/procedure.

3. **trg_prevent_negative_stock**
   - Input: `UPDATE products SET stock = -5 WHERE id = ...`.
   - Expected: Bị từ chối.
   - Actual với schema nộp kèm: Pass; cập nhật stock âm bị từ chối bởi trigger hoặc CHECK constraint.
   - Test case: `Trigger: prevent updating stock to a negative value`.
   - Root cause nếu fail: Trigger chưa gắn với `products`, trigger function không raise exception, hoặc thiếu constraint `stock >= 0`.
   - Fix đề xuất: Tạo `BEFORE INSERT OR UPDATE OF stock` trigger và giữ `CHECK (stock >= 0)`.

4. **Schema / Constraint**
   - Input: Insert trùng email vào `users.email`.
   - Expected: Vi phạm UNIQUE.
   - Actual với schema nộp kèm: Pass; insert trùng email bị từ chối bởi UNIQUE constraint.
   - Test case: `Schema: duplicate user email is rejected by UNIQUE constraint`.

5. **Functional API**
   - Coupon hết hạn: Pass; `POST /api/apply-coupon` với `CP_EXPIRED` trả về `400`.
   - Trạng thái order: Pass; đơn `canceled` không được chuyển sang `delivered`, API trả về `400`.

6. **Security**
   - SQL Injection: Pass; `/api/products/search?q=' OR '1'='1` trả về `200`, không sửa/xóa dữ liệu, và không trả về toàn bộ product.
   - RBAC: Pass; role `app_user` không có quyền `DROP TABLE products`.

## 3. Kết quả hiệu năng

File `performance.sql` gồm 3 phần:

1. `EXPLAIN (ANALYZE, BUFFERS)` trước khi tạo index.
2. `CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id); ANALYZE orders;`
3. `EXPLAIN (ANALYZE, BUFFERS)` sau khi tạo index.

Kết quả thực tế khi chạy `npm run db:perf`:

- Trước index:
  - Scan type: `Seq Scan on orders`
  - Rows: 200
  - Buffers: `shared hit=2` cho scan, toàn bộ plan có `shared hit=5`
  - Planning Time: `0.583 ms`
  - Execution Time: `0.225 ms`
- Sau index `idx_orders_user_id` và `ANALYZE orders`:
  - Scan type: `Seq Scan on orders`
  - Rows: 200
  - Buffers: `shared hit=2`
  - Planning Time: `0.167 ms`
  - Execution Time: `0.080 ms`
- Nhận xét planner: PostgreSQL vẫn chọn `Seq Scan` sau khi tạo index. Với khoảng 200 dòng và truy vấn aggregate toàn bảng, đây là hành vi hợp lý vì đọc toàn bảng rẻ hơn đi qua index. Chi phí ước lượng và thời gian thực thi giảm sau khi `ANALYZE` cập nhật thống kê.

## 4. Nhật ký MCP

- Prompt dự kiến nếu dùng MCP: "Liệt kê danh sách bảng, khóa ngoại, ràng buộc, trigger, function và stored procedure trong schema hiện tại. Với mỗi đối tượng, nêu tên, bảng liên quan và mục đích chính."
- Tóm tắt phản hồi MCP: Không có vì không cài MCP theo yêu cầu.
- Cách kiểm chứng thay thế: Test tự động và các truy vấn PostgreSQL metadata:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

SELECT conname, contype, conrelid::regclass AS table_name
FROM pg_constraint
WHERE connamespace = 'public'::regnamespace
ORDER BY table_name::text, conname;

SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

SELECT routine_name, routine_type
FROM information_schema.routines
WHERE specific_schema = 'public'
ORDER BY routine_type, routine_name;
```

## 5. Kết luận và khuyến nghị

- Bài nộp bao phủ 7 khía cạnh: Schema, Functional, Trigger, Stored Procedure, Function, Performance và Security.
- MCP không được cài đặt theo yêu cầu, nhưng nội dung schema/object/performance được kiểm chứng bằng SQL và Jest.
- Không đưa password thật hoặc connection string nhạy cảm vào source; thông tin mặc định trong Docker Compose chỉ dùng cho database local của mini lab.
