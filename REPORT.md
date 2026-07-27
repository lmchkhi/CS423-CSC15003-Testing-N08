# BÁO CÁO KIỂM THỬ E-COMMERCE POSTGRESQL

## Môi trường và phạm vi

- Workspace được cung cấp chỉ có đề mini-lab và skill; không có migrations, source code, API routes, `.env` mẫu hay kết nối PostgreSQL.
- Đã cài dependency chạy test: `jest`, `supertest`, `pg` (devDependencies). Lần chạy tích hợp mới nhất ngày 2026-07-27, theo output đã cung cấp, dùng `TEST_DATABASE_URL` có password mẫu `YOUR_PASSWORD`: Jest **FAIL** (exit 1), 1 suite fail; 5 test fail và 4 test skip. `pg` ném `AggregateError` ngay trong `beforeAll` tại truy vấn catalog `to_regclass`, nên không có assertion schema/nghiệp vụ nào thực sự được thực thi. Đây là lỗi bootstrap kết nối, không phải kết quả kiểm thử schema. `node --check db-tests.test.js` **PASS** (exit 0); `git diff --check` **PASS** (exit 0). Không có PostgreSQL/API target đã xác thực để chạy các integration assertion hoặc `EXPLAIN`.
- Bộ test dùng `TEST_DATABASE_URL`, `API_BASE_URL`, và (chỉ khi bật rõ ràng) `APP_USER_DATABASE_URL`/`RUN_RBAC_DESTRUCTIVE_TESTS=true`. Không ghi password, token hay connection string.
- Seed idempotent nằm trong `beforeAll`: 5 user role-varied, 5 sản phẩm (1 hết hàng), bốn coupon yêu cầu, và khoảng 200 order. Các insert dùng tham số; coupon được upsert. Toàn bộ DB suite nằm trong một transaction và `ROLLBACK` vô điều kiện ở `afterAll`; assertion dự kiến lỗi dùng savepoint để transaction còn dùng được. Chỉ chạy trên DB test được chỉ định.

## Tổng quan test run

| Chỉ số | Kết quả |
|---|---:|
| Jest test cases Pass | 0 |
| Jest test cases Fail | 5 (lỗi kết nối ở `beforeAll`) |
| Jest test cases Skipped | 4 (3 API, 1 RBAC) |
| Jest test suites | 1 failed / 1 total |
| Static checks Pass | 2 / 2 (`node --check`, `git diff --check`) |
| Jest process | FAIL, exit 1 (`AggregateError` từ `pg` pool) |

`package.json`/dependencies hiện đã có; vẫn không có `psql` hoặc cấu hình DB/API đã xác thực trong workspace hiện tại. Lần kiểm tra kết nối mới nhất xác nhận `TCP_5432_LISTENING=False` tại `localhost:5432` và không tìm thấy service PostgreSQL; vì vậy lỗi `AggregateError` là lỗi TCP trước khi PostgreSQL kiểm tra user/password hoặc schema. Cần khởi động/cài PostgreSQL (hoặc đổi host/port tới server đang chạy), sau đó xác nhận database `ecommerce_test` tồn tại, user `qa_runner` có thể đăng nhập và URL được URL-encode nếu password chứa ký tự đặc biệt. Khi `TEST_DATABASE_URL` hợp lệ được cấp, đối tượng thiếu sẽ **fail rõ ràng** qua catalog assertion, không bị skip âm thầm. API tests chỉ được đăng ký khi có `API_BASE_URL`; RBAC chỉ được đăng ký khi xác nhận bằng `RUN_RBAC_DESTRUCTIVE_TESTS=true` và có user test riêng.

## Bằng chứng kiểm thử được thiết kế

| Hạng mục | Assertion/bằng chứng |
|---|---|
| Function | `fn_calculate_discount('percent',150,200) <= 200` |
| Trigger | Catalog xác nhận `trg_prevent_negative_stock`; `UPDATE ... stock=-1` phải lỗi |
| Procedure | Catalog xác nhận `sp_process_checkout`; khi chưa có signature/cart contract, suite fail và in signature thay vì bịa lời gọi |
| UNIQUE | SQLSTATE `23505` khi email trùng |
| Coupon | `POST /api/apply-coupon` với `CP_EXPIRED` phải HTTP 400 |
| State transition | `canceled → delivered` phải HTTP 400 và status DB không đổi |
| SQL injection | Search quote/tautology không 500; fingerprint `id:stock` và count products trước/sau không đổi |
| RBAC | Kết nối `app_user` phải lỗi SQLSTATE `42501` khi `DROP TABLE products`; luôn `ROLLBACK` |

## Defect records

Các record dưới đây là **kịch bản/template cần tái hiện**, không phải finding đã xác nhận, vì không có DB/runtime để chạy.

1. `fn_calculate_discount` vượt 100%
   - Input: `percent`, `150`, `200`.
   - Expected: discount `<= 200`; Actual: chưa chạy.
   - Root cause cần kiểm tra: phần trăm không clamp về 100 hoặc không giới hạn theo order amount.
   - Fix đề xuất: `LEAST(order_amount, GREATEST(0, calculated_discount))`.

2. `sp_process_checkout` thiếu rollback toàn phần
   - Input: cart có sản phẩm stock `0`; snapshot trước/sau gồm orders, stock, coupon usage và cart rows.
   - Expected: procedure lỗi và mọi snapshot không đổi; Actual: chưa chạy.
   - Root cause cần kiểm tra: DML/commit trước khi validate toàn bộ stock hoặc exception handler nuốt lỗi.
   - Fix đề xuất: lock/validate tất cả items trước DML; một transaction duy nhất; re-raise exception để rollback.

3. `trg_prevent_negative_stock` không chặn stock âm
   - Input: `UPDATE products SET stock=-1`.
   - Expected: lỗi constraint/trigger và row không đổi; Actual: chưa chạy.
   - Root cause cần kiểm tra: trigger sai timing/condition hoặc thiếu `RAISE EXCEPTION`.
   - Fix đề xuất: `BEFORE INSERT OR UPDATE`, kiểm tra `NEW.stock < 0`, `RAISE EXCEPTION` (và giữ `CHECK(stock >= 0)`).

## Hiệu năng

`performance.sql` chạy `EXPLAIN (ANALYZE, BUFFERS)` trước/sau `CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)` và `ANALYZE orders` cho truy vấn `SUM(final_amount) GROUP BY user_id`.

- Execution time / scan / shared buffers trước index: chưa đo.
- Execution time / scan / shared buffers sau index: chưa đo.
- Cần chép nguyên plan thực tế (bao gồm `Execution Time`, node scan và `Buffers`) vào đây sau khi chạy.
- Với khoảng 200 rows và aggregate quét toàn bộ `orders`, `Seq Scan` ngay cả sau index có thể là lựa chọn đúng, rẻ hơn của PostgreSQL planner; không tự nó là defect.

## MCP log và đối chiếu catalog

- Prompt yêu cầu (chưa gửi vì không có MCP Database Server khả dụng): “Liệt kê danh sách bảng, khóa ngoại, ràng buộc, trigger, function và stored procedure trong schema hiện tại. Với mỗi đối tượng, nêu tên, bảng liên quan và mục đích chính.”
- Kết quả MCP: **không có kết nối; không bịa kết quả**.
- Đối chiếu catalog có trong test: `pg_class` + `pg_constraint` cho tables/constraints; `pg_trigger` cho trigger; `pg_proc` + `pg_namespace` cho function/procedure. Khi có DB, bổ sung query FK (`contype='f'`) và lưu output thực tế vào report.
