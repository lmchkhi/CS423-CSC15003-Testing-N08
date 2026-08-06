# Reporting, Human Review và Bug Evidence

## Human review

Ghi nhận theo từng feature:

- Dùng `skills/write-ai-audit-report/SKILL.md` để append các lượt chat/tác vụ vào `reports/ai-audit-report.md`.
- Prompt chính đã dùng để AI sinh script.
- Output hoặc tóm tắt output của AI.
- Lỗi AI mắc phải.
- Cách sửa thủ công.
- Vì sao lỗi xuất hiện: prompt thiếu ngữ cảnh, model suy đoán UI, thiếu oracle từ SRS, selector không ổn định, hoặc feature cần setup data phức tạp.

## Các lỗi AI thường gặp trong bài này

- Dùng expected result theo UI hiện tại thay vì theo SRS.
- Hardcode test data trong `.spec.ts`.
- Chỉ kiểm text mơ hồ, thiếu API/body/status assertion.
- Dùng `page.locator('div:nth-child(...)')` hoặc `waitForTimeout`.
- Không chạy đủ ba browser.
- Quên hiển thị `Run by: {StudentID}` và ISO timestamp trong HTML report.
- Dùng một report gộp cho toàn suite trong khi bài cần evidence nhìn được theo từng feature-browser run.
- Ghi `{StudentID}` nguyên văn thay vì mã số sinh viên thật.
- Dùng lại case FR-23 mobile dù Task 1 chỉ tính web.

## Bug report

Khi assertion fail và đối chiếu SRS/API xác nhận là defect thật:

- Tạo screenshot bằng Playwright.
- Tạo bug report Markdown theo style hiện có trong `bug-reports/`.
- Nếu có quyền GitHub CLI, tạo GitHub Issue và đính kèm/ghi link screenshot.
- Trong main report, liên kết test case ID, automation test name, browser, screenshot, HTML report và bug ID.

## Tóm tắt cuối Task 1

Bảng nên có các cột:

- Feature.
- Số manual case được chọn.
- Số case automated.
- Số case executed.
- Passed.
- Failed.
- Browser runs.
- Bug phát hiện.
- HTML report path/link.
- Report label verified: Yes/No.
- Ghi chú nếu report có failed test do defect thật, không gọi là automation incomplete nếu script và oracle đúng.
