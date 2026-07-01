# TC-FR23-DT-003: Mobile lấy OTP với email rỗng (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: rỗng, vi phạm trường bắt buộc |

## Preconditions
- Ứng dụng mobile đã mở ở màn hình Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | (để trống) |

## Test steps
1. Mở màn hình Quên mật khẩu trên mobile.
2. Để trống trường Email.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Ứng dụng không gửi yêu cầu lấy OTP, không sinh OTP và hiển thị lỗi rõ ràng rằng Email là bắt buộc.

## Status / Related bugs
Failed / BUG-FR23-003
