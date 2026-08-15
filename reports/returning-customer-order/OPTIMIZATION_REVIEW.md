# Optimization Review — Returning Customer Search and Order

## Phạm vi

AI đề xuất các tối ưu dựa trên kết quả đo thật (D1–D4), sau đó mỗi đề xuất được phân loại theo evidence runtime lẫn khả thi theo source code thật của `src/eshop-sut/backend`.

---

## Đề xuất #1 — Database Index trên bảng `orders(user_id)`

**Mô tả AI:** "Thêm index trên cột `user_id` của bảng `orders` để tăng tốc truy vấn `GET /api/orders/my-orders`."

**Phân loại:** `Plausible but unproven`

**Phân tích:**

- **Source code:** `server.js:312` truy vấn `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC`. Hiện tại `database.js` không tạo index nào trên `orders.user_id`.
- **Runtime evidence:** MyOrders avg tăng từ 3,2 ms (Load, ~30 orders/user) lên 4,8 ms (Endurance, ~150 orders/user). p95 tăng từ 6 ms lên 10 ms. Tuy nhiên, đây vẫn là latency rất thấp (single-digit ms).
- **Đánh giá:** Index có thể hữu ích khi order count tăng lớn (hàng nghìn/user), nhưng với 5 sản phẩm seed và latency <10 ms, chưa có evidence rõ ràng rằng đây là bottleneck. SQLite full table scan trên vài trăm row vẫn rất nhanh. Cần run dài hơn hoặc dataset lớn hơn để chứng minh.

---

## Đề xuất #2 — Bật SQLite WAL mode

**Mô tả AI:** "Bật WAL (Write-Ahead Logging) mode cho SQLite để giảm lock contention giữa reader và writer."

**Phân loại:** `Plausible but unproven`

**Phân tích:**

- **Source code:** `database.js:5` mở database ở mode mặc định (journal mode = DELETE). Không có `PRAGMA journal_mode=WAL`.
- **Runtime evidence:** Checkout (write-heavy) avg tăng từ 7,9 ms (Load, 20 VU) lên 36,3 ms (Endurance, 20 VU), nhưng error rate vẫn 0%. Stress (lên 80 VU) cũng 0% error, Checkout p95 = 54 ms.
- **Đánh giá:** WAL mode giúp concurrent read không bị block bởi writer. Tuy nhiên, SUT hiện chạy single-process Node.js; SQLite lock chỉ xảy ra ở mức statement level. Checkout avg tăng ở Endurance có thể do database file lớn hơn (state accumulation), không nhất thiết do journal mode. WAL có thể giúp giảm latency nhẹ khi read/write concurrent, nhưng chưa có evidence trực tiếp từ measured data cho thấy lock contention.

---

## Đề xuất #3 — Connection Pool

**Mô tả AI:** "Thiết lập connection pool để tái sử dụng kết nối database thay vì tạo mới mỗi request."

**Phân loại:** `Hallucinated / incompatible`

**Phân tích:**

- **Source code:** `database.js` sử dụng `new sqlite3.Database(dbPath)` — tạo **một** instance duy nhất được export và dùng bởi tất cả routes. SQLite trong Node.js (`sqlite3` npm package) sử dụng single file-based connection; không có "connection pool" theo nghĩa truyền thống như PostgreSQL/MySQL.
- **Runtime evidence:** Không có evidence nào cho thấy connection creation overhead là vấn đề (latency <10 ms cho hầu hết endpoints).
- **Đánh giá:** Connection pool không áp dụng được cho kiến trúc SQLite single-file + Node.js single-process hiện tại. Đề xuất này phản ánh kiến thức tổng quát về database optimization nhưng không tương thích với SUT cụ thể.

---

## Đề xuất #4 — Cache layer

**Mô tả AI:** "Thêm in-memory cache (ví dụ: `node-cache`) cho endpoint `GET /api/products` và `GET /api/products/:id` vì đây là read-heavy endpoints."

**Phân loại:** `Plausible but unproven`

**Phân tích:**

