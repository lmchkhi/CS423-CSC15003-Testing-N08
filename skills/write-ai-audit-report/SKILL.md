---
name: write-ai-audit-report
description: Ghi AI Audit Report cho bài tập Testing bằng cách append mỗi lượt chat/tác vụ AI vào reports/ai-audit-report.md theo format gồm Prompt + Tool và AI Output. Dùng khi người dùng yêu cầu ghi log mọi tin nhắn, khi làm HW04 automation testing, khi tạo/sửa skill, script, report, bug report, test case, Playwright config, hoặc trước final của mọi lượt có đóng góp AI cần khai báo.
---

# Write AI Audit Report

## Mục tiêu

Ghi lại tương tác AI theo format nộp bài: thông tin sinh viên ở đầu file, sau đó là các entry đánh số tăng dần. Skill này hỗ trợ tự động hóa thao tác append nhưng vẫn yêu cầu agent tự tóm tắt đúng prompt và output thật, không bịa transcript.

## File đích

- Ghi vào `reports/ai-audit-report.md`.
- Tham khảo format từ `reports/ai-audit-report-sample.md` nếu cần đối chiếu.
- Nếu file đích rỗng hoặc chưa có header, tạo header với thông tin mặc định:
  - Họ tên sinh viên: `Ngô Hồng Thanh`
  - MSSV: `23127475`
  - Lớp / Khoá: `CS423 / CSC13003`
  - Mã bài tập: `HW04`
  - Công cụ AI đã dùng: `Codex`

## Khi cần ghi

- Ghi sau mỗi lượt chat liên quan đến bài tập, kể cả hỏi đáp, phân tích, tạo/sửa file, chạy test/validate, tạo bug report, hoặc chỉnh skill.
- Ghi trước khi gửi final nếu lượt hiện tại tạo/sửa artifact hoặc đưa ra nội dung sẽ đưa vào bài nộp.
- Không ghi các thao tác nội bộ quá vụn nếu không có ý nghĩa audit; gom thành một entry cho cùng một lượt user.
- Nếu người dùng chỉ chào hỏi hoặc nội dung không liên quan bài tập, có thể bỏ qua.

## Cách ghi entry

1. Lấy prompt thật của user trong lượt hiện tại. Nếu prompt dài, vẫn giữ nguyên phần quan trọng và không tự thêm nội dung user không nói.
2. Tóm tắt output thật của AI bằng tiếng Việt có dấu:
   - Nêu file đã tạo/sửa.
   - Nêu lệnh đã chạy và kết quả quan trọng.
   - Nêu blocker nếu có.
   - Không claim test/report đã chạy nếu chưa chạy.
3. Chọn `Artifact type` ngắn, ví dụ:
   - `Agent skill tạo mới`
   - `Agent skill cập nhật`
   - `Playwright automation script`
   - `Playwright report/evidence`
   - `Hỏi đáp quy trình`
   - `AI audit report cập nhật`
4. Append entry bằng script:

```bash
python3 skills/write-ai-audit-report/scripts/append_ai_audit_entry.py \
  --report reports/ai-audit-report.md \
  --artifact-type "Agent skill cập nhật + AI audit logger" \
  --prompt-file /tmp/current-prompt.txt \
  --output-file /tmp/current-output.txt
```

Khi prompt/output ngắn, có thể truyền trực tiếp bằng `--prompt` và `--output`.

## Format entry

Mỗi entry phải có:

- Heading `## Entry #N`.
- Section `### (1) Prompt + Tool`.
- Bảng có `Tool`, `Timestamp`, `Artifact type`.
- Block `Full prompt` dạng fenced code `text`.
- Section `### (2) AI Output`.
- Block `AI Output` dạng fenced code `text`.

Timestamp dùng giờ Việt Nam, format `DD/MM/YYYY HH:MM GMT+7`.

## Quy tắc chất lượng

- Giữ thứ tự entry tăng dần; không sửa nội dung entry cũ trừ khi người dùng yêu cầu.
- Nếu cùng lượt có nhiều hoạt động, ghi một entry tổng hợp thay vì nhiều entry nhỏ.
- Nếu có thông tin nhạy cảm trong prompt/output, ghi chú đã lược bỏ bí mật thay vì chép nguyên secret.
- Nếu script append thất bại, sửa nguyên nhân rồi chạy lại; không kết thúc lượt khi người dùng đã yêu cầu ghi log.
