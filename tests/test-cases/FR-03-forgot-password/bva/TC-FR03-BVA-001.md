# TC-FR03-BVA-001: OTP đúng 6 chữ số (ON - độ dài OTP) (Boundary Value Analysis)

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
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | BvaPass123! |
| Xác nhận mật khẩu mới | BvaPass123! |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Kiểm tra OTP hiển thị có đúng 6 chữ số.
3. Nhập OTP 6 chữ số đó ở Bước 2.
4. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống chấp nhận OTP đúng 6 chữ số thuộc email đã yêu cầu và đặt lại mật khẩu thành công.

## Status / Related bugs
Failed / BUG-FR03-001, BUG-FR03-004, BUG-FR03-005
