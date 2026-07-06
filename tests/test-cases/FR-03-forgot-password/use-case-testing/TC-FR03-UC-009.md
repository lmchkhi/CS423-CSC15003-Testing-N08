# TC-FR03-UC-009: Không reset với mật khẩu mới yếu (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Đã có OTP hợp lệ để lỗi được cô lập ở mật khẩu mới.

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
| Trigger | Actor submit mật khẩu mới yếu |
| Preconditions | Đã lấy OTP hợp lệ |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-07 | Exception | Mật khẩu mới yếu/không đáp ứng rule FR-01 | Reset bị từ chối; mật khẩu không đổi |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-009 | EF-07 | Bao phủ exception password strength |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | OTP hợp lệ vừa hiển thị |
| Mật khẩu mới | `weakpass` |
| Xác nhận mật khẩu mới | `weakpass` |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở bước reset, nhập OTP hợp lệ.
3. Nhập mật khẩu mới yếu `weakpass` và xác nhận `weakpass`.
4. Submit đặt lại mật khẩu.
5. Quan sát response/message.

## Expected result
Hệ thống từ chối reset vì mật khẩu mới không đáp ứng rule FR-01, hiển thị lỗi password strength và không đổi mật khẩu.

## Status / Related bugs
Failed / BUG-FR03-UC-007
