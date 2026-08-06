# TC-FR11-DT-003: Hiển thị trạng thái rỗng khi user chưa có đơn hàng (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Assumptions
- Cần chuẩn bị một tài khoản user hợp lệ chưa từng checkout, ví dụ `test@eshop.com`.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | User đăng nhập hợp lệ |
| Order count | Count | Valid special domain: 0 đơn hàng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` tồn tại và chưa có đơn hàng.

## Test data

| Field | Value |
| --- | --- |
| User | `test@eshop.com` |
| Password | `Test1234!` |
| Expected order count | 0 |

## Test steps
1. Đăng nhập Web bằng `test@eshop.com`.
2. Mở trang Lịch sử đơn hàng.
3. Gọi API `GET /api/orders/my-orders` với token của user để đối chiếu nếu cần.

## Expected result
Web hiển thị trạng thái danh sách rỗng rõ ràng, không hiển thị đơn hàng của user khác; API trả về danh sách rỗng cho user này.

## Status / Related bugs
Passed / None
