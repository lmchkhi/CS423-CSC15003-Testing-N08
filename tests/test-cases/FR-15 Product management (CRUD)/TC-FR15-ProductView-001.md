# Xem danh sách các sản phẩm

## ID

TC-FR15-ProductView-001

## Mô tả

Xem danh sách các sản phẩm đã tạo

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

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web admin với đường dẫn [http://localhost:5174/](http://localhost:5174/)
2. Đăng nhập với tên email: `admin@eshop.com` và mật khẩu là `Admin123!`
3. Nhấn vào mục: **Sản phẩm**

## Kết quả mong đợi

Sau khi thực hiện bước 3: danh sách các sản phẩm đều có xuất hiện

## Trạng thái của testcase

Pass
