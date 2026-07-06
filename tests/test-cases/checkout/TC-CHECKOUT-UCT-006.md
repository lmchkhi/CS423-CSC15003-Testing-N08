# TC-CHECKOUT-UCT-006: Xóa giỏ hàng sau khi thanh toán thành công

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản hợp lệ.
- Giỏ hàng có ít nhất một sản phẩm.
- Backend có thể tạo đơn hàng thành công.
- Người dùng đang ở màn hình checkout.

## Test data

| Dữ liệu | Giá trị |
| --- | --- |
| Tài khoản | `customer01@example.com` |
| Sản phẩm | Áo thun basic |
| Đơn giá | 100000 |
| Số lượng | 1 |
| Tổng tiền đúng | 100000 |

## Test steps
1. Mở màn hình checkout với giỏ hàng có sản phẩm.
2. Bấm nút `Xác Nhận Thanh Toán`.
3. Chờ hệ thống xử lý và hiển thị thông báo thanh toán thành công.
4. Quay lại trang Giỏ hàng.
5. Kiểm tra nội dung giỏ hàng sau khi thanh toán.

## Expected result
- Hệ thống hiển thị thông báo thanh toán thành công.
- Đơn hàng mới được tạo với thông tin đúng.
- Giỏ hàng của người dùng được xóa sau khi thanh toán thành công.
- Khi quay lại trang Giỏ hàng, hệ thống hiển thị trạng thái giỏ hàng trống.
- Sản phẩm vừa thanh toán không còn nằm trong giỏ hàng.

## Status / Related bugs
Not Run / None
