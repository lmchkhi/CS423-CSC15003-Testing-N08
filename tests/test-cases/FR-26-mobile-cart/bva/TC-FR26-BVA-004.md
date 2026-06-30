# TC-FR26-BVA-004: Giỏ hàng có 0 dòng sản phẩm tại biên empty

## Requirement ID
FR-26

## Module / Test type / Technique
Giỏ hàng trên Mobile / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| `cartItemCount` | Số dòng sản phẩm trong giỏ có lower boundary = 0 | Empty / non-empty boundary | OFF⁻ = -1, **ON = 0**, OFF⁺ = 1 |

### BVA Test Matrix

| TC | Số dòng sản phẩm trong giỏ | Measured value | Boundary Point | Các ràng buộc khác | Expected |
|---|---:|---:|---|---|---|
| TC-FR26-BVA-004 | 0 | 0 dòng | ON | Kiểm tra trên Mobile App | Màn Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho giỏ trống. |

> **Ghi chú:** Test case này isolate boundary empty của collection giỏ hàng. Không kiểm tra wording chính xác của thông báo vì requirement chưa đặc tả text cụ thể.

## Preconditions
- Ứng dụng Mobile đã mở được màn Giỏ hàng.
- Giỏ hàng không có sản phẩm nào.

## Test data

| Field | Value |
|---|---|
| Số dòng sản phẩm trong giỏ | 0 |
| Boundary Value ID | BV-CARTCOUNT-001 |
| Boundary point | ON |
| Trạng thái mong đợi | Empty state |

## Test steps
1. Mở ứng dụng Mobile.
2. Điều hướng đến màn Giỏ hàng khi giỏ không có sản phẩm nào.
3. Quan sát nội dung hiển thị trên màn Giỏ hàng.

## Expected result
Màn Giỏ hàng hiển thị trạng thái giỏ trống với hình minh họa và thông báo rõ ràng. Màn hình không hiển thị danh sách sản phẩm không tồn tại và không chỉ hiển thị khoảng trắng.

## Status / Related bugs
Not Run / None
