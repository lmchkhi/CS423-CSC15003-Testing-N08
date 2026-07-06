# TC-CHECKOUT-UCT-003: Hiển thị đầy đủ danh sách sản phẩm trên màn hình checkout

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional UI / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản hợp lệ.
- Giỏ hàng có nhiều hơn một sản phẩm.
- Người dùng đang ở trang Giỏ hàng.

## Test data

| Sản phẩm | Đơn giá | Số lượng | Thành tiền |
| --- | ---: | ---: | ---: |
| Áo thun basic | 100000 | 2 | 200000 |
| Quần jeans | 250000 | 1 | 250000 |
| Tổng tiền đúng |  |  | 450000 |

## Test steps
1. Mở trang Giỏ hàng với dữ liệu test đã chuẩn bị.
2. Bấm nút `Tiến hành thanh toán`.
3. Quan sát danh sách sản phẩm trên màn hình checkout.
4. Đối chiếu từng dòng sản phẩm với dữ liệu trong giỏ hàng.

## Expected result
- Màn hình checkout hiển thị đủ cả hai sản phẩm trong giỏ hàng.
- Mỗi sản phẩm hiển thị đúng tên, số lượng và thành tiền.
- Không bị thiếu dòng hàng, không hiển thị trùng sản phẩm ngoài dữ liệu giỏ hàng.
- Tổng tiền thanh toán hiển thị là `450000 ₫`.

## Status / Related bugs
Not Run / None
