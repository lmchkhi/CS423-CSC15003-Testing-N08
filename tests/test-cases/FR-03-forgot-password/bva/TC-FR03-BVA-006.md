# TC-FR03-BVA-006: Mật khẩu mới 9 ký tự (OFF+ - min length) (Boundary Value Analysis)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| newPassword.length | Tối thiểu 8 ký tự theo FR-01 | Min boundary | 7 (OFF-), 8 (ON), 9 (OFF+) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | Ab1!abcde |
| Xác nhận mật khẩu mới | Ab1!abcde |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới 9 ký tự: `Ab1!abcde`.
4. Nhập Xác nhận mật khẩu mới: `Ab1!abcde`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống chấp nhận mật khẩu mới 9 ký tự, đủ chữ hoa/chữ thường/chữ số/ký tự đặc biệt và đặt lại mật khẩu thành công.

## Status / Related bugs
Not Run / None
