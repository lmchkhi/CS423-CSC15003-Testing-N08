# TC-FR23-DT-006: Mobile đặt lại mật khẩu thành công với OTP hợp lệ (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Valid: email đã yêu cầu OTP |
| OTP | String | Valid: OTP 6 chữ số được sinh cho chính email đó |
| Mật khẩu mới | String | Valid: thỏa mãn rule FR-01 |
| Xác nhận mật khẩu mới | String | Valid: khớp mật khẩu mới |
| Điều hướng sau reset | State | Sau khi reset thành công, mobile phải điều hướng về màn hình Đăng nhập |

## Preconditions
- Hệ thống EShop và API đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | MobileNew123! |
| Xác nhận mật khẩu mới | MobileNew123! |

## Test steps
1. Từ màn hình Quên mật khẩu mobile, lấy OTP cho `test@eshop.com`.
2. Ở bước đặt lại mật khẩu, nhập OTP 6 chữ số vừa hiển thị.
3. Nhập Mật khẩu mới: `MobileNew123!`.
4. Nhập Xác nhận mật khẩu mới: `MobileNew123!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống đặt lại mật khẩu thành công; ứng dụng mobile hiển thị thông báo thành công và điều hướng về màn hình Đăng nhập.

## Status / Related bugs
Failed / BUG-FR23-001, BUG-FR23-004
