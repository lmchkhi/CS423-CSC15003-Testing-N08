# TC-FR03-DT-005: Lấy OTP với email chưa đăng ký (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: đúng định dạng nhưng không tồn tại trong hệ thống |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `notfound.fr03@example.com` chưa tồn tại trong hệ thống.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | notfound.fr03@example.com |

## Test steps
1. Mở trang Quên mật khẩu (`/forgot-password`).
2. Nhập Email: `notfound.fr03@example.com`.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Hệ thống từ chối yêu cầu, không sinh OTP và hiển thị thông báo lỗi phù hợp cho email chưa đăng ký.

## Status / Related bugs
Passed / None
