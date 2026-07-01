# TC-FR02-BVA-005: Cho đăng nhập lại tại mốc 30 giây sau khi bị khóa

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
| COND-FR02-BVA-005 | `test@eshop.com` | `Test1234!` | 30 giây sau khi khóa | ON | Tạo trạng thái khóa bằng 3 lần nhập `Wrong123!` trước đó | Đăng nhập được chấp nhận lại theo giả định hết đủ 30 giây; token được lưu phía client. |

> **Ghi chú:** Requirement nói khóa 30 giây nhưng không đặc tả dung sai hoặc hành vi tại đúng thời điểm 30.000 giây. Test case này ghi rõ giả định cần xác nhận: hết đủ 30 giây thì khóa kết thúc.

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
| Thời điểm thử lại | 30 giây sau khi tài khoản bị khóa |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập sai 3 lần liên tiếp để kích hoạt khóa.
2. Chờ đúng 30 giây kể từ thời điểm tài khoản bị khóa.
3. Nhập `test@eshop.com` và `Test1234!`, sau đó thực hiện đăng nhập.

## Expected result
Theo giả định hết đủ 30 giây thì khóa kết thúc, đăng nhập ở bước 3 được chấp nhận. Token được lưu phía client và người dùng vào trạng thái đã đăng nhập. Nếu hệ thống vẫn từ chối tại đúng mốc 30 giây, cần ghi Actual Result để đối chiếu với requirement vì dung sai thời gian chưa được đặc tả.

## Status / Related bugs
Fail / Pending
