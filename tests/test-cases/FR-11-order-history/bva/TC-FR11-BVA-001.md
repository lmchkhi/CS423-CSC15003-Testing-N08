# TC-FR11-BVA-001: User có 0 đơn hàng (ON - min count) (Boundary Value Analysis)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu pagination hoặc page size cho lịch sử đơn hàng; BVA chỉ áp dụng cho số lượng đơn hàng hiển thị.
- Cần chuẩn bị tài khoản user chưa từng checkout, ví dụ `test@eshop.com`.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| Order count in personal history | Số lượng đơn có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều đơn (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` tồn tại và có 0 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Order count | 0 |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Gọi `GET /api/orders/my-orders` bằng token của user để đối chiếu nếu cần.

## Expected result
Hệ thống xử lý đúng biên 0 đơn: hiển thị danh sách rỗng/thông báo chưa có đơn hàng và không hiển thị dữ liệu của user khác.

## Status / Related bugs
Passed / None
