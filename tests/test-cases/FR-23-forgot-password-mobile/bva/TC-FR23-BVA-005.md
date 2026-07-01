# TC-FR23-BVA-005: Mobile mật khẩu mới đúng 8 ký tự (ON - min length) (Boundary Value Analysis)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| newPassword.length | Mật khẩu mới tối thiểu 8 ký tự theo FR-01 | Min length | 7 (OFF-), 8 (ON), 9 (OFF+) |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com` trên mobile.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | Ab1!abcd |
| Xác nhận mật khẩu mới | Ab1!abcd |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới đúng 8 ký tự: `Ab1!abcd`.
4. Nhập Xác nhận mật khẩu mới: `Ab1!abcd`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng chấp nhận mật khẩu mới đúng 8 ký tự và đủ rule mật khẩu mạnh, đặt lại mật khẩu thành công và điều hướng về màn hình Đăng nhập.

## Status / Related bugs
Failed / BUG-FR23-001, BUG-FR23-004
