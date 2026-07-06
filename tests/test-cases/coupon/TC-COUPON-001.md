# TC-COUPON-001: Áp dụng mã SAVE10 thành công

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 400.000 ₫; tài khoản chưa từng dùng mã `SAVE10`.
- Mã `SAVE10` đang hoạt động và còn hạn đến `2099-12-31`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | Main Flow |
| Mã giảm giá | `SAVE10` |
| Loại / Giá trị | `percent` / 10% |
| Tổng đơn hàng | 400.000 ₫ |
| Ngưỡng tối thiểu | 300.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `SAVE10`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát số tiền giảm, tổng tiền cuối cùng và lượt sử dụng mã của tài khoản.

## Expected Result
Main Flow hoàn tất thành công. Hệ thống hiển thị thông báo áp dụng mã thành công; tính `discount_amount = 400.000 × 10% = 40.000 ₫` và `final_amount = 400.000 - 40.000 = 360.000 ₫`. Lượt sử dụng `SAVE10` của tài khoản tăng từ 0 lên 1.

## Status / Related Bugs
Fail / [BUG-COUPON-001](../../bug-reports/coupon/BUG-COUPON-001.md), [BUG-COUPON-002](../../bug-reports/coupon/BUG-COUPON-002.md)
