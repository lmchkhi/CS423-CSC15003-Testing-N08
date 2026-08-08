# Review Notes — FR-05: Xem danh sách & Tìm kiếm sản phẩm

## Thông tin lần review

| Mục | Giá trị |
| --- | --- |
| Phase | C — Fix 1 data-driven, locator, assertion và mapping bề mặt |
| Feature | `FR-05` |
| Mã sinh viên | `23127464` |
| HW02 | `tests/test-cases/FR-05-search/domain-testing/` — 12 file |
| Manual run tham khảo | `tests/test-runs/FR-05-search-run.md` |
| Requirement công khai | `src/eshop-sut/README.md`, mục FR-05 |
| Frontend Web | `http://localhost:5173` |
| Backend API | `http://localhost:3000` |
| Thời điểm quan sát | `2026-08-08T20:58:25+07:00` |
| Thời điểm ghi nhận quyết định | `2026-08-08T21:07:11+07:00` |
| Trình duyệt probe | Chromium `151.0.7922.34`, headless, viewport chính `1440×900` |
| Kết quả kết nối | Frontend `/` → HTTP 200; API `/api/products` → HTTP 200 |
| Playwright spec / fixture / config | Phase C Fix 1: `tests/fr05-search.spec.ts` + `data/fr05-search.json`; interface và runtime validation trong spec; không đổi config |
| Trạng thái checkpoint | Đã duyệt Checkpoint A lúc `2026-08-08T21:13:37+07:00` |

## Ranh giới hộp đen và cách dùng bằng chứng

- Chỉ đọc requirement công khai, test case HW02, manual run, workflow/template và quan sát SUT qua UI, accessibility tree, URL, DOM/CSS computed style và request/response công khai.
- Không đọc source triển khai, middleware, validation logic hoặc database schema. “Toàn bộ sản phẩm” chỉ được đối chiếu với danh sách công khai từ `GET /api/products`, không suy ra từ database nội bộ.
- Kết quả manual ngày `2026-06-27` chỉ là tài liệu tham khảo lịch sử, không được dùng thay bằng chứng mới.
- UI là oracle chính cho nội dung, trạng thái, layout và DOM người dùng quan sát được. Network chỉ hỗ trợ xác nhận dữ liệu, đồng bộ hoặc chẩn đoán, trừ phần status/body bảo mật vốn là điểm quan sát trực tiếp của DT-006/DT-007.
- Hai lần probe harness không tạo bằng chứng đã thất bại trước khi kiểm tra case: locator tiếng Việt bị PowerShell đổi encoding (exit 1) và regex ký hiệu `₫` bị đổi encoding (exit 1). Cả hai được chạy lại bằng Unicode escape/locator công khai; các lần chạy lại exit 0.

## Requirement FR-05 công khai

Requirement yêu cầu: trang chủ hiển thị toàn bộ sản phẩm dạng grid; mỗi card có ảnh đúng tỷ lệ và alt mô tả, tên, giá dùng `₫` và phân cách hàng nghìn; tìm theo tên và hiển thị từ khóa an toàn; có loading; có empty state khi không có kết quả; trang chỉ có đúng một `<h1>`.

## Dữ liệu mẫu, flow và locator khả dụng

### Dữ liệu công khai quan sát được

`GET /api/products` trả HTTP 200 và đúng 5 sản phẩm: `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2`, `Bàn phím cơ Keychron Q1`. Tất cả có giá từ `4,000,000` trở lên; đủ precondition cho kiểm tra danh sách, grid, card và format hàng nghìn.

- Không có sản phẩm tên chứa `Áo`; precondition theo test data của DT-002 hiện không thỏa.
- Có một sản phẩm tên chứa `Iphone` theo đối sánh không phân biệt hoa/thường: `iPhone 15 Pro Max`; flow theo steps/expected của DT-002 có dữ liệu để chạy.
- Có 5 sản phẩm nên DT-008 có thể kiểm tra nhiều cột và DT-009/DT-012 có thể kiểm tra ít nhất 3 card.

### Flow và locator

