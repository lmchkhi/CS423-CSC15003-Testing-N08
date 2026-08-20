# GET /api/orders/:id thiếu authentication và ownership check (IDOR)

- **Mã vấn đề:** `FR11-SEC-001`
- **Mức độ:** `Critical / Security`
- **Endpoint:** `GET /api/orders/:id`
- **Phạm vi:** Pool B — FR-11
- **Phân loại:** `LOI_BAO_MAT_SUT` — Missing Authentication / Broken Object Level Authorization (IDOR)
- **Trạng thái xuất bản:** `BẢN NHÁP CỤC BỘ`
- **GitHub Issue:** `NOT CREATED`

## Mô tả

Endpoint `GET /api/orders/:id` không có middleware `authenticateToken` và không ràng buộc order được yêu cầu với danh tính chủ sở hữu trong JWT. Vì vậy endpoint trả dữ liệu order cho request không có JWT, có JWT không hợp lệ, hoặc có JWT hợp lệ của người dùng khác.

Lỗi cho phép caller biết một order ID có thể đọc trực tiếp dữ liệu của order không thuộc quyền sở hữu của mình. Đây là lỗi thiếu authentication kết hợp với IDOR/ownership bypass.

## Điều kiện tái hiện

- SUT chạy tại `http://localhost:3000`.
- Có một order tồn tại với ID `<ORDER_ID>` thuộc User A.
- Có JWT hợp lệ của User B tại `<USER_B_VALID_TOKEN>`.
- Student ID của repository: `23127464`.

## Các bước tái hiện

### 1. Không gửi authentication

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

### 2. Gửi token không hợp lệ

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  -H "Authorization: Bearer <INVALID_TOKEN>" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

### 3. User B dùng token hợp lệ để đọc order của User A

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  -H "Authorization: Bearer <USER_B_VALID_TOKEN>" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

## Expected vs Actual

### Expected

- Endpoint yêu cầu JWT hợp lệ theo SEC-02.
- Danh tính trong JWT chỉ được xem order thuộc chính người dùng đó theo FR-11.
- Request thiếu/sai JWT hoặc truy cập foreign-owned order phải bị từ chối và không được làm lộ dữ liệu order.
- Tài liệu không định nghĩa exact rejection status code hoặc error body; báo cáo này không tự đặt oracle cho các chi tiết đó.

### Actual

- Endpoint trả `200 OK` cùng JSON order data cho các request được kiểm tra dù không có JWT, JWT không hợp lệ hoặc JWT thuộc người dùng khác.
- Marker fixture `FR11-A1-OWNED` hoặc `FR11-B1-FOREIGN` xuất hiện trong response, chứng minh protected order data bị làm lộ.

## Evidence

- Canonical run: `tests/api-testing/evidence/fr-11/20260821-001900/`
- Newman console: `tests/api-testing/evidence/fr-11/20260821-001900/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-11/20260821-001900/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-11/20260821-001900/newman-report.html`
- Kết quả chạy: 101 assertions, 9 failed assertions, Newman exit code `1`.

Các assertion thất bại:

| Test case | Biến thể được chứng minh |
|---|---|
| `FR11-DET-011` | Token hợp lệ của foreign user vẫn đọc được order User A |
| `FR11-DET-026` | Thiếu authentication với owned order ID |
| `FR11-DET-027` | Thiếu authentication với foreign-owned order ID |
| `FR11-DET-028` | Header `Authorization` rỗng |
| `FR11-DET-029` | Scheme `Bearer` nhưng thiếu token |
| `FR11-DET-030` | Token ngẫu nhiên/không hợp lệ |
| `FR11-DET-031` | JWT bị sửa identity claim |
| `FR11-DET-032` | JWT hết hạn |
| `FR11-DET-033` | Dùng `Basic` thay cho Bearer JWT |

## Root cause — quan sát source

Tại `src/eshop-sut/backend/server.js:344`, route được khai báo như sau:

```js
app.get("/api/orders/:id", (req, res) => {
  db.get("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, order) => {
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  });
});
```

Quan sát:

- Route không gắn middleware `authenticateToken`.
- Truy vấn chỉ lọc theo `id`, không lọc theo `user_id` lấy từ JWT đã xác thực.
- Source observation phù hợp với disclosure đã được tái hiện trong canonical Newman run.

## Nguồn yêu cầu

- `src/eshop-sut/README.md` — FR-11: người dùng chỉ xem được đơn hàng của chính mình.
- `src/eshop-sut/README.md` — SEC-02: API bảo mật phải yêu cầu JWT hợp lệ.
- `src/eshop-sut/api_specification.md` — §4.5 công bố endpoint `GET /api/orders/:id` trong nhóm Giỏ hàng & Đơn hàng.
- `reports/api-testing/fr-11-phase-a-contract.md` — authentication, ownership và IDOR áp dụng trực tiếp cho endpoint detail.

## Tác động bảo mật

Kẻ tấn công có thể thay đổi order ID trên URL để đọc dữ liệu đơn hàng của người dùng khác mà không cần xác thực hợp lệ. Tùy dữ liệu thực tế được lưu trong order, việc này có thể làm lộ thông tin giao dịch, tổng tiền, trạng thái và địa chỉ giao hàng.

## Trạng thái Phase E

PHASE E: COMPLETE — LOCAL BUG REPORT CREATED

GITHUB ISSUE: NOT CREATED

CI/CD: NOT CREATED

AI CRITIQUE: NOT CREATED
