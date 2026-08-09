# TC-CART-011: Hiển thị nút trừ để giảm số lượng

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Sản phẩm 7001 có số lượng 1 trong giỏ hàng.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-011` |

## Test steps

1. Mở giỏ có sản phẩm 7001.
2. Quan sát vùng điều chỉnh số lượng.
3. Tìm nút `-` trên dòng sản phẩm.

## Expected result

Nút `-` được hiển thị để người dùng có thể giảm số lượng.

## Status / Related bugs

Fail / BUG-CART-005 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18