| Bề mặt | Quan sát / locator khả dụng | Vai trò đề xuất |
| --- | --- | --- |
| Trang chính | `getByRole('main')` — đúng 1 | Scope UI chính |
| Thanh tìm kiếm | `getByRole('textbox')` — đúng 1; accessible name lấy từ placeholder `Tìm kiếm...` | Nhập input; nên ưu tiên role, có thể bổ sung exact accessible name khi encoding ổn định |
| Nút tìm | `getByRole('button', { name: 'Tìm' })` — đúng 1 | Submit thay cho Enter hoặc dùng Enter theo test step |
| Tên sản phẩm | `getByRole('heading', { level: 2 })` — 5 ở danh sách ban đầu | Oracle danh sách/tên; scope card từ heading lên container gần nhất |
| Card sản phẩm | Không quan sát thấy role `article`/`listitem` hoặc test id công khai | Chưa có locator card độc lập theo role; dùng heading level 2 rồi scope ancestor, ghi nhận rủi ro locator |
| Giá | Text trong cùng container với heading sản phẩm, ví dụ `30,000,000 VND` | Oracle UI; không dùng API làm oracle chính cho format hiển thị |
| Ảnh | 5 thẻ `img`, nhưng tất cả `alt=""` | Oracle DOM/UI; request ảnh ngoài `placehold.co` bị môi trường probe chặn nên chưa kết luận HTTP ảnh |
| Heading cấp 1 | `getByRole('heading', { level: 1 })` trả 2 khi có sản phẩm | Oracle DOM/accessibility cho case h1 |
| Network sản phẩm | `GET http://localhost:3000/api/products?search=...` | Bổ trợ dữ liệu/synchronization; riêng DT-006/007 còn dùng status/body để quan sát lỗi bảo mật |

## 1. Đối chiếu HW02 với requirement và SUT thật

Các trường gốc dưới đây được ghi lại theo file HW02; không file test case nào bị sửa.

