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

## Entry #10

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 17:44 GMT+7 |
| **Artifact type** | Phase 07 FR-09 Postman/Newman execution and bug reports |

**Full prompt:**

```text
tôi đã chạy backend ở [http://localhost:3000](http://localhost:3000) sẵn rồi, bây giờ dựa vào plan và các skill để thực hiện phase 7 giúp tôi. nếu trong sandbox có lỗi gì về quyền thì yêu cầu quyền từ tôi để chạy. nhớ xong thì ghi ai audit nữa. không tự ý commit, khi xong tôi sẽ xem lại và kiểm tra rồi chỉnh sửa nếu cần thiết, xong sau đó nếu được thì tôi sẽ yêu cầu tạo github issue.
```

### (2) AI Output

```text
Đã dùng các skill HW06 API testing, Postman/Newman runner, bug report và AI audit để thực hiện Phase 07 cho FR-09 POST /api/apply-coupon theo blackbox. Đã tạo/cập nhật Postman collection, data file và environment; chạy Newman thật trên http://localhost:3000 với X-Student-Id=23127475; lưu HTML/JSON/CLI reports trong reports/newman. Kết quả: 51 test cases executed, 27 passed, 24 failed; 165 requests, 0 request failure; 241 assertions, 35 failed. Đã phân loại failures và tạo 8 Markdown bug reports BUG-FR09-API-001 đến BUG-FR09-API-008 trong reports/bug-reports, tất cả ghi GitHub Issue là Pending student approval. Đã cập nhật reports/hw06-test-cases.md, reports/main-report.md và 51 per-test-case Markdown files với execution result/evidence. Không tạo GitHub Issue và không commit.
```

## Entry #11

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 18:06 GMT+7 |
| **Artifact type** | FR-09 bug reports to GitHub Issues |

**Full prompt:**

```text
tôi đã xem qua rồi, bây giờ tạo gh issue giúp tôi đi
```

### (2) AI Output

```text
Đã dùng skill gh-create-bug-issues để tạo GitHub Issues từ 8 Markdown bug reports FR-09 trong reports/bug-reports. Đã kiểm tra gh auth status, xác định repo lmchkhi/CS423-CSC15003-Testing-N08, đọc label list --limit 100 và dùng các label hiện có: Type: Bug, Status: New, Module:COUPON, Priority P1/P2, Severity Major/Critical. Đã tạo issues #271 đến #278: BUG-FR09-API-001 -> #271, BUG-FR09-API-002 -> #272, BUG-FR09-API-003 -> #273, BUG-FR09-API-004 -> #274, BUG-FR09-API-005 -> #275, BUG-FR09-API-006 -> #276, BUG-FR09-API-007 -> #277, BUG-FR09-API-008 -> #278. Đã verify issues đang OPEN và có đủ label bắt buộc, cập nhật URL thật vào từng bug report và reports/main-report.md. Không commit.
```

## Entry #12

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 18:34 GMT+7 |
| **Artifact type** | Phase 08 raw AI test generation - FR-17 admin coupons |

**Full prompt:**

```text
tôi đã review và commit rồi, bây giờ thực hiện phase 8 theo plan giúp tôi
```

### (2) AI Output

```text
Đã thực hiện Phase 08 theo reports/hw06-execution-plan.md, không commit và không dùng source code. Đã dùng blackbox context từ README.md, api_specification.md và các skill/references trong folder skills để generate raw cases cho FR-17 POST /api/admin/coupons. Đã tạo reports/ai-generated/fr17-admin-coupons-raw-test-cases.md gồm 54 raw cases: 30 Domain, 10 Security, 7 Workflow/State, 7 Schema. Bộ raw cases cover required fields code/type/discount_value/min_order_amount/expired_at/max_uses_per_user, code uniqueness, percent/fixed type, admin RBAC SEC-02/SEC-03, SQLi/XSS, create -> list verify -> duplicate rejected -> cleanup delete, schema/error/content-type/response-time assertions. Đã cập nhật reports/main-report.md và reports/hw06-test-cases.md để trỏ raw artifact, summary counts và trạng thái Phase 08. Chưa audit, chưa tạo final per-test-case Markdown files, chưa tạo Postman/Newman artifacts, chưa tạo bug report/GitHub Issue.
```

## Entry #13

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 19:21 GMT+7 |
| **Artifact type** | Phase 10 FR-17 Postman/Newman execution and bug reports |

**Full prompt:**

