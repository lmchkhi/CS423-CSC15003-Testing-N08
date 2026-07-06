# TC-CHECKOUT-005: Bỏ qua total_amount giả mạo từ client

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng ở S2 với tổng tiền thực tế 500.000 ₫.
- Có thể chỉnh payload Checkout bằng công cụ kiểm thử API hoặc Developer Tools.

## Test Data
| Field | Value |
|-------|-------|
| Tổng tiền thực tế | 500.000 ₫ |
| `total_amount` giả mạo | 1 ₫ |

## Test Steps
1. Tạo yêu cầu Checkout từ giỏ hàng hiện tại.
2. Thêm hoặc thay `total_amount` trong payload thành `1`.
3. Gửi yêu cầu và quan sát số tiền backend sử dụng.

## Expected Result
Backend bỏ qua `total_amount = 1` từ client và tự tính lại tổng tiền là 500.000 ₫. Trong quá trình E7, trạng thái vẫn là S2; hệ thống không tạo giao dịch với tổng tiền giả mạo.

## Status / Related Bugs
Not Run / None
