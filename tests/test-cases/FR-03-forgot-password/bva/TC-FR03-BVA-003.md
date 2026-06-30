# TC-FR03-BVA-003: OTP 7 chữ số (OFF+ - độ dài OTP) (Boundary Value Analysis)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| OTP length | OTP phải có 6 chữ số | Exact length | 5 (OFF-), 6 (ON), 7 (OFF+) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 1234567 |
| Mật khẩu mới | BvaPass123! |
| Xác nhận mật khẩu mới | BvaPass123! |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP 7 chữ số: `1234567`.
3. Nhập Mật khẩu mới: `BvaPass123!`.
4. Nhập Xác nhận mật khẩu mới: `BvaPass123!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối OTP 7 chữ số và hiển thị lỗi OTP không hợp lệ; mật khẩu không bị thay đổi.

## Status / Related bugs
Failed / BUG-FR03-001, BUG-FR03-004, BUG-FR03-005
