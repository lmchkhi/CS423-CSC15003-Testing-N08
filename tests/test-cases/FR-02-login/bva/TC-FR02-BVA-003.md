# TC-FR02-BVA-003: Kiểm tra thử đăng nhập trong trạng thái tài khoản đang khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh login attempt trong trạng thái tài khoản đang khóa bị từ chối, không kết luận counter tăng thêm sau khi tài khoản đã khóa.

## Boundary Point
- Variable: `account_lock_state`
- Constraint: Tài khoản bị khóa trong 30 giây sau khi đăng nhập sai từ 3 lần trở lên liên tiếp
- Boundary type: Dependent state after `failed_login_count` ON boundary
- Boundary point: ON-state sau khi counter đạt 3 lần sai liên tiếp
- Test value: Thử đăng nhập trong 30 giây khóa ngay sau khi khóa được tạo

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` tồn tại.
- Tài khoản `test@eshop.com` vừa bị khóa do 3 lần đăng nhập sai liên tiếp.
- Vẫn đang trong 30 giây khóa.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu thử trong lúc khóa | `Wrong123!` |
| Boundary setup | 3 lần đăng nhập sai liên tiếp trước đó bằng `Wrong123!` |
| Trạng thái tài khoản | Đang trong 30 giây khóa |

## Test steps
1. Trong vòng 30 giây sau khi tài khoản bị khóa, nhập `test@eshop.com`.
2. Nhập `Wrong123!`.
3. Bấm đăng nhập.
4. Quan sát trạng thái đăng nhập và token phía client.

## Expected result
Hệ thống từ chối login attempt trong trạng thái khóa, không trả JWT Token và không tạo phiên đăng nhập mới. Thông báo lỗi phù hợp với trạng thái bị khóa và không để lộ chi tiết nguyên nhân xác thực. Test case này không kết luận `failed_login_count` tăng thành 4.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-003
- Boundary Value ID: BV-LOCKSTATE-001
- Boundary point: `account_lock_state` ON-state sau khi `failed_login_count` đạt 3
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
