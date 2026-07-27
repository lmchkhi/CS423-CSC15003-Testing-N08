# BÁO CÁO KẾT QUẢ KIỂM THỬ

**Bài thực hành:** Mini Lab - Database Testing với PostgreSQL và AI/MCP  
**Mã số sinh viên:** 23127062  
**Ngày thực thi:** 27/07/2026  
**Phạm vi:** Schema, Function, Trigger, Stored Procedure, Functional API, Security, Performance và MCP schema analysis

## 1. Tổng quan Test Run

### 1.1 Môi trường

| Thuộc tính     | Giá trị                                       |
| -------------- | --------------------------------------------- |
| Thời điểm chạy | 2026-07-27 16:28-16:32                        |
| Hệ điều hành   | macOS 26.5.2, build 25F84                     |
| Node.js        | v24.18.0                                      |
| Jest           | 30.1.2                                        |
| PostgreSQL     | 18.4, x86_64-apple-darwin24.6.0               |
| Database       | `minilab` trên `127.0.0.1:55432`              |
| API            | Express test SUT trên `http://127.0.0.1:3100` |
| MCP server     | `@modelcontextprotocol/server-postgres` 0.6.2 |

Đề bài không cung cấp implementation của function, trigger, stored procedure hoặc PostgreSQL API. Vì vậy, test run sử dụng một SUT cô lập được dựng theo schema và các lỗi logic được mô tả trong đề. SUT này không sử dụng SQLite EShop. Các test và kết quả bên dưới đều được thực thi thật trên SUT đó.

### 1.2 Lệnh thực thi

```bash
DATABASE_URL='postgresql://postgres@127.0.0.1:55432/minilab' \
APP_USER_DATABASE_URL='postgresql://app_user:<redacted>@127.0.0.1:55432/minilab' \
API_BASE_URL='http://127.0.0.1:3100' \
ADMIN_TOKEN='<redacted>' \
jest db-tests.test.js --runInBand

psql "$DATABASE_URL" -f performance.sql
```

### 1.3 Dữ liệu kiểm thử

| Bảng       | Số lượng | Nội dung                                              |
| ---------- | -------: | ----------------------------------------------------- |
| `users`    |        5 | Email duy nhất; role phục vụ RBAC                     |
| `products` |        5 | 4 sản phẩm còn hàng; 1 sản phẩm hết hàng              |
| `orders`   |      200 | Phân bố trên 5 `user_id` hợp lệ                       |
| `coupons`  |        4 | `CP_OK`, `CP_EXPIRED`, `CP_INACTIVE`, `CP_PERCENT150` |

Test thay đổi dữ liệu có setup/cleanup. Các bản ghi dùng prefix `MINILAB_23127062`; cleanup xóa orders trước users để không vi phạm khóa ngoại.

### 1.4 Kết quả tổng hợp

| Chỉ số         |    Kết quả |
| -------------- | ---------: |
| Test suites    |          1 |
| Tổng số test   |         13 |
| Pass           |          9 |
| Fail           |          4 |
| Skip           |          0 |
| Thời gian Jest | 0.187 giây |

Suite có trạng thái `FAIL` vì bốn assertion theo đặc tả đã phát hiện bốn lỗi thực tế. Đây là lỗi của SUT, không phải lỗi khởi tạo môi trường.

### 1.5 Kết quả theo khía cạnh

| Khía cạnh        | Test                                                 | Kết quả        |
| ---------------- | ---------------------------------------------------- | -------------- |
| Schema           | Object tồn tại; email UNIQUE; order FK; status CHECK | 4 Pass         |
| Function         | Percent 150%; percent bình thường; fixed             | 2 Pass, 1 Fail |
| Trigger          | Chặn stock âm và giữ nguyên dữ liệu                  | 1 Pass         |
| Stored Procedure | Atomicity khi có sản phẩm hết hàng                   | 1 Fail         |
| Functional API   | Coupon hết hạn; state transition sai                 | 1 Pass, 1 Fail |
| Security         | SQL Injection; quyền `app_user`                      | 1 Pass, 1 Fail |

