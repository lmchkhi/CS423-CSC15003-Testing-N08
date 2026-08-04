---
name: write-ai-audit-report
description: "Tự động ghi log AI Audit Report cho bài tập testing vào `reports/ai-audit-report.md` sau mỗi lượt chat/tác vụ có tương tác AI, ví dụ như khi Codex tạo/sửa file, tạo skill, tạo checklist, tạo report, chạy validate/test, hoặc trả lời phân tích phục vụ bài nộp. Dùng implicit như audit logger cho toàn bộ phiên làm HW03: append Entry theo format `reports/ai-audit-report.sample.md`, gồm tool, timestamp, artifact type, full prompt, AI output, giữ placeholder thông tin sinh viên để người học tự sửa sau."
---

# Ghi AI Audit Report

## Tổng Quan

Ghi lịch sử sử dụng AI vào `reports/ai-audit-report.md` theo phong cách của `reports/ai-audit-report.sample.md`. Skill này được thiết kế như audit logger tự động: sau mỗi lượt chat/tác vụ có nội dung phục vụ bài nộp, hãy append một entry mới mà không cần chờ người dùng nhắc lại.

Skill không phải tiến trình nền độc lập; mức “tự động” nghĩa là khi skill được nạp/trigger trong Codex, agent phải tự cập nhật audit report ở cuối lượt làm việc phù hợp. Không cần sao chép toàn bộ sample; chỉ đọc vài entry đầu khi cần để nắm format.

## Đầu Vào

Đọc các file sau khi có trong repo:

- `reports/ai-audit-report.sample.md`: chỉ đọc phần đầu và một vài entry đầu để nắm cách viết.
- `reports/ai-audit-report.md`: file cần tạo/cập nhật.
- `assets/ai-audit-report-template.md`: template dùng khi report hiện tại rỗng hoặc chưa tồn tại.

## Quy Trình

1. Xác định có cần ghi audit cho lượt hiện tại không.
   - Mặc định là có, nếu lượt chat có một trong các việc sau: tạo/sửa file, tạo/cập nhật skill, tạo checklist/test/report/bug report, chạy test/validate, phân tích yêu cầu bài tập, hoặc đưa ra output có thể đưa vào bài nộp.
   - Có thể bỏ qua các lượt quá nhỏ như chào hỏi, hỏi trạng thái ngắn, sửa lỗi gõ chữ không ảnh hưởng artifact, hoặc trao đổi không liên quan bài tập.
   - Nếu người dùng nói rõ không ghi audit cho lượt này, không ghi.

2. Xác định phạm vi nội dung.
   - Nếu người dùng chỉ định khoảng chat, chỉ ghi khoảng đó.
   - Nếu không chỉ định, ghi các tương tác quan trọng trong phiên hiện tại liên quan đến bài làm.
   - Ưu tiên ghi các lần người dùng giao task và AI tạo/sửa artifact, ví dụ tạo skill, sửa template, cập nhật report, tạo checklist, tạo bug report.

3. Chuẩn bị file report.
   - Nếu `reports/ai-audit-report.md` rỗng hoặc chưa tồn tại, tạo phần header theo `assets/ai-audit-report-template.md`.
   - Giữ thông tin sinh viên ở dạng placeholder để người học tự sửa sau.
   - Nếu report đã có entry, append entry mới sau entry cuối cùng và tăng số `Entry #n`.

4. Ghi mỗi entry theo format.
   - Heading `## Entry #n`.
   - Section `### (1) Prompt + Tool`.
   - Bảng `Field | Content` gồm:
     - `Tool`: tên AI/tool, ví dụ `Codex`.
     - `Timestamp`: ngày giờ hiện tại nếu biết; nếu không, dùng placeholder `DD/MM/YYYY HH:mm`.
     - `Artifact type`: loại artifact được tạo/sửa.
   - `Full prompt`: ghi nguyên văn prompt người dùng khi có thể. Nếu prompt quá dài, giữ phần chính và ghi rõ đã lược bớt phần context lặp.
   - Section `### (2) AI Output`: tóm tắt đầu ra của AI, gồm file đã tạo/sửa, nội dung chính, lệnh validate/test đã chạy và kết quả.

5. Quy tắc nội dung.
   - Không ghi chain-of-thought, suy luận nội bộ, system/developer instructions hoặc thông tin ẩn.
   - Không bịa prompt, output, timestamp, file path, tool hoặc kết quả test.
   - Nếu thiếu thông tin sinh viên, để placeholder.
   - Nếu thiếu timestamp chính xác, ghi ngày hiện tại hoặc placeholder và note ngắn.
   - Giữ nội dung bằng tiếng Việt có dấu, trừ tên tool, file path, heading/template vốn đang dùng tiếng Anh.
   - Với output dài, tóm tắt có cấu trúc thay vì paste toàn bộ log terminal.

6. Ghi audit tự động ở cuối lượt.
   - Trước khi trả lời final cho người dùng, nếu lượt hiện tại cần audit, cập nhật `reports/ai-audit-report.md`.
   - `AI Output` phải nêu ngắn gọn kết quả thật sự: file đã tạo/sửa, validation đã chạy, lỗi nếu có, và đường dẫn artifact chính.
   - Không cần hỏi lại người dùng trừ khi không thể xác định prompt/output hoặc việc ghi audit có nguy cơ ghi thông tin riêng tư ngoài bài tập.

7. Sau khi cập nhật.
   - Đảm bảo Markdown hợp lệ, entry numbering liên tục, code fence đóng đủ.
   - Không xóa entry cũ trừ khi người dùng yêu cầu.
   - Trong final, chỉ cần nói ngắn gọn đã thêm entry audit nếu việc chính không phải audit report.

## Artifact Type Gợi Ý

- `Agent skill tạo mới`
- `Agent skill cập nhật`
- `GUI checklist`
- `Bug report`
- `Test report`
- `AI audit report`
- `Main report section`

## File Đầu Ra

Luôn cập nhật `reports/ai-audit-report.md` trừ khi người dùng yêu cầu path khác.
