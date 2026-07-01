# TC-FR02-BVA-003: Tài khoản vẫn bị từ chối khi vượt ngưỡng 3 lần sai liên tiếp

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
| COND-FR02-BVA-003 | `test@eshop.com` | `Wrong123!` | 4 lần sai liên tiếp | OFF⁺ | Tài khoản tồn tại và không bị khóa trước test | Sau khi đạt vùng `>= 3`, lần thử tiếp theo vẫn bị từ chối do tài khoản đang khóa. |

> **Ghi chú:** Test case kiểm tra ngay trên ngưỡng. Vì tài khoản đã bị khóa ở lần sai thứ 3, lần thử thứ 4 được kỳ vọng bị từ chối bởi trạng thái khóa hoặc lỗi đăng nhập chung, không được tạo token.

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
| Số lần đăng nhập sai liên tiếp mục tiêu | 4 |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập.
2. Lặp lại bước 1 thêm 3 lần nữa để đạt tổng cộng 4 lần sai liên tiếp.
3. Quan sát trạng thái sau lần thử thứ 4.

## Expected result
Các lần đăng nhập sai bị từ chối và không tạo token. Khi vượt ngưỡng 3 lần sai liên tiếp, tài khoản vẫn ở trạng thái bị khóa tạm thời trong 30 giây; lần thử thứ 4 không được đăng nhập thành công và thông báo lỗi không lộ chi tiết nguyên nhân.

## Status / Related bugs
Pass / None
