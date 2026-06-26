# TC-FR02-BVA-006: Kiểm tra đăng nhập thành công sau 31 giây khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh tại 31 giây sau khi bị khóa, tài khoản đã vượt qua thời hạn khóa 30 giây và có thể đăng nhập bằng mật khẩu đúng.

## Boundary Point
- Variable: `lock_elapsed_time`
- Constraint: Tài khoản bị tạm khóa 30 giây
- Boundary type: Unlock-time threshold
- Boundary point: OFF⁺
- Test value: 31 giây sau thời điểm tài khoản bị khóa

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` vừa bị khóa do 3 lần đăng nhập sai liên tiếp.
- Người kiểm thử có đồng hồ hoặc công cụ đo thời gian từ thời điểm khóa.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Thời điểm thử lại | `31` giây sau khi tài khoản bị khóa |

## Test steps
1. Ngay sau khi tài khoản bị khóa, bắt đầu đo thời gian.
2. Chờ đến mốc 31 giây sau thời điểm khóa.
3. Nhập `test@eshop.com` và `Test1234!`.
4. Bấm đăng nhập.

## Expected result
Hệ thống chấp nhận đăng nhập sau khi đã qua thời hạn khóa 30 giây. Client nhận JWT Token và người dùng có phiên đăng nhập mới.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-006
- Boundary Value ID: BV-LOCKTIME-003
- Boundary point: `lock_elapsed_time` OFF⁺ = 31 giây
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
