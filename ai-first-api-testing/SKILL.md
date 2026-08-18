---
name: ai-first-api-testing
description: Thiết kế, sinh, review và phân tích API test cases cho bài HW06 EShop theo hướng AI-first, evidence-first và checkpoint-first. Dùng khi xử lý 3 API pipelines của sinh viên 23127464 (Pool A, Pool B, Pool C), tạo hoặc review Postman collection/Newman tests, audit test cases (VALID/INVALID/INCOMPLETE), mở rộng test suite, chạy Newman, phân tích kết quả, săn lỗi bảo mật/state transition, lập báo cáo và đề xuất CI/CD. Agent bắt buộc dừng ở các checkpoint A-E và không tự duyệt hay bịa kết quả, metric, screenshot, video, issue hoặc commit.
---

# 1. Nguyên tắc điều phối
- **Audit Logging**: Mọi tương tác, phân tích, đề xuất của Agent phải được ghi nhận vắn tắt vào `ai-audit-report.md` theo thời gian thực (nếu file tồn tại) để review.
- **Tính tối thượng của đề bài**: File `2026.HW06.API_Testing_En.md` (hoặc tương đương) là nguồn tham chiếu cao nhất. Không được đoán yêu cầu hay áp dụng các best practice không có trong đề bài. Yêu cầu sinh viên 23127464, header `X-Student-Id` trên mọi request.
- **Khảo sát trước khi hỏi**: Trước khi yêu cầu human cung cấp thông tin, Agent phải tự tìm kiếm trong repository, đọc code SUT (`eshop-sut`), kiểm tra API spec, và xem các report cũ.
- **Chỉ thực thi Phase được cấp phép**: Tuyệt đối không tự ý chạy toàn bộ các phase từ A-E. Chỉ thực thi phase mà human yêu cầu.
- **Phân biệt Quan sát và Suy diễn**: Khi phân tích kết quả Newman hoặc Postman, phải phân biệt rõ đâu là quan sát thực tế (status code 500, response time > 2s) và đâu là suy diễn/giả thuyết (có thể do thiếu index DB). Chỉ dựa trên quan sát có thật.
- **Thực thi Phase D**: Agent có thể hỗ trợ chạy Newman test (bằng lệnh CLI), tuy nhiên human phải là người review và phê duyệt kết quả. Không tự ý kết luận SUT "Passed" nếu không có evidence xác nhận.
- **Luôn có Checkpoint PENDING HUMAN REVIEW**: Cuối mỗi phase, Agent phải dừng và đợi human review.
- **Không giả tạo (Fabrication)**: Không bịa đặt kết quả test (Pass/Fail), không bịa metrics (coverage, response time), không bịa screenshot, video, bug reports hay commits.
- **Diagram AI test-generator phải do con người tự vẽ (Anti-AI-Cheat)**: Ở Phase E, Agent chỉ được hỗ trợ **pseudocode** và góp ý cấu trúc bằng lời (text). Agent **tuyệt đối không được tự vẽ, xuất, hay generate hình ảnh/diagram** (kể cả Mermaid do AI tự soạn hoàn chỉnh) để nộp thay sinh viên — đây là 1 trong 3 hạng mục TA xác minh chống gian lận. Agent có thể góp ý bố cục sau khi sinh viên đã tự vẽ, nhưng bản vẽ cuối cùng phải là sản phẩm tự tay sinh viên.
- **Xác minh hostname Newman khớp môi trường**: Khi phân tích bất kỳ Newman report/console output nào ở Phase D, Agent phải kiểm tra hostname trong request URL khớp với môi trường deploy thật của sinh viên (`localhost` / `127.0.0.1` được chấp nhận). Nếu hostname không khớp hoặc không xác định được, Agent phải nêu rõ nghi vấn này trong review-notes thay vì bỏ qua.

