# TC-COUPON-008: Từ chối mã khi đơn hàng dưới ngưỡng tối thiểu

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 299.999 ₫; tài khoản chưa từng dùng mã `SAVE10`.
- Mã `SAVE10` đang hoạt động và còn hạn đến `2099-12-31`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-4 |
| Mã giảm giá | `SAVE10` |
| Tổng đơn hàng | 299.999 ₫ |
| Ngưỡng tối thiểu | 300.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout và xác nhận tổng đơn hàng là 299.999 ₫.
2. Nhập chính xác mã `SAVE10`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và lượt sử dụng `SAVE10`.

## Expected Result
Exception Flow EF-4 xảy ra vì `299.999 < 300.000`. Hệ thống từ chối áp dụng mã và hiển thị **"Đơn hàng chưa đạt giá trị tối thiểu để sử dụng mã"**. Tổng tiền vẫn là 299.999 ₫, không phát sinh số tiền giảm và lượt sử dụng `SAVE10` vẫn là 0.

## Status / Related Bugs
Fail / [BUG-COUPON-005](../../bug-reports/coupon/BUG-COUPON-005.md)
