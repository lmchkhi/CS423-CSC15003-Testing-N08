# TC-FR10-DT-008: Từ chối chuyển trạng thái từ đơn hàng đã giao

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `delivered`, là final state. |
| `actor` | Role | Giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Mọi chuyển đổi từ `delivered` đều không hợp lệ. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-008 | EC-CURRENT_STATUS-V04 / `delivered` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-I03 / `shipping` | Bị từ chối, trạng thái giữ nguyên `delivered`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-008` đang ở trạng thái `delivered`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-008` |
| Current status | `delivered` |
| Actor | Admin |
| Target status | `shipping` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-008`.
4. Thử chuyển trạng thái đơn hàng sang `shipping`.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp vì `delivered` là trạng thái kết thúc, và trạng thái của `ORDER-FR10-008` vẫn là `delivered`.

## Status / Related bugs
Not Run / None
