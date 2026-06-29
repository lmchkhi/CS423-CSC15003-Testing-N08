# BUG-FR15-PRODUCTDELETE-027: Hệ thống cho phép xoá sản phẩm thành công mà không chặn xác nhận phù hợp

## Found by Test Case
TC-FR15-ProductDelete-027

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
5. Nhấn vào nút Xoá cho sản phẩm MacBook Pro M3
6. Xác nhận xoá sản phẩm
7. Truy cập vào trang web người dùng với đường dẫn [http://localhost:5173/](http://localhost:5173/)

## Expected result
Sau khi thực hiện bước 4:

- Hệ thống hiện thông báo xác nhận xoá sản phẩm

Sau khi thực hiện bước 5:

- Hệ thống xoá sản phẩm
- Giao diện của admin không còn thể hiện ra sản phẩm

Sau khi thực hiện bước 6:

- Giao diện không còn sản phẩm tên MacBook Pro M3

## Actual result

## Evidence
Ảnh các sản phẩm trước khi xoá:
![Các sản phẩm trước khi xoá](tests/test-runs/FR15/assets/image-89.png)

Ảnh sau khi nhấn vào nút xoá sản phẩm:
![Ảnh sau khi nhấn vào nút xoá sản phẩm](tests/test-runs/FR15/assets/image-90.png)

Ảnh giao diện người dùng:
![Ảnh giao diện người dùng sau khi xoá sản phẩm](tests/test-runs/FR15/assets/image-95.png)
