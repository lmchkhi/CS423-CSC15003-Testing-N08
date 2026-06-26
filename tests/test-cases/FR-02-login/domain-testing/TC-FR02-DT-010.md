# TC-FR02-DT-010: Gửi Authorization header cho request cần xác thực sau khi đăng nhập

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Mục tiêu kiểm thử
Xác minh sau khi đăng nhập thành công và nhận JWT Token, client lưu token và gửi token trong header `Authorization: Bearer <token>` cho request cần xác thực.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không bị khóa tại thời điểm test.
- Người dùng có thể quan sát request bằng browser devtools, proxy, hoặc công cụ kiểm thử tương đương.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Request cần xác thực | Mở trang hồ sơ cá nhân hoặc thao tác khác yêu cầu đăng nhập |

## Test steps
1. Đăng nhập bằng `test@eshop.com` và `Test1234!`.
2. Xác nhận đăng nhập thành công và có JWT Token.
3. Mở công cụ theo dõi network hoặc nơi lưu token phía client.
4. Thực hiện một request cần xác thực, ví dụ mở trang hồ sơ cá nhân.
5. Quan sát header của request cần xác thực.

## Expected result
Client lưu JWT Token sau khi đăng nhập thành công. Request cần xác thực có header `Authorization: Bearer <token>`. Nếu không quan sát được header bằng công cụ hiện tại, ghi nhận là bị chặn do thiếu khả năng quan sát thay vì kết luận Pass/Fail.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-DT-010
- Equivalence class: EC-TOKEN-V02, DC-06
- Analysis file: `analysis/FR-02-login/domain-testing-analysis.md`

## Status / Related bugs
Not Run / None
