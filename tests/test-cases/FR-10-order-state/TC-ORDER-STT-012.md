# TC-ORDER-STT-012: Admin không được hủy đơn ở trạng thái `shipping`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng ở trạng thái `shipping`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<shipping_order_id>` |
| New status | `canceled` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "canceled"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối vì FR-10 không định nghĩa chuyển đổi `shipping -> canceled`.
- Trạng thái đơn hàng vẫn là `shipping`.
- Thông báo lỗi nêu rõ chuyển đổi trạng thái không hợp lệ.

## Status / Related bugs
Not Run / None

