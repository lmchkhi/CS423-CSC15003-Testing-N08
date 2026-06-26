# Áp dụng mã giảm giá khi không có sản phẩm trong hàng trong giỏ hàng

## ID

TC-FR09-DISCOUNT-005

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã còn hạn, còn lượt, giảm giá theo lượng với giỏ hàng không có sản phẩm và người dùng đã đăng nhập vào

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Nhấn vào mục xem giỏ hàng
5. Nhấn vào **Tiến hành thanh toán**
6. Nhập vào mục **Mã giảm giá** và nhập mã: `BIGBUY`
7. Nhấn vào **Áp dụng**
8. Nhấn vào **Xác nhận thanh toán**.

## Kết quả mong đợi

Giao diện không hiện nút Tiến hành thanh toán và hiện đường link về trang chủ (link Tiếp tục mua sắm)

## Trạng thái của testcase

Skipped (vì không phù hợp với yêu cầu)
