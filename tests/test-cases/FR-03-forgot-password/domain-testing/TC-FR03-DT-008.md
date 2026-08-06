# TC-FR03-DT-008: Đặt lại mật khẩu với OTP sai (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| OTP | String | Invalid: 6 chữ số nhưng không khớp OTP đã sinh |
| Mật khẩu mới | String | Valid: thỏa mãn rule FR-01 |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.
- OTP thực tế khác `000000`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 000000 |
| Mật khẩu mới | NewPass123! |
| Xác nhận mật khẩu mới | NewPass123! |

## Test steps
1. Từ Bước 1, lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP sai: `000000`.
3. Nhập Mật khẩu mới: `NewPass123!`.
4. Nhập Xác nhận mật khẩu mới: `NewPass123!`.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu và hiển thị lỗi OTP sai; mật khẩu hiện tại không bị thay đổi.

## Status / Related bugs
Failed / BUG-FR03-004, BUG-FR03-005
