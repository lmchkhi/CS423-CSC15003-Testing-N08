# TC-COUPON-003: Áp dụng mã khi tổng đơn hàng bằng ngưỡng tối thiểu

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng đúng 300.000 ₫; tài khoản chưa từng dùng mã `SAVE10`.
- Mã `SAVE10` đang hoạt động và còn hạn đến `2099-12-31`.

## Test Data
| Field | Value |
|-------|-------|
| Flow | AF-2 |
| Mã giảm giá | `SAVE10` |
| Tổng đơn hàng | 300.000 ₫ |
| Ngưỡng tối thiểu | 300.000 ₫ |
| Lượt dùng trước / Giới hạn | 0 / 1 |

## Test Steps
1. Mở trang Checkout và xác nhận tổng đơn hàng là 300.000 ₫.
2. Nhập chính xác mã `SAVE10`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát số tiền giảm, tổng tiền cuối cùng và lượt sử dụng mã của tài khoản.

## Expected Result
Alternative Flow AF-2 hoàn tất thành công vì `total = min_order_amount` thỏa điều kiện `total >= min_order_amount`. Hệ thống giảm 30.000 ₫, hiển thị `final_amount = 270.000 ₫`, thông báo áp dụng mã thành công và tăng lượt sử dụng `SAVE10` từ 0 lên 1.

## Status / Related Bugs
Fail / [BUG-COUPON-003](../../bug-reports/coupon/BUG-COUPON-003.md)
