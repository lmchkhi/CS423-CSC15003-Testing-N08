# TC-FR02-BVA-005: Kiểm tra hết khóa tại đúng 30 giây

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh đúng mốc 30 giây sau khi bị khóa, tài khoản không còn bị khóa và có thể đăng nhập bằng mật khẩu đúng.

## Boundary Point
- Variable: `lock_elapsed_time`
- Constraint: Tài khoản bị tạm khóa 30 giây
- Boundary type: Unlock-time threshold
- Boundary point: ON
- Test value: 30 giây sau thời điểm tài khoản bị khóa

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` vừa bị khóa do 3 lần đăng nhập sai liên tiếp.
- Người kiểm thử có đồng hồ hoặc công cụ đo thời gian chính xác từ thời điểm khóa; mốc đúng 30 giây có rủi ro timing nếu thao tác thủ công.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu | `Test1234!` |
| Thời điểm thử lại | `30` giây sau khi tài khoản bị khóa |

## Test steps
1. Ngay sau khi tài khoản bị khóa, bắt đầu đo thời gian.
2. Chờ đến đúng mốc 30 giây sau thời điểm khóa bằng công cụ đo thời gian chính xác.
3. Nhập `test@eshop.com` và `Test1234!`.
4. Bấm đăng nhập.

## Expected result
Hệ thống chấp nhận đăng nhập tại thời điểm đủ 30 giây sau khi khóa. Client nhận JWT Token và người dùng có phiên đăng nhập mới. Nếu thao tác thủ công không đảm bảo đúng mốc 30 giây, kết quả cần được ghi nhận kèm rủi ro timing thay vì kết luận lỗi ngay.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-005
- Boundary Value ID: BV-LOCKTIME-002
- Boundary point: `lock_elapsed_time` ON = 30 giây
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
