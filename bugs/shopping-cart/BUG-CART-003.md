# [BUG][Shopping Cart] Tổng tiền dùng nhãn Tổng tạm tính

## Found by Test Case

TC-CART-007

GitHub Issue: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/22

## Requirement liên quan

FR-07

## Severity / Priority

Minor / P2

## Environment

- Browser: Chromium (Playwright 1.62.1)
- OS: macOS 26.5.2 (25F84)
- URL: http://127.0.0.1:5173/cart
- Build/commit: d76d95f
- Run timestamp: 2026-08-09T05:55:09.293Z

## Steps to reproduce

1. Thêm một sản phẩm vào giỏ.
2. Mở trang Giỏ hàng.
3. Quan sát nhãn đứng trước tổng tiền.

## Expected result

Nhãn hiển thị chính xác “Tổng cộng”.

## Actual result

Nhãn hiển thị “Tổng tạm tính”.

## Evidence

![Failure evidence](../../artifacts/shopping-cart/chromium/shopping-cart-FR-07---Giỏ--466b3-ng-chính-xác-nhãn-Tổng-cộng-chromium/test-failed-1.png)

[Trace](../../artifacts/shopping-cart/chromium/shopping-cart-FR-07---Giỏ--466b3-ng-chính-xác-nhãn-Tổng-cộng-chromium/trace.zip)