| TC-ID theo filename | Mô tả gốc / precondition / input / expected ban đầu | Quan sát thực tế mới | Trạng thái | `automationSurface` | Bằng chứng | Đề xuất xử lý |
| --- | --- | --- | --- | --- | --- | --- |
| `TC-FR05-DT-001` | **Tìm kiếm với từ khóa rỗng (Domain Testing).** Precondition: SUT hoạt động, có ít nhất 1 sản phẩm, đã vào trang chủ. Input: `""`. Expected: hiển thị toàn bộ sản phẩm, không lọc/giới hạn, không lỗi, không crash. | Submit input rỗng giữ URL UI ở `/`; request `?search=` trả 200 với 5 sản phẩm; UI/ARIA hiển thị đủ 5 tên, không có page error hay lỗi hệ thống. | **Khớp** | **UI+network** — UI primary; API chỉ đối chiếu danh sách công khai | E-A-01, E-A-02, E-A-03 | Giữ nguyên expected. Requirement FR-05 không nói rõ semantics của blank search, nhưng actual khớp expected HW02. |
| `TC-FR05-DT-002` | **Tìm kiếm từ khóa hợp lệ có kết quả (Domain Testing).** Nội dung HW02 gốc được giữ nguyên trong file: precondition/test data/domain matrix dùng `Áo`, còn steps 4–7 và Expected result dùng `Iphone`. | Người dùng đã chọn `Iphone` làm input/expected canonical. Lần chạy thật với `Iphone`: API 200 trả 1 sản phẩm `iPhone 15 Pro Max`; UI/ARIA hiển thị đúng 1 card, tên chứa `Iphone` khi so sánh không phân biệt hoa/thường, hiện đúng từ khóa và không có lỗi hệ thống. | **Khớp** | **UI+network** — UI primary; API bổ trợ xác nhận dữ liệu mẫu | E-A-01, E-A-03, I-A-01 | **Đã duyệt:** dùng `Iphone`. Chưa sửa file HW02 trong Phase A; nếu được duyệt sang Phase B sẽ đồng bộ precondition/test data/domain matrix với quyết định này và lưu trace nội dung cũ. |
| `TC-FR05-DT-003` | **Tìm kiếm từ khóa không có kết quả (Domain Testing).** Precondition: không sản phẩm nào chứa `xyznoexist123`. Input: `"xyznoexist123"`. Expected: empty state phù hợp, danh sách trống, không lỗi 500/exception/crash. | API 200 `[]`; UI/ARIA không có product heading nhưng chỉ hiện `Kết quả tìm kiếm cho: xyznoexist123`, không có thông báo empty state. Không có lỗi hệ thống. | **Lệch** | **UI+network** — empty state phải dùng UI làm oracle; API chỉ xác nhận response rỗng | E-A-03 | Giữ nguyên expected; actual khác expected và khác requirement FR-05. Không tự sửa expected theo actual. |
| `TC-FR05-DT-004` | **Tìm kiếm từ khóa có ký tự đặc biệt (Domain Testing).** Precondition: SUT hoạt động, đã vào trang chủ. Input: `"Áo @#$%"`. Expected: xử lý an toàn; trả kết quả phù hợp hoặc empty state; không 500/exception/crash/redirect. | Input UI giữ đủ `Áo @#$%`, nhưng request quan sát được chỉ là `?search=%C3%81o%20@` (phần từ `#` không nằm trong query gửi tới API); API 200 `[]`. UI hiện từ khóa đầy đủ, không crash/redirect/lỗi hệ thống nhưng không có empty state. | **Lệch** | **UI+network** — UI primary; network chẩn đoán URL/query thực gửi | E-A-03 | Giữ nguyên expected. Ở Phase B cần chốt nhánh duy nhất theo requirement: với kết quả rỗng phải có empty state; đồng thời giữ assertion về input/URL encoding. |
| `TC-FR05-DT-005` | **Tìm kiếm chỉ khoảng trắng (Domain Testing).** Precondition: SUT hoạt động, có ít nhất 1 sản phẩm, đã vào trang chủ. Input: 3 dấu cách. Expected: trim như chuỗi rỗng hoặc kết quả phù hợp; có thể hiện toàn bộ; không lỗi/crash/treo. | Input DOM vẫn có 3 dấu cách; request thực là `?search=`; API trả 5 sản phẩm; UI/ARIA hiển thị đủ 5 card, không lỗi hệ thống. | **Khớp** | **UI+network** — UI primary; network xác nhận trim/query | E-A-03 | Giữ nguyên expected; nếu vào Phase B, chốt nhánh observed là trim về query rỗng và hiển thị toàn bộ. |
| `TC-FR05-DT-006` | **Tìm kiếm với XSS Payload (Domain Testing).** Precondition: SUT hoạt động, đã vào trang chủ, có DevTools để kiểm tra DOM. Input: `<script>alert('XSS')</script>`. Expected: plain text/escaped, không alert, không script inject, không crash/redirect, không lỗi bảo mật. | Không có dialog; textbox/ARIA giữ payload dưới dạng giá trị text và DOM không có script chứa payload. Tuy nhiên request trả HTTP 500, body `Database Error` / `SQLITE_ERROR: near "XSS": syntax error`; UI hiển thị raw database error và có 3 heading level 1. | **Lệch** | **UI+network** — UI/DOM primary cho XSS; status/body network là oracle trực tiếp cho lỗi 500/rò rỉ | E-A-03 | Giữ nguyên expected. Không chuyển API-only: điểm chính vẫn gồm dialog, DOM và nội dung UI người dùng thấy. |
| `TC-FR05-DT-007` | **Tìm kiếm với SQL Injection Payload (Domain Testing).** Precondition: SUT hoạt động, đã vào trang chủ, biết số lượng sản phẩm để so sánh. Input: `' OR '1'='1' --`. Expected: không trả toàn bộ bất thường, empty/rỗng, không 500/DB error/stack trace/crash/redirect, không lộ thông tin nhạy cảm. | Danh sách công khai chuẩn có 5 sản phẩm. Payload trả HTTP 200 với đúng cả 5 sản phẩm; UI/ARIA cũng hiển thị cả 5 và payload. Không có lỗi 500, nhưng kết quả trái với expected không trả toàn bộ. | **Lệch** | **UI+network** — UI primary cho danh sách; network đối chiếu count/body và chẩn đoán | E-A-01, E-A-03 | Giữ nguyên expected. `SEC-05` được test case dẫn chiếu nhưng không nằm trong mục FR-05 README đã cung cấp; cần giữ traceability này như scope HW02, không suy ra từ source. |
| `TC-FR05-DT-008` | **UI-1: Danh sách sản phẩm hiển thị dạng grid (Domain Testing).** Precondition: SUT hoạt động, có ít nhất 2 sản phẩm, browser hỗ trợ grid/flex. Input: URL `http://localhost:5173`. Expected: nhiều cột, container grid hoặc flex-wrap, không phải list 1 cột ở desktop, responsive khi đổi viewport. | Ở `1440×900`, computed `display:grid`, 3 cột (`314.656/314.672/314.656px`) và card ở 3 tọa độ x. Ở `500×900`, grid đổi thành 1 cột `468px`; class/DOM cùng container, không crash. | **Khớp** | **UI** — layout/computed style/viewport là oracle UI | E-A-04 | Giữ nguyên expected. Không cần API làm oracle; chỉ cần dữ liệu công khai có ≥2 sản phẩm để thỏa precondition. |
| `TC-FR05-DT-009` | **UI-2: Card sản phẩm hiển thị đầy đủ Ảnh + Tên + Giá (Domain Testing).** Precondition: SUT hoạt động, có ít nhất 1 sản phẩm đủ ảnh/tên/giá. Input: URL trang chủ. Expected: mỗi card có ảnh `src` hợp lệ/không 404, tỷ lệ đúng, alt theo requirement, tên không rỗng, giá có `₫`, cấu trúc nhất quán; kiểm ít nhất 3 card. | 5 card đều có `img`, heading tên và giá có phân cách hàng nghìn, cấu trúc nhất quán. Nhưng cả 5 `alt=""`; giá đều dùng `VND`, không có `₫`. Request ảnh ngoài `placehold.co` bị môi trường probe chặn (`ERR_NETWORK_ACCESS_DENIED`, `naturalWidth=0`), nên chưa xác định ảnh có HTTP 404 hay tỷ lệ nguồn thực. | **Lệch** | **UI+network** — UI/DOM primary; network ảnh chỉ bổ trợ xác nhận tải ảnh | E-A-02, E-A-04, U-A-01 | Giữ nguyên expected. Lệch đã đủ căn cứ từ alt rỗng và currency sai; không quy lỗi ảnh không tải cho SUT khi môi trường chặn host ngoài. |
| `TC-FR05-DT-010` | **UI-4: Trạng thái loading khi đang tải dữ liệu (Domain Testing).** Precondition: SUT hoạt động, DevTools có network throttling. Input: URL trang chủ + `Slow 3G`. Expected: indicator rõ trong lúc API pending, biến mất khi xong và danh sách thay thế; không để trang trắng/không phản hồi. | Giữ request `/api/products?search=` ở trạng thái pending bằng network interception công khai: main chỉ có heading, textbox, nút; 0 sản phẩm; không có text/class spinner/skeleton, role status hoặc `aria-busy=true`. Sau khi thả request 200, 5 card xuất hiện. | **Lệch** | **UI+network** — UI là oracle; network chỉ tạo pending state và đồng bộ | E-A-05 | Giữ nguyên expected. Không dùng response API làm oracle cho loading; assertion phải quan sát indicator trong UI. |
| `TC-FR05-DT-011` | **Filename là DT-011 nhưng comment/heading/domain matrix bên trong là `TC-FR05-DT-012`: UI-6: Trang chủ có đúng 1 thẻ h1.** Precondition: SUT hoạt động, có DevTools. Input: URL trang chủ. Expected: đúng 1 h1, nội dung có nghĩa mô tả trang. | Với 5 sản phẩm, DOM và accessibility tree có 2 h1: `Danh sách sản phẩm` và `Hiển thị 5 sản phẩm`. Nội dung h1 đầu mô tả trang, nhưng count bằng 2. | **Lệch** | **UI** — DOM/accessibility là oracle chính | E-A-02, E-A-04, I-A-02 | **Đã duyệt:** filename/manual run là canonical; `DT-011` là case h1. Giữ nguyên expected và chưa sửa comment/heading/domain matrix trong Phase A. |
| `TC-FR05-DT-012` | **Filename là DT-012 nhưng comment/heading/domain matrix bên trong là `TC-FR05-DT-014`: UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn.** Precondition: SUT hoạt động, có giá ≥1.000. Input: URL trang chủ. Expected: mọi giá có `₫`, có `.` hoặc `,` phân cách hàng nghìn, nhất quán; kiểm ít nhất 3 card/mức giá. | 5/5 giá có phân cách hàng nghìn và nhất quán (`30,000,000 VND` … `4,000,000 VND`) nhưng dùng `VND`, không dùng `₫`. | **Lệch** | **UI** — text format người dùng nhìn thấy là oracle chính | E-A-02, E-A-04, I-A-02 | **Đã duyệt:** filename/manual run là canonical; `DT-012` là case format giá. Giữ nguyên expected và chưa sửa comment/heading/domain matrix trong Phase A. |

