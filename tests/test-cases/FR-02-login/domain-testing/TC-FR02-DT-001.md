# TC-FR02-DT-001: Đăng nhập thành công với tài khoản hợp lệ và lưu JWT Token

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh người dùng đăng nhập thành công khi email và mật khẩu hợp lệ, hệ thống trả JWT Token và client gửi token cho request cần xác thực.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không bị khóa tại thời điểm test.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |

## Test steps
1. Nhập `test@eshop.com` vào trường Email.
2. Nhập `Test1234!` vào trường Mật khẩu.
3. Bấm nút đăng nhập.
4. Mở công cụ theo dõi network hoặc nơi lưu token phía client.
5. Thực hiện một thao tác cần xác thực, ví dụ mở trang hồ sơ cá nhân.

## Expected result
Hệ thống chấp nhận đăng nhập, client nhận và lưu JWT Token. Request cần xác thực sau đó có header `Authorization: Bearer <token>`. Không hiển thị lỗi đăng nhập.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-001
- Equivalence class: EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
