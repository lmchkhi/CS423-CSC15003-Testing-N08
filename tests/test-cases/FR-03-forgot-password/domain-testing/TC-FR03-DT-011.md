# TC-FR03-DT-011: Đặt lại mật khẩu khi xác nhận mật khẩu không khớp (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Xác nhận mật khẩu mới | String | Invalid: không khớp Mật khẩu mới |
| Mật khẩu mới | String | Valid: thỏa mãn rule FR-01 |
| OTP | String | Valid: OTP 6 chữ số đúng cho email |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | NewPass123! |
| Xác nhận mật khẩu mới | NewPass124! |

## Test steps
1. Từ Bước 1, lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP hợp lệ.
3. Nhập Mật khẩu mới: `NewPass123!`.
4. Nhập Xác nhận mật khẩu mới: `NewPass124!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu và hiển thị lỗi xác nhận mật khẩu mới không khớp.

## Status / Related bugs
Not Run / None
