# TC-FR10-DT-010: Từ chối User tự hủy đơn hàng đang giao

## Requirement ID
FR-10

## Module / Test type / Technique
Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `shipping`. |
| `actor` | Role | Giá trị mục tiêu: User. |
| `action_or_target_status` | Enum / command | User không được tự hủy khi đơn hàng ở `shipping`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-010 | EC-CURRENT_STATUS-V03 / `shipping` | EC-ACTOR-V02 / User | EC-TARGET_STATUS-I05 / `canceled` | Bị từ chối, trạng thái giữ nguyên `shipping`. |

## Preconditions
- Có tài khoản User đăng nhập được.
- Có đơn hàng `ORDER-FR10-010` của User đang ở trạng thái `shipping`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-010` |
| Current status | `shipping` |
| Actor | User |
| Target status | `canceled` |

## Test steps
1. Đăng nhập bằng tài khoản User sở hữu đơn hàng.
2. Mở màn hình lịch sử hoặc chi tiết đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-010`.
4. Thử thực hiện thao tác hủy đơn hàng.
5. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác hủy, hiển thị lỗi phù hợp vì User không được tự hủy đơn hàng ở trạng thái `shipping`, và trạng thái của `ORDER-FR10-010` vẫn là `shipping`.

## Status / Related bugs
Failed / [BUG-FR10-002](../../../../bug-reports/BUG-FR10-002.md)
