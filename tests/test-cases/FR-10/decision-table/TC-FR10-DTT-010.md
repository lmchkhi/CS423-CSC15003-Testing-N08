<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-010.md -->

# TC-FR10-DTT-010: Từ chối transition không hợp lệ — Admin skip bước pending sang shipping (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                                 |
| ----------------------- | ----------------------------------------------------- |
| Rule ID                 | R10 (Default — sub-case: skip bước)                   |
| C1: Trạng thái hiện tại | `pending`                                             |
| C2: Trạng thái đích     | `shipping`                                            |
| C3: Vai trò             | Admin                                                 |
| Expected Action         | ❌ A2 — Chuyển đổi không hợp lệ (skip bước confirmed) |

### State Transition Tested

```
pending ──[Admin skip]──► shipping ❌ (Phải qua confirmed trước)
```

> **Lý do không hợp lệ:** Theo State Machine, `pending` phải chuyển sang `confirmed` trước khi có thể chuyển sang `shipping`. Không được phép bỏ qua bước trung gian.

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
| Request Body   | `{"status": "shipping"}`           |
| Authorization  | Bearer Token của Admin             |
| current_status | `pending`                          |
| target_status  | `shipping`                         |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "pending" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thử chuyển trạng thái đơn hàng sang "shipping" (bỏ qua bước confirmed) qua API: `PUT /api/admin/orders/:id/status` với body `{"status": "shipping"}`
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng — phải vẫn giữ nguyên `pending`

## Expected result

- ❌ Hệ thống từ chối chuyển đổi trạng thái
- API trả về HTTP 400 với thông báo lỗi phù hợp (ví dụ: "Chuyển đổi trạng thái không hợp lệ")
- Đơn hàng vẫn giữ nguyên trạng thái `pending` — không bị thay đổi
- Hệ thống không cho phép bỏ qua bước trung gian trong quy trình State Machine

## Actual result

- Hệ thống từ chối chuyển đổi trạng thái
- API trả về HTTP 400 với thông báo lỗi phù hợp (ví dụ: "Chuyển đổi trạng thái không hợp lệ")
- Đơn hàng vẫn giữ nguyên trạng thái `pending` — không bị thay đổi
- Hệ thống không cho phép bỏ qua bước trung gian trong quy trình State Machine

## Status

PASSED
