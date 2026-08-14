# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh          |
| **MSSV:**               | 23127475                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW05                    |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 01:21 GMT+7 |
| **Artifact type** | Agent skill tạo mới + AI audit report entry |

**Full prompt:**

```text
[$skill-creator](/Users/thanhngo/.codex/skills/.system/skill-creator/SKILL.md) thêm skill để ghi ai audit log cho mỗi lần thực hiện thay đổi hay trả lời câu hỏi của tôi vào reports/ai-audit-report.md, xem vài entry đầu của file reports/ai-audit-report-sample.md để nắm cấu trúc và cách viết
```

### (2) AI Output

```text
AI đã tạo skill local `skills/hw05-ai-audit-log` để ghi AI Audit Report cho HW05 vào `reports/ai-audit-report.md` theo format sample.

Các thay đổi chính:
- Tạo `skills/hw05-ai-audit-log/SKILL.md` với quy tắc tự append audit entry trước final cho các lượt hỏi đáp, chỉnh file, chạy kiểm tra, phân tích và tạo artifact HW05.
- Thêm `skills/hw05-ai-audit-log/references/audit-entry-format.md` mô tả header, entry format và artifact type gợi ý.
- Thêm `skills/hw05-ai-audit-log/scripts/append_ai_audit_entry.py` để tự tạo header nếu report trống, tự đánh số Entry #N, dùng timestamp GMT+7 và append prompt/output vào Markdown.
- Cập nhật `agents/openai.yaml` với `policy.allow_implicit_invocation: true`.
- Cập nhật các skill HW05 hiện có để nhắc dùng `$hw05-ai-audit-log` trước final.

Kiểm tra đã chạy:
- Python compile cho script append audit: OK.
- `quick_validate.py` pass cho `hw05-ai-audit-log`, `hw05-jmeter-workflow1`, `hw05-jmeter-cli-runner`, `hw05-performance-report`.
- Dùng script mới append entry này vào `reports/ai-audit-report.md`.
```

## Entry #2

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 01:26 GMT+7 |
| **Artifact type** | Hỏi đáp về dữ liệu account test HW05 |

**Full prompt:**

```text
việc tạo 50 account là trong test sẽ có bước đó chứ không phải chỉ đang chạy trên máy tôi mà đúng không
```

### (2) AI Output

```text
AI giải thích rằng 50 account đã tạo là bước setup dữ liệu trên backend local đang chạy, không phải một request nằm trong measured workflow JMeter chính. Khi chạy test Load/Stress/Spike/Endurance, JMeter đọc các account đó từ CSV rồi thực hiện workflow đo hiệu năng: login -> categories -> search products -> product detail -> cart -> checkout. Nếu reset database hoặc chạy trên môi trường khác, cần chạy lại script create_workflow1_accounts.py trước khi chạy JMeter để seed lại account. Trong report nên ghi register là bước chuẩn bị test data, còn workflow đo chính không bao gồm register.
```

## Entry #3

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 01:41 GMT+7 |
| **Artifact type** | Bug report template / GitHub issue workflow |

**Full prompt:**

```text
à nếu có bug thì tạo bug report theo template .github/ISSUE_TEMPLATE/bug-report-template.md rồi đặt ở reports/bug-reports nhé. tôi cũng vừa thêm skill gh-create-bug-issues
```

### (2) AI Output

```text
AI đã cập nhật workflow/skills HW05 để khi phát hiện bug hoặc performance issue thật thì tạo bug report Markdown local trước, theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`, lưu trong `reports/bug-reports/`.

Các thay đổi chính:
- Đọc template bug report của repo và skill `skills/gh-create-bug-issues/SKILL.md`.
- Tạo skill mới `skills/hw05-bug-report` để chuẩn hóa quy trình tạo bug report local.
- Thêm script `skills/hw05-bug-report/scripts/create_bug_report.py` sinh bug report từ template, tự điền title, test case, requirement, severity/priority, environment, steps, expected/actual và evidence.
- Thêm reference `skills/hw05-bug-report/references/bug-report-rules.md` để phân biệt bug SUT với lỗi test data/sandbox/JMeter plan.
- Cập nhật `skills/hw05-jmeter-cli-runner/SKILL.md` và `skills/hw05-performance-report/SKILL.md`: nếu có bug thật thì dùng `$hw05-bug-report` tạo file trong `reports/bug-reports/`, sau đó mới dùng `$gh-create-bug-issues` khi cần tạo GitHub Issue.
- Cập nhật `workflows.md` phần evidence để nhắc bug report local và GitHub issue workflow.
- Tạo thư mục `reports/bug-reports/` trên workspace.

