# TC-FR02-ST-003: Sai mật khẩu lần 2 liên tiếp vẫn chưa khóa tài khoản (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản test đang không bị khóa và failed-login counter bắt đầu từ 0.
- Hai lần sai được thực hiện liên tiếp cho cùng một tài khoản.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S1: Failed count = 1 | Sau 1 lần nhập sai liên tiếp; chưa khóa tài khoản. |
| S2: Failed count = 2 | Sau 2 lần nhập sai liên tiếp; vẫn chưa khóa tài khoản. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T2 | S0 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 0 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa; không trả JWT. |
| T3 | S1 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 1 | S2 | Login thất bại lần 2; bộ đếm tăng lên đúng 1; chưa khóa; không trả JWT. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-003 | T2, T3 | Invalid transition / Sequence coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại, đang không bị khóa và failed-login counter đang ở 0.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Wrong password | `WrongPassword123!` |

## Test steps
1. Mở màn hình Đăng nhập hoặc gọi API `POST /api/login`.
2. Submit lần 1 với Email `test@eshop.com` và Password `WrongPassword123!`.
3. Submit lần 2 liên tiếp với cùng Email và Password sai.
4. Quan sát response/message sau lần sai thứ 2.
5. Thử đăng nhập lại ngay bằng password đúng `Test1234!` để xác nhận tài khoản chưa bị khóa nếu cần.

## Expected result
Hệ thống đi theo chuỗi S0 -> S1 -> S2: cả hai lần login sai đều bị từ chối và không trả JWT; sau lần sai thứ 2 tài khoản vẫn chưa bị khóa.

## Status / Related bugs
Failed / BUG-FR02-001, BUG-FR02-002
