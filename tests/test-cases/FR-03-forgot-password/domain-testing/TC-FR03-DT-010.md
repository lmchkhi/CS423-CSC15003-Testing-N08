# TC-FR03-DT-010: Đặt lại mật khẩu với mật khẩu mới yếu (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Mật khẩu mới | String | Invalid: không thỏa mãn yêu cầu mật khẩu mạnh của FR-01 |
| OTP | String | Valid: OTP 6 chữ số đúng cho email |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | password |
| Xác nhận mật khẩu mới | password |

## Test steps
1. Từ Bước 1, lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới: `password`.
4. Nhập Xác nhận mật khẩu mới: `password`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu và hiển thị lỗi mật khẩu mới không đủ mạnh.

## Status / Related bugs
Not Run / None
