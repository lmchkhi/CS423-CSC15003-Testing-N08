# TC-CART-008: Tính tổng tiền của nhiều sản phẩm

## Requirement ID

FR-07

## Module / Test type / Technique

Shopping Cart / Functional / Decision Table

## Preconditions

- Frontend Web đang hoạt động.
- Hai sản phẩm 7001 và 7002 có giá lần lượt 123456 và 250000.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/shopping-cart.json` |
| Case key | `TC-CART-008` |

## Test steps

1. Thêm mỗi sản phẩm 7001 và 7002 một lần.
2. Mở trang Giỏ hàng.
3. Đọc số dòng và tổng tiền.

## Expected result

Bảng có hai dòng sản phẩm và tổng tiền có giá trị số `373456 ₫` với phân cách hàng nghìn.

## Status / Related bugs

Pass / None
