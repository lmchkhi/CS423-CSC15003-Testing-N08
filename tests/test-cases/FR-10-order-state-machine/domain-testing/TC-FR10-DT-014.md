# TC-FR10-DT-014: Từ chối actor chưa đăng nhập hủy đơn hàng

## Requirement ID
FR-10

## Module / Test type / Technique
Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Giá trị mục tiêu: `pending`. |
| `actor` | Role / system state | Giá trị mục tiêu: Guest; giả định cần xác nhận vì FR-10 không đặc tả trực tiếp actor chưa đăng nhập. |
| `action_or_target_status` | Enum / command | Hủy từ `pending` sang `canceled` là hợp lệ theo trạng thái, nhưng cần actor hợp lệ. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-014 | EC-CURRENT_STATUS-V01 / `pending` | EC-ACTOR-I02 / Guest | EC-TARGET_STATUS-V04 / `canceled` | Bị từ chối, trạng thái giữ nguyên `pending`. |

## Preconditions
- Có đơn hàng `ORDER-FR10-014` đang ở trạng thái `pending`.
- Phiên làm việc hiện tại không đăng nhập hoặc không có actor xác định.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-014` |
| Current status | `pending` |
| Actor | Guest |
| Target status | `canceled` |

## Test steps
1. Đảm bảo phiên làm việc hiện tại chưa đăng nhập.
2. Truy cập khu vực hoặc chức năng có thể gửi thao tác hủy đơn hàng `ORDER-FR10-014`.
3. Thử thực hiện thao tác hủy đơn hàng.
4. Quan sát phản hồi của hệ thống và trạng thái đơn hàng sau thao tác.

## Expected result
Hệ thống từ chối thao tác, không chuyển `ORDER-FR10-014` sang `canceled`, và trạng thái đơn hàng vẫn là `pending`. Chi tiết phản hồi cho actor chưa đăng nhập là giả định cần xác nhận vì FR-10 chưa đặc tả trực tiếp.

## Status / Related bugs
Not Run / None
