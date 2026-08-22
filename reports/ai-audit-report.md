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

## Entry #5

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 17:52 GMT+7 |
| **Artifact type** | Phase 01 report skeleton |

**Full prompt:**

```text
Tôi commit phase 0 rồi, bây giờ thực hiện phase 1 giúp tôi, không tự ý commit.
```

### (2) AI Output

```text
Đã thực hiện Phase 01 theo reports/hw06-execution-plan.md và không commit. Đã tạo/cập nhật reports/main-report.md với skeleton đầy đủ: thông tin bài làm, API selection, 3 API sections FR-03/FR-09/FR-17, Postman features, CI/CD report, bug reports, AI generator design, AI critique, AI Audit Report, test summary, self-assessment, submission checklist. Đã tạo reports/hw06-test-cases.md làm test case master table. Đã tạo các folder artifact được Git track bằng .gitkeep: reports/bug-reports, reports/newman, postman, postman/data. Đã kiểm tra bằng rg/find/git status; chưa tạo evidence giả, chưa tạo GitHub Issue, chưa chạy Newman.
```

## Entry #6

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 18:16 GMT+7 |
| **Artifact type** | Phase 01 artifact layout và test case template cập nhật |

**Full prompt:**

```text
Tại sao folder postman nằm ở root repo còn newman nằm trong reports; có nên thêm folder test case để chứa các file md cho từng test case cho dễ đọc không. Có file mẫu test-cases/TC-FR03-DT-001.md, nếu cần thì tham khảo cấu trúc và điều chỉnh cho API testing HW06, cập nhật skill và các file hiện tại về template/cách đặt tên.
```

### (2) AI Output

```text
Đã giải thích và ghi vào plan/report/skill rằng postman/ là input artifacts để chạy test, còn reports/newman/ là output evidence/report. Đã thêm cấu trúc test-cases/hw06-api với template TEMPLATE-HW06-API-TEST-CASE.md và folder con cho fr03-reset-password, fr09-apply-coupon, fr17-admin-coupons. Đã cập nhật reports/hw06-test-cases.md thành master index có naming convention TC-FR<id>-API-<DOM|SEC|WF|SCH>-<NNN>.md. Đã cập nhật reports/main-report.md, reports/hw06-execution-plan.md, skills hw06-api-testing, eshop-api-test-generator và postman-newman-api-runner để dùng per-test-case Markdown files và trace từ Postman data row về TC ID. Đã kiểm tra bằng rg/find và YAML skills parse OK bằng Ruby.
```

## Entry #7

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 20/08/2026 18:44 GMT+7 |
| **Artifact type** | Phase 02 raw AI test generation - FR-03 reset-password |

**Full prompt:**

```text
tôi đã xem qua, xác nhận và commit phase 1 rồi, bây giờ thực hiện phase 2 giúp tôi
```

### (2) AI Output

```text
Đã tạo reports/ai-generated/fr03-reset-password-raw-test-cases.md gồm 46 raw cases cho FR-03: 22 Domain, 8 Security, 8 Workflow, 8 Schema. Không dùng file prompt riêng vì prompt framework đã được mô tả trong skills/ và reports/hw06-execution-plan.md; Entry #7 này giữ trace prompt/output cần thiết cho AI audit. Đã cập nhật reports/main-report.md và reports/hw06-test-cases.md để trỏ artifact Phase 02 và ghi rõ Phase 03 mới audit/convert thành per-test-case Markdown files. Chưa chạy Newman, chưa tạo bug report, chưa tạo GitHub Issue, chưa commit.
```

## Entry #8

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 21/08/2026 01:25 GMT+7 |
| **Artifact type** | Phase 04 FR-03 Postman/Newman execution and bug reports |

**Full prompt:**

```text
tôi đã chạy backend lên ở [http://localhost:3000](http://localhost:3000) rồi. bây giờ thực hiện phase 4 giúp tôi. nếu trong sandbox có lỗi gì về quyền thì yêu cầu quyền từ tôi để chạy. nhớ xong thì ghi ai audit nữa. không tự ý commit, khi xong tôi sẽ xem lại và kiểm tra rồi chỉnh sửa nếu cần thiết, xong sau đó nếu được thì tôi sẽ yêu cầu tạo github issue. nhớ dùng các skill cần thiết trong folder skills
```

### (2) AI Output

```text
Đã dùng các skill trong folder skills để thực hiện Phase 04 cho FR-03 theo hướng blackbox, không dùng source code. Đã tạo Postman collection/environment/case data cho 50 test cases reset-password, bổ sung static header X-Student-Id cho 50/50 request item và pre-request script upsert/log header runtime. Đã chạy Newman trên backend http://localhost:3000, xuất reports/newman/hw06-fr03-reset-password.html, .json và -cli.txt. Kết quả: 50 executed, 36 passed, 14 failed; Newman requests 136 executed/0 failed; assertions 218 executed/20 failed. Đã triage failures thành 3 bug thật và tạo bug report Markdown theo template trong reports/bug-reports: BUG-FR03-API-001, BUG-FR03-API-002, BUG-FR03-API-003. Đã cập nhật reports/hw06-test-cases.md, 50 file test case FR-03 và reports/main-report.md với execution result/evidence. Chưa tạo GitHub Issue và không commit.
```

## Entry #9

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 16:57 GMT+7 |
| **Artifact type** | Phase 05 raw AI test generation - FR-09 apply-coupon |

**Full prompt:**

```text
tôi đã review và commit rồi, bây giờ dựa vào plan và thực hiện phase 5 giúp tôi
```

### (2) AI Output

```text
Đã thực hiện Phase 05 theo reports/hw06-execution-plan.md, không commit và không dùng source code. Đã dùng các skill hw06-api-testing, eshop-api-test-generator và hw06-ai-audit-log; đọc blackbox context từ README.md, api_specification.md và skill references. Đã tạo reports/ai-generated/fr09-apply-coupon-raw-test-cases.md gồm 46 raw cases cho FR-09 POST /api/apply-coupon: 20 Domain, 10 Security, 8 Workflow/State, 8 Schema. Bộ raw cases cover C1-C5, sample coupons SAVE10/BIGBUY/VIP100/EXPIRED, percent/fixed formula, JWT auth, IDOR user_id mismatch, SQLi/XSS, response schema discount_amount/final_amount và các assumptions cần Phase 06 audit. Đã cập nhật reports/main-report.md và reports/hw06-test-cases.md để trỏ raw artifact, summary counts và trạng thái Phase 05. Chưa audit, chưa tạo per-test-case Markdown final files, chưa tạo Postman/Newman artifacts, chưa tạo bug report/GitHub Issue.
```
