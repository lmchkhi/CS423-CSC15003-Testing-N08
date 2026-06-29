# BUG-FR09-DISCOUNT-014: Hệ thống cho phép thanh toán mà không nhập mã giảm

## Found by Test Case

TC-FR09-DISCOUNT-014

## Requirement liên quan

FR-09 Discount coupons

## Severity / Priority

## Environment

Windows 10, Google Chrome Version 149.0.7827.103

## Steps to reproduce

1. Chạy chương trình backend, frontend web, frontend admin
2. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
3. Nhấn vào mục đăng nhập
4. Đăng nhập với tên email: [test@eshop.com](mailto:test@eshop.com) và mật khẩu là Test1234!
5. Thêm vào giỏ hàng sản phẩm Bàn phím cơ Keychron Q1
6. Nhấn vào mục xem giỏ hàng
7. Nhấn vào Tiến hành thanh toán
8. Nhấn vào Áp dụng
9. Nhấn vào Xác nhận thanh toán

## Expected result

Sau bước 7, giao diện hiện thông báo cần nhập vào mã giảm.

## Actual result

## Evidence

## Kết quả

![GIF thực hiện](tests/test-runs/FR09/assets/2026-06-2619-01-24-ezgif.com-video-to-gif-converter.gif)
