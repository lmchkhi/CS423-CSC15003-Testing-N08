# TC-FR02-DT-001: Đăng nhập thành công với tài khoản hợp lệ

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Dùng `type="email"`, validate HTML5 format; với login thành công phải là email đã đăng ký. |
| Password | String / password input | Phải khớp với tài khoản tương ứng; trường password dùng `type="password"`. |
| Account lock state | System state | Tài khoản không bị khóa hoặc đã hết 30 giây tạm khóa mới có thể đăng nhập. |
| Token storage | Client state | Đăng nhập thành công trả về JWT Token và token được lưu phía client. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-001 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-V01: `Test1234!` | EC-ACCOUNT-V01: không bị khóa | Đăng nhập được chấp nhận và có trạng thái đã xác thực. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát trạng thái sau đăng nhập và thử truy cập một chức năng yêu cầu xác thực.

## Expected result
Đăng nhập được chấp nhận. Người dùng được đưa vào trạng thái đã đăng nhập, token được lưu phía client, và người dùng truy cập được chức năng yêu cầu xác thực. Không hiện thông báo lỗi đăng nhập.

## Status / Related bugs
Not Run / None
