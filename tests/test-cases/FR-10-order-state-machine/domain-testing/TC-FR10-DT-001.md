# TC-FR10-DT-001: Admin xác nhận đơn hàng đang chờ xử lý

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `pending`. |
| `actor` | Role | Admin hoặc User; giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Chuyển hợp lệ từ `pending` sang `confirmed`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-001 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-V01 / `confirmed` | Đơn hàng được chuyển sang `confirmed`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-001` đang ở trạng thái `pending`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-001` |
| Current status | `pending` |
| Actor | Admin |
| Target status | `confirmed` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-001`.
4. Thực hiện thao tác xác nhận đơn hàng.
5. Quan sát trạng thái đơn hàng sau khi thao tác hoàn tất.

## Expected result
Hệ thống chấp nhận thao tác, trạng thái của `ORDER-FR10-001` được cập nhật từ `pending` sang `confirmed`, và giao diện hiển thị phản hồi thao tác thành công.

## Status / Related bugs
Not Run / None
