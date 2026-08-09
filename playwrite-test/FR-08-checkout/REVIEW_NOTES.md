# Review Notes — `FR-08: Thanh toán (Checkout)`

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Feature | `FR-08` |
| Spec | `tests/FR-08-checkout.spec.ts`; `tests/FR-08-checkout-ui.spec.ts` |
| Fixture | `data/FR-08-checkout.json`; `data/FR-08-checkout-ui.json` |
| Người review | Người dùng — checkpoint A/B/C/D/E đã duyệt |
| Thời điểm | `09/08/2026 14:55` |
| Lệnh đã chạy | Post-Phase-E README/UI refinement; lint/type-check; UI collection/Firefox rerun; final `npm run test:fr08 -- --workers=1`; mở/quét HTML report và trace/video |
| Exit code | Lint `0`; type-check `0`; multi-project test `1` — 12 passed, 42 failed, 0 skipped |

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
| `playwright.config.ts` / HTML reporter | Custom metadata có trong config nhưng report UI lần đầu không hiển thị `Run by` và timestamp | AI coi cấu hình metadata là đủ trước khi mở artifact thật | Thêm title HTML runtime chứa trực tiếp hai trường, chạy lại và mở report bằng Chromium | Report public-safe lịch sử hiển thị `Run by: 23127464`; thời gian quy đổi `06/08/2026 10:55` | `evidence/phase-d-run.md` |
| `TEST_CASES.md` / DT-012 | Wording cũ còn hướng kiểm tra render sang FR-18, không thống nhất quyết định cuối | Artifact Phase B được tạo trước refinement DT-012 sau Phase D | Giữ DT-012 API-only trong FR-08; ghi rõ không kết luận Pass chống XSS UI và không tự mở rộng FR-18 | Review tài liệu; không cần chạy lại test vì expected/spec không đổi | `TEST_CASES.md`, `REVIEW_NOTES.md` |
| `playwright.config.ts` / trace trong public HTML report | 33/33 trace ZIP cũ chứa request password field và Authorization header runtime | AI giữ trace failure theo mặc định nhưng chưa xét report sẽ được commit public | Tắt trace cho suite API-only, rerun để thay report và quét lại artifact; `test-results/` tiếp tục ignored | Lint/type-check pass; 45 lượt giữ 12/33/0; report cuối 0 ZIP trace và 0 giá trị runtime password/email/JWT | `evidence/phase-d-run.md` |
| Phạm vi automation ban đầu | AI chuyển toàn bộ FR-08 thành request-context tests nên “multi-browser” chỉ lặp API, không kiểm tra DOM/rendering | HW02 tập trung API và không mô tả thao tác UI; AI chưa đối chiếu đủ các requirement FR-08 trong README | Giữ nguyên 15 case HW02 API; bổ sung riêng 3 case README dùng `page`, URL/DOM/attribute/network/postcondition assertion | Collect 9 lượt UI; 3/3 browser đều chạy đến assertion SUT thật | `evidence/ui-refinement-run.md` |
| `tests/FR-08-checkout-ui.spec.ts` / login locator | Login input không có label/name/id/test-id nên selector theo vị trí dễ vỡ nếu form đổi thứ tự | Đây là đặc tính black-box của SUT; không có locator semantic ổn định để dùng | Scope `form input`, assert đúng 2 input rồi dùng `nth(0/1)`; ghi rõ fragility để human reviewer chịu trách nhiệm | 3/3 browser login được và tiếp tục đến Checkout UI | `evidence/ui-refinement-run.md` |
| UI spec/config / trace và video | SUT khai báo cả input login là `type=text`; trace/video ban đầu có nguy cơ lộ runtime credential/token | Cấu hình artifact API-only trước đó chưa xử lý evidence UI công khai | Mask hai input khi ghi video; video `retain-on-failure`; trace bắt đầu sau auth, attach vào report và redact giá trị runtime trong ZIP | 9 PNG, 9 WEBM, 9 trace ZIP; sau redaction có 0 runtime email/password/JWT match | `evidence/ui-refinement-run.md` |
| `playwright.config.ts` / Firefox page | Firefox bundled launch được nhưng `browserContext.newPage()` lỗi dưới sandbox mặc định của máy test | Lỗi phụ thuộc host/browser, không xuất hiện ở API-only suite | Tắt sandbox content/GPU/media trong riêng project Firefox sau probe tối thiểu; không đổi assertion | Firefox chạy đủ 3 UI case tới assertion thật, 0 skip/environment failure trong final run | `evidence/ui-refinement-run.md` |

