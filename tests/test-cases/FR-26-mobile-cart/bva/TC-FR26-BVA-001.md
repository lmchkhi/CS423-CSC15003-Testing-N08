# TC-FR26-BVA-001: Số lượng dòng giỏ hàng bằng 1 tại biên dưới

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `cartLineQuantity` | Số lượng của một dòng sản phẩm đang tồn tại trong giỏ là số nguyên dương, lower boundary = 1 | Min boundary | OFF⁻ = 0, **ON = 1**, OFF⁺ = 2 |

### BVA Test Matrix

| TC | Số lượng dòng giỏ | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---:|---:|---|---|---|
| TC-FR26-BVA-001 | 1 | 1 sản phẩm | ON | Sản phẩm `iPhone 15 Pro Max`, đơn giá 30000000, kiểm tra trên Mobile App | Dòng sản phẩm được chấp nhận, hiển thị số lượng 1 và thành tiền 30000000. |

> **Ghi chú:** Test case này isolate lower boundary ON của `cartLineQuantity`. Không kiểm tra xóa, điều hướng, hoặc empty state trong test case này.

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
| Boundary Value ID | BV-CARTQTY-001 |
| Boundary point | ON |
| Thành tiền mong đợi | 30000000 |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Quan sát dòng sản phẩm `iPhone 15 Pro Max`.
4. Kiểm tra số lượng và thành tiền của dòng sản phẩm.

## Expected result
Dòng sản phẩm `iPhone 15 Pro Max` được hiển thị với số lượng 1. Thành tiền của dòng là 30000000. Sản phẩm không bị xóa tự động và không hiển thị số lượng nhỏ hơn 1.

## Status / Related bugs
Passed / None
