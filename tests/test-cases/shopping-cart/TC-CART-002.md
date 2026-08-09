# TC-CART-002: Hiển thị hình minh họa khi giỏ hàng trống

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / UI Functional / State Transition

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng của phiên trình duyệt đang trống.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-002` |

## Test steps

1. Mở trang chủ trong phiên mới.
2. Mở trang Giỏ hàng.
3. Kiểm tra vùng nội dung chính của empty state.

## Expected result

Empty state có ít nhất một hình ảnh, SVG hoặc phần tử mang vai trò hình minh họa.

## Status / Related bugs

Fail / BUG-CART-001 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/23
