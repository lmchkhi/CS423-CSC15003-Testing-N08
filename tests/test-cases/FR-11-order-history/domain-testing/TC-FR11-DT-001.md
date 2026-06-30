# TC-FR11-DT-001: Xem lịch sử đơn hàng khi user đã đăng nhập và có đơn hàng (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User phải đăng nhập bằng token hợp lệ |
| Order ownership | State | Chỉ hiển thị đơn hàng thuộc user đang đăng nhập |
| Order count | Count | Danh sách có ít nhất 1 đơn hàng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` / `Test1234!` đăng nhập thành công.
- User `test@eshop.com` có ít nhất 1 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| API | `GET /api/orders/my-orders` |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Quan sát danh sách đơn hàng đang hiển thị.
4. Gọi API `GET /api/orders/my-orders` với Bearer token của user để đối chiếu nếu cần.

## Expected result
Trang Lịch sử đơn hàng hiển thị danh sách các đơn của `test@eshop.com`; API trả về danh sách đơn hàng cá nhân của user đang đăng nhập.

## Status / Related bugs
Passed / None
