# TC-FR02-DT-007: Khóa tài khoản sau 3 lần đăng nhập sai liên tiếp

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh tài khoản bị tạm khóa 30 giây sau khi đăng nhập sai 3 lần liên tiếp.

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
| Số lần nhập sai liên tiếp | `3` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Nhập `Wrong123!` vào trường Mật khẩu.
3. Bấm nút đăng nhập và ghi nhận kết quả bị từ chối.
4. Lặp lại bước 1 đến bước 3 thêm 2 lần nữa, tổng cộng 3 lần sai liên tiếp.
5. Quan sát trạng thái đăng nhập và thông báo sau lần sai thứ 3.

## Expected result
Cả 3 lần đăng nhập sai đều không trả JWT Token và không tạo phiên đăng nhập mới. Sau lần sai thứ 3, tài khoản bị tạm khóa trong 30 giây và hệ thống hiển thị thông báo lỗi phù hợp, không tiết lộ chi tiết nguyên nhân xác thực.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-007
- Equivalence class: EC-PASSWORD-I02, EC-FAILEDCOUNT-I01, EC-LOCK-I01, EC-TOKEN-I01, DC-02, DC-03
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
