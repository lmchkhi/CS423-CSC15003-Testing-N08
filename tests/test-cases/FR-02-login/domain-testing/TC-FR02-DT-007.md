# TC-FR02-DT-007: Đăng nhập lại thành công sau khi hết 30 giây tạm khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Email đúng format và thuộc tài khoản đã đăng ký. |
| Password | String / password input | Mật khẩu khớp với tài khoản tương ứng. |
| Account lock state | System state | Tạm khóa kéo dài 30 giây trong môi trường demo; sau khi hết thời gian khóa, tài khoản có thể đăng nhập lại nếu credential đúng. |
| Token storage | Client state | Đăng nhập thành công trả về JWT Token và token được lưu phía client. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-007 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-V01: `Test1234!` | EC-ACCOUNT-V02: đã qua hơn 30 giây từ lúc bị khóa | Đăng nhập được chấp nhận lại và có trạng thái đã xác thực. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` đã bị khóa do 3 lần sai liên tiếp.
- Đã đợi hơn 30 giây kể từ lúc tài khoản bị tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Thời gian chờ | Hơn 30 giây sau khi bị tạm khóa |

## Test steps
1. Chờ đến khi qua hơn 30 giây kể từ lúc tài khoản bị tạm khóa.
2. Nhập `test@eshop.com` vào trường Email.
3. Nhập `Test1234!` vào trường Mật khẩu.
4. Thực hiện đăng nhập.
5. Quan sát trạng thái sau đăng nhập và thử truy cập một chức năng yêu cầu xác thực.

## Expected result
Đăng nhập được chấp nhận lại sau khi hết 30 giây tạm khóa. Token được lưu phía client, người dùng vào trạng thái đã đăng nhập và truy cập được chức năng yêu cầu xác thực.

## Status / Related bugs
Not Run / None
