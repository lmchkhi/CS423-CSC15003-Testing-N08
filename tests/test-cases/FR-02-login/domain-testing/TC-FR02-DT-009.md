# TC-FR02-DT-009: Đăng nhập lại thành công sau khi hết thời gian khóa 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh người dùng có thể đăng nhập lại bằng thông tin đúng tại hoặc sau khi thời gian khóa 30 giây kết thúc.

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
| Miền hết khóa | Tại hoặc sau `30` giây kể từ thời điểm bị khóa |
| Thời gian chờ khi chạy thủ công | Ít nhất `31` giây sau thời điểm bị khóa |

## Test steps
1. Chờ đến tại hoặc sau 30 giây kể từ thời điểm tài khoản bị khóa; khi chạy thủ công, dùng ít nhất 31 giây để giảm rủi ro timing.
2. Nhập `test@eshop.com` vào trường Email.
3. Nhập `Test1234!` vào trường Mật khẩu.
4. Bấm nút đăng nhập.
5. Quan sát trạng thái đăng nhập và JWT Token được trả về.

## Expected result
Hệ thống chấp nhận đăng nhập tại hoặc sau khi hết thời gian khóa 30 giây. Hệ thống trả JWT Token và người dùng được vào khu vực đã đăng nhập. Việc client lưu/gửi token cho request xác thực được kiểm tra riêng ở `TC-FR02-DT-010`.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-009
- Equivalence class: EC-PASSWORD-V01, EC-LOCK-V02, EC-TOKEN-V01, DC-03, DC-05
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
