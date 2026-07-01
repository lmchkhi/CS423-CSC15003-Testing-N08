# TC-FR26-DT-009: Hủy xóa sản phẩm trong dialog xác nhận

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `deleteAction` | User action | Bấm nút xóa phải hiển thị dialog xác nhận trước khi xóa. |
| `deleteConfirmationChoice` | User choice | Chọn hủy trong dialog thì sản phẩm không bị xóa. |
| `cartState` | System state | Giỏ hàng có sản phẩm mục tiêu trước khi thao tác xóa. |

### Domain Matrix

| TC | `cartState` | `deleteAction` | `deleteConfirmationChoice` | Expected |
|---|---|---|---|---|
| COND-FR26-DT-009 | Giỏ có iPhone 15 Pro Max | EC-REMOVE-V01, EC-REMOVE-I01 | EC-REMOVECHOICE-V01 | Sau khi hủy, sản phẩm vẫn còn trong giỏ. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng iPhone 15 Pro Max, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm cần xóa | iPhone 15 Pro Max |
| Lựa chọn trong dialog | Hủy |
| Trạng thái mong đợi sau thao tác | iPhone 15 Pro Max vẫn còn trong giỏ |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng iPhone 15 Pro Max, bấm nút xóa sản phẩm.
4. Quan sát dialog xác nhận xóa.
5. Chọn lựa chọn hủy trong dialog.
6. Quan sát lại danh sách sản phẩm trong giỏ.

## Expected result
Dialog xác nhận xuất hiện trước khi xóa. Khi chọn hủy, dialog đóng lại và dòng iPhone 15 Pro Max vẫn còn trong giỏ với số lượng ban đầu. Không có thay đổi dữ liệu giỏ hàng.

## Status / Related bugs
Failed / [BUG-FR26-003](../../../../bug-reports/BUG-FR26-003.md)
