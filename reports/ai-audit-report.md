# AI Audit Report (HW04)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh              |
| **MSSV:**               | 23127475              |
| **Lớp / Khoá:**         | CS423 / CSC13003              |
| **Mã bài tập :**        | HW04                    |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                  |
| **Timestamp**     | 06/08/2026 23:08 GMT+7             |
| **Artifact type** | Agent skill tạo mới + cập nhật env automation         |

**Full prompt:**

```text
[$skill-creator] tiếp theo là viết skill để ghi log mỗi khi chat vào file reports/ai-audit-report.md. tham khảo vài entry đầu của file mẫu reports/ai-audit-report-sample.md để nắm cấu trúc và cách viết. dựa vào thông tin sinh viên đó có thể bổ sung cho các biến env của skill eshop-hw04-task1-automation
```

### (2) AI Output

```text
AI đã đọc skill-creator và các entry đầu của reports/ai-audit-report-sample.md để lấy format audit và thông tin sinh viên. Đã tạo skill skills/write-ai-audit-report gồm SKILL.md, agents/openai.yaml với allow_implicit_invocation=true, và script scripts/append_ai_audit_entry.py để tự tạo header, tìm Entry # tiếp theo, dùng timestamp GMT+7, rồi append Prompt + Tool và AI Output vào reports/ai-audit-report.md. Đã cập nhật skill skills/eshop-hw04-task1-automation để nhắc dùng audit logger trước final và bổ sung env mặc định STUDENT_ID=23127475, STUDENT_NAME="Ngô Hồng Thanh", COURSE_CLASS="CS423 / CSC13003", AI_TOOL=Codex; đồng thời đổi ví dụ Playwright report verification sang student id 23127475. Đã test script append trên /tmp thành công và parse YAML bằng Ruby/Python stdlib thành công. quick_validate.py chưa chạy được vì môi trường Python thiếu module yaml (PyYAML), lỗi ModuleNotFoundError: No module named yaml.
```
