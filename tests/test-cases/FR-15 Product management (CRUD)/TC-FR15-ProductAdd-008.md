# Thêm một sản phẩm vào hệ thống không có ảnh đại diện sản phẩm

## ID

TC-FR15-ProductAdd-008

## Mô tả

Tạo ra một sản phẩm mới thất bại trên hệ thống với thông tin:

- Tên sản phẩm là "Chuột Apple"
- Giá sản phẩm là *4000000* (bốn triệu đồng)
- Mô tả là: "Chuột không dây đến từ Apple"
- Ảnh đại diện rỗng
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
|Giá tiền|4000000 (bốn triệu đồng)|
|Mô tả|Chuột không dây đến từ Apple|
|Danh mục|Phụ kiện|

Invalid data:

|Name|Value|
|----|-----|
|URL ảnh|(empty)|

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**
4. Điền vào mục **Tên sản phẩm** giá trị `Chuột Apple`
5. Điền vào mục **Giá tiền** *`4000000`* (bốn triệu đồng)
6. Điền vào mục **Mô tả**: `Chuột không dây đến từ Apple`
7. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
8. Nhấn vào nút lưu sản phẩm.
9. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Kết quả mong đợi

Sau khi thực hiện bước 8:

- Hệ thống không ghi nhận sản phẩm
- Giao diện của admin không thể hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 9:

- Giao diện của người dùng không thể hiện sản phẩm mới tạo

## Trạng thái của testcase

Failed
