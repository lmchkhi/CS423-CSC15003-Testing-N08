# Format Audit Entry

## Header report

Nếu `reports/ai-audit-report.md` trống hoặc chưa có header, tạo:

```markdown
# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh          |
| **MSSV:**               | 23127475                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW06                    |
| **Công cụ AI đã dùng:** | Codex                   |
```

## Entry report

Dùng đúng cấu trúc:

````markdown
## Entry #N

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | DD/MM/YYYY HH:mm GMT+7 |
| **Artifact type** | Hỏi đáp / Agent skill cập nhật |

**Full prompt:**

```text
<prompt nguyên văn hoặc nội dung user yêu cầu>
```

### (2) AI Output

```text
<tóm tắt câu trả lời và thao tác AI đã thực hiện>
```
````

## Artifact type gợi ý

- `Hỏi đáp về quy trình HW06`
- `Agent skill cập nhật`
- `Agent skill tạo mới + AI audit report entry`
- `API test case generation/audit`
- `Postman/Newman artifact`
- `CI/CD evidence`
- `Bug report template / GitHub issue workflow`
- `AI audit report cập nhật`

## Quy tắc HW06

- Mỗi entry phải đủ tool, timestamp, full prompt, và AI output summary.
- Không bịa evidence hoặc URL.
- Không paste log dài; chỉ ghi kết quả quan trọng và artifact paths.
