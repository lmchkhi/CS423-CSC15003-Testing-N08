# TC-FR11-DT-010: Hiển thị tổng tiền trong lịch sử đơn hàng (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Display field | UI field | Bắt buộc hiển thị Tổng tiền |
| Currency format | UI format | GUI-01 yêu cầu dùng ký hiệu `₫` và phân cách hàng nghìn |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` có ít nhất 1 đơn hàng có tổng tiền khác 0.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Expected field | Tổng tiền |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Kiểm tra trường tổng tiền của từng đơn hàng.

## Expected result
Mỗi đơn hàng hiển thị tổng tiền đúng với dữ liệu đơn hàng, dùng ký hiệu `₫` và định dạng phân cách hàng nghìn theo GUI-01.

## Status / Related bugs
Passed / None
