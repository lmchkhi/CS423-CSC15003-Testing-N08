# Áp dụng mã giảm giá theo lượng khi thoả tất cả yêu cầu hệ thống với giỏ hàng có 1 sản phẩm thành công

## ID

TC-FR09-DISCOUNT-001

## Mô tả

Mã giảm giá có được áp dụng thành công khi:

- Mã còn hạn, còn lượt, giảm giá lượng cố định
- Giỏ hàng chỉ có 1 sản phẩm và có tổng lớn hơn giá trị tối thiểu cần thiết của mã giảm giá
- Người dùng đã đăng nhập.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: `test@eshop.com` và mật khẩu là `Test1234!`
4. Thêm vào giỏ hàng sản phẩm **`Bàn phím cơ Keychron Q1`**
5. Nhấn vào mục: **Giỏ hàng**
6. Nhấn vào **Tiến hàng thanh toán**
7. Nhập vào ô nhập ***Mã giảm giá** mã: `BIGBUY`
8. Nhấn vào **Áp dụng**
9. Nhấn vào **Xác nhận thanh toán**

## Kết quả mong đợi

Sau khi thực hiện bước 8, giao diện hiện ra giá đơn hàng là *3950000* (ba triệu chín trăm năm mươi nghìn đồng)

Sau khi thực hiện bước 9, hệ thống ghi nhận và hiện trên trang admin đơn hàng khách hàng có giá trị là *3950000* (ba triệu chín trăm năm mươi nghìn đồng)

## Trạng thái của testcase

Pass
