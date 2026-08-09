# TC-CART-013: Xác nhận dialog xóa loại bỏ sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Decision Table

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng chỉ có sản phẩm 7001.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-013` |

## Test steps

1. Chọn Xóa trên dòng sản phẩm 7001.
2. Quan sát dialog xác nhận.
3. Chọn Đồng ý và kiểm tra lại giỏ.

## Expected result

Dialog xác nhận xuất hiện; sau khi đồng ý, sản phẩm bị xóa và empty state được hiển thị.

## Status / Related bugs

Fail / BUG-CART-006 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/21