### Tổng hợp phân loại

| Trạng thái | Số case | TC-ID |
| --- | ---: | --- |
| Khớp | 4 | DT-001, DT-002, DT-005, DT-008 |
| Lệch | 8 | DT-003, DT-004, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012 |
| Không xác định | 0 | Không có |
| Trùng lặp | 0 | Không có |

Không có cặp nào thỏa đồng thời “cùng input + cùng precondition + cùng kết quả thực chất”, nên không chọn case đại diện. DT-009 và DT-012 cùng chạm vào ký hiệu giá nhưng không trùng: DT-009 kiểm cấu trúc card/ảnh/alt/tên/giá, còn DT-012 kiểm riêng currency và phân cách hàng nghìn; precondition và expected thực chất khác nhau.

## 2. Bằng chứng quan sát thật

### E-A-01 — Kết nối và dataset công khai

- `http://localhost:5173/` → HTTP 200, `text/html`, body length 632.
- `http://localhost:3000/api/products` → HTTP 200, JSON gồm 5 sản phẩm IDs 1–5.
- Đây là baseline công khai để so sánh count/names; không truy cập database/schema.

### E-A-02 — UI, accessibility và URL ban đầu

- Navigation frontend → HTTP 200; URL sau tải và sau submit vẫn là `http://localhost:5173/`.
- Accessibility main: 1 textbox `Tìm kiếm...`, 1 button `Tìm`, 5 heading level 2 là tên sản phẩm, 2 heading level 1.
- DOM: 5 `img` đều có `alt=""`; 5 giá dùng `VND`; không có `₫`.
- 5 request ảnh `placehold.co` bị Chromium báo `ERR_NETWORK_ACCESS_DENIED`; đây là giới hạn môi trường probe, không dùng để kết luận SUT trả 404.

