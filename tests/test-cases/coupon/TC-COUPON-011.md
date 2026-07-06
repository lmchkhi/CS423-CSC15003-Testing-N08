# TC-COUPON-011: Từ chối mã khi đã dùng hết lượt

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 400.000 ₫.
- Mã `SAVE10` đang hoạt động, còn hạn đến `2099-12-31`; tài khoản đã dùng mã đúng 1 lần.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-7 |
| Mã giảm giá | `SAVE10` |
| Tổng đơn hàng | 400.000 ₫ |
| Lượt dùng trước / Giới hạn | 1 / 1 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `SAVE10`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và lượt sử dụng `SAVE10`.

## Expected Result
Exception Flow EF-7 xảy ra vì `used_count >= max_uses_per_user`. Hệ thống từ chối áp dụng mã và hiển thị **"Bạn đã sử dụng hết lượt cho mã giảm giá này"**. Tổng tiền vẫn là 400.000 ₫, không phát sinh số tiền giảm và lượt sử dụng `SAVE10` vẫn là 1.

## Status / Related Bugs
Fail / [BUG-COUPON-007](../../bug-reports/coupon/BUG-COUPON-007.md)
