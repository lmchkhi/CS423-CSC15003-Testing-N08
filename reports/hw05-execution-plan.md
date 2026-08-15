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
- Account CSV hiện tại: `testing-artifacts/hw05/data/workflow1_users.csv` với 200 account tạo bằng `/api/register`.
- `workflow1_users.csv` là test data snapshot; nếu reset database hoặc chạy trên môi trường khác thì chạy lại `skills/hw05-jmeter-workflow1/scripts/create_workflow1_accounts.py` trước khi chạy JMeter. Script này tự ghi đè CSV bằng danh sách account mới theo prefix được truyền vào.

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
- Không xem việc register lại account/ghi đè CSV là thay đổi SUT; đây là bước seed test data cho blackbox performance test.
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

Trạng thái 2026-08-15:

- Đã sinh 4 JMX với ngày `20260815`.
- Đã validate XML bằng `xmllint`.
- Đã review CSV, token extractor, Authorization header, POST raw body, assertions, timers và listener/report view.
- Đã sửa generator để dùng đúng `Assertion.test_strings`, bật `HTTPSampler.postBodyRaw` cho POST và thêm JSONPath assertion kiểm `$.token`.
- Đã bổ sung tùy chọn sinh Smoke plan bằng `--include-smoke` để kiểm tra end-to-end trước khi chạy chính thức.
- Đã chạy smoke test ở Pha 2 và pass sau khi tạo lại CSV account.

### Pha 2 - Smoke test workflow

Mục tiêu:

- Chạy thử tải thấp để xác nhận workflow đúng.
- Xác nhận login lấy token, cart/checkout dùng token, dữ liệu CSV hợp lệ.
- Phân loại lỗi nếu có: script/data/sandbox/SUT.

Kết quả cần có:

- Smoke `.jtl` nếu chạy bằng JMeter.
- Ghi chú smoke test trong `reports/main-report.md`.
- Bug report nếu phát hiện lỗi SUT thật.

Trạng thái 2026-08-15:

- Đã sinh `testing-artifacts/hw05/plans/23127475_Smoke_20260815.jmx`.
- Đã xác nhận sandbox Codex chặn JMeter gọi localhost nên lượt đó không dùng làm kết quả chính thức.
- Đã phát hiện CSV account cũ không còn hợp lệ với database đang chạy; tạo lại 200 account bằng `/api/register`.
- Smoke chính thức ngoài sandbox pass: 20 samples, 0 errors, avg 3.9 ms, p95 6.55 ms.
- Evidence chính: `testing-artifacts/hw05/results/smoke/23127475_Smoke_20260815_pass.jtl`, `testing-artifacts/hw05/html/smoke-pass/index.html`, `testing-artifacts/hw05/analysis/smoke-summary.csv`, `testing-artifacts/hw05/evidence/notes/smoke-20260815.md`.
- Không tạo bug report vì lỗi gặp phải là sandbox/test data cũ, không phải bug SUT.

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

Trạng thái 2026-08-15:

- Đã chạy Load test chính thức ngoài sandbox bằng JMeter CLI.
- Cấu hình: 50 VUs, ramp-up 60s, duration 300s, think time 1500ms + random 1500ms.
- Kết quả: 1176 samples, 0 errors, avg 2.91 ms, p95 5 ms, p99 6 ms, throughput 4.0384 RPS.
- Evidence chính: `testing-artifacts/hw05/results/load/23127475_Load_20260815.jtl`, `testing-artifacts/hw05/html/load/index.html`, `testing-artifacts/hw05/analysis/load-summary.csv`, `testing-artifacts/hw05/evidence/notes/load-20260815.md`.
- Text resource evidence đã lưu bằng `top`/`ps`; screenshot/video cần bổ sung khi quay demo.
- Không tạo bug report vì Load run không có lỗi SUT.

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

Trạng thái 2026-08-15:

- Đã chạy Stress test chính thức ngoài sandbox bằng JMeter CLI.
- Cấu hình: 150 VUs, ramp-up 120s, duration 420s, think time 800ms + random 800ms.
- Kết quả: 8930 samples, 0 errors, avg 1.89 ms, p95 4 ms, p99 5 ms, throughput 21.6052 RPS.
- Evidence chính: `testing-artifacts/hw05/results/stress/23127475_Stress_20260815.jtl`, `testing-artifacts/hw05/html/stress/index.html`, `testing-artifacts/hw05/analysis/stress-summary.csv`, `testing-artifacts/hw05/evidence/notes/stress-20260815.md`.
- Text resource evidence đã lưu bằng `top`/`ps`; screenshot Stress có thể chụp bằng rerun riêng nếu chưa chụp trong run chính.
- Không tạo bug report vì Stress run không có lỗi SUT và chưa tìm thấy điểm gãy ở 150 VUs.