## 3. Phân loại thất bại

| ID | Kết quả | Phân loại | Căn cứ | Hành động tiếp theo | Bug report |
| --- | --- | --- | --- | --- | --- |
| `BVA-001`, `DT-004`–`DT-009` | failed trên 3/3 project | SUT defect | Pre-cart tổng `12000000`; order lưu nguyên input client (`-1`, `1`, `0`, `-50000`, `99999999`, `null`, `"NaN"`) | Đề xuất tạo một GitHub Issue cho root cause chung | `../../bug-reports/FR-08/BUG-FR08-001-client-total-trusted.md` |
| `DT-001` (`DT-015` gộp) | failed trên 3/3 project | SUT defect | Cart count trước checkout `1`, sau checkout vẫn `1` | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-002-cart-not-cleared.md` |
| `DT-010` | failed trên 3/3 project | SUT defect | User không có default address; checkout trả `200` và order count tăng `1` | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-003-empty-address-accepted.md` |
| `DT-011` | failed trên 3/3 project | SUT defect | Profile setup `200`, nhưng order lưu `shipping_address=null` | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-004-default-address-not-used.md` |
| `DT-014` | failed trên 3/3 project | SUT defect | Precondition cart count `0`; checkout trả `200` và order count tăng `1` | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-005-empty-cart-checkout.md` |
| Tất cả 15 case — rerun `05/08/2026 21:09` | failed trước assertion nghiệp vụ | environment issue | `ECONNREFUSED ::1:3000`; probe `localhost` và `127.0.0.1` đều `NO_RESPONSE` | Khởi động backend rồi chạy lại cùng lệnh; không đổi test | N/A |
| Tất cả 15 case — rerun `05/08/2026 21:14` | 4 passed, 11 failed | Khớp baseline nghiệp vụ; không phát hiện test defect mới | Ba service trả `200`; các failure vẫn phản ánh SUT không đáp ứng expected đã duyệt | Giữ fixture/spec; dừng tại checkpoint C | N/A |
| 45 lượt Phase D — `06/08/2026 10:23` | 12 passed, 33 failed, 0 skipped | Khớp cùng pattern Phase C; là đầu vào đã được phân loại thành 5 SUT root cause ở Phase E | Mỗi project 4 pass/11 fail; không có browser/environment failure trong run | Giữ assertion; dùng bug report Phase E | `bug-reports/FR-08/BUG-FR08-001` đến `BUG-FR08-005` |
| Chromium bundled trước Phase D | launch failed | environment issue — đã xử lý | Thiếu executable revision `1234`; Firefox/Edge không bị ảnh hưởng | `npx playwright install chromium`, launch lại thành công | `evidence/phase-d-run.md` |
| HTML metadata lần chạy Phase D đầu | `Run by`/timestamp không hiện rõ | test defect — đã sửa | Config metadata có dữ liệu nhưng HTML UI không render trường tùy chỉnh ở trạng thái thông thường | Thêm HTML title runtime, chạy lại và mở kiểm chứng | `evidence/phase-d-run.md` |
| 9 lượt UI refinement — `09/08/2026 14:25` | 0 passed, 9 failed, 0 skipped | SUT deviations quan sát qua browser page thật | Mỗi project: route chưa bảo vệ; summary không bind cart/tổng còn editable; cart không xóa sau UI checkout | Giữ expected README; chưa tự tạo GitHub Issue | `evidence/ui-refinement-run.md` |
| `FR08-UI-README-001` | failed trên 3/3 project | SUT defect | Anonymous context vẫn ở `/checkout` và thấy đầy đủ Checkout UI | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-006-checkout-route-unprotected.md` |
| `FR08-UI-README-002` — product list | failed trên 3/3 project | SUT defect | Backend cart có AirPods Pro 2 nhưng UI list rỗng | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-007-checkout-products-not-rendered.md` |
| `FR08-UI-README-002` — total control | failed trên 3/3 project | SUT defect | Expected `12000000` chỉ đọc; UI hiển thị `0` và editable | Đề xuất GitHub Issue | `../../bug-reports/FR-08/BUG-FR08-008-checkout-total-zero-editable.md` |
| `FR08-UI-README-003` | failed trên 3/3 project | SUT defect, trùng root cause hiện có | UI checkout nhận `200`/hiện thành công nhưng backend cart vẫn còn 1 item | Bổ sung evidence vào bug hiện có | `../../bug-reports/FR-08/BUG-FR08-002-cart-not-cleared.md` |

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
| Nhóm assertion đã chạy | API network/count/state; UI URL/DOM/attribute/network/postcondition | Hai spec và `evidence/ui-refinement-run.md` |
| Chromium | 4 passed, 14 failed, 0 skipped; gồm `4P/11F` API và `0P/3F` UI | `evidence/ui-refinement-run.md` |
| Firefox | 4 passed, 14 failed, 0 skipped; gồm `4P/11F` API và `0P/3F` UI | `evidence/ui-refinement-run.md` |
| Microsoft Edge | 4 passed, 14 failed, 0 skipped; gồm `4P/11F` API và `0P/3F` UI | `evidence/ui-refinement-run.md` |
| Metadata report | Đã mở report thật; thấy `Run by: 23127464`, runtime `09/08/2026 15:32`, ISO runtime, `All 54 / 12 / 42 / 0`, Trace và Video ở case UI | `playwright-report/index.html`, `evidence/ui-refinement-run.md` |