- **Source code:** `server.js:141-165` truy vấn SQLite mỗi request. Products là seed data cố định (5 sản phẩm), không thay đổi trong suốt test.
- **Runtime evidence:** Search avg = 2,7 ms, ProductDetail avg = 2,8 ms (Endurance). Đây đã rất nhanh.
- **Đánh giá:** Cache sẽ giảm SQLite load nhưng latency hiện tại đã <3 ms; lợi ích thực tế không rõ ràng trên dataset 5 sản phẩm. Có thể hữu ích hơn nếu dataset lớn hơn đáng kể. Tuy nhiên, `server.js:144` có lỗ hổng SQL injection (`LIKE '%${searchQuery}%'` — string interpolation trực tiếp); cache cũng sẽ che đi behavioral difference giữa cached và non-cached requests.

---

## Đề xuất #5 — Giới hạn payload `my-orders`

**Mô tả AI:** "Thêm pagination cho `GET /api/orders/my-orders` để giới hạn payload khi order history tăng."

**Phân loại:** `Feasible`

**Phân tích:**

- **Source code:** `server.js:311-318` trả `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC` — toàn bộ history, không có LIMIT.
- **Runtime evidence:** MyOrders avg tăng từ 3,2 ms (Load, ~30 orders/user) lên 4,8 ms (Endurance, ~150 orders/user). Payload `bytes` trong JTL tăng dần (422 → 578+ bytes cho MyOrders response). Trong production với hàng nghìn orders, payload sẽ tăng không giới hạn.
- **Đánh giá:** Đây là đề xuất khả thi và có evidence hỗ trợ: response time tăng tương quan với order count tích lũy. Pagination (LIMIT/OFFSET hoặc cursor-based) sẽ giữ payload ổn định. Source code cho phép thêm query parameter `?page=&limit=` mà không thay đổi kiến trúc.

---

## Đề xuất #6 — Rate Limiting

**Mô tả AI:** "Thêm rate limiting middleware để bảo vệ backend khỏi quá tải."

**Phân loại:** `Not supported by evidence`

**Phân tích:**

- **Source code:** Không có rate limiter hiện tại. Login lockout (`login_attempts + 2`, khóa 180 giây khi ≥3) là cơ chế bảo vệ duy nhất.
- **Runtime evidence:** Stress test đẩy lên 80 VU (~46 req/s) với 0% error; backend không bị quá tải. CPU max chỉ ~1% (Spike). Backend Node.js single-thread với SQLite xử lý tốt ở mức tải đã test.
- **Đánh giá:** Không có evidence cho thấy backend bị quá tải cần rate limiting. Đề xuất hợp lý về mặt production best practice, nhưng không được hỗ trợ bởi kết quả đo lường hiện tại.

---

## Đề xuất #7 — Clear cart sau checkout

**Mô tả AI:** "Clear cart sau checkout để giảm state accumulation."

**Phân loại:** `Feasible`

**Phân tích:**

- **Source code:** `server.js:297-308` — checkout INSERT order nhưng không xóa `userCarts[userId]`. Cart là in-memory object, không được clear.
- **Runtime evidence:** Cart tích lũy qua iteration; D4 Endurance working set tăng +4,7 MiB/30 phút, một phần do cart/order accumulation. MyOrders response payload tăng dần.
- **Đánh giá:** Đây vừa là performance optimization vừa là functional fix (checkout nên clear cart). Source code cho phép thêm `userCarts[userId] = []` sau INSERT thành công. Tuy nhiên, đây là thay đổi SUT behavior — theo skill rules, không được sửa SUT để làm test dễ hơn.

---

## Tổng kết phân loại

| #   | Đề xuất                  | Phân loại                   |
| --- | ------------------------ | --------------------------- |
| 1   | Index `orders(user_id)`  | Plausible but unproven      |
| 2   | SQLite WAL mode          | Plausible but unproven      |
| 3   | Connection Pool          | Hallucinated / incompatible |
| 4   | In-memory cache products | Plausible but unproven      |
| 5   | Pagination my-orders     | **Feasible**                |
| 6   | Rate Limiting            | Not supported by evidence   |
| 7   | Clear cart sau checkout  | **Feasible**                |

**Tổng:** 2 Feasible, 3 Plausible but unproven, 1 Not supported by evidence, 1 Hallucinated / incompatible.
