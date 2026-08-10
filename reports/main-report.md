# Main Report — HW04 Automation Testing

## Thông tin sinh viên

| Mục                      | Thông tin                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Họ và tên**            | Trần Minh Quang                                                                                                           |
| **MSSV**                 | `23127464`                                                                                                                |
| **Nhóm**                 | N08                                                                                                                       |
| **Môn học**              | CS423 / CSC15003 — Kiểm thử Phần mềm                                                                                      |
| **System Under Test**    | EShop                                                                                                                     |
| **Repository**           | [CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-Automation-Testing) |
| **Automation framework** | Playwright Test `1.62.1` + TypeScript                                                                                     |
| **Trình duyệt**          | Chromium, Firefox, Microsoft Edge                                                                                         |
| **Run by**               | `23127464`                                                                                                                |

Bài HW04 tự động hóa ba tính năng web đã chọn từ Pool A, B và C. Quy trình được thực hiện theo hướng AI-first có checkpoint human review: rà soát test design đầu vào, chuẩn hóa fixture, sinh script, chạy smoke, sửa test defect, chạy đa trình duyệt, kiểm tra HTML report và phân loại failure theo root cause. Expected không được thay đổi để khớp với hành vi lỗi của SUT.

### Tổng quan kết quả

| Feature  | Designed | Automated | Executed | Passed |  Failed | Skipped | Browser runs | SUT defect root causes |
| -------- | -------: | --------: | -------: | -----: | ------: | ------: | -----------: | ---------------------: |
| `FR-05`  |       12 |        12 |       36 |     12 |      24 |       0 |            3 |                      6 |
| `FR-08`  |       24 |        21 |       63 |     12 |      51 |       0 |            3 |                      8 |
| `FR-12`  |       40 |        40 |      120 |     69 |      51 |       0 |            3 |                      4 |
| **Tổng** |   **76** |    **73** |  **219** | **93** | **126** |   **0** |        **9** |                 **18** |

Số liệu trên được đọc từ ba Playwright HTML report hiện hành. `Failed` là failure instance theo case–project; `SUT defect root causes` là số lỗi độc lập sau khi gộp các failure cùng nguyên nhân.

---

## Pool A

### FR-05: Xem danh sách và Tìm kiếm sản phẩm

#### 1. Tổng quan

FR-05 được tự động hóa theo hướng UI-first. Mỗi case tạo browser page thật, thao tác với trang danh sách/tìm kiếm và dùng trạng thái hiển thị làm oracle chính. Network interception chỉ được dùng để đồng bộ hoặc chẩn đoán, không thay thế kết quả người dùng quan sát được.

Các nhóm hành vi được bao phủ:

- tải danh sách sản phẩm;
- tìm kiếm có kết quả, không có kết quả, khoảng trắng và ký tự đặc biệt;
- XSS/SQL-like keyword được xử lý như dữ liệu đầu vào;
- product-card content, hình ảnh và định dạng giá;
- loading state khi request đang pending;
- số lượng heading cấp một và cấu trúc DOM.

#### 2. Automation Testing

##### 2.1. Thiết kế và phạm vi tự động hóa

| Thành phần      | Giá trị                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Test script     | [`tests/fr05-search.spec.ts`](../tests/fr05-search.spec.ts)                                                             |
| Data fixture    | [`data/fr05-search.json`](../data/fr05-search.json)                                                                     |
| Số case độc lập | 12/12                                                                                                                   |
| Kiểu thực thi   | UI browser page                                                                                                         |
| Projects        | Chromium, Firefox, Microsoft Edge                                                                                       |
| Config          | [`playwright.fr05.config.ts`](../playwright.fr05.config.ts)                                                             |
| Report          | [`playwrite-test/fr05-search/playwright-report/index.html`](../playwrite-test/fr05-search/playwright-report/index.html) |

Fixture chứa 12 record với TC-ID, input, expected và metadata truy vết. Spec đọc fixture ở runtime, kiểm tra schema/ID trước khi đăng ký test và không chứa inline array đóng vai trò test data.

##### 2.2. Luồng AI-first và human checkpoint

