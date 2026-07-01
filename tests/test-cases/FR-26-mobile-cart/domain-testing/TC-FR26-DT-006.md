# TC-FR26-DT-006: Thêm cùng sản phẩm vào giỏ làm tăng số lượng, không tạo dòng mới

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `sameProductAdd` | User action / system state | Thêm cùng một sản phẩm phải tăng số lượng dòng hiện có, không tạo dòng mới. |
| `cartState` | System state | Giỏ hàng đã có sản phẩm mục tiêu trước khi thêm lại. |
| `mobilePresentation` | UI context | Kiểm tra trên giao diện Mobile App. |

### Domain Matrix

| TC | `cartState` | `sameProductAdd` | Expected |
|---|---|---|---|
| COND-FR26-DT-006 | Giỏ đã có iPhone 15 Pro Max số lượng 1 | EC-SAMEPRODUCT-V01, EC-SAMEPRODUCT-I01 | Chỉ có một dòng iPhone 15 Pro Max, số lượng tăng lên 2. |

## Preconditions
- Ứng dụng Mobile có thể thêm sản phẩm vào giỏ từ màn danh sách hoặc chi tiết sản phẩm.
- Giỏ hàng đang có đúng 1 dòng iPhone 15 Pro Max với số lượng 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm thêm lại | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng trước khi thêm | 1 |
| Số lượng mong đợi sau khi thêm | 2 |
| Số dòng iPhone 15 Pro Max mong đợi | 1 |

## Test steps
1. Mở ứng dụng Mobile.
2. Mở màn danh sách hoặc chi tiết sản phẩm có iPhone 15 Pro Max.
3. Thêm iPhone 15 Pro Max vào giỏ hàng thêm 1 lần.
4. Mở màn Giỏ hàng.
5. Quan sát số dòng iPhone 15 Pro Max và số lượng hiển thị.

## Expected result
Giỏ hàng chỉ hiển thị 1 dòng iPhone 15 Pro Max. Số lượng của dòng iPhone 15 Pro Max tăng từ 1 lên 2. Hệ thống không tạo dòng iPhone 15 Pro Max thứ hai.

## Status / Related bugs
Pass / None
