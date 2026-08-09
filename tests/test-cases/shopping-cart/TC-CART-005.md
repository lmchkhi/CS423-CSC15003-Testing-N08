# TC-CART-005: Hiển thị đầy đủ thông tin một dòng sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Equivalence Partitioning

## Preconditions

- Frontend Web đang hoạt động.
- Sản phẩm 7001 có thể được thêm từ trang chủ.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-005` |

## Test steps

1. Thêm sản phẩm 7001 vào giỏ.
2. Mở trang Giỏ hàng.
3. Quan sát dòng sản phẩm.

## Expected result

Dòng duy nhất hiển thị tên, đơn giá có phân cách hàng nghìn, số lượng 1, thành tiền và nút Xóa.

## Status / Related bugs

Pass / None
