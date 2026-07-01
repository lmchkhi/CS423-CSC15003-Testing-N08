# TC-FR23-BVA-002: Mobile OTP 5 chữ số (OFF- - độ dài OTP) (Boundary Value Analysis)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| OTP length | OTP phải có 6 chữ số | Exact length | 5 (OFF-), 6 (ON), 7 (OFF+) |

## Preconditions
- Đã lấy OTP thành công cho `test@eshop.com` trên mobile.
- Ứng dụng mobile đang ở bước đặt lại mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 12345 |
| Mật khẩu mới | BvaMobile123! |
| Xác nhận mật khẩu mới | BvaMobile123! |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Ở bước đặt lại mật khẩu, nhập OTP 5 chữ số: `12345`.
3. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
4. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu và hiển thị lỗi OTP không hợp lệ vì OTP ngắn hơn 6 chữ số.

## Status / Related bugs
Passed / None
