# TC-CHECKOUT-007: Báo lỗi khi thanh toán thất bại

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng có ít nhất một sản phẩm và đang ở S2.
- Môi trường kiểm thử được cấu hình để lần thanh toán này trả về thất bại.

## Test Data
| Field | Value |
|-------|-------|
| Kết quả thanh toán mô phỏng | Thất bại |
| Số lượng sản phẩm trước thanh toán | 1 |

## Test Steps
1. Mở trang Checkout.
2. Gửi yêu cầu thanh toán hợp lệ.
3. Quan sát thông báo và kiểm tra lại giỏ hàng sau khi hệ thống trả về thất bại.

## Expected Result
Hệ thống hiển thị thông báo lỗi, giữ trạng thái S2 và không xóa giỏ hàng. Sản phẩm vẫn tồn tại để người dùng có thể thử thanh toán lại.

## Status / Related Bugs
Not Run / None
