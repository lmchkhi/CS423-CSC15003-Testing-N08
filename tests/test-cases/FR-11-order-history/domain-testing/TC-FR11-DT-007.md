# TC-FR11-DT-007: Từ chối truy cập chi tiết đơn hàng của user khác (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Assumptions
- Dùng user `admin@eshop.com` password `Admin123!` có một đơn hàng riêng.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User đăng nhập hợp lệ |
| Order id | Identifier | Invalid: order id thuộc user khác |
| Ownership rule | Security rule | Người dùng chỉ xem được đơn hàng của chính mình |

## Preconditions
- Hệ thống EShop đang hoạt động.
- `test@eshop.com` đang đăng nhập.
- Biết id đơn hàng `<other_user_order_id>` thuộc `admin@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Logged-in user | `test@eshop.com` |
| Other user's order id | `<other_user_order_id>` |
| API | `GET /api/orders/<other_user_order_id>` |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Thử mở trực tiếp URL chi tiết đơn `<other_user_order_id>` nếu Web có route chi tiết.
3. Gọi API `GET /api/orders/<other_user_order_id>` với token của `test@eshop.com`.

## Expected result
Hệ thống từ chối truy cập đơn hàng của user khác và không trả thông tin chi tiết của `<other_user_order_id>`.

## Status / Related bugs
Failed / BUG-FR11-007
