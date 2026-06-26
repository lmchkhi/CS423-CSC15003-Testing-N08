# TC-FR02-DT-006: Từ chối lần đăng nhập sai đầu tiên nhưng chưa khóa tài khoản

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh một lần đăng nhập sai với tài khoản hợp lệ bị từ chối, không trả JWT Token và chưa làm tài khoản bị khóa.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` không bị khóa và có 0 lần đăng nhập sai liên tiếp trước khi test.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu sai | `Wrong123!` |
| Mật khẩu đúng để kiểm tra chưa khóa | `Test1234!` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Nhập `Wrong123!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.
4. Sau khi bị từ chối, nhập lại `test@eshop.com` và `Test1234!`.
5. Bấm nút đăng nhập.

## Expected result
Lần đăng nhập với `Wrong123!` bị từ chối, không trả JWT Token và không tạo phiên đăng nhập mới. Lần đăng nhập ngay sau đó với `Test1234!` không bị chặn bởi trạng thái khóa; nếu không có lỗi khác, hệ thống đăng nhập thành công.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-006
- Equivalence class: EC-PASSWORD-I02, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-I01, DC-02
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
