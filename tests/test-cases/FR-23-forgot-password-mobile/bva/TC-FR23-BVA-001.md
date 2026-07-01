# TC-FR23-BVA-001: Mobile OTP đúng 6 chữ số (ON - độ dài OTP) (Boundary Value Analysis)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| OTP length | OTP phải có 6 chữ số | Exact length | 5 (OFF-), 6 (ON), 7 (OFF+) |

## Preconditions
- Hệ thống EShop và API đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com` trên mobile.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | BvaMobile123! |
| Xác nhận mật khẩu mới | BvaMobile123! |

## Test steps
1. Lấy OTP cho `test@eshop.com` trên mobile.
2. Kiểm tra OTP hiển thị có đúng 6 chữ số.
3. Nhập OTP 6 chữ số đó ở bước đặt lại mật khẩu.
4. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống chấp nhận OTP đúng 6 chữ số thuộc email đã yêu cầu, đặt lại mật khẩu thành công và ứng dụng mobile điều hướng về màn hình Đăng nhập.

## Status / Related bugs
Failed / BUG-FR23-001
