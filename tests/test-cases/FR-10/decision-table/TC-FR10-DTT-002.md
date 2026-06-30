<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-002.md -->

# TC-FR10-DTT-002: Admin chuyển đơn hàng confirmed sang shipping thành công (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                |
| ----------------------- | ------------------------------------ |
| Rule ID                 | R2                                   |
| C1: Trạng thái hiện tại | `confirmed`                          |
| C2: Trạng thái đích     | `shipping`                           |
| C3: Vai trò             | Admin                                |
| Expected Action         | ✅ A1 — Chuyển trạng thái thành công |

### State Transition Tested

```
confirmed ──[Admin giao hàng]──► shipping ✅
```

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Web Admin: http://localhost:5174)
- Đã đăng nhập với tài khoản Admin (admin@eshop.com / Admin123!)
- Có ít nhất một đơn hàng đang ở trạng thái `confirmed`
- Ghi nhận Order ID của đơn hàng confirmed để sử dụng trong test

## Test data

| Field          | Value                              |
| -------------- | ---------------------------------- |
| API Endpoint   | `PUT /api/admin/orders/:id/status` |
| Order ID       | (ID đơn hàng đang confirmed)       |
| Request Body   | `{"status": "shipping"}`           |
| Authorization  | Bearer Token của Admin             |
| current_status | `confirmed`                        |
| target_status  | `shipping`                         |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "confirmed" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thực hiện chuyển trạng thái đơn hàng sang "shipping" (qua giao diện Admin hoặc API: `PUT /api/admin/orders/:id/status` với body `{"status": "shipping"}`)
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng trong danh sách

## Expected result

- ✅ Hệ thống chấp nhận chuyển đổi trạng thái thành công
- Đơn hàng cập nhật sang trạng thái `shipping`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin

## Actual result

- Hệ thống chấp nhận chuyển đổi trạng thái thành công
- Đơn hàng cập nhật sang trạng thái `shipping`
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật
- Trạng thái mới hiển thị chính xác trong danh sách đơn hàng của Admin

## Status

PASSED
