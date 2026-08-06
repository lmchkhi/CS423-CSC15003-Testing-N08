# TC-FR23-DT-009: Mobile không dùng OTP của email khác để đặt lại mật khẩu (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Email mục tiêu cần reset password |
| OTP ownership | Relation | Invalid: OTP được sinh cho email khác, không thuộc email mục tiêu |
| Mật khẩu mới | String | Nominal: mật khẩu mạnh hợp lệ |
| Xác nhận mật khẩu mới | String | Nominal: khớp mật khẩu mới |

## Preconditions
- Email `test@eshop.com` đã tồn tại.
- Email `fr23.other@example.com` đã tồn tại hoặc được chuẩn bị làm tài khoản phụ.
- Đã lấy OTP cho `fr23.other@example.com`.

## Test data

| Field | Value |
| --- | --- |
| Email reset | test@eshop.com |
| OTP | OTP 6 chữ số của `fr23.other@example.com` |
| Mật khẩu mới | MobileNew123! |
| Xác nhận mật khẩu mới | MobileNew123! |

## Test steps
1. Trên mobile hoặc qua API công khai, lấy OTP cho `fr23.other@example.com`.
2. Mở bước đặt lại mật khẩu cho `test@eshop.com`.
3. Nhập OTP của `fr23.other@example.com`.
4. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu vì OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

## Status / Related bugs
Blocked / BUG-FR23-001