Kiểm tra đã chạy:
- Python compile cho script create bug report: OK.
- Chạy thử script tạo bug report vào `/private/tmp`, kiểm tra title và nội dung template được thay đúng.
- `quick_validate.py` pass cho `hw05-bug-report`, `hw05-jmeter-cli-runner`, `hw05-performance-report`.
```

## Entry #4

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 01:49 GMT+7 |
| **Artifact type** | Kế hoạch HW05 + main report template + commit setup |

**Full prompt:**

```text
các skill và tài liệu hiện tại đã đủ để bắt đầu làm bài chưa, nếu rồi thì bây giờ tạo cho tôi 1 file md plan những bước, lộ trình làm bài tập, những đợt commit nào (plan chi tiết sẽ làm gì trong đó) sau khi có plan rồi có thể commit đầu tiên cho các thay đổi hiện tại luôn không (commit setup skill và các docs), rồi video demo quay những gì. tôi cũng đã tạo reports/main-report.md sẵn rồi, có cần điền template cấu trúc sẵn rồi trong lúc làm sẽ cập nhật dần luôn không. main report cần trình bày chi tiết
```

### (2) AI Output

```text
AI đánh giá rằng bộ skill và tài liệu hiện tại đã đủ để bắt đầu HW05; phần còn thiếu sẽ phát sinh khi chạy thật như JMX final, JTL, HTML reports, screenshots, hardware evidence, analysis và video.

AI đã tạo `reports/hw05-execution-plan.md` gồm lộ trình Pha 0-9: setup, sinh/review JMeter plans, smoke test, chạy Load/Stress/Spike/Endurance, phân tích JTL và AI misinterpretation hunt, continuous performance testing proposal, video demo và submission.

AI đã tạo template chi tiết trong `reports/main-report.md` để cập nhật dần trong quá trình làm, gồm thông tin chung, workflow, hardware, test data, test design, human review, smoke test, execution evidence, metrics, scenario analysis, endurance threshold, bug reports, AI analysis, optimization judgement, CI proposal, video, AI audit, AI critique và checklist nộp bài.

AI cũng tạo `reports/bug-reports/.gitkeep` để theo dõi thư mục bug reports rỗng, validate các skill HW05 liên quan bằng `quick_validate.py`, và chuẩn bị commit đầu tiên cho setup skill/docs hiện tại.
```

## Entry #5

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:02 GMT+7 |
| **Artifact type** | Hỏi đáp về file mẫu seminar JMeter |

**Full prompt:**

```text
trong buổi seminar còn có cung cấp 1 file mẫu để tham khảo như sau: EShop_Workload_Model.jmx nó có ích hay cần giữ lại để làm gì không hay với bộ skill đã tạo là đủ rồi
```

### (2) AI Output

```text
AI đã kiểm tra `EShop_Workload_Model.jmx` trong repo. File này là JMeter 5.6.3 test plan mẫu tên `EShop - Workload Model (Throughput Controllers)`, có HTTP defaults localhost:3000, header JSON, token extractor, assertions, timers, Throughput Controllers theo tỉ lệ browse/detail/cart/checkout, Ultimate Thread Group baseline/spike và các listeners Aggregate Report, Summary Report, View Results Tree.

Kết luận: file mẫu có ích để tham khảo workload model, timer, token extraction, assertions, listeners và cách seminar minh họa traffic mix; nên giữ lại như reference seminar. Tuy nhiên không nên dùng nguyên xi làm test plan nộp chính vì có hard-code account `test@eshop.com`, không data-driven bằng CSV, workflow dùng throughput mix thay vì bảo đảm mỗi virtual user đi đúng chuỗi Workflow 1 end-to-end, có Ultimate Thread Group phụ thuộc JMeter Plugins, và không tách rõ 3 plan Load/Stress/Spike theo naming `{StudentID}_{ScenarioType}_{YYYYMMDD}`. Bộ skill hiện tại vẫn đủ để bắt đầu và tạo plan chính thức; file mẫu nên dùng để đối chiếu/cải thiện JMX/human review.
```

## Entry #6

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:21 GMT+7 |
| **Artifact type** | Hỏi đáp về lộ trình pha và commit HW05 |

**Full prompt:**

```text
tiếp theo để bắt đầu thì sẽ thực hiện pha 1 theo plan hả, làm tới pha nào thì sẽ commit tiếp?
```

### (2) AI Output

```text
AI trả lời rằng bước tiếp theo là thực hiện Pha 1 theo plan: sinh JMeter JMX cho Load/Stress/Spike/Endurance, review cấu hình CSV, token extractor, Authorization header, assertions, timers và listener/report views. Commit kế tiếp nên được tạo sau khi hoàn thành Pha 1 và smoke check tối thiểu của Pha 2, để JMX được xác nhận chạy được ở tải thấp trước khi commit. Commit này tương ứng `test(hw05): add jmeter plans for workflow 1`. Nếu muốn commit rất nhỏ thì có thể commit ngay sau Pha 1, nhưng khuyến nghị là Pha 1 + smoke test pass rồi commit để chất lượng tốt hơn.
```

## Entry #7

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:25 GMT+7 |
| **Artifact type** | Pha 1 - sinh và review JMeter test plans |

**Full prompt:**

```text
oke bây giờ thực hiện pha 1 cho tôi đi
```

### (2) AI Output

```text
AI đã thực hiện Pha 1 theo `reports/hw05-execution-plan.md`.

