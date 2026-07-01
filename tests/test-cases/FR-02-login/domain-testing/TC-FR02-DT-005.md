# TC-FR02-DT-005: Khóa tài khoản sau 3 lần đăng nhập sai liên tiếp

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Email | String / HTML email input | Email đúng format và thuộc tài khoản đã đăng ký. |
| Password | String / password input | Mật khẩu không khớp bị từ chối. |
| Failed login counter | Integer system state | Sai từ 3 lần trở lên liên tiếp thì tài khoản bị tạm khóa 30 giây. |
| Account lock state | System state | Tài khoản đang bị tạm khóa là invalid cho đăng nhập. |

### Domain Matrix

| TC | Email | Password | Counter state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-005 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-I01: `Wrong123!` | EC-COUNTER-I01: lần sai thứ 3 | Tài khoản bị tạm khóa 30 giây, không tạo token. |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa và bộ đếm sai liên tiếp đang ở trạng thái danh nghĩa.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu sai | `Wrong123!` |

## Test steps
1. Đăng nhập lần 1 với `test@eshop.com` và `Wrong123!`.
2. Đăng nhập lần 2 với `test@eshop.com` và `Wrong123!`.
3. Đăng nhập lần 3 với `test@eshop.com` và `Wrong123!`.
4. Quan sát thông báo lỗi và trạng thái tài khoản ngay sau lần sai thứ 3.

## Expected result
Sau lần đăng nhập sai thứ 3 liên tiếp, tài khoản bị tạm khóa 30 giây. Hệ thống hiện thông báo lỗi phù hợp ở mức chung, không để lộ chi tiết nguyên nhân, không tạo token và người dùng không vào được trạng thái đã xác thực.

## Status / Related bugs
Pass / None
