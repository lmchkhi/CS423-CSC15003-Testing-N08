# Cẩm Nang Các Giai Đoạn (Phase Playbook)

Playbook chi tiết cho từng giai đoạn (comprehensive):

### Phase A — Verify SUT/API Spec/Environment & Select APIs
- Clone/inspect repository của EShop SUT.
- Đọc kỹ `api_specification.md`.
- Xác minh SUT chạy được ở local (`npm install`, `npm start` hoặc tương đương).
- Ánh xạ (Map) các tính năng với các API endpoints.
- Chọn 3 APIs: một từ Pool A, một từ Pool B, một từ Pool C.
- Đảm bảo không trùng lặp API với các thành viên khác trong nhóm.
- Tài liệu hóa các APIs đã chọn với endpoints, methods, parameters.
- Xác minh các yêu cầu bảo mật SEC-01 đến SEC-07 trong spec.
- **Kết thúc**: PENDING HUMAN REVIEW (Chờ con người đánh giá)

### Phase B — Generate Test Cases with AI
- Đối với mỗi API trong 3 APIs đã chọn:
  - Cung cấp API spec cho công cụ AI.
  - Điều khiển quá trình tạo test case từng bước (KHÔNG dùng single generic prompt).
  - Tạo ≥35 test cases bao phủ:
    - Domain partitions trên mọi parameter.
    - State transitions (đặc biệt là FR-10).
    - Bảo mật (SEC-01-SEC-07: SQL injection, IDOR, leo thang quyền).
    - Schema validation (phản hồi khớp với spec).
  - Tài liệu hóa mọi tương tác AI vào audit log.
- **Kết thúc**: PENDING HUMAN REVIEW

### Phase C — Audit and Extend
- Đối với test cases của mỗi API:
  - Gắn nhãn từng test case: VALID / INVALID / INCOMPLETE kèm theo lý do.
  - Sửa lỗi các test cases invalid/incomplete.
  - Thêm ≥5 test cases mới mà AI bỏ sót.
  - Tập trung vào khoảng trống bảo mật (security) và chuyển đổi trạng thái (state transition).
  - Giải thích lý do AI bỏ sót.
- **Kết thúc**: PENDING HUMAN REVIEW

### Phase D — Execute (D1, D2, D3)
- Đối với mỗi API:
  - Tạo/cập nhật Postman collection.
  - Cấu hình environment variables.
  - Thêm `X-Student-Id` pre-request script.
  - Implement test scripts trong Postman.
  - Chạy bằng Newman, tạo HTML report.
  - Phân tích kết quả: passed/failed/skipped.
  - Tài liệu hóa các bugs tìm thấy.
- **Kết thúc mỗi Dn**: PENDING HUMAN REVIEW

### Ghi chú xuyên suốt A-E — Git Commit Log
- Sau khi hoàn tất **mỗi phase** (A, B, C) và sau khi hoàn tất **mỗi API trong Phase D** (D1, D2, D3), Agent phải nhắc sinh viên tạo một Git commit riêng biệt tương ứng (ví dụ: `feat(api1): generate test cases`, `test(api1): audit + extend`, `test(api1): execute newman run`).
- Agent không tự thực hiện commit thay sinh viên; chỉ nhắc và giúp soạn commit message rõ ràng.
- Sinh viên tổng hợp toàn bộ log commit vào một file text-based để nộp kèm (mục 12 đề bài).

### Phase E — CI/CD, Bugs, Agent Skill, Report
- Thiết lập GitHub Actions với Newman.
- Tạo 2 sample commits (pass/fail).
- Báo cáo lỗi (File bug reports) trên GitHub Issues kèm ảnh chụp màn hình.
- Thiết kế AI-driven API test generator (diagram + pseudocode).
- Viết AI Critique (200-300 chữ).
- Biên soạn báo cáo cuối cùng (final report).
- **Kết thúc**: PENDING HUMAN REVIEW
