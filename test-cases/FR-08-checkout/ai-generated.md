# FR-08 Checkout - Test case do AI sinh

**API endpoint:** `POST /api/checkout và các endpoint order liên quan`  
**Base URL:** `http://localhost:3000`  
**Tham chiếu đặc tả:** Section 4.3 (`api-specification.md`), FR-10 state machine, SEC requirements  
**MSSV:** 23127300  
**Kỹ thuật:** Phân vùng miền `total_amount`/`shipping_address`, auth, chuyển trạng thái, IDOR, business logic

---

## Ma trận test case

| ID | Nhóm kiểm thử | Dữ liệu (`total_amount` / `shipping_address` / `authMode`) | Tiền điều kiện | Kết quả mong đợi (theo spec) | Oracle |
|---|---|---|---|---|---|
| TC-FR08-001 | Thanh toán hợp lệ | 200000 / "123 Le Loi, Q1, TP.HCM" / user | User token hợp lệ | 200 OK; `{message:"Checkout successful", orderId:<int>}` | Mã phản hồi 200; khớp schema; orderId is integer |
| TC-FR08-002 | Xác thực - Không có token | 200000 / "123 Le Loi, Q1" / none | Không có Authorization header | 401 Unauthorized | Mã phản hồi 401 |
| TC-FR08-003 | Xác thực - Token không hợp lệ | 200000 / "123 Le Loi, Q1" / invalid | Token sai định dạng "Bearer not.a.real.token" | 403 Forbidden | Mã phản hồi 403 |
| TC-FR08-004 | Xác thực - User token hợp lệ | 150000 / "456 Nguyen Hue, Q3" / user | User token hợp lệ | 200 OK | Mã phản hồi 200; orderId returned |
| TC-FR08-005 | total_amount bằng 0 | 0 / "123 Le Loi, Q1" / user | User token hợp lệ | 400 Bad Request (should reject) | Mã phản hồi 400 |
| TC-FR08-006 | total_amount âm | -5000 / "123 Le Loi, Q1" / user | User token hợp lệ | 400 Bad Request (should reject) | Mã phản hồi 400 |
| TC-FR08-007 | total_amount dương nhỏ | 1 / "123 Le Loi, Q1" / user | User token hợp lệ | 200 OK (boundary) | Mã phản hồi 200 |
| TC-FR08-008 | total_amount dương lớn | 999999999 / "123 Le Loi, Q1" / user | User token hợp lệ | 200 OK | Mã phản hồi 200 |
| TC-FR08-009 | total_amount kiểu float | 199.99 / "123 Le Loi, Q1" / user | User token hợp lệ | 200 OK (accepted) or 400 | Check if float handled correctly |
| TC-FR08-010 | Thiếu total_amount | (omitted) / "123 Le Loi, Q1" / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-011 | total_amount là chuỗi không phải số | "abc" / "123 Le Loi, Q1" / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-012 | total_amount là chuỗi rỗng | "" / "123 Le Loi, Q1" / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-013 | shipping_address hợp lệ | 200000 / "789 Tran Hung Dao, Q5, TP.HCM" / user | User token hợp lệ | 200 OK | Mã phản hồi 200 |
| TC-FR08-014 | shipping_address rỗng | 200000 / "" / user | User token hợp lệ | 400 Bad Request (should reject) | Mã phản hồi 400 |
| TC-FR08-015 | Thiếu shipping_address | 200000 / (omitted) / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-016 | shipping_address quá dài | 200000 / ("A" * 500) / user | User token hợp lệ | 400 Bad Request (giới hạn độ dài) | Mã phản hồi 400 |
| TC-FR08-017 | shipping_address có Unicode | 200000 / "123 Lê Lợi, Quận 1, Thành phố Hồ Chí Minh" / user | User token hợp lệ | 200 OK (unicode supported) | Mã phản hồi 200 |
| TC-FR08-018 | shipping_address chỉ gồm khoảng trắng | 200000 / "   " / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-019 | Schema - Body rỗng | {} / user | User token hợp lệ | 400 Bad Request | Mã phản hồi 400 |
| TC-FR08-020 | Schema - Có field thừa | 200000 / "123 Le Loi" / user + {"extra":"field"} | User token hợp lệ | 200 OK (bỏ qua field thừa) hoặc 400 | Kiểm tra schema nghiêm ngặt |
| TC-FR08-021 | Nghiệp vụ - Kiểm tra giỏ hàng | 50000 / "123 Le Loi" / user | Cart total is 200000 (mismatch) | 400 Bad Request (should validate) | Mã phản hồi 400 |
| TC-FR08-022 | Trạng thái - Đơn hàng được tạo | 200000 / "123 Le Loi" / user | Checkout hợp lệ | Đơn hàng tồn tại with status "pending" | Query DB hoặc GET /api/orders/:id xác nhận status pending |
| TC-FR08-023 | Trạng thái - pending sang confirmed | Admin cập nhật `orderId` sang status "confirmed" | Đơn hàng đang ở trạng thái pending | 200 OK; status updated | PUT /api/admin/orders/:id/status trả 200 |
| TC-FR08-024 | Trạng thái - confirmed sang shipping | Admin cập nhật `orderId` sang status "shipping" | Đơn hàng đang ở trạng thái confirmed | 200 OK; status updated | PUT /api/admin/orders/:id/status trả 200 |
| TC-FR08-025 | Trạng thái - shipping sang delivered | Admin cập nhật `orderId` sang status "delivered" | Đơn hàng đang ở trạng thái shipping | 200 OK; status updated | PUT /api/admin/orders/:id/status trả 200 |
| TC-FR08-026 | Trạng thái - pending sang delivered không hợp lệ | Admin cập nhật `orderId` sang status "delivered" | Đơn hàng đang ở trạng thái pending | 400 Bad Request (illegal jump) | Mã phản hồi 400 |
| TC-FR08-027 | Trạng thái - pending sang shipping không hợp lệ | Admin cập nhật `orderId` sang status "shipping" | Đơn hàng đang ở trạng thái pending | 400 Bad Request (phải confirmed trước) | Mã phản hồi 400 |
| TC-FR08-028 | Trạng thái - pending sang canceled hợp lệ | Admin cập nhật `orderId` sang status "canceled" | Đơn hàng đang ở trạng thái pending | 200 OK | Mã phản hồi 200 |
| TC-FR08-029 | Trạng thái - canceled sang delivered không hợp lệ | Admin cập nhật `orderId` sang status "delivered" | Đơn hàng đang ở trạng thái canceled | 400 Bad Request (canceled là trạng thái kết thúc) | Mã phản hồi 400 |
| TC-FR08-030 | Bảo mật - IDOR đọc đơn hàng | GET /api/orders/:id with no token | Đơn hàng tồn tại | 401 Unauthorized (phải yêu cầu xác thực) | Mã phản hồi 401 |
| TC-FR08-031 | Bảo mật - IDOR đọc đơn hàng user khác | GET /api/orders/:id with userB token | Đơn hàng thuộc userA | 403 Forbidden (phải từ chối quyền truy cập) | Mã phản hồi 403 |
| TC-FR08-032 | SQL injection trong shipping_address | 200000 / "123' OR '1'='1" / user | User token hợp lệ | 200 OK (parameterized) or 400 | Check if safely stored |
| TC-FR08-033 | XSS trong shipping_address | 200000 / "<script>alert('xss')</script>" / user | User token hợp lệ | 400 Bad Request or sanitized | Mã phản hồi 400 or stored safely |
| TC-FR08-034 | Biên - total_amount = 1 | 1 / "123 Le Loi" / user | User token hợp lệ | 200 OK | Mã phản hồi 200 |
| TC-FR08-035 | Biên - total_amount = MAX_INT | 2147483647 / "123 Le Loi" / user | User token hợp lệ | 200 OK | Mã phản hồi 200 |