### E-A-03 — Ma trận tìm kiếm UI + network

| Case/input | Request thực | Status/body công khai | UI/ARIA sau submit |
| --- | --- | --- | --- |
| DT-001 `""` | `?search=` | 200, 5 sản phẩm | 5 product headings; không lỗi |
| DT-002 `Áo` | `?search=%C3%81o` | 200, `[]` | 0 card; chỉ có `Kết quả tìm kiếm cho: Áo` |
| DT-002 `Iphone` | `?search=Iphone` | 200, 1 sản phẩm | 1 card `iPhone 15 Pro Max`; hiện từ khóa |
| DT-003 `xyznoexist123` | `?search=xyznoexist123` | 200, `[]` | 0 card; không có empty-state message |
| DT-004 `Áo @#$%` | `?search=%C3%81o%20@` | 200, `[]` | 0 card; UI vẫn hiện đủ input; không empty state |
| DT-005 3 spaces | `?search=` | 200, 5 sản phẩm | 5 card; hiện nhãn kết quả nhưng không lỗi |
| DT-006 XSS | encoded payload đầy đủ | 500, raw `Database Error` / SQLite syntax error | Không alert, không script inject; UI hiển thị raw DB error |
| DT-007 SQLi | encoded payload đầy đủ | 200, 5 sản phẩm | 5 card, tức toàn bộ baseline công khai |

### E-A-04 — Grid, card, price và heading

- Desktop `1440px`: container computed `display:grid`, 3 cột; 5 card phân bố 3 + 2.
- Mobile `500px`: cùng container đổi thành 1 cột; xác nhận responsive.
- Giá quan sát: `30,000,000 VND`, `28,000,000 VND`, `45,000,000 VND`, `6,000,000 VND`, `4,000,000 VND`.
- H1 quan sát: `Danh sách sản phẩm`, `Hiển thị 5 sản phẩm`.

### E-A-05 — Loading state

- Dùng route interception chỉ để giữ request công khai ở trạng thái pending, không sửa response.
- Trong lúc pending: 0 product heading; không spinner/skeleton/loading text, không role `status`, không `aria-busy=true`; accessibility main chỉ có heading, textbox và nút.
- Sau release: response 200; 5 product headings xuất hiện.

