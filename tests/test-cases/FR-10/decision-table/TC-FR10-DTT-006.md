<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-006.md -->

# TC-FR10-DTT-006: Admin hủy đơn hàng shipping thành công (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                |
| ----------------------- | ------------------------------------ |
| Rule ID                 | R6                                   |
| C1: Trạng thái hiện tại | `shipping`                           |
| C2: Trạng thái đích     | `canceled`                           |
| C3: Vai trò             | Admin                                |
| Expected Action         | ✅ A1 — Chuyển trạng thái thành công |

### State Transition Tested

```
shipping ──[Admin hủy]──► canceled ✅
```

> **Lưu ý:** Theo đặc tả FR-10, khi đơn hàng đã ở trạng thái `shipping`, chỉ Admin mới có thể hủy. User không được phép tự hủy.

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Web Admin: http://localhost:5174)
- Đã đăng nhập với tài khoản Admin (admin@eshop.com / Admin123!)
- Có ít nhất một đơn hàng đang ở trạng thái `shipping`
- Ghi nhận Order ID của đơn hàng shipping để sử dụng trong test

## Test data

| Field          | Value                              |
| -------------- | ---------------------------------- |
| API Endpoint   | `PUT /api/admin/orders/:id/status` |
| Order ID       | (ID đơn hàng đang shipping)        |
| Request Body   | `{"status": "canceled"}`           |
| Authorization  | Bearer Token của Admin             |
| current_status | `shipping`                         |
| target_status  | `canceled`                         |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "shipping" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thực hiện chuyển trạng thái đơn hàng sang "canceled" (qua giao diện Admin hoặc API: `PUT /api/admin/orders/:id/status` với body `{"status": "canceled"}`)
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng trong danh sách

## Expected result

- ✅ Hệ thống chấp nhận yêu cầu hủy đơn hàng thành công
- Đơn hàng cập nhật sang trạng thái `canceled`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin
- Đơn hàng giờ ở trạng thái kết thúc — không thể chuyển sang trạng thái khác

## Actual result

- Hệ thống chấp nhận yêu cầu hủy đơn hàng thành công
- Đơn hàng cập nhật sang trạng thái `canceled`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin
- Đơn hàng giờ ở trạng thái kết thúc — không thể chuyển sang trạng thái khác

## Status

FAILED