```text
tôi đã review, hoàn thành và commit phase 9 rồi, giờ giúp tôi thực hiện phase 10 theo plan dựa vào các skill. tôi cũng đã chạy backend ở http://localhost:3000 rồi, nếu trong quá trình chạy có lỗi gì ở sandbox do không có quyền thì cứ yêu cầu quyền từ tôi. nhớ xong thì ghi ai audit nữa. không tự ý commit, khi xong tôi sẽ xem lại và kiểm tra rồi chỉnh sửa nếu cần thiết, xong sau đó nếu được thì tôi sẽ yêu cầu tạo github issue.
```

### (2) AI Output

```text
Đã dùng các skill HW06 API testing, Postman/Newman runner, EShop API test generator và AI audit log để thực hiện Phase 10 cho FR-17 POST /api/admin/coupons theo blackbox. Đã tạo postman/hw06-fr17-admin-coupons.postman_collection.json, postman/data/hw06-fr17-admin-coupons.data.json và cập nhật postman/hw06-local.postman_environment.json. Đã chạy Newman thật trên backend http://localhost:3000; lần đầu trong sandbox bị EPERM tới localhost nên đã chạy lại bằng quyền được user approve. Evidence được lưu tại reports/newman/hw06-fr17-admin-coupons.html, reports/newman/hw06-fr17-admin-coupons.json và reports/newman/hw06-fr17-admin-coupons-cli.txt; CLI có X-Student-Id=23127475. Kết quả final: 56 final FR-17 cases executed, 18 passed, 38 failed, 6 SUT bug groups. Đã sửa một test-oracle issue cho TC-FR17-API-SEC-005 để assert no 5xx/no SQL leak thay vì ép reject code charset không có trong spec. Đã tạo 6 Markdown bug reports BUG-FR17-API-001 đến BUG-FR17-API-006 trong reports/bug-reports, chưa tạo GitHub Issue. Đã cập nhật reports/hw06-test-cases.md, reports/main-report.md và 56 per-test-case Markdown files với execution result, evidence và related bug report. Không commit.
```

## Entry #14

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 19:36 GMT+7 |
| **Artifact type** | FR-17 bug reports to GitHub Issues |

**Full prompt:**

```text
tôi đã xem qua rồi, bây giờ tạo github issue giúp tôi
```

### (2) AI Output

```text
Đã dùng skill gh-create-bug-issues để tạo GitHub Issues từ 6 Markdown bug reports FR-17 trong reports/bug-reports. Đã kiểm tra gh auth status, xác định repo lmchkhi/CS423-CSC15003-Testing-N08, đọc gh label list --limit 100 và dùng các label hiện có: Type: Bug, Status: New, Module: Admin Coupon, Priority P0/P1/P2, Severity Critical/Major/Minor. Đã tạo issues: BUG-FR17-API-001 -> #282, BUG-FR17-API-002 -> #280, BUG-FR17-API-003 -> #283, BUG-FR17-API-004 -> #279, BUG-FR17-API-005 -> #281, BUG-FR17-API-006 -> #284. Đã verify issues đang OPEN và có đủ label bắt buộc. Đã cập nhật URL thật vào từng file reports/bug-reports/BUG-FR17-API-001.md đến BUG-FR17-API-006.md và cập nhật bảng bug FR17 trong reports/main-report.md, đồng thời chỉnh một câu trạng thái FR09 cũ để nhất quán. Không commit.
```

## Entry #15

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 19:40 GMT+7 |
| **Artifact type** | Main report bug report table update |

**Full prompt:**

```text
chưa thêm các bug report của fr17 vào phần 8. Bug reports của main report hả, thêm giúp tôi
```

### (2) AI Output

```text
Đã cập nhật reports/main-report.md section 8 Bug reports để thêm 6 dòng BUG-FR17-API-001 đến BUG-FR17-API-006. Mỗi dòng có endpoint POST /api/admin/coupons, requirement liên quan, severity/priority, GitHub Issue #279-#284 và evidence reports/bug-reports + Newman HTML FR17. Đã kiểm tra lại section 8 hiển thị đủ các dòng FR17. Không commit.
```

## Entry #16

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 19:56 GMT+7 |
| **Artifact type** | Phase 11 GitHub Actions Newman passing workflow |

**Full prompt:**

```text
tôi đã review và commit phase 10 rồi, bây giờ thực hiện phase 11 giúp tôi, lưu ý Workflow chỉ áp dụng cho đúng 1 branch hw06/23127475 hiện tại vì trong repo này còn những branch của những người khác cũng làm hw06 tương tự. khi push nhớ thêm -u vì tôi chưa publish branch. nếu không tự lấy GitHub Actions pass URL được thì thôi để tôi tự lấy.
```

