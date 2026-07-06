# TC-FR03-UC-006: Không reset khi chưa lấy OTP hợp lệ (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Có thể truy cập bước reset hoặc gọi API reset-password mà chưa có OTP hợp lệ để kiểm tra precondition của use case.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Reset password |
| Trigger | Actor submit reset khi chưa lấy OTP |
| Preconditions | Chưa có OTP hợp lệ cho email trong phiên test hiện tại |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-04 | Exception | Actor cố reset khi chưa lấy OTP hợp lệ | Reset bị từ chối; mật khẩu không đổi |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-006 | EF-04 | Bao phủ lỗi precondition của use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Chưa lấy OTP cho `test@eshop.com` trong phiên test hiện tại.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | `123456` hoặc giá trị không phải OTP hợp lệ hiện tại |
| Mật khẩu mới | `NewPass123!` |
| Xác nhận mật khẩu mới | `NewPass123!` |

## Test steps
1. Không thực hiện bước lấy OTP cho `test@eshop.com`.
2. Mở/gửi bước đặt lại mật khẩu với email, OTP giả, mật khẩu mới và confirm hợp lệ.
3. Quan sát response/message.

## Expected result
Hệ thống từ chối reset vì chưa có OTP hợp lệ, không đổi mật khẩu và hiển thị thông báo yêu cầu OTP hợp lệ.

## Status / Related bugs
Passed / None
