# Cập nhật lại thông tin của sản phẩm với giá âm

## ID

TC-FR15-ProductEdit-022

## Mô tả

Cập nhật thất bại một sản phẩm tên "iPhone 15 Pro Max" trên hệ thống thành thông tin:

- Tên sản phẩm là "Vỏ iPhone 15 Pro Max"
- Giá sản phẩm là *-1* (âm một đồng)
- Mô tả là: "Vỏ điện thoại cao cấp của Apple"
- Ảnh đại diện là ảnh với URL: [https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro](https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro)
- Thuộc về danh mục Phụ kiện

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
|Tên sản phẩm|Vỏ iPhone 15 Pro Max|
|URL ảnh|https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro|
|Mô tả|Vỏ điện thoại cao cấp của Apple|
|Danh mục|Phụ kiện|

Invalid data:

|Name|Value|
|----|-----|
|Giá tiền|-1|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Nhấn vào nút **Sửa** của sản phẩm **iPhone 15 Pro Max**
5. Điền vào mục **Tên sản phẩm** giá trị `Vỏ iPhone 15 Pro Max`
6. Điền vào mục **Giá tiền** *`3000000`* (ba triệu đồng)
7. Điền vào mục **URL ảnh** giá trị [https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro](https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro)
8. Điền vào mục **Mô tả**: `Vỏ điện thoại cao cấp của Apple`
9. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
10. Nhấn vào nút lưu sản phẩm.
11. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)
12. Nhấn vào **Xem chi tiết** của sản phẩm `iPhone 15 Pro Max`

## Kết quả mong đợi

Sau khi thực hiện bước 10:

- Hệ thống không ghi nhận thay đổi của sản phẩm
- Giao diện của admin không thể hiện ra thay đổi và thông báo lỗi "Giá sản phẩm không hợp lệ" được hiển thị

Sau khi thực hiện bước 11:

- Giao diện còn hiện sản phẩm **iPhone 15 Pro Max**

Sau khi thực hiện bước 12:

- Giao diện người dùng thể hiện đầy đủ thông tin tên sản phẩm, mô tả, giá sản phẩm, hình ảnh đại diện như cũ.

## Trạng thái của testcase

Failed
