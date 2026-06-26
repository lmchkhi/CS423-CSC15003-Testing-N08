# Thực hiện mua hàng không nhập mã giảm

## ID

TC-FR09-DISCOUNT-014

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã không tồn tại với giỏ hàng chỉ có 1 sản phẩm có tổng lớn hơn giá trị tối thiểu cần thiết của mã giả giá và người dùng đã đăng nhập vào.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Thêm vào giỏ hàng sản phẩm `Bàn phím cơ Keychron Q1`
5. Nhấn vào mục xem **giỏ hàng**
6. Nhấn vào **Tiến hành thanh toán**
7. Nhấn vào **Áp dụng**
8. Nhấn vào **Xác nhận thanh toán**

## Kết quả mong đợi

Sau bước 7, giao diện hiện thông báo cần nhập vào mã giảm.

## Trạng thái của testcase

Failed
