# FR-12 Phase C — Automation Run Evidence

## Môi trường và lệnh đã chạy

| STT | Working directory | Lệnh | Exit code | Kết quả thật |
| ---: | --- | --- | ---: | --- |
| 1 | `src/eshop-sut/backend` | `node database.js` | 0 | `Database initialized and seeded (Phase 2)`; reset hook sau đó được probe và xác nhận xóa order, seed lại account. |
| 2 | `src/eshop-sut/backend` | `node server.js` (background) | N/A — tiến trình dài hạn | `GET http://localhost:3000/api/products` trả 200. |
| 3 | `src/eshop-sut/frontend-web` | `npm run dev` (background) | N/A — tiến trình dài hạn | `http://localhost:5173` trả 200. |
| 4 | `src/eshop-sut/frontend-admin` | `npm run dev` (background) | N/A — tiến trình dài hạn | `http://localhost:5174` trả 200. |
| 5 | Workspace | `npm run lint` | 0 | ESLint pass sau thay đổi cuối. |
| 6 | Workspace | `npm run typecheck` | 0 | `tsc --noEmit` pass sau thay đổi cuối. |
| 7 | Workspace | `npm run test:fr12 -- --workers=1` | 1 | Chromium: 40 executed, 23 passed, 17 failed, 0 skipped; 46.6 giây. |

Credential được truyền bằng bốn biến môi trường `ESHOP_USER_EMAIL`, `ESHOP_USER_PASSWORD`, `ESHOP_ADMIN_EMAIL`, `ESHOP_ADMIN_PASSWORD`; giá trị đã redacted và không ghi vào fixture/spec/evidence.

## Fixture validation

Lệnh kiểm tra JSON runtime trả:

```json
{"cases":40,"ids":40,"roleTags":13,"productTags":3,"skips":0}
```

- 40 record theo `PlaywrightCase`.
- 40 ID duy nhất, liên tục `TC-FR12-DT-001`–`040`.
- 13 tag `root-cause:valid-user-role-bypass`.
- 3 tag `root-cause:unauthenticated-product-mutation`.
- 0 `skipReason`.

## Kết quả cuối theo case

### Passed — 23

`DT-001`, `DT-004`, `DT-005`, `DT-007`, `DT-008`, `DT-010`, `DT-011`, `DT-013`, `DT-014`, `DT-016`, `DT-017`, `DT-019`, `DT-020`, `DT-022`, `DT-025`, `DT-028`, `DT-031`, `DT-032`, `DT-034`, `DT-035`, `DT-037`, `DT-038`, `DT-040`.

### Failed — 17

| Nhóm quan sát | TC-ID | Expected | Actual |
| --- | --- | --- | --- |
| Invalid token status/body | `DT-002` | 401 + `Unauthorized` | 403 + `Forbidden` |
| Valid user vượt role | `DT-003`, `DT-006`, `DT-009`, `DT-012`, `DT-015`, `DT-018`, `DT-021`, `DT-024`, `DT-027`, `DT-030`, `DT-033`, `DT-036`, `DT-039` | 403 + `Forbidden` | 200 + tài nguyên bị đọc/mutate |
| Product mutation không token | `DT-023`, `DT-026`, `DT-029` | 401 + `Unauthorized` | 200 + product bị tạo/sửa/xóa |

Kết quả khớp Phase A. Expected không bị sửa để làm test pass.

## Assertion và locator đã thực thi

| Nhóm | Cách thực thi | Bằng chứng |
| --- | --- | --- |
| State / attribute | `expect.soft(response.status()).toBe(testCase.expected.status)` | Cả pass và fail hiển thị status expected/actual trong output runner. |
| Network / response | `page.waitForResponse`, kiểm tra method, URL, body kind và `bodySubset` | Fail output ghi diff `Unauthorized`/`Forbidden` hoặc success body; request waiter bắt đầu trước click. |
| DOM / visible text | `getByTestId(...).toContainText(testCase.expected.domText)` | Fail output ghi visible response text thật từ `<pre aria-live>`; no-token pass thấy thông báo `Unauthorized`. |

Locator hành động dùng `getByRole('button', ...)`; vùng kết quả dùng `getByTestId(...)`. Không cần hạ xuống `getByLabel`, `getByText`, CSS hoặc XPath. Không dùng `waitForTimeout`.

## Reset, cleanup và side effects

- Trước mỗi `DT-011`, `DT-012`, `DT-013`, spec chạy `node database.js`, xác nhận orders rỗng, checkout tạo order ID 1 `pending`, rồi mới chạy request chính.
- Cleanup best-effort đã loại user/product/category/coupon runtime. Kiểm tra cuối: chỉ còn user seed ID 1–2; không còn product/category tên `FR12 Runtime*`.
- Sau case cuối liên quan order, còn order ID 1 trạng thái `confirmed`; case tiếp theo trong lần chạy mới sẽ reset lại.
- Ba dịch vụ vẫn trả 200 tại `2026-08-07T14:49:26.0018337+07:00`.
- Artifact thực tại `test-results/fr12-phase-c/`: 17 screenshot, 17 video, 17 error-context; scan text tìm thấy 0 password/JWT/token body.

## Test-harness defects phát hiện và sửa

| Vấn đề | Lần chạy | Sửa | Kết quả sau sửa |
| --- | --- | --- | --- |
| `test.describe.configure({ mode: 'serial' })` làm fail-fast sau DT-002 | Exit 1: 1 pass, 1 fail, 38 did not run | Bỏ serial mode; vẫn chạy `--workers=1` | Tất cả 40 case được thực thi. |
| Output dùng thư mục FR-08 từ config chung | Phát hiện ở artifact lần đầu | Thêm `--output=test-results/fr12-phase-c` vào script FR-12 | Artifact cuối tách riêng đúng feature. |
| DOM mismatch chờ mặc định 5 giây làm command timeout | Exit 124 sau 120.2 giây: 35 case đã chạy (20 pass/15 fail), 5 chưa tới lượt | Giảm timeout riêng của `toContainText` xuống 500 ms; không đổi expected/assertion | Rerun đủ 40 trong 46.6 giây. |

## Điểm chưa chắc chắn

- Phân loại chính thức 17 failure thành SUT defect và bug grouping chỉ thực hiện ở Phase E; Phase C mới xác nhận chúng tái hiện và khớp quan sát Phase A.
- Reset `node database.js` là stateful và làm suite không phù hợp chạy song song; Phase C dùng một worker. Chiến lược đa trình duyệt Phase D phải điều phối reset để tránh ba project tranh chấp database.
- Browser harness render response thật và kiểm tra DOM/network, nhưng không phải UI nghiệp vụ frontend-web/admin; coverage hiện chứng minh browser fetch/render của API response, không chứng minh layout hay navigation của EShop UI.

