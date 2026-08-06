# FR-08 Phase D — Multi-project run evidence

- Thời điểm hiển thị: `06/08/2026 10:23`
- Runtime timestamp trong HTML report: `2026-08-06T03:23:07.283Z`
- Run by: `23127464`
- SUT: API `http://localhost:3000`, Frontend Web `http://localhost:5173`, Frontend Admin `http://localhost:5174`
- Phạm vi: hộp đen; không đọc source triển khai SUT.
- Người dùng xác nhận localhost là môi trường test cô lập, không phải production, và chấp nhận side effect user/order trước lần chạy đa project.

## Kiểm tra môi trường và browser

- Ba endpoint SUT đều trả HTTP `200` trước khi chạy.
- Microsoft Edge được tìm thấy tại `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`.
- Launch probe sau khi chuẩn bị môi trường:
  - Chromium `151.0.7922.34` → launch thành công.
  - Firefox `153.0` → launch thành công.
  - Microsoft Edge `151.0.4129.59`, channel `msedge` → launch thành công.
- Chromium bundled ban đầu thiếu executable `chromium_headless_shell-1234`; phân loại `environment issue`. Đã chạy `npx playwright install chromium` thành công rồi launch lại đạt.
- Collection sau cấu hình: `45` lượt, tương ứng `15 case × 3 project`, không có skip ngoài ý muốn.

## Cấu hình và test-harness refinement

1. Tạo `playwright.config.ts` với ba project `chromium`, `firefox`, `msedge`; Edge dùng `channel: 'msedge'`.
2. Mở rộng lint/type-check để bao phủ `playwright.config.ts`; trước đó phạm vi chỉ gồm `tests/**/*.ts`.
3. Lần report đầu có custom `metadata` trong config nhưng HTML UI không render hai trường tùy chỉnh ở trạng thái mở thông thường. Đã thêm tiêu đề HTML runtime: `FR-08 Checkout | Run by: 23127464 | Runtime timestamp: <ISO>` và chạy lại toàn suite.
4. Giữ `trace: retain-on-failure`, `screenshot: only-on-failure`, `video: retain-on-failure`. Vì FR-08 là API-only và không tạo `page`, lần chạy có trace API nhưng không có screenshot/video trình duyệt.
5. Không sửa fixture, spec, assertion hoặc expected để làm SUT pass; `DT-012` vẫn API-only.

## Lệnh và exit code

| Lệnh | Exit code | Kết quả thật |
| --- | ---: | --- |
| `npx playwright --version` | `0` | Playwright Test `1.62.1` |
| `npx playwright install --dry-run` | `0` | Xác định browser revision cần dùng |
| `npx playwright install chromium` | `0` | Cài Chromium và headless shell revision `1234` |
| Launch probe Chromium/Firefox/Edge sau cài đặt | `0` | Cả ba launch thành công |
| `npx playwright test tests/FR-08-checkout.spec.ts --list` | `0` | 45 lượt, 15 mỗi project |
| `npm run lint` | `0` | Pass, bao gồm `playwright.config.ts` |
| `npm run typecheck` | `0` | Pass, bao gồm `playwright.config.ts` |
| `npm run test:fr08 -- --workers=1` — lần đầu | `1` | 12 passed, 33 failed, 0 skipped; metadata tùy chỉnh chưa hiển thị trong UI report |
| `npm run test:fr08 -- --workers=1` — lần cuối sau sửa reporter | `1` | 12 passed, 33 failed, 0 skipped |
| Mở `index.html` bằng Chromium và đọc nội dung render | `0` | Thấy Run by, timestamp ISO và tổng kết runtime |

## Kết quả theo project

Ba project chạy chung trong lệnh cuối có exit code tổng `1`; mỗi project chứa failure nên trạng thái project đều failed.

| Project | Passed | Failed | Skipped | Exit code của run | Nhóm case pass |
| --- | ---: | ---: | ---: | ---: | --- |
| `chromium` | 4 | 11 | 0 | `1` | `DT-002`, `DT-003`, `DT-012`, `DT-013` |
| `firefox` | 4 | 11 | 0 | `1` | `DT-002`, `DT-003`, `DT-012`, `DT-013` |
| `msedge` | 4 | 11 | 0 | `1` | `DT-002`, `DT-003`, `DT-012`, `DT-013` |
| **Tổng** | **12** | **33** | **0** | **`1`** | 45 lượt |

Mỗi project lặp lại đúng 11 failure nghiệp vụ đã thấy ở Phase C: `BVA-001`, `DT-001`, `DT-004`–`DT-011`, `DT-014`. Phase D chưa phân loại chính thức thành bug và chưa tạo bug report.

## HTML report và bằng chứng kiểm chứng

- Report: `reports/FR-08-checkout/playwright-report/index.html`.
- Đường dẫn tuyệt đối: `E:\Testing\CS423-CSC15003-Testing-N08\reports\FR-08-checkout\playwright-report\index.html`.
- Document title sau khi mở thật: `FR-08 Checkout | Run by: 23127464 | Runtime timestamp: 2026-08-06T03:23:07.283Z`.
- Nội dung render đầu report: `All 45`, `Passed 12`, `Failed 33`, `Skipped 0` và cùng tiêu đề trên.
- Kiểm chứng: `run_by_visible=true`, `runtime_label_visible=true`, timestamp ISO tìm thấy `2026-08-06T03:23:07.283Z`.
- Artifact report: 63 file, tổng `2,595,324` byte.
- Failure artifact: 33 `trace.zip` và 33 `error-context.md` trong `test-results/fr08-phase-d/`.

## Side effect và điểm chưa chắc chắn

- Hai lượt suite 45 test (lượt phát hiện reporter defect và lượt cuối sau sửa) tạo tổng cộng thêm 78 user runtime role `user` và 78 order test. SUT không có API cleanup công khai phù hợp.
- Spec FR-08 là API-only: mỗi project thực thi độc lập bằng Playwright request context. Browser binaries đã được launch probe riêng, nhưng assertion nghiệp vụ không thao tác DOM và vì vậy không chứng minh khác biệt rendering giữa ba browser.
- Failure khớp hoàn toàn Phase A/C; expected được giữ nguyên. Việc phân loại root cause và tạo bug report thuộc Phase E sau khi checkpoint D được duyệt.

## Checkpoint D

- Phase D đã chạy đủ ba project thật và report cuối đã được mở kiểm chứng.
- Đề xuất: có thể chuyển Phase E sau khi người dùng duyệt checkpoint D.
- Chưa thực hiện Phase E trong lượt này.
