# Áp dụng mã giảm giá khi có hai lượt sử dụng mã giảm giá theo lượng

## ID

TC-FR09-DISCOUNT-007

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã còn hạn, còn 2 lượt, giảm giá theo lượng cố định với giỏ hàng chỉ có 1 sản phẩm có tổng lớn hơn giá trị tối thiểu cần thiết của mã giả giá và người dùng đã đăng nhập vào.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Thêm vào giỏ hàng sản phẩm "Bàn phím cơ Keychron Q1"
5. Nhấn vào mục xem giỏ hàng
6. Nhấn vào Tiến hàng thanh toán
7. Nhập vào mục Mã giảm giá, nhập mã: VIP100
8. Nhấn vào Áp dụng
9. Nhấn vào mua hàng
10. Vào lại quay lại trang chủ
11. Lặp lại từ bước 3. đến 6.

## Kết quả mong đợi

Giao diện ở lần mua thứ hai sẽ cho phép sử dụng mã mua hàng

## Trạng thái của testcase

Pass
