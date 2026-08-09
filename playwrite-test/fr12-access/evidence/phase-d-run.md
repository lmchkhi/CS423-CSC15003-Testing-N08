# FR-12 Phase D — Multi-browser Run Evidence

## Cấu hình và môi trường

- Config: `playwright.fr12.config.ts`.
- Projects: `chromium`, `firefox`, `msedge` (`channel: msedge`).
- Isolation: `workers: 1`; 120 lượt chạy tuần tự để DT-011/012/013 không reset database đồng thời.
- Output: `test-results/fr12-phase-d/`.
- HTML report: `playwrite-test/fr12-access/playwright-report/index.html`.
- Hai tài khoản kiểm thử mặc định được khai báo trực tiếp trong fixture JSON; spec không chứa password literal để tránh lặp giá trị trong source snapshot của report.
- SUT probe trước run: `GET http://localhost:3000/api/products` trả 200; frontend-web `:5173` và frontend-admin `:5174` trả 200.

## Lệnh và exit code

| Working directory | Lệnh                                                                                                                                                | Exit code | Kết quả thật                                                                                                                             |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------: | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace         | `npx playwright --version`                                                                                                                          |         0 | Playwright `1.62.1`.                                                                                                                     |
| Workspace         | `npx playwright install --list`                                                                                                                     |         0 | Chromium và Firefox được Playwright quản lý.                                                                                             |
| Workspace         | Launch headless `chromium`, `firefox`, `chromium` với `channel: msedge`                                                                             |         0 | Cả ba trả `launch-ok`.                                                                                                                   |
| Workspace         | `npm run lint`                                                                                                                                      |         0 | ESLint sạch sau khi mở rộng pattern cho `playwright.fr12.config.ts`.                                                                     |
| Workspace         | `npm run typecheck`                                                                                                                                 |         0 | `tsc --noEmit` pass.                                                                                                                     |
| Workspace         | `npm run test:fr12:phase-d` (run chẩn đoán hybrid)                                                                                                  |         1 | Chromium/Edge đúng taxonomy nhưng Firefox không tạo được page do content sandbox; artifact chẩn đoán 46 passed/74 failed đã bị thay thế. |
| Workspace         | Probe Firefox với content sandbox được vô hiệu hóa                                                                                                  |         0 | Firefox 153.0 tạo page và mở Web Admin thành công.                                                                                       |
| Workspace         | `npm run test:fr12:phase-d` (lần cuối)                                                                                                              |         1 | 120 executed; 69 passed, 51 failed, 0 flaky, 0 skipped; 248.3 giây.                                                                      |
| Workspace         | Mở report bằng `npx playwright show-report playwrite-test/fr12-access/playwright-report --host 127.0.0.1 --port 9324` và kiểm tra DOM bằng Chromium |         0 | Metadata và tổng kết hiển thị thật được xác nhận.                                                                                        |

## Kết quả theo project

| Project        | Passed | Failed | Skipped |    Tổng |
| -------------- | -----: | -----: | ------: | ------: |
| Chromium       |     23 |     17 |       0 |      40 |
| Firefox        |     23 |     17 |       0 |      40 |
| Microsoft Edge |     23 |     17 |       0 |      40 |
| **Tổng**       | **69** | **51** |   **0** | **120** |

Mỗi project tái hiện cùng 17 failure đã biết:

- `root-cause:product-no-auth-middleware`: 6 case/project.
- `root-cause:admin-api-no-role-check`: 7 case/project.
- `root-cause:category-no-role-check`: 3 case/project.
- `root-cause:wrong-status-invalid-token`: 1 case/project.

Không phát sinh failure khác taxonomy đã duyệt. DT-011 và DT-013 pass trên cả ba project; DT-012 tái hiện failure SUT trên cả ba. Việc chạy một worker đã ngăn browser reset hoặc mutate order ID 1 đồng thời.

## Kiểm chứng HTML report và artifact

- Report được mở thật qua HTTP; DOM hiển thị `All 120`, `Passed 69`, `Failed 51`, `Flaky 0`, `Skipped 0`.
- DOM/title hiển thị `Run by: 23127464`.
- DOM/title hiện hành hiển thị thời gian `09/08/2026 16:40` và ISO runtime `2026-08-09T09:40:47.960Z`.
- Embedded `report.json` xác nhận ba project và số liệu 23/17/0 cho mỗi project.
- Artifact runtime cuối: 51 `error-context.md`, 51 screenshot, 0 trace, 0 video; HTML report deduplicate còn 6 file PNG duy nhất.
- Mỗi case tạo browser page thật, kiểm tra cổng truy cập Web Admin, sau đó dùng assertion API để kiểm chứng enforcement backend.
- Quét artifact hiện hành: 0 JWT, 0 chuỗi password admin; password user mặc định vẫn xuất hiện trong 15 `error-context.md` do accessibility snapshot giữ giá trị input tại thời điểm case thất bại.

## Điểm chưa chắc chắn

- Exit code 1 là do 51 lượt failure nghiệp vụ đã biết (17 case × 3 project), không phải browser launch, Firefox sandbox hoặc race reset mới.
- Firefox project vô hiệu hóa content sandbox trong launch configuration vì runtime mặc định launch được browser nhưng lỗi khi tạo page; smoke test và full run đã xác nhận workaround.
- Trace và video per-test được tắt nên report không lưu network trace/JWT. Tuy nhiên, `error-context.md` vẫn giữ giá trị password user ở 15 failure; cần xóa giá trị input trước assertion API cuối và chạy lại suite nếu muốn artifact không chứa password.
- Phân loại cuối và bug-report/gap analysis thuộc Phase E; Phase D chỉ ghi kết quả đa trình duyệt thật.
