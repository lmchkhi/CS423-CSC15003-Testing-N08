# Kiểm tra thực hiện thanh toán không cho phép người dùng chỉnh sửa tổng tiền

## ID

TC-FR27-Checkout-004

## Mô tả

Thực hiện thanh toán khi:

- Giỏ hàng có 1 sản phẩm
- Người dùng đã đăng nhập

Và kiểm tra giao diện không cho phép người dùng chỉnh sửa lại tổng giá trị đơn hàng

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
|Tên sản phẩm|Bàn phím cơ Keychron Q1|
|Giá sản phẩm|4000000|

## Các bước thực hiện

0. Chạy chương trình backend, frontend mobile, frontend admin
1. Truy cập vào trang mobile với đường dẫn [exp://192.168.1.2:8081](exp://192.168.1.2:8081)
2. Nhấn vào nút Đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Nhấn vào **Thêm vào giỏ** sản phẩm **Bàn phím cơ Keychron Q1**
5. Nhấn vào **Giỏ hàng**
6. Nhấn vào **Tiến hành thanh toán**
7. Nhấn vào ô **Tổng tiền thanh toán** và đổi thành giá trị *1*
8. Nhấn vào **Xác nhận thanh toán**
9. Nhấn vào trang xem thông tin cá nhân Chào Test User

## Kết quả mong đợi

Sau khi thực hiện 6, giao diện hiện ra tổng tiền thanh toán là *4000000* (bốn triệu đồng)

Sau khi thực hiện bước 7, giao diện không cho phép nhập vào giá trị *1*

Sau khi thực hiện bước 8, giao diện thông báo là đã thực hiện thanh toán thành công và hiện nút trở về trang chủ.

Sau khi thực hiện bước 9, giao diện hiện đơn hàng với giá *4000000* (bốn triệu đồng)

## Trạng thái của testcase

Pass
