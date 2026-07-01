# TC-FR02-BVA-001: Không khóa tài khoản sau 2 lần đăng nhập sai liên tiếp

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `failed_login_attempt_count` | Khóa nếu đăng nhập sai từ 3 lần trở lên liên tiếp | Minimum threshold | 2 lần, **3 lần**, 4 lần |

### BVA Test Matrix

| TC | Email | Mật khẩu | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---|---|---|---|---|---|
| COND-FR02-BVA-001 | `test@eshop.com` | `Wrong123!` | 2 lần sai liên tiếp | OFF⁻ | Tài khoản tồn tại và không bị khóa trước test | Hai lần sai bị từ chối nhưng tài khoản chưa bị khóa; đăng nhập đúng ngay sau đó được chấp nhận. |

> **Ghi chú:** Test case isolate boundary số lần sai liên tiếp ở ngay dưới ngưỡng. Email hợp lệ và đã đăng ký; chỉ mật khẩu sai được dùng để tăng bộ đếm đến 2.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu sai | `Wrong123!` |
| Mật khẩu đúng để kiểm tra chưa khóa | `Test1234!` |
| Số lần đăng nhập sai liên tiếp mục tiêu | 2 |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập.
2. Lặp lại bước 1 thêm 1 lần nữa để đạt tổng cộng 2 lần sai liên tiếp.
3. Nhập `test@eshop.com` và `Test1234!`, sau đó thực hiện đăng nhập.

## Expected result
Hai lần đăng nhập sai đều bị từ chối và không tạo token. Tài khoản chưa bị khóa ở mức 2 lần sai liên tiếp; lần đăng nhập bằng mật khẩu đúng ở bước 3 được chấp nhận, token được lưu phía client.

## Status / Related bugs
Fail / [BUG-FR02-003](../../../../bug-reports/BUG-FR02-003.md)
