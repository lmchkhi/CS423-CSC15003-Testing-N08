# Xoá một sản phẩm đã có sẵn

## ID

TC-FR15-Product management (CRUD)-027

## Mô tả

Xoá sản phẩm đã có sẵn trên hệ thống. Sản phẩm xoá tên là "MacBook Pro M3"

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
4. Nhấn vào nút **Xoá** cho sản phẩm **MacBook Pro M3**
5. Xác nhận xoá sản phẩm
6. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Kết quả mong đợi

Sau khi thực hiện bước 4:

- Hệ thống hiện thông báo xác nhận xoá sản phẩm

Sau khi thực hiện bước 5:

- Hệ thống xoá sản phẩm
- Giao diện của admin không còn thể hiện ra sản phẩm

Sau khi thực hiện bước 6:

- Giao diện không còn sản phẩm tên **MacBook Pro M3**

## Trạng thái của testcase
