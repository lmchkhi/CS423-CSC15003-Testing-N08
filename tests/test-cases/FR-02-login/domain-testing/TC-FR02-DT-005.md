# TC-FR02-DT-005: Từ chối đăng nhập với email không tồn tại và không lộ nguyên nhân

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh hệ thống từ chối đăng nhập khi email không thuộc tài khoản nào và thông báo lỗi không tiết lộ chi tiết nguyên nhân.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `unknown-login-fr02@example.com` không thuộc tài khoản nào trong hệ thống.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `unknown-login-fr02@example.com` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `unknown-login-fr02@example.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.
4. Quan sát thông báo lỗi và trạng thái đăng nhập.

## Expected result
Hệ thống từ chối đăng nhập, không trả JWT Token, không tạo phiên đăng nhập mới. Thông báo lỗi không tiết lộ chi tiết rằng email không tồn tại hay mật khẩu sai.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-005
- Equivalence class: EC-EMAIL-V01, EC-ACCOUNT-I01, EC-TOKEN-I01, DC-01
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
