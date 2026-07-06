# TC-CHECKOUT-011: Từ chối gửi lại Checkout sau khi giỏ hàng đã được xóa

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng vừa thanh toán thành công và đang ở S3.
- Giỏ hàng đã được hệ thống xóa và hiện không có sản phẩm.

## Test Data
| Field | Value |
|-------|-------|
| Trạng thái thanh toán trước | Thành công |
| Số lượng sản phẩm hiện tại | 0 |

## Test Steps
1. Gửi lại yêu cầu Checkout trước đó hoặc mở lại trang Checkout.
2. Thử thanh toán lần nữa mà không thêm sản phẩm mới.
3. Kiểm tra giao dịch và giỏ hàng.

## Expected Result
Hệ thống không tạo thêm giao dịch, hiển thị lỗi giỏ hàng trống và giữ nguyên S3 của phiên Checkout đã hoàn tất.

## Status / Related Bugs
Not Run / None
