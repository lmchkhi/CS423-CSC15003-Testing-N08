# TC-ORDER-STT-010: Admin không được chuyển tắt từ `pending` sang `shipping`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng ở trạng thái `pending`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<pending_order_id>` |
| New status | `shipping` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "shipping"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối vì state machine không cho phép `pending -> shipping`.
- Trạng thái đơn hàng vẫn là `pending`.
- Thông báo lỗi thể hiện đây là chuyển đổi trạng thái không hợp lệ.

## Status / Related bugs
Not Run / None

