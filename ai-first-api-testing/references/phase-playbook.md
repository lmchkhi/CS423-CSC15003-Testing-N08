# Cẩm nang công việc HW06

Các giai đoạn dưới đây là cách tổ chức sản phẩm, không phải yêu cầu phải dừng cứng sau từng giai đoạn. Thực hiện đúng phạm vi người dùng giao và luôn để con người đánh giá kết quả AI.

## A — Chọn phạm vi

- Đọc đề bài, SUT README, API specification và code liên quan.
- Chọn một phạm vi tính năng/API từ mỗi Nhóm A/B/C; ánh xạ mọi điểm cuối thuộc quy trình.
- Ghi cơ chế xác thực/vai trò, dữ liệu đầu vào, điều kiện tiên quyết, phụ thuộc trạng thái/dữ liệu và khoảng trống đặc tả.
- Con người xác nhận lựa chọn và tình trạng không trùng trong nhóm.

## B — AI sinh ca kiểm thử

- Lưu chuỗi câu lệnh và kết quả đầy đủ trong Báo cáo kiểm toán AI.
- Sinh mục tiêu `>= 35` ca/API; không tăng số lượng bằng các ca trùng ý nghĩa.
- Lập khả năng truy vết tới phân vùng tham số, FR, SEC và quy tắc lược đồ có nguồn.
- Đánh dấu giả định hoặc kết quả mong đợi chưa có căn cứ.

## C — Con người kiểm toán và mở rộng

- Con người đánh giá từng ca bằng đúng ba nhãn `VALID/INVALID/INCOMPLETE`.
- Ghi lý do, nội dung chỉnh sửa và kết quả mong đợi cuối cùng; giữ dấu vết kết quả AI ban đầu.
- Con người thêm `>= 5` ca/API, gắn nguồn gốc `CON-NGUOI-BO-SUNG`, và giải thích nguyên nhân AI bỏ sót.
- Chỉ ca đã duyệt mới được chuyển thành ca kiểm thử có thể thực thi.

## D — Thực thi

- Tạo/cập nhật bộ sưu tập, tệp môi trường/dữ liệu và câu lệnh kiểm tra từ các ca đã duyệt.
- Đặt `X-Student-Id` trong mã lệnh chạy trước yêu cầu ở cấp bộ sưu tập hoặc cơ chế tương đương; lưu ảnh chụp bảng điều khiển do con người chụp.
- Chạy từng API hoặc toàn suite theo phạm vi được yêu cầu; không cần chờ giữa D1/D2/D3 nếu người dùng đã yêu cầu chạy tất cả.
- Lưu lệnh, phiên bản, dấu thời gian, tên máy chủ, nhật ký bảng điều khiển, báo cáo HTML và mã thoát.
- Phân loại thất bại trước khi gọi là lỗi SUT.

## E — Tổng hợp

- Với lỗi đã xác thực, tạo báo cáo Markdown; xuất bản GitHub Issue và đính ảnh chụp màn hình khi người dùng yêu cầu.
- Cấu hình CI/CD và ghi nhận hai lần chạy/commit thật: đạt toàn bộ và có một ca thất bại.
- Viết báo cáo chính, tóm tắt README, Báo cáo kiểm toán AI, bài phê bình AI 200–300 từ và nhật ký commit.
- Hỗ trợ mã giả; để sinh viên tự thiết kế/tự vẽ sơ đồ bộ sinh ca kiểm thử bằng AI.

## Git và đánh giá

Đề yêu cầu commit mới cho mỗi bước của quy trình. Không gom nhắc commit chỉ theo giai đoạn tổng quát: tối thiểu phải truy vết việc sinh ca, kiểm toán, mở rộng và thực thi cho từng API, cùng các bước chung như CI/CD/báo cáo khi có. Agent chỉ tạo commit hoặc xuất bản khi người dùng yêu cầu; tuyệt đối không bịa mã băm, liên kết lần chạy hay quyết định đánh giá của con người.
