---
title: "[BUG][FR-11] GET /api/orders/:id thiếu authentication và ownership check (IDOR)"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

FR11-DET-011, FR11-DET-026, FR11-DET-027, FR11-DET-028, FR11-DET-029, FR11-DET-030, FR11-DET-031, FR11-DET-032, FR11-DET-033

## Requirement liên quan

FR-11, SEC-02

## Severity / Priority

Critical / P0

## Environment

- OS: Windows 11
- Node.js: v22.18.0
- SUT: http://localhost:3000
- Newman: 6.2.2
- Student ID: 23127464

## Steps to reproduce

1. Không gửi authentication:

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

2. Gửi token không hợp lệ:

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  -H "Authorization: Bearer <INVALID_TOKEN>" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

3. User B dùng token hợp lệ để đọc order của User A:

```bash
curl -i \
  -H "X-Student-Id: 23127464" \
  -H "Authorization: Bearer <USER_B_VALID_TOKEN>" \
  "http://localhost:3000/api/orders/<ORDER_ID>"
```

## Expected result

- Endpoint yêu cầu JWT hợp lệ theo SEC-02.
- Danh tính trong JWT chỉ được xem order thuộc chính người dùng đó theo FR-11.
- Request thiếu/sai JWT hoặc truy cập foreign-owned order phải bị từ chối và không được làm lộ dữ liệu order.
- Tài liệu không định nghĩa exact rejection status code hoặc error body; báo cáo này không tự đặt oracle cho các chi tiết đó.

## Actual result

- Endpoint trả `200 OK` cùng JSON order data cho các request được kiểm tra dù không có JWT, JWT không hợp lệ hoặc JWT thuộc người dùng khác.
- Marker fixture `FR11-A1-OWNED` hoặc `FR11-B1-FOREIGN` xuất hiện trong response, chứng minh protected order data bị làm lộ.

## Evidence

- Final run: `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/`
- Newman console: `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/newman-console.txt`
- Newman JSON: `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/newman-report.json`
- Newman HTML: `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/newman-report.html`
- Kết quả chạy: 189 assertions, 22 failed assertions, Newman exit code `1`.

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

## Root cause

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

## Impact

Kẻ tấn công có thể thay đổi order ID trên URL để đọc dữ liệu đơn hàng của người dùng khác mà không cần xác thực hợp lệ. Tùy dữ liệu thực tế được lưu trong order, việc này có thể làm lộ thông tin giao dịch, tổng tiền, trạng thái và địa chỉ giao hàng.
