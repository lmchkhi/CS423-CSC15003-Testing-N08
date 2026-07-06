# TC-ORDER-STT-004: User hủy đơn ở trạng thái `pending`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- User đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng của chính user đó ở trạng thái `pending`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token user | `<user_token>` |
| Order ID | `<own_pending_order_id>` |

## Test steps
1. Gửi request `PUT /api/orders/:id/cancel` với token user.
2. Dùng `Order ID` thuộc chính user đang đăng nhập.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau khi hủy.

## Expected result
- Request hủy đơn thành công.
- Trạng thái đơn hàng đổi từ `pending` sang `canceled`.
- Hệ thống chỉ cho phép user hủy đơn của chính mình.

## Status / Related bugs
Not Run / None

