# HW05 Execution Plan - Performance Testing

## 1. Mức sẵn sàng hiện tại

Bộ tài liệu và skill hiện tại đã đủ để bắt đầu thực hiện HW05:

- Đề bài: `HW05-PerformanceTesting.md`.
- Workflow đã chọn: Workflow 1 trong `workflows.md`.
- API reference: `api_specification.md`.
- Thông tin account/port mặc định: `README.md`.
- Skill thiết kế JMeter: `skills/hw05-jmeter-workflow1`.
- Skill chạy CLI/evidence: `skills/hw05-jmeter-cli-runner`.
- Skill phân tích report: `skills/hw05-performance-report`.
- Skill ghi AI audit: `skills/hw05-ai-audit-log`.
- Skill tạo bug report local: `skills/hw05-bug-report`.
- Skill tạo GitHub issue từ bug report: `skills/gh-create-bug-issues`.
- Account CSV setup ban đầu: `testing-artifacts/hw05/data/workflow1_users.csv`.

Còn phải tạo trong quá trình làm:

- JMeter `.jmx` final cho Load, Stress, Spike, Endurance.
- Raw `.jtl` và HTML Dashboard cho từng scenario.
- Screenshot JMeter/CLI cùng `htop`/Activity Monitor.
- Hardware evidence.
- Bug reports nếu phát hiện bug thật.
- AI analysis output, human review, AI critique.
- Video demo YouTube unlisted.

## 2. Nguyên tắc triển khai

- Giữ blackbox testing: không sửa `backend`, `frontend-web`, `frontend-admin`, `frontend-mobile`.
- Workflow đo chính không bao gồm register; register chỉ dùng để setup account CSV.
- Ba scenario Load, Stress, Spike dùng cùng workflow endpoint, chỉ khác workload model/timer/listener.
- Dùng ba report views khác nhau:
  - Load: `Summary Report`.
  - Stress: `Aggregate Report`.
  - Spike: `View Results Tree`.
- Luôn xuất HTML Dashboard từ `.jtl` bằng JMeter CLI `-e -o`.
- Ghi AI Audit Report sau mỗi lượt làm việc có dùng AI.
- Nếu phát hiện bug thật, tạo file Markdown trong `reports/bug-reports/` trước; sau đó mới tạo GitHub issue nếu cần.

## 3. Lộ trình thực hiện

### Pha 0 - Setup skill, docs và plan

Mục tiêu:

- Hoàn thiện skill HW05.
- Hoàn thiện workflow/documentation nền.
- Tạo account CSV setup.
- Tạo plan thực hiện và template main report.

Artifact:

- `skills/`
- `workflows.md`
- `reports/hw05-execution-plan.md`
- `reports/main-report.md`
- `reports/ai-audit-report.md`
- `testing-artifacts/hw05/data/workflow1_users.csv`

Kết quả cần có:

- Commit setup đầu tiên.

### Pha 1 - Sinh và review JMeter test plans

Mục tiêu:

- Sinh JMX skeleton cho Load, Stress, Spike, Endurance.
- Review bằng JMeter GUI hoặc đọc XML.
- Điều chỉnh thread/ramp-up/duration/timer theo sức máy thật.
- Kiểm tra CSV Data Set Config, token extractor, Authorization header, assertions.

Lệnh khởi đầu:

```bash
python3 skills/hw05-jmeter-workflow1/scripts/generate_workflow1_jmx.py \
  --student-id 23127475 \
  --date 20260815 \
  --out-dir testing-artifacts/hw05 \
  --base-url http://localhost:3000
```

Kết quả cần có:

- `testing-artifacts/hw05/plans/23127475_Load_YYYYMMDD.jmx`
- `testing-artifacts/hw05/plans/23127475_Stress_YYYYMMDD.jmx`
- `testing-artifacts/hw05/plans/23127475_Spike_YYYYMMDD.jmx`
- `testing-artifacts/hw05/plans/23127475_Endurance_YYYYMMDD.jmx`
- Ghi human review vào `reports/main-report.md`.

