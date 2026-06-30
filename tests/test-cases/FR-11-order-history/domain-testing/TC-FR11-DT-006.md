# TC-FR11-DT-006: Xem chi tiết đơn hàng của chính user (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User đăng nhập hợp lệ |
| Order id | Identifier | Valid: order id thuộc user đang đăng nhập |
| API authorization | Header | `GET /api/orders/:id` dùng token của owner |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 1 đơn hàng.
- Biết id của một đơn thuộc `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Own order id | `<own_order_id>` |
| API | `GET /api/orders/<own_order_id>` |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Chọn đơn `<own_order_id>` hoặc gọi API `GET /api/orders/<own_order_id>` bằng token của user.

## Expected result
Hệ thống cho phép xem chi tiết đơn hàng thuộc `test@eshop.com` và dữ liệu chi tiết tương ứng với đơn đã chọn.

## Status / Related bugs
Passed / None
