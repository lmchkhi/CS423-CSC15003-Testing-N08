# Tóm tắt yêu cầu HW06

Dùng file này như assignment checklist. Nội dung đã tự chứa từ đề HW06 và seminar notes.

## Bài tập chính

- Exercise: HW06 API Testing cho EShop.
- Work form: cá nhân.
- Tools: mặc định Postman + Newman; Karate hoặc RestAssured là alternatives hợp lệ.
- AI policy: được dùng AI, nhưng mọi interaction phải được ghi trong AI Audit Report.
- Testing style: blackbox. Không đọc implementation source code để suy ra expected behavior.

## Chọn API bắt buộc

Chọn đúng ba API:

- Một API từ Pool A: authentication, categories, products.
- Một API từ Pool B: cart, checkout, coupons, order state, user order history.
- Một API từ Pool C: admin dashboard/users/orders/products/categories/coupons/import.

Tránh chọn trùng bộ API với teammate.

## Pipeline bắt buộc cho mỗi API

1. Generate with AI:
   - Cung cấp API spec và FR/SEC rules liên quan.
   - Hướng dẫn AI từng bước, không dùng một prompt chung kiểu "generate all tests".
   - Target tối thiểu 35 cases/API.
   - Cover domain partitions, state transitions, security, và schema validation.
2. Audit:
   - Label mọi AI-generated case là `VALID`, `INVALID`, hoặc `INCOMPLETE`.
   - Giải thích label.
   - Sửa invalid hoặc incomplete cases.
3. Extend:
   - Thêm ít nhất 5 human-authored cases/API.
   - Giải thích vì sao AI bỏ sót từng case.
4. Execute:
   - Chạy bằng Postman + Newman hoặc equivalent.
   - Mọi request phải có `X-Student-Id: {StudentID}`.
   - Tạo Newman/HTML report.
5. Report bugs:
   - Ghi genuine bugs trong Markdown report.
   - Tạo GitHub Issues kèm screenshots.

## Yêu cầu toàn test suite

- Dùng càng nhiều Postman features càng hợp lý: collections, variables, environments, data-driven runs, pre-request scripts, test scripts, Newman, monitors, mock servers, workspaces.
- Dùng ít nhất sáu Postman features nếu có thể và liệt kê trong report.
- Tích hợp API test suite vào CI/CD, ví dụ GitHub Actions.
- Cung cấp hai sample CI commits/runs: một passing và một intentionally failing.
- Khôi phục final branch về trạng thái passing sau intentional failure.
- Tạo Git commit cho từng bước lớn như generation, audit, extension, execution, CI, và report packaging.

## Yêu cầu AI-Driven Test Generator

- Cung cấp design cho AI-driven API test generator cho EShop.
- Generator nhận API specification và tự động tạo tests.
- Có diagram và pseudocode.
- Diagram phải do sinh viên tự vẽ hoặc tự author; không nộp AI-generated image làm evidence.
- Khuyến khích reusable Agent Skill và demo video.

## Các phần AI report bắt buộc

- AI Audit Report:
  - AI tool name.
  - Date and time.
  - Prompt.
  - AI output.
- AI Critique:
  - 200-300 words.
  - Phân tích AI sai, biased, hoặc incomplete ở đâu.
  - Giải thích vì sao AI fail.
  - Nêu bài học về collaborating with AI.

## Anti-Cheat Evidence

Các evidence sau phải là thật và truy vết được:

- `X-Student-Id` header hiển thị trong console/pre-request evidence.
- Newman run output với host thật (`localhost` hoặc `127.0.0.1` được chấp nhận).
- GitHub Actions pass/fail runs.
- GitHub Issues screenshots.
- AI test-generator diagram do sinh viên author.

## Submission Package

Tên file zip:

```text
<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip
```

Nội dung bắt buộc:

- Main report: Markdown và PDF.
- Public GitHub repository link.
- Postman collection JSON, environment JSON, data files, và Newman HTML report.
- Postman feature list.
- CI/CD report có workflow configuration, pass run, fail run, screenshots, và links.
- Excel test cases hoặc spreadsheet/table export tương đương.
- Test summary counts: APIs, generated cases, added cases, executed cases, passed/failed cases, bugs.
- AI test-generator diagram và pseudocode.
- Bug report Markdown đặt trong `reports/bug-reports`, theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`, kèm GitHub Issue screenshots.
- AI Audit Report và AI Critique.
- Git commit log.
- README có self-assessment table.

## Assessment Template

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | --- | --- |
| 1 | API 1 full pipeline | 30 | |
| 2 | API 2 full pipeline | 30 | |
| 3 | API 3 full pipeline | 30 | |
| 4 | Agent Skills / AI-driven generator | 10 | |
| | Total | 100 | |