### Pha 2 - Smoke test workflow

Mục tiêu:

- Chạy thử tải thấp để xác nhận workflow đúng.
- Xác nhận login lấy token, cart/checkout dùng token, dữ liệu CSV hợp lệ.
- Phân loại lỗi nếu có: script/data/sandbox/SUT.

Kết quả cần có:

- Smoke `.jtl` nếu chạy bằng JMeter.
- Ghi chú smoke test trong `reports/main-report.md`.
- Bug report nếu phát hiện lỗi SUT thật.

### Pha 3 - Chạy Load test

Mục tiêu:

- Chạy baseline ở tải kỳ vọng.
- Thu p50/p90/p95/p99, throughput, error rate.
- Chụp JMeter/CLI cùng resource monitor.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Bảng metric trong `reports/main-report.md`.

### Pha 4 - Chạy Stress test

Mục tiêu:

- Tăng tải để tìm điểm gãy hoặc vùng latency/error tăng mạnh.
- Theo dõi CPU/RAM.
- Ghi rõ nếu giảm VU do giới hạn máy local.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Nhận xét điểm gãy và recovery.
- Bug report nếu có 5xx/crash/timeout thật.

### Pha 5 - Chạy Spike test

Mục tiêu:

- Tạo tải đột ngột, timer thấp hoặc bằng 0.
- Quan sát hệ thống khi tải tăng nhanh rồi giảm.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Nhận xét p95/p99/error rate trong đỉnh spike.

### Pha 6 - Chạy Endurance / Soak test

Mục tiêu:

- Chạy 10-15 phút ở mức tải ổn định gần ngưỡng an toàn.
- Xác định maximum stable RPS, p95, error rate, CPU/RAM ceiling.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Kết luận endurance threshold bằng số cụ thể.

### Pha 7 - Phân tích JTL và AI misinterpretation hunt

Mục tiêu:

- Summarize `.jtl` bằng script.
- Nhờ AI phân tích số liệu.
- Tự kiểm tra lại AI output bằng raw `.jtl`.
- Ghi các chỗ AI đọc nhầm, thiếu hoặc hallucinated.

Lệnh khởi đầu:

```bash
python3 skills/hw05-performance-report/scripts/summarize_jtl.py \
  testing-artifacts/hw05/results/load/23127475_Load_YYYYMMDD.jtl \
  --out testing-artifacts/hw05/analysis/load-summary.csv
```

Kết quả cần có:

- Summary CSV cho từng scenario.
- Bảng metric tổng hợp trong main report.
- Section misinterpretation hunt.
- Section feasible/needs evidence/hallucinated recommendations.

### Pha 8 - Viết continuous performance testing proposal

Mục tiêu:

- Đề xuất pipeline theo dõi commit/PR.
- Chạy performance subset khi backend/API thay đổi.
- So sánh p95/error rate với baseline.
- Thảo luận cost và false alarm.

Kết quả cần có:

- Flow chart Mermaid trong `reports/main-report.md`.
- Trade-off rõ ràng.

### Pha 9 - Hoàn thiện video demo và submission

Mục tiêu:

- Quay video demo tối thiểu 6 phút, tiếng Việt.
- Upload YouTube unlisted.
- Điền link video vào main report.
- Kiểm tra AI Audit Report đầy đủ.

Kết quả cần có:

- Link YouTube.
- Final `reports/main-report.md`.
- Final `reports/ai-audit-report.md`.
- Artifact paths đầy đủ.

## 4. Kế hoạch commit

### Commit 1 - Setup HW05 skills and documentation

Nội dung:

- Thêm/cập nhật đề bài và workflow HW05.
- Thêm bộ skill HW05: JMeter workflow, CLI runner, performance report, AI audit, bug report.
- Thêm skill GitHub issue workflow nếu chưa commit.
- Thêm CSV account setup ban đầu.
- Thêm `reports/main-report.md` template.
- Thêm `reports/hw05-execution-plan.md`.
- Thêm AI audit report ban đầu.

