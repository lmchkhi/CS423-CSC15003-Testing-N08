# TC-FR11-DT-008: Hiển thị mã đơn hàng trong lịch sử đơn hàng (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Display field | UI field | Bắt buộc hiển thị Mã đơn |
| Order data | Object | Đơn hàng thuộc user đang đăng nhập |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 1 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Expected field | Mã đơn |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Kiểm tra từng dòng/thẻ đơn hàng trong danh sách.

## Expected result
Mỗi đơn hàng trong lịch sử hiển thị mã đơn/id đơn rõ ràng để user phân biệt các đơn hàng.

## Status / Related bugs
Passed / None
