# TC-CHECKOUT-003: Thêm sản phẩm để giỏ hàng đủ điều kiện thanh toán

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng đang trống (S1).
- Có ít nhất một sản phẩm đang được bán trong hệ thống.

## Test Data
| Field | Value |
|-------|-------|
| Sản phẩm | Một sản phẩm đang được bán |
| Số lượng | 1 |

## Test Steps
1. Mở chi tiết một sản phẩm đang được bán.
2. Chọn số lượng 1 và thêm sản phẩm vào giỏ.
3. Mở trang Checkout.

## Expected Result
Hệ thống chuyển từ S1 sang S2. Checkout hiển thị đúng sản phẩm, số lượng và tổng tiền được tự động tính từ giỏ hàng.

## Status / Related Bugs
Not Run / None
