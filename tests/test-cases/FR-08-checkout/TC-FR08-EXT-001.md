# TC-FR08-EXT-001: Bảo mật - IDOR đọc không cần xác thực

## Mã yêu cầu
FR-08, FR-10, SEC-02, SEC-03

## Module / Loại kiểm thử / Kỹ thuật
Checkout API / Functional / Bảo mật / Kiểm thử miền API / Chuyển trạng thái / Bảo mật

## Phân tích miền

### Biến đầu vào & miền giá trị

| Biến | Kiểu | Miền giá trị / Ràng buộc |
|---|---|---|
| authMode | Header / trạng thái JWT | Bao phủ không có token, token không hợp lệ, user token hợp lệ và admin token khi cần cập nhật trạng thái. |
| total_amount | Number / JSON field | Bao phủ số dương, 0, số âm, float, thiếu field, string, chuỗi rỗng và giá trị biên. |
| shipping_address | String / JSON field | Bao phủ hợp lệ, rỗng, thiếu field, quá dài, Unicode, chỉ khoảng trắng, SQL injection và XSS. |
| order status | State | Bao phủ `pending`, `confirmed`, `shipping`, `delivered`, `canceled` và các chuyển trạng thái hợp lệ/không hợp lệ. |

### Ma trận miền

| TC | Dữ liệu / Hành động | Tiền điều kiện | Kết quả mong đợi | Oracle kiểm thử |
|---|---|---|---|---|
| TC-FR08-EXT-001 | GET /api/orders/{{lastOrderId}} không có Authorization header. | Đơn hàng tồn tại từ lần checkout trước. | Quan sát được 200 OK (IDOR bug); đúng ra phải là 401 Unauthorized. | AI giả định GET /api/orders/:id yêu cầu xác thực, nhưng SUT không enforce. Đây là BUG-FR08-001. |

## Tiền điều kiện
- Backend API đang chạy tại `http://localhost:3000`.
- Request có header `X-Student-Id: 23127300`.
- Token user/admin được chuẩn bị bằng Postman auth bootstrap khi test case cần xác thực.

## Dữ liệu kiểm thử

| Trường | Giá trị |
|---|---|
| Endpoint / hành động | `GET /api/orders/{{lastOrderId}}` |
| Token | Không có Authorization header |

## Các bước kiểm thử
1. Chuẩn bị xác thực và trạng thái order/cart cần thiết.
2. Gửi API request theo dữ liệu kiểm thử đã mô tả.
3. Ghi nhận HTTP status và response body.
4. Kiểm tra response, quy tắc bảo mật hoặc oracle chuyển trạng thái.

## Kết quả mong đợi
Quan sát được 200 OK (IDOR bug); đúng ra phải là 401 Unauthorized.

Oracle: AI giả định GET /api/orders/:id yêu cầu xác thực, nhưng SUT không enforce. Đây là BUG-FR08-001.

## Trạng thái / Bug liên quan
Đã thiết kế / Có bao phủ bug đã biết / [BUG-FR08-001](../../../bug-reports/BUG-FR08-001.md)
