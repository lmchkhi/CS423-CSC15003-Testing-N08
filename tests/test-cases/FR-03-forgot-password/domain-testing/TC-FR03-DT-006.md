# TC-FR03-DT-006: Đặt lại mật khẩu thành công với OTP hợp lệ (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Valid: email đã yêu cầu OTP |
| OTP | String | Valid: OTP 6 chữ số được sinh cho chính email đó |
| Mật khẩu mới | String | Valid: thỏa mãn rule FR-01 |
| Xác nhận mật khẩu mới | String | Valid: khớp mật khẩu mới |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.
- User đang ở Bước 2 của trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | NewPass123! |
| Xác nhận mật khẩu mới | NewPass123! |

## Test steps
1. Từ Bước 1, lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP 6 chữ số vừa hiển thị.
3. Nhập Mật khẩu mới: `NewPass123!`.
4. Nhập Xác nhận mật khẩu mới: `NewPass123!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống đặt lại mật khẩu thành công và cho phép người dùng quay lại/được điều hướng về trang Đăng nhập.

## Status / Related bugs
Failed / BUG-FR03-005
