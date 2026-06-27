# Thêm một sản phẩm vào hệ thống có giá bằng 1

## ID

TC-FR15-ProductAdd-010

## Mô tả

Tạo ra một sản phẩm mới trên hệ thống thành công với thông tin:

- Tên sản phẩm là "Chuột Apple"
- Giá sản phẩm là *1* (một đồng)
- Mô tả là: "Chuột không dây đến từ Apple"
- Ảnh đại diện là ảnh với URL: [https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE)
- Thuộc về danh mục Phụ kiện

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
|Tên sản phẩm|Chuột Apple|
|Giá tiền|1|
|URL ảnh|https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE|
|Mô tả|Chuột không dây đến từ Apple|
|Danh mục|Phụ kiện|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Điền vào mục **Tên sản phẩm** giá trị `Chuột Apple`
5. Điền vào mục **Giá tiền** *`1`* (một đồng)
6. Điền vào mục **URL ảnh** giá trị [https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE)
7. Điền vào mục **Mô tả**: `Chuột không dây đến từ Apple`
8. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
9. Nhấn vào nút lưu sản phẩm.
10. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)
11. Nhấn vào **Xem chi tiết** của sản phẩm `Chuột Apple`

## Kết quả mong đợi

Sau khi thực hiện bước 9:

- Hệ thống ghi nhận sản phẩm đã được thêm
- Giao diện của admin thể hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 10:

- Giao diện của người dùng thể hiện sản phẩm mới tạo với đúng giá, tên và hình ảnh đại diện được thể hiện lên.

Sau khi thực hiện bước 11:

- Giao diện người dùng thể hiện đầy đủ thông tin tên sản phẩm, mô tả, giá sản phẩm, hình ảnh đại diện.

## Trạng thái của testcase

Pass
