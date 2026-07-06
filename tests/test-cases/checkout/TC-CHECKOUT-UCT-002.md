# TC-CHECKOUT-UCT-002: Từ chối API checkout khi không có token hợp lệ

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional API / Use Case Testing

## Preconditions
- Backend đang chạy.
- Không gửi header `Authorization`, hoặc gửi token hết hạn/không hợp lệ.
- Có dữ liệu sản phẩm dùng để tạo request thanh toán.

## Test data

| Dữ liệu | Giá trị |
| --- | --- |
| Method | POST |
| Endpoint | `/api/checkout` |
| Authorization header | Không có hoặc `Bearer invalid-token` |
| Body mẫu | `{"items":[{"id":1,"name":"Áo thun basic","price":100000,"quantity":1}],"total_amount":100000}` |

## Test steps
1. Gửi request `POST /api/checkout` mà không kèm token hợp lệ.
2. Quan sát HTTP status code và nội dung response.
3. Kiểm tra danh sách đơn hàng của người dùng kiểm thử nếu có quyền truy cập dữ liệu.

## Expected result
- Backend từ chối request thanh toán.
- Response trả về mã lỗi xác thực, ví dụ `401 Unauthorized` hoặc `403 Forbidden`.
- Không có đơn hàng mới nào được tạo trong hệ thống.
- Không có thay đổi nào xảy ra với giỏ hàng.

## Status / Related bugs
Not Run / None
