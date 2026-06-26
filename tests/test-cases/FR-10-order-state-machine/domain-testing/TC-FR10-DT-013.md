# TC-FR10-DT-013: Từ chối xử lý đơn hàng có trạng thái hiện tại ngoài domain

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý Đơn hàng / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `current_status` | Enum | Trạng thái hiện tại phải thuộc `pending`, `confirmed`, `shipping`, `delivered`, `canceled`; giá trị mục tiêu: `returned`. |
| `actor` | Role | Giá trị mục tiêu: Admin. |
| `action_or_target_status` | Enum / command | Giá trị đại diện hợp lệ riêng lẻ: `confirmed`, nhưng không thể áp dụng khi current status ngoài domain. |

### Domain Matrix

| TC | `current_status` | `actor` | `action_or_target_status` | Expected |
|---|---|---|---|---|
| COND-FR10-DT-013 | EC-CURRENT_STATUS-I01 / `returned` | EC-ACTOR-V01 / Admin | EC-TARGET_STATUS-V01 / `confirmed` | Bị từ chối, không tạo chuyển đổi trạng thái. |

## Preconditions
- Có tài khoản Admin đăng nhập được.
- Có dữ liệu hoặc tình huống kiểm thử trong đó đơn hàng `ORDER-FR10-013` có trạng thái hiện tại `returned`.

## Test data

| Field | Value |
|---|---|
| Order | `ORDER-FR10-013` |
| Current status | `returned` |
| Actor | Admin |
| Target status | `confirmed` |

## Test steps
1. Đăng nhập bằng tài khoản Admin.
2. Mở màn hình quản lý đơn hàng.
3. Chọn hoặc truy cập đơn hàng `ORDER-FR10-013`.
4. Thử chuyển trạng thái đơn hàng sang `confirmed`.
5. Quan sát phản hồi của hệ thống và dữ liệu trạng thái sau thao tác.

## Expected result
Hệ thống từ chối xử lý, hiển thị lỗi phù hợp vì trạng thái hiện tại `returned` không thuộc domain của FR-10, và không tạo chuyển đổi trạng thái cho `ORDER-FR10-013`.

## Status / Related bugs
Not Run / None
