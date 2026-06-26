# TC-FR02-BVA-002: Kiểm tra tài khoản bị khóa tại lần đăng nhập sai thứ 3

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh đúng ngưỡng 3 lần đăng nhập sai liên tiếp làm tài khoản bị khóa tạm thời 30 giây.

## Boundary Point
- Variable: `failed_login_count`
- Constraint: Tài khoản bị khóa nếu đăng nhập sai từ 3 lần trở lên liên tiếp
- Boundary type: Lower inclusive threshold của trạng thái khóa
- Boundary point: ON
- Test value: 3 lần đăng nhập sai liên tiếp

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
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó bấm đăng nhập.
2. Lặp lại bước 1 thêm 2 lần nữa, tổng cộng 3 lần sai liên tiếp.
3. Quan sát trạng thái đăng nhập và thông báo sau lần sai thứ 3.

## Expected result
Cả 3 lần đăng nhập sai đều bị từ chối và không trả JWT Token. Sau lần sai thứ 3, tài khoản bị tạm khóa 30 giây; hệ thống trả thông báo lỗi phù hợp và không để lộ chi tiết nguyên nhân.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-002
- Boundary Value ID: BV-FAILEDCOUNT-002
- Boundary point: `failed_login_count` ON = 3
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
