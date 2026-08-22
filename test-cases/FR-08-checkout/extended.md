# FR-08 Checkout - Test case mở rộng do sinh viên bổ sung

**Người bổ sung:** Hà Bảo Ngọc - 23127300  
**Ngày:** 2026-08-20  
**Cơ sở:** Kết quả audit từ `audit.md`

---

## Danh sách case bổ sung

| ID | Nhóm kiểm thử | Dữ liệu / Hành động | Tiền điều kiện | Kết quả mong đợi / Oracle | Vì sao AI bỏ sót |
|---|---|---|---|---|---|
| TC-FR08-EXT-001 | Bảo mật - IDOR đọc order không cần auth | `GET /api/orders/{{lastOrderId}}` không có Authorization header | Đơn hàng tồn tại từ checkout trước | Quan sát được 200 OK; đúng ra phải là 401 Unauthorized | AI giả định endpoint đã enforce auth nhưng SUT không enforce. |
| TC-FR08-EXT-002 | Nghiệp vụ - `total_amount` âm | `POST /api/checkout` với `total_amount=-10000` | User token hợp lệ | Quan sát được 200 OK; đúng ra phải là 400 Bad Request | AI giả định backend validate số tiền dương. |
| TC-FR08-EXT-003 | State machine - `canceled→delivered` không hợp lệ | `PUT /api/admin/orders/:id/status` với `{ "status": "delivered" }` | Order đang ở trạng thái `canceled` | Quan sát được 200 OK; đúng ra phải là 400 Bad Request | AI liệt kê transition này là illegal nhưng cần case runtime để bắt bug. |
| TC-FR08-EXT-004 | Nghiệp vụ - checkout khi giỏ hàng rỗng | Checkout với user token, total_amount/address hợp lệ nhưng cart rỗng | Giỏ hàng chưa có item | Đúng ra phải trả 400; nếu 200 thì tạo order rỗng | AI không kiểm tra quan hệ giữa cart state và checkout. |
| TC-FR08-EXT-005 | Type coercion - `total_amount` dạng chuỗi số | `total_amount="50000"` thay vì number | User token hợp lệ | Strict schema nên reject 400 hoặc ghi nhận coercion | AI test chuỗi không phải số nhưng bỏ sót chuỗi số có thể bị JS ép kiểu. |

---

## Giải thích chi tiết

- **TC-FR08-EXT-001:** kiểm tra IDOR vì order detail không được public cho anonymous user.
- **TC-FR08-EXT-002:** kiểm tra business logic tiền âm, tránh client tự gửi giá trị không hợp lệ.
- **TC-FR08-EXT-003:** kiểm tra trạng thái kết thúc `canceled`, không được chuyển sang `delivered`.
- **TC-FR08-EXT-004:** kiểm tra checkout phải phụ thuộc trạng thái cart có item.
- **TC-FR08-EXT-005:** kiểm tra type validation với numeric string, một lỗi dễ bị che bởi coercion trong JavaScript.

Các case này bổ sung các giả định AI còn quá lạc quan về auth, validation, state machine và business rule.
