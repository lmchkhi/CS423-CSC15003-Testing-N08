# Phân tích thiết kế test case FR-08: Thanh toán

## Requirement ID
FR-08

## Module / Test type / Technique
Checkout / Functional / Use Case Testing

## Mục tiêu kiểm thử
Xác minh luồng thanh toán chỉ cho phép người dùng đã đăng nhập đặt hàng, hiển thị đúng thông tin giỏ hàng, tự tính tổng tiền từ dữ liệu giỏ hàng, không để người dùng can thiệp trực tiếp vào tổng tiền, không tin giá trị `total_amount` do client gửi lên và xóa giỏ hàng sau khi thanh toán thành công.

## Phạm vi yêu cầu FR-08
- Chỉ người dùng đã đăng nhập mới tiến hành thanh toán được.
- Tổng tiền thanh toán được tính tự động từ giỏ hàng và không cho phép người dùng chỉnh sửa trực tiếp.
- Giao diện hiển thị đầy đủ danh sách sản phẩm đặt mua.
- Backend phải tự tính lại tổng tiền; không chấp nhận giá trị `total_amount` do client gửi lên.
- Sau thanh toán thành công, giỏ hàng được xóa.

## Use case chính

| Mục | Nội dung |
| --- | --- |
| Tên use case | Thanh toán đơn hàng |
| Actor chính | Khách hàng đã đăng nhập |
| Actor phụ | Backend/API, CSDL đơn hàng, giỏ hàng |
| Trigger | Người dùng chọn tiến hành thanh toán từ giỏ hàng |
| Tiền điều kiện | Giỏ hàng có ít nhất một sản phẩm hợp lệ; người dùng có phiên đăng nhập hợp lệ |
| Hậu điều kiện thành công | Đơn hàng được tạo với tổng tiền đúng, hệ thống thông báo thanh toán thành công và giỏ hàng được xóa |
| Hậu điều kiện thất bại | Không tạo đơn hàng; giỏ hàng và dữ liệu đặt mua không bị thay đổi ngoài ý muốn |

## Luồng thành công cơ bản
1. Người dùng đã đăng nhập mở giỏ hàng có sản phẩm.
2. Người dùng chọn tiến hành thanh toán.
3. Hệ thống chuyển sang màn hình checkout.
4. Hệ thống hiển thị đầy đủ các sản phẩm trong giỏ hàng, gồm tên sản phẩm, số lượng và thành tiền từng dòng.
5. Hệ thống tự tính tổng tiền thanh toán từ đơn giá và số lượng trong giỏ hàng.
6. Người dùng xác nhận thanh toán.
7. Backend kiểm tra token đăng nhập hợp lệ.
8. Backend tự tính lại tổng tiền từ dữ liệu giỏ hàng/đơn hàng tin cậy phía server, bỏ qua mọi `total_amount` do client tự gửi nếu có.
9. Backend tạo đơn hàng thành công.
10. Frontend hiển thị thông báo thanh toán thành công.
11. Hệ thống xóa giỏ hàng của người dùng.

## Luồng thay thế và ngoại lệ

| Mã luồng | Tình huống | Kết quả mong đợi |
| --- | --- | --- |
| A1 | Người dùng chưa đăng nhập chọn thanh toán | Hệ thống không cho vào luồng checkout, thông báo cần đăng nhập và điều hướng sang trang đăng nhập |
| A2 | Người dùng truy cập trực tiếp URL checkout khi chưa đăng nhập | Hệ thống vẫn chặn thanh toán; nếu gọi API thì backend trả lỗi xác thực |
| A3 | Giỏ hàng có nhiều sản phẩm | Màn hình checkout hiển thị đầy đủ từng sản phẩm và tổng tiền bằng tổng của các dòng hàng |
| A4 | Người dùng cố sửa tổng tiền trên giao diện | Không có trường cho phép sửa trực tiếp; tổng tiền chỉ thay đổi khi giỏ hàng thay đổi hợp lệ |
| A5 | Client/API gửi `total_amount` bị sửa thấp hơn hoặc cao hơn thực tế | Backend không dùng giá trị này; đơn hàng được lưu theo tổng tiền tự tính lại hoặc từ chối request không đủ dữ liệu tin cậy |
| A6 | Thanh toán thành công | Giỏ hàng trở về trạng thái rỗng sau khi đặt hàng |

## Điều kiện kiểm thử được suy ra

| Condition ID | Điều kiện cần kiểm thử | Test case |
| --- | --- | --- |
| C1 | Người dùng chưa đăng nhập không thể bắt đầu thanh toán từ giỏ hàng | TC-CHECKOUT-UCT-001 |
| C2 | Backend yêu cầu token hợp lệ khi gọi API checkout | TC-CHECKOUT-UCT-002 |
| C3 | Checkout hiển thị đầy đủ danh sách sản phẩm đặt mua | TC-CHECKOUT-UCT-003 |
| C4 | Tổng tiền được tính tự động từ giỏ hàng và không chỉnh sửa trực tiếp trên UI | TC-CHECKOUT-UCT-004 |
| C5 | Backend không chấp nhận `total_amount` do client gửi lên | TC-CHECKOUT-UCT-005 |
| C6 | Giỏ hàng được xóa sau khi thanh toán thành công | TC-CHECKOUT-UCT-006 |

## Test data dùng chung

| Dữ liệu | Giá trị |
| --- | --- |
| Tài khoản hợp lệ | `customer01@example.com` / `Password@123` |
| Token hợp lệ | JWT sinh ra sau khi đăng nhập thành công |
| Sản phẩm 1 | ID `1`, tên `Áo thun basic`, đơn giá `100000`, số lượng `2` |
| Sản phẩm 2 | ID `2`, tên `Quần jeans`, đơn giá `250000`, số lượng `1` |
| Tổng tiền đúng | `450000` |
| Tổng tiền bị sửa để kiểm thử | `1000` |

## Traceability

| Requirement | Test case | Mục tiêu kiểm thử | Trạng thái thiết kế |
| --- | --- | --- | --- |
| FR-08 | TC-CHECKOUT-UCT-001 | Chặn thanh toán khi chưa đăng nhập từ UI | Ready |
| FR-08 | TC-CHECKOUT-UCT-002 | Chặn API checkout khi không có token hợp lệ | Ready |
| FR-08 | TC-CHECKOUT-UCT-003 | Hiển thị đầy đủ sản phẩm đặt mua | Ready |
| FR-08 | TC-CHECKOUT-UCT-004 | Tổng tiền tự động, không sửa trực tiếp trên UI | Ready |
| FR-08 | TC-CHECKOUT-UCT-005 | Backend bỏ qua/từ chối `total_amount` bị client sửa | Ready |
| FR-08 | TC-CHECKOUT-UCT-006 | Xóa giỏ hàng sau thanh toán thành công | Ready |

## Ghi chú thiết kế
Các test case được thiết kế theo use case testing, tập trung vào luồng chính và các luồng ngoại lệ có ảnh hưởng trực tiếp đến hành vi thanh toán. Khi execute, nếu một test case fail thì test run cần ghi rõ `Related bug #...` theo quy trình quản lý test case trên GitHub.
