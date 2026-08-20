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

## Entry #1

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 12:51 GMT+7 |
| **Artifact type** | Agent skill cập nhật |

**Full prompt:**

```text
Dịch các skill sang tiếng Việt, giữ các thuật ngữ thường dùng; thêm template bug report .github/ISSUE_TEMPLATE/bug-report-template.md vào skill phù hợp; rà soát và chỉnh gh-create-bug-issues, hw06-ai-audit-log cho đúng HW06.
```

### (2) AI Output

```text
Đã Việt hoá nội dung chính của các skill HW06 và references Markdown, giữ nguyên thuật ngữ kỹ thuật/field names/commands cần dùng. Đã cập nhật gh-create-bug-issues để bám bug-report-template.md, yêu cầu evidence thật và label Module/Priority/Severity phù hợp HW06 API testing. Đã cập nhật hw06-ai-audit-log để log đủ tool, timestamp, prompt và AI output cho các lượt HW06. Đã Việt hoá agents/openai.yaml, kiểm tra YAML bằng Ruby, py_compile scripts OK, chạy thử scaffold Postman bằng absolute path OK. quick_validate.py chưa chạy được vì môi trường Python thiếu module yaml.
```

## Entry #2

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 15:24 GMT+7 |
| **Artifact type** | Agent skill cập nhật |

**Full prompt:**

```text
Nhớ là khi có bug thì tạo bug report theo template .github/ISSUE_TEMPLATE/bug-report-template.md và đặt ở reports/bug-reports. Vấn đề này có ghi trong skill chưa?
```

### (2) AI Output

```text
Đã kiểm tra skill và xác nhận trước đó chỉ ghi phải dùng template bug-report-template.md, chưa ghi rõ thư mục reports/bug-reports. Đã cập nhật gh-create-bug-issues, hw06-api-testing/SKILL.md, hw06-requirements.md và report-templates.md để bắt buộc tạo bug report Markdown trong reports/bug-reports theo template .github/ISSUE_TEMPLATE/bug-report-template.md. Đã kiểm tra rg thấy reports/bug-reports xuất hiện đúng các chỗ cần thiết và YAML frontmatter parse OK bằng Ruby.
```

## Entry #3

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 16:38 GMT+7 |
| **Artifact type** | HW06 execution plan |

**Full prompt:**

```text
Các skill hiện tại đã đủ để thực hiện HW06 này chưa, nếu rồi thì tạo một file md để lên plan các phase cần thực hiện để hoàn thành HW06, mỗi phase ứng với 1 commit. Commit ban đầu gợi ý là setup skill và file plan này. Tôi được phân cho FR-03, FR-09, FR-17 để chọn API phù hợp nhất với yêu cầu domain partitions, state transitions, security, schema validation.
```

### (2) AI Output

```text
Đã rà soát bộ skill hiện tại và kết luận đủ cho HW06 end-to-end: điều phối, test generation, Postman/Newman/CI, bug issue, AI audit. Đã chọn API chính: POST /api/reset-password cho FR-03, POST /api/apply-coupon cho FR-09, POST /api/admin/coupons cho FR-17; các API phụ dùng setup/verify/cleanup. Đã tạo reports/hw06-execution-plan.md với phase plan tương ứng từng commit, coverage checklist từng API, và rule bug report trong reports/bug-reports theo template .github/ISSUE_TEMPLATE/bug-report-template.md. Đã kiểm tra nội dung plan bằng rg và YAML skills parse OK bằng Ruby.
```

## Entry #4

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 16:45 GMT+7 |
| **Artifact type** | HW06 execution plan cập nhật |

**Full prompt:**

```text
Đối với plan reports/hw06-execution-plan.md, tôi cần hướng dẫn chi tiết hơn ở mỗi commit/phase.
```

### (2) AI Output

```text
Đã mở rộng reports/hw06-execution-plan.md bằng section Detailed phase guide cho Phase 00 đến Phase 16. Mỗi phase có mục tiêu, việc cần làm, files/artifacts, kiểm tra trước commit và những việc không làm trong phase đó. Đã giữ API selection FR-03 POST /api/reset-password, FR-09 POST /api/apply-coupon, FR-17 POST /api/admin/coupons; giữ rule bug report trong reports/bug-reports theo template repo. Đã kiểm tra headings Phase 00-16 và sửa numbering Bug handling thành section 6.
```
