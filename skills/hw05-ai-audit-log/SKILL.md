---
name: hw05-ai-audit-log
description: Ghi AI Audit Report cho HW05 vào reports/ai-audit-report.md theo format mẫu của reports/ai-audit-report-sample.md. Dùng tự động sau mỗi lần Codex trả lời câu hỏi, chỉnh sửa file, tạo artifact, chạy kiểm tra, phân tích kết quả, tạo/cập nhật skill hoặc hỗ trợ bài HW05; trước final phải append một Entry mới gồm tool, timestamp GMT+7, artifact type, full prompt và tóm tắt AI output.
---

# HW05 AI Audit Log

## Mục tiêu

Append audit entry vào `reports/ai-audit-report.md` cho mỗi tương tác AI liên quan đến HW05. Ghi theo đúng cấu trúc sample, không thay thế nội dung cũ, không ghi lan man quá dài.

## Tài liệu cần đọc

- Đọc `reports/ai-audit-report-sample.md` vài entry đầu nếu cần đối chiếu văn phong.
- Đọc `references/audit-entry-format.md` để nắm format cô đọng.
- Đọc `reports/ai-audit-report.md` trước khi append để xác định entry number tiếp theo.

## Quy tắc ghi log

Ghi một entry mới khi Codex:

- Trả lời câu hỏi của người dùng về HW05, API, JMeter, report, evidence hoặc quy trình.
- Tạo/sửa/xóa file trong repo.
- Chạy test, smoke test, validator, command phân tích hoặc command tạo artifact.
- Tạo/cập nhật skill.
- Phân tích `.jtl`, HTML report, metric, AI critique, issue hoặc proposal CI performance testing.

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

## Cách append bằng script

Dùng script để tự đánh số entry:

```bash
python3 skills/hw05-ai-audit-log/scripts/append_ai_audit_entry.py \
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
- Mã bài tập: HW05
- Công cụ AI đã dùng: Codex

## Cách viết AI Output

Tóm tắt những gì Codex đã làm hoặc đã trả lời:

- Nêu file/artifact đã sửa hoặc tạo.
- Nêu command/check đã chạy và kết quả quan trọng.
- Nêu kết luận chính nếu chỉ trả lời câu hỏi.
- Nêu hạn chế/blocker nếu có.

Không paste toàn bộ log dài. Không đưa token/password bí mật vào audit nếu có; với HW05 có thể ghi email test/password seed khi chính bài yêu cầu minh bạch test data.

## Trước khi final

Trước final, append entry cho lượt hiện tại vào `reports/ai-audit-report.md`. Nếu vừa tạo/cập nhật chính skill này, entry cũng phải nói rõ skill audit logger đã được tạo/cập nhật và validator đã chạy hay chưa.
