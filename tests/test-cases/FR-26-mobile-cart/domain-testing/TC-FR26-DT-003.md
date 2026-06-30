# TC-FR26-DT-003: Tăng số lượng sản phẩm bằng nút +

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `quantityAdjustment` | User action | Nút + dùng để chỉnh số lượng sản phẩm trong giỏ. |
| `cartLineDisplay` | UI state | Dòng sản phẩm phải cập nhật số lượng và thành tiền sau thao tác. |
| `totalLabel` | UI text | Tổng tiền dùng nhãn "Tổng cộng" và phản ánh trạng thái mới. |

### Domain Matrix

| TC | `cartState` | `quantityAdjustment` | Expected |
|---|---|---|---|
| COND-FR26-DT-003 | Giỏ có Áo thun Basic số lượng 1 | EC-QUANTITY-V01: bấm nút + | Số lượng tăng lên 2; thành tiền và "Tổng cộng" cập nhật theo số lượng mới. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có đúng 1 dòng Áo thun Basic, đơn giá 120000, số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | Áo thun Basic |
| Đơn giá | 120000 |
| Số lượng trước khi bấm + | 1 |
| Số lượng sau khi bấm + | 2 |
| Thành tiền sau khi bấm + | 240000 |
| Tổng cộng sau khi bấm + | 240000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng Áo thun Basic, bấm nút + một lần.
4. Quan sát số lượng, thành tiền của dòng Áo thun Basic và khu vực "Tổng cộng".

## Expected result
Số lượng Áo thun Basic tăng từ 1 lên 2. Thành tiền của dòng Áo thun Basic cập nhật thành 240000. Khu vực tổng tiền vẫn hiển thị nhãn "Tổng cộng" và giá trị tổng cộng cập nhật thành 240000.

## Status / Related bugs
Not Run / None
