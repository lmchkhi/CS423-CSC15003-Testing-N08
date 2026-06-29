# BUG-FR15-PRODUCTEDIT-014: Hệ thống không chặn cập nhật sản phẩm với giá bằng 0

## Found by Test Case
TC-FR15-ProductEdit-014

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
5. Nhấn vào nút Sửa của sản phẩm iPhone 15 Pro Max
6. Điền vào mục Tên sản phẩm giá trị Vỏ iPhone 15 Pro Max
7. Điền vào mục Giá tiền 0
8. Điền vào mục URL ảnh giá trị [https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro](https://placehold.co/300x300/png?text=Vo+iPhone+15+Pro)
9. Điền vào mục Mô tả: Vỏ điện thoại cao cấp của Apple
10. Chọn vào mục ghi "Điện thoại" và chỉnh lại thành giá trị "Phụ kiện"
11. Nhấn vào nút lưu sản phẩm.
12. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)
13. Nhấn vào Xem chi tiết của sản phẩm `iPhone 15 Pro Max`

## Expected result
Sau khi thực hiện bước 10:

- Hệ thống không ghi nhận thay đổi của sản phẩm và thông báo cần phải nhập giá lớn hơn 0
- Giao diện của admin vẫn còn giữ thông tin sản phẩm đã chọn

Sau khi thực hiện bước 11:

- Giao diện còn hiện sản phẩm **iPhone 15 Pro Max**

Sau khi thực hiện bước 12:

- Giao diện người dùng thể hiện đầy đủ thông tin tên sản phẩm, mô tả, giá sản phẩm, hình ảnh đại diện của sản phẩm cũ.

## Actual result

## Evidence
Ảnh trước khi chỉnh sửa sản phẩm:
![Ảnh trước khi chỉnh sửa](tests/test-runs/FR15/assets/image-42.png)

Ảnh sau khi chỉnh sửa sản phẩm:
![Ảnh sau khi chỉnh sửa sản phẩm](tests/test-runs/FR15/assets/image-43.png)

Ảnh giao diện người dùng:
![Ảnh giao diện người dùng](tests/test-runs/FR15/assets/image-44.png)
