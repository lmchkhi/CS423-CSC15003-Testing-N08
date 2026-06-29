# BUG-FR15-PRODUCTADD-011: Hệ thống cho phép tạo sản phẩm với giá âm

## Found by Test Case
TC-FR15-ProductAdd-011

## Requirement liên quan
FR-15 Product management (CRUD)

## Severity / Priority


## Environment
Windows 10, Google Chrome Version 149.0.7827.103

## Steps to reproduce
1. Chạy chương trình backend, frontend web, frontend admin
2. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
3. Đăng nhập với tên email: admin@eshop.com và mật khẩu là Admin123!
4. Nhấn vào mục: Sản phẩm
5. Điền vào mục Tên sản phẩm giá trị Chuột Apple
6. Điền vào mục Giá tiền -1
7. Điền vào mục URL ảnh giá trị [https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRsBYrTmOZaCeoJpFZbK96OZyoCKxFMT94Q030gyDooD_bwyAfTMo_8aE)
8. Điền vào mục Mô tả: Chuột không dây đến từ Apple
9. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
10. Nhấn vào nút lưu sản phẩm.
11. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Expected result
Sau khi thực hiện bước 9:

- Hệ thống không ghi nhận sản phẩm
- Giao diện của admin không thể hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 10:

- Giao diện của người dùng không thể hiện sản phẩm mới tạo

## Actual result

## Evidence
Ảnh giao diện trước khi thêm sản phẩm:
![Ảnh trước khi thêm sản phẩm](tests/test-runs/FR15/assets/image-30.png)

Ảnh sau khi thêm sản phẩm:
![Ảnh sau khi thêm sản phẩm mới](tests/test-runs/FR15/assets/image-31.png)

Ảnh giao diện người dùng sau khi thêm sản phẩm:
![Ảnh giao diện người dùng sau khi thêm](tests/test-runs/FR15/assets/image-32.png)
