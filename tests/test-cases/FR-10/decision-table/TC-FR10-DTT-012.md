<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-012.md -->

# TC-FR10-DTT-012: Từ chối transition không hợp lệ — User thực hiện hành động Admin-only (pending → confirmed) (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| Rule ID                 | R10 (Default — sub-case: User vi phạm quyền Admin)                 |
| C1: Trạng thái hiện tại | `pending`                                                          |
| C2: Trạng thái đích     | `confirmed`                                                        |
| C3: Vai trò             | User                                                               |
| Expected Action         | ❌ A2 — Chuyển đổi không hợp lệ (User không có quyền xác nhận đơn) |

### State Transition Tested

```
pending ──[User xác nhận]──► confirmed ❌ (Chỉ Admin mới được)
```

> **Lý do không hợp lệ:** Theo State Machine, việc xác nhận đơn hàng (pending → confirmed) là hành động chỉ dành cho Admin. User chỉ có quyền hủy đơn hàng.

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Frontend: http://localhost:5173)
- Đã đăng nhập với tài khoản User (test@eshop.com / Test1234!)
- User có ít nhất một đơn hàng đang ở trạng thái `pending`
- Ghi nhận Order ID của đơn hàng pending để sử dụng trong test

## Test data

| Field          | Value                                    |
| -------------- | ---------------------------------------- |
| API Endpoint   | `PUT /api/admin/orders/:id/status`       |
| Order ID       | (ID đơn hàng đang pending)               |
| Request Body   | `{"status": "confirmed"}`                |
| Authorization  | Bearer Token của User (KHÔNG phải Admin) |
| current_status | `pending`                                |
| target_status  | `confirmed`                              |

## Test steps

1. Đăng nhập vào Frontend Web tại http://localhost:5173 với tài khoản test@eshop.com / Test1234!
2. Lấy Bearer Token của User từ quá trình đăng nhập
3. Sử dụng Postman hoặc cURL để gọi API Admin: `PUT /api/admin/orders/:id/status` với body `{"status": "confirmed"}`
4. Đặt Header `Authorization: Bearer <user_token>` (token của User, không phải Admin)
5. Gửi request và quan sát phản hồi từ hệ thống
6. Kiểm tra lại trạng thái đơn hàng — phải vẫn giữ nguyên `pending`

## Expected result

- ❌ Hệ thống từ chối yêu cầu do không đủ quyền
- API trả về HTTP 401/403 với thông báo lỗi phù hợp (ví dụ: "Không có quyền truy cập" hoặc "Yêu cầu quyền Admin")
- Đơn hàng vẫn giữ nguyên trạng thái `pending` — không bị thay đổi
- Hệ thống kiểm tra `role = admin` trong JWT Token, không chỉ kiểm tra sự tồn tại của Token

## Actual result

- Hệ thống đồng ý cho phép User xác nhận đơn hàng pending thành confirmed
- API trả về HTTP 200 OK với thông tin đơn hàng đã cập nhật

## Status

FAILED
