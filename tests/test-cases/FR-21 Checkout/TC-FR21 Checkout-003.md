# Thực hiện thanh toán thành công với 0 sản phẩm trong giỏ hàng

## ID

TC-FR21 Checkout-003

## Mô tả

Thực hiện thanh toán thất bại khi:

- Giỏ hàng không có sản phẩm
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

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào nút Đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Truy cập vào trang [http://localhost:5173/checkout](http://localhost:5173/checkout)

## Kết quả mong đợi

Sau khi thực hiện bước 4, giao diện chuyển về trang giỏ hàng

## Trạng thái của testcase
