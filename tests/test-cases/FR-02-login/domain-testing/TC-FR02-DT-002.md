# TC-FR02-DT-002: Từ chối đăng nhập khi email bị bỏ trống

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh hệ thống không cho đăng nhập khi người dùng không nhập Email. Đây là điều kiện kiểm thử suy ra từ yêu cầu người dùng nhập Email, không phải rule `required` được FR-02 đặc tả trực tiếp.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Để trống trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.

## Expected result
Hệ thống chặn submit hoặc từ chối đăng nhập vì thiếu Email theo cơ chế validation hiện có. Không trả JWT Token, không chuyển người dùng vào khu vực đã đăng nhập, và không tạo phiên đăng nhập mới. FR-02 chưa đặc tả thông báo hoặc thuộc tính `required` cụ thể cho trường rỗng.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-002
- Equivalence class: EC-EMAIL-I01, EC-TOKEN-I01
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
