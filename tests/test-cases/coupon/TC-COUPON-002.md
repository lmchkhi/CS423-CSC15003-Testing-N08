# TC-COUPON-002: Áp dụng mã giảm giá loại fixed

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 600.000 ₫; tài khoản chưa từng dùng mã `BIGBUY`.
- Mã `BIGBUY` đang hoạt động và còn hạn đến `2099-12-31`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | AF-1 |
| Mã giảm giá | `BIGBUY` |
| Loại / Giá trị | `fixed` / 50.000 ₫ |
| Tổng đơn hàng | 600.000 ₫ |
| Ngưỡng tối thiểu | 500.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `BIGBUY`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát số tiền giảm, tổng tiền cuối cùng và lượt sử dụng mã của tài khoản.

## Expected Result
Alternative Flow AF-1 hoàn tất thành công. Hệ thống hiển thị thông báo áp dụng mã thành công; tính `discount_amount = 50.000 ₫` và `final_amount = 600.000 - 50.000 = 550.000 ₫`. Lượt sử dụng `BIGBUY` của tài khoản tăng từ 0 lên 1.

## Status / Related Bugs
Fail / [BUG-COUPON-002](../../bug-reports/coupon/BUG-COUPON-002.md)
