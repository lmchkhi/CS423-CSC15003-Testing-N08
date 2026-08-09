# TC-CART-014: Tiếp tục mua sắm từ giỏ có sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng có sản phẩm 7001.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-014` |

## Test steps

1. Mở trang Giỏ hàng có sản phẩm.
2. Chọn nút “Tiếp tục mua sắm”.
3. Quan sát URL.

## Expected result

Nút có nhãn “Tiếp tục mua sắm” và đưa người dùng về trang chủ `/`.

## Status / Related bugs

Fail / BUG-CART-007 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/213
