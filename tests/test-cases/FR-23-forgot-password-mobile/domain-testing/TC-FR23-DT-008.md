# TC-FR23-DT-008: Mobile đặt lại mật khẩu với OTP sai (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| OTP | String | Invalid: sai giá trị, dù có dạng 6 chữ số |
| Mật khẩu mới | String | Nominal: mật khẩu mạnh hợp lệ |
| Xác nhận mật khẩu mới | String | Nominal: khớp mật khẩu mới |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com`.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.
- OTP `000000` không phải OTP vừa được sinh.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 000000 |
| Mật khẩu mới | MobileNew123! |
| Xác nhận mật khẩu mới | MobileNew123! |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP sai: `000000`.
3. Nhập Mật khẩu mới: `MobileNew123!`.
4. Nhập Xác nhận mật khẩu mới: `MobileNew123!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu và hiển thị lỗi OTP sai rõ ràng trên màn hình mobile.

## Status / Related bugs
Passed / BUG-FR23-004
