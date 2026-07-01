# TC-FR26-BVA-003: Số lượng dòng giỏ hàng tăng lên 2 ngay trên biên dưới

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `cartLineQuantity` | Số lượng của một dòng sản phẩm đang tồn tại trong giỏ là số nguyên dương, lower boundary = 1 | Min boundary | OFF⁻ = 0, ON = 1, **OFF⁺ = 2** |

### BVA Test Matrix

| TC | Số lượng sau thao tác | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---:|---:|---|---|---|
| TC-FR26-BVA-003 | 2 | 2 sản phẩm | OFF⁺ | Bắt đầu từ số lượng 1, thao tác bằng nút + trên Mobile App | Số lượng tăng lên 2; thành tiền và Tổng cộng cập nhật tương ứng. |

> **Ghi chú:** Test case này isolate giá trị ngay trên lower boundary. Các yếu tố khác dùng nominal value hợp lệ.

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có đúng 1 dòng sản phẩm `iPhone 15 Pro Max`.
- Số lượng của `iPhone 15 Pro Max` đang là 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng trước thao tác | 1 |
| Số lượng sau thao tác | 2 |
| Boundary Value ID | BV-CARTQTY-003 |
| Boundary point | OFF⁺ |
| Thành tiền mong đợi | 60000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng sản phẩm `iPhone 15 Pro Max` có số lượng 1, bấm nút + một lần.
4. Quan sát số lượng, thành tiền của dòng sản phẩm và khu vực Tổng cộng.

## Expected result
Số lượng của `iPhone 15 Pro Max` tăng từ 1 lên 2. Thành tiền của dòng sản phẩm là 60000000. Khu vực Tổng cộng cập nhật tương ứng với số lượng mới.

## Status / Related bugs
Fail / [BUG-FR26-002](../../../../bug-reports/BUG-FR26-002.md)
