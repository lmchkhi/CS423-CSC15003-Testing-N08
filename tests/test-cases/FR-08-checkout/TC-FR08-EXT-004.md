# TC-FR08-EXT-004: Nghiệp vụ - Thanh toán khi giỏ hàng rỗng

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
| TC-FR08-EXT-004 | POST /api/checkout với total_amount hợp lệ, shipping_address hợp lệ và user token. | Giỏ hàng của user đang rỗng. | Quan sát được 200 OK (đơn hàng được tạo dù giỏ hàng rỗng); đúng ra phải là 400 Bad Request. | AI bỏ sót kiểm tra trạng thái giỏ hàng; đây là lỗi nghiệp vụ cần ghi nhận. |

## Tiền điều kiện
- Backend API đang chạy tại `http://localhost:3000`.
- Request có header `X-Student-Id: 23127300`.
- Token user/admin được chuẩn bị bằng Postman auth bootstrap khi test case cần xác thực.

## Dữ liệu kiểm thử

| Trường | Giá trị |
|---|---|
| Endpoint | `POST /api/checkout` |
| Cart state | Giỏ hàng rỗng |

## Các bước kiểm thử
1. Chuẩn bị xác thực và trạng thái order/cart cần thiết.
2. Gửi API request theo dữ liệu kiểm thử đã mô tả.
3. Ghi nhận HTTP status và response body.
4. Kiểm tra response, quy tắc bảo mật hoặc oracle chuyển trạng thái.

## Kết quả mong đợi
Quan sát được 200 OK (đơn hàng được tạo dù giỏ hàng rỗng); đúng ra phải là 400 Bad Request.

Oracle: AI bỏ sót kiểm tra trạng thái giỏ hàng; đây là lỗi nghiệp vụ cần ghi nhận.

## Trạng thái / Bug liên quan
Đã thiết kế / Không có
