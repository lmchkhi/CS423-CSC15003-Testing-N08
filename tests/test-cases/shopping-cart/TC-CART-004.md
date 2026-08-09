# TC-CART-004: Hiển thị đúng năm tiêu đề cột

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Checklist

## Preconditions

- Frontend Web đang hoạt động.
- Giỏ hàng có một sản phẩm.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-004` |

## Test steps

1. Thêm một sản phẩm từ trang chủ.
2. Mở trang Giỏ hàng.
3. Đọc các tiêu đề cột của bảng.

## Expected result

Bảng có các cột “Sản phẩm”, “Đơn giá”, “Số lượng”, “Thành tiền”, “Thao tác”.

## Status / Related bugs

Fail / BUG-CART-002 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/19
