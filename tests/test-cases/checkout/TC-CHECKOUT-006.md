# TC-CHECKOUT-006: Thanh toán thành công và xóa giỏ hàng

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng có ít nhất một sản phẩm và đang ở S2.
- Các dữ liệu bắt buộc để thanh toán đều hợp lệ.

## Test Data
| Field | Value |
|-------|-------|
| Số dòng sản phẩm | 1 |
| Số lượng | 1 |
| Kết quả thanh toán | Thành công |

## Test Steps
1. Mở trang Checkout và xác nhận danh sách sản phẩm cùng tổng tiền.
2. Gửi yêu cầu thanh toán hợp lệ.
3. Sau khi nhận thông báo thành công, mở lại giỏ hàng.

## Expected Result
Hệ thống chuyển từ S2 sang S3, thông báo thanh toán thành công và xóa toàn bộ sản phẩm khỏi giỏ. Giỏ hàng được hiển thị là trống.

## Status / Related Bugs
Not Run / None
