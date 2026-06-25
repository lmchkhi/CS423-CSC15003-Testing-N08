# Kiểm tra người dùng không thay đổi role của chính mình trong giao diện

## ID

TC-FR04-INFO-004

## Mô tả

Kiểm tra giao diện không cho phép người dùng thay đổi role của chính mình

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Test data

Valid data:

- User data:

|Name|Value|
|----|-----|
|Email|test@eshop.com|
|Password|Test1234!|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Nhấn vào mục "Chào, Test User" (đường dẫn là: [http://localhost:5173/profile](http://localhost:5173/profile))

## Kết quả mong đợi

Giao diện không có mục Role trong form cập nhật thông tin

## Trạng thái của testcase
