# TC-FR02-ST-002: Sai mật khẩu lần 1 chưa khóa tài khoản (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản test đang không bị khóa và failed-login counter bắt đầu từ 0.
- SRS không nêu exact message; expected chỉ kiểm tra login bị từ chối, không có JWT và message phù hợp/không lộ chi tiết nguyên nhân.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S1: Failed count = 1 | Sau 1 lần nhập sai liên tiếp; hệ thống báo lỗi nhưng chưa khóa tài khoản. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T2 | S0 | Submit wrong password | Email đúng format nhưng mật khẩu sai, số lần sai liên tiếp trước event nhỏ hơn 2 | S1 | Login thất bại; bộ đếm tăng lên đúng 1; chưa khóa; không trả JWT. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-002 | T2 | Invalid transition / Error transition |

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
2. Nhập/gửi Email `test@eshop.com`.
3. Nhập/gửi Password sai `WrongPassword123!`.
4. Quan sát response/message và token.
5. Thử đăng nhập lại ngay bằng password đúng `Test1234!` để xác nhận tài khoản chưa bị khóa nếu cần.

## Expected result
Hệ thống chuyển từ S0 sang S1: login bị từ chối, không trả JWT, hiển thị thông báo lỗi phù hợp và chưa khóa tài khoản sau lần sai đầu tiên.

## Status / Related bugs
Passed / None
