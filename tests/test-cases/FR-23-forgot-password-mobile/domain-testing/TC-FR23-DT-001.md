# TC-FR23-DT-001: Mobile lấy OTP thành công với email đã đăng ký (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Assumptions
- Kiểm thử trên ứng dụng React Native/Expo, dùng API công khai giống FR-03.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Bắt buộc, định dạng email hợp lệ, phải là email đã đăng ký |
| Mobile step state | State | Màn hình mobile phải hiển thị Step Indicator và có thể chuyển sang bước đặt lại mật khẩu |

## Preconditions
- Hệ thống EShop và API đang hoạt động.
- Ứng dụng mobile đã mở ở màn hình Quên mật khẩu.
- Email `test@eshop.com` đã tồn tại trong hệ thống.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |

## Test steps
1. Mở ứng dụng mobile.
2. Từ màn hình Đăng nhập, chọn Quên mật khẩu.
3. Quan sát Step Indicator ở bước lấy OTP.
4. Nhập Email: `test@eshop.com`.
5. Bấm nút gửi/lấy mã OTP.

## Expected result
Ứng dụng chấp nhận email đã đăng ký, hệ thống sinh OTP 6 chữ số và hiển thị trực tiếp trên màn hình demo; giao diện mobile chuyển sang hoặc cho phép tiếp tục bước đặt lại mật khẩu.

## Status / Related bugs
Failed / BUG-FR23-001
