# TC-FR10-DT-007: Từ chối Admin chuyển đơn hàng đã xác nhận về đang chờ xử lý

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `confirmed`. |
| `actor` | Role | Giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | `confirmed` -> `pending` là chuyển đổi ngược không có trong state machine. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-007 | EC-CURRENT_STATUS-V02 / `confirmed` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-I02 / `pending` | Bị từ chối, trạng thái giữ nguyên `confirmed`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-007` đang ở trạng thái `confirmed`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-007` |
| Current status | `confirmed` |
| Actor | Admin |
| Target status | `pending` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-007`.
4. Thử chuyển trạng thái đơn hàng về `pending`.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp về chuyển đổi trạng thái không hợp lệ, và trạng thái của `ORDER-FR10-007` vẫn là `confirmed`.

## Status / Related bugs
Passed / None
