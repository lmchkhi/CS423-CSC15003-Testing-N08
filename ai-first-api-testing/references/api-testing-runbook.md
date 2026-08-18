# Cẩm Nang Kiểm Thử API (API Testing Runbook)

Runbook chi tiết cho toàn bộ pipeline kiểm thử API:

### Phase B - Tạo Test Case (Test Case Generation)
- **Cách điều khiển AI từng bước**: Không sử dụng một prompt chung chung (single generic prompt). Cần prompt theo từng bước.
- **Độ bao phủ phân vùng miền (Domain partition coverage)**: định dạng email, độ phức tạp của mật khẩu, giá cả > 0, v.v.
- **Độ bao phủ chuyển đổi trạng thái (State transition coverage)**: Trạng thái đơn hàng theo FR-10.
- **Độ bao phủ bảo mật (Security coverage)**: SQL injection, IDOR, leo thang đặc quyền (SEC-01-SEC-07).
- **Xác thực lược đồ (Schema validation)**: Hình dạng phản hồi (response shape) khớp với spec.
- **Mục tiêu**: ≥35 test cases cho mỗi API.
- Tài liệu hóa mọi tương tác với AI.

### Phase C - Kiểm Toán và Mở Rộng (Audit and Extension)
- **Đánh giá từng test case**: VALID / INVALID / INCOMPLETE kèm theo lý do (reasoning).
- **Chỉnh sửa**: Sửa lại các test cases không hợp lệ (invalid) hoặc không đầy đủ (incomplete).
- **Thêm mới**: Thêm ≥5 test cases mà AI đã bỏ sót cho mỗi API (đặc biệt là bảo mật và state transitions).
- **Giải thích**: Giải thích tại sao AI lại bỏ sót chúng (chất lượng prompt, hạn chế của mô hình, đặc điểm API).

### Phase D - Thực Thi (Execution)
- Thiết lập Postman collection với cấu trúc phù hợp.
- Cấu hình header `X-Student-Id` qua pre-request script (Mã sinh viên: 23127464).
- Chạy bằng Newman và tạo báo cáo HTML.
- **Thực hành các tính năng của Postman**: workspaces, collections, variables, environments, data-driven runs, monitors, mock servers.

### Phase E - Tích Hợp CI/CD (CI/CD Integration)
- Cấu hình luồng xử lý GitHub Actions với Newman.
- Hai commits mẫu: một lần vượt qua tất cả (all-passing) và một lần thất bại (one-failing).
- Tài liệu hóa cấu hình pipeline.