# 2. Nạp ngữ cảnh theo nhu cầu
Trước khi bắt đầu các nhiệm vụ cụ thể, Agent cần chủ động tham khảo các file hướng dẫn sau để nạp ngữ cảnh (chỉ load file liên quan để tiết kiệm token):
- **Kiểm tra tính hoàn thiện**: Xem [assignment-requirements.md](references/assignment-requirements.md) để biết checklist DoD (Definition of Done) và trạng thái hiện tại.
- **Trước Phase API Selection (A)**: Xem [api-selection-contract.md](references/api-selection-contract.md) để verify 3 APIs chọn từ Pool A, B, C.
- **Trước khi thực hiện các Phase (A-E)**: Xem [phase-playbook.md](references/phase-playbook.md) để nắm rõ cách xử lý.
- **Trước khi chạy Newman**: Xem [newman-execution.md](references/newman-execution.md) để biết cách cấu hình, arguments và format report.
- **Xây dựng & Audit Test Cases (B & C)**: Xem [api-testing-runbook.md](references/api-testing-runbook.md) để sinh test (domain partition, state transitions FR-10, security SEC-01-SEC-07, schema validation), audit theo phân loại VALID/INVALID/INCOMPLETE và sinh thêm 5 test cases.
- **Đánh giá & Phân tích (D)**: Xem [evidence-analysis.md](references/evidence-analysis.md) khi phân tích log, report.
- **Trước khi kết thúc mỗi Phase (A-E)**: Nhắc sinh viên tạo một Git commit riêng cho phase/API vừa hoàn thành (generation, audit, extension, execution cho từng API) và cập nhật vào file log commit dạng text — đây là yêu cầu bắt buộc của đề (mục 12), Agent không tự commit thay.

# 3. Ranh giới repository
Dưới đây là sơ đồ ranh giới các thư mục. Agent chỉ làm việc trong các khu vực được cấp phép:

| Nội dung | Nguồn chuẩn |
| :--- | :--- |
| SUT | `src/` |
| Postman Collections | `tests/api-testing/collections/` |
| Test Data & Environments | `tests/api-testing/data/` |
| Newman Reports | `tests/api-testing/reports/` |
| Evidence | `tests/api-testing/evidence/` |
| CI/CD Config | `.github/workflows/` |
| Review và phân tích | `reports/api-testing/` |
| Báo cáo tổng, audit, critique | `reports/` |
| Bug reports | `bug-reports/api-testing/` |
| Test case Excel | `tests/api-testing/test-cases/` |

# 4. Workflow checkpoint
Agent phải tuân thủ nghiêm ngặt quy trình tuần tự, dừng ở từng Checkpoint:
```text
A Verify SUT/API spec/environment, chọn 3 APIs
  -> human approval
B Generate test cases với AI (≥35 per API)
  -> human approval
C Audit (VALID/INVALID/INCOMPLETE) + Extend (+5 per API)
  -> human approval
D1 Execute API 1 (Postman + Newman) -> analyse -> review
  -> D2 Execute API 2 -> analyse -> review
  -> D3 Execute API 3 -> analyse -> review
  -> human approval
E CI/CD, bug reports, agent skill, final report
  -> final human approval
```
**Lưu ý:** Không gộp các phase A-E. Trong Phase D, không chạy D2 ngay sau D1 nếu chưa có approval của D1.

# 5. Quy trình mỗi lượt
Mỗi khi Agent nhận prompt từ human:
1. Xác định Phase hiện tại dựa trên Context/Files được cung cấp hoặc prompt.
2. Kiểm tra `assignment-requirements.md` xem checklist.
3. Đọc Rule/Playbook/Runbook tương ứng trong `references/`.
4. Tìm kiếm file/code liên quan trong thư mục được phép.
5. Thực hiện nhiệm vụ (sinh test, audit, thiết lập Postman, phân tích report).
6. Ghi log tương tác, phân tích vào `ai-audit-report.md` (nếu cần).
7. Nếu nhiệm vụ sinh ra file, chỉ tạo file vào đúng cấu trúc Ranh giới repo.
8. Dừng và trả về status `[PENDING HUMAN REVIEW]`.

# 6. Template đóng gói
Agent phải sử dụng các template được chuẩn bị sẵn (đặt tại `assets/templates/` nếu có):
- API Selection Template
- Prompt Engineering Log Template
- Test Case Generation Template (Excel/CSV format)
- Test Case Audit Template
- Postman Collection Template
- Postman Environment Template
- Newman HTML Extra Report Template (nếu có custom config)
- Bug Report Template
- AI Skill Demonstration Report Template

# 7. Definition of Done (DoD)
Một phase hoặc toàn bộ quy trình chỉ được coi là hoàn tất khi:
- Tất cả các item trong checklist của `assignment-requirements.md` đã có artifact truy ngược rõ ràng.
- Bất kỳ kết luận hoặc kết quả test nào cũng phải có evidence (log, Newman report, screenshot) đính kèm hoặc được chỉ định rõ đường dẫn. Thiếu evidence = chưa hoàn tất. Không bịa evidence.
