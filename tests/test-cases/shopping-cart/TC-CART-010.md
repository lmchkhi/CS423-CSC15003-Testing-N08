# TC-CART-010: Tăng số lượng bằng nút cộng

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Sản phẩm 7001 có số lượng 1 trong giỏ.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-010` |

## Test steps

1. Mở giỏ có sản phẩm 7001.
2. Chọn nút `+` trên dòng sản phẩm.
3. Đọc số lượng sau thao tác.

## Expected result

Số lượng tăng từ 1 lên 2 và giao diện phản ánh trạng thái mới.

## Status / Related bugs

Fail / BUG-CART-005 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18
