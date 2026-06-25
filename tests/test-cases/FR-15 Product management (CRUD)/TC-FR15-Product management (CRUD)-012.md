# Thêm một sản phẩm vào hệ thống với danh mục mặc định

## ID

TC-FR15-Product management (CRUD)-012

## Mô tả

Tạo ra một sản phẩm mới trên hệ thống thành công với thông tin:

- Tên sản phẩm là "iPhone 15 Pro Cũ"
- Giá sản phẩm là *20000000* (hai chục triệu đồng)
- Mô tả là: "iPhone 15 Pro đã bị trầy xướt và qua sử dụng 2 năm"
- Ảnh đại diện là ảnh với URL: [https://placehold.co/300x300/png?text=iPhone+15+Cu](https://placehold.co/300x300/png?text=iPhone+15+Cu)
- Thuộc về danh mục mặc định (Điện thoại)

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
|Tên sản phẩm|iPhone 15 Pro Cũ|
|Giá tiền|20000000|
|URL ảnh|https://placehold.co/300x300/png?text=iPhone+15+Cu|
|Mô tả|iPhone 15 Pro đã bị trầy xướt và qua sử dụng 2 năm|
|Danh mục|(Giá trị mặc định - Điện thoại)|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Điền vào mục **Tên sản phẩm** giá trị `iPhone 15 Pro Cũ`
5. Điền vào mục **Giá tiền** *`20000000`* (hai chục triệu đồng)
6. Điền vào mục **URL ảnh** giá trị [https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE)
7. Điền vào mục **Mô tả**: `iPhone 15 Pro đã bị trầy xướt và qua sử dụng 2 năm`
8. Nhấn vào nút lưu sản phẩm.
9. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)
10. Nhấn vào **Xem chi tiết** của sản phẩm `Chuột Apple`

## Kết quả mong đợi

Sau khi thực hiện bước 8:

- Hệ thống ghi nhận sản phẩm đã được thêm
- Giao diện của admin thể hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 9:

- Giao diện của người dùng thể hiện sản phẩm mới tạo với giá, tên và hình ảnh đại diện đã tạo.

Sau khi thực hiện bước 10:

- Giao diện người dùng thể hiện đầy đủ thông tin tên sản phẩm, mô tả, giá sản phẩm, hình ảnh đại diện như đã tạo.

## Trạng thái của testcase
