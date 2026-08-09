# FR-12 Phase C — Automation Run Evidence

> Đây là bằng chứng checkpoint C lịch sử. Cấu hình cuối tại Phase D đã nâng spec thành hybrid Web Admin UI + API và chạy lại đầy đủ trên ba trình duyệt.

## Môi trường và lệnh đã chạy

| STT | Working directory | Lệnh | Exit code | Kết quả thật |
| ---: | --- | --- | ---: | --- |
| 1 | `src/eshop-sut/backend` | `node database.js` | 0 | `Database initialized and seeded (Phase 2)`; reset hook sau đó được probe và xác nhận xóa order, seed lại account. |
| 2 | `src/eshop-sut/backend` | `node server.js` (background) | N/A — tiến trình dài hạn | `GET http://localhost:3000/api/products` trả 200. |
| 3 | `src/eshop-sut/frontend-web` | `npm run dev` (background) | N/A — tiến trình dài hạn | `http://localhost:5173` trả 200. |
| 4 | `src/eshop-sut/frontend-admin` | `npm run dev` (background) | N/A — tiến trình dài hạn | `http://localhost:5174` trả 200. |
| 5 | Workspace | `npm run lint` | 0 | ESLint pass sau khi refactor thành pure API test. |
| 6 | Workspace | `npm run typecheck` | 0 | `tsc --noEmit` pass sau khi refactor thành pure API test. |
| 7 | Workspace | `npm run test:fr12 -- --workers=1` | 1 | **Lịch sử trước refactor:** Chromium: 40 executed, 23 passed, 17 failed, 0 skipped; 46.6 giây. Pure API spec chưa được chạy lại. |

Tại cấu hình cuối, hai tài khoản kiểm thử mặc định được khai báo trực tiếp trong fixture JSON.

## Fixture validation

Lệnh kiểm tra JSON runtime trả:

```json
{"cases":40,"ids":40,"productNoAuth":6,"adminNoRole":7,"categoryNoRole":3,"invalidTokenStatus":1,"rootCauseTagged":17,"passedWithoutRootCause":23,"skips":0}
```

- 40 record theo `PlaywrightCase`.
- 40 ID duy nhất, liên tục `TC-FR12-DT-001`–`040`.
- 6 tag `root-cause:product-no-auth-middleware`: `DT-023/024/026/027/029/030`.
- 7 tag `root-cause:admin-api-no-role-check`: `DT-003/006/009/012/015/018/021`.
- 3 tag `root-cause:category-no-role-check`: `DT-033/036/039`.
- 1 tag `root-cause:wrong-status-invalid-token`: `DT-002`.
- Đúng 17 case failed có một root-cause tag; 23 case passed không có root-cause tag.
- 0 `skipReason`.

## Kết quả lịch sử trước refactor

> Kết quả 23 pass / 17 fail dưới đây thuộc phiên bản browser harness cũ. Sau refactor, chỉ lint và type-check được chạy theo yêu cầu; kết quả này không phải bằng chứng thực thi của pure API spec hiện tại.

### Passed — 23

`DT-001`, `DT-004`, `DT-005`, `DT-007`, `DT-008`, `DT-010`, `DT-011`, `DT-013`, `DT-014`, `DT-016`, `DT-017`, `DT-019`, `DT-020`, `DT-022`, `DT-025`, `DT-028`, `DT-031`, `DT-032`, `DT-034`, `DT-035`, `DT-037`, `DT-038`, `DT-040`.

### Failed — 17

| Nhóm quan sát | TC-ID | Expected | Actual |
| --- | --- | --- | --- |
| Wrong status for invalid token (`BUG-FR12-004`) | `DT-002` | 401 + `Unauthorized` | 403 + `Forbidden` |
| Admin API không check role | `DT-003`, `DT-006`, `DT-009`, `DT-012`, `DT-015`, `DT-018`, `DT-021` | 403 + `Forbidden` | 200 + tài nguyên bị đọc/mutate |
| Product API không có auth middleware | `DT-023`, `DT-024`, `DT-026`, `DT-027`, `DT-029`, `DT-030` | 401/403 theo partition | 200 + product bị tạo/sửa/xóa |
| Category API không check role (`BUG-FR12-003`) | `DT-033`, `DT-036`, `DT-039` | 403 + `Forbidden` | 200 + category bị tạo/sửa/xóa |

