# TC-FR03-UC-012: Request OTP lại cho cùng email đã đăng ký (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Chỉ chạy test này nếu UI/API cho phép request OTP lại cho cùng email trong luồng quên mật khẩu.
- Nếu UI không có chức năng request OTP lại, ghi kết quả Blocked/Not Applicable trong test run thay vì sửa expected theo implementation.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Lấy lại OTP để tiếp tục reset password |
| Trigger | Actor request OTP lại cho cùng email |
| Preconditions | Actor đã ở hoặc quay lại bước lấy OTP; email đã đăng ký |
| Success postconditions | OTP mới được sinh/hiển thị; mật khẩu chưa đổi cho đến khi reset thành công |
| Failure postconditions | Không sinh OTP mới nếu retry không được hỗ trợ; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| AF-02 | Alternative | Actor request OTP lại cho cùng email đã đăng ký nếu UI/API cho phép retry | OTP mới được sinh/hiển thị; flow vẫn cho reset bằng OTP hợp lệ mới |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-012 | AF-02 | Bao phủ optional alternative flow request OTP lại |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `test@eshop.com` đã đăng ký.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |

## Test steps
1. Mở trang Quên mật khẩu.
2. Nhập Email `test@eshop.com` và gửi yêu cầu lấy OTP lần 1.
3. Ghi nhận rằng OTP đầu tiên được sinh/hiển thị, không ghi OTP thật vào log public.
4. Thực hiện thao tác request OTP lại cho cùng email nếu UI/API hỗ trợ.
5. Quan sát OTP/message sau lần request lại.

## Expected result
Nếu flow retry được hỗ trợ, hệ thống sinh/hiển thị OTP mới hợp lệ cho `test@eshop.com`, vẫn giữ actor trong flow reset password và chưa đổi mật khẩu cho đến khi submit reset thành công.

## Status / Related bugs
Failed / BUG-FR03-UC-001
