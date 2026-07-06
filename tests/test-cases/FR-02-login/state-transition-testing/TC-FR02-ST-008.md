# TC-FR02-ST-008: Sai 1 lần rồi đăng nhập đúng thành công (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản test đang không bị khóa và failed-login counter bắt đầu từ 0.
- Một lần đăng nhập thành công kết thúc chuỗi đăng nhập sai liên tiếp.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S1: Failed count = 1 | Sau 1 lần nhập sai liên tiếp; chưa khóa. |
| S5: Authenticated session | Login thành công, response có JWT token và thông tin user. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T2 | S0 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 0 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa; không trả JWT. |
| T10 | S1 | Submit valid credentials | Email đúng format và mật khẩu đúng | S5 | Đăng nhập thành công sau 1 lần sai; chuỗi sai liên tiếp kết thúc; response có JWT token. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-008 | T2, T10 | Valid transition after error / Sequence coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại, đang không bị khóa và failed-login counter đang ở 0.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Wrong password | `WrongPassword123!` |
| Correct password | `Test1234!` |

## Test steps
1. Mở màn hình Đăng nhập hoặc gọi API `POST /api/login`.
2. Submit lần 1 với Email `test@eshop.com` và Password sai `WrongPassword123!`.
3. Ngay sau đó submit lại với Email `test@eshop.com` và Password đúng `Test1234!`.
4. Quan sát response đăng nhập và token.

## Expected result
Hệ thống đi theo chuỗi S0 -> S1 -> S5: lần sai đầu bị từ chối và không khóa tài khoản; lần login đúng ngay sau đó thành công, trả JWT token và thông tin user.

## Status / Related bugs
Passed / None
