---
name: ai-first-jmeter-performance-testing
description: Thiết kế, sinh, review, thực thi và phân tích performance test Apache JMeter cho bài HW05 EShop theo hướng AI-first, data-driven, evidence-first và checkpoint-first. Dùng khi Codex xử lý Workflow 2 của sinh viên 23127464 (login, search, product detail, cart, checkout, my-orders), tạo hoặc review JMX/CSV, chạy Load/Stress/Spike/Endurance, phân tích JTL, săn lỗi diễn giải AI, đánh giá tối ưu, lập báo cáo hoặc đề xuất continuous performance testing. Bắt buộc dừng ở các checkpoint A-E và không tự duyệt hay bịa kết quả chạy, metric, screenshot, video, issue hoặc commit.
---

# AI-First JMeter Performance Testing

## Nguyên tắc điều phối

Biến AI thành trợ lý kiểm thử có kỷ luật, không thành black box. Ưu tiên `traceability`, `reproducibility`, `data isolation`, `correlation`, bằng chứng runtime và human review.

Luôn:

1. Ghi interaction hiện tại vào `reports/ai-audit-report.md` trước hành động nghiệp vụ khác. Lấy thời gian thật từ môi trường và dùng [mẫu AI Audit](assets/templates/ai-audit-entry.md). Không ghi secret, token runtime hoặc mật khẩu cá nhân.
2. Đọc `2026.HW05.Performance_Testing_En_2.md` nếu có trong repo; coi tài liệu bài tập hiện hành là nguồn chuẩn cao nhất.
3. Inspect repo, SUT, API spec, JMeter và Java trước khi hỏi người dùng những gì có thể tự xác minh.
4. Chỉ thực hiện phase hoặc subphase được người dùng yêu cầu và đã đủ phê duyệt tiên quyết.
5. Phân biệt quan sát runtime, suy luận từ source và giả thuyết chưa kiểm chứng.
6. Kết thúc mỗi checkpoint bằng trạng thái `PENDING HUMAN REVIEW`, đề xuất phase kế tiếp rồi dừng. Không tự phê duyệt.

Không bao giờ tuyên bố đã chạy, passed, tạo issue/video/commit hoặc có metric/evidence nếu artifact thật không tồn tại. Không sinh JTL, screenshot, hardware/resource metric hoặc lời phê duyệt giả. Không sửa SUT để làm test pass hay làm metric đẹp hơn.

## Nạp ngữ cảnh theo nhu cầu

- Đọc [assignment-requirements.md](references/assignment-requirements.md) khi lập checklist, đánh giá completeness, chuẩn bị submission hoặc báo cáo.
- Đọc [wf02-contract.md](references/wf02-contract.md) trước khi xác minh API, thiết kế data/correlation/assertion, tạo hoặc review JMX.
- Đọc [phase-playbook.md](references/phase-playbook.md) trước khi thực hiện bất kỳ phase A-E hoặc subphase D1-D4 nào.
- Đọc [evidence-analysis.md](references/evidence-analysis.md) khi chạy test, quyết định VALID/INVALID, phân loại failure, phân tích JTL, review optimization/issue hoặc lập continuous-performance proposal.

## Ranh giới repository

Giữ ownership sau:

| Nội dung | Nguồn chuẩn |
| --- | --- |
| SUT | `src/` |
| JMX và CSV | `tests/WF-02/test-cases/`, `tests/WF-02/data/` |
| Raw JTL và HTML | `tests/WF-02/test-runs/` |
| Evidence runtime/hardware | `tests/WF-02/evidence/` |
| Helper của test harness | `tests/WF-02/support/` |
| Review và phân tích | `reports/WF-02/` |
| Báo cáo tổng, audit, critique | `reports/` |
| Issue draft có evidence | `bug-reports/WF-02/` |
| JMeter config dùng chung | `jmeter/` |

Không đặt canonical test artifact trong `src/` hoặc nhân đôi giữa `jmeter/` và `tests/`. Không xóa artifact bài cũ; dùng namespace `WF-02`.

## Workflow checkpoint

Đi theo đúng chuỗi:

```text
A Verify SUT/API/environment
  -> human approval
B Design workload/data
  -> human approval
C Generate JMX and validate smoke
  -> human approval
D1 Load -> review -> D2 Stress -> review -> D3 Spike -> review -> D4 Endurance
  -> human approval
E Analyse, challenge AI, report and propose CI
  -> final human approval
```

Không gộp A-E. Không chạy D2 ngay sau D1, hoặc phase kế tiếp, nếu chưa có phê duyệt rõ ràng.

## Quy trình mỗi lượt

1. Xác định checkpoint hiện tại từ prompt và evidence trong repo. Nếu approval chưa có, chỉ báo gap và dừng.
2. Ghi AI Audit bằng timestamp thật.
3. Đọc reference tương ứng và các artifact đầu vào thật.
4. Thực hiện đúng phạm vi checkpoint. Dùng smoke 1 thread/1 iteration trước graded plans; dùng non-GUI cho measured runs.
5. Giữ raw evidence bất biến. Không overwrite run cũ; tạo thư mục run riêng khi rerun.
6. Cập nhật review/log/report bằng template phù hợp. Để trường không có bằng chứng là `Không xác định` hoặc `Chưa chạy — <lý do>`.
7. Trả lời theo cấu trúc: files changed, actions actually executed, evidence, findings, AI mistakes/uncertainties, current status, proposed next phase.
8. Dừng chờ review.

## Template đóng gói

- [AI Audit entry](assets/templates/ai-audit-entry.md)
- [Review notes](assets/templates/review-notes.md)
- [Execution log](assets/templates/execution-log.md)
- [Result summary](assets/templates/result-summary.md)
- [Bug/performance issue](assets/templates/bug-report.md)
- [README HW05 summary](assets/templates/readme-summary.md)

Copy template vào vị trí artifact đích rồi điền bằng dữ liệu thật. Không điền placeholder bằng số giả.

## Definition of Done

Chỉ đánh dấu hoàn tất khi từng checkbox trong [assignment-requirements.md](references/assignment-requirements.md) có artifact truy ngược được đến test plan, workload, data, timestamp, raw JTL, resource state, environment và human interpretation. Thiếu evidence đồng nghĩa chưa hoàn tất.
