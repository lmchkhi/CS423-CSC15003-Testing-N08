# TC-FR26-DT-007: Nút xóa sản phẩm hiển thị dialog xác nhận trước khi xóa

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `deleteAction` | User action | Bấm nút xóa phải hiển thị dialog xác nhận trước khi xóa. |
| `cartState` | System state | Giỏ hàng có sản phẩm mục tiêu trước khi thao tác xóa. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `deleteAction` | Expected |
|---|---|---|---|
| COND-FR26-DT-007 | Giỏ có iPhone 15 Pro Max | EC-REMOVE-V01, EC-REMOVE-I01 | Dialog xác nhận xuất hiện trước khi xóa; sản phẩm chưa bị xóa ngay. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng iPhone 15 Pro Max, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm cần xóa | iPhone 15 Pro Max |
| Số lượng trước thao tác | 1 |
| Trạng thái mong đợi ngay sau khi bấm xóa | Dialog xác nhận xuất hiện |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng iPhone 15 Pro Max, bấm nút xóa sản phẩm.
4. Quan sát màn hình ngay sau thao tác bấm xóa.

## Expected result
Hệ thống hiển thị dialog xác nhận trước khi thực hiện xóa. Dòng iPhone 15 Pro Max chưa bị xóa khỏi giỏ trước khi người dùng chọn xác nhận.

## Status / Related bugs
Fail / Pending
