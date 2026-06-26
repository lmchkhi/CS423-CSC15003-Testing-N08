# TC-FR10-DT-006: Từ chối Admin chuyển đơn hàng từ đang chờ xử lý thẳng sang đang giao

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `pending`. |
| `actor` | Role | Giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | `pending` -> `shipping` là bước nhảy không có trong state machine. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-006 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-I01 / `shipping` | Bị từ chối, trạng thái giữ nguyên `pending`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-006` đang ở trạng thái `pending`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-006` |
| Current status | `pending` |
| Actor | Admin |
| Target status | `shipping` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-006`.
4. Thử chuyển trạng thái đơn hàng trực tiếp sang `shipping`.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp về chuyển đổi trạng thái không hợp lệ, và trạng thái của `ORDER-FR10-006` vẫn là `pending`.

## Status / Related bugs
Not Run / None
