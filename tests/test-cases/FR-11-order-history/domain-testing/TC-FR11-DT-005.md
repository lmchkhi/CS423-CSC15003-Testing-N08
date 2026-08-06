# TC-FR11-DT-005: Danh sách không hiển thị đơn hàng của user khác (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Assumptions
- Cần chuẩn bị thêm user `admin@eshop.com` password `Admin123!` có ít nhất 1 đơn hàng riêng.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User đăng nhập hợp lệ |
| Order ownership | State | Invalid domain: đơn hàng thuộc user khác |

## Preconditions
- Hệ thống EShop đang hoạt động.
- `test@eshop.com` và `admin@eshop.com` đều có đơn hàng riêng.
- Biết mã đơn hoặc id của ít nhất 1 đơn thuộc `admin@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Logged-in user | `test@eshop.com` |
| Other user's order | `<other_user_order_id>` |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Tìm mã đơn/id đơn `<other_user_order_id>` thuộc `admin@eshop.com` trong danh sách.
4. Gọi `GET /api/orders/my-orders` với token của `test@eshop.com` để đối chiếu nếu cần.

## Expected result
Danh sách lịch sử đơn hàng của `test@eshop.com` không chứa bất kỳ đơn hàng nào thuộc `admin@eshop.com`.

## Status / Related bugs
Passed / None
