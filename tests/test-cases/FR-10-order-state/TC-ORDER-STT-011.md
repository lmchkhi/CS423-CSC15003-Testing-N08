# TC-ORDER-STT-011: Admin không được chuyển tắt từ `confirmed` sang `delivered`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng ở trạng thái `confirmed`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<confirmed_order_id>` |
| New status | `delivered` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "delivered"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối vì state machine không cho phép `confirmed -> delivered`.
- Trạng thái đơn hàng vẫn là `confirmed`.
- Hệ thống yêu cầu đơn phải qua trạng thái `shipping` trước khi `delivered`.

## Status / Related bugs
Not Run / None

