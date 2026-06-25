# Thực hiện thanh toán thành công với 2 sản phẩm trong giỏ hàng

## ID

TC-FR21 Checkout-002

## Mô tả

Thực hiện thanh toán thành công khi:

- Giỏ hàng có 2 sản phẩm
- Người dùng đã đăng nhập

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Testdata

Valid data:

|Name|Value|
|----|-----|
|Email|test@eshop.com|
|Password|Test1234!|
|Tên sản phẩm đầu tiên|Bàn phím cơ Keychron Q1|
|Giá sản phẩm đầu tiên|4000000|
|Tên sản phẩm thứ hai|MacBook Pro M3|
|Giá sản phẩm thứ hai|45000000|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào nút Đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Nhấn vào **Thêm vào giỏ** sản phẩm **Bàn phím cơ Keychron Q1** và sản phẩm **MacBook Pro M3
5. Nhấn vào **Giỏ hàng**
6. Nhấn vào **Tiến hành thanh toán**
7. Nhấn vào **Xác nhận thanh toán**
8. Nhấn vào **Quay lại trang chủ**
9. Nhấn vào **Giỏ hàng**

## Kết quả mong đợi

Sau khi thực hiện 6, giao diện hiện ra tổng tiền thanh toán là *49000000* (bốn mươi chín triệu đồng)

Sau khi thực hiện bước 7:

- Giao diện thông báo là đã thực hiện thanh toán thành công và hiện nút trở về trang chủ.

Sau khi thực hiện bước 9:

- Giao diện không còn chứa các sản phẩm đã đặt trước đó.

## Trạng thái của testcase
