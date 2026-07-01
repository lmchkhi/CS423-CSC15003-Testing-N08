# TC-FR23-DT-012: Mobile đặt lại mật khẩu với mật khẩu mới rỗng (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Mật khẩu mới | String | Invalid: rỗng, vi phạm trường bắt buộc và rule mật khẩu mạnh |
| OTP | String | Nominal: OTP hợp lệ cho email |
| Xác nhận mật khẩu mới | String | Rỗng hoặc không đủ điều kiện vì mật khẩu mới không hợp lệ |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com`.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | (để trống) |
| Xác nhận mật khẩu mới | (để trống) |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP hợp lệ.
3. Để trống Mật khẩu mới.
4. Để trống Xác nhận mật khẩu mới.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu và hiển thị lỗi rõ ràng rằng mật khẩu mới là bắt buộc hoặc không thỏa rule mật khẩu mạnh.

## Status / Related bugs
Passed / BUG-FR23-001, BUG-FR23-004
