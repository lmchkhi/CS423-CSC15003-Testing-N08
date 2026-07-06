# TC-FR02-ST-001: Đăng nhập thành công và sử dụng JWT token (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại theo SRS và đang không bị khóa.
- Có thể dùng một endpoint yêu cầu xác thực, ví dụ `GET /api/orders/my-orders`, để kiểm tra header `Authorization: Bearer <token>`.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ từ lần login hiện tại. |
| S5: Authenticated session | Login thành công, response có JWT token và token được dùng cho request cần xác thực. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T1 | S0 | Submit valid credentials | Email đúng format và mật khẩu đúng | S5 | Login thành công; response có JWT token và thông tin user. |
| T9 | S5 | Use returned token | JWT token hợp lệ đã được trả về | S5 | Request cần xác thực gửi header `Authorization: Bearer <token>`. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-001 | T1, T9 | Valid transition / Security coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` đang không bị khóa.
- Failed-login counter của tài khoản ở trạng thái chưa ảnh hưởng tới login thành công.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Password | `Test1234!` |
| Authenticated endpoint | `GET /api/orders/my-orders` hoặc endpoint yêu cầu đăng nhập tương đương |

## Test steps
1. Mở màn hình Đăng nhập hoặc gọi API `POST /api/login`.
2. Nhập/gửi Email `test@eshop.com` và Password `Test1234!`.
3. Quan sát response đăng nhập.
4. Lấy JWT token từ response hoặc client storage.
5. Gọi một endpoint yêu cầu xác thực với header `Authorization: Bearer <token>`.

## Expected result
Hệ thống chuyển từ S0 sang S5: đăng nhập thành công, trả JWT token và thông tin user. Request có header `Authorization: Bearer <token>` được xử lý như authenticated user.

## Status / Related bugs
Passed / None
