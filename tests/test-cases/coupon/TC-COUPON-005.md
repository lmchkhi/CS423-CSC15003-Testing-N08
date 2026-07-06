# TC-COUPON-005: Từ chối mã giảm giá không tồn tại

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 500.000 ₫.
- CSDL chỉ có bốn mã mẫu `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`; không có mã `NOTFOUND`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-1 |
| Mã giảm giá | `NOTFOUND` |
| Tổng đơn hàng | 500.000 ₫ |

## Test Steps
1. Mở trang Checkout.
2. Nhập mã `NOTFOUND`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và dữ liệu lượt sử dụng.

## Expected Result
Exception Flow EF-1 xảy ra. Hệ thống từ chối áp dụng mã và hiển thị **"Mã giảm giá không tồn tại"**. Tổng tiền vẫn là 500.000 ₫, không phát sinh số tiền giảm và không tạo hoặc tăng lượt sử dụng mã.

## Status / Related Bugs
Fail / [BUG-COUPON-004](../../bug-reports/coupon/BUG-COUPON-004.md)
