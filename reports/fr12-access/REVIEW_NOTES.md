# Review Notes — `FR-12: Access Control`

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Feature | `FR-12` |
| Spec | `tests/fr12-access.spec.ts` — pure API, data-driven |
| Fixture | `data/fr12-access.json` — 40 case, bốn root-cause tags |
| Người review | Người dùng — checkpoint A–D đã duyệt; checkpoint E chờ duyệt cuối |
| Thời điểm report cuối | `2026-08-07T08:59:03.516Z` |
| Lệnh đã chạy | `npm run lint`; `npm run typecheck`; `npm run test:fr12:phase-d` |
| Exit code | Lint `0`; type-check `0`; multi-browser suite `1` do 51 SUT-failure instances đã biết |

> Đường dẫn người dùng nêu là `test/test-cases/...`; đường dẫn thực tế đã dùng là `tests/test-cases/FR-12-access/domain-testing/`, chứa đủ 40 file liên tục `001`–`040`.

## 1. Đối chiếu HW02 vs thực tế

| ID HW02 | Mô tả gốc | Điểm lệch quan sát được | Trạng thái | Điều chỉnh đã duyệt | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `TC-FR12-DT-001` | Danh sách users — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-002` | Danh sách users — invalid token | Expected 401; actual 403 | Lệch / Fail | Đã duyệt giữ expected 401; actual khác expected là Fail | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-003` | Danh sách users — token user | Expected 403; actual 200 và lộ danh sách users | Lệch | Giữ nguyên expected, chờ checkpoint | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-004` | Danh sách users — token admin | 200 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-005` | Xóa user — không token | 401 đúng expected trên user tạm | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-006` | Xóa user — token user | Expected 403; actual 200, user tạm bị xóa | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-007` | Xóa user — token admin | 200 đúng expected trên user tạm | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-008` | Danh sách orders — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-009` | Danh sách orders — token user | Expected 403; actual 200 và trả orders | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-010` | Danh sách orders — token admin | 200 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-011` | Update order status — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-012` | Update order status — token user | Expected 403; actual 200, order 1 đổi sang confirmed | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-013` | Update order status — token admin | Rerun sau reset: checkout tạo order 1 pending; admin update trả 200 và chuyển sang confirmed | Khớp | Đã duyệt giữ ID 1 và cô lập bằng reset/tạo lại flow | `evidence/phase-a-api-results.md#dt-013--probe-cả-id-1-và-id-2` |
| `TC-FR12-DT-014` | Import products — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-015` | Import products — token user | Expected 403; actual 200, import 1/1 | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-016` | Import products — token admin | 200 đúng expected, import 1/1 | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-017` | Tạo coupon — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-018` | Tạo coupon — token user | Expected 403; actual 200, coupon được tạo | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-019` | Tạo coupon — token admin | 200 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-020` | Xóa coupon — không token | 401 đúng expected trên coupon tạm | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-021` | Xóa coupon — token user | Expected 403; actual 200, coupon bị xóa | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-022` | Xóa coupon — token admin | 200 đúng expected trên coupon tạm | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-023` | Tạo product — không token | Expected 401; actual 200, product được tạo | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-024` | Tạo product — token user | Expected 403; actual 200, product được tạo | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-025` | Tạo product — token admin | 200 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-026` | Update product — không token | Expected 401; actual 200, product được sửa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-027` | Update product — token user | Expected 403; actual 200, product được sửa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-028` | Update product — token admin | 200 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-029` | Xóa product — không token | Expected 401; actual 200, product bị xóa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-030` | Xóa product — token user | Expected 403; actual 200, product bị xóa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-031` | Xóa product — token admin | 200 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-032` | Tạo category — không token | 401 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-033` | Tạo category — token user | Expected 403; actual 200, category được tạo | Lệch | Giữ nguyên expected | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-034` | Tạo category — token admin | 200 đúng expected | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-035` | Update category — không token | 401 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-036` | Update category — token user | Expected 403; actual 200, category được sửa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-037` | Update category — token admin | 200 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-038` | Xóa category — không token | 401 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-039` | Xóa category — token user | Expected 403; actual 200, category bị xóa | Lệch | Giữ nguyên expected; automation dùng resource tạm | `evidence/phase-a-api-results.md` |
| `TC-FR12-DT-040` | Xóa category — token admin | 200 đúng expected | Khớp | Giữ nguyên; automation dùng resource tạm | `evidence/phase-a-api-results.md` |

### Tổng hợp Giai đoạn A

- `23 Khớp`, `17 Lệch`, `0 Không xác định` sau rerun DT-013 trên state sạch.
- Không phát hiện case trùng lặp thực chất: các case thay đổi partition token/role, method hoặc endpoint/resource và là các điểm kiểm tra độc lập.
- Invalid-token cụ thể chỉ có `DT-002`; không có case invalid-token thứ hai trong 40 file.
- Checkpoint A đã được duyệt bằng prompt `approved, continue phase B` tại `2026-08-07T14:07:57.9159088+07:00`.

### Quyết định đã nhận

1. `DT-002`: người dùng duyệt **giữ expected 401**; actual 403 hoặc mọi giá trị khác 401 phải được đánh Fail. Không nới expected sang `401/403`.
2. `DT-013`: người dùng duyệt **giữ order ID 1**. Sau khi người dùng reset backend, rerun đã tạo order 1 từ checkout trên state sạch và xác nhận actual 200 đúng expected. Automation phải tái tạo precondition cô lập tương đương, không dùng state bị DT-012/case trước tác động.

### Phân loại bốn root cause đã đồng bộ

- `root-cause:product-no-auth-middleware` — 6 case: `DT-023/024/026/027/029/030`.
- `root-cause:admin-api-no-role-check` — 7 case: `DT-003/006/009/012/015/018/021`.
- `root-cause:category-no-role-check` — 3 case: `DT-033/036/039`, tương ứng `BUG-FR12-003`.
- `root-cause:wrong-status-invalid-token` — 1 case: `DT-002`, tương ứng `BUG-FR12-004`.
- Tổng cộng đúng 17 case failed có một root-cause tag; 23 case passed không có root-cause tag. Product user-token được gom cùng no-token vì cả hai partition đều qua được endpoint thiếu xác thực; Category được tách khỏi Admin API theo bug report riêng.

## 2. Lỗi trong code automation AI sinh

| ID / vị trí | Vấn đề | Vì sao AI có thể bỏ sót | Cách sửa | Kết quả chạy lại | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `tests/fr12-access.spec.ts` describe config | Serial mode làm fail-fast sau failure đầu | Nhầm serial state isolation với yêu cầu chạy đủ case | Bỏ `mode: serial`, giữ `--workers=1` | 40/40 case executed | `evidence/phase-c-run.md` |
| `package.json` script FR-12 | Output ban đầu kế thừa `test-results/fr08-phase-d` | Config dùng chung đang phục vụ FR-08 | Thêm output riêng `test-results/fr12-phase-c` | Artifact tách đúng feature | `evidence/phase-c-run.md` |
| DOM visible-text assertion | Timeout mặc định 5 giây làm run vượt 120 giây | Soft mismatch vẫn dùng web-first retry mặc định | Timeout riêng 500 ms; expected không đổi | 40 case hoàn tất trong 46.6 giây | `evidence/phase-c-run.md` |
| `tests/fr12-access.spec.ts` browser harness | Dùng browser/DOM giả cho feature pure API | Áp dụng assertion UI vào ngữ cảnh API | Xóa `Page`, harness, locator và DOM; dùng `request.fetch()`, `response.status()` và `response.json()` | Lint 0, type-check 0; chưa chạy test sau refactor | `evidence/phase-c-run.md` |
| `playwright.fr12.config.ts` trace policy | API trace lưu login payload, Authorization và JWT | Chính sách `retain-on-failure` phù hợp UI nhưng không an toàn với API auth flow | Đổi `trace: off`, chạy lại và thay thế artifact cũ | Report cuối giữ 51 error context; 0 trace/JWT/password value | `evidence/phase-d-run.md` |
| `playwright.config.ts` worker concurrency | Ba project có thể gọi `resetBackend()` đồng thời trên database chung | `fullyParallel: false` chỉ tuần tự trong file/project, không khóa worker xuyên project | Thêm `workers: 1` ở cấp `defineConfig` | Loại bỏ race condition DT-011/012/013 giữa Chromium/Firefox/msedge | `evidence/phase-c-run.md` |

## 3. Phân loại thất bại

| Root cause | TC-ID | Test defect đã loại trừ | Environment issue đã loại trừ | Phân loại cuối | Bug report |
| --- | --- | --- | --- | --- | --- |
| Product mutation API không enforce auth | `DT-023/024/026/027/029/030` | Fixture khóa mapping/expected; direct API assertions | Admin controls pass, actual lặp 3/3 project | `SUT defect` | `bugs/BUG-FR12-001-product-no-auth-middleware.md` |
| Admin API không enforce admin role | `DT-003/006/009/012/015/018/021` | Token role/user và expected 403 từ fixture đã duyệt | No-token/admin controls pass, actual lặp 3/3 project | `SUT defect` | `bugs/BUG-FR12-002-admin-api-no-role-check.md` |
| Category mutation API không enforce admin role | `DT-033/036/039` | Resource tạm và expected được cô lập | No-token controls trả 401, admin controls pass, actual lặp 3/3 project | `SUT defect` | `bugs/BUG-FR12-003-category-no-role-check.md` |
| Invalid token trả sai status | `DT-002` | Người dùng duyệt giữ expected 401; fixture không cho 401/403 | DT-001/004 controls pass, actual 403 lặp 3/3 project | `SUT defect` | `bugs/BUG-FR12-004-wrong-status-invalid-token.md` |

17 failed case được ánh xạ đúng bốn SUT root cause. Không có failure cuối là test defect hoặc environment issue; các harness defect đã được sửa và rerun trước artifact Phase D cuối.

## 4. Ca chưa tự động hóa

Toàn bộ 40 case đã được tự động hóa và pure API spec đã chạy trên ba project ở Phase D; 0 skipped/chưa tự động hóa.

## 5. Coverage assertion và trình duyệt

| Hạng mục | Kết quả thật | Bằng chứng |
| --- | --- | --- |
| Nhóm assertion hiện tại | State/status, Network/direct response body, Count/aggregate/object property | `tests/fr12-access.spec.ts`; lint và type-check exit 0 |
| Chromium | 23 passed / 17 failed / 0 skipped | `evidence/phase-d-run.md`; HTML report |
| Firefox | 23 passed / 17 failed / 0 skipped | `evidence/phase-d-run.md`; HTML report |
| Microsoft Edge | 23 passed / 17 failed / 0 skipped | `evidence/phase-d-run.md`; HTML report |
| Tổng Phase D | 69 passed / 51 failed / 0 skipped; exit 1 | `test-results/fr12-phase-d/`; HTML report |
| Metadata report | Đã mở và xác nhận `Run by: 23127464`, timestamp `2026-08-07T08:59:03.516Z` | `reports/fr12-access/playwright-report/index.html` |

## 6. Gap analysis

Gap analysis chi tiết và các điểm AI bỏ sót sau human review: `ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md`.

- 40/40 HW02 case đã tự động hóa; không có case skipped hoặc chưa tự động hóa.
- Coverage hiện là API-only; chưa kiểm tra route guard/visible access denial của frontend-admin.
- Invalid-token chỉ có DT-002; chưa có expired/tampered/missing-role token partitions.
- `workers: 1` vẫn bắt buộc khi ba project dùng chung database và order ID 1.
- Trace tắt để bảo vệ credential/token, nên artifact điều tra dùng HTML report và error context.
- Bốn bug report public-safe đã tạo trong `reports/fr12-access/bugs/`; GitHub Issue đều ở trạng thái `Chưa tạo — đề xuất`.

## Checkpoint A

- Điểm chưa chắc chắn chuyển sang checkpoint B: chiến lược resource tạm/cleanup và cô lập order ID 1 khi automation.
- Trạng thái bảng đối chiếu: `Đã duyệt`.
- Bằng chứng duyệt: prompt `approved, continue phase B` tại `2026-08-07T14:07:57.9159088+07:00`.

## Checkpoint B

- Artifact đã duyệt: `TEST_CASES.md` — 40 case HW02, 0 case bổ sung, 0 case trùng lặp.
- Quyết định đã duyệt: resource tạm runtime; cleanup best-effort sau mutation lệch nhưng giữ expected; reset/tạo lại order ID 1 cho từng case.
- Quy trình chuẩn bị đã được cung cấp: chạy `node database.js` rồi `node server.js` trong backend; chạy `npm run dev` cho frontend-web và frontend-admin trước suite. Người dùng đã cho phép/khuyến nghị chạy lại `node database.js` trước từng DT-011/012/013 để cô lập order ID 1; automation phải kiểm tra reset thành công.
- Trạng thái: `Đã duyệt` bằng prompt tại `2026-08-07T14:13:22.3716335+07:00`.

## Checkpoint C

- Artifact: `data/fr12-access.json`, `tests/fr12-access.spec.ts`, `reports/fr12-access/evidence/phase-c-run.md`.
- Lint: exit 0.
- Type-check: exit 0.
- Pure API refactor: đã xóa browser harness, locator và `domText`; giữ nguyên tên test, annotation, tags, traceability và cleanup.
- Root-cause taxonomy: đã thay hai nhóm cũ bằng bốn nhóm 6/7/3/1; validation khóa mapping 17 failed case và bảo đảm 23 passed case không mang root-cause tag.
- Cross-project isolation: `playwright.config.ts` đặt `workers: 1`; Phase D phải chạy tuần tự cả ba project vì DT-011/012/013 reset database dùng chung.
- Chưa chạy lại test theo yêu cầu checkpoint. Kết quả Chromium 23/17 là lịch sử trước refactor, không xác nhận spec hiện tại.
- Trạng thái: `Đã duyệt` bằng prompt `approved, continue phase D` tại `2026-08-07T15:50:46.6261727+07:00`.

## Checkpoint D

- Config: `playwright.fr12.config.ts` — Chromium, Firefox, Microsoft Edge; `workers: 1`; `trace: off` để không lưu credential/token của API auth flow; report/output riêng FR-12.
- Lint: exit 0, không warning.
- Type-check: exit 0.
- Multi-browser run cuối: exit 1; 120 executed, 69 passed, 51 failed, 0 skipped trong 58.1 giây.
- Mỗi project: 23 passed / 17 failed / 0 skipped; không có failure mới ngoài 17 case đã biết.
- Report cuối đã mở kiểm chứng trực tiếp: `Run by: 23127464`, timestamp `2026-08-07T08:59:03.516Z`, tổng 120/69/51/0.
- Artifact cuối: 51 error context; 0 trace/screenshot/video. Trace API lần đầu chứa dữ liệu xác thực nên đã bị thay thế bằng rerun `trace: off`; scan cuối có 0 JWT và 0 serialized password value.
- Evidence: `reports/fr12-access/evidence/phase-d-run.md`, `reports/fr12-access/playwright-report/index.html`, `test-results/fr12-phase-d/`.
- Trạng thái: `Đã duyệt` bằng prompt `approved, continue` tại `2026-08-07T16:18:26.2496836+07:00`.

## Checkpoint E

- Phân loại cuối: 17 failed case = 17 SUT-defect cases thuộc bốn root causes; 0 test-defect failure, 0 environment-issue failure trong artifact cuối.
- Bug reports: bốn file trong `reports/fr12-access/bugs/`, mỗi file tương ứng một root cause và liệt kê đủ TC-ID; không chứa credential/token.
- GitHub Issues: chưa tạo; không có URL/ID để tuyên bố đã tạo.
- Automated coverage: 40/40 case, 0 skipped/chưa tự động hóa.
- Summary: `reports/fr12-access/README_SUMMARY.md` — 120 executed, 69 passed, 51 failed, 0 skipped, ba browser runs, bốn SUT root causes.
- Gap analysis: `ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md`.
- Rà soát lại Phase E ngày `07/08/2026 16:25`: đã đồng bộ AI gap analysis, bổ sung summary tổng hợp tại `reports/README_SUMMARY.md`, chạy lại lint/type-check đều exit `0`; không chạy lại suite vì không đổi fixture/spec/assertion/expected.
- Phần sinh viên tự làm: video demo và AI Critique cá nhân chưa được agent thực hiện thay.
- Trạng thái: `Chờ duyệt cuối FR-12`.
