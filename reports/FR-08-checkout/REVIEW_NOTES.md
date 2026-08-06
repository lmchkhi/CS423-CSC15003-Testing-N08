# Review Notes — `FR-08: Thanh toán (Checkout)`

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Feature | `FR-08` |
| Spec | `tests/FR-08-checkout.spec.ts` |
| Fixture | `data/FR-08-checkout.json` |
| Người review | Người dùng — checkpoint A/B/C đã duyệt; checkpoint D chờ duyệt |
| Thời điểm | `06/08/2026 10:23` |
| Lệnh đã chạy | Browser launch probes; `npm run lint`; `npm run typecheck`; `npm run test:fr08 -- --workers=1` |
| Exit code | Lint `0`; type-check `0`; multi-project test `1` — 12 passed, 33 failed, 0 skipped |

## 1. Đối chiếu HW02 vs thực tế

> Đã đọc 18/18 case và chạy 15 điểm kiểm tra độc lập. Dữ liệu thật dùng AirPods Pro 2 (`id=4`, `6,000,000₫ × 2 = 12,000,000₫`). Case stateful được cô lập bằng user tạm role `user`. `Khớp/Lệch` dưới đây so với expected HW02 đã được chốt theo quyết định người dùng; `DT-012` chỉ được đánh giá trong phạm vi checkout API-only, không đánh giá khả năng chống XSS khi render UI.

