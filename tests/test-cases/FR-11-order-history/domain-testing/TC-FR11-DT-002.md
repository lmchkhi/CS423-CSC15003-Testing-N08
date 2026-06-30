# TC-FR11-DT-002: Từ chối xem lịch sử đơn hàng khi chưa đăng nhập (Domain Testing)

## Requirement ID
FR-11

## Module / Test type / Technique
Order History / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Session state | State | Invalid: không có token đăng nhập |
| API authorization | Header | `GET /api/orders/my-orders` yêu cầu `Authorization: Bearer <token>` |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Browser/API client không có token đăng nhập hợp lệ.

## Test data

| Field | Value |
| --- | --- |
| Authorization header | Không gửi |
| API | `GET /api/orders/my-orders` |

## Test steps
1. Đảm bảo user đã logout hoặc mở cửa sổ ẩn danh.
2. Mở trực tiếp trang Lịch sử đơn hàng trên Web.
3. Gọi API `GET /api/orders/my-orders` mà không gửi Authorization header.

## Expected result
Web không cho xem lịch sử đơn hàng và yêu cầu đăng nhập; API từ chối request không có token, không trả dữ liệu đơn hàng.

## Status / Related bugs
Passed / None
