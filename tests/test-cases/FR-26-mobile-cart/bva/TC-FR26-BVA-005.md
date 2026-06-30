# TC-FR26-BVA-005: Giỏ hàng có 1 dòng sản phẩm ngay trên biên empty

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `cartItemCount` | Số dòng sản phẩm trong giỏ có lower boundary = 0 | Empty / non-empty boundary | OFF⁻ = -1, ON = 0, **OFF⁺ = 1** |

### BVA Test Matrix

| TC | Số dòng sản phẩm trong giỏ | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---:|---:|---|---|---|
| TC-FR26-BVA-005 | 1 | 1 dòng | OFF⁺ | Dòng sản phẩm là `iPhone 15 Pro Max`, đơn giá 30000000, số lượng 1 | Màn Giỏ hàng hiển thị một dòng sản phẩm với thông tin bắt buộc và không hiển thị empty state. |

> **Ghi chú:** Test case này isolate trạng thái ngay trên empty boundary. Không kiểm tra thêm sản phẩm thứ hai hoặc rule thêm trùng sản phẩm trong test case này.

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng có đúng 1 dòng sản phẩm `iPhone 15 Pro Max`.
- Số lượng của `iPhone 15 Pro Max` đang là 1.

## Test data

| Field | Value |
|---|---|
| Sản phẩm | iPhone 15 Pro Max |
| Đơn giá | 30000000 |
| Số lượng | 1 |
| Số dòng sản phẩm trong giỏ | 1 |
| Boundary Value ID | BV-CARTCOUNT-002 |
| Boundary point | OFF⁺ |
| Thành tiền mong đợi | 30000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát danh sách sản phẩm trong giỏ hàng.
4. Kiểm tra số dòng sản phẩm và thông tin của dòng `iPhone 15 Pro Max`.

## Expected result
Màn Giỏ hàng hiển thị đúng 1 dòng sản phẩm `iPhone 15 Pro Max` với thông tin Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác. Màn hình không hiển thị empty state khi giỏ có một dòng sản phẩm.

## Status / Related bugs
Not Run / None
