# Áp dụng mã giảm giá khi người dùng chưa đăng nhập

## ID

TC-FR09-DISCOUNT-008

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã còn hạn, còn lượt, giảm giá theo tỷ lệ với giỏ hàng chỉ có 1 sản phẩm có tổng lớn hơn giá trị tối thiểu cần thiết của mã giả giá nhưng người dùng chưa đăng nhập vào.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
3. Thêm vào giỏ hàng sản phẩm `Bàn phím cơ Keychron Q1`
4. Nhấn vào mục xem **giỏ hàng**
5. Nhấn vào **Tiến hành thanh toán**
6. Nhấn vào nút **Thoát**
7. Nhập vào mục **Mã giảm giá**, nhập mã: `SAVE10`
8. Nhấn vào **Áp dụng**

## Kết quả mong đợi

Giao diện sẽ thông báo cho người dùng biết cần phải đăng nhập mới có thể sử dụng mã giảm giá.

## Trạng thái của testcase

Failed