### Pha 5 - Chạy Spike test

Mục tiêu:

- Tạo tải đột ngột, timer thấp hoặc bằng 0.
- Quan sát hệ thống khi tải tăng nhanh rồi giảm.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Nhận xét p95/p99/error rate trong đỉnh spike.

Trạng thái 2026-08-15:

- Đã chạy Spike test chính thức ngoài sandbox bằng JMeter CLI.
- Cấu hình: 200 VUs, ramp-up 30s, duration 120s, think time 0ms.
- Kết quả: 1,225,240 samples, 0 errors, avg 17.14 ms, p95 37 ms, p99 55 ms, throughput 10212.2907 RPS.
- Evidence chính: raw local `testing-artifacts/hw05/results/spike/23127475_Spike_20260815.jtl`, bản nén commit/submission `testing-artifacts/hw05/results/spike/23127475_Spike_20260815.jtl.gz`, `testing-artifacts/hw05/html/spike/index.html`, `testing-artifacts/hw05/analysis/spike-summary.csv`, `testing-artifacts/hw05/evidence/notes/spike-20260815.md`.
- Raw Spike JTL 156 MB được giữ local; bản gzip còn 7.4 MB nên có thể commit/nộp như artifact raw result đã nén.
- Text resource evidence đã lưu bằng `top`/`ps`; screenshot Spike có thể chụp bằng rerun riêng nếu cần.
- Không tạo bug report vì Spike run không có lỗi SUT, nhưng report ghi nhận latency tăng rõ so với Stress.

### Pha 6 - Chạy Endurance / Soak test

Mục tiêu:

- Chạy 10-15 phút ở mức tải ổn định gần ngưỡng an toàn.
- Xác định maximum stable RPS, p95, error rate, CPU/RAM ceiling.

Kết quả cần có:

- Raw `.jtl`.
- HTML Dashboard.
- Screenshot evidence.
- Kết luận endurance threshold bằng số cụ thể.

Trạng thái 2026-08-15:

- Đã chạy Endurance test chính thức ngoài sandbox bằng JMeter CLI.
- Cấu hình: 50 VUs, ramp-up 60s, duration 900s, think time 1500ms + random 1500ms.
- Kết quả: 3837 samples, 0 errors, avg 2.42 ms, p95 4 ms, p99 5 ms, throughput 4.3127 RPS.
- Evidence chính: `testing-artifacts/hw05/results/endurance/23127475_Endurance_20260815.jtl`, `testing-artifacts/hw05/html/endurance/index.html`, `testing-artifacts/hw05/analysis/endurance-summary.csv`, `testing-artifacts/hw05/evidence/notes/endurance-20260815.md`.
- Text resource evidence đã lưu bằng `top`/`ps`; screenshot Endurance có thể chụp bằng rerun riêng nếu cần.
- Kết luận threshold hiện tại: 50 VUs ổn định trong 15 phút với 0% error, p95 4 ms và chưa chạm CPU/RAM ceiling.

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

Trạng thái 2026-08-15:

- Đã đối chiếu summary CSV cho Load, Stress, Spike và Endurance.
- Đã cập nhật `reports/main-report.md` phần bug report status: không tạo bug report vì không có lỗi SUT thật.
- Đã viết AI analysis draft dựa trên p95/p99/throughput/error rate/resource evidence.
- Đã thêm human misinterpretation hunt: sửa các kết luận quá rộng về Stress, Spike, checkout và Endurance threshold.
- Đã phân loại đề xuất tối ưu thành `Feasible`, `Needs evidence`, `Hallucinated`.

### Pha 8 - Viết continuous performance testing proposal

Mục tiêu:

- Đề xuất pipeline theo dõi commit/PR.
- Chạy performance subset khi backend/API thay đổi.
- So sánh p95/error rate với baseline.
- Thảo luận cost và false alarm.

Kết quả cần có:

- Flow chart Mermaid trong `reports/main-report.md`.
- Trade-off rõ ràng.

Trạng thái 2026-08-15:

- Đã viết proposal continuous performance testing trong `reports/main-report.md`.
- Đã dùng Load p95 = 5 ms và error rate = 0% làm baseline đề xuất cho p95 regression gate.
- Đã nêu warning/fail gate cho p95, error rate, throughput và checkout p95.
- Đã mô tả CI trigger, setup, JMeter CLI subset, parse `.jtl`, lưu artifact và quy tắc update baseline.
- Đã thảo luận trade-off: cost CI, false alarm, data stability, runner variability, coverage limitation và maintenance.

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
