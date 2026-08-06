---
name: eshop-hw04-task1-automation
description: Hướng dẫn tạo và bảo trì automation testing cho HW04 Task 1 của EShop bằng Playwright theo chiến lược AI-first. Dùng khi cần chuyển test case manual HW02 của FR-03, FR-11, FR-14 thành script data-driven, chạy ma trận ba trình duyệt, tạo và kiểm chứng Playwright HTML report riêng có "Run by: {StudentID}" cùng ISO timestamp, review/fix script AI sinh ra, ghi nhận bug và bằng chứng black-box.
---

# EShop HW04 Task 1 Automation

## Mục tiêu

Tạo automation script Playwright cho ba feature web đã chọn ở HW02: FR-03, FR-11, FR-14. Làm theo hướng black-box: dùng đề bài, SRS, API spec, test case manual, test run và bug report; không đọc mã nguồn trong `backend`, `frontend-web`, `frontend-admin`, hoặc bất kỳ thư mục `frontend*`.

## Nguồn được phép đọc

- Đọc `HW04-AutomationTesting.md` trước để giữ đúng tiêu chí chấm.
- Đọc `SystemRequirementsSpecification.md` và `api_specification.md` để lấy expected behavior.
- Đọc `tests/test-cases/FR-03-forgot-password`, `tests/test-cases/FR-11-order-history`, `tests/test-cases/FR-14-category-management`.
- Đọc `tests/test-runs/*FR-03*`, `tests/test-runs/*FR-11*`, `tests/test-runs/*FR-14*` và `bug-reports/BUG-FR03-*`, `BUG-FR11-*`, `BUG-FR14-*` khi cần đối chiếu bug đã biết.
- Bỏ qua toàn bộ FR mobile, đặc biệt `FR-23-forgot-password-mobile`.

## Workflow

0. Ghi AI audit:
   - Khi làm bất kỳ lượt nào liên quan HW04, dùng `skills/write-ai-audit-report/SKILL.md` để append tương tác vào `reports/ai-audit-report.md`.
   - Trước final, đảm bảo lượt hiện tại đã được ghi nếu có tạo/sửa artifact, chạy test/validate, hoặc đưa ra nội dung dùng trong bài nộp.

1. Lập inventory test case:
   - Chạy `scripts/extract_manual_cases.py` để trích danh sách test case manual cho từng FR.
   - Chọn ít nhất 12 test case cho mỗi FR, ưu tiên phối hợp positive, negative, edge/BVA.
   - Giữ traceability từ automation test tới manual test case ID.
   - Lập ledger trước khi code: feature, case IDs, data file, spec file, browser, report path, trạng thái chạy.

2. Chuẩn bị dữ liệu test:
   - Tạo file `.json` hoặc `.csv` riêng cho từng feature.
   - Không hardcode inline array/object test data trong `.spec.*`.
   - Tách thông tin môi trường vào biến env hoặc config: `WEB_BASE_URL`, `ADMIN_BASE_URL`, `API_BASE_URL`, `STUDENT_ID`.
   - Dùng mặc định từ hồ sơ sinh viên khi không có chỉ dẫn khác: `STUDENT_ID=23127475`, `STUDENT_NAME="Ngô Hồng Thanh"`, `COURSE_CLASS="CS423 / CSC13003"`, `AI_TOOL=Codex`.

3. Sinh và chỉnh Playwright script:
   - Dùng locator theo vai trò/label/text trước; chỉ dùng selector CSS khi UI không có semantic hook.
   - Kết hợp UI assertion và API assertion khi manual case yêu cầu đối chiếu backend.
   - Dùng ít nhất ba assertion pattern khác nhau trên toàn suite, ví dụ: visibility/text, URL/navigation, response/status/body, count/list length, CSS/class/color, form validation.
   - Với bug đã biết, viết assertion theo SRS, không viết theo hành vi sai đang tồn tại.

4. Chạy đa trình duyệt và tạo report:
   - Cấu hình Playwright projects tối thiểu `chromium`, `firefox`, `webkit`.
   - Mỗi feature phải chạy đủ ba browser.
   - Tạo report riêng cho từng cặp feature-browser, tổng cộng 9 report nếu đủ ba feature.
   - HTML report phải hiển thị rõ `Run by: {StudentID}` và ISO timestamp trong title/header/footer/metadata.
   - Chạy `scripts/verify_report_labels.py` sau khi sinh report để xác nhận text xuất hiện thật trong `index.html`.

5. Human review và bằng chứng:
   - Ghi lại prompt/AI output theo AI Audit Report.
   - Review script AI sinh ra: chỉ ra selector mong manh, assertion yếu, wait dễ flaky, thiếu edge case, dữ liệu chưa tách file, hoặc không đúng SRS.
   - Nếu assertion fail do defect thật, tạo bug report Markdown/GitHub Issue và kèm screenshot.
   - Cập nhật main report: số feature, số case automated/executed/pass/fail, số browser run, số bug, link report/video.

## Reference cần đọc theo tình huống

- Đọc `references/task1-checklist.md` trước khi lập kế hoạch hoặc kiểm tra deliverable.
- Đọc `references/playwright-patterns.md` trước khi viết hoặc review script.
- Đọc `references/playwright-reporting.md` trước khi cấu hình Playwright HTML reporter hoặc chạy ma trận report.
- Đọc `references/fr-03-forgot-password.md` khi làm FR-03.
- Đọc `references/fr-11-order-history.md` khi làm FR-11.
- Đọc `references/fr-14-category-management.md` khi làm FR-14.
- Đọc `references/reporting-and-review.md` khi viết phần human review, bug/evidence, hoặc AI audit.

## Quy ước output

- Viết báo cáo, ghi chú review và tài liệu phụ bằng tiếng Việt có dấu.
- Đặt tên test theo mẫu có test case ID, ví dụ `TC-FR03-DT-001 - lấy OTP thành công với email đã đăng ký`.
- Đặt dữ liệu automation theo feature, ví dụ `tests/automation/data/fr03-forgot-password.json`.
- Không sửa code SUT. Chỉ thêm/sửa automation test, test data, config/reporting hỗ trợ bài nộp.