Kết quả khớp Phase A. Expected không bị sửa để làm test pass.

## Assertion tại checkpoint C

| Nhóm | Cách thực thi | Bằng chứng |
| --- | --- | --- |
| State / status | `response.status()` đối chiếu `expected.status` | Direct API response, không qua browser. |
| Network / response | `request.fetch()`, `response.status()`, `response.json()` và `bodySubset` | Kiểm tra trực tiếp status, method contract, URL và response body. |
| Count / aggregate | Array: `Array.isArray` và `length >= 0`; object: `toHaveProperty` và `toMatchObject` | Phủ positive array/object mà không dùng DOM text. |

Checkpoint C từng dùng API-only. Phase D hiện đã bổ sung `Page`, locator và UI access checks trên Web Admin thật; fixture vẫn không dùng DOM text giả.

## Reset, cleanup và side effects

- Trước mỗi `DT-011`, `DT-012`, `DT-013`, spec chạy `node database.js`, xác nhận orders rỗng, checkout tạo order ID 1 `pending`, rồi mới chạy request chính.
- Cleanup best-effort đã loại user/product/category/coupon runtime. Kiểm tra cuối: chỉ còn user seed ID 1–2; không còn product/category tên `FR12 Runtime*`.
- Sau case cuối liên quan order, còn order ID 1 trạng thái `confirmed`; case tiếp theo trong lần chạy mới sẽ reset lại.
- Ba dịch vụ vẫn trả 200 tại `07/08/2026 14:49`.
- Artifact thực tại `test-results/fr12-phase-c/`: 17 screenshot, 17 video, 17 error-context; scan text tìm thấy 0 password/JWT/token body.

## Test-harness defects phát hiện và sửa

| Vấn đề | Lần chạy | Sửa | Kết quả sau sửa |
| --- | --- | --- | --- |
| `test.describe.configure({ mode: 'serial' })` làm fail-fast sau DT-002 | Exit 1: 1 pass, 1 fail, 38 did not run | Bỏ serial mode; vẫn chạy `--workers=1` | Tất cả 40 case được thực thi. |
| Output dùng thư mục FR-08 từ config chung | Phát hiện ở artifact lần đầu | Thêm `--output=test-results/fr12-phase-c` vào script FR-12 | Artifact cuối tách riêng đúng feature. |
| DOM mismatch chờ mặc định 5 giây làm command timeout | Exit 124 sau 120.2 giây: 35 case đã chạy (20 pass/15 fail), 5 chưa tới lượt | Giảm timeout riêng của `toContainText` xuống 500 ms; không đổi expected/assertion | Rerun đủ 40 trong 46.6 giây. |
| Browser harness giả cho feature pure API | Browser `fetch` + DOM làm sai ngữ cảnh và tăng độ phức tạp | Xóa harness/locator/Page; chuyển sang `APIRequestContext` và assertion trực tiếp | Lint 0, type-check 0; chưa chạy test theo yêu cầu checkpoint. |
| Ba browser project có thể reset chung database đồng thời | `fullyParallel: false` không ngăn các project chạy trên worker khác nhau | Thêm `workers: 1` ở cấp `defineConfig` | Chromium/Firefox/msedge sẽ được lập lịch tuần tự, bảo vệ precondition order ID 1 của DT-011/012/013. |

## Điểm chưa chắc chắn

- Taxonomy fixture đã đồng bộ với bốn root cause và đã được xác nhận lại bằng hybrid full run ở Phase D.
- Reset `node database.js` là stateful; `workers: 1` đã được khóa ở cấp config trước Phase D để ba project không reset database đồng thời. `fullyParallel: false` vẫn được giữ nhưng không phải cơ chế cô lập chính.
- Kết quả checkpoint C được giữ để truy vết; artifact nộp cuối phải dùng full run hybrid ở Phase D.

