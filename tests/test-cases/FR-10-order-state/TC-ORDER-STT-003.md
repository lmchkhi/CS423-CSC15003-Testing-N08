# TC-ORDER-STT-003: Admin hủy đơn ở trạng thái `pending`

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
| New status | `canceled` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "canceled"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau thao tác.

## Expected result
- Request hủy đơn thành công.
- Trạng thái đơn hàng đổi từ `pending` sang `canceled`.
- Đơn hàng đi vào trạng thái kết thúc và không còn được chuyển tiếp.

## Status / Related bugs
Not Run / None

