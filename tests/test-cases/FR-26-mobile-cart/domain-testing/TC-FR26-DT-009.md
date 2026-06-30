# TC-FR26-DT-009: Tiếp tục mua sắm từ giỏ hàng trên Mobile

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `continueShoppingAction` | User action | Có nút Tiếp tục mua sắm để quay về trang chủ theo FR-07 được FR-26 kế thừa. |
| `cartState` | System state | Có thể thực hiện từ màn Giỏ hàng trên Mobile. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `continueShoppingAction` | Expected |
|---|---|---|---|
| COND-FR26-DT-009 | Đang ở màn Giỏ hàng mobile | EC-CONTINUE-V01 và EC-CONTINUE-I01 | Có nút Tiếp tục mua sắm; bấm nút thì ứng dụng quay về trang chủ trên Mobile. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Người dùng đang ở màn Giỏ hàng, giỏ có 1 dòng Áo thun Basic, đơn giá 120000, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Màn hình hiện tại | Giỏ hàng |
| Sản phẩm trong giỏ | Áo thun Basic |
| Nút cần kiểm tra | Tiếp tục mua sắm |
| Màn hình mong đợi sau thao tác | Trang chủ |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát sự xuất hiện của nút Tiếp tục mua sắm.
4. Bấm nút Tiếp tục mua sắm.
5. Quan sát màn hình sau khi bấm nút.

## Expected result
Màn Giỏ hàng hiển thị nút Tiếp tục mua sắm. Sau khi bấm nút Tiếp tục mua sắm, ứng dụng điều hướng về trang chủ trên Mobile. Dữ liệu giỏ hàng không bị xóa hoặc thay đổi chỉ vì thao tác Tiếp tục mua sắm.

## Status / Related bugs
Not Run / None
