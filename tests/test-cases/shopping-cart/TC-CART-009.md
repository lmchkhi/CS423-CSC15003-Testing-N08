# TC-CART-009: Gộp sản phẩm trùng và tăng số lượng

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Sản phẩm 7001 chưa có trong giỏ.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-009` |

## Test steps

1. Thêm sản phẩm 7001 hai lần.
2. Mở trang Giỏ hàng.
3. Đếm số dòng của sản phẩm và đọc số lượng.

## Expected result

Chỉ có một dòng sản phẩm 7001 với số lượng 2.

## Status / Related bugs

Fail / BUG-CART-004 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/20
