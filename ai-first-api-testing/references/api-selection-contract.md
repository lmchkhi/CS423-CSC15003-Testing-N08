# Hợp đồng chọn API

Dùng tài liệu này để ánh xạ phạm vi tính năng sang điểm cuối. Trước khi chốt, đọc lại `src/eshop-sut/api_specification.md` và `src/eshop-sut/README.md` vì bảng này chỉ là chỉ mục.

## Nhóm A — Xác thực, Danh mục và Sản phẩm

- FR-01 Đăng ký tài khoản: `POST /api/register`
- FR-02 Đăng nhập/khóa tài khoản: `POST /api/login`
- FR-03 Đặt lại mật khẩu: `POST /api/forgot-password`, `POST /api/reset-password`
- FR-04 Hồ sơ cá nhân: `GET /api/users/me`, `PUT /api/users/me`
- FR-05 Danh sách/tìm kiếm sản phẩm: `GET /api/products?search=...`
- FR-06 Chi tiết sản phẩm: `GET /api/products/:id`

## Nhóm B — Giỏ hàng và Thanh toán

- FR-07 Giỏ hàng: `GET /api/cart`, `POST /api/cart`
- FR-08 Thanh toán: `POST /api/checkout`
- FR-09 Áp dụng mã giảm giá: `POST /api/apply-coupon`
- FR-10 Máy trạng thái đơn hàng:
  - người dùng hủy đơn: `PUT /api/orders/:id/cancel`
  - quản trị viên chuyển trạng thái: `PUT /api/admin/orders/:id/status`
- FR-11 Lịch sử/chi tiết đơn hàng của người dùng: `GET /api/orders/my-orders`, `GET /api/orders/:id`

Các chuyển đổi mong đợi của FR-10 lấy từ README của SUT: `pending -> confirmed -> shipping -> delivered`; `pending` và `confirmed` có thể chuyển sang `canceled`; `delivered` và `canceled` là trạng thái kết thúc; người dùng không thể hủy ở trạng thái `shipping`, còn quản trị viên chỉ được thao tác theo máy trạng thái. Không được âm thầm dùng cụm từ ít chặt chẽ hơn “chưa giao” trong đặc tả API để làm yếu các quy tắc này.

## Nhóm C — Trang quản trị Web

Theo FR-12, các phạm vi thay đổi dữ liệu/dành cho quản trị viên này yêu cầu JWT hợp lệ và `role = admin`.

- FR-12 Kiểm soát truy cập: `/api/admin/*` và các thao tác thay đổi sản phẩm/danh mục/mã giảm giá được bảo vệ
- FR-13 Bảng điều khiển: đặc tả API không ghi điểm cuối; phải kiểm tra mã nguồn và ghi nhận khoảng trống tài liệu trước khi chọn
- FR-14 Thêm/xem/sửa/xóa danh mục: `GET /api/categories`, `POST /api/categories`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- FR-15 Thêm/xem/sửa/xóa sản phẩm: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- FR-16 Nhập CSV: `POST /api/admin/import-products`
- FR-17 Thêm/xem/sửa/xóa mã giảm giá: `GET /api/coupons`, `POST /api/admin/coupons`, `DELETE /api/admin/coupons/:id`
- FR-18 Quản lý đơn hàng: `GET /api/admin/orders`, `PUT /api/admin/orders/:id/status`
- FR-19 Quản lý người dùng: `GET /api/admin/users`, `DELETE /api/admin/users/:id`

FR-16 có khoảng trống hợp đồng đáng chú ý: yêu cầu nghiệp vụ mô tả việc tải tệp CSV theo RFC 4180, trong khi đặc tả API công bố một mảng JSON `products`. Ghi nhận mâu thuẫn này và yêu cầu con người quyết định trước khi giả định định dạng tải lên.

## Kiểm tra lựa chọn

- Chọn một phạm vi tính năng/API từ mỗi Nhóm A, B và C. Một tính năng có thể gồm nhiều điểm cuối khi quy trình của nó yêu cầu.
- Xác nhận bộ ba đã chọn không trùng với thành viên khác; việc kiểm tra kho mã nguồn không thể chứng minh điều này nếu thiếu danh sách lựa chọn của nhóm.
- Ghi mã tính năng, phương thức/đường dẫn, xác thực/vai trò, dữ liệu đầu vào, điều kiện tiên quyết, nguồn quy tắc mong đợi, khoảng trống đặc tả đã biết và phụ thuộc dữ liệu/trạng thái.
- Không khẳng định lược đồ phản hồi chính xác khi đặc tả API chỉ cung cấp mô tả hoặc ví dụ một phần. Các câu lệnh kiểm tra lược đồ đó giữ trạng thái `INCOMPLETE` cho đến khi hợp đồng mong đợi được duyệt.
- Ánh xạ SEC-01–SEC-07 liên quan từ README của SUT; không nói rằng các yêu cầu này được định nghĩa trong `api_specification.md`.