## 3. Bất nhất cần người dùng quyết định

### I-A-01 — DT-002: `Áo` hay `Iphone` — Đã quyết định

- Domain matrix, precondition và Test data: `Áo`.
- Steps và Expected result: `Iphone`.
- Dataset hiện tại: `Áo` không thỏa precondition; `Iphone` trả `iPhone 15 Pro Max`.
- **Quyết định của người dùng:** chọn `Iphone` làm input/expected canonical.
- Căn cứ actual: `Iphone` trả đúng `iPhone 15 Pro Max` trên API và UI; DT-002 được đổi từ `Không xác định` thành `Khớp` trong bảng review. File HW02 gốc vẫn chưa bị sửa trong Phase A.

### I-A-02 — Filename và heading của hai file cuối — Đã quyết định

- `TC-FR05-DT-011.md` có comment + heading + domain matrix là DT-012.
- `TC-FR05-DT-012.md` có comment + heading + domain matrix là DT-014.
- Manual run dùng DT-011 cho case h1 và DT-012 cho case format giá, khớp filename/mô tả danh sách.
- **Quyết định của người dùng:** lấy filename/manual run làm canonical: `DT-011` = h1, `DT-012` = format giá.
- Phase A chỉ ghi nhận mapping; chưa đổi comment, heading, domain matrix, filename hay expected trong test case HW02.

## 4. Điểm chưa rõ và giới hạn

1. I-A-01 và I-A-02 đã được người dùng quyết định; không còn là điểm chưa rõ.
2. Chưa xác định ảnh ngoài `placehold.co` có trả HTTP 404 hoặc tỷ lệ nguồn thực vì network sandbox chặn host; alt rỗng và currency `VND` vẫn là bằng chứng UI độc lập đủ để DT-009 lệch.
3. DT-004 cho phép expected nhiều nhánh; requirement FR-05 quy định rõ khi kết quả rỗng phải có empty state, nên đề xuất Phase B chốt nhánh này sau duyệt.
4. Probe Phase A chạy trên Chromium headless duy nhất; multi-browser thuộc Phase D, không suy diễn kết quả cho Firefox/Edge.
5. `debug.log` là file untracked dài 2.970 byte, xuất hiện trong workspace lúc `20:56:07`, trùng khoảng thời gian probe XSS DT-006. Trong FR-05, nó **không phải chức năng nghiệp vụ**, không phải precondition/input/expected, không được dùng làm oracle và không phải output bắt buộc. Tên file và thời điểm chỉ cho thấy khả năng đây là log chẩn đoán; file không được đọc. Theo quyết định của người dùng, file đã được xóa lúc chuyển Phase B; kiểm tra sau xóa trả `EXISTS_AFTER=False`.
6. Người dùng xác nhận `localhost:5173/:3000` là môi trường test cô lập, không phải production, tại `2026-08-08T21:24:26+07:00`. Xác nhận này cho phép đưa DT-006/DT-007 vào suite chạy lặp lại ở Phase C/D khi các checkpoint tương ứng được duyệt.
7. Với DT-009, người dùng xác nhận các URL `placehold.co` là ảnh sản phẩm chủ đích, không phải trạng thái sản phẩm thiếu ảnh. Network ảnh chỉ diagnostic; UI/DOM là oracle chính và alt/currency vẫn được kiểm theo FR-05.

## 5. File đã đọc hoặc thay đổi

### Đã đọc

- `ai-first-playwright-testing/SKILL.md`
- `ai-first-playwright-testing/assets/templates/ai-audit-entry.md`
- `ai-first-playwright-testing/assets/templates/review-notes.md`
- `tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-001.md` đến `TC-FR05-DT-012.md` — đủ 12/12 file
- `tests/test-runs/FR-05-search-run.md`
- `src/eshop-sut/README.md`, chỉ mục FR-05
- `reports/ai-audit-report.md` để nối audit; `reports/fr05-search/REVIEW_NOTES.md` được kiểm tra là chưa tồn tại trước Phase A

### Đã thay đổi/tạo

- `reports/ai-audit-report.md` — nối entry cho lượt Phase A FR-05
- `reports/fr05-search/REVIEW_NOTES.md` — tạo bảng đối chiếu và bằng chứng Phase A này
- `debug.log` — đã xóa theo yêu cầu người dùng; file không được đọc, target đã xác minh nằm trong workspace, sau xóa `EXISTS_AFTER=False`

