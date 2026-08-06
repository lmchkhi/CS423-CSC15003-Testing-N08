# TC-FR11-BVA-002: User có đúng 1 đơn hàng (ON+ - min count + 1) (Boundary Value Analysis)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu pagination hoặc page size cho lịch sử đơn hàng; BVA chỉ áp dụng cho số lượng đơn hàng hiển thị.
- Cần chuẩn bị tài khoản user có đúng 1 đơn hàng, ví dụ `fr11.oneorder@example.com`.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| Order count in personal history | Số lượng đơn có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều đơn (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `fr11.oneorder@example.com` tồn tại và có đúng 1 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `fr11.oneorder@example.com` |
| Order count | 1 |

## Test steps
1. Đăng nhập Web bằng `fr11.oneorder@example.com`.
2. Mở trang Lịch sử đơn hàng.
3. Kiểm tra số lượng đơn hàng hiển thị.
4. Gọi `GET /api/orders/my-orders` bằng token của user để đối chiếu nếu cần.

## Expected result
Hệ thống hiển thị đúng 1 đơn hàng của user, không nhân bản dòng đơn và không hiển thị trạng thái rỗng.

## Status / Related bugs
Passed / None
