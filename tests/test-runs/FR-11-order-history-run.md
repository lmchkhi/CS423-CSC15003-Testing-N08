# Test Run: FR-11 - Xem lịch sử đơn hàng

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-11: Xem lịch sử đơn hàng (User) |
| **Ngày thực thi** | 30/06/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 · API: http://localhost:3000 |
| **Build / Commit** | `fd83b42` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR11-DT-001 | Xem lịch sử đơn hàng khi user đã đăng nhập và có đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-002 | Từ chối xem lịch sử đơn hàng khi chưa đăng nhập | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-003 | Hiển thị trạng thái rỗng khi user chưa có đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-004 | Hiển thị nhiều đơn hàng của cùng user | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-005 | Danh sách không hiển thị đơn hàng của user khác | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-006 | Xem chi tiết đơn hàng của chính user | Ngô Hồng Thanh | Passed | | Web không có page chi tiết một đơn hàng; API verification xác nhận user `test@eshop.com` xem được chi tiết đơn của chính mình (`GET /api/orders/16` trả `200 OK`, `user_id = 2`). |
| TC-FR11-DT-007 | Từ chối truy cập chi tiết đơn hàng của user khác | Ngô Hồng Thanh | Failed | BUG-FR11-007 | API verification xác nhận user `test@eshop.com` truy cập được đơn của user khác: `GET /api/orders/4` trả `200 OK`, response có `user_id = 1`. |
| TC-FR11-DT-008 | Hiển thị mã đơn hàng trong lịch sử đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-009 | Hiển thị ngày đặt trong lịch sử đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-010 | Hiển thị tổng tiền trong lịch sử đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-011 | Dịch trạng thái đơn hàng sang tiếng Việt rõ ràng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-DT-012 | Phân biệt trạng thái đơn hàng bằng màu sắc | Ngô Hồng Thanh | Failed | BUG-FR11-012 | Trạng thái `Đã xác nhận` và `Đang giao` đều dùng tông xanh lam rất gần nhau, khó phân biệt bằng màu sắc. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR11-BVA-001 | User có 0 đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-BVA-002 | User có đúng 1 đơn hàng | Ngô Hồng Thanh | Passed | | |
| TC-FR11-BVA-003 | User có nhiều đơn hàng | Ngô Hồng Thanh | Passed | | |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 13 |
| Failed | 2 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **15** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
