# TC-FR02-DT-009: Từ chối đăng nhập khi mật khẩu để trống

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Giá trị danh nghĩa hợp lệ được dùng để isolate Mật khẩu trống. |
| Password | String / password input | Người dùng phải nhập Mật khẩu; trường Mật khẩu phải dùng `type="password"`; cách thông báo khi trống Chưa được đặc tả. |
| Token storage | Client state | Đăng nhập thất bại không được tạo/lưu token. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-009 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-I02: mật khẩu trống | Tài khoản không bị khóa | Form không chấp nhận đăng nhập khi mật khẩu trống; không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Để trống trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát validation và trạng thái đăng nhập.

## Expected result
Form không chấp nhận đăng nhập khi Mật khẩu để trống. Người dùng vẫn ở trạng thái chưa đăng nhập và không có token mới được lưu phía client. Nội dung thông báo lỗi cụ thể: Chưa được đặc tả.

## Status / Related bugs
Fail / Pending
