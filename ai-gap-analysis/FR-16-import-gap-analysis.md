<!-- ai-gap-analysis/FR-16-import-gap-analysis.md -->

# AI Gap Analysis: FR-16 Import Sản phẩm từ CSV

## 1. Phát hiện lỗ hổng và lỗi thiết kế của AI
- Trong quá trình thiết kế test case, AI đã mô hình hóa đúng theo Use Case Testing và dự kiến các kịch bản kiểm thử (Basic Flow, Alternate Flow, Exception Flow).
- **Lý do AI bỏ sót lỗi hoặc cần can thiệp**:
  - AI chỉ có thông tin từ tài liệu đặc tả `description_project.md` trước khi chốt Test Case Design. Các giả định được thiết lập theo trạng thái hệ thống hoạt động hoàn hảo.
  - Khi đối chiếu thực tế với mã nguồn trong thư mục `src`:
    - **Thiếu kiểm thử biên sâu về nghiệp vụ**: AI dự kiến price âm sẽ bị từ chối, nhưng mã nguồn SUT hoàn toàn không có validate price ở cả frontend và backend.
    - **Thiếu kiểm thử về tính toàn vẹn (Giao dịch nguyên tử)**: Hệ thống sử dụng SQLite thực hiện chèn dữ liệu không đồng bộ mà không có Transaction block. AI không thể tự chạy thử nghiệm nếu không phân tích mã nguồn SUT, điều này cần người dùng chỉ định đọc file hoặc chạy test.
    - **Lỗi kỹ thuật thư viện**: Hàm split dấu phẩy (`line.split(",")`) là lỗi thiết kế sơ đẳng của lập trình viên, AI chỉ phát hiện khi đọc mã nguồn parser trong `src/frontend-admin/src/App.jsx`.

## 2. Bài học kinh nghiệm cho AI Agent
- **Chiến lược đọc mã nguồn sớm**: Thay vì chỉ dựa vào tài liệu đặc tả `description_project.md` ở STEP 1-3, AI Agent nên chủ động yêu cầu quét qua các file mã nguồn liên quan trong `src` để đối chiếu các giả định Validation và Transaction.
- **Tăng cường kiểm thử phi chức năng**: Các lỗi bảo mật như CSV Formula Injection cần được đề xuất và nhấn mạnh sớm hơn trong tài liệu thiết kế.
- **Cải tiến quy trình kiểm thử bảng mã**: Đối với Tiếng Việt, AI cần chú ý hơn về việc bảo toàn Encoding khi ghi file Markdown để tránh Mojibake trên môi trường Windows của người dùng.
