# TC-FR02-BVA-004: Không cho đăng nhập lại sau 29 giây kể từ khi bị khóa

## Requirement ID
FR-02

## Module / Test type / Technique
Authentication / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `elapsed_lock_time` | Tài khoản bị tạm khóa 30 giây | Time threshold | 29 giây, **30 giây**, 31 giây |

### BVA Test Matrix

| TC | Email | Mật khẩu | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---|---|---|---|---|---|
| COND-FR02-BVA-004 | `test@eshop.com` | `Test1234!` | 29 giây sau khi khóa | OFF⁻ | Tạo trạng thái khóa bằng 3 lần nhập `Wrong123!` trước đó | Đăng nhập bị từ chối vì còn trong thời gian khóa; không tạo token. |

> **Ghi chú:** Test case isolate boundary thời gian ngay trước mốc hết khóa. Credential ở lần kiểm tra là đúng để đảm bảo kết quả phụ thuộc vào trạng thái khóa, không phụ thuộc vào mật khẩu sai.

## Preconditions
- Hệ thống EShop đang hoạt động.
- Tài khoản `test@eshop.com` / `Test1234!` tồn tại.
- Tài khoản `test@eshop.com` không trong thời gian tạm khóa trước khi bắt đầu tạo trạng thái.
- Người dùng đang ở màn hình Đăng nhập.

## Test data

| Field | Value |
|---|---|
| Email | `test@eshop.com` |
| Mật khẩu sai để tạo khóa | `Wrong123!` |
| Mật khẩu đúng để kiểm tra | `Test1234!` |
| Thời điểm thử lại | 29 giây sau khi tài khoản bị khóa |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập sai 3 lần liên tiếp để kích hoạt khóa.
2. Chờ 29 giây kể từ thời điểm tài khoản bị khóa.
3. Nhập `test@eshop.com` và `Test1234!`, sau đó thực hiện đăng nhập.

## Expected result
Ở thời điểm 29 giây sau khi bị khóa, đăng nhập vẫn bị từ chối dù mật khẩu đúng. Hệ thống không tạo token và hiển thị thông báo lỗi phù hợp, không lộ chi tiết nguyên nhân.

## Status / Related bugs
Not Run / None
