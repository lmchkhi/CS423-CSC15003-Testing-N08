# TC-FR02-DT-008: Từ chối đăng nhập đúng mật khẩu khi tài khoản đang bị khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh tài khoản đang trong 30 giây khóa vẫn bị từ chối đăng nhập dù người dùng nhập đúng mật khẩu.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` đang trong 30 giây khóa sau 3 lần đăng nhập sai liên tiếp.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Trạng thái tài khoản | Đang bị khóa trong 30 giây |

## Test steps
1. Trong vòng 30 giây sau khi tài khoản bị khóa, nhập `test@eshop.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.
4. Quan sát trạng thái đăng nhập và thông báo.

## Expected result
Hệ thống từ chối đăng nhập dù mật khẩu đúng, không trả JWT Token, không tạo phiên đăng nhập mới. Hệ thống hiển thị thông báo lỗi phù hợp với trạng thái bị khóa và không tiết lộ chi tiết nguyên nhân xác thực.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-008
- Equivalence class: EC-PASSWORD-V01, EC-LOCK-I01, EC-TOKEN-I01, DC-04
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
