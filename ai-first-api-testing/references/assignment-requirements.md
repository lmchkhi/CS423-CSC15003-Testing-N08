# Checklist yêu cầu HW06

Đối chiếu checklist này với `2026.HW06.API_Testing_En.md`; file đề bài luôn thắng nếu có thay đổi.

## Ba pipeline API

- [ ] Chọn 3 feature/API scopes: đúng 1 từ Pool A, 1 từ Pool B, 1 từ Pool C.
- [ ] Bộ ba không trùng với thành viên khác trong nhóm.
- [ ] Mỗi API có mục tiêu `>= 35` test cases do AI tạo qua nhiều prompt có chủ đích.
- [ ] Mọi parameter có domain partitions; state/security/schema được bao phủ khi áp dụng.
- [ ] Mỗi test AI sinh được human gắn `VALID/INVALID/INCOMPLETE`, có lý do và correction.
- [ ] Human thêm `>= 5` test cases/API mà AI bỏ sót và giải thích vì sao.
- [ ] Các case đã duyệt được thực thi bằng Postman + Newman hoặc Karate/RestAssured.
- [ ] Mọi request có `X-Student-Id: <StudentID>` và có screenshot console xác thực header.
- [ ] Có collection, data/environment nếu dùng, console output và Newman HTML report.
- [ ] Hostname trong output khớp deployment thật (`localhost`/`127.0.0.1` được chấp nhận).
- [ ] Bug thật được ghi cả trong Markdown và GitHub Issues, mỗi issue có screenshot.

## Yêu cầu toàn suite

- [ ] Report liệt kê các Postman features **thực sự** đã dùng; không cần tuyên bố dùng mọi feature ví dụ trong đề.
- [ ] CI/CD chạy API tests.
- [ ] Có hai commit/run mẫu có thật: một all-passing, một có một test failing; kèm screenshots và links.
- [ ] AI test-generator có pseudocode và diagram do sinh viên tự thiết kế/tự vẽ.
- [ ] AI Audit mở đầu bằng declaration bắt buộc và ghi công cụ, ngày giờ, prompt nguyên văn, AI output cho từng interaction.
- [ ] AI Critique là một đoạn 200–300 words, trả lời đủ ba câu hỏi trong đề.
- [ ] Có Git commit riêng cho từng bước của procedure và log dạng text.

## Gói nộp

- [ ] Tên ZIP: `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip`, grade gồm 3 chữ số `000`–`100`.
- [ ] Main report Markdown + PDF, gồm API-testing report và AI audit.
- [ ] Public GitHub repository link.
- [ ] Postman collection JSON + Newman HTML report + danh sách Postman features.
- [ ] CI/CD report có config, hai runs, screenshots và links.
- [ ] Excel test cases + test summary.
- [ ] Diagram + pseudocode (`PNG/Mermaid` và `.md/.py` theo mục nội dung ZIP), nhưng diagram không do AI tạo.
- [ ] Bug reports + screenshots GitHub Issues.
- [ ] AI Critique và AI Audit Report ở Markdown + PDF.
- [ ] Git commit log dạng text.
- [ ] README có self-assessment và số API; generated, added, executed, passed, failed; số bugs.
- [ ] OpenAPI conversion chỉ là tùy chọn; nếu dùng AI tạo thì cũng phải audit.
- [ ] Video demo Agent Skill là tùy chọn.

Thiếu bất kỳ tài liệu bắt buộc nào có thể dẫn đến 0 điểm theo đề. Không đánh dấu item hoàn tất nếu artifact hoặc evidence chưa tồn tại.

## Thang điểm

| Criteria | Max |
|---|---:|
| API 1 full pipeline | 30 |
| API 2 full pipeline | 30 |
| API 3 full pipeline | 30 |
| Agent Skill | 10 |
| **Total** | **100** |
