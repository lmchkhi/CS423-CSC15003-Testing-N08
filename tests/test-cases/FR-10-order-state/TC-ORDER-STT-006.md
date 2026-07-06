# TC-ORDER-STT-006: Admin hủy đơn ở trạng thái `confirmed`

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
| New status | `canceled` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "canceled"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau thao tác.

## Expected result
- Request hủy đơn thành công.
- Trạng thái đơn hàng đổi từ `confirmed` sang `canceled`.
- Đơn hàng đã hủy trở thành trạng thái kết thúc.

## Status / Related bugs
Not Run / None

