# Giao Thức Thực Thi Newman (Newman Execution Protocol)

Giao thức thực thi cho các lần chạy Newman (phỏng theo measured-execution.md):

- **Nguyên tắc cốt lõi**: Agent CÓ THỂ thực thi các lần chạy Newman (khác với tải đo lường JMeter), nhưng phải tài liệu hóa mọi thứ.
- **Những gì Agent CÓ THỂ làm**: chạy Newman, tạo collections, thiết lập environments, cấu hình pre-request scripts.
- **Những gì Agent KHÔNG ĐƯỢC làm**: ngụy tạo kết quả, bỏ qua audit, tự động phê duyệt (auto-approve), sửa đổi SUT.
- **Quy trình Phase D**: D1/D2/D3 cho mỗi API.
- **Thiết lập Header `X-Student-Id`** (Mã sinh viên: 23127464) thông qua pre-request script.
- **Mẫu lệnh Newman (Newman command patterns)**:
  ```bash
  newman run collection.json -e environment.json --reporters cli,html --reporter-html-export report.html
  ```
- **Yêu cầu bằng chứng**: báo cáo Newman (HTML), console output, Postman collection JSON.
- **Human Review**: Yêu cầu con người đánh giá (Human Review) sau mỗi lần thực thi API.
- **Xác minh hostname (Anti-AI-Cheat)**: Trước khi ghi nhận bất kỳ verdict PASS/FAIL nào, Agent phải kiểm tra hostname xuất hiện trong Newman console output / HTML report có khớp với môi trường deploy thật của sinh viên hay không (`localhost` / `127.0.0.1` được chấp nhận). Nếu không khớp hoặc report không lộ hostname rõ ràng, Agent phải flag rõ trong `newman-evidence-analysis.md` thay vì mặc định coi là hợp lệ.
