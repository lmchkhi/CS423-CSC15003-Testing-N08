# Thực hiện thanh toán thành công sau khi huỷ thanh toán

## ID

TC-FR21 Checkout-001

## Mô tả

Thực hiện thanh toán thành công khi:

- Giỏ hàng có 1 sản phẩm
- Người dùng đã đăng nhập

Sau đó thanh toán được huỷ bằng cách truy cập vào trang chủ và thực hiện lại quá trình thanh toán

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
2. Nhấn vào nút Đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Nhấn vào **Thêm vào giỏ** sản phẩm **Bàn phím cơ Keychron Q1**
5. Nhấn vào **Giỏ hàng**
6. Nhấn vào **Tiến hành thanh toán**
7. Truy cập vào trang chủ với đường dẫn [http://localhost:5173/](http://localhost:5173/)
8. Thực hiện lại bước 5 và 6
9. Nhấn vào **Xác nhận thanh toán**
10. Nhấn vào **Quay lại trang chủ**
11. Nhấn vào trang xem thông tin cá nhân [Chào Test User](http://localhost:5173/profile)

## Kết quả mong đợi

Sau khi thực hiện 6 và 7, hệ thống không ghi nhận thanh toán

Sau khi thực hiện bước 9:

- Giao diện thông báo là đã thực hiện thanh toán thành công và hiện nút trở về trang chủ.

Sau khi thực hiện bước 11, giao diện hiện 1 đơn hàng với giá *4000000* (bốn triệu đồng)

## Trạng thái của testcase
