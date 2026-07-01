# TC-FR26-BVA-002: Không cho dòng giỏ hàng tồn tại với số lượng 0

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `cartLineQuantity` | Số lượng của một dòng sản phẩm đang tồn tại trong giỏ là số nguyên dương, lower boundary = 1 | Min boundary | **OFF⁻ = 0**, ON = 1, OFF⁺ = 2 |

### BVA Test Matrix

| TC | Số lượng cố gắng đạt tới | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---:|---:|---|---|---|
| TC-FR26-BVA-002 | 0 | 0 sản phẩm | OFF⁻ | Bắt đầu từ số lượng 1, thao tác bằng nút - trên Mobile App | Không hiển thị dòng sản phẩm với số lượng 0; nếu xóa sản phẩm thì phải có dialog xác nhận trước. |

> **Ghi chú:** Test case này isolate giá trị ngay dưới lower boundary. Hành vi chính xác khi bấm - tại số lượng 1 chưa được đặc tả, nên Expected Result chỉ ràng buộc điều bắt buộc: không có dòng sản phẩm hợp lệ với số lượng 0 và không xóa trước khi xác nhận.

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
| Số lượng cố gắng đạt tới | 0 |
| Boundary Value ID | BV-CARTQTY-002 |
| Boundary point | OFF⁻ |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng.
3. Tại dòng sản phẩm `iPhone 15 Pro Max` có số lượng 1, bấm nút -.
4. Quan sát số lượng hiển thị và trạng thái dòng sản phẩm sau thao tác.
5. Nếu hệ thống mở dialog xác nhận xóa, không chọn xác nhận trong phạm vi test case này.

## Expected result
Hệ thống không hiển thị dòng sản phẩm `iPhone 15 Pro Max` với số lượng 0. Nếu thao tác giảm từ 1 được xử lý như xóa sản phẩm, dialog xác nhận phải xuất hiện trước khi sản phẩm bị xóa. Nếu không có xác nhận xóa, sản phẩm vẫn còn trong giỏ với số lượng không nhỏ hơn 1.

## Status / Related bugs
Fail / [BUG-FR26-003](../../../../bug-reports/BUG-FR26-003.md)