### (2) AI Output

```text
Đã dùng skills hw06-api-testing, postman-newman-api-runner và hw06-ai-audit-log để thực hiện Phase 11. Đã tạo .github/workflows/newman-api-test.yml với trigger push chỉ cho branch hw06/23127475 và job-level guard github.ref == refs/heads/hw06/23127475. Đã tạo postman/hw06-ci-smoke.postman_collection.json để chạy Newman smoke pass, vì full FR03/FR09/FR17 bug-finding suites intentionally fail do bug thật. Workflow checkout repo, setup Node 20, npm ci trong backend, install newman/newman-reporter-htmlextra/wait-on, start backend bằng node server.js, wait /api/products, chạy Newman smoke và upload artifact hw06-newman-smoke-reports. Đã chạy local smoke Newman ngoài sandbox do sandbox EPERM localhost; kết quả 4 requests, 12 assertions, 0 failures, có X-Student-Id=23127475 trong CLI. Đã cập nhật reports/main-report.md section 7 với workflow path, branch scope, exact Newman command và local evidence. Chuẩn bị commit/push -u branch hw06/23127475; GitHub Actions pass URL sẽ lấy bằng gh nếu có thể.
```

## Entry #17

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 20:11 GMT+7 |
| **Artifact type** | Phase 12 intentional failing Newman CI run |

**Full prompt:**

```text
bây giờ tiếp tục với phase 12, nhớ cập nhật lại url pass đã lấy từ phase 11 nữa
```

### (2) AI Output

```text
Đã dùng skills hw06-api-testing, postman-newman-api-runner và hw06-ai-audit-log để thực hiện Phase 12. Đã cập nhật reports/main-report.md section 7 với pass URL thật của Phase 11: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32574378458. Đã tạo intentional fail bằng cách đổi đúng một assertion trong postman/hw06-ci-smoke.postman_collection.json: request CI-SMOKE-001 kỳ vọng HTTP 999 thay vì 200. Đã chạy Newman local ngoài sandbox do sandbox EPERM localhost; kết quả local fail đúng mục tiêu: 4 requests, 0 request failures, 12 assertions, 1 assertion failure, có X-Student-Id=23127475 trong CLI. Evidence local lưu tại reports/newman/hw06-ci-smoke-intentional-fail.html, reports/newman/hw06-ci-smoke-intentional-fail.json và reports/newman/hw06-ci-smoke-intentional-fail-cli.txt. Đã commit/push Phase 12 (`c8dfd58`) và GitHub Actions failing run thật đã completed với conclusion failure: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32575114869.
```

## Entry #18

### (1) Prompt + Tool

| Field             | Content |
| ----------------- | ------- |
| **Tool**          | Codex |
| **Timestamp**     | 22/08/2026 20:23 GMT+7 |
| **Artifact type** | Phase 13 restored Newman CI passing run |

**Full prompt:**

```text
oke tiếp tục với phase 13 giúp tôi, tôi cũng đã chụp screenshot cho ci pass và fail ở reports/screenshots rồi, có thể dùng để trình bày trong các report
```

### (2) AI Output

```text
Đã dùng skills hw06-api-testing, postman-newman-api-runner và hw06-ai-audit-log để thực hiện Phase 13. Đã kiểm tra screenshots user cung cấp trong reports/screenshots/ci-pass.png và reports/screenshots/ci-fail.png, xác nhận chúng tương ứng với Phase 11 pass run và Phase 12 intentional fail run, rồi cập nhật reports/main-report.md section 7 để trỏ tới hai screenshot này. Đã restore postman/hw06-ci-smoke.postman_collection.json bằng cách đổi assertion CI-SMOKE-001 từ HTTP 999 về HTTP 200. Đã chạy Newman local ngoài sandbox do sandbox EPERM localhost; kết quả restored pass: 4 requests, 0 request failures, 12 assertions, 0 failures, có X-Student-Id=23127475 trong CLI. Evidence local lưu tại reports/newman/hw06-ci-smoke-restored-pass.html, reports/newman/hw06-ci-smoke-restored-pass.json và reports/newman/hw06-ci-smoke-restored-pass-cli.txt. Chuẩn bị commit/push Phase 13 để GitHub Actions tạo restored passing run thật; URL restored run sẽ lấy bằng gh sau khi push.
```