Kết quả:
- Tạo cây thư mục artifact chuẩn bằng `skills/hw05-jmeter-cli-runner/scripts/create_hw05_artifacts.py`.
- Sinh 4 JMeter plan bằng `skills/hw05-jmeter-workflow1/scripts/generate_workflow1_jmx.py`:
  - `testing-artifacts/hw05/plans/23127475_Load_20260815.jmx`
  - `testing-artifacts/hw05/plans/23127475_Stress_20260815.jmx`
  - `testing-artifacts/hw05/plans/23127475_Spike_20260815.jmx`
  - `testing-artifacts/hw05/plans/23127475_Endurance_20260815.jmx`
- Review JMX theo checklist: CSV Data Set Config, variableNames, token extractor `$.token`, Authorization header cho cart/checkout, POST raw body, assertions, timers và listener/report views.
- Phát hiện và sửa generator: đổi `Asserion.test_strings` thành `Assertion.test_strings`, bật `HTTPSampler.postBodyRaw` cho POST, thêm JSONPath assertion kiểm `$.token`.
- Regenerate toàn bộ JMX sau khi sửa.
- Validate XML bằng `xmllint`: pass cho cả 4 JMX.
- Kiểm tra `rg` không còn `Asserion.test_strings` trong generated plans/generator.
- Cập nhật `reports/main-report.md` với workload, plan paths, Java/JMeter version và human review.
- Cập nhật `reports/hw05-execution-plan.md` trạng thái Pha 1.
- Validate skill `hw05-jmeter-workflow1`: `Skill is valid!`.

Pha 1 chưa chạy smoke test JMeter; bước tiếp theo là Pha 2 smoke test tải thấp trước commit 2.
```

## Entry #8

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:35 GMT+7 |
| **Artifact type** | HW05 smoke test evidence |

**Full prompt:**

```text
oke tiếp tục bước tiếp theo
```

### (2) AI Output

```text
Tiếp tục Pha 2: chạy và xác minh JMeter smoke test cho Workflow 1. Phát hiện sandbox chặn JMeter gọi localhost và CSV account cũ không còn login được; tạo lại 200 account qua /api/register, rerun smoke ngoài sandbox thành công với 20 samples, 0 errors. Cập nhật smoke evidence note, smoke summary, main report, execution plan và generator/runner để hỗ trợ Smoke plan.
```

## Entry #9

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:40 GMT+7 |
| **Artifact type** | HW05 artifact status explanation |

**Full prompt:**

```text
ủa các change không stage hiện tại là sao, các file đó không cần thiết hoặc bỏ hả và sao tôi thấy nhiều file quá vậy?
```

### (2) AI Output

```text
Giải thích các file chưa stage sau commit Pha 2: .DS_Store là file macOS không cần commit; EShop_Workload_Model.jmx là file seminar reference nên giữ untracked trừ khi muốn lưu tham khảo; html/smoke và html/smoke-rerun là dashboard từ các lượt troubleshooting lỗi sandbox/CSV cũ, không phải evidence chính. Nhiều file trong commit đến từ JMeter HTML Dashboard smoke-pass vì dashboard là thư mục tự chứa gồm CSS/JS/font/static assets.
```

## Entry #10

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:41 GMT+7 |
| **Artifact type** | HW05 cleanup recommendation |

**Full prompt:**

```text
các file không stage hiện tại có cần xoá đi không
```

### (2) AI Output

```text
Khuyến nghị cleanup các file chưa stage: có thể xoá .DS_Store và hai dashboard troubleshooting html/smoke, html/smoke-rerun vì không phải evidence chính; giữ hoặc chủ động commit EShop_Workload_Model.jmx nếu muốn lưu file seminar reference. Không xoá reports/ai-audit-report.md vì đó là audit log cần giữ và sẽ commit ở mốc tiếp theo.
```

## Entry #11

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 15/08/2026 02:53 GMT+7 |
| **Artifact type** | HW05 Load test execution |

**Full prompt:**

```text
tôi đã xoá các phần nên xoá rồi, kiểm tra lại xem đúng chưa, đúng rồi thì thực hiện bước kế tiếp giúp tôi
```

### (2) AI Output

```text
Xác nhận cleanup đúng: .DS_Store và dashboard troubleshooting smoke/smoke-rerun đã được xoá, còn EShop_Workload_Model.jmx là file seminar reference untracked. Thực hiện Pha 3 Load test bằng JMeter CLI ngoài sandbox với 50 VUs, ramp-up 60s, duration 300s. Kết quả Load pass: 1176 samples, 0 errors, avg 2.91 ms, p95 5 ms, p99 6 ms, throughput 4.0384 RPS. Sinh JTL, JMeter log, HTML Dashboard, load-summary.csv, hardware/top/process evidence và cập nhật main report/execution plan.
```
