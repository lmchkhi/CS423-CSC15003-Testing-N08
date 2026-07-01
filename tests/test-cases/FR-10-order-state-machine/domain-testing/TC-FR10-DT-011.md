# TC-FR10-DT-011: Từ chối User xác nhận đơn hàng đang chờ xử lý

## Requirement ID
FR-10

## Module / Test type / Technique
Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `pending`. |
| `actor` | Role | Giá trị mục tiêu: User thực hiện thao tác dành cho Admin. |
| `action_or_target_status` | Enum / command | Xác nhận `pending` -> `confirmed` là thao tác Admin. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-011 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-I01 / User | EC-TARGET_STATUS-V01 / `confirmed` | Bị từ chối, trạng thái giữ nguyên `pending`. |

## Preconditions
- Có tài khoản User đăng nhập được.
- Có đơn hàng `ORDER-FR10-011` đang ở trạng thái `pending`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-011` |
| Current status | `pending` |
| Actor | User |
| Target status | `confirmed` |

## Test steps
1. Đăng nhập bằng tài khoản User.
2. Mở khu vực có thể quan sát đơn hàng `ORDER-FR10-011`.
3. Thử thực hiện thao tác xác nhận đơn hàng.
4. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp vì xác nhận đơn hàng là thao tác của Admin, và trạng thái của `ORDER-FR10-011` vẫn là `pending`.

## Status / Related bugs
Failed / [BUG-FR10-003](../../../../bug-reports/BUG-FR10-003.md)
