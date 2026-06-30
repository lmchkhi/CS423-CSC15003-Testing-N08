# TC-FR03-DT-009: Không dùng OTP của email khác để đặt lại mật khẩu (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Assumptions
- Có thể chuẩn bị thêm tài khoản test thứ hai `fr03.other@example.com` trước khi thực thi test.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| OTP ownership | Cross-field rule | OTP chỉ hợp lệ cho email đã yêu cầu, không dùng được cho email khác |

## Preconditions
- Hệ thống EShop đang hoạt động.
- `test@eshop.com` và `fr03.other@example.com` đều là email đã đăng ký.
- Đã lấy OTP cho `fr03.other@example.com`.

## Test data

| Field | Value |
| --- | --- |
| Email cần reset | test@eshop.com |
| OTP sử dụng | OTP 6 chữ số của fr03.other@example.com |
| Mật khẩu mới | NewPass123! |
| Xác nhận mật khẩu mới | NewPass123! |

## Test steps
1. Lấy OTP cho `fr03.other@example.com`.
2. Mở/gửi bước đặt lại mật khẩu cho `test@eshop.com`.
3. Nhập OTP vừa lấy của `fr03.other@example.com`.
4. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu vì OTP không thuộc email `test@eshop.com`; mật khẩu của cả hai tài khoản không bị thay đổi.

## Status / Related bugs
Passed / BUG-FR03-005 (UI setup observation)
