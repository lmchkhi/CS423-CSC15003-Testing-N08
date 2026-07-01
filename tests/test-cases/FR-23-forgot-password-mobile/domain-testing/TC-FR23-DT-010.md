# TC-FR23-DT-010: Mobile đặt lại mật khẩu với mật khẩu mới yếu (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Mật khẩu mới | String | Invalid: không thỏa rule FR-01 về mật khẩu mạnh |
| OTP | String | Nominal: OTP hợp lệ cho email |
| Xác nhận mật khẩu mới | String | Nominal: khớp mật khẩu mới để cô lập lỗi password strength |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com`.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | password |
| Xác nhận mật khẩu mới | password |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới: `password`.
4. Nhập Xác nhận mật khẩu mới: `password`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu và hiển thị lỗi mật khẩu yếu rõ ràng trên màn hình mobile.

## Status / Related bugs
Passed / BUG-FR23-001, BUG-FR23-004
