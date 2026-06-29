# BUG-FR15-PRODUCTADD-008: Hệ thống cho phép tạo sản phẩm không có ảnh đại diện

## Found by Test Case

TC-FR15-ProductAdd-008

## Requirement liên quan

FR-15 Product management (CRUD)

## Severity / Priority

## Environment

Windows 10, Google Chrome Version 149.0.7827.103

## Steps to reproduce

1. Chạy chương trình backend, frontend web, frontend admin
2. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
3. Đăng nhập với tên email: [admin@eshop.com](mailto:admin@eshop.com) và mật khẩu là Admin123!
4. Nhấn vào mục: Sản phẩm
5. Điền vào mục Tên sản phẩm giá trị Chuột Apple
6. Điền vào mục Giá tiền 4000000
7. Điền vào mục Mô tả: Chuột không dây đến từ Apple
8. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
9. Nhấn vào nút lưu sản phẩm.
10. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Expected result

Sau khi thực hiện bước 8:

- Hệ thống không ghi nhận sản phẩm
- Giao diện của admin không thể hiện ra sản phẩm mới tạo

Sau khi thực hiện bước 9:

- Giao diện của người dùng không thể hiện sản phẩm mới tạo

## Actual result

## Evidence

Ảnh trước khi thêm sản phẩm vào hệ thống:

![Ảnh trước khi thêm sản phẩm](tests/test-runs/FR15/assets/image-18.png)

Ảnh sau khi thêm sản phẩm vào:

![Ảnh sau khi thêm](tests/test-runs/FR15/assets/image-19.png)

Ảnh giao diện người dùng sau khi thêm:

![Ảnh giao diện người dùng sau khi thêm sản phẩm](tests/test-runs/FR15/assets/image-20.png)