1. Đối chiếu 12 test case đầu vào với hành vi quan sát được của SUT.
2. Chuẩn hóa input/expected vào JSON và tạo runtime validation.
3. Sinh UI helper cho navigation, search, product list, evidence và synchronization.
4. Chạy Chromium smoke để phân biệt test defect với SUT defect.
5. Sửa locator, timeout, network wait và attachment handling.
6. Chạy Chromium/Firefox/Edge, xử lý Firefox sandbox dựa trên probe tối thiểu.
7. Mở HTML report, kiểm chứng `Run by`, timestamp, kết quả và attachment.
8. Phân loại 24 failure instances thành 6 root causes và ánh xạ GitHub Issues.

##### 2.3. Assertion patterns

| Nhóm assertion          | Ví dụ kiểm tra                                                  |
| ----------------------- | --------------------------------------------------------------- |
| DOM / visible content   | product name, empty state, loading indicator, heading           |
| State / attribute       | input value, image `alt`, trạng thái UI sau search              |
| Count / aggregate       | số product card, số `h1`, số kết quả                            |
| Network synchronization | route pending/release, response diagnostic, reject server error |
| Layout / computed DOM   | grid/card structure và content format                           |

DT-010 sử dụng route-before-navigation, pending gate, `waitForResponse`, release trong `finally` và post-response assertions. Cách này bảo đảm test không fail do request bị giữ vô hạn và vẫn chứng minh được SUT thiếu loading indicator trong lúc request pending.

##### 2.4. Kết quả thực thi đa trình duyệt

| Project        | Passed | Failed | Skipped |
| -------------- | -----: | -----: | ------: |
| Chromium       |      4 |      8 |       0 |
| Firefox        |      4 |      8 |       0 |
| Microsoft Edge |      4 |      8 |       0 |
| **Tổng**       | **12** | **24** |   **0** |

Report hiện hành được tạo lúc `09/08/2026 15:28`. Mỗi trình duyệt tái hiện cùng mẫu nghiệp vụ: pass các case `DT-001`, `DT-002`, `DT-005`, `DT-008`; fail tám case còn lại. Artifact report có screenshot, trace, video và error context cho các failure.

#### 3. Human Review và refinement

##### 3.1. Những điểm AI làm chưa đúng

| Vấn đề                                                | Nguyên nhân                                                              | Refinement                                    | Kết quả                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | -------------------------------------------------------- |
| Nhiều soft assertion dùng timeout mặc định nối tiếp   | AI tập trung locator correctness nhưng chưa tính tổng retry time         | Timeout ngắn sau synchronization              | Failure còn đúng nghiệp vụ, không còn test timeout       |
| Loading case có nguy cơ race/deadlock                 | Route và response lifecycle chưa được thiết kế đầy đủ                    | Pending gate, release/unroute trong `finally` | Chạy hết case và giữ đúng evidence pending/post-response |
| Exact HTTP `200` làm Firefox fail khi cache trả `304` | Network status bị dùng như oracle chính                                  | UI count là oracle; HTTP chỉ diagnostic       | Kết quả Firefox khớp Chromium/Edge                       |
| Firefox không tạo được page trong sandbox             | API/browser launch probe chưa đủ để phát hiện tab subprocess restriction | Probe `newPage`, chạy ngoài sandbox phù hợp   | Firefox chạy đủ 12 case, không skip                      |
| Attachment lần đầu không tồn tại trong HTML report    | Chỉ tạo body attachment nhưng chưa lưu file output đúng                  | Lưu evidence vào test output rồi attach       | Report cuối có evidence thật                             |

##### 3.2. Failure classification và bug mapping

