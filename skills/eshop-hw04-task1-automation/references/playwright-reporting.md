# Playwright HTML Report cho HW04

## Mục tiêu evidence

Report phải chứng minh được ai chạy, chạy feature nào, chạy browser nào, và chạy lúc nào. Đừng chỉ tạo một thư mục `playwright-report` chung vì dễ bị ghi đè và khó chứng minh đủ 9 browser runs.

## Biến môi trường khuyến nghị

- `STUDENT_ID`: mã số sinh viên thật (mặc định `23127475`); không để `{StudentID}` trong artifact cuối.
- `STUDENT_NAME`: họ tên sinh viên, mặc định `Ngô Hồng Thanh`.
- `COURSE_CLASS`: lớp/khoá, mặc định `CS423 / CSC13003`.
- `AI_TOOL`: công cụ AI khai báo trong audit, mặc định `Codex`.
- `HW04_FEATURE`: slug feature, ví dụ `fr03-forgot-password`.
- `HW04_BROWSER`: project Playwright đang chạy, ví dụ `chromium`.
- `HW04_REPORT_DIR`: thư mục HTML report riêng cho cell hiện tại.
- `HW04_RUN_AT`: ISO timestamp của lần chạy; nếu không truyền thì config tự tạo.

## Cấu hình reporter

Trong `playwright.config.ts`, cấu hình HTML reporter đọc từ env. Ví dụ có thể điều chỉnh theo style repo:

```ts
const studentId = process.env.STUDENT_ID;
const feature = process.env.HW04_FEATURE ?? 'all-features';
const browser = process.env.HW04_BROWSER ?? 'all-browsers';
const runAt = process.env.HW04_RUN_AT ?? new Date().toISOString();
const reportDir =
  process.env.HW04_REPORT_DIR ?? `reports/html/${feature}/${browser}`;

if (!studentId) {
  throw new Error('Missing STUDENT_ID for HW04 report label');
}

export default defineConfig({
  reporter: [
    ['html', {
      open: 'never',
      outputFolder: reportDir,
      title: `Run by: ${studentId} | ${feature} | ${browser} | ${runAt}`,
    }],
    ['list'],
  ],
});
```

Giữ đúng cụm `Run by:` vì đề yêu cầu có thể nhìn thấy cụm này trong report.

## Chạy 9 cell report

Chạy từng feature-browser riêng để mỗi cell có report độc lập. Mẫu command:

```bash
STUDENT_ID=23127475 \
STUDENT_NAME="Ngô Hồng Thanh" \
COURSE_CLASS="CS423 / CSC13003" \
AI_TOOL=Codex \
HW04_FEATURE=fr03-forgot-password \
HW04_BROWSER=chromium \
HW04_RUN_AT=2026-08-06T10:30:00.000Z \
HW04_REPORT_DIR=reports/html/fr03-forgot-password/chromium \
npx playwright test tests/automation/specs/fr03-forgot-password.spec.ts --project=chromium
```

Lặp cho:

- `fr03-forgot-password`: `chromium`, `firefox`, `webkit`.
- `fr11-order-history`: `chromium`, `firefox`, `webkit`.
- `fr14-category-management`: `chromium`, `firefox`, `webkit`.

Nếu viết runner, cho runner chạy tuần tự để tránh test state đụng nhau. Runner nên ghi manifest JSON/Markdown có: feature, browser, command, exit code, report path, label verified, timestamp.

## Kiểm chứng report

Sau mỗi run, kiểm tra:

- `reports/html/<feature>/<browser>/index.html` tồn tại.
- File HTML chứa `Run by: <STUDENT_ID>`.
- File HTML chứa feature slug hoặc tên feature.
- Report không bị ghi đè bởi cell khác.

Có thể dùng script của skill:

```bash
python3 skills/eshop-hw04-task1-automation/scripts/verify_report_labels.py \
  reports/html --student-id 23127475 --manifest reports/html/report-label-check.json
```

Nếu report dùng asset động hoặc Playwright nén dữ liệu, mở report bằng `npx playwright show-report <report-dir>` để xác nhận bằng mắt và ghi lại kết quả vào main report.

## Cách ghi trong main report

Tạo bảng ngắn:

| Feature | Browser | Logical cases | Executed | Passed | Failed | Report | Run label |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| FR-03 | Chromium | 12+ | 12+ | ... | ... | `reports/html/fr03-forgot-password/chromium` | Verified |

Nếu test fail do bug thật, vẫn giữ report đó làm evidence. Phân biệt rõ:

- Automation lỗi: selector sai, setup sai, data sai, assertion lệch SRS.
- Product defect: script đúng oracle nhưng SUT vi phạm SRS/API spec.
- Environment blocked: server không chạy, thiếu browser, dependency không cài được.
