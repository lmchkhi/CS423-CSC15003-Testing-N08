# Cập nhật hồ sơ với dữ liệu số điện thoại không hợp lệ (có ký tự)

## ID

TC-FR04-INFO-002

## Mô tả

Thông tin người dùng được xử lý đúng (thông báo lỗi) khi người dùng nhập thông tin số điện thoại sai

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Test data

## Test data

Valid data:

- User data:

|Name|Value|
|----|-----|
|Email|test@eshop.com|
|Password|Test1234!|
|Address|277 Nguyễn Văn Cừ Quận 5 Thành Phố Hồ Chí Minh|

Invalid data:

- User data:

|Name|Value|
|----|-----|
|Phone Number|0|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Nhấn vào mục "Chào, Test User" (đường dẫn là: [http://localhost:5173/profile](http://localhost:5173/profile))
5. Chọn vào ô nhập số điện thoại và nhập số: 0
6. Chọn vào ô nhập địa chỉ giao hàng và nhập: 277 Nguyễn Văn Cừ Quận 5 Thành Phố Hồ Chí Minh
7. Nhấn vào nút cập nhật

## Kết quả mong đợi

Hệ thống thông báo lỗi về số điện thoại không hợp lệ và không ghi nhận thông tin người dùng

## Trạng thái của testcase

Pass
