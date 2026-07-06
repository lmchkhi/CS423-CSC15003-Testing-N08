# TC-ORDER-STT-014: Không được đổi trạng thái khi đơn đã `canceled`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng ở trạng thái `canceled`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<canceled_order_id>` |
| New status | `delivered` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "delivered"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối vì `canceled` là trạng thái kết thúc.
- Trạng thái đơn hàng vẫn là `canceled`.
- Hệ thống không cho phép khôi phục hoặc hoàn tất một đơn hàng đã hủy.

## Status / Related bugs
Not Run / None