---

## Ghi chú

- **Spec §4.3 Success:** schema `{message:"Checkout successful", orderId:<int>}` khi HTTP 200.
- **Auth:** không token → 401; token sai → 403; user token hợp lệ → 200 với dữ liệu hợp lệ.
- **Trạng thái đơn hàng:** checkout tạo order ở `pending`; cập nhật trạng thái dùng endpoint admin.
- **FR-10 State Machine:** hợp lệ: pending→confirmed→shipping→delivered, pending→canceled; không hợp lệ: pending→delivered, pending→shipping, canceled→delivered.
- **IDOR:** `GET /api/orders/:id` phải yêu cầu xác thực và không cho user khác đọc đơn hàng.
- **Business logic:** backend phải tự bảo vệ dữ liệu tiền/order thay vì tin hoàn toàn giá trị client gửi lên.

---

## Quy trình sinh test bằng AI

1. Phân vùng `total_amount`: số dương, 0, âm, thiếu field, chuỗi không phải số, chuỗi rỗng, float, giá trị biên.
2. Phân vùng `shipping_address`: hợp lệ, rỗng, thiếu, quá dài, Unicode, chỉ khoảng trắng, SQL injection, XSS.
3. Phân vùng auth: không token, token sai, user token hợp lệ.
4. Mô hình hóa state machine FR-10 và các chuyển trạng thái hợp lệ/không hợp lệ.
5. Bổ sung IDOR, schema, business logic và case biên; gán ID `TC-FR08-001` đến `TC-FR08-035`.
