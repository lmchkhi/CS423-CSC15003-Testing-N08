# Phase D — FR-05 multi-browser và HTML report

Thời điểm hoàn tất: `08/08/2026 22:40`.

## Phạm vi

- Giữ nguyên `data/fr05-search.json`, `tests/fr05-search.spec.ts`, 12 TC-ID và expected đã duyệt.
- Cấu hình riêng: `playwright.fr05.config.ts`.
- Ba project: Chromium, Firefox và Microsoft Edge (`channel: msedge`).
- HTML report: `playwrite-test/fr05-search/playwright-report/index.html`.
- Runtime output: `test-results/fr05-phase-d/`.
- Phase D chỉ ghi kết quả đa trình duyệt/report; chưa phân loại business failure hoặc lập bug Phase E.

## Cấu hình và preflight

- `npx playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts --list` exit 0, liệt kê đúng 36 lượt = 12 case × 3 project.
- Microsoft Edge được tìm thấy tại `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Playwright runtime khai báo Chromium 151.0.7922.34 và Firefox 153.0 tại cache cục bộ.
- `npm run lint` exit 0; `npm run typecheck` exit 0.

## Lệnh chạy chính và kết quả thật

Command:

```text
npm run test:fr05:phase-d
```

Script thực thi:

```text
playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts
```

Exit code: `1`. Runner time: `4.0m`. Tổng: `8 passed`, `28 failed`, `0 skipped`.

| Project | Passed | Failed | Skipped | Diễn giải Phase D |
| --- | ---: | ---: | ---: | --- |
| Chromium | 4 | 8 | 0 | Khớp baseline Phase C: pass DT-001/002/005/008; fail DT-003/004/006/007/009/010/011/012. |
| Firefox | 0 | 12 | 0 | Cả 12 thất bại trước test body do runtime `browserContext.newPage` TypeError; không phải 12 kết quả nghiệp vụ. |
| Microsoft Edge | 4 | 8 | 0 | Cùng mẫu Chromium: pass DT-001/002/005/008; fail tám ID còn lại. |
| **Tổng runner** | **8** | **28** | **0** | 16 business-result runs trên Chromium/Edge + 12 Firefox environment failures. |

FR-05 tạo đủ 3 lượt feature–browser trong Phase D. Không suy diễn trạng thái các feature khác từ lượt chạy này.

## Firefox environment issue

Targeted diagnostic:

```text
npx playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts --project=firefox --grep=TC-FR05-DT-001 --reporter=list --output=test-results/fr05-firefox-diagnostic --workers=1
```

Exit `1`, 1 failed trong 5.4 giây với lỗi:

```text
TypeError: browserContext.newPage: Cannot read properties of undefined (reading '_page')
```

Probe trực tiếp `firefox.launch()` rồi `browser.newPage()` cũng exit `1` trong 2.9 giây với cùng TypeError. Browser process khởi chạy nhưng không tạo được page; lỗi xảy ra trước fixture navigation/test body. Vì vậy Phase D ghi đây là environment/runtime issue và không đổi/skip expected để làm xanh suite.

## Kiểm chứng HTML report trực tiếp

Artifact được mở bằng Chromium headless từ chính `index.html`, không chỉ đọc config. Nội dung render thực tế:

- Tiêu đề report lịch sử, với thời gian quy đổi: `FR-05 Search | Run by: 23127464 | 08/08/2026 22:33`.
- `Run by: 23127464`: tìm thấy.
- Thời gian hiển thị quy đổi: `08/08/2026 22:33`; ISO gốc được giữ trong HTML report lịch sử.
- Summary render: `All 36`, `Passed 8`, `Failed 28`, `Flaky 0`, `Skipped 0`, total time `4.0m`.

Report có 129 file, tổng 11,614,342 byte; `index.html` 623,899 byte.

## Artifact runtime

| Project | Result dirs | Custom UI PNG | Failure PNG | Video | Trace | Error context |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Chromium | 12 | 28 | 8 | 8 | 8 | 8 |
| Firefox | 12 | 0 | 0 | 12 | 12 | 12 |
| Microsoft Edge | 12 | 28 | 8 | 8 | 8 | 8 |
| **Tổng** | **36** | **56** | **16** | **28** | **28** | **28** |

Custom PNG gồm file screenshot nguồn và bản copy attachment. Firefox không vào test body nên không tạo custom UI evidence/failure screenshot; runner vẫn giữ video, trace và error context cho 12 environment failures.

## Quét an toàn

- Quét 53 file text trong runtime output + HTML report theo credential/password/authorization/bearer/API key/secret/token/session patterns: 0 match.
- Quét tên file theo cùng nhóm pattern: 0 match.
- Không có credential trong fixture/spec; payload XSS/SQLi là test data đã duyệt, không phải secret.

## Checkpoint D

- Trạng thái: **Chờ người dùng review**.
- Chromium/Edge có kết quả nghiệp vụ nhất quán; Firefox có environment/runtime issue được tái hiện độc lập.
- HTML report metadata đã được mở và kiểm chứng trực tiếp.
- Chưa chuyển Phase E; chưa phân loại business failures thành test/environment/SUT defect và chưa tạo bug report.

## Remediation — HTML report hợp nhất mới

Phần kết quả 8 passed / 28 failed phía trên là lịch sử của lần Phase D đầu tiên và đã được supersede sau khi sửa Firefox/DT-001. Không chỉnh tay số liệu HTML; Playwright đã tái tạo report bằng full matrix thật ngoài sandbox.

| Project | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| Chromium | 4 | 8 | 0 |
| Firefox | 4 | 8 | 0 |
| Microsoft Edge | 4 | 8 | 0 |
| **Tổng runner** | **12** | **24** | **0** |

- Command: `npm run test:fr05:phase-d`.
- Exit code: `1` vì 24 business assertions vẫn failed.
- Thời lượng: `3.4m`.
- Thời gian report hiện hành sau rerun định dạng: `09/08/2026 15:28`.
- Report: `playwrite-test/fr05-search/playwright-report/index.html`.
- Title render hiện hành: `FR-05 — Xem danh sách và tìm kiếm sản phẩm | Run by: 23127464 | Run time: 09/08/2026 15:28 | ISO timestamp: <runtime ISO>`.
- Summary render được mở kiểm chứng: `All 36`, `Passed 12`, `Failed 24`, `Flaky 0`, `Skipped 0`, `3.4m`.
- Nhãn suite `Phase C` đã được bỏ để report Phase D hiển thị tên feature trung lập.
- Artifact runtime: 36 result dirs, 84 custom UI PNG, 24 failure PNG, 24 video, 24 trace, 24 error context.
- Quét 25 text artifact: 0 sensitive credential pattern match.
- Quét lexical `index.html` có các identifier `password` thuộc thư viện ZIP/form control được nhúng trong Playwright reporter; kiểm tra context không thấy credential value của người dùng hoặc SUT.

Chi tiết Firefox/remediation: `playwrite-test/fr05-search/evidence/phase-d-firefox-rerun.md`.
