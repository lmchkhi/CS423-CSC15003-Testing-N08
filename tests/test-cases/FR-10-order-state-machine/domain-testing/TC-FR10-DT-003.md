# TC-FR10-DT-003: Admin hoàn tất đơn hàng đang giao

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `shipping`. |
| `actor` | Role | Admin hoặc User; giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Chuyển hợp lệ từ `shipping` sang `delivered`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-003 | EC-CURRENT_STATUS-V03 / `shipping` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-V03 / `delivered` | Đơn hàng được chuyển sang `delivered`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-003` đang ở trạng thái `shipping`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-003` |
| Current status | `shipping` |
| Actor | Admin |
| Target status | `delivered` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-003`.
4. Thực hiện thao tác hoàn tất đơn hàng.
5. Quan sát trạng thái đơn hàng sau khi thao tác hoàn tất.

## Expected result
Hệ thống chấp nhận thao tác, trạng thái của `ORDER-FR10-003` được cập nhật từ `shipping` sang `delivered`, và giao diện hiển thị phản hồi thao tác thành công.

## Status / Related bugs
Not Run / None
