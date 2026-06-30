<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-011.md -->

# TC-FR10-DTT-011: Từ chối transition không hợp lệ — Admin quay ngược confirmed về pending (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item | Value |
| --- | --- |
| Rule ID | R10 (Default — sub-case: quay ngược) |
| C1: Trạng thái hiện tại | `confirmed` |
| C2: Trạng thái đích | `pending` |
| C3: Vai trò | Admin |
| Expected Action | ❌ A2 — Chuyển đổi không hợp lệ (quay ngược trạng thái) |

### State Transition Tested

```
confirmed ──[Admin quay ngược]──► pending ❌ (Không thể quay lại)
```

> **Lý do không hợp lệ:** Theo State Machine, trạng thái chỉ có thể đi tiến về phía trước (pending → confirmed → shipping → delivered) hoặc hủy (→ canceled). Không thể quay ngược lại trạng thái trước đó.

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Web Admin: http://localhost:5174)
- Đã đăng nhập với tài khoản Admin (admin@eshop.com / Admin123!)
- Có ít nhất một đơn hàng đang ở trạng thái `confirmed`
- Ghi nhận Order ID của đơn hàng confirmed để sử dụng trong test

## Test data

| Field | Value |
| --- | --- |
| API Endpoint | `PUT /api/admin/orders/:id/status` |
| Order ID | (ID đơn hàng đang confirmed) |
| Request Body | `{"status": "pending"}` |
| Authorization | Bearer Token của Admin |
| current_status | `confirmed` |
| target_status | `pending` |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "confirmed" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thử chuyển trạng thái đơn hàng sang "pending" (quay ngược) qua API: `PUT /api/admin/orders/:id/status` với body `{"status": "pending"}`
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng — phải vẫn giữ nguyên `confirmed`

## Expected result

- ❌ Hệ thống từ chối chuyển đổi trạng thái
- API trả về HTTP 400 với thông báo lỗi phù hợp (ví dụ: "Chuyển đổi trạng thái không hợp lệ")
- Đơn hàng vẫn giữ nguyên trạng thái `confirmed` — không bị thay đổi
- Hệ thống không cho phép quay ngược trạng thái trong quy trình State Machine

## Actual result

_(Chưa thực thi)_

## Status

Not Run
