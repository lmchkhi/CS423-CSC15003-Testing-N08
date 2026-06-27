# Thêm một sản phẩm vào hệ thống có giá là 0

## ID

TC-FR15-ProductAdd-003

## Mô tả

Tạo ra một sản phẩm mới trên hệ thống thất bại với thông tin:

- Tên sản phẩm là "Chuột Apple"
- Giá sản phẩm là *0* (không đồng)
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
|URL ảnh|https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE|
|Mô tả|Chuột không dây đến từ Apple|
|Danh mục|Phụ kiện|

Invalid data:

|Name|Value|
|----|-----|
|Giá sản phẩm|0|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Điền vào mục **Tên sản phẩm** giá trị `Chuột Apple`
5. Điền vào mục **Giá tiền** *`0`* (không đồng)
6. Điền vào mục **URL ảnh** giá trị [https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE)
7. Điền vào mục **Mô tả**: `Chuột không dây đến từ Apple`
8. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
9. Nhấn vào nút lưu sản phẩm.
10. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Kết quả mong đợi

Sau khi thực hiện bước 9:

- Hệ thống không ghi nhận sản phẩm và thông báo lỗi vì không có giá trị giá
- Giao diện của admin không hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 10:

- Giao diện của người dùng không có sản phẩm mới tạo

## Trạng thái của testcase

Failed