### Không đọc / không tạo

- Không đọc source triển khai, middleware, validation logic hoặc database schema.
- Không tạo `tests/*.spec.ts`, fixture trong `data/`, hoặc Playwright config.
- Không tạo bug report hoặc tự sửa expected/test case HW02 trong Phase A.

## Checkpoint A

- Kết quả sau quyết định: **4 Khớp, 8 Lệch, 0 Không xác định, 0 Trùng lặp**.
- Đã duyệt: I-A-01 dùng `Iphone`; I-A-02 dùng filename/manual run làm canonical (`DT-011` = h1, `DT-012` = format giá).
- Quyết định bổ sung: xóa `debug.log`; đã thực hiện và xác minh file không còn tồn tại.
- Trạng thái: **Đã duyệt**.
- Bằng chứng duyệt: prompt `xóa debug.log và tôi approved, continue phase B` lúc `2026-08-08T21:13:37+07:00`.
- Đã chuyển sang Phase B; không thay đổi expected ngoài các quyết định đã duyệt.

## 6. Phase C — Playwright Chromium baseline

### Artifact và phạm vi

- Spec: `tests/fr05-search.spec.ts`, bao phủ đủ 12 TC-ID canonical.
- Case data: inline trong spec theo chỉ dẫn người dùng cho phiên bản khởi tạo; chưa tạo fixture ngoài.
- Bề mặt: 9 UI+network, 3 UI; UI là oracle chính cho nội dung/state/layout/DOM.
- Browser: Chromium baseline, 1 worker; chưa chạy Firefox/Edge.
- Evidence: `reports/fr05-search/evidence/phase-c-run.md`.
- Runtime artifact: `test-results/fr05-phase-c/`.

### Lệnh và kết quả cuối

| Command | Exit code | Kết quả |
| --- | ---: | --- |
| `npm run lint` | 0 | Không lỗi |
| `npm run typecheck` | 0 | Không lỗi |
| `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c --workers=1` | 1 | 4 passed, 8 failed, 0 skipped; 39.2 giây |

### Kết quả theo case

| Kết quả | TC-ID | Căn cứ chính |
| --- | --- | --- |
| passed | DT-001, DT-002, DT-005, DT-008 | Blank/valid/whitespace search và grid khớp expected Phase B |
| failed | DT-003, DT-004 | UI thiếu empty state |
| failed | DT-006 | HTTP 500 và UI lộ raw `Database Error`/`SQLITE_ERROR` |
| failed | DT-007 | SQL payload trả/hiển thị toàn bộ 5 sản phẩm baseline |
| failed | DT-009 | Alt rỗng và currency `VND`; không fail vì URL ảnh `placehold.co` |
| failed | DT-010 | Không có loading indicator khi request pending |
| failed | DT-011 | Có 2 h1 thay vì 1 |
| failed | DT-012 | Giá dùng `VND`, không có `₫` |

### Automation defect đã xử lý

- Lượt baseline đầu cũng có 4 passed/8 failed nhưng DT-009 chạm timeout 30 giây do nhiều soft assertion missing-UI dùng timeout mặc định nối tiếp.
- Đã giảm riêng timeout assertion sau synchronization xuống 1 giây; không đổi expected/assertion value.
- Rerun cuối giữ nguyên 4/8/0, không còn test timeout. Lint/typecheck sau sửa đều exit 0.

### Artifact failure

- 8 screenshot, 8 video và 8 `error-context.md`, đúng 8 case failed.
- Không tạo screenshot attachment cho case pass.
- Không dùng `waitForTimeout`; không tạo HTML report Phase C.
- Chưa phân loại chính thức failure hoặc tạo bug report; việc đó thuộc Phase E.

## Checkpoint C

- Trạng thái: **Chờ duyệt**.
- Kết quả Chromium cuối: **4 passed, 8 failed, 0 skipped; exit 1**.
- Lint: **exit 0**; typecheck: **exit 0**.
- Fix 1 đã thay case data inline bằng `data/fr05-search.json`, có TypeScript interface và runtime validation.
- Chưa chuyển Phase D.

## 7. Phase C — Fix 1

### Data-driven và validation