## 2. Danh sách lỗi phát hiện

### BUG-01 - Mức giảm phần trăm vượt tổng đơn hàng

| Thuộc tính | Nội dung                                              |
| ---------- | ----------------------------------------------------- |
| Đối tượng  | `fn_calculate_discount`                               |
| Test case  | `150 percent discount cannot exceed the order amount` |
| Input      | `fn_calculate_discount('percent', 150, 200)`          |
| Expected   | Discount trong khoảng `0..200`                        |
| Actual     | `300`                                                 |
| Kết quả    | **FAIL - Defect reproduced**                          |
| Mức độ     | High                                                  |

Bằng chứng Jest:

```text
Expected: <= 200
Received:    300
```

**Root cause:** Nhánh `percent` tính trực tiếp `order_amount * value / 100` nhưng không giới hạn kết quả theo tổng đơn hàng.

**Fix đề xuất:** Kiểm tra input và trả về `GREATEST(0, LEAST(calculated_discount, order_amount))`. Thêm test cho `0%`, `100%`, `>100%`, giá trị âm và order amount bằng 0.

### BUG-02 - Checkout không đảm bảo tính nguyên tử

| Thuộc tính | Nội dung                                                                    |
| ---------- | --------------------------------------------------------------------------- |
| Đối tượng  | `sp_process_checkout`                                                       |
| Test case  | `checkout is atomic when one requested product is out of stock`             |
| Input      | Hai sản phẩm stock `10`, sau đó một sản phẩm stock `0`                      |
| Expected   | Procedure báo lỗi; mọi stock trở về giá trị ban đầu; không có order dở dang |
| Actual     | Procedure báo hết hàng nhưng stock hai sản phẩm đầu giảm từ `10` xuống `9`  |
| Kết quả    | **FAIL - Defect reproduced**                                                |
| Mức độ     | Critical                                                                    |

Bằng chứng Jest:

```text
Expected:
  product 1 stock = 10
  product 2 stock = 10
  out-of-stock product stock = 0

Received:
  product 1 stock = 9
  product 2 stock = 9
  out-of-stock product stock = 0
```

Không có order hoàn chỉnh được tạo, nhưng các thay đổi tồn kho đã commit một phần. Điều này vẫn vi phạm atomicity và làm sai dữ liệu.

**Root cause:** Procedure thực hiện `COMMIT` sau từng lần trừ stock. Exception ở sản phẩm hết hàng chỉ rollback transaction hiện tại, không thể phục hồi các transaction đã commit trước đó.

**Fix đề xuất:** Không commit trong vòng lặp. Khóa và kiểm tra tồn kho của toàn bộ sản phẩm trước; sau đó cập nhật stock và tạo order trong cùng một transaction. Bất kỳ exception nào cũng phải rollback toàn bộ checkout.

### BUG-03 - Cho phép chuyển `canceled` sang `delivered`

| Thuộc tính | Nội dung                                                 |
| ---------- | -------------------------------------------------------- |
| API        | `PUT /api/admin/orders/:id/status`                       |
| Input      | Order hiện tại `canceled`; body `{"status":"delivered"}` |
| Expected   | HTTP 400; trạng thái vẫn `canceled`                      |
| Actual     | HTTP 200; API chấp nhận cập nhật                         |
| Kết quả    | **FAIL - Defect reproduced**                             |
| Mức độ     | High                                                     |

Bằng chứng Jest:

```text
Expected status: 400
Received status: 200
```

**Root cause:** State-transition logic có nhánh đặc biệt cho phép `canceled -> delivered`, trái với quy tắc `canceled` là final state.

**Fix đề xuất:** Dùng transition map duy nhất:

```text
pending   -> confirmed | canceled
confirmed -> shipping  | canceled
shipping  -> delivered
delivered -> (none)
canceled  -> (none)
```

Thực hiện kiểm tra và update trong cùng transaction hoặc một câu `UPDATE` có điều kiện trạng thái hiện tại để tránh race condition.

