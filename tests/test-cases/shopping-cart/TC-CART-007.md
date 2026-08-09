# TC-CART-007: Dùng chính xác nhãn Tổng cộng

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Equivalence Partitioning

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng có ít nhất một sản phẩm.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-007` |

## Test steps

1. Thêm sản phẩm 7001 vào giỏ.
2. Mở trang Giỏ hàng.
3. Đọc nhãn đứng trước tổng tiền.

## Expected result

Nhãn hiển thị chính xác “Tổng cộng”, không phải “Tổng tạm tính”.

## Status / Related bugs

Fail / BUG-CART-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/22
