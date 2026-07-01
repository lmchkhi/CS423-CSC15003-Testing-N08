# TC-FR02-DT-006: Từ chối đăng nhập bằng mật khẩu đúng khi tài khoản đang bị khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Email đúng format và thuộc tài khoản đã đăng ký. |
| Password | String / password input | Mật khẩu đúng vẫn không được chấp nhận nếu tài khoản đang bị khóa. |
| Account lock state | System state | Đang trong 30 giây tạm khóa là invalid cho đăng nhập. |
| Token storage | Client state | Đăng nhập bị từ chối không được tạo/lưu token. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-006 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-V01: `Test1234!` | EC-ACCOUNT-I01: đang trong 30 giây tạm khóa | Đăng nhập bị từ chối dù mật khẩu đúng; không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` vừa bị khóa do 3 lần đăng nhập sai liên tiếp và vẫn trong 30 giây tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu đúng | `Test1234!` |

## Test steps
1. Trong khi tài khoản vẫn đang bị tạm khóa, nhập `test@eshop.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát thông báo và trạng thái đăng nhập.

## Expected result
Đăng nhập bị từ chối vì tài khoản đang trong 30 giây tạm khóa. Hệ thống hiện thông báo lỗi phù hợp ở mức chung, không tạo token mới và người dùng vẫn ở trạng thái chưa đăng nhập.

## Status / Related bugs
Failed / [BUG-FR02-004](../../../../bug-reports/BUG-FR02-004.md)
