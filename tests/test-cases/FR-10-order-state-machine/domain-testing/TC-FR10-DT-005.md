# TC-FR10-DT-005: Admin hủy đơn hàng đã xác nhận

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `confirmed`. |
| `actor` | Role | Admin hoặc User; giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Hủy hợp lệ từ `confirmed` sang `canceled`. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-005 | EC-CURRENT_STATUS-V02 / `confirmed` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-V04 / `canceled` | Đơn hàng được chuyển sang `canceled`. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có đơn hàng `ORDER-FR10-005` đang ở trạng thái `confirmed`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-005` |
| Current status | `confirmed` |
| Actor | Admin |
| Target status | `canceled` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn đơn hàng `ORDER-FR10-005`.
4. Thực hiện thao tác hủy đơn hàng.
5. Quan sát trạng thái đơn hàng sau khi thao tác hoàn tất.

## Expected result
Hệ thống chấp nhận thao tác, trạng thái của `ORDER-FR10-005` được cập nhật từ `confirmed` sang `canceled`, và đơn hàng không còn có thao tác chuyển trạng thái tiếp theo.

## Status / Related bugs
Not Run / None
