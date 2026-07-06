# TC-FR02-ST-004: Sai mật khẩu lần 3 liên tiếp khóa tài khoản 30 giây (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản test đang không bị khóa và failed-login counter bắt đầu từ 0.
- Ba lần sai được thực hiện liên tiếp cho cùng một tài khoản.
- SRS yêu cầu khóa tạm 30 giây trong môi trường demo.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S1: Failed count = 1 | Sau 1 lần nhập sai liên tiếp; chưa khóa. |
| S2: Failed count = 2 | Sau 2 lần nhập sai liên tiếp; chưa khóa. |
| S3: Account locked | Sau lần sai thứ 3 trở lên liên tiếp; tài khoản bị khóa tạm 30 giây. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T2 | S0 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 0 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa. |
| T3 | S1 | Submit wrong password | Email đúng format, mật khẩu sai, failed count trước event = 1 | S2 | Login thất bại lần 2; bộ đếm tăng lên đúng 1; chưa khóa. |
| T4 | S2 | Submit wrong password | Email đúng format, mật khẩu sai, failed count sau event đạt 3 | S3 | Login thất bại lần 3; tài khoản bị khóa tạm 30 giây; không trả JWT. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-004 | T2, T3, T4 | Invalid transition / Sequence coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại, đang không bị khóa và failed-login counter đang ở 0.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Wrong password | `WrongPassword123!` |
| Lock duration | 30 giây |

## Test steps
1. Mở màn hình Đăng nhập hoặc gọi API `POST /api/login`.
2. Submit lần 1 với Email `test@eshop.com` và Password `WrongPassword123!`.
3. Submit lần 2 liên tiếp với cùng Email và Password sai.
4. Submit lần 3 liên tiếp với cùng Email và Password sai.
5. Quan sát response/message sau lần sai thứ 3.

## Expected result
Hệ thống đi theo chuỗi S0 -> S1 -> S2 -> S3: lần sai thứ 3 làm tài khoản bị khóa tạm 30 giây, không trả JWT và hiển thị thông báo lỗi phù hợp, không để lộ chi tiết nguyên nhân.

## Status / Related bugs
Passed / BUG-FR02-002
