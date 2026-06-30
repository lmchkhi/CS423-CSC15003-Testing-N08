<!-- tests/test-cases/FR-10/decision-table/TC-FR10-DTT-008.md -->

# TC-FR10-DTT-008: Từ chối chuyển trạng thái từ delivered — trạng thái kết thúc (Decision Table Testing)

## Requirement ID

FR-10

## Module / Test type / Technique

Quản lý Đơn hàng (Order State Machine) / Functional / Decision Table Testing

## Decision Table Analysis

### Rule Mapping

| Item                    | Value                                              |
| ----------------------- | -------------------------------------------------- |
| Rule ID                 | R8                                                 |
| C1: Trạng thái hiện tại | `delivered`                                        |
| C2: Trạng thái đích     | `confirmed` (don't-care: bất kỳ trạng thái nào)    |
| C3: Vai trò             | Admin (don't-care: bất kỳ vai trò nào)             |
| Expected Action         | ❌ A3 — Trạng thái kết thúc, không thể chuyển tiếp |

### State Transition Tested

```
delivered ──[Admin thay đổi]──► confirmed ❌ (Trạng thái kết thúc)
```

> **Ràng buộc FR-10:** "Trạng thái delivered và canceled là trạng thái kết thúc — không được phép chuyển sang bất kỳ trạng thái nào khác."

## Preconditions

- Hệ thống EShop đang hoạt động (Backend: http://localhost:3000, Web Admin: http://localhost:5174)
- Đã đăng nhập với tài khoản Admin (admin@eshop.com / Admin123!)
- Có ít nhất một đơn hàng đang ở trạng thái `delivered`
- Ghi nhận Order ID của đơn hàng delivered để sử dụng trong test

## Test data

| Field          | Value                              |
| -------------- | ---------------------------------- |
| API Endpoint   | `PUT /api/admin/orders/:id/status` |
| Order ID       | (ID đơn hàng đang delivered)       |
| Request Body   | `{"status": "confirmed"}`          |
| Authorization  | Bearer Token của Admin             |
| current_status | `delivered`                        |
| target_status  | `confirmed`                        |

## Test steps

1. Đăng nhập vào hệ thống Admin tại http://localhost:5174 với tài khoản admin@eshop.com / Admin123!
2. Truy cập trang "Quản lý Đơn hàng" từ menu điều hướng
3. Tìm đơn hàng có trạng thái "delivered" trong danh sách
4. Ghi nhận Order ID của đơn hàng này
5. Thử chuyển trạng thái đơn hàng sang "confirmed" qua API: `PUT /api/admin/orders/:id/status` với body `{"status": "confirmed"}`
6. Quan sát phản hồi từ hệ thống
7. Kiểm tra lại trạng thái đơn hàng — phải vẫn giữ nguyên `delivered`

## Expected result

- ❌ Hệ thống từ chối chuyển đổi trạng thái
- API trả về HTTP 400 với thông báo lỗi phù hợp (ví dụ: "Không thể thay đổi trạng thái đơn hàng đã giao")
- Đơn hàng vẫn giữ nguyên trạng thái `delivered` — không bị thay đổi
- Trên giao diện Admin: không nên hiển thị các tùy chọn chuyển trạng thái cho đơn hàng delivered

## Actual result

- Hệ thống từ chối chuyển đổi trạng thái
- API trả về HTTP 400 với thông báo lỗi phù hợp (ví dụ: "Không thể thay đổi trạng thái đơn hàng đã giao")
- Đơn hàng vẫn giữ nguyên trạng thái `delivered` — không bị thay đổi

## Status

PASSED
