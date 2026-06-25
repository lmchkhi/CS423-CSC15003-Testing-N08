# Cập nhật lại thông tin của sản phẩm nhưng không thay đổi bất kỳ giá trị gì

## ID

TC-FR15-Product management (CRUD)-025

## Mô tả

Cập nhật thành công một sản phẩm tên "iPhone 15 Pro Max" trên hệ thống nhưng không có thay đổi thông tin

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Testdata

Giá trị mặc định của sản phẩm iPhone 15 Pro Max:

|Name|Value|
|Tên sản phẩm|iPhone 15 Pro Max|
|Giá sản phẩm|30000000|
|URL ảnh|https://placehold.co/300x300/png?text=iPhone+15|
|Mô tả|Điện thoại cao cấp của Apple|
|Danh mục|Điện thoại|

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
4. Nhấn vào nút **Sửa** của sản phẩm **iPhone 15 Pro Max**
5. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
6. Nhấn vào nút lưu sản phẩm.
7. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)
8. Nhấn vào **Xem chi tiết** của sản phẩm `iPhone 15 Pro Max`

## Kết quả mong đợi

Sau khi thực hiện bước 6:

- Hệ thống ghi nhận thay đổi của sản phẩm
- Giao diện của admin vẫn hiện thông tin cũ sản phẩm đã chọn

Sau khi thực hiện bước 7:

- Giao diện còn hiện sản phẩm **iPhone 15 Pro Max**

Sau khi thực hiện bước 8:

- Giao diện người dùng thể hiện đầy đủ thông tin tên sản phẩm, mô tả, giá sản phẩm, hình ảnh đại diện cũ.

## Trạng thái của testcase
