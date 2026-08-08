# Phase D — Firefox rerun và remediation

## Phạm vi

- Chạy riêng toàn bộ 12 test FR-05 trên Firefox.
- Review test harness/spec theo hướng hộp đen; không đọc source triển khai, middleware hoặc database schema của SUT.
- Giữ nguyên 12 TC-ID, fixture `data/fr05-search.json`, mapping UI/UI+network và toàn bộ expected đã duyệt.
- Đây là remediation của Phase D; chưa chuyển sang Phase E.

## Chẩn đoán môi trường Firefox

| Lệnh/kiểm tra | Exit code | Kết quả thật |
| --- | ---: | --- |
| `npx playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts --project=firefox --reporter=list --output=test-results/fr05-phase-d-firefox-rerun --workers=1` | 1 | 0 passed, 12 failed, 0 skipped; 43.1 giây. Tất cả fail trước test body với `browserContext.newPage: Cannot read properties of undefined (reading '_page')`. |
| `npm ls @playwright/test playwright playwright-core --all` | 0 | Ba package đồng nhất phiên bản `1.62.1`. |
| `npx playwright install firefox` | 124 | Timeout sau 180.2 giây trong sandbox; không có output tải xuống. |
| `npx playwright install --force firefox` (ngoài sandbox) | 0 | Cài lại Firefox 153.0 và browser dependencies thành công trong 29 giây. |
| Direct `firefox.launch()` + `browser.newPage()` trong sandbox sau cài lại | 1 | Vẫn lỗi `_page`; debug log ghi `Failed to launch tab subprocess @SB::LA::SpawnTarget (Error:0)`. |

Playwright/Firefox khởi động được browser process và tạo browser context, nhưng sandbox Windows chặn tab subprocess. Vì vậy kết quả 0/12 trong sandbox là lỗi môi trường trước test body, không phải 12 lỗi nghiệp vụ.

## Review spec và sửa tối thiểu

Spec không dùng CDP, Chromium-only API hoặc locator riêng cho Chromium. Các thao tác chính đều qua `Page`, role/DOM locator, route, response synchronization và screenshot tiêu chuẩn.

Lượt Firefox đầy đủ đầu tiên chạy ngoài sandbox:

| Command | Exit code | Kết quả |
| --- | ---: | --- |
| `npx playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts --project=firefox --reporter=list --output=test-results/fr05-phase-d-firefox-rerun-elevated --workers=1` | 1 | 3 passed, 9 failed, 0 skipped; 1.8 phút. |

DT-001 là failure riêng của test harness: Firefox nhận HTTP `304` từ cache revalidation, trong khi danh sách sản phẩm vẫn hiển thị đúng trên UI. Assertion cũ bắt buộc network status phải đúng `200`, trái với mapping đã duyệt là UI oracle chính và network chỉ hỗ trợ.

Sửa tại `tests/fr05-search.spec.ts`:

- Giữ assertion chính trên số product heading hiển thị trong UI.
- Không chấp nhận HTTP 500 bằng assertion `status < 500`.
- Chỉ parse/đối chiếu response body khi nhận fresh response có status đúng `200` trong fixture.
- Với `304`, ghi network diagnostic và không dùng cached/empty response body thay UI oracle.
- Không đổi fixture hoặc expected nghiệp vụ.

## Kiểm chứng sau sửa

| Command | Exit code | Passed | Failed | Skipped | Thời lượng |
| --- | ---: | ---: | ---: | ---: | ---: |
| `npm run lint` | 0 | — | — | — | — |
| `npm run typecheck` | 0 | — | — | — | — |
| `npx playwright test tests/fr05-search.spec.ts --config=playwright.fr05.config.ts --project=firefox --reporter=list --output=test-results/fr05-phase-d-firefox-rerun-final --workers=1` (ngoài sandbox) | 1 | 4 | 8 | 0 | 1.6 phút |
| Chromium DT-001 smoke sau sửa | 0 | 1 | 0 | 0 | 5.8 giây |
| Microsoft Edge DT-001 smoke sau sửa | 0 | 1 | 0 | 0 | 13.7 giây |

Firefox cuối:

- Passed: DT-001, DT-002, DT-005, DT-008.
- Failed: DT-003, DT-004, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012.
- Mẫu 4 passed / 8 failed / 0 skipped khớp Chromium, Edge và baseline Phase C; không có assertion nghiệp vụ nào được nới để làm xanh test.

## Artifact và an toàn

Output Firefox cuối: `test-results/fr05-phase-d-firefox-rerun-final/`.

- 12 result directories.
- 28 custom PNG vật lý tương ứng 14 evidence state.
- 8 failure screenshots, 8 videos, 8 traces và 8 error contexts.
- Quét 9 text artifacts theo credential/token/secret/session/cookie patterns: 0 match.
- `git diff --check`: exit 0; chỉ có cảnh báo line ending của Git, không có whitespace error.

HTML report hợp nhất tại `reports/fr05-search/playwright-report/index.html` đã được tái tạo sau remediation bằng một full-matrix runner ngoài sandbox: 12 passed / 24 failed / 0 skipped. Kết quả này thay thế report lịch sử 8 passed / 28 failed.

## Đề xuất phù hợp với Firefox

1. Chạy Firefox hoặc toàn bộ matrix trên terminal/CI runner không áp Windows sandbox đang chặn tab subprocess.
2. Thêm preflight nhỏ `firefox.launch()` + `browser.newPage()` trước business suite để báo một lỗi môi trường rõ ràng, tránh tạo 12 failure giả cùng nguyên nhân.
3. Với case UI có network bổ trợ, tiếp tục coi `304` là diagnostic/cache revalidation; không buộc exact `200` nếu UI oracle đúng, nhưng vẫn reject HTTP 500.
4. Không thêm Firefox-only locator hoặc tăng timeout ở thời điểm này: lượt chạy cuối cho thấy locator và synchronization hiện tại chạy được; 8 failure còn lại trùng failure nghiệp vụ trên Chromium/Edge.
5. Giữ full-matrix runner ngoài sandbox làm cách phát hành HTML report Phase D, để Firefox không bị biến thành environment failures trong artifact hợp nhất.

## HTML report hợp nhất sau remediation

Lệnh thật:

```text
npm run test:fr05:phase-d
```

Exit `1`, runner time `3.4m`, tổng `12 passed`, `24 failed`, `0 skipped`. Mỗi project Chromium, Firefox và Microsoft Edge đều có `4 passed / 8 failed / 0 skipped` với cùng tập TC-ID.

Nhãn suite `— Phase C` đã được bỏ khỏi title hiển thị; tên suite giữ trung lập theo feature. Report được mở trực tiếp bằng Chromium headless và xác nhận:

- Page title: `FR-05 — Xem danh sách và tìm kiếm sản phẩm | Run by: 23127464 | Runtime timestamp: 2026-08-08T16:07:38.995Z`.
- Summary: `All 36`, `Passed 12`, `Failed 24`, `Flaky 0`, `Skipped 0`, total time `3.4m`.
- Có project `chromium`, `firefox` và `msedge`.
- Không còn chuỗi `Phase C` trong nội dung render.

Runtime cuối có 36 result directories, 84 custom UI PNG, 24 failure PNG, 24 video, 24 trace và 24 error context. Quét 25 text artifact: 0 sensitive credential pattern match. Các lexical match `password` trong `index.html` thuộc mã thư viện ZIP/form control nhúng của reporter, không phải credential value của người dùng hoặc SUT.

## Checkpoint

Firefox remediation hoàn tất tại Checkpoint D. Chưa chuyển Phase E và chưa tạo bug report từ 8 business failures.