### BUG-04 - SQL Injection trong API tìm kiếm sản phẩm

| Thuộc tính | Nội dung                                                      |
| ---------- | ------------------------------------------------------------- |
| API        | `GET /api/products/search?q=...`                              |
| Payload    | `' OR '1'='1`                                                 |
| Expected   | Không HTTP 500; không trả toàn bộ dữ liệu; database không đổi |
| Actual     | HTTP dưới 500 nhưng trả toàn bộ 5/5 sản phẩm                  |
| Kết quả    | **FAIL - Defect reproduced**                                  |
| Mức độ     | Critical                                                      |

Bằng chứng Jest:

```text
Expected result length: 0
Received result length: 5
```

Việc API không trả HTTP 500 không chứng minh khả năng chống SQL Injection. Phạm vi kết quả đã bị mở rộng trái phép.

**Root cause:** Giá trị `q` được nội suy trực tiếp vào SQL string. Payload biến điều kiện tìm kiếm thành biểu thức luôn đúng.

**Fix đề xuất:** Dùng parameterized query:

```sql
SELECT *
FROM products
WHERE name ILIKE '%' || $1 || '%';
```

Tài khoản kết nối của API cũng chỉ nên có quyền tối thiểu.

## 3. Các kiểm soát đạt yêu cầu

- `users.email` từ chối duplicate với PostgreSQL error `23505`.
- `orders.user_id` từ chối khóa ngoại không tồn tại với error `23503`.
- `orders.status` từ chối giá trị ngoài tập hợp với error `23514`.
- `fn_calculate_discount('percent', 10, 200)` trả `20`.
- `fn_calculate_discount('fixed', 25, 200)` trả `25`.
- `trg_prevent_negative_stock` chặn update stock thành `-5`; stock không đổi.
- API coupon hết hạn trả HTTP 400 và thông báo hết hạn.
- `app_user` không thể `DROP TABLE products`; PostgreSQL trả `42501`.
- Bảng `products` vẫn tồn tại sau thao tác DROP bị từ chối.

## 4. Kết quả hiệu năng

Truy vấn được đo với đúng 200 bản ghi `orders`, phân bố trên 5 users:

```sql
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;
```

| Chỉ số                   |   Trước index |     Sau index |
| ------------------------ | ------------: | ------------: |
| Scan type                |      Seq Scan |      Seq Scan |
| Aggregate                | HashAggregate | HashAggregate |
| Estimated scan rows      |           200 |           200 |
| Actual scan rows         |           200 |           200 |
| Estimated aggregate rows |             5 |             5 |
| Actual aggregate rows    |             5 |             5 |
| Data buffer hits         |             3 |             3 |
| Planning buffer hits     |            42 |            13 |
| Planning buffer reads    |             0 |             1 |
| Planning Time            |      0.097 ms |      0.067 ms |
| Execution Time           |      0.047 ms |      0.074 ms |

Index đã tạo:

```sql
CREATE INDEX idx_orders_user_id ON public.orders USING btree (user_id);
```

### 4.1 Phân tích Query Planner

PostgreSQL tiếp tục dùng `Seq Scan` sau khi tạo index. Đây là lựa chọn hợp lý, không phải lỗi:

1. Truy vấn tổng hợp cần đọc toàn bộ 200 rows; không có `WHERE` lọc theo `user_id`.
2. Bảng chỉ dùng 3 shared buffers cho phần data scan.
3. Duyệt toàn bộ bảng nhỏ có chi phí thấp hơn index traversal cộng heap access.
4. Cost của scan giữ nguyên ở `0.00..5.00`, cho thấy planner không ước tính lợi ích từ index cho truy vấn này.

Execution Time sau index cao hơn `0.027 ms` trong lần đo này. Chênh lệch rất nhỏ và có thể là nhiễu đo; không đủ cơ sở kết luận index làm giảm hiệu năng. Kết luận đúng là index không đem lại lợi ích quan sát được cho truy vấn full-table này. Muốn đánh giá index phù hợp hơn cần dữ liệu lớn hơn, nhiều lần đo và truy vấn có predicate theo `user_id`.

