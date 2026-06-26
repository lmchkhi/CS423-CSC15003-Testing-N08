# Áp dụng mã giảm giá khi mã giảm giá đã hết hạn (cùng ngày)

## ID

TC-FR09-DISCOUNT-012

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã hết hạn (cùng ngày), còn lượt, giảm giá theo lượng với giỏ hàng chỉ có 1 sản phẩm có tổng lớn hơn giá trị tối thiểu cần thiết của mã giả giá và người dùng đã đăng nhập vào.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định
- Thêm mã giảm theo lượng với tên "TODAYSALE". Mã này có ngày hết hạn là ngày thực hiện kiểm thử, giảm 100000 (một trăm nghìn đồng) với tổng giá trị của giỏ hàng ít nhất là 1000000 (một triệu đồng).

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Thêm vào giỏ hàng sản phẩm **Bàn phím cơ Keychron Q1**
5. Nhấn vào mục xem **giỏ hàng**
6. Nhấn vào **Tiến hành thanh toán**
7. Nhập vào mục **Mã giảm giá** và nhập mã: `TODAYSALE`
8. Nhấn vào **Áp dụng**
9. Nhấn vào **Xác nhận thanh toán**

## Kết quả mong đợi

Giao diện hiện thông báo mã đã hết hạn.

Hệ thống không ghi nhận mã sau khi nhấn nút mua hàng.

## Trạng thái của testcase

Pass
