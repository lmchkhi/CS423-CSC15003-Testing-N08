# TC-CART-001: Hiển thị thông báo khi giỏ hàng trống

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng của phiên trình duyệt đang trống.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-001` |

## Test steps

1. Mở trang chủ trong phiên mới.
2. Chọn liên kết Giỏ hàng.
3. Quan sát trạng thái trống.

## Expected result

Hiển thị thông báo rõ ràng “Giỏ hàng của bạn đang trống”.

## Status / Related bugs

Pass / None
