# Áp dụng mã giảm giá khi tổng giá trị sản phẩm bằng giá trị tối thiểu cần có cho mã giảm theo lượng

## ID

TC-FR09-DISCOUNT-009

## Mô tả

Mã giảm giá có được áp dụng đúng khi mã còn hạn, còn lượt, giảm giá theo lượng với giỏ hàng chỉ có 1 sản phẩm có tổng bằng giá trị tối thiểu cần thiết của mã giả giá và người dùng đã đăng nhập vào.

## Môi trường kiểm thử

Windows 10, Google Chrome Version 149.0.7827.103

## Precodition

- Cơ sở dữ liệu hệ thống được khởi tạo với giá trị mặc định
- Có một sản phẩm có giá là 500000 (năm trăm nghìn đồng - bằng với giá trị tối thiểu cần cho mã BIGBUY) có tên là "Quạt để bàn USB Apple".

## Các bước thực hiện

0. Chạy chương trình backend, frontend web, frontend admin
1. Truy cập vào trang web với đường dẫn [http://localhost:5173/](http://localhost:5173/)
2. Nhấn vào mục đăng nhập
3. Đăng nhập với tên email: test@eshop.com và mật khẩu là Test1234!
4. Thêm vào giỏ hàng sản phẩm "Quạt để bàn USB Apple"
5. Nhấn vào mục xem giỏ hàng
6. Nhấn vào Tiến hàng thanh toán
7. Nhập vào mục Mã giảm giá và nhập mã: BIGBUY
8. Nhấn vào Áp dụng
9. Nhấn vào Mua hàng

## Kết quả mong đợi

Khi thực hiện xong bước 7 thì giao diện hiện tổng mới là 450000 (bốn trăm năm mươi nghìn đồng).

Khi thực hiện xong bước 8 thì trên hệ thống hiện đơn hàng với cùng giá.

## Trạng thái của testcase
