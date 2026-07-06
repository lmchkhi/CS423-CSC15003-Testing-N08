# TC-CHECKOUT-009: Từ chối thanh toán khi giỏ hàng trống

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng đang trống (S1).

## Test Data
| Field | Value |
|-------|-------|
| Số lượng sản phẩm trong giỏ | 0 |
| Tổng tiền | 0 ₫ |

## Test Steps
1. Mở trang Checkout khi giỏ hàng trống.
2. Thử thực hiện thanh toán.
3. Kiểm tra trạng thái giỏ hàng và giao dịch.

## Expected Result
Hệ thống không thực hiện thanh toán, không tạo giao dịch và hiển thị lỗi giỏ hàng trống. Trạng thái không hợp lệ bị chặn và hệ thống giữ nguyên S1.

## Status / Related Bugs
Not Run / None