| ID HW02 | Mô tả gốc | Điểm lệch quan sát được | Trạng thái | Điều chỉnh đã duyệt | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `TC-FR08-BVA-001` | Gửi `total_amount=-1`; backend tự tính | Order `27` lưu `-1`, không phải tổng giỏ `12,000,000` | Lệch | Giữ expected backend tự tính | `evidence/phase-a-api-results.md` |
| `TC-FR08-BVA-002` | Gửi `total_amount=0` | Trùng chính xác input/precondition/outcome với `DT-005` | Trùng lặp | Gộp vào `DT-005` theo phê duyệt người dùng | `evidence/phase-a-api-results.md` |
| `TC-FR08-BVA-003` | Gửi `total_amount=1` | Trùng chính xác input/precondition/outcome với `DT-004` | Trùng lặp | Gộp vào `DT-004` theo phê duyệt người dùng | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-001` | Checkout hợp lệ; tạo đơn `pending`, xóa giỏ | Order `38` đúng tổng và `pending`, nhưng giỏ vẫn còn đúng 1 dòng | Lệch | Dùng dữ liệu sản phẩm thật; làm đại diện cho `DT-015` | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-002` | Thiếu token trả `401` | Quan sát đúng `401` | Khớp | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-003` | Invalid token bị từ chối | `Bearer invalid-token` trả `403` | Khớp | Input `Invalid token`; đề xuất chốt expected duy nhất `403 Forbidden` | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-004` | Gửi tổng `1`; backend tự tính | Order `28` lưu `1` | Lệch | Đại diện cho `BVA-003` | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-005` | Gửi tổng `0`; backend tự tính | Order `29` lưu `0` | Lệch | Đại diện cho `BVA-002` | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-006` | Gửi tổng `-50000`; backend tự tính | Order `30` lưu `-50000` | Lệch | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-007` | Gửi tổng `99999999`; backend tự tính | Order `31` lưu `99999999` | Lệch | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-008` | Không gửi tổng; backend tự tính | Order `32` lưu `null` | Lệch | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-009` | Gửi sai kiểu `total_amount` | String `"NaN"` được chấp nhận và lưu vào order `33` | Lệch | Input `NaN` theo quyết định người dùng; expected duy nhất: backend bỏ qua và tự tính | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-010` | Địa chỉ rỗng phải bị từ chối khi không có địa chỉ mặc định | User cô lập không có mặc định; order `34` vẫn lưu chuỗi rỗng | Lệch | Đã duyệt: reject khi không có địa chỉ mặc định | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-011` | Thiếu địa chỉ thì dùng địa chỉ mặc định nếu có | Đã đặt mặc định thành công (`PUT 200`), nhưng order `35` lưu `null` | Lệch | Expected đã được người dùng chọn: dùng địa chỉ mặc định nếu có | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-012` | Gửi payload XSS trong `shipping_address` | Checkout API lưu/trả payload XSS nguyên dạng string | Khớp (API-only) | FR-08 chỉ tự động hóa API-only; không kết luận Pass về chống XSS UI | `evidence/phase-a-api-results.md`, `evidence/phase-c-run.md`, `evidence/phase-d-run.md` |
| `TC-FR08-DT-013` | SQL payload lưu plain text, không thực thi | Order `37` lưu chính xác payload; API order vẫn hoạt động | Khớp | Expected đã được người dùng chọn: lưu nguyên plain text | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-014` | Giỏ trống phải bị từ chối | Giỏ `0` dòng vẫn checkout `200`, tạo order `25` | Lệch | Giữ nguyên | `evidence/phase-a-api-results.md` |
| `TC-FR08-DT-015` | Giỏ được xóa sau checkout | Cùng flow/assertion đã có trong `DT-001`; giỏ thực tế vẫn còn 1 dòng | Trùng lặp | Gộp vào `DT-001`, không tự động hóa riêng | `evidence/phase-a-api-results.md` |

### Tổng hợp checkpoint A

- 18 case HW02 vật lý; 3 case gộp trùng; 15 điểm độc lập đã được người dùng chấp nhận.
- Trong 15 điểm độc lập theo phạm vi đã duyệt: `4 Khớp` (gồm `DT-012` API-only), `11 Lệch`, `0 Không xác định`; không tính đây là bằng chứng chống XSS UI.
- Expected duy nhất đã chốt: `DT-003 → 403`; `DT-009 → bỏ qua string "NaN" và tự tính`; `DT-010 → reject nếu không có địa chỉ mặc định`; `DT-011 → dùng địa chỉ mặc định nếu có`; `DT-013 → lưu plain text và không thực thi`.
- API/data precondition đã xác minh. Admin login locator đã quan sát; locator/navigation Orders chưa xác định bền vững.
- Side effect dữ liệu test được ghi đầy đủ trong `evidence/phase-a-api-results.md`; không có API công khai để dọn giỏ.

## 2. Lỗi trong code automation AI sinh

| ID / vị trí | Vấn đề | Vì sao AI có thể bỏ sót | Cách sửa | Kết quả chạy lại | Bằng chứng |
| --- | --- | --- | --- | --- | --- |
| `tests/FR-08-checkout.spec.ts` / cấu hình describe | Cấu hình serial ban đầu có thể skip toàn bộ case sau failure đầu tiên | AI ưu tiên tuần tự để tránh xung đột state nhưng chưa xét cơ chế fail-fast của serial mode | Loại `test.describe.configure({ mode: 'serial' })`; vẫn chạy 1 worker và user cô lập | Lần chạy thật thực thi đủ 15/15 case, 0 skipped | `evidence/phase-c-run.md` |
| `tests/FR-08-checkout.spec.ts` / pre-cart aggregate | Hardcode `12_000_000` làm spec lệch nếu product fixture đổi | Giá trị đúng ở fixture hiện tại nên duplication khó nhận thấy | Tạo `expectedCartTotal = fixture.product.price * fixture.product.quantity` | Lint/type-check pass; rerun nghiệp vụ 4 passed/11 failed, khớp baseline | `evidence/phase-c-run.md` |
| `tests/FR-08-checkout.spec.ts` / cart response type | Dùng `ProductFixture[]` cho DTO `/api/cart`, trộn dữ liệu gửi với dữ liệu nhận | Hai shape hiện giống nhau | Tách `CartItemDto` và dùng trong `getCart`/`cartTotal` | Lint/type-check pass | `evidence/phase-c-run.md` |
| `tests/FR-08-checkout.spec.ts` / reject branch | Assertion dừng ngay ở `responseOk`, không ghi nhận thêm việc order ngoài ý muốn đã được tạo | Hard assertion phù hợp pass/fail nhưng thiếu chẩn đoán root cause | Dùng `expect.soft` cho response và order count; vẫn giữ `responseOk:false`, không đoán status | DT-010/DT-014 đều hiện rõ hai failure: response `200` và order count tăng `1` | `evidence/phase-c-run.md` |
| Fixture tags + spec annotations | Root cause chính chưa hiện rõ trong metadata runner | Tag cũ chỉ mô tả loại test | Thêm `root-cause:*` data-driven và phát thành annotation `root-cause-review` | Lint/type-check pass; collection không đổi 15 case | `evidence/phase-c-run.md` |
| `package.json`, `tsconfig.json`, `eslint.config.js` / phạm vi kiểm tra | Config Playwright mới ban đầu không nằm trong lint/type-check | Phase C chỉ có spec nên glob/include chỉ bao phủ `tests/**/*.ts` | Bổ sung `playwright.config.ts` vào lint, ESLint file matcher và TypeScript include | Lint/type-check exit `0` trên cả spec và config | `evidence/phase-d-run.md` |
| `playwright.config.ts` / HTML reporter | Custom metadata có trong config nhưng report UI lần đầu không hiển thị `Run by` và timestamp | AI coi cấu hình metadata là đủ trước khi mở artifact thật | Thêm title HTML runtime chứa trực tiếp hai trường, chạy lại 45 lượt và mở report bằng Chromium | Report cuối hiển thị `Run by: 23127464` và timestamp ISO `2026-08-06T03:23:07.283Z` | `evidence/phase-d-run.md` |

## 3. Phân loại thất bại

| ID | Kết quả | Phân loại | Căn cứ | Hành động tiếp theo | Bug report |
| --- | --- | --- | --- | --- | --- |
| `BVA-001`, `DT-004`–`DT-009` | failed | Chờ phân loại chính thức ở Giai đoạn E | Backend lưu nguyên `total_amount` client thay vì `12000000` | Giữ assertion; xác minh đa trình duyệt/API run trước khi gom root cause | N/A |
| `DT-001` | failed | Chờ phân loại chính thức ở Giai đoạn E | Giỏ còn 1 item sau checkout | Giữ assertion; chạy lại ở Giai đoạn D | N/A |
| `DT-010` | failed | Chờ phân loại chính thức ở Giai đoạn E | Checkout địa chỉ rỗng trả `ok=true` | Giữ assertion; chạy lại ở Giai đoạn D | N/A |
| `DT-011` | failed | Chờ phân loại chính thức ở Giai đoạn E | Địa chỉ mặc định đã set nhưng order lưu `null` | Giữ assertion; chạy lại ở Giai đoạn D | N/A |
| `DT-014` | failed | Chờ phân loại chính thức ở Giai đoạn E | Giỏ rỗng vẫn checkout thành công | Giữ assertion; chạy lại ở Giai đoạn D | N/A |
| Tất cả 15 case — rerun `05/08/2026 21:09` | failed trước assertion nghiệp vụ | environment issue | `ECONNREFUSED ::1:3000`; probe `localhost` và `127.0.0.1` đều `NO_RESPONSE` | Khởi động backend rồi chạy lại cùng lệnh; không đổi test | N/A |
| Tất cả 15 case — rerun `05/08/2026 21:14` | 4 passed, 11 failed | Khớp baseline nghiệp vụ; không phát hiện test defect mới | Ba service trả `200`; các failure vẫn phản ánh SUT không đáp ứng expected đã duyệt | Giữ fixture/spec; dừng tại checkpoint C | N/A |
| 45 lượt Phase D — `06/08/2026 10:23` | 12 passed, 33 failed, 0 skipped | Khớp cùng pattern Phase C trên cả ba project; chờ phân loại chính thức ở Phase E | Mỗi project 4 pass/11 fail; không có browser/environment failure trong run cuối | Giữ assertion; chưa tạo bug report ở Phase D | N/A |

## 4. Ca chưa tự động hóa

| ID | Lý do | Đã thử | Tác động coverage | Hướng xử lý / điều kiện để chạy |
| --- | --- | --- | --- | --- |
| `BVA-002` | Trùng `DT-005` (`total_amount=0`) | Đối chiếu HW02 và Phase A | Không mất điểm độc lập | Truy vết qua tag `related:TC-FR08-BVA-002` trong `DT-005` |
| `BVA-003` | Trùng `DT-004` (`total_amount=1`) | Đối chiếu HW02 và Phase A | Không mất điểm độc lập | Truy vết qua tag `related:TC-FR08-BVA-003` trong `DT-004` |
| `DT-015` | Assertion xóa giỏ đã nằm trong `DT-001` | `DT-001` đã thực thi assertion post-cart | Không mất assertion | Truy vết qua tag `related:TC-FR08-DT-015` trong `DT-001` |
| `DT-012` phần render UI | Ngoài phạm vi FR-08 đã duyệt; FR-08 chỉ tự động hóa checkout API-only | API đã xác minh lưu/trả payload như string; không thực hiện assertion render UI | Không kiểm chứng khả năng chống XSS tại UI | Giữ ngoài phạm vi FR-08; không tuyên bố Pass về chống XSS UI |

## 5. Coverage assertion và trình duyệt

| Hạng mục | Kết quả thật | Bằng chứng |
| --- | --- | --- |
| Nhóm assertion đã chạy | Network/response; Count/aggregate; State/attribute | `tests/FR-08-checkout.spec.ts`, `evidence/phase-c-run.md` |
| Chromium | 4 passed, 11 failed, 0 skipped; launch `151.0.7922.34` thành công | `evidence/phase-d-run.md` |
| Firefox | 4 passed, 11 failed, 0 skipped; launch `153.0` thành công | `evidence/phase-d-run.md` |
| Microsoft Edge | 4 passed, 11 failed, 0 skipped; channel `msedge`, launch `151.0.4129.59` thành công | `evidence/phase-d-run.md` |
| Metadata report | Đã mở report thật; thấy `Run by: 23127464` và timestamp ISO runtime | `playwright-report/index.html`, `evidence/phase-d-run.md` |

## 6. Gap analysis

Chưa thực hiện; thuộc Giai đoạn E sau khi các checkpoint A–D được duyệt tuần tự.

## Checkpoint A

- Giới hạn đã duyệt: `DT-012` chỉ xác minh checkout API lưu/trả payload như string; không kết luận về chống XSS UI.
- Trạng thái bảng đối chiếu: `Đã duyệt`.
- Bằng chứng duyệt hiện có: prompt lúc `05/08/2026 11:33` duyệt 15 điểm độc lập và các lựa chọn DT-003/009/011/013; prompt lúc `05/08/2026 12:02` chốt DT-010; prompt `approved, continue phase B` lúc `05/08/2026 12:14` duyệt checkpoint A.

## Checkpoint C

- Artifact tạo mới: `data/FR-08-checkout.json`, `tests/FR-08-checkout.spec.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.js`, `evidence/phase-c-run.md`.
- Kết quả fixture validation: đạt đúng 15 ID độc lập, nguồn `HW02`, không trùng ID.
- Lint: pass, exit `0`.
- Type-check: pass, exit `0`.
- Test: exit `1` — `4 passed`, `11 failed`, `0 skipped`.
- Refinement rerun lúc backend dừng: lint/type-check exit `0`; test có 15 environment failures do `ECONNREFUSED`.
- Rerun sau khi khởi động lại SUT: ba service trả `200`; lint/type-check exit `0`; test exit `1` — `4 passed`, `11 failed`, `0 skipped`, khớp baseline nghiệp vụ.
- Review refinement: bỏ hardcode tổng trong spec, tách CartItem DTO, tăng chẩn đoán reject bằng soft assertions, thêm root-cause annotations; expected không đổi.
- Không phát hiện test defect mới sau rerun; không chỉnh thêm fixture/spec.
- Điều kiện an toàn đã được người dùng xác nhận ngày `06/08/2026`: localhost là môi trường test cô lập, không phải production; chấp nhận side effect user/order.
- Trạng thái: `Đã duyệt checkpoint C`.

## Checkpoint D

- Cấu hình ba project: Chromium, Firefox, Microsoft Edge channel `msedge`.
- Chromium bundled ban đầu thiếu executable; đã cài revision đúng và launch lại thành công. Firefox và Edge cũng launch thật thành công.
- Collection: 45 lượt, đúng 15 case × 3 project, không skip.
- Lần chạy cuối: exit `1` — `12 passed`, `33 failed`, `0 skipped`; mỗi project `4/11/0`, khớp Phase C.
- HTML report: `reports/FR-08-checkout/playwright-report/index.html`; đã mở bằng Chromium và xác nhận trực tiếp `Run by: 23127464`, `Runtime timestamp: 2026-08-06T03:23:07.283Z`.
- Test-harness defect đã sửa: config chưa nằm trong lint/type-check; custom metadata không hiển thị rõ trong report lần đầu.
- Expected/assertion không đổi; DT-012 vẫn API-only; chưa tạo bug report hoặc thực hiện gap analysis Phase E.
- Điểm chưa chắc chắn: spec là API-only nên project được lặp độc lập và browser binaries được launch probe riêng, nhưng các assertion không thao tác DOM/rendering.
- Đề xuất: `Có thể chuyển Phase E sau khi người dùng duyệt checkpoint D`.
- Trạng thái: `Chờ duyệt checkpoint D`.
