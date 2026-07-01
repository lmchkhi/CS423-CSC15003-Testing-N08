# TC-FR23-DT-011: Mobile đặt lại mật khẩu khi xác nhận mật khẩu không khớp (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Mật khẩu mới | String | Valid: mật khẩu mạnh |
| Xác nhận mật khẩu mới | String | Invalid: không khớp mật khẩu mới |
| OTP | String | Nominal: OTP hợp lệ cho email |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com`.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | MobileNew123! |
| Xác nhận mật khẩu mới | MobileNew456! |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới: `MobileNew123!`.
4. Nhập Xác nhận mật khẩu mới: `MobileNew456!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu và hiển thị lỗi xác nhận mật khẩu không khớp rõ ràng trên màn hình mobile.

## Status / Related bugs
Blocked / BUG-FR23-001, BUG-FR23-004
