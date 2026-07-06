# TC-CHECKOUT-001: Đăng nhập thành công với giỏ hàng trống

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Tài khoản `test@eshop.com` tồn tại và đang đăng xuất.
- Giỏ hàng của tài khoản không có sản phẩm (S0).

## Test Data
| Field | Value |
|-------|-------|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Trạng thái giỏ hàng | Trống |

## Test Steps
1. Mở trang Đăng nhập.
2. Nhập Email và Mật khẩu hợp lệ.
3. Bấm nút đăng nhập.

## Expected Result
Đăng nhập thành công. Hệ thống chuyển từ S0 sang S1: người dùng đã đăng nhập nhưng giỏ hàng vẫn trống và chưa đủ điều kiện thanh toán.

## Status / Related Bugs
Not Run / None
