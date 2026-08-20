# Cẩm nang thiết kế và kiểm toán ca kiểm thử API

## Tạo ca kiểm thử

Mỗi ca nên có: mã, nguồn gốc (`AI-SINH`/`CON-NGUOI-BO-SUNG`), tính năng/điểm cuối, mục tiêu, danh mục, điều kiện tiên quyết/trạng thái, dữ liệu yêu cầu, các bước, trạng thái/nội dung/header/lược đồ mong đợi, nguồn yêu cầu và trạng thái tự động hóa.

Điều khiển AI theo các lượt có mục tiêu, ví dụ:

1. Trích xuất hợp đồng và liệt kê khoảng trống đặc tả.
2. Phân vùng từng tham số đường dẫn/truy vấn/header/nội dung, gồm thiếu/rỗng/kiểu/biên/định dạng.
3. Lập ma trận chuyển đổi trạng thái nếu tính năng có trạng thái.
4. Ánh xạ SEC-01–SEC-07 và các ca kiểm thử mối đe dọa áp dụng được.
5. Tạo câu lệnh kiểm tra lược đồ chỉ từ lược đồ/trường có nguồn.
6. Loại ca trùng và lập khả năng truy vết; bổ sung khoảng trống tới `>= 35` ca/API.

Không ép mọi SEC hoặc danh mục chuyển đổi trạng thái vào điểm cuối không liên quan. Không dùng số lượng để che lấp ca trùng hoặc kết quả mong đợi vô căn cứ.

## Audit

- `VALID`: dữ liệu đầu vào, điều kiện tiên quyết, hành động và kết quả mong đợi đều có căn cứ và thực thi được.
- `INVALID`: ca mâu thuẫn với hợp đồng/quy tắc nghiệp vụ hoặc kiểm thử sai phạm vi; ghi nội dung chỉnh sửa hoặc lý do loại.
- `INCOMPLETE`: thiếu dữ liệu, cơ sở xác định kết quả, lược đồ, điều kiện tiên quyết hoặc bước dọn dẹp; ghi chính xác phần cần bổ sung.

Kết luận của con người phải độc lập với kết luận của AI. Sau khi chỉnh sửa, giữ cả bản gốc và phiên bản cuối để chứng minh việc kiểm toán.

## Các điểm EShop dễ sai

- FR-02: lockout sau từ 3 lần sai liên tiếp, 30 giây; không lộ chi tiết nguyên nhân.
- FR-08: backend tự tính total từ cart và xóa cart sau checkout.
- FR-09: đủ C1–C5, boundary `total == min_order_amount`, usage per user và công thức percent/fixed.
- FR-10: chỉ transition hợp lệ; `delivered`/`canceled` là final; user không cancel `shipping`; ownership/role checks.
- FR-15: name required/max 255, price `> 0`, category tồn tại; update không làm đổi product khác.
- FR-16: tài liệu mâu thuẫn CSV upload với JSON array; không tự chọn contract.
- FR-19: không lộ password và admin không tự xóa chính mình.
- SEC: token không hợp lệ/thiếu/hết hạn, người dùng thường gọi API quản trị, IDOR, gán hàng loạt trường `role`, chèn mã và thoát dữ liệu đầu ra khi có nơi hiển thị trên giao diện.

## Chuyển sang Postman/Newman

- Mỗi câu lệnh kiểm tra phải truy vết về ca kiểm thử đã duyệt.
- Dùng biến, môi trường, lần chạy theo dữ liệu, máy chủ giả lập hoặc bộ giám sát chỉ khi chúng tạo giá trị thật; báo cáo chỉ liệt kê tính năng đã thực sự dùng.
- Phân biệt lỗi câu lệnh kiểm tra với lỗi yêu cầu/mạng/thiết lập.
- Không khẳng định “lược đồ chính xác” nếu nguồn chỉ có ví dụ phản hồi một phần.
