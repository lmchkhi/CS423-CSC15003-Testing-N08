# TC-COUPON-012: Từ chối mã sai chữ hoa thường

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 400.000 ₫; tài khoản chưa từng dùng mã `SAVE10`.
- CSDL có mã `SAVE10` đang hoạt động và còn hạn nhưng không có mã `save10`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-8 |
| Mã đúng trong CSDL | `SAVE10` |
| Mã nhập | `save10` |
| Tổng đơn hàng | 400.000 ₫ |

## Test Steps
1. Mở trang Checkout.
2. Nhập mã `save10` bằng chữ thường.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và lượt sử dụng `SAVE10`.

## Expected Result
Exception Flow EF-8 xảy ra vì mã có phân biệt chữ hoa/thường. Hệ thống từ chối áp dụng `save10` và hiển thị **"Mã giảm giá không tồn tại"**. Tổng tiền vẫn là 400.000 ₫, không phát sinh số tiền giảm và lượt sử dụng `SAVE10` vẫn là 0.

## Status / Related Bugs
Fail / [BUG-COUPON-004](../../bug-reports/coupon/BUG-COUPON-004.md)
