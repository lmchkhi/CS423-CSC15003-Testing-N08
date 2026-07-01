# TC-FR10-DT-009: Từ chối chuyển trạng thái từ đơn hàng đã hủy

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `canceled`, là final state. |
| `actor` | Role | Giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Mọi chuyển đổi từ `canceled` đều không hợp lệ. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-009 | EC-CURRENT_STATUS-V05 / `canceled` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-I04 / `pending` | Bị từ chối, trạng thái giữ nguyên `canceled`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-009` đang ở trạng thái `canceled`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-009` |
| Current status | `canceled` |
| Actor | Admin |
| Target status | `pending` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-009`.
4. Thử chuyển trạng thái đơn hàng sang `pending`.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp vì `canceled` là trạng thái kết thúc, và trạng thái của `ORDER-FR10-009` vẫn là `canceled`.

## Status / Related bugs
Failed / [BUG-FR10-001](../../../../bug-reports/BUG-FR10-001.md)
