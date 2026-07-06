# TC-COUPON-009: Từ chối áp dụng mã khi chưa đăng nhập

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Có một phiên Checkout kiểm thử với tổng đơn hàng 400.000 ₫.
- Yêu cầu áp dụng mã không chứa JWT Token.
- Mã `SAVE10` đang hoạt động, còn hạn đến `2099-12-31` và chưa được tài khoản thử nghiệm sử dụng.

## Test Data
| Field | Value |
|-------|-------|
| Flow | EF-5 |
| Mã giảm giá | `SAVE10` |
| JWT Token | Không có |
| Tổng đơn hàng | 400.000 ₫ |

## Test Steps
1. Xóa JWT Token khỏi phiên người dùng hoặc chuẩn bị yêu cầu không có header xác thực.
2. Gửi yêu cầu áp dụng mã `SAVE10` cho Checkout có tổng tiền 400.000 ₫.
3. Quan sát phản hồi, tổng tiền và dữ liệu lượt sử dụng.

## Expected Result
Exception Flow EF-5 xảy ra. Hệ thống từ chối áp dụng mã và hiển thị **"Vui lòng đăng nhập để sử dụng mã giảm giá"**. Tổng tiền vẫn là 400.000 ₫, không phát sinh số tiền giảm và không tăng lượt sử dụng `SAVE10`.

## Status / Related Bugs
Fail / [BUG-COUPON-006](../../bug-reports/coupon/BUG-COUPON-006.md)
