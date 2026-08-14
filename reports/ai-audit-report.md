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
