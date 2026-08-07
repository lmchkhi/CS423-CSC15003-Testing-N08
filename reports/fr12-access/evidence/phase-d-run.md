# FR-12 Phase D — Multi-browser Run Evidence

## Cấu hình và môi trường

- Config: `playwright.fr12.config.ts`.
- Projects: `chromium`, `firefox`, `msedge` (`channel: msedge`).
- Isolation: `workers: 1`; 120 lượt chạy tuần tự để DT-011/012/013 không reset database đồng thời.
- Output: `test-results/fr12-phase-d/`.
- HTML report: `reports/fr12-access/playwright-report/index.html`.
- Credentials được cấp qua `ESHOP_USER_EMAIL`, `ESHOP_USER_PASSWORD`, `ESHOP_ADMIN_EMAIL`, `ESHOP_ADMIN_PASSWORD`; giá trị không ghi vào fixture, log evidence hoặc report.
- SUT probe trước run: `GET http://localhost:3000/api/products` trả 200; frontend-web `:5173` và frontend-admin `:5174` trả 200.

## Lệnh và exit code

| Working directory | Lệnh | Exit code | Kết quả thật |
| --- | --- | ---: | --- |
| Workspace | `npx playwright --version` | 0 | Playwright `1.62.1`. |
| Workspace | `npx playwright install --list` | 0 | Chromium và Firefox được Playwright quản lý. |
| Workspace | Launch headless `chromium`, `firefox`, `chromium` với `channel: msedge` | 0 | Cả ba trả `launch-ok`. |
| Workspace | `npm run lint` | 0 | ESLint sạch sau khi mở rộng pattern cho `playwright.fr12.config.ts`. |
| Workspace | `npm run typecheck` | 0 | `tsc --noEmit` pass. |
| Workspace | `npm run test:fr12:phase-d` (lần đầu) | 1 | 120 executed; 69 passed, 51 failed, 0 flaky, 0 skipped; phát hiện trace API chứa dữ liệu xác thực nên artifact này bị thay thế. |
| Workspace | `npm run test:fr12:phase-d` (lần cuối, `trace: off`) | 1 | 120 executed; 69 passed, 51 failed, 0 flaky, 0 skipped; 58.1 giây. |
| Workspace | Mở report bằng `npx playwright show-report reports/fr12-access/playwright-report --host 127.0.0.1 --port 9324` và kiểm tra DOM bằng Chromium | 0 | Metadata và tổng kết hiển thị thật được xác nhận. |

## Kết quả theo project

| Project | Passed | Failed | Skipped | Tổng |
| --- | ---: | ---: | ---: | ---: |
| Chromium | 23 | 17 | 0 | 40 |
| Firefox | 23 | 17 | 0 | 40 |
| Microsoft Edge | 23 | 17 | 0 | 40 |
| **Tổng** | **69** | **51** | **0** | **120** |

Mỗi project tái hiện cùng 17 failure đã biết:

- `root-cause:product-no-auth-middleware`: 6 case/project.
- `root-cause:admin-api-no-role-check`: 7 case/project.
- `root-cause:category-no-role-check`: 3 case/project.
- `root-cause:wrong-status-invalid-token`: 1 case/project.

Không phát sinh failure khác taxonomy đã duyệt. DT-011 và DT-013 pass trên cả ba project; DT-012 tái hiện failure SUT trên cả ba. Việc chạy một worker đã ngăn browser reset hoặc mutate order ID 1 đồng thời.

## Kiểm chứng HTML report và artifact

- Report được mở thật qua HTTP; DOM hiển thị `All 120`, `Passed 69`, `Failed 51`, `Flaky 0`, `Skipped 0`.
- DOM/title hiển thị `Run by: 23127464`.
- DOM/title hiển thị timestamp runtime ISO 8601: `2026-08-07T08:59:03.516Z`.
- Embedded `report.json` xác nhận ba project và số liệu 23/17/0 cho mỗi project.
- Artifact cuối: 51 `error-context.md`, 0 trace, 0 screenshot, 0 video.
- Lần chạy đầu tạo 51 trace; scan phát hiện trace API ghi login payload, Authorization và JWT. Config được sửa thành `trace: off` và suite được chạy lại, thay thế hoàn toàn output/report cũ.
- Scan report cuối: 0 JWT shape và 0 serialized password value. Email SUT có thể xuất hiện trong response failure của danh sách users; không có token/password value.
- Không có screenshot/video vì pure API spec chỉ dùng `APIRequestContext`, không tạo browser page. Error context được giữ cho mọi failure.

## Điểm chưa chắc chắn

- Exit code 1 là do 51 lượt failure nghiệp vụ đã biết (17 case × 3 project), không phải browser launch hoặc race reset mới.
- Trace bị tắt có chủ đích để không lưu credential/API token; đây là biện pháp bảo vệ artifact cho pure API suite, không làm thay đổi assertion hoặc expected.
- Phân loại cuối và bug-report/gap analysis thuộc Phase E; Phase D chỉ ghi kết quả đa trình duyệt thật.
