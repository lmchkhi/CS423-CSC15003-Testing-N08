# TC-COUPON-004: Áp dụng VIP100 khi chưa hết lượt sử dụng

## Requirement ID
FR-09

## Module / Test Type / Technique
Coupon / Functional / Use Case Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản có JWT Token hợp lệ và đang ở bước Checkout.
- Tổng đơn hàng là 400.000 ₫.
- Mã `VIP100` đang hoạt động, còn hạn đến `2099-12-31` và tài khoản đã dùng mã đúng 1 lần.

## Test Data
| Field | Value |
|-------|-------|
| Flow | AF-3 |
| Mã giảm giá | `VIP100` |
| Loại / Giá trị | `fixed` / 100.000 ₫ |
| Tổng đơn hàng | 400.000 ₫ |
| Ngưỡng tối thiểu | 300.000 ₫ |
| Lượt dùng trước / Giới hạn | 1 / 2 |

## Test Steps
1. Mở trang Checkout.
2. Nhập chính xác mã `VIP100`.
3. Yêu cầu hệ thống áp dụng mã.
4. Quan sát số tiền giảm, tổng tiền cuối cùng và lượt sử dụng mã của tài khoản.

## Expected Result
Alternative Flow AF-3 hoàn tất thành công vì `1 < 2`. Hệ thống giảm 100.000 ₫, hiển thị `final_amount = 300.000 ₫`, thông báo áp dụng mã thành công và tăng lượt sử dụng `VIP100` từ 1 lên 2.

## Status / Related Bugs
Fail / [BUG-COUPON-002](../../bug-reports/coupon/BUG-COUPON-002.md)
