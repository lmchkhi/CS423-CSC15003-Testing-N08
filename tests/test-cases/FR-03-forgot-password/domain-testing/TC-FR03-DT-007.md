# TC-FR03-DT-007: Đặt lại mật khẩu khi chưa lấy OTP (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Flow state | State | Invalid: chưa hoàn tất Bước 1 lấy OTP |
| OTP | String | Không có OTP hợp lệ gắn với email |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Chưa yêu cầu OTP cho `test@eshop.com` trong phiên test hiện tại.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 123456 |
| Mật khẩu mới | NewPass123! |
| Xác nhận mật khẩu mới | NewPass123! |

## Test steps
1. Truy cập trực tiếp bước đặt lại mật khẩu nếu UI/API cho phép, hoặc gọi `POST /api/reset-password` mà không thực hiện `POST /api/forgot-password` trước.
2. Nhập/gửi Email: `test@eshop.com`.
3. Nhập/gửi OTP: `123456`.
4. Nhập/gửi Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu hoặc gửi request.

## Expected result
Hệ thống từ chối đặt lại mật khẩu vì không có OTP hợp lệ được sinh cho email trong luồng hiện tại.

## Status / Related bugs
Not Run / None
