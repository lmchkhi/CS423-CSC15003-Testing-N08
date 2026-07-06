# TC-FR02-ST-006: Hết 30 giây khóa rồi đăng nhập lại thành công (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản đã bị khóa sau 3 lần đăng nhập sai liên tiếp.
- Lockout timer demo là 30 giây theo SRS.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S3: Account locked | Tài khoản đang bị khóa tạm thời 30 giây. |
| S4: Lockout expired | Đã qua thời gian khóa, tài khoản có thể thử đăng nhập lại. |
| S5: Authenticated session | Login thành công, response có JWT token và thông tin user. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T6 | S3 | Wait 30 seconds | Lockout timer đã hết 30 giây | S4 | Tài khoản được phép thử đăng nhập lại. |
| T7 | S4 | Submit valid credentials | Email đúng format và mật khẩu đúng | S5 | Login thành công sau khi hết khóa; response có JWT token và thông tin user. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-006 | T6, T7 | Valid transition / Sequence coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` đã bị khóa tạm thời do 3 lần đăng nhập sai liên tiếp.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Correct password | `Test1234!` |
| Lock wait time | Ít nhất 30 giây |

## Test steps
1. Ghi nhận thời điểm tài khoản `test@eshop.com` bị khóa sau lần sai thứ 3.
2. Chờ ít nhất 30 giây.
3. Submit Email `test@eshop.com` và Password đúng `Test1234!`.
4. Quan sát response đăng nhập và token.

## Expected result
Hệ thống đi theo chuỗi S3 -> S4 -> S5: sau khi hết 30 giây khóa, credential đúng được chấp nhận, response có JWT token và thông tin user.

## Status / Related bugs
Failed / BUG-FR02-002
