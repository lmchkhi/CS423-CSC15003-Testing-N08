# TC-FR02-DT-002: Từ chối email sai định dạng HTML5

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Dùng `type="email"` và có validate HTML5 format. |
| Password | String / password input | Giá trị danh nghĩa hợp lệ được dùng để isolate lỗi Email. |
| Token storage | Client state | Đăng nhập thất bại không được tạo/lưu token. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-002 | EC-EMAIL-I01: `abc` | EC-PASSWORD-V01: `Test1234!` | Tài khoản không bị khóa | Form chặn submit hoặc báo lỗi format email; không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `abc` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `abc` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát validation của trường Email và trạng thái đăng nhập.

## Expected result
Form không chấp nhận giá trị email sai định dạng theo HTML5. Đăng nhập không được thực hiện thành công, người dùng vẫn ở trạng thái chưa đăng nhập, và không có token mới được lưu phía client.

## Status / Related bugs
Fail / [BUG-FR02-002](../../../../bug-reports/BUG-FR02-002.md)
