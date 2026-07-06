# TC-ORDER-STT-013: Không được đổi trạng thái khi đơn đã `delivered`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng ở trạng thái `delivered`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<delivered_order_id>` |
| New status | `canceled` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "canceled"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối vì `delivered` là trạng thái kết thúc.
- Trạng thái đơn hàng vẫn là `delivered`.
- Hệ thống không cho phép chuyển đơn đã giao sang bất kỳ trạng thái khác.

## Status / Related bugs
Not Run / None

