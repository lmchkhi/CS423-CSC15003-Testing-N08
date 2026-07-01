# TC-FR02-DT-004: Đăng nhập sai dưới ngưỡng khóa không khóa tài khoản

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
| Failed login counter | Integer system state | Sau mỗi lần đăng nhập sai, bộ đếm tăng đúng 1; 0-2 lần sai liên tiếp chưa khóa. |
| Account lock state | System state | Tài khoản chưa bị khóa khi dưới 3 lần sai liên tiếp. |

### Domain Matrix

| TC | Email | Password | Counter state | Expected |
|---|---|---|---|---|
| COND-FR02-DT-004 | EC-EMAIL-V01: `test@eshop.com` | EC-PASSWORD-I01: `Wrong123!` | EC-COUNTER-V01: lần sai thứ 1 và 2 | Mỗi lần sai bị từ chối; tài khoản chưa bị khóa trước lần sai thứ 3. |

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
| Mật khẩu đúng để đối chiếu | `Test1234!` |

## Test steps
1. Nhập `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập lần 1.
2. Quan sát kết quả lần 1.
3. Nhập lại `test@eshop.com` và `Wrong123!`, sau đó thực hiện đăng nhập lần 2.
4. Quan sát kết quả lần 2.
5. Nhập `test@eshop.com` và `Test1234!`, sau đó thực hiện đăng nhập trước khi tạo lần sai thứ 3.

## Expected result
Hai lần đăng nhập sai đầu tiên đều bị từ chối, không tạo token và hiện thông báo lỗi phù hợp ở mức chung. Tài khoản không bị khóa trước lần sai thứ 3; bước đăng nhập bằng mật khẩu đúng sau 2 lần sai vẫn được chấp nhận và tạo trạng thái đã xác thực.

## Status / Related bugs
Failed / [BUG-FR02-003](../../../../bug-reports/BUG-FR02-003.md)