| Root cause                                         | GitHub Issue                                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------ |
| Không có empty state khi search không có kết quả   | [#220](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/220) |
| Keyword nguy hiểm không được xử lý như dữ liệu trơ | [#221](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/221) |
| Ảnh sản phẩm có `alt` rỗng                         | [#222](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/222) |
| Giá dùng `VND` thay vì ký hiệu `₫`                 | [#223](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/223) |
| Không có loading indicator                         | [#224](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/224) |
| Trang chủ render hai thẻ `h1`                      | [#225](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/225) |

Tám failed TC-ID cuối đều được phân loại là SUT defect, nhóm thành sáu root causes. Không còn test defect, environment failure hoặc kết quả không xác định trong consolidated report cuối.

#### 4. Evidence và khoảng trống

- Test cases: [`playwrite-test/fr05-search/TEST_CASES.md`](../playwrite-test/fr05-search/TEST_CASES.md)
- Review notes: [`playwrite-test/fr05-search/REVIEW_NOTES.md`](../playwrite-test/fr05-search/REVIEW_NOTES.md)
- Gap analysis: [`ai-gap-analysis/FR-05-search-multibrowser-gap.md`](../ai-gap-analysis/FR-05-search-multibrowser-gap.md)
- Run evidence: [`playwrite-test/fr05-search/evidence/phase-d-run.md`](../playwrite-test/fr05-search/evidence/phase-d-run.md)
- Bug reports: [`bug-reports/FR-05/`](../bug-reports/FR-05/)

Khoảng trống còn lại: build/commit SUT không được public UI/API cung cấp; Firefox cần preflight hoặc runner không chặn tab subprocess khi tái chạy trên host tương tự.

---

## Pool B

### FR-08: Thanh toán (Checkout)

#### 1. Tổng quan

FR-08 dùng hai lớp automation trong cùng report:

- 15 case Playwright request-context kiểm tra checkout contract, order/cart state và validation backend;
- 6 case browser-page kiểm tra route bảo vệ, product/total summary, empty-cart guard, default address, success UI và client-cart cleanup.

Cách trình bày này tách rõ API execution khỏi UI execution. Việc lặp request-context trên ba Playwright projects không được dùng để tuyên bố đã kiểm tra rendering; bằng chứng rendering chỉ đến từ sáu case UI thật.

#### 2. Automation Testing

##### 2.1. Thiết kế và phạm vi tự động hóa

| Thành phần      | API layer                                                         | UI layer                                                                |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Test script     | [`tests/FR-08-checkout.spec.ts`](../tests/FR-08-checkout.spec.ts) | [`tests/FR-08-checkout-ui.spec.ts`](../tests/FR-08-checkout-ui.spec.ts) |
| Fixture         | [`data/FR-08-checkout.json`](../data/FR-08-checkout.json)         | [`data/FR-08-checkout-ui.json`](../data/FR-08-checkout-ui.json)         |
| Case độc lập    | 15                                                                | 6                                                                       |
| Assertion chính | response, order/cart count/state                                  | URL, DOM, attribute, UI network, backend/client postcondition           |

Trong 18 test case đầu vào, hai case giá trị tổng `0`/`1` trùng với case đại diện tương ứng, và case hậu điều kiện xóa giỏ đã nằm trong luồng checkout hợp lệ. Ba case này được truy vết qua case đại diện thay vì tạo automation trùng lặp. Sáu case UI được bổ sung sau human review từ các requirement quan sát được của checkout frontend.

##### 2.2. Luồng AI-first và human checkpoint

1. Rà soát 18 test case đầu vào và gộp ba điểm trùng có case đại diện.
2. Chạy probe API/UI để xác nhận endpoint, product, cart, order và login flow.
3. Tạo fixture JSON và 15 API cases; chạy Chromium smoke.
4. Sửa serial fail-fast, hardcode total, DTO, reject diagnostics và runtime annotations.
5. Chạy ba projects, thêm HTML title có Student ID + display/ISO timestamp.
6. Human review phát hiện suite ban đầu chỉ lặp API; bổ sung sáu browser-page cases.
7. Sửa stale-cart isolation, SPA navigation và Firefox sandbox.
8. Chạy full matrix, redaction trace và quét artifact trước khi public.

##### 2.3. Sáu case UI hiện hành

| ID                   | UI oracle                                                    |
| -------------------- | ------------------------------------------------------------ |
| `FR08-UI-README-001` | Anonymous phải bị chuyển khỏi `/checkout`                    |
| `FR08-UI-README-002` | Product và tổng tiền phải được render từ cart                |
| `FR08-UI-README-003` | Backend cart phải rỗng sau UI checkout thành công            |
| `FR08-UI-README-004` | Cart rỗng không được cung cấp checkout action hoặc tạo order |
| `FR08-UI-README-005` | UI checkout phải dùng default shipping address               |
| `FR08-UI-README-006` | CartContext/DOM phải rỗng sau checkout                       |

Mỗi case UI tạo page thật trên Chromium, Firefox và Edge. Trace được dừng/đính kèm trong `finally`; video dùng `retain-on-failure`. Lần chạy cuối có 18 UI failures nên report chứa đủ 18 trace và 18 video.

##### 2.4. Kết quả thực thi đa trình duyệt

| Project        | API            | UI            | Tổng           |
| -------------- | -------------- | ------------- | -------------- |
| Chromium       | `4P/11F/0S`    | `0P/6F/0S`    | `4P/17F/0S`    |
| Firefox        | `4P/11F/0S`    | `0P/6F/0S`    | `4P/17F/0S`    |
| Microsoft Edge | `4P/11F/0S`    | `0P/6F/0S`    | `4P/17F/0S`    |
| **Tổng**       | **12P/33F/0S** | **0P/18F/0S** | **12P/51F/0S** |

Full run lúc `09/08/2026 19:23` thực thi 63 lượt trong 160.7 giây, exit code `1` do 51 SUT failures. Embedded report xác nhận `Run by: 23127464`, ISO timestamp và `actualWorkers: 1`.

Artifact hiện hành:

- runtime: 51 error contexts, 18 screenshots, 18 videos và 36 ZIP trace gồm file nguồn + attachment;
- HTML report: 17 Markdown, 12 PNG, 18 WebM và 18 ZIP trace;
- 18/18 report trace mở hợp lệ và có `trace.trace`;
- scan sau redaction: 0 JWT, runtime email/password và credential mặc định.

#### 3. Human Review và refinement

##### 3.1. Những điểm AI làm chưa đúng

| Vấn đề                                                 | Nguyên nhân                                                       | Refinement                                       | Kết quả                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| `serial` làm skip case sau failure đầu                 | Nhầm tuần tự hóa với fail-fast                                    | Bỏ serial, giữ một worker và user cô lập         | Chạy đủ 15/15 API case                                          |
| Reject branch dừng ở assertion đầu                     | Hard assertion thiếu chẩn đoán side effect                        | Dùng soft assertions cho response và order count | Hiện rõ cả response sai và order tạo ngoài ý muốn               |
| Suite ban đầu API-only nhưng được gọi là multi-browser | AI bám test design backend và bỏ qua rendering requirement        | Bổ sung 6 UI cases dùng `page`                   | 18 browser-page executions thật                                 |
| UUID user vẫn có thể nhận stale cart                   | Database reset tái sử dụng ID trong khi cart nằm ở process memory | Chỉ nhận runtime user sau khi xác nhận cart rỗng | Không còn stale-cart precondition failure                       |
| `page.goto('/checkout')` tạo pass giả                  | Reload remount `CartProvider` và làm mất client state             | Điều hướng qua link/button trong SPA             | Tái hiện đúng cart UI không được xóa                            |
| Login locator theo vị trí dễ vỡ                        | SUT thiếu label/name/id/test-id                                   | Scope đúng form, assert hai input rồi dùng `nth` | Login ổn định trên 3/3 browsers, nhưng fragility được công khai |
| Trace chứa token/credential                            | Playwright giữ network/context resource ngoài oracle cần thiết    | Script redaction ZIP và scan hậu xử lý           | Report public-safe, trace vẫn mở được                           |

##### 3.2. Failure classification và bug mapping

| Root cause                                  | GitHub Issue                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| Backend tin `total_amount` do client gửi    | [#226](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/226) |
| Cart không được xóa sau checkout            | [#227](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/227) |
| Chấp nhận địa chỉ rỗng khi không có default | [#228](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/228) |
| Không dùng default address                  | [#229](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/229) |
| Cart rỗng vẫn checkout và tạo order         | [#230](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/230) |
| Route checkout không được bảo vệ            | [#231](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/231) |
| Checkout UI không render product list       | [#232](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/232) |
| Total UI bằng 0 và chỉnh trực tiếp được     | [#233](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/233) |

17 case độc lập fail trên mỗi project và được nhóm thành tám root causes. Ba UI case bổ sung ánh xạ root cause đã có về cart cleanup, default address và empty cart nên không tạo bug report trùng.

#### 4. Evidence và khoảng trống

- Test cases: [`playwrite-test/FR-08-checkout/TEST_CASES.md`](../playwrite-test/FR-08-checkout/TEST_CASES.md)
- Review notes: [`playwrite-test/FR-08-checkout/REVIEW_NOTES.md`](../playwrite-test/FR-08-checkout/REVIEW_NOTES.md)
- Gap analysis: [`ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md`](../ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md)
- UI run evidence: [`playwrite-test/FR-08-checkout/evidence/ui-refinement-run.md`](../playwrite-test/FR-08-checkout/evidence/ui-refinement-run.md)
- Trace redaction: [`scripts/redact-fr08-traces.ps1`](../scripts/redact-fr08-traces.ps1)
- Bug reports: [`bug-reports/FR-08/`](../bug-reports/FR-08/)

Khoảng trống được công khai: `DT-012` chỉ xác minh API lưu/trả payload dạng string; checkout UI không có control/render path tương ứng nên không tuyên bố đã chứng minh khả năng chống stored XSS khi render.

---

## Pool C

### FR-12: Kiểm soát truy cập (Access Control)

#### 1. Tổng quan

FR-12 được tự động hóa theo mô hình hybrid Web Admin UI + API. Cả 40 case đều mở browser page để kiểm tra cổng truy cập ứng với bốn trạng thái auth: không token, token sai, user và admin. Sau đó direct API assertions kiểm chứng sâu việc backend thực thi authentication/authorization trên từng endpoint.

Mô hình hybrid phù hợp vì UI không expose đầy đủ mọi mutation endpoint cần kiểm tra, trong khi chỉ gọi API sẽ không đáp ứng mục tiêu automation web frontend và không chứng minh browser access behavior.

#### 2. Automation Testing

##### 2.1. Thiết kế và phạm vi tự động hóa

| Thành phần      | Giá trị                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Test script     | [`tests/fr12-access.spec.ts`](../tests/fr12-access.spec.ts)                                                             |
| Data fixture    | [`data/fr12-access.json`](../data/fr12-access.json)                                                                     |
| Số case độc lập | 40/40                                                                                                                   |
| Kiểu thực thi   | Hybrid browser page + direct API                                                                                        |
| Projects        | Chromium, Firefox, Microsoft Edge                                                                                       |
| Config          | [`playwright.fr12.config.ts`](../playwright.fr12.config.ts)                                                             |
| Report          | [`playwrite-test/fr12-access/playwright-report/index.html`](../playwrite-test/fr12-access/playwright-report/index.html) |

Fixture lưu TC-ID, endpoint/method, auth state, UI expectation, API expected status và root-cause tags. Tài khoản test mặc định được khai báo trong fixture theo README của SUT để người chạy không phụ thuộc cấu trúc thư mục source cục bộ.

##### 2.2. Luồng AI-first và human checkpoint

1. Đọc và chuẩn hóa 40 case access-control theo endpoint, method và auth state.
2. Tạo fixture JSON và runtime schema validation.
3. Sinh API assertions cho status/body/count/property; chạy Chromium smoke.
4. Sửa serial fail-fast, cleanup order, timeout và worker concurrency.
5. Human review phát hiện API-only gap; bổ sung Web Admin page gate cho cả 40 case.
6. Thêm config riêng ba browsers, Firefox sandbox workaround và report metadata.
7. Chạy full matrix một worker để tránh reset race giữa projects.
8. Phân loại 51 failure instances thành bốn SUT root causes và tạo Issue evidence.

##### 2.3. Assertion patterns

| Nhóm assertion            | Nội dung                                            |
| ------------------------- | --------------------------------------------------- |
| UI access / visibility    | URL, login/admin gate, visible state theo auth role |
| Network / direct response | expected status và response contract cho endpoint   |
| Count / aggregate         | số record trước/sau mutation hoặc cleanup           |
| Object property           | field/role/status của response object               |

UI assertion chứng minh hành vi ở browser entry point; API assertion xác nhận enforcement thật ở backend. Một UI redirect đúng không được dùng để che việc endpoint vẫn chấp nhận request trái quyền.

##### 2.4. Kết quả thực thi đa trình duyệt

| Project        | Passed | Failed | Skipped |
| -------------- | -----: | -----: | ------: |
| Chromium       |     23 |     17 |       0 |
| Firefox        |     23 |     17 |       0 |
| Microsoft Edge |     23 |     17 |       0 |
| **Tổng**       | **69** | **51** |   **0** |

Report hiện hành được tạo lúc `09/08/2026 20:11`. Cả ba project tái hiện cùng taxonomy `23P/17F/0S`; không còn environment/test failure trong kết quả cuối. Report có 51 failure error contexts và screenshot; trace/video tắt vì flow auth/API có thể giữ token và credential.

#### 3. Human Review và refinement

##### 3.1. Những điểm AI làm chưa đúng

| Vấn đề                                  | Nguyên nhân                                             | Refinement                                 | Kết quả                           |
| --------------------------------------- | ------------------------------------------------------- | ------------------------------------------ | --------------------------------- |
| Serial mode làm fail-fast               | Nhầm state isolation với yêu cầu chạy đủ case           | Bỏ serial, giữ một worker                  | 40/40 case/project được thực thi  |
| API-only không chứng minh web frontend  | AI tối ưu contract backend                              | Bổ sung Web Admin page cho bốn auth states | 120 browser-page executions thật  |
| Ba projects reset backend đồng thời     | `fullyParallel: false` không khóa worker xuyên projects | `workers: 1` ở config                      | Loại bỏ reset race                |
| Soft visible-text assertion kéo dài run | Web-first retry mặc định quá dài cho mismatch đã biết   | Timeout UI assertion 500 ms                | 40 case Chromium hoàn tất ổn định |
| Firefox launch được nhưng `newPage` lỗi | Smoke API không tạo page nên bỏ sót sandbox             | Disable content sandbox riêng Firefox      | Firefox chạy đủ 40 case           |
| Trace lưu login payload/JWT             | Chính sách failure trace không phù hợp auth flow        | Tắt trace và rerun report                  | 0 trace/JWT trong report cuối     |

##### 3.2. Failure classification và bug mapping

| Root cause                                          | TC-ID độc lập | GitHub Issue                                                             |
| --------------------------------------------------- | ------------: | ------------------------------------------------------------------------ |
| Product mutation API thiếu auth middleware          |             6 | [#234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234) |
| Admin API không từ chối token role user             |             7 | [#235](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/235) |
| Category mutation API không từ chối token role user |             3 | [#236](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/236) |
| Invalid token trả `403` thay vì `401`               |             1 | [#238](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/238) |

17 failed case trên mỗi project ánh xạ đúng bốn root causes. Các harness defect và environment issue đã được sửa/rerun trước khi tạo artifact cuối nên không được tính là lỗi SUT.

#### 4. Evidence và khoảng trống

- Test cases: [`playwrite-test/fr12-access/TEST_CASES.md`](../playwrite-test/fr12-access/TEST_CASES.md)
- Review notes: [`playwrite-test/fr12-access/REVIEW_NOTES.md`](../playwrite-test/fr12-access/REVIEW_NOTES.md)
- Gap analysis: [`ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md`](../ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md)
- Run evidence: [`playwrite-test/fr12-access/evidence/phase-d-run.md`](../playwrite-test/fr12-access/evidence/phase-d-run.md)
- Bug reports: [`bug-reports/FR-12/`](../bug-reports/FR-12/)

---

## Tổng hợp Human Review toàn bài

### Các nguyên tắc đã áp dụng

- Không thay expected theo actual chỉ để làm test pass.
- Tách test defect, environment issue và SUT defect trước khi lập bug report.
- Chỉ đếm bug theo root cause, không đếm lặp từng browser failure.
- Data/expected nằm ngoài spec và được validate trước khi collect test.
- UI oracle được ưu tiên cho hành vi hiển thị; API dùng cho enforcement/state không thể quan sát đầy đủ ở UI.
- Mọi report phải đến từ lần chạy thật, hiển thị Student ID và ISO timestamp.
- Trace/video chỉ được giữ khi phù hợp và phải quét credential/token trước khi public.
- Case không tự động hóa riêng phải có mapping và lý do; không tuyên bố coverage vượt bằng chứng.

### Những bài học chính khi cộng tác với AI

1. AI có thể tạo nhanh coverage rộng nhưng dễ nhầm một API suite chạy trên nhiều project với kiểm thử đa trình duyệt thực sự.
2. Navigation trông tương đương ở mức URL có thể làm thay đổi state của SPA và tạo pass giả.
3. UUID không đủ bảo đảm data isolation khi database và in-memory state có vòng đời khác nhau.
4. Reporter/trace cần được kiểm tra như một sản phẩm đầu ra; chỉ cấu hình metadata hoặc attachment không bảo đảm chúng xuất hiện an toàn trong HTML report.
5. Browser launch thành công không đồng nghĩa page/context hoạt động trong sandbox; cần probe tối thiểu tại đúng abstraction mà test sử dụng.
6. Human reviewer chịu trách nhiệm giữ expected, giải thích gap và phân biệt lỗi harness với lỗi SUT.

## Demo và Agent Skill

- Agent Skill: [`ai-first-playwright-testing/SKILL.md`](../ai-first-playwright-testing/SKILL.md)
- Agent Skill demo: [YouTube](https://youtu.be/qVDBxyQzNwg)
