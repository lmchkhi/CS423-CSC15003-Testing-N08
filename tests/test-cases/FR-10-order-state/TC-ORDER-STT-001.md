# TC-ORDER-STT-001: Tạo đơn hàng mới ở trạng thái `pending`

## Requirement ID
FR-10

## Module / Test type / Technique
Order State / Functional / State Transition Testing

## Preconditions
- User đã đăng nhập bằng tài khoản hợp lệ.
- User có thể tạo đơn hàng mới qua checkout.
- Backend đang chạy tại `http://localhost:3000`.

## Test data
| Trường | Giá trị |
| --- | --- |
| Token user | `<user_token>` |
| Total amount | `200000` |
| Shipping address | `123 Lê Lợi, Quận 1, TP.HCM` |

## Test steps
1. Gửi request `POST /api/checkout` với token user hợp lệ.
2. Truyền `total_amount` và `shipping_address` theo test data.
3. Lấy `orderId` từ response.
4. Gọi `GET /api/orders/:id` với `orderId` vừa tạo.

## Expected result
- Hệ thống tạo đơn hàng thành công.
- Đơn hàng mới có trạng thái ban đầu là `pending`.
- Không có chuyển đổi trạng thái phụ nào xảy ra sau khi checkout.

## Status / Related bugs
Not Run / None

