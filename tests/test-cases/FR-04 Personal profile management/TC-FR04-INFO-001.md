# Cập nhật hồ sơ cá nhân với dữ liệu hợp lệ

## ID

TC-FR04-INFO-001

## Mô tả

Thông tin người dùng được cập nhật khi nhập thông tin đúng như bình thường

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
|Phone Number|0123456789|
|Address|277 Nguyễn Văn Cừ Quận 5 Thành Phố Hồ Chí Minh|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Nhấn vào mục "Chào, Test User" (đường dẫn là: [http://localhost:5173/profile](http://localhost:5173/profile))
5. Chọn vào ô nhập số điện thoại và nhập số: 0912345678
6. Chọn vào ô nhập địa chỉ giao hàng và nhập: 277 Nguyễn Văn Cừ Quận 5 Thành Phố Hồ Chí Minh
7. Nhấn vào nút cập nhật

## Kết quả mong đợi

Hệ thống ghi nhận yêu cầu của người dùng, không thông báo lỗi

## Trạng thái của testcase
