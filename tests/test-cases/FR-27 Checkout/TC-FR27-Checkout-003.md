# Thực hiện thanh toán với 0 sản phẩm trong giỏ hàng

## ID

TC-FR27-Checkout-003

## Mô tả

Thực hiện thanh toán thất bại khi:

- Giỏ hàng không có sản phẩm
- Người dùng đã đăng nhập

## Môi trường kiểm thử

Android 16

Expo Go Client version 54.0.8

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Testdata

Valid data:

|Name|Value|
|----|-----|
|Email|test@eshop.com|
|Password|Test1234!|

## Các bước thực hiện

0. Chạy chương trình backend, frontend mobile, frontend admin
1. Truy cập vào trang mobile với đường dẫn đã hiện khi chạy frontend mobile [exp://192.168.1.2:8081](exp://192.168.1.2:8081)
2. Nhấn vào nút Đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Truy cập vào giỏ hàng

## Kết quả mong đợi

Sau khi thực hiện bước 4, giao diện hiện thông báo giỏ hàng trống, hiện nút **Trở về trang chủ** và không hiện nút **Tiến hành thanh toán**.

## Trạng thái của testcase

Pass
