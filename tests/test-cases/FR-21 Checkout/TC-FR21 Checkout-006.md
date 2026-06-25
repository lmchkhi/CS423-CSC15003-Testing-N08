# Thực hiện thanh toán khi người dùng chưa đăng nhập

## ID

TC-FR21 Checkout-006

## Mô tả

Thực hiện thanh toán thất bại khi:

- Giỏ hàng có 1 sản phẩm
- Người dùng chưa đăng nhập

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
|Tên sản phẩm|Bàn phím cơ Keychron Q1|
|Giá sản phẩm|4000000|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào **Thêm vào giỏ** sản phẩm **Bàn phím cơ Keychron Q1**
3. Nhấn vào **Giỏ hàng**
4. Nhấn vào **Tiến hành thanh toán**

## Kết quả mong đợi

Sau khi thực hiện 4, giao diện hiện ra thông báo lỗi là cần đăng nhập để thanh toán.

## Trạng thái của testcase
