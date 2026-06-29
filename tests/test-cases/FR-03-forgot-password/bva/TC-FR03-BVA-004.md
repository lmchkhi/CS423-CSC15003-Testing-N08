# TC-FR03-BVA-004: Mật khẩu mới 7 ký tự (OFF- - min length) (Boundary Value Analysis)

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
| Mật khẩu mới | Ab1!abc |
| Xác nhận mật khẩu mới | Ab1!abc |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới 7 ký tự: `Ab1!abc`.
4. Nhập Xác nhận mật khẩu mới: `Ab1!abc`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối mật khẩu 7 ký tự vì nhỏ hơn độ dài tối thiểu 8 ký tự; mật khẩu không bị thay đổi.

## Status / Related bugs
Not Run / None
