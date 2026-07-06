# TC-FR02-ST-009: Sai 2 lần rồi đăng nhập đúng thành công trước khi bị khóa (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản test đang không bị khóa và failed-login counter bắt đầu từ 0.
- Một lần đăng nhập thành công sau 2 lần sai vẫn được chấp nhận vì chưa đạt lần sai thứ 3.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S1: Failed count = 1 | Sau 1 lần nhập sai liên tiếp; chưa khóa. |
| S2: Failed count = 2 | Sau 2 lần nhập sai liên tiếp; vẫn chưa khóa. |
| S5: Authenticated session | Login thành công, response có JWT token và thông tin user. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T2 | S0 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 0 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa. |
| T3 | S1 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 1 | S2 | Login thất bại lần 2; bộ đếm tăng lên đúng 1; chưa khóa. |
| T11 | S2 | Submit valid credentials | Email đúng format và mật khẩu đúng | S5 | Đăng nhập thành công sau 2 lần sai; tài khoản không bị khóa vì chưa đạt lần sai thứ 3. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-009 | T2, T3, T11 | Valid transition after repeated errors / Sequence coverage |

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
3. Submit lần 2 liên tiếp với cùng Email và Password sai.
4. Submit lần 3 với Email `test@eshop.com` và Password đúng `Test1234!`.
5. Quan sát response đăng nhập và token.

## Expected result
Hệ thống đi theo chuỗi S0 -> S1 -> S2 -> S5: hai lần sai đầu bị từ chối nhưng chưa khóa tài khoản; lần đăng nhập đúng trước lần sai thứ 3 thành công và trả JWT token.

## Status / Related bugs
Failed / BUG-FR02-001
