# BUG-FR09-DISCOUNT-008: Hệ thống cho phép áp dụng mã giảm giá khi người dùng chưa đăng nhập

## Found by Test Case

TC-FR09-DISCOUNT-008

## Requirement liên quan

FR-09 Discount coupons

## Severity / Priority

## Environment

Windows 10, Google Chrome Version 149.0.7827.103

## Steps to reproduce

1. Chạy chương trình backend, frontend web, frontend admin
2. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
3. Đăng nhập với tên email: [test@eshop.com](mailto:test@eshop.com) và mật khẩu là Test1234!
4. Thêm vào giỏ hàng sản phẩm Bàn phím cơ Keychron Q1
5. Nhấn vào mục xem giỏ hàng
6. Nhấn vào Tiến hành thanh toán
7. Nhấn vào nút Thoát
8. Nhập vào mục Mã giảm giá, nhập mã: SAVE10
9. Nhấn vào Áp dụng

## Expected result

Giao diện sẽ thông báo cho người dùng biết cần phải đăng nhập mới có thể sử dụng mã giảm giá.

## Actual result

## Evidence

Ảnh thực hiện sau khi áp dụng mã

![Ảnh thực hiện](tests/test-runs/FR09/assets/image-13.png)
