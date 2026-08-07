# Review Notes — `FR-12: Access Control`

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Feature | `FR-12` |
| Spec | `tests/fr12-access.spec.ts` — chưa tạo (trước checkpoint B) |
| Fixture | `data/fr12-access.json` — chưa tạo (trước checkpoint B) |
| Người review | Người dùng — checkpoint A đã duyệt |
| Thời điểm | `2026-08-07T09:03:02.0373462+07:00` |
| Lệnh đã chạy | PowerShell HTTP client (`Invoke-WebRequest`) chạy ma trận 40 case trên `http://localhost:3000`; credentials/token không ghi vào artifact |
| Exit code | `0` |

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

### Phân tích hai nhóm hành vi

- Có đúng 13 case valid-user bypass nếu **tính cả** 3 product cases: `DT-003/006/009/012/015/018/021/024/027/030/033/036/039`.
- Nếu diễn đạt “admin-only trừ `/api/products`”, số đúng là 10 case, không phải 13.
- Có thêm đúng 3 case product không-token: `DT-023/026/029`.
- So sánh categories xác nhận khác biệt bề mặt: categories không-token bị 401 nhưng user-token được 200; products không-token cũng được 200. Do kiểm thử hộp đen, chỉ kết luận enforcement quan sát được; không khẳng định trực tiếp cấu trúc middleware nội bộ.

## 2. Lỗi trong code automation AI sinh

| ID / vị trí | Vấn đề | Vì sao AI có thể bỏ sót | Cách sửa | Kết quả chạy lại | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `tests/fr12-access.spec.ts` describe config | Serial mode làm fail-fast sau failure đầu | Nhầm serial state isolation với yêu cầu chạy đủ case | Bỏ `mode: serial`, giữ `--workers=1` | 40/40 case executed | `evidence/phase-c-run.md` |
| `package.json` script FR-12 | Output ban đầu kế thừa `test-results/fr08-phase-d` | Config dùng chung đang phục vụ FR-08 | Thêm output riêng `test-results/fr12-phase-c` | Artifact tách đúng feature | `evidence/phase-c-run.md` |
| DOM visible-text assertion | Timeout mặc định 5 giây làm run vượt 120 giây | Soft mismatch vẫn dùng web-first retry mặc định | Timeout riêng 500 ms; expected không đổi | 40 case hoàn tất trong 46.6 giây | `evidence/phase-c-run.md` |
| `tests/fr12-access.spec.ts` browser harness | Dùng browser/DOM giả cho feature pure API | Áp dụng assertion UI vào ngữ cảnh API | Xóa `Page`, harness, locator và DOM; dùng `request.fetch()`, `response.status()` và `response.json()` | Lint 0, type-check 0; chưa chạy test sau refactor | `evidence/phase-c-run.md` |

## 3. Phân loại thất bại

Chưa phân loại bug chính thức trước Giai đoạn E. Phase C tái hiện 17 failed case đúng nhóm Phase A: `DT-002`; 13 case valid-user bypass; 3 case product không-token. Không có failure ngoài danh sách đã duyệt.

## 4. Ca chưa tự động hóa

Toàn bộ 40 case đã được tự động hóa. Lần thực thi 40 case gần nhất thuộc browser harness trước refactor; pure API spec hiện chưa được chạy lại theo phạm vi checkpoint này.

## 5. Coverage assertion và trình duyệt

| Hạng mục | Kết quả thật | Bằng chứng |
| --- | --- | --- |
| Nhóm assertion hiện tại | State/status, Network/direct response body, Count/aggregate/object property | `tests/fr12-access.spec.ts`; lint và type-check exit 0 |
| Chromium | **Lịch sử trước refactor:** 23 passed / 17 failed / 0 skipped; exit 1. Pure API spec chưa chạy lại. | `test-results/fr12-phase-c/`; `evidence/phase-c-run.md` |
| Firefox | Chưa chạy — Phase D | N/A |
| Edge | Chưa chạy — Phase D | N/A |
| Metadata report | Chưa kiểm tra — Phase D | N/A |

## 6. Gap analysis

Chưa thực hiện Giai đoạn E. Gap hiện biết: ID cố định và state dùng chung có thể làm `DT-013` phụ thuộc `DT-012`; rerun sạch đã chứng minh cần fixture runtime cô lập hoặc reset/tạo lại precondition.

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
- Chưa chạy lại test theo yêu cầu checkpoint. Kết quả Chromium 23/17 là lịch sử trước refactor, không xác nhận spec hiện tại.
- Trạng thái: `Chờ duyệt`.
