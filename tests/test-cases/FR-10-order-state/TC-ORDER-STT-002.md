# TC-ORDER-STT-002: Admin xác nhận đơn từ `pending` sang `confirmed`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- Admin đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng thuộc user bất kỳ ở trạng thái `pending`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token admin | `<admin_token>` |
| Order ID | `<pending_order_id>` |
| New status | `confirmed` |

## Test steps
1. Gửi request `PUT /api/admin/orders/:id/status` với token admin.
2. Truyền body `{"status": "confirmed"}`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái mới của đơn hàng.

## Expected result
- Request cập nhật trạng thái thành công.
- Trạng thái đơn hàng đổi từ `pending` sang `confirmed`.
- Hệ thống không tạo lỗi vì đây là chuyển đổi hợp lệ trong FR-10.

## Status / Related bugs
Not Run / None

