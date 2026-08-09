# TC-CART-003: Tiếp tục mua sắm từ giỏ hàng trống

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng trống và người dùng đang ở trang Giỏ hàng.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-003` |

## Test steps

1. Mở trang Giỏ hàng trống.
2. Chọn “Tiếp tục mua sắm”.
3. Quan sát URL.

## Expected result

Người dùng được chuyển về trang chủ `/`.

## Status / Related bugs

Pass / None