- `data/fr05-search.json` chứa toàn bộ input/expected thay đổi theo case, metadata bề mặt và vai trò network; spec không còn khai báo các giá trị case-specific này.
- Fixture có đúng 12 case/12 TC-ID duy nhất và 12 mapping. Runtime validation kiểm tra schema thực dụng, chuỗi/number/boolean/regex theo từng kind, ID/kind tuần tự, quyết định Phase B và mapping bề mặt trước khi Playwright đăng ký test.
- Canonical giữ nguyên: DT-002 dùng `Iphone`; DT-011 = h1; DT-012 = format giá. Không sửa expected theo actual SUT.

### Bảng mapping cuối

UI là oracle chính cho cả 12 case; `UI+network` dưới đây chỉ có nghĩa network hỗ trợ setup, synchronization hoặc diagnostic.

| TC-ID | `automationSurface` | Vai trò network | UI oracle chính |
| --- | --- | --- | --- |
| DT-001 | UI+network | Đồng bộ/đối chiếu aggregate công khai | Danh sách và trạng thái không lỗi |
| DT-002 | UI | Không dùng | Từ khóa, tên và số card kết quả |
| DT-003 | UI | Không dùng | Empty state và số card bằng 0 |
| DT-004 | UI+network | Diagnostic request/encoding/status | Safe display, empty state, không lỗi |
| DT-005 | UI | Không dùng | Giá trị input, danh sách sau trim và không lỗi |
| DT-006 | UI+network | Diagnostic HTTP 500 | Không dialog/injection/raw error; payload render an toàn |
| DT-007 | UI+network | Diagnostic baseline/count/status | Kết quả không bất thường, empty state, không raw error |
| DT-008 | UI | Không dùng | Grid/computed layout và responsive aggregate |
| DT-009 | UI+network | Request ảnh chỉ diagnostic | Card, ảnh sản phẩm, alt, tên, giá và layout ảnh |
| DT-010 | UI+network | Tạo pending state/đồng bộ | Loading indicator và chuyển trạng thái sang danh sách |
| DT-011 | UI | Không dùng | Cấu trúc DOM có đúng một `h1` |
| DT-012 | UI | Không dùng | Text giá có `₫` và phân cách hàng nghìn |

Không có case API-only. DT-009 không fail vì ảnh `placehold.co` là ảnh sản phẩm chủ đích hay vì network ngoài bị chặn; failure hiện tại đến từ alt rỗng và format giá UI.

### Locator và assertion

- Ưu tiên `getByRole`/`getByText` cho các phần tử có semantics công khai. SUT không có test id/label/card role phù hợp nên không tạo locator giả định.
- CSS chỉ dùng cho cấu trúc DOM không thể xác minh chính xác bằng accessible role: `locator('h1')`, `img`, `script`, ancestor card và fallback spinner/skeleton. Mỗi chỗ có comment giải thích trong spec.
- Đã thực thi đủ DOM/visible text, state/attribute và count/aggregate; thêm layout/computed DOM và network diagnostic. Network không thay assertion UI.
- Expected xử lý an toàn vẫn không chấp nhận HTTP 500, crash, raw database error hoặc execution payload.

### Lệnh và kết quả Fix 1

| Command | Exit code | Kết quả |
| --- | ---: | --- |
| `npm run lint` | 0 | Không lỗi |
| `npm run typecheck` | 0 | Không lỗi |
| `npx playwright test tests/fr05-search.spec.ts --project=chromium --reporter=list --output=test-results/fr05-phase-c-fix1 --workers=1` | 1 | 4 passed, 8 failed, 0 skipped; 42.7 giây |

Passed: DT-001, DT-002, DT-005, DT-008. Failed: DT-003, DT-004, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012. Chi tiết quan sát thật và artifact ở `reports/fr05-search/evidence/phase-c-fix1-run.md`.

### Fix 2 backlog

1. Hoàn thiện loading synchronization cho DT-010; Fix 1 mới giữ request pending ở mức tối thiểu để quan sát UI.
2. Hoàn thiện screenshot attachment cho case pass; hiện runner chỉ lưu artifact cho 8 case failed.

### Checkpoint C sau Fix 1

- Trạng thái: **Chờ duyệt**.
- Chromium: **4 passed, 8 failed, 0 skipped; exit 1**.
- Lint/typecheck: **exit 0/0**.
- Chưa chuyển Phase D.
