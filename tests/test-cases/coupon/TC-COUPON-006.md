# TC-COUPON-006: Từ chối mã giảm giá không hoạt động

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 600.000 ₫; tài khoản chưa từng dùng mã `BIGBUY`.
- Trong dữ liệu kiểm thử, mã mẫu `BIGBUY` còn hạn nhưng tạm được đặt `is_active = 0`; phải hoàn tác về trạng thái ban đầu sau khi kiểm thử.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-2 |
| Mã giảm giá | `BIGBUY` |
| Trạng thái | `is_active = 0` |
| Tổng đơn hàng | 600.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `BIGBUY`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và lượt sử dụng `BIGBUY`.

## Expected Result
Exception Flow EF-2 xảy ra. Hệ thống từ chối áp dụng mã và hiển thị **"Mã giảm giá hiện không hoạt động"**. Tổng tiền vẫn là 600.000 ₫, không phát sinh số tiền giảm và lượt sử dụng `BIGBUY` vẫn là 0.

## Status / Related Bugs
Fail / [BUG-COUPON-004](../../bug-reports/coupon/BUG-COUPON-004.md)
