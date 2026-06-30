# TC-FR11-DT-004: Hiển thị nhiều đơn hàng của cùng user (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Assumptions
- Cần chuẩn bị user `test@eshop.com` có ít nhất 3 đơn hàng trước khi chạy test.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User đăng nhập hợp lệ |
| Order count | Count | Valid domain: nhiều đơn hàng |
| Order ownership | State | Tất cả đơn hiển thị phải thuộc user hiện tại |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 3 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Expected order count | >= 3 |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Đếm số đơn hàng hiển thị.
4. Đối chiếu với response `GET /api/orders/my-orders` nếu cần.

## Expected result
Web hiển thị nhiều đơn hàng của `test@eshop.com` trong cùng danh sách và không làm mất, gộp sai hoặc hiển thị lẫn đơn của user khác.

## Status / Related bugs
Passed / None
