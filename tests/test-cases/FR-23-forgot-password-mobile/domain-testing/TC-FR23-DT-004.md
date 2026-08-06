# TC-FR23-DT-004: Mobile lấy OTP với email sai định dạng (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: không đúng định dạng email |

## Preconditions
- Ứng dụng mobile đã mở ở màn hình Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | invalid-email |

## Test steps
1. Mở màn hình Quên mật khẩu trên mobile.
2. Nhập Email: `invalid-email`.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Ứng dụng không sinh OTP và hiển thị lỗi định dạng email rõ ràng trên mobile.

## Status / Related bugs
Failed / BUG-FR23-003
