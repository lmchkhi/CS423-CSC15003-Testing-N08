# TC-CHECKOUT-UCT-004: Tổng tiền checkout được tính tự động và không cho sửa trực tiếp

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional UI / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản hợp lệ.
- Giỏ hàng có các sản phẩm hợp lệ.
- Người dùng đang ở màn hình checkout.

## Test data

| Sản phẩm | Đơn giá | Số lượng | Thành tiền |
| --- | ---: | ---: | ---: |
| Áo thun basic | 100000 | 2 | 200000 |
| Quần jeans | 250000 | 1 | 250000 |
| Tổng tiền đúng |  |  | 450000 |

## Test steps
1. Mở màn hình checkout với dữ liệu test đã chuẩn bị.
2. Kiểm tra khu vực hiển thị tổng tiền thanh toán.
3. Thử đặt con trỏ vào trường/khu vực tổng tiền.
4. Thử nhập một giá trị khác, ví dụ `1000`, nếu giao diện cho phép thao tác.
5. Quan sát tổng tiền trước khi bấm xác nhận thanh toán.

## Expected result
- Tổng tiền được hệ thống tự tính là `450000 ₫`.
- Người dùng không thể chỉnh sửa trực tiếp tổng tiền thanh toán.
- Nếu tổng tiền được hiển thị bằng input hoặc control tương tự, control đó phải ở trạng thái chỉ đọc/không cho nhập.
- Tổng tiền chỉ được thay đổi khi dữ liệu giỏ hàng thay đổi hợp lệ, không thay đổi do người dùng nhập tay tại màn hình checkout.

## Status / Related bugs
Not Run / None
