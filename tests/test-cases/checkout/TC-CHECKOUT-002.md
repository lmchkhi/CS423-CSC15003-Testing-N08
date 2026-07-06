# TC-CHECKOUT-002: Đăng nhập thành công với giỏ hàng có sản phẩm

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Tài khoản `test@eshop.com` tồn tại và đang đăng xuất.
- Giỏ hàng gắn với tài khoản đã có ít nhất một sản phẩm hợp lệ (S0).

## Test Data
| Field | Value |
|-------|-------|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Số lượng sản phẩm trong giỏ | 1 |

## Test Steps
1. Mở trang Đăng nhập.
2. Nhập thông tin tài khoản hợp lệ.
3. Bấm đăng nhập và mở trang Checkout.

## Expected Result
Hệ thống chuyển từ S0 sang S2. Trang Checkout được phép mở, hiển thị đầy đủ sản phẩm trong giỏ và tổng tiền do hệ thống tự động tính.

## Status / Related Bugs
Not Run / None
