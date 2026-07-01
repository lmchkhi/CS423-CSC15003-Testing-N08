# TC-FR23-DT-005: Mobile lấy OTP với email chưa đăng ký (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: đúng định dạng nhưng không tồn tại trong hệ thống |

## Preconditions
- Ứng dụng mobile đã mở ở màn hình Quên mật khẩu.
- Email `notfound.fr23@example.com` chưa được đăng ký.

## Test data

| Field | Value |
| --- | --- |
| Email | notfound.fr23@example.com |

## Test steps
1. Mở màn hình Quên mật khẩu trên mobile.
2. Nhập Email: `notfound.fr23@example.com`.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Ứng dụng không sinh OTP và hiển thị lỗi rõ ràng rằng email chưa đăng ký hoặc không tồn tại.

## Status / Related bugs
Passed / None