Commit message đề xuất:

```text
chore(hw05): setup performance testing skills and docs
```

### Commit 2 - Add JMeter plans and test data review

Nội dung:

- Thêm JMX final cho Load/Stress/Spike/Endurance.
- Cập nhật CSV nếu cần thêm account cho Stress/Spike.
- Ghi human review thiết kế test plan vào main report.

Commit message đề xuất:

```text
test(hw05): add jmeter plans for workflow 1
```

### Commit 3 - Add execution artifacts

Nội dung:

- Thêm raw `.jtl` và HTML report folders.
- Thêm evidence notes.
- Thêm hardware spec table.
- Cập nhật main report phần execution.

Commit message đề xuất:

```text
test(hw05): add performance execution artifacts
```

Nếu HTML report quá lớn, cân nhắc nén hoặc chỉ commit summary/path theo yêu cầu nộp.

### Commit 4 - Add analysis and bug reports

Nội dung:

- Thêm summary CSV từ `.jtl`.
- Cập nhật phân tích Load/Stress/Spike/Endurance.
- Thêm bug reports trong `reports/bug-reports/` nếu có.
- Thêm GitHub issue links nếu đã tạo.

Commit message đề xuất:

```text
docs(hw05): add performance analysis and bug reports
```

### Commit 5 - Finalize report and audit

Nội dung:

- Hoàn thiện main report.
- Hoàn thiện AI Audit Report.
- Thêm AI critique 200-300 từ.
- Thêm video demo link.
- Checklist submission cuối.

Commit message đề xuất:

```text
docs(hw05): finalize performance testing report
```

## 5. Video demo cần quay gì

Video tối thiểu 6 phút, có giọng nói tiếng Việt. Có thể quay một video liền hoặc chia clip theo scenario.

Nội dung đề xuất:

1. Giới thiệu ngắn:
   - HW05 Performance Testing.
   - Tool: JMeter CLI/GUI.
   - SUT: EShop backend `localhost:3000`.
   - Workflow 1: login -> categories -> search -> detail -> cart -> checkout.

2. Chứng minh data-driven:
   - Mở CSV account/data.
   - Nói register chỉ là setup account, không nằm trong measured workflow.

3. Chứng minh JMeter plan:
   - Mở Load/Stress/Spike JMX.
   - Chỉ token extractor, Authorization header, assertions, timers.
   - Chỉ ba listener/report view khác nhau.

4. Chạy hoặc replay từng scenario:
   - Load: cho thấy tool và `htop`/Activity Monitor cùng khung hình.
   - Stress: cho thấy tải cao hơn và resource monitor.
   - Spike: cho thấy tải tăng đột ngột.
   - Endurance: có thể trình bày log/report nếu không quay đủ 10-15 phút.

5. Kết quả:
   - Mở HTML Dashboard.
   - Chỉ p95/p99/throughput/error rate.
   - Nói ngưỡng endurance.

6. AI/human review:
   - Mở AI Audit Report.
   - Nói ví dụ AI đã hỗ trợ và bạn đã kiểm tra lại số liệu.
   - Nói bug report/GitHub issue nếu có.

7. Kết luận:
   - Nêu continuous performance testing proposal và p95 regression gate.

## 6. Cách cập nhật main report trong quá trình làm

`reports/main-report.md` nên được điền template ngay từ đầu. Mỗi pha làm xong thì cập nhật section tương ứng:

- Sau setup: thông tin SUT, workflow, data strategy, skill/tool.
- Sau generate JMX: test design, workload, human review.
- Sau run: execution evidence và metric table.
- Sau analysis: misinterpretation hunt, recommendation judgement.
- Sau video: link video và checklist submission.

Không đợi cuối cùng mới viết report, vì HW05 chấm cả quá trình và evidence.