## 6. Gap analysis

| Yêu cầu | Kết quả kiểm chứng | Khoảng trống | Mức ảnh hưởng | Hành động đề xuất |
| --- | --- | --- | --- | --- |
| Truy vết HW02 | 18 file vật lý; 15 điểm độc lập tự động hóa; 3 case trùng gộp có case đại diện | Không mất điểm độc lập | Low | Giữ mapping trong `TEST_CASES.md` và fixture tags |
| Tối thiểu 12 case cho FR-08 | 15 case độc lập được collect và chạy | Không | Low | Không bổ sung case ngoài HW02 |
| Data-driven | Input/expected của 15 case nằm trong fixture JSON; runtime validation kiểm tra ID/source/count | Không | Low | Giữ fixture/spec hiện tại |
| Ít nhất 3 nhóm assertion | Network/response, Count/aggregate, State/attribute đã chạy | Không | Low | Dẫn evidence Phase C/D |
| Chromium/Firefox/Edge + HTML report | 54 lượt cuối; mỗi project 4 pass/14 fail/0 skip; trong đó có 3 UI case dùng browser page thật | DT-012 vẫn không có UI-render assertion | Medium | Trình bày tách 45 API executions và 9 UI executions; không tuyên bố chống XSS UI |
| Tiêu chí toàn bài 3 feature / 9 feature–browser | FR-08 cung cấp 3 lượt feature–browser | Chưa đủ artifact để kết luận toàn bài | High | Tổng hợp thêm hai feature khác trước khi nộp |
| DT-012 chống XSS UI | Checkout API lưu/trả payload như string; phạm vi API-only đã duyệt | Không có bằng chứng render UI và không tuyên bố Pass UI | Medium | Giữ giới hạn rõ trong review/summary; không mở rộng FR-08 |
| Test data cleanup | Automation dùng user tạm; API công khai không có cleanup phù hợp | Nhiều user/order test tồn tại sau run | Medium | Dùng database/môi trường disposable hoặc reset được người quản trị phê duyệt cho lần chạy sau |
| Repository nộp bài | HTML report hiện ở `playwrite-test/FR-08-checkout/playwright-report/` và không còn bị ignore | Chưa có bằng chứng commit/push/public URL trong Phase E | High | Stage, commit, push và kiểm tra link public trước khi nộp |
| Secret hygiene toàn repository | Audit FR-08 đã redacted và report cuối không có credential/token runtime | HW02 gốc và một số tài liệu tính năng khác vẫn chứa mật khẩu test seed dạng rõ; Phase E không sửa nguồn người dùng | High | Redact hoặc rotate test credentials trước khi public toàn repository; quét lại sau khi xử lý |
| Bug tracking | 5 bug report root-cause có evidence | Chưa tạo GitHub Issue | Medium | Chỉ tạo issue sau khi người dùng quyết định; không tuyên bố đã tạo |
| Video demo và AI Critique | Chưa có bằng chứng trong artifact | Hai phần cá nhân chưa hoàn tất | High | Sinh viên tự quay video và tự viết AI Critique |

