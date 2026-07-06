# TC-CHECKOUT-010: Không cho phép chỉnh sửa trực tiếp tổng tiền

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng có sản phẩm và đang ở S2.
- Tổng tiền tự động hiển thị là 500.000 ₫.

## Test Data
| Field | Value |
|-------|-------|
| Tổng tiền hiển thị | 500.000 ₫ |
| Giá trị thử nhập | 1 ₫ |

## Test Steps
1. Mở trang Checkout.
2. Dùng chuột và bàn phím thử focus, xóa hoặc nhập `1` vào phần tổng tiền.
3. Kiểm tra lại tổng tiền và trạng thái Checkout.

## Expected Result
Tổng tiền không phải trường có thể chỉnh sửa và vẫn hiển thị 500.000 ₫. Không có dữ liệu giỏ hàng nào thay đổi; hệ thống giữ nguyên S2.

## Status / Related Bugs
Not Run / None
