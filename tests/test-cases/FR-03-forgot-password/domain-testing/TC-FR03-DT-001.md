# TC-FR03-DT-001: Lấy OTP thành công với email đã đăng ký (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Bắt buộc, định dạng email hợp lệ, phải là email đã đăng ký |
| UI step state | State | Bước 1 phải hiển thị Step Indicator và nút Quay lại đăng nhập |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `test@eshop.com` đã tồn tại trong hệ thống.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |

## Test steps
1. Mở trang Quên mật khẩu (`/forgot-password`).
2. Quan sát Step Indicator ở bước lấy OTP.
3. Nhập Email: `test@eshop.com`.
4. Bấm nút gửi/lấy mã OTP.

## Expected result
Hệ thống chấp nhận email đã đăng ký, sinh OTP 6 chữ số và hiển thị trực tiếp trên màn hình demo; giao diện chuyển sang bước đặt lại mật khẩu hoặc cho phép tiếp tục bước 2.

## Status / Related bugs
Failed / BUG-FR03-001
