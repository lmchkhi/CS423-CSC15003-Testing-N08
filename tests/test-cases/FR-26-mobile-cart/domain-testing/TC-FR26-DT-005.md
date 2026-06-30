# TC-FR26-DT-005: Hủy xóa sản phẩm trong dialog xác nhận

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `deleteAction` | User action | Bấm nút xóa phải hiển thị dialog xác nhận trước khi xóa. |
| `deleteConfirmationChoice` | User choice | Khi chọn hủy trong dialog, sản phẩm không bị xóa. |
| `cartState` | System state | Giỏ hàng có sản phẩm mục tiêu trước khi thao tác xóa. |

### Domain Matrix

| TC | `cartState` | `deleteAction` | `deleteConfirmationChoice` | Expected |
|---|---|---|---|---|
| COND-FR26-DT-005 | Giỏ có Áo thun Basic | EC-DELETE-V01 và EC-DELETE-I01 | EC-DELETECHOICE-V01 | Dialog xuất hiện trước khi xóa; chọn hủy thì sản phẩm vẫn còn trong giỏ. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng Áo thun Basic, đơn giá 120000, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm cần xóa | Áo thun Basic |
| Số lượng trước thao tác | 1 |
| Lựa chọn trong dialog | Hủy |
| Trạng thái mong đợi sau thao tác | Áo thun Basic vẫn còn trong giỏ |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng Áo thun Basic, bấm nút xóa sản phẩm.
4. Quan sát dialog xác nhận xóa.
5. Chọn lựa chọn hủy trong dialog.
6. Quan sát lại danh sách sản phẩm trong giỏ.

## Expected result
Sau khi bấm nút xóa, hệ thống hiển thị dialog xác nhận trước khi thực hiện xóa. Khi chọn hủy, dialog đóng lại và dòng Áo thun Basic vẫn còn trong giỏ với số lượng 1. Không có thay đổi dữ liệu giỏ hàng.

## Status / Related bugs
Not Run / None
