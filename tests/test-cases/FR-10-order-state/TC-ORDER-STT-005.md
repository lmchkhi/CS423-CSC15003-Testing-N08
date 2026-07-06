# TC-ORDER-STT-005: Admin chuyển đơn từ `confirmed` sang `shipping`

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
| New status | `shipping` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "shipping"}`.
3. Gọi `GET /api/orders/:id` để xác nhận trạng thái mới.

## Expected result
- Request cập nhật trạng thái thành công.
- Trạng thái đơn hàng đổi từ `confirmed` sang `shipping`.
- Sau khi sang `shipping`, user không còn được tự hủy đơn.

## Status / Related bugs
Not Run / None

