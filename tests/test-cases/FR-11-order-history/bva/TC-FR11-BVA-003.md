# TC-FR11-BVA-003: User có nhiều đơn hàng (representative above min) (Boundary Value Analysis)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu pagination hoặc page size cho lịch sử đơn hàng; BVA chỉ áp dụng cho số lượng đơn hàng hiển thị.
- Cần chuẩn bị tài khoản user có ít nhất 3 đơn hàng, ví dụ `test@eshop.com`.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| Order count in personal history | Số lượng đơn có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều đơn (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 3 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Order count | >= 3 |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Kiểm tra số lượng đơn hàng hiển thị.
4. Gọi `GET /api/orders/my-orders` bằng token của user để đối chiếu nếu cần.

## Expected result
Hệ thống hiển thị được nhiều đơn hàng của cùng user trong danh sách, không mất đơn và không giới hạn sai khi không có pagination/filter được đặc tả.

## Status / Related bugs
Passed / None
