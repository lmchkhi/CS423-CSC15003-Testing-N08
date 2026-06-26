# TC-FR02-BVA-001: Kiểm tra 2 lần đăng nhập sai liên tiếp chưa khóa tài khoản

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh giá trị ngay dưới ngưỡng khóa, 2 lần đăng nhập sai liên tiếp, chưa làm tài khoản bị khóa.

## Boundary Point
- Variable: `failed_login_count`
- Constraint: Tài khoản bị khóa nếu đăng nhập sai từ 3 lần trở lên liên tiếp
- Boundary type: Lower inclusive threshold của trạng thái khóa
- Boundary point: OFF⁻
- Test value: 2 lần đăng nhập sai liên tiếp

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không bị khóa và có 0 lần đăng nhập sai liên tiếp trước khi test.
- Người dùng đang ở màn hình đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu sai | `Wrong123!` |
| Số lần nhập sai liên tiếp | `2` |
| Mật khẩu đúng để kiểm tra chưa khóa | `Test1234!` |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó bấm đăng nhập.
2. Lặp lại bước 1 thêm 1 lần nữa, tổng cộng 2 lần sai liên tiếp.
3. Nhập `test@eshop.com` và `Test1234!`.
4. Bấm đăng nhập.

## Expected result
Hai lần đăng nhập sai đều bị từ chối, không trả JWT Token và không tạo phiên đăng nhập mới. Sau đúng 2 lần sai liên tiếp, tài khoản chưa bị khóa; lần đăng nhập bằng `Test1234!` được chấp nhận nếu không có lỗi khác và client nhận JWT Token. Nếu quan sát phản hồi API cho lần đăng nhập đúng, `POST /api/login` trả `200 OK` với chuỗi JWT `token` và thông tin `user`.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-001
- Boundary Value ID: BV-FAILEDCOUNT-001
- Boundary point: `failed_login_count` OFF⁻ = 2
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