## 5. Nhật ký MCP

### 5.1 Prompt

> Liệt kê danh sách bảng, khóa ngoại, ràng buộc, trigger, function và stored procedure trong schema hiện tại. Với mỗi đối tượng, nêu tên, bảng liên quan và mục đích chính.

### 5.2 Thao tác MCP

PostgreSQL MCP Server được khởi chạy qua stdio và kết nối read-only tới database `minilab`. MCP công bố:

- Tool: `query`.
- Resources: schema của `users`, `products`, `coupons`, `orders`.

Tool `query` được gọi với catalog query kết hợp `information_schema.table_constraints`, `pg_trigger` và `pg_proc`.

### 5.3 Tóm tắt phản hồi MCP

- 4 bảng: `users`, `products`, `coupons`, `orders`.
- Foreign key: `orders_user_id_fkey` trên `orders.user_id`.
- Primary keys: `users_pkey`, `products_pkey`, `coupons_pkey`, `orders_pkey`.
- Unique constraints: `users_email_key`, `coupons_code_key`.
- Check constraints quan trọng:
  - `products_stock_check`.
  - `coupons_discount_type_check`.
  - `orders_status_check`.
- Trigger: `trg_prevent_negative_stock` trên `products`.
- Functions:
  - `fn_calculate_discount(text, numeric, numeric)`.
  - `prevent_negative_stock()`.
- Procedure:
  - `sp_process_checkout(integer, integer[])`.

### 5.4 Kiểm chứng phản hồi

| Nội dung MCP | Cách kiểm chứng độc lập                                     | Kết quả                           |
| ------------ | ----------------------------------------------------------- | --------------------------------- |
| 4 bảng       | `information_schema.tables` và schema assertions trong Jest | Khớp                              |
| Foreign key  | `information_schema.table_constraints`; test error `23503`  | Khớp                              |
| UNIQUE email | Catalog; duplicate test error `23505`                       | Khớp                              |
| Status CHECK | Catalog; invalid-status test error `23514`                  | Khớp                              |
| Trigger      | `pg_trigger`; negative-stock behavior test                  | Khớp và hoạt động                 |
| Function     | `pg_proc`; normal/edge-case Jest tests                      | Tồn tại, phát hiện lỗi >100%      |
| Procedure    | `pg_proc`; atomicity Jest test                              | Tồn tại, phát hiện partial commit |

Phản hồi MCP chỉ được dùng để khám phá đối tượng. Kết luận về hành vi được đưa ra từ SQL/Jest thực thi thật, không suy ra chỉ từ nội dung AI/MCP.

## 6. Kết luận và đề xuất khắc phục

Test run phát hiện 4 defects: 2 Critical và 2 High. Rủi ro lớn nhất là checkout không nguyên tử và SQL Injection, vì hai lỗi này có thể trực tiếp làm sai dữ liệu hoặc lộ toàn bộ dữ liệu sản phẩm. Hàm discount và state transition cũng vi phạm nghiệp vụ và có thể gây thiệt hại tài chính/trạng thái đơn hàng sai.

Thứ tự khắc phục đề xuất:

1. Parameterize toàn bộ SQL và rà soát các endpoint khác cho cùng pattern.
2. Loại bỏ `COMMIT` từng bước trong checkout; bổ sung transaction integration tests và kiểm thử concurrent checkout.
3. Chặn mọi transition từ final states bằng transition map tập trung.
4. Giới hạn discount về `0..order_amount` và validate discount configuration.
5. Chạy lại toàn bộ 13 tests sau khi sửa; tiêu chí hoàn tất là 13/13 Pass.
6. Giữ RBAC least-privilege và negative-stock constraint/trigger vì hai kiểm soát này đã hoạt động đúng.

Về hiệu năng, không nên giữ hoặc loại bỏ index chỉ dựa trên một lần đo 200 rows. Với truy vấn hiện tại, planner chọn `Seq Scan` hợp lý và index chưa chứng minh được lợi ích.
