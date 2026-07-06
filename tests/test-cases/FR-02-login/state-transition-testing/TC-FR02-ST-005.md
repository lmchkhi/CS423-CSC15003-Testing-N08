# TC-FR02-ST-005: Từ chối đăng nhập bằng mật khẩu đúng khi tài khoản đang bị khóa (State Transition Testing)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / State Transition Testing

## Assumptions
- Tài khoản đã bị đưa vào trạng thái khóa bằng 3 lần nhập sai liên tiếp.
- Thao tác login bằng credential đúng được thực hiện trong vòng 30 giây kể từ khi bị khóa.

## Test Design Reference
`tests/test-design/FR-02-login-state-transition.md`

## State Transition Analysis

### States

| State | Meaning / Observable evidence |
| --- | --- |
| S3: Account locked | Tài khoản đang bị khóa tạm thời 30 giây. |

### Transition Table

| Transition | From state | Event | Guard / Input | To state | Expected |
| --- | --- | --- | --- | --- | --- |
| T5 | S3 | Submit while locked | Lockout timer vẫn còn trong 30 giây, kể cả credential đúng | S3 | Login tiếp tục bị từ chối; không trả JWT; message không lộ chi tiết nguyên nhân. |

### Covered Transition

| TC | Transition(s) | Coverage type |
| --- | --- | --- |
| ST-005 | T5 | Invalid transition / Security coverage |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` đã bị khóa tạm thời do 3 lần đăng nhập sai liên tiếp.
- Thời điểm test vẫn nằm trong 30 giây khóa.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| Correct password | `Test1234!` |
| Lock duration | 30 giây |

## Test steps
1. Đưa tài khoản `test@eshop.com` vào trạng thái khóa bằng 3 lần submit sai liên tiếp nếu chưa có sẵn.
2. Ngay trong vòng 30 giây khóa, submit Email `test@eshop.com` và Password đúng `Test1234!`.
3. Quan sát response/message và token.

## Expected result
Hệ thống giữ tài khoản ở S3: login vẫn bị từ chối trong thời gian khóa, không trả JWT và thông báo lỗi phù hợp, không để lộ chi tiết nguyên nhân.

## Status / Related bugs
Passed / None
