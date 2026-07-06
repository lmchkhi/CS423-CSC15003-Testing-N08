# TC-CHECKOUT-012: Hoàn tất chuỗi trạng thái từ chưa đăng nhập đến thanh toán thành công

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Tài khoản `test@eshop.com` tồn tại, đang đăng xuất và giỏ hàng trống (S0).
- Có ít nhất một sản phẩm hợp lệ đang được bán.

## Test Data
| Field | Value |
|-------|-------|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Số lượng sản phẩm thêm vào | 1 |

## Test Steps
1. Đăng nhập bằng tài khoản hợp lệ để chuyển từ S0 sang S1.
2. Thêm một sản phẩm vào giỏ và mở Checkout để chuyển từ S1 sang S2.
3. Xác nhận danh sách sản phẩm, tổng tiền tự động tính và gửi yêu cầu thanh toán hợp lệ.
4. Sau khi thanh toán thành công, mở lại giỏ hàng.

## Expected Result
Chuỗi chuyển đổi `S0 → S1 → S2 → S3` hoàn tất đúng thứ tự. Checkout hiển thị đúng sản phẩm và tổng tiền; sau thành công, hệ thống thông báo kết quả và giỏ hàng trống.

## Status / Related Bugs
Not Run / None