## 7. Refinement UI sau Phase E

- Đọc lại README FR-08 và bổ sung 3 case UI độc lập; đây là coverage bổ sung, không sửa lại bộ expected HW02 đã duyệt.
- Final run có 54 lượt: API giữ nguyên `12 passed / 33 failed / 0 skipped`; UI `0 passed / 9 failed / 0 skipped`; tổng `12 / 42 / 0`.
- Cả Chromium, Firefox và Edge đều tạo page, thao tác DOM và đi đến oracle thật. Các failure UI không phải lỗi harness trong final run.
- DT-012 tiếp tục API-only; việc có suite UI bổ sung không được dùng để tuyên bố payload XSS đã render an toàn.
- HTML report được mở thật, thấy Trace/Video và đã quét public-safety; chi tiết tại `evidence/ui-refinement-run.md`.

## Checkpoint refinement UI

- Trạng thái: hoàn tất triển khai và kiểm chứng kỹ thuật; chờ human review kết quả SUT UI.
- Expected HW02: không đổi.
- Expected UI: dẫn xuất trực tiếp từ README FR-08, không hạ theo actual.
- Ba root cause UI mới đã có bug report `BUG-FR08-006`–`008`; cart-not-cleared UI được gộp vào `BUG-FR08-002` để tránh tạo trùng.
- Tất cả vẫn ở trạng thái `Chưa tạo — đề xuất`; chưa tạo GitHub Issue/URL/ID.

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
- HTML report Phase D ban đầu đã được mở và xác nhận; thời gian lịch sử quy đổi là `06/08/2026 10:55`. Artifact hiện hành tại cùng đường dẫn có `Run by: 23127464`, thời gian `09/08/2026 15:32` và ISO runtime.
- Test-harness defect đã sửa: config chưa nằm trong lint/type-check; custom metadata không hiển thị rõ trong report lần đầu.
- Tại thời điểm checkpoint D, expected/assertion không đổi, DT-012 vẫn API-only và chưa tạo bug report; phân loại/gap analysis đã được thực hiện sau khi Phase D được duyệt.
- Điểm chưa chắc chắn: spec là API-only nên project được lặp độc lập và browser binaries được launch probe riêng, nhưng các assertion không thao tác DOM/rendering.
- Bằng chứng duyệt: prompt `approved, continue phase E` ngày `06/08/2026`.
- Trạng thái: `Đã duyệt checkpoint D`.

## Checkpoint E

- 11 failure độc lập được phân loại `SUT defect` và gộp thành 5 root cause; không tạo 11 bug report trùng nguyên nhân.
- Sau UI refinement, tám bug report hiện hành trong `bug-reports/FR-08/` đã ánh xạ GitHub Issues `#226`–`#233` và chèn screenshot Issue tương ứng.
- Environment issue Chromium và test defect HTML metadata đã được ghi riêng, không tính vào SUT defect.
- README summary đã tạo tại `playwrite-test/FR-08-checkout/README_SUMMARY.md` bằng số liệu runner thật.
- Phase E rerun artifact-safe: lint/type-check exit `0`; 45 lượt exit `1`, 12 passed/33 failed/0 skipped; report cuối 0 trace ZIP và không chứa giá trị credential/token runtime.
- Không đổi fixture/spec/assertion/expected.
- Điểm chưa chắc chắn: chưa biết build/commit SUT; credential test seed vẫn xuất hiện trong nguồn HW02/tài liệu ngoài artifact FR-08 đã làm sạch; video và AI Critique thuộc phần sinh viên tự làm.
- Bằng chứng duyệt: prompt `approved, complete FR-08 after Phase E` ngày `06/08/2026 11:12`.
- Trạng thái gap analysis: `Đã duyệt`.
- Trạng thái FR-08: `Hoàn tất quy trình automation A→E`.
