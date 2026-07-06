# TC-COUPON-010: Từ chối áp dụng mã với JWT Token không hợp lệ

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Có một phiên Checkout kiểm thử với tổng đơn hàng 400.000 ₫.
- Mã `SAVE10` đang hoạt động, còn hạn đến `2099-12-31` và chưa được tài khoản thử nghiệm sử dụng.
- Có thể chỉnh JWT Token của yêu cầu bằng công cụ kiểm thử API hoặc Developer Tools.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-6 |
| Mã giảm giá | `SAVE10` |
| JWT Token | `invalid.jwt.token` |
| Tổng đơn hàng | 400.000 ₫ |

## Test Steps
1. Chuẩn bị yêu cầu áp dụng mã `SAVE10` cho Checkout có tổng tiền 400.000 ₫.
2. Đặt JWT Token của yêu cầu thành `invalid.jwt.token`.
3. Gửi yêu cầu và quan sát phản hồi, tổng tiền cùng dữ liệu lượt sử dụng.

## Expected Result
Exception Flow EF-6 xảy ra. Hệ thống từ chối áp dụng mã và hiển thị **"Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại"**. Tổng tiền vẫn là 400.000 ₫, không phát sinh số tiền giảm và không tăng lượt sử dụng `SAVE10`.

## Status / Related Bugs
Fail / [BUG-COUPON-006](../../bug-reports/coupon/BUG-COUPON-006.md)
