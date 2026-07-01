# TC-FR26-DT-005: Bấm nút - để giảm số lượng sản phẩm

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `quantityAdjustment` | User action | Bấm nút - làm giảm số lượng khi số lượng đang lớn hơn 1. |
| `lineSubtotal` | Calculated UI value | Thành tiền phản ánh số lượng sau thao tác. |
| `totalLabel` | UI text | Tổng tiền dùng nhãn "Tổng cộng" và phản ánh trạng thái mới. |

### Domain Matrix

| TC | `cartState` | `quantityAdjustment` | Expected |
|---|---|---|---|
| COND-FR26-DT-005 | Giỏ có iPhone 15 Pro Max số lượng 2 | EC-QUANTITY-V02 | Số lượng giảm xuống 1; thành tiền và "Tổng cộng" cập nhật. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng iPhone 15 Pro Max, đơn giá 30000000, số lượng 2.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng trước khi bấm - | 2 |
| Số lượng sau khi bấm - | 1 |
| Thành tiền sau khi bấm - | 30000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng iPhone 15 Pro Max, bấm nút - một lần.
4. Quan sát số lượng, thành tiền và khu vực "Tổng cộng".

## Expected result
Số lượng iPhone 15 Pro Max giảm từ 2 xuống 1. Thành tiền cập nhật thành 30000000. Khu vực tổng tiền vẫn hiển thị nhãn "Tổng cộng" và giá trị tổng cộng cập nhật tương ứng.

## Status / Related bugs
Fail / [BUG-FR26-002](../../../../bug-reports/BUG-FR26-002.md), [BUG-FR26-005](../../../../bug-reports/BUG-FR26-005.md)
