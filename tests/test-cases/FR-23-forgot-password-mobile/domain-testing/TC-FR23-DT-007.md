# TC-FR23-DT-007: Mobile không cho đặt lại mật khẩu khi chưa lấy OTP (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Trạng thái luồng | State | Invalid: chưa lấy OTP hợp lệ cho email trước khi reset |
| OTP | String | Nominal: dùng chuỗi có dạng 6 chữ số để cô lập lỗi trạng thái |
| Mật khẩu mới | String | Nominal: mật khẩu mạnh hợp lệ |
| Xác nhận mật khẩu mới | String | Nominal: khớp mật khẩu mới |

## Preconditions
- Ứng dụng mobile đang ở màn hình Quên mật khẩu.
- Chưa thực hiện bước lấy OTP cho `test@eshop.com` trong phiên hiện tại.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | 123456 |
| Mật khẩu mới | MobileNew123! |
| Xác nhận mật khẩu mới | MobileNew123! |

## Test steps
1. Mở màn hình Quên mật khẩu trên mobile.
2. Không thực hiện bước lấy OTP hợp lệ.
3. Nếu có thể truy cập bước đặt lại mật khẩu, nhập OTP `123456`.
4. Nhập Mật khẩu mới và Xác nhận mật khẩu mới hợp lệ.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Ứng dụng không đặt lại mật khẩu; hệ thống từ chối vì chưa có OTP hợp lệ gắn với email đã yêu cầu.

## Status / Related bugs
Passed / BUG-FR23-004
