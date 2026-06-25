# Cập nhật tên người dùng thành tên rỗng

## ID

TC-FR04-INFO-005

## Mô tả

Cập nhật thông tin tên người thành giá trị rỗng không thành công.

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

Invalid data:

- User data:

|Name|Value|
|----|-----|
|User name|(empty)|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Nhấn vào mục "Chào, Test User" (đường dẫn là: [http://localhost:5173/profile](http://localhost:5173/profile))
5. Xoá thông tin trong mục Tên
6. Nhấn nút xác nhận

## Kết quả mong đợi

Sau bước 6, giao diện hiện thông báo lỗi là tên người dùng bị rỗng. Hệ thống sẽ không ghi nhận thông tin người dùng.

## Trạng thái của testcase
