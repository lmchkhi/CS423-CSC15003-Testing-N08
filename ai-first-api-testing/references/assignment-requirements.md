# Yêu Cầu Bài Tập (Assignment Requirements)

Danh sách kiểm tra (checklist) đầy đủ cho các yêu cầu của HW06:

### Định Dạng Nộp Bài (Submission Format)
- Tên file: `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip`
- Báo cáo chính (Markdown + PDF) với báo cáo kiểm thử API (API testing report) và kiểm toán AI (AI audit)
- Link repository GitHub công khai (bao gồm collections, scripts, reports)
- Postman collection (.json) và báo cáo Newman (HTML)
- Danh sách các tính năng Postman đã sử dụng
- Báo cáo CI/CD: cấu hình pipeline, hai lần chạy mẫu (một lần pass toàn bộ + một lần fail)
- Test cases Excel và tóm tắt kiểm thử (test summary)
- Sơ đồ (diagram) và mã giả (pseudocode) của AI test-generator
- Tùy chọn: OpenAPI spec (.yaml/.json)
- Báo cáo lỗi (Bug report) kèm theo ảnh chụp màn hình GitHub Issues
- AI Critique (Đánh giá AI) và Báo cáo kiểm toán AI (AI Audit Report) (Markdown + PDF)
- Nhật ký Git commit
- File README.md với tự đánh giá (self-assessment) và tóm tắt kiểm thử

### Danh Sách Kiểm Tra Các Giai Đoạn (Phase Checklists - A đến E)
- **Phase A**: Xác minh SUT/API spec, chọn 3 API (mỗi API từ một Pool khác nhau), ánh xạ (mapping) các endpoints.
- **Phase B**: Tạo ra ≥35 test cases cho mỗi API bao gồm domain/state/security/schema.
- **Phase C**: Kiểm toán (Audit) tất cả các test cases là VALID/INVALID/INCOMPLETE, mở rộng thêm +5 test cases cho mỗi API.
- **Phase D**: Thực thi Newman cho mỗi API với báo cáo và header `X-Student-Id`.
- **Phase E**: Tích hợp CI/CD, báo cáo bug, thiết kế agent skill, báo cáo cuối cùng.

### Tiêu Chí Đánh Giá (Assessment Criteria từ HW06):
| No | Criteria | Max |
|---|---|---|
| 1 | API 1 - full pipeline | 30 |
| 2 | API 2 - full pipeline | 30 |
| 3 | API 3 - full pipeline | 30 |
| 4 | Agent Skills | 10 |
| | **Total** | **100** |

### Chống Gian Lận AI (Anti-AI-Cheat)
- Header `X-Student-Id` (Mã sinh viên: 23127464) với ảnh chụp màn hình console.
- Hostname trong output của Newman phải khớp với môi trường deployment.
- Sơ đồ AI test-generator phải do sinh viên tự vẽ.
