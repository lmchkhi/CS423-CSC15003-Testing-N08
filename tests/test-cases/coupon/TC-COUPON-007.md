# TC-COUPON-007: Từ chối mã giảm giá đã hết hạn

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 200.000 ₫; tài khoản chưa từng dùng mã `EXPIRED`.
- Mã `EXPIRED` đang hoạt động nhưng đã hết hạn từ `2020-01-01`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-3 |
| Mã giảm giá | `EXPIRED` |
| Ngày hết hạn | `2020-01-01` |
| Tổng đơn hàng | 200.000 ₫ |
| Ngưỡng tối thiểu | 100.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `EXPIRED`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát thông báo, tổng tiền và lượt sử dụng `EXPIRED`.

## Expected Result
Exception Flow EF-3 xảy ra. Hệ thống từ chối áp dụng mã và hiển thị **"Mã giảm giá đã hết hạn"**. Tổng tiền vẫn là 200.000 ₫, không phát sinh số tiền giảm và lượt sử dụng `EXPIRED` vẫn là 0.

## Status / Related Bugs
Pass / None
