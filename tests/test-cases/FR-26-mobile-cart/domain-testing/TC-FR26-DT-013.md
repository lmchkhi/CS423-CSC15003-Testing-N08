# TC-FR26-DT-013: Thành tiền bằng Đơn giá nhân Số lượng

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `lineSubtotal` | Calculated UI value | Thành tiền phản ánh Đơn giá × Số lượng. |
| `cartState` | System state | Giỏ hàng có sản phẩm với số lượng lớn hơn 1 để kiểm tra phép tính. |
| `totalLabel` | UI text | Tổng cộng phản ánh giá trị thành tiền của giỏ. |

### Domain Matrix

| TC | `cartState` | `lineSubtotal` | Expected |
|---|---|---|---|
| COND-FR26-DT-013 | Giỏ có iPhone 15 Pro Max số lượng 3 | EC-LINESUBTOTAL-V01, EC-LINESUBTOTAL-I01 | Thành tiền = 30000000 × 3 = 90000000. |

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có 1 dòng iPhone 15 Pro Max, đơn giá 30000000, số lượng 3.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng | 3 |
| Thành tiền mong đợi | 90000000 |
| Tổng cộng mong đợi | 90000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát dòng iPhone 15 Pro Max.
4. Kiểm tra giá trị Thành tiền và Tổng cộng.

## Expected result
Thành tiền của dòng iPhone 15 Pro Max hiển thị 90000000, đúng bằng Đơn giá 30000000 nhân Số lượng 3. Khu vực Tổng cộng phản ánh đúng giá trị 90000000 khi giỏ chỉ có dòng sản phẩm này.

## Status / Related bugs
Not Run / None
