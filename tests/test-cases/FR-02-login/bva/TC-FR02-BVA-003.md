# TC-FR02-BVA-003: Kiểm tra 4 lần đăng nhập sai liên tiếp vẫn bị khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
Xác minh giá trị ngay trên ngưỡng khóa, 4 lần đăng nhập sai liên tiếp, vẫn thuộc trạng thái bị khóa và không trả JWT Token.

## Boundary Point
- Variable: `failed_login_count`
- Constraint: Tài khoản bị khóa nếu đăng nhập sai từ 3 lần trở lên liên tiếp
- Boundary type: Lower inclusive threshold của trạng thái khóa
- Boundary point: OFF⁺
- Test value: 4 lần đăng nhập sai liên tiếp

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
| Mật khẩu sai | `Wrong123!` |
| Boundary setup | 3 lần đăng nhập sai liên tiếp trước đó bằng `Wrong123!` |
| Lần thử tiếp theo | Lần sai thứ 4 trong chuỗi thao tác quanh ngưỡng |

## Test steps
1. Trong vòng 30 giây sau khi tài khoản bị khóa, nhập `test@eshop.com`.
2. Nhập `Wrong123!`.
3. Bấm đăng nhập.
4. Quan sát trạng thái đăng nhập và token phía client.

## Expected result
Hệ thống từ chối lần đăng nhập sai thứ 4 trong trạng thái khóa, không trả JWT Token và không tạo phiên đăng nhập mới. Thông báo lỗi phù hợp với trạng thái bị khóa và không để lộ chi tiết nguyên nhân xác thực.

## Traceability
- Requirement: FR-02
- Test condition: COND-FR02-BVA-003
- Boundary Value ID: BV-FAILEDCOUNT-003
- Boundary point: `failed_login_count` OFF⁺ = 4 lần sai liên tiếp
- Analysis file: `analysis/FR-02-login/bva-analysis.md`

## Status / Related bugs
Not Run / None
