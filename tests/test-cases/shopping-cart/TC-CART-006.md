# TC-CART-006: Tính đúng thành tiền của một sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Equivalence Partitioning

## Preconditions

- Frontend Web đang hoạt động.
- Sản phẩm 7001 có giá 123456 và được thêm với số lượng 1.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-006` |

## Test steps

1. Thêm sản phẩm 7001 vào giỏ.
2. Mở trang Giỏ hàng.
3. Đọc thành tiền của dòng sản phẩm.

## Expected result

Thành tiền có giá trị số `123456 ₫`, có phân cách hàng nghìn và bằng đơn giá nhân số lượng.

## Status / Related bugs

Pass / None
