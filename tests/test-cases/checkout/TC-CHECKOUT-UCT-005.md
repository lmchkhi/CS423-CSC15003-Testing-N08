# TC-CHECKOUT-UCT-005: Backend không chấp nhận tổng tiền do client tự sửa

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional API / Use Case Testing

## Preconditions
- Backend đang chạy.
- Người dùng đã đăng nhập và có token hợp lệ.
- Giỏ hàng hoặc dữ liệu đặt mua hợp lệ có tổng tiền thực tế là `450000`.

## Test data

| Dữ liệu | Giá trị |
| --- | --- |
| Method | POST |
| Endpoint | `/api/checkout` |
| Authorization header | `Bearer <valid_token>` |
| Tổng tiền thực tế | `450000` |
| `total_amount` bị client sửa | `1000` |
| Items | Áo thun basic x 2, Quần jeans x 1 |

## Test steps
1. Đăng nhập bằng tài khoản hợp lệ để lấy JWT token.
2. Chuẩn bị giỏ hàng hoặc danh sách sản phẩm có tổng tiền thực tế là `450000`.
3. Gửi request `POST /api/checkout` với token hợp lệ.
4. Trong body request, cố tình gửi `total_amount` là `1000`.
5. Kiểm tra response của API.
6. Kiểm tra đơn hàng mới được tạo trong lịch sử đơn hàng hoặc trong CSDL.

## Expected result
- Backend không lưu đơn hàng với tổng tiền `1000`.
- Backend tự tính lại tổng tiền từ dữ liệu tin cậy phía server và lưu tổng tiền đúng là `450000`, hoặc từ chối request nếu không đủ dữ liệu để tự tính lại.
- Response không được thể hiện rằng giá trị `total_amount` do client gửi lên đã được chấp nhận làm tổng tiền cuối cùng.
- Không phát sinh đơn hàng có tổng tiền sai lệch so với giỏ hàng thực tế.

## Status / Related bugs
Not Run / None
