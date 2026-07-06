# TC-FR02-ST-007: Email sai định dạng bị chặn trước khi submit login (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Test này kiểm tra UI Web vì SRS yêu cầu trường email dùng `type="email"` và có validate HTML5 format.
- Nếu gọi API trực tiếp với email sai định dạng, kết quả được ghi như API-level observation riêng, không thay thế expected result UI.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S0: Login form ready | Người dùng ở form đăng nhập, chưa có JWT token hợp lệ. |
| S6: Client-side validation blocked | Email sai định dạng bị chặn ở UI trước khi submit do field email dùng `type="email"`. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T8 | S0 | Submit invalid email format | Email sai định dạng | S6 | UI chặn submit; không gọi API login; không tăng failed counter. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-007 | T8 | Invalid transition / UI validation |

## Preconditions
- Hệ thống EShop Web đang hoạt động.
- Người dùng đang ở màn hình Đăng nhập.
- Có thể quan sát network request bằng DevTools hoặc công cụ tương đương nếu cần.

## Test data

| Field | Value |
| --- | --- |
| Email | `invalid-email` |
| Password | `WrongPassword123!` |

## Test steps
1. Mở màn hình Đăng nhập trên Web.
2. Nhập Email `invalid-email`.
3. Nhập Password bất kỳ, ví dụ `WrongPassword123!`.
4. Bấm nút Đăng nhập.
5. Quan sát HTML5 validation message và network request.

## Expected result
Hệ thống chuyển từ S0 sang S6: browser/UI chặn submit do email sai định dạng, không gọi `POST /api/login`, không trả JWT và không làm tăng failed-login counter.

## Status / Related bugs
Failed / BUG-FR02-003
