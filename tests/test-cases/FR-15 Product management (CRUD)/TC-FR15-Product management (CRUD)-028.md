# Xoá một sản phẩm đã có sẵn khi đang sửa sản phẩm

## ID

TC-FR15-Product management (CRUD)-028

## Mô tả

Xoá sản phẩm đã có sẵn trên hệ thống khi đang chỉnh sửa thông tin sản phẩm xoá tên là "MacBook Pro M3"

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Testdata

Valid data:

|Name|Value|
|----|-----|
|Admin Email|admin@eshop.com|
|Admin Password|Admin123!|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Nhấn vào nút **Sửa** cho sản phẩm **MacBook Pro M3**
5. Nhấn vào nút **Xoá** cho sản phẩm **MacBook Pro M3**
6. Xác nhận xoá sản phẩm
7. Nhấn vào nút **Lưu sản phẩm**
8. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Kết quả mong đợi

Sau khi thực hiện bước 5:

- Hệ thống hiện thông báo xác nhận xoá sản phẩm

Sau khi thực hiện bước 6:

- Hệ thống thông báo không xoá sản phẩm vì sản phẩm đang được chỉnh sửa
- Giao diện của admin còn thể hiện ra sản phẩm

Sau khi thực hiện bước 7:

- Giao diện vẫn còn sản phẩm tên **MacBook Pro M3**

## Trạng thái của testcase
