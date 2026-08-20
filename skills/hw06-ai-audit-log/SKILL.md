---
name: hw06-ai-audit-log
description: Ghi AI Audit Report bắt buộc cho HW06 vào reports/ai-audit-report.md. Dùng sau mỗi lượt Codex hỗ trợ HW06 như trả lời câu hỏi, sinh/audit test cases, tạo Postman/Newman/CI artifacts, phân tích kết quả, tạo bug report/GitHub Issues, tạo/cập nhật skill hoặc chỉnh report; trước final nên append một Entry mới gồm tool, timestamp GMT+7, artifact type, full prompt và tóm tắt AI output.
---

# HW06 AI Audit Log

## Mục tiêu

Append audit entry vào `reports/ai-audit-report.md` cho mỗi tương tác AI liên quan đến HW06. Ghi đủ thông tin đề yêu cầu: AI tool name, date/time, prompt, và AI output. Không thay thế nội dung cũ, không ghi lan man quá dài.

## Tài liệu cần đọc

- Đọc `reports/ai-audit-report-sample.md` vài entry đầu nếu cần đối chiếu văn phong, nhưng không phụ thuộc cứng vào sample.
- Đọc `references/audit-entry-format.md` để nắm format cô đọng.
- Đọc `reports/ai-audit-report.md` trước khi append để xác định entry number tiếp theo.

## Quy tắc ghi log

Ghi một entry mới khi Codex:

- Trả lời câu hỏi của người dùng về HW06, API, report, evidence hoặc quy trình.
- Tạo/sửa/xóa file trong repo.
- Tạo/cập nhật skill.
- Sinh/audit/extend API test cases.
- Tạo Postman collection, environment, data file, Newman report, CI workflow, bug report hoặc GitHub Issue.
- Phân tích Newman/GitHub Actions/test failure hoặc đề xuất bug.

Không ghi entry riêng cho từng tool call nhỏ trong cùng một lượt; gom toàn bộ lượt user hiện tại thành một entry.

## Format bắt buộc

Mỗi entry phải có:

````markdown
## Entry #N

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | DD/MM/YYYY HH:mm GMT+7 |
| **Artifact type** | ... |

**Full prompt:**

```text
...
```

### (2) AI Output

```text
...
```
````

Timestamp dùng giờ Việt Nam `GMT+7`. Nếu không chắc giờ hiện tại, chạy `date '+%d/%m/%Y %H:%M GMT+7'` trong môi trường Asia/Ho_Chi_Minh.

Nếu user prompt có nhiều phần, ghi nguyên văn ý chính của user request. Nếu output có nhiều tool logs, chỉ tóm tắt các artifact đã tạo/sửa, checks đã chạy, lỗi/blocker và kết luận.

## Cách append bằng script

Dùng script để tự đánh số entry:

```bash
python3 skills/hw06-ai-audit-log/scripts/append_ai_audit_entry.py \
  --report reports/ai-audit-report.md \
  --tool Codex \
  --artifact-type "Agent skill cập nhật + AI audit report entry" \
  --prompt-file /private/tmp/prompt.txt \
  --output-file /private/tmp/output.txt
```

Nếu report chưa có header, script tạo header mặc định từ sample với thông tin sinh viên đã biết:

- Họ tên: Ngô Hồng Thanh
- MSSV: 23127475
- Lớp / Khoá: CS423 / CSC13003
- Mã bài tập: HW06
- Công cụ AI đã dùng: Codex

## Cách viết AI Output

Tóm tắt những gì Codex đã làm hoặc đã trả lời:

- Nêu file/artifact đã sửa hoặc tạo.
- Nêu command/check đã chạy và kết quả quan trọng.
- Nêu kết luận chính nếu chỉ trả lời câu hỏi.
- Nêu hạn chế/blocker nếu có.
- Với bug/GitHub issue, ghi issue URL nếu đã tạo thật.
- Với Newman/CI evidence, ghi report path hoặc run URL nếu có thật.

Không paste toàn bộ log dài. Không đưa token/password bí mật vào audit nếu có; với HW06 có thể ghi email test/password seed khi chính bài yêu cầu minh bạch test data.

## Trước khi final

Trước final, append entry cho lượt hiện tại vào `reports/ai-audit-report.md` khi đang làm bài HW06 thật. Nếu chỉ đang chỉnh skill và user không muốn sửa report, có thể bỏ qua nhưng phải nói rõ chưa append audit entry. Nếu vừa tạo/cập nhật chính skill này, entry nên nói rõ skill audit logger đã được tạo/cập nhật và validator đã chạy hay chưa.
