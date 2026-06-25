# Áp dụng mã giảm giá theo tỷ lệ khi thoả tất cả yêu cầu hệ thống với giỏ hàng có nhiều hơn 1 sản phẩm thành công

## ID

TC-FR09-DISCOUNT-004

## Mô tả

Mã giảm giá được áp dụng thành công khi:

- Mã còn hạn, còn lượt, giảm giá cố định
- Giỏ hàng 2 sản phẩm có tổng lớn hơn giá trị tối thiểu cần thiết của mã giảm giá
- Người dùng đã đăng nhập vào

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Thêm vào giỏ hàng sản phẩm **`Bàn phím cơ Keychron Q1`** và sản phẩm **`Tai nghe AirPods Pro 2`**
5. Nhấn vào mục: **Giỏ hàng**
6. Nhấn vào mục: **Tiến hàng thanh toán**
7. Nhập vào ô  **Mã giảm giá** mã: `SAVE10`
8. Nhấn vào **Áp dụng**
9. Nhấn vào **Xác nhận thanh toán**

## Kết quả mong đợi

Sau bước 8, giao diện hiện đơn hàng là *9000000* (chín triệu đồng)

Sau bước 9, hệ thống xác nhận và hiện trên trang admin đơn hàng giá trị *9000000* (chín triệu đồng)

## Trạng thái của testcase
