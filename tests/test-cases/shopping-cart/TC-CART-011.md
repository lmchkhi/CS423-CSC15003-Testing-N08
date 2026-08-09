# TC-CART-011: Giảm số lượng bằng nút trừ

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

1. Mở giỏ có sản phẩm 7001 với số lượng 1.
2. Chọn nút `+` và xác nhận số lượng tăng thành 2.
3. Chọn nút `-`.
4. Đọc lại số lượng, thành tiền và tổng cộng.

## Expected result

- Nút `+` và `-` đều hiển thị.
- Sau khi chọn `+`, số lượng là 2, thành tiền và tổng cộng là `246912 ₫`.
- Sau khi chọn `-`, số lượng trở về 1, thành tiền và tổng cộng trở về `123456 ₫`.

## Status / Related bugs

Fail / BUG-CART-005 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/18
