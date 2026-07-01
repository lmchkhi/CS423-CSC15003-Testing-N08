# TC-FR02-DT-008: Từ chối đăng nhập khi email để trống

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Người dùng phải nhập Email; cách thông báo khi trống Chưa được đặc tả. |
| Password | String / password input | Giá trị danh nghĩa hợp lệ được dùng để isolate Email trống. |
| Token storage | Client state | Đăng nhập thất bại không được tạo/lưu token. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-008 | EC-EMAIL-I02: email trống | EC-PASSWORD-V01: `Test1234!` | Tài khoản không bị khóa | Form không chấp nhận đăng nhập khi email trống; không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Để trống trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát validation và trạng thái đăng nhập.

## Expected result
Form không chấp nhận đăng nhập khi Email để trống. Người dùng vẫn ở trạng thái chưa đăng nhập và không có token mới được lưu phía client. Nội dung thông báo lỗi cụ thể: Chưa được đặc tả.

## Status / Related bugs
Passed / None
