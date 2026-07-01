# TC-FR02-BVA-002: Khóa tài khoản tại lần đăng nhập sai thứ 3 liên tiếp

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
| COND-FR02-BVA-002 | `test@eshop.com` | `Wrong123!` | 3 lần sai liên tiếp | ON | Tài khoản tồn tại và không bị khóa trước test | Lần sai thứ 3 kích hoạt khóa 30 giây; đăng nhập đúng ngay sau đó vẫn bị từ chối. |

> **Ghi chú:** Test case isolate đúng ngưỡng khóa. Chuỗi 3 lần sai được thực hiện trên cùng tài khoản để kiểm tra bộ đếm liên tiếp.

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
| Mật khẩu đúng để kiểm tra trạng thái khóa | `Test1234!` |
| Số lần đăng nhập sai liên tiếp mục tiêu | 3 |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập.
2. Lặp lại bước 1 thêm 2 lần nữa để đạt tổng cộng 3 lần sai liên tiếp.
3. Ngay sau lần sai thứ 3, nhập `test@eshop.com` và `Test1234!`, sau đó thực hiện đăng nhập.

## Expected result
Ba lần đăng nhập sai đều bị từ chối và không tạo token. Tại lần sai thứ 3, tài khoản bị tạm khóa 30 giây. Bước 3 bị từ chối dù mật khẩu đúng; hệ thống trả về thông báo lỗi phù hợp và không lộ chi tiết nguyên nhân.

## Status / Related bugs
Pass / None
