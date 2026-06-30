<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-005.md -->

# TC-FR10-DTT-005: User hủy đơn hàng confirmed thành công (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                |
| ----------------------- | ------------------------------------ |
| Rule ID                 | R5                                   |
| C1: Trạng thái hiện tại | `confirmed`                          |
| C2: Trạng thái đích     | `canceled`                           |
| C3: Vai trò             | User (don't-care: Admin cũng hợp lệ) |
| Expected Action         | ✅ A1 — Chuyển trạng thái thành công |

### State Transition Tested

```
confirmed ──[User hủy]──► canceled ✅
```

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Frontend: http://localhost:5173)
- Đã đăng nhập với tài khoản User (test@eshop.com / Test1234!)
- User có ít nhất một đơn hàng đang ở trạng thái `confirmed`
- Ghi nhận Order ID của đơn hàng confirmed để sử dụng trong test

## Test data

| Field          | Value                                 |
| -------------- | ------------------------------------- |
| API Endpoint   | `PUT /api/orders/:id/cancel`          |
| Order ID       | (ID đơn hàng đang confirmed của User) |
| Authorization  | Bearer Token của User                 |
| current_status | `confirmed`                           |
| target_status  | `canceled`                            |

## Test steps

1. Đăng nhập vào Frontend Web tại http://localhost:5173 với tài khoản test@eshop.com / Test1234!
2. Truy cập trang "Lịch sử đơn hàng" (hoặc "Đơn hàng của tôi")
3. Tìm đơn hàng có trạng thái "confirmed" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Nhấn nút "Hủy đơn hàng" trên đơn hàng confirmed (hoặc gọi API: `PUT /api/orders/:id/cancel` với Bearer Token của User)
6. Xác nhận hủy đơn nếu có dialog xác nhận
7. Quan sát phản hồi từ hệ thống
8. Kiểm tra lại trạng thái đơn hàng trong danh sách

## Expected result

- ✅ Hệ thống chấp nhận yêu cầu hủy đơn hàng thành công
- Đơn hàng cập nhật sang trạng thái `canceled`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong lịch sử đơn hàng của User
- Đơn hàng giờ ở trạng thái kết thúc — không thể chuyển sang trạng thái khác

## Actual result

- Hệ thống chấp nhận yêu cầu hủy đơn hàng thành công
- Đơn hàng cập nhật sang trạng thái `canceled`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong lịch sử đơn hàng của User
- Đơn hàng giờ ở trạng thái kết thúc — không thể chuyển sang trạng thái khác

## Status

PASSED
