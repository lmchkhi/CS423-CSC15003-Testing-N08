# TC-FR26-DT-008: Xác nhận xóa sản phẩm khỏi giỏ hàng

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `deleteAction` | User action | Bấm nút xóa phải hiển thị dialog xác nhận trước khi xóa. |
| `deleteConfirmationChoice` | User choice | Chọn xác nhận trong dialog thì sản phẩm bị xóa khỏi giỏ. |
| `cartState` | System state | Giỏ hàng có sản phẩm mục tiêu trước khi thao tác xóa. |

### Domain Matrix

| TC | `cartState` | `deleteAction` | `deleteConfirmationChoice` | Expected |
|---|---|---|---|---|
| COND-FR26-DT-008 | Giỏ có iPhone 15 Pro Max | EC-REMOVE-V01 | EC-REMOVECHOICE-V02 | Sau khi xác nhận, sản phẩm bị xóa khỏi giỏ. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng iPhone 15 Pro Max, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm cần xóa | iPhone 15 Pro Max |
| Lựa chọn trong dialog | Xác nhận |
| Trạng thái mong đợi sau thao tác | iPhone 15 Pro Max không còn trong giỏ |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng iPhone 15 Pro Max, bấm nút xóa sản phẩm.
4. Quan sát dialog xác nhận xóa.
5. Chọn lựa chọn xác nhận trong dialog.
6. Quan sát lại danh sách sản phẩm trong giỏ.

## Expected result
Dialog xác nhận xuất hiện trước khi xóa. Sau khi chọn xác nhận, dòng iPhone 15 Pro Max bị xóa khỏi giỏ. Nếu đây là sản phẩm duy nhất trong giỏ, màn hình chuyển sang trạng thái giỏ hàng trống có hình minh họa và thông báo rõ ràng.

## Status / Related bugs
Failed / [BUG-FR26-003](../../../../bug-reports/BUG-FR26-003.md)
