# TC-FR26-DT-002: Thêm cùng một sản phẩm vào giỏ làm tăng số lượng

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `sameProductAdd` | User action / system state | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng, không tạo dòng mới. |
| `cartState` | System state | Giỏ hàng đã có sản phẩm mục tiêu trước khi thêm lại. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `sameProductAdd` | Expected |
|---|---|---|---|
| COND-FR26-DT-002 | Giỏ đã có Áo thun Basic số lượng 1 | EC-SAMEPRODUCT-V01 và EC-SAMEPRODUCT-I01 | Giỏ chỉ có một dòng Áo thun Basic, số lượng tăng lên 2, không tạo dòng mới trùng sản phẩm. |

## Preconditions
- Ứng dụng Mobile có thể thêm sản phẩm vào giỏ từ màn danh sách hoặc chi tiết sản phẩm.
- Giỏ hàng đang có đúng 1 dòng Áo thun Basic với số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm thêm lại | Áo thun Basic |
| Đơn giá | 120000 |
| Số lượng trước khi thêm | 1 |
| Số lượng mong đợi sau khi thêm | 2 |
| Số dòng Áo thun Basic mong đợi | 1 |

## Test steps
1. Mở ứng dụng Mobile.
2. Mở màn danh sách hoặc chi tiết sản phẩm có Áo thun Basic.
3. Thực hiện thao tác thêm Áo thun Basic vào giỏ hàng thêm 1 lần.
4. Mở màn Giỏ hàng.
5. Quan sát số dòng Áo thun Basic và số lượng hiển thị trên dòng đó.

## Expected result
Giỏ hàng chỉ hiển thị 1 dòng Áo thun Basic. Số lượng của dòng Áo thun Basic tăng từ 1 lên 2. Hệ thống không tạo dòng Áo thun Basic thứ hai.

## Status / Related bugs
Not Run / None
