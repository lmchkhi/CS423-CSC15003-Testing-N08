# TC-ORDER-STT-008: Admin hoàn tất đơn từ `shipping` sang `delivered`

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
| New status | `delivered` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "delivered"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái cuối cùng.

## Expected result
- Request cập nhật trạng thái thành công.
- Trạng thái đơn hàng đổi từ `shipping` sang `delivered`.
- Đơn hàng đã giao xong trở thành trạng thái kết thúc.

## Status / Related bugs
Not Run / None

