# TC-FR02-DT-009: Đăng nhập lại thành công sau khi hết thời gian khóa 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh người dùng có thể đăng nhập lại bằng thông tin đúng sau khi thời gian khóa 30 giây kết thúc.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` vừa bị khóa do 3 lần đăng nhập sai liên tiếp.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Thời gian chờ | Ít nhất `31` giây sau thời điểm bị khóa |

## Test steps
1. Chờ ít nhất 31 giây sau thời điểm tài khoản bị khóa.
2. Nhập `test@eshop.com` vào trường Email.
3. Nhập `Test1234!` vào trường Mật khẩu.
4. Bấm nút đăng nhập.
5. Quan sát trạng thái đăng nhập và token phía client.

## Expected result
Hệ thống chấp nhận đăng nhập sau khi hết thời gian khóa. Client nhận và lưu JWT Token; người dùng được vào khu vực đã đăng nhập.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-009
- Equivalence class: EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
