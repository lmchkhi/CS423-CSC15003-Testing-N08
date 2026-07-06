# TC-CHECKOUT-UCT-001: Chặn thanh toán khi người dùng chưa đăng nhập

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional / Use Case Testing

## Preconditions
- Người dùng chưa đăng nhập hoặc đã đăng xuất khỏi hệ thống.
- Giỏ hàng có ít nhất một sản phẩm.
- Người dùng đang ở trang Giỏ hàng.

## Test data

| Dữ liệu | Giá trị |
| --- | --- |
| Sản phẩm | Áo thun basic |
| Đơn giá | 100000 |
| Số lượng | 1 |
| Trạng thái đăng nhập | Chưa đăng nhập |

## Test steps
1. Mở trang Giỏ hàng.
2. Kiểm tra giỏ hàng đang có sản phẩm.
3. Bấm nút `Tiến hành thanh toán`.

## Expected result
- Hệ thống không cho người dùng vào luồng thanh toán.
- Hệ thống hiển thị thông báo yêu cầu đăng nhập trước khi thanh toán.
- Người dùng được điều hướng đến trang Đăng nhập.
- Không có đơn hàng mới nào được tạo.
- Giỏ hàng vẫn giữ nguyên sản phẩm ban đầu.

## Status / Related bugs
Not Run / None
