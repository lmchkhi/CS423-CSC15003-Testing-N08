<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-001.md -->

# TC-FR10-DTT-001: Admin xác nhận đơn hàng pending thành công (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                |
| ----------------------- | ------------------------------------ |
| Rule ID                 | R1                                   |
| C1: Trạng thái hiện tại | `pending`                            |
| C2: Trạng thái đích     | `confirmed`                          |
| C3: Vai trò             | Admin                                |
| Expected Action         | ✅ A1 — Chuyển trạng thái thành công |

### State Transition Tested

```
pending ──[Admin xác nhận]──► confirmed ✅
```

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Web Admin: http://localhost:5174)
- Đã đăng nhập với tài khoản Admin (admin@eshop.com / Admin123!)
- Có ít nhất một đơn hàng đang ở trạng thái `pending`
- Ghi nhận Order ID của đơn hàng pending để sử dụng trong test

## Test data

| Field          | Value                              |
| -------------- | ---------------------------------- |
| API Endpoint   | `PUT /api/admin/orders/:id/status` |
| Order ID       | (ID đơn hàng đang pending)         |
| Request Body   | `{"status": "confirmed"}`          |
| Authorization  | Bearer Token của Admin             |
| current_status | `pending`                          |
| target_status  | `confirmed`                        |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "pending" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thực hiện chuyển trạng thái đơn hàng sang "confirmed" (qua giao diện Admin hoặc API: `PUT /api/admin/orders/:id/status` với body `{"status": "confirmed"}`)
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng trong danh sách

## Expected result

- ✅ Hệ thống chấp nhận chuyển đổi trạng thái thành công
- Đơn hàng cập nhật sang trạng thái `confirmed`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin

## Actual result

- Hệ thống chấp nhận chuyển đổi trạng thái thành công
- Đơn hàng cập nhật sang trạng thái `confirmed`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin

## Status

PASSED
