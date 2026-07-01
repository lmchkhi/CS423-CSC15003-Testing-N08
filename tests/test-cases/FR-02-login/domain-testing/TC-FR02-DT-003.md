# TC-FR02-DT-003: Từ chối email đúng định dạng nhưng không tồn tại

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Email đúng format nhưng phải tương ứng với tài khoản có thể đăng nhập. |
| Password | String / password input | Giá trị danh nghĩa hợp lệ được dùng để isolate miền Email không tồn tại. |
| Account existence | System state | Email có thể tồn tại hoặc không tồn tại trong hệ thống. |
| Token storage | Client state | Đăng nhập thất bại không được tạo/lưu token. |

### Domain Matrix

| TC | Email | Password | Account state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-003 | EC-EMAIL-V02: `notfound.fr02@example.com` | EC-PASSWORD-V01: `Test1234!` | Email không có tài khoản | Đăng nhập bị từ chối bằng thông báo lỗi chung; không lộ nguyên nhân; không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `notfound.fr02@example.com` không thuộc tài khoản có thể đăng nhập trong hệ thống.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `notfound.fr02@example.com` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `notfound.fr02@example.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Thực hiện đăng nhập.
4. Quan sát thông báo lỗi và trạng thái đăng nhập.

## Expected result
Đăng nhập bị từ chối. Hệ thống hiện thông báo lỗi phù hợp ở mức chung, không nói rõ email không tồn tại hay mật khẩu sai. Người dùng vẫn ở trạng thái chưa đăng nhập và không có token mới được lưu phía client.

## Status / Related bugs
Pass / None
