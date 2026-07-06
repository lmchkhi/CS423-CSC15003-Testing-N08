# TC-CHECKOUT-008: Từ chối Checkout khi chưa đăng nhập

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng chưa đăng nhập và không có JWT Token hợp lệ (S0).
- Giỏ hàng có ít nhất một sản phẩm để cô lập điều kiện xác thực.

## Test Data
| Field | Value |
|-------|-------|
| JWT Token | Không có |
| Số lượng sản phẩm trong giỏ | 1 |

## Test Steps
1. Khi đang đăng xuất, mở trực tiếp trang Checkout.
2. Thử gửi yêu cầu thanh toán không kèm JWT Token.
3. Kiểm tra giao dịch và giỏ hàng.

## Expected Result
Hệ thống từ chối Checkout, không tạo giao dịch và không thay đổi giỏ hàng. Người dùng vẫn ở S0 và nhận thông báo phù hợp về yêu cầu đăng nhập.

## Status / Related Bugs
Not Run / None
