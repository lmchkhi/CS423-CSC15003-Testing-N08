# [BUG][Shopping Cart] Nút quay lại mua sắm sai nhãn khi giỏ có sản phẩm

## Found by Test Case

TC-CART-014

GitHub Issue: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/213

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
3. Quan sát nút quay về trang chủ.

## Expected result

Nút hiển thị nhãn “Tiếp tục mua sắm”.

## Actual result

Nút hiển thị nhãn “← Mua tiếp”.

## Evidence

![Failure evidence](../../artifacts/shopping-cart/chromium/shopping-cart-FR-07---Giỏ--e08d5--mua-sắm-từ-giỏ-có-sản-phẩm-chromium/test-failed-1.png)

[Trace](../../artifacts/shopping-cart/chromium/shopping-cart-FR-07---Giỏ--e08d5--mua-sắm-từ-giỏ-có-sản-phẩm-chromium/trace.zip)
