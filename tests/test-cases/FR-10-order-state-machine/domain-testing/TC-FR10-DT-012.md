# TC-FR10-DT-012: Từ chối trạng thái đích ngoài domain

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
| `action_or_target_status` | Enum / command | Trạng thái đích phải thuộc `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `returned`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-012 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-I06 / `returned` | Bị từ chối, trạng thái giữ nguyên `pending`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-012` đang ở trạng thái `pending`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-012` |
| Current status | `pending` |
| Actor | Admin |
| Target status | `returned` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-012`.
4. Thử chuyển trạng thái đơn hàng sang `returned`.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, hiển thị lỗi phù hợp vì `returned` không thuộc 5 trạng thái được đặc tả, và trạng thái của `ORDER-FR10-012` vẫn là `pending`.

## Status / Related bugs
Passed / None
