# Phân Tích Bằng Chứng (Evidence Analysis)

Các quy tắc phân tích bằng chứng cho API testing:

- **Tính toàn vẹn của bằng chứng (Evidence integrity)**: coi báo cáo Newman là chỉ đọc (read-only), giữ nguyên các lần chạy bị lỗi (failed runs).
- **Bằng chứng bắt buộc cho mỗi API**: Postman collection, báo cáo HTML của Newman, console output, Excel chứa test case.
- **Xác định tính hợp lệ (Validity determination)**: Phân loại test case thành VALID (Hợp lệ) / VALID WITH LIMITATION (Hợp lệ có giới hạn) / INVALID (Không hợp lệ).
- **Phân loại lỗi (Failure classification)**: Test defect (Lỗi kiểm thử), Environment issue (Vấn đề môi trường), Data issue (Vấn đề dữ liệu), SUT functional defect (Lỗi chức năng SUT), SUT security defect (Lỗi bảo mật SUT), Unknown (Không xác định).
- **Phân tích độ bao phủ (Coverage analysis)**: kiểm tra các phân vùng miền (domain partitions), chuyển đổi trạng thái (state transitions), bảo mật (SEC-01-SEC-07), xác thực lược đồ (schema validation).
- **Săn lùng sự hiểu sai (Misinterpretation hunt)**: thách thức các tuyên bố của AI về độ bao phủ kiểm thử, dương tính giả/âm tính giả (false positives/negatives), phát hiện bảo mật.
- **Xác thực bug (Bug validation)**: xác minh các bugs bằng chứng trước khi báo cáo.
- **Bằng chứng CI/CD**: cấu hình pipeline, hai commits (một pass + một fail).
