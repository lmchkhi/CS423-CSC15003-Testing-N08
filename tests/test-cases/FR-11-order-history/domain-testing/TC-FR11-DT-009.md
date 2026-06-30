# TC-FR11-DT-009: Hiển thị ngày đặt trong lịch sử đơn hàng (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Display field | UI field | Bắt buộc hiển thị Ngày đặt |
| Order data | Date/time | Ngày đặt của đơn hàng thuộc user hiện tại |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 1 đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Expected field | Ngày đặt |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Kiểm tra từng dòng/thẻ đơn hàng trong danh sách.

## Expected result
Mỗi đơn hàng hiển thị ngày đặt rõ ràng, có thể đọc được trên giao diện và khớp với dữ liệu đơn hàng tương ứng.

## Status / Related bugs
Passed / None
