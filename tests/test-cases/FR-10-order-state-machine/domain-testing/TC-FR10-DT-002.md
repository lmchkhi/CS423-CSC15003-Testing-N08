# TC-FR10-DT-002: Admin chuyển đơn hàng đã xác nhận sang đang giao

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `confirmed`. |
| `actor` | Role | Admin hoặc User; giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Chuyển hợp lệ từ `confirmed` sang `shipping`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-002 | EC-CURRENT_STATUS-V02 / `confirmed` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-V02 / `shipping` | Đơn hàng được chuyển sang `shipping`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-002` đang ở trạng thái `confirmed`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-002` |
| Current status | `confirmed` |
| Actor | Admin |
| Target status | `shipping` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-002`.
4. Thực hiện thao tác giao hàng.
5. Quan sát trạng thái đơn hàng sau khi thao tác hoàn tất.

## Expected result
Hệ thống chấp nhận thao tác, trạng thái của `ORDER-FR10-002` được cập nhật từ `confirmed` sang `shipping`, và giao diện hiển thị phản hồi thao tác thành công.

## Status / Related bugs
Passed / None
