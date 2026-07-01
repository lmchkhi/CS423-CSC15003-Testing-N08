# TC-FR10-DT-004: User hủy đơn hàng đang chờ xử lý

## Requirement ID
FR-10

## Module / Test type / Technique
Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `pending`. |
| `actor` | Role | Admin hoặc User; giá trị mục tiêu: User. |
| `action_or_target_status` | Enum / command | Hủy hợp lệ từ `pending` sang `canceled`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-004 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-V02 / User | EC-TARGET_STATUS-V04 / `canceled` | Đơn hàng được chuyển sang `canceled`. |

## Preconditions
- Có tài khoản User đăng nhập được.
- Có đơn hàng `ORDER-FR10-004` của User đang ở trạng thái `pending`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-004` |
| Current status | `pending` |
| Actor | User |
| Target status | `canceled` |

## Test steps
1. Đăng nhập bằng tài khoản User sở hữu đơn hàng.
2. Mở màn hình lịch sử hoặc chi tiết đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-004`.
4. Thực hiện thao tác hủy đơn hàng.
5. Quan sát trạng thái đơn hàng sau khi thao tác hoàn tất.

## Expected result
Hệ thống chấp nhận thao tác, trạng thái của `ORDER-FR10-004` được cập nhật từ `pending` sang `canceled`, và đơn hàng không còn có thao tác chuyển trạng thái tiếp theo.

## Status / Related bugs
Passed / None
