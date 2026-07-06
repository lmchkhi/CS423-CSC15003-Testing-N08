# TC-ORDER-STT-009: User không được hủy đơn ở trạng thái `shipping`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- User đã đăng nhập và có token hợp lệ.
- Tồn tại một đơn hàng của chính user đó ở trạng thái `shipping`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token user | `<user_token>` |
| Order ID | `<own_shipping_order_id>` |

## Test steps
1. Gửi request `PUT /api/orders/:id/cancel` với token user.
2. Dùng `Order ID` của đơn hàng đang ở trạng thái `shipping`.
3. Gọi `GET /api/orders/:id` để kiểm tra trạng thái sau request.

## Expected result
- Request bị từ chối với lỗi phù hợp, ví dụ HTTP `400 Bad Request` hoặc thông báo tương đương.
- Trạng thái đơn hàng vẫn là `shipping`.
- Hệ thống không cho user tự hủy đơn khi đơn đang được giao.

## Status / Related bugs
Fail / BUG-ORDER-STT-001
