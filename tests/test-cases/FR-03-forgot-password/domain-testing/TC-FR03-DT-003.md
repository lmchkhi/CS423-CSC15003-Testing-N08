# TC-FR03-DT-003: Lấy OTP với email rỗng (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: rỗng trong khi hệ thống yêu cầu email đã đăng ký |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | *(để trống)* |

## Test steps
1. Mở trang Quên mật khẩu (`/forgot-password`).
2. Để trống trường Email.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Hệ thống từ chối yêu cầu, không sinh OTP và hiển thị lỗi yêu cầu nhập Email ở phía trên nút submit.

## Status / Related bugs
Passed / None
