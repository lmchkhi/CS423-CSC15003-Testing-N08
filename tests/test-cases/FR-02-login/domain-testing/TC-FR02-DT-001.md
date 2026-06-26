# TC-FR02-DT-001: Đăng nhập thành công với tài khoản hợp lệ và nhận JWT Token

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh người dùng đăng nhập thành công khi email và mật khẩu hợp lệ, và hệ thống trả JWT Token.

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
4. Quan sát kết quả đăng nhập và JWT Token được trả về hoặc trạng thái đã đăng nhập của client; nếu quan sát ở mức API, login là `POST http://localhost:3000/api/login` với body JSON `{"email":"test@eshop.com","password":"Test1234!"}`.

## Expected result
Hệ thống chấp nhận đăng nhập và trả JWT Token. Nếu quan sát phản hồi API, `POST /api/login` trả `200 OK` với chuỗi JWT `token` và thông tin `user`. Người dùng có phiên đăng nhập mới hoặc được chuyển vào khu vực đã đăng nhập. Không hiển thị lỗi đăng nhập.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-001
- Equivalence class: EC-EMAIL-V01, EC-ACCOUNT-V01, EC-PASSWORD-V01, EC-FAILEDCOUNT-V01, EC-LOCK-V01, EC-TOKEN-V01, DC-01, DC-05
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
