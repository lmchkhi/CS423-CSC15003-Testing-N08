# TC-FR02-DT-004: Từ chối đăng nhập khi mật khẩu bị bỏ trống

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh hệ thống không cho đăng nhập khi người dùng không nhập Mật khẩu. Đây là điều kiện kiểm thử suy ra từ yêu cầu người dùng nhập Mật khẩu, không phải rule `required` được FR-02 đặc tả trực tiếp.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Để trống trường Mật khẩu.
3. Bấm nút đăng nhập.

## Expected result
Hệ thống chặn submit hoặc từ chối đăng nhập vì thiếu Mật khẩu theo cơ chế validation hiện có. Không trả JWT Token, không chuyển người dùng vào khu vực đã đăng nhập, và không tạo phiên đăng nhập mới. FR-02 chưa đặc tả thông báo hoặc thuộc tính `required` cụ thể cho trường rỗng.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-004
- Equivalence class: EC-PASSWORD-I01, EC-TOKEN-I01
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
