# TC-CART-012: Hủy dialog xóa giữ nguyên sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Decision Table

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng có sản phẩm 7001.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-012` |

## Test steps

1. Chọn Xóa trên dòng sản phẩm 7001.
2. Quan sát dialog xác nhận.
3. Chọn Hủy và kiểm tra lại giỏ.

## Expected result

Dialog xác nhận xuất hiện; khi hủy, sản phẩm vẫn còn trong giỏ.

## Status / Related bugs

Fail / BUG-CART-006 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/21
