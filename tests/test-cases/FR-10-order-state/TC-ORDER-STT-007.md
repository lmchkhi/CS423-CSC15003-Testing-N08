# TC-ORDER-STT-007: User hủy đơn ở trạng thái `confirmed`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- User đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng của chính user đó ở trạng thái `confirmed`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token user | `<user_token>` |
| Order ID | `<own_confirmed_order_id>` |

## Test steps
1. Gửi request `PUT /api/orders/:id/cancel` với token user.
2. Dùng `Order ID` của đơn hàng đang ở trạng thái `confirmed`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau thao tác.

## Expected result
- Request hủy đơn thành công.
- Trạng thái đơn hàng đổi từ `confirmed` sang `canceled`.
- Hệ thống vẫn bảo đảm user chỉ hủy được đơn hàng của chính mình.

## Status / Related bugs
Not Run / None

