# TC-CHECKOUT-004: Backend tự tính tổng tiền khi nhận yêu cầu thanh toán

## Requirement ID
FR-08

## Module / Test Type / Technique
Checkout / Functional / State Transition Testing

## Preconditions
- Người dùng đã đăng nhập bằng tài khoản `test@eshop.com`.
- Giỏ hàng ở S2 và chứa hai dòng sản phẩm với dữ liệu kiểm thử xác định.
- Có thể quan sát request và response Checkout bằng công cụ kiểm thử API hoặc Developer Tools.

## Test Data
| Field | Value |
|-------|-------|
| Sản phẩm A | 1 × 300.000 ₫ |
| Sản phẩm B | 2 × 100.000 ₫ |
| Tổng tiền đúng | 500.000 ₫ |

## Test Steps
1. Mở trang Checkout và kiểm tra danh sách sản phẩm.
2. Gửi yêu cầu thanh toán bình thường.
3. Quan sát tổng tiền được backend sử dụng để xử lý yêu cầu.

## Expected Result
Trong quá trình E6, backend tự tính tổng tiền là 500.000 ₫ từ dữ liệu giỏ hàng; không tin cậy phép tính từ client. Hệ thống giữ trạng thái S2 trong khi xử lý và chỉ chuyển sang S3 nếu nhận kết quả thanh toán thành công.

## Status / Related Bugs
Not Run / None
