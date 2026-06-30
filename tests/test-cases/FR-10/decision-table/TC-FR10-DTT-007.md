<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-007.md -->

# TC-FR10-DTT-007: User bị từ chối hủy đơn hàng shipping (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                              |
| ----------------------- | -------------------------------------------------- |
| Rule ID                 | R7                                                 |
| C1: Trạng thái hiện tại | `shipping`                                         |
| C2: Trạng thái đích     | `canceled`                                         |
| C3: Vai trò             | User                                               |
| Expected Action         | ❌ A4 — User không được phép hủy đơn đang shipping |

### State Transition Tested

```
shipping ──[User hủy]──► canceled ❌ (Bị từ chối)
```

> **Ràng buộc FR-10:** "Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác."

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Frontend: http://localhost:5173)
- Đã đăng nhập với tài khoản User (test@eshop.com / Test1234!)
- User có ít nhất một đơn hàng đang ở trạng thái `shipping`
- Ghi nhận Order ID của đơn hàng shipping để sử dụng trong test

## Test data

| Field          | Value                                |
| -------------- | ------------------------------------ |
| API Endpoint   | `PUT /api/orders/:id/cancel`         |
| Order ID       | (ID đơn hàng đang shipping của User) |
| Authorization  | Bearer Token của User                |
| current_status | `shipping`                           |
| target_status  | `canceled`                           |

## Test steps

1. Đăng nhập vào Frontend Web tại http://localhost:5173 với tài khoản test@eshop.com / Test1234!
2. Truy cập trang "Lịch sử đơn hàng" (hoặc "Đơn hàng của tôi")
3. Tìm đơn hàng có trạng thái "shipping" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thử hủy đơn hàng shipping bằng cách nhấn nút "Hủy đơn hàng" (nếu nút hiển thị) hoặc gọi API: `PUT /api/orders/:id/cancel` với Bearer Token của User
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng — phải vẫn giữ nguyên `shipping`

## Expected result

- ❌ Hệ thống từ chối yêu cầu hủy đơn hàng
- API trả về HTTP 400/403 với thông báo lỗi phù hợp (ví dụ: "Không thể hủy đơn hàng đang giao")
- Đơn hàng vẫn giữ nguyên trạng thái `shipping` — không bị thay đổi
- Trên giao diện: nút "Hủy đơn hàng" nên bị ẩn hoặc disable cho đơn hàng ở trạng thái shipping

## Actual result

- Hệ thống hủy đơn hàng shipping thành công
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật sang trạng thái `canceled`

## Status

FAILED
