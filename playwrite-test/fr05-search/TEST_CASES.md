# Test Cases — FR-05: Xem danh sách & Tìm kiếm sản phẩm

## Thông tin nguồn

| Mục | Giá trị |
| --- | --- |
| Đường dẫn HW02 | `tests/test-cases/FR-05-search/domain-testing/` |
| Trạng thái nguồn | Có HW02 — đủ 12 file |
| Lý do ngoại lệ | N/A |
| Requirement công khai | `src/eshop-sut/README.md`, mục FR-05 |
| URL SUT | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Mã sinh viên | `23127464` |
| Ngày đối chiếu Phase A | `08/08/2026 20:58` |
| Ngày lập bảng Phase B | `08/08/2026 21:15` |
| Checkpoint A | Đã duyệt — prompt `xóa debug.log và tôi approved, continue phase B` lúc `08/08/2026 21:13` |
| Quyết định Checkpoint B | Đã duyệt đủ 4 quyết định lúc `08/08/2026 21:24`; Phase C bắt đầu theo prompt lúc `08/08/2026 21:27` |
| Bằng chứng Phase A | `playwrite-test/fr05-search/REVIEW_NOTES.md` |

## Nguyên tắc chuẩn hóa Phase B

- Lấy nguyên 12 case HW02 làm nền; không thêm case mới, không loại case và không sửa trực tiếp file HW02.
- Giữ expected gốc khi actual khác expected; không hạ assertion để làm SUT hiện tại pass.
- Áp dụng hai quyết định đã duyệt: DT-002 dùng `Iphone`; filename/manual run là canonical với DT-011 = h1 và DT-012 = format giá.
- Chốt expected nhiều nhánh: DT-004 dùng nhánh empty state khi response rỗng theo requirement FR-05; DT-005 dùng nhánh trim whitespace về chuỗi rỗng và hiển thị toàn bộ theo actual Phase A đã duyệt.
- Mọi nội dung UI/layout/DOM dùng UI làm oracle chính. Network chỉ hỗ trợ setup, synchronization hoặc chẩn đoán, trừ status/body là điểm quan sát trực tiếp trong DT-006/DT-007.
- Chưa tạo fixture thật. Các fixture key dưới đây chỉ là tên dự kiến để review trước Phase C.

## Bảng đối chiếu ban đầu

| ID HW02 canonical | Mô tả gốc | Quan sát thực tế Phase A | Trạng thái sau quyết định | Bằng chứng | Xử lý Phase B |
| --- | --- | --- | --- | --- | --- |
| `TC-FR05-DT-001` | Tìm kiếm với từ khóa rỗng | UI và API hiển thị đủ 5 sản phẩm công khai, không lỗi | Khớp | REVIEW_NOTES E-A-01/E-A-03 | Giữ expected |
| `TC-FR05-DT-002` | Tìm kiếm từ khóa hợp lệ có kết quả | `Iphone` trả đúng 1 card `iPhone 15 Pro Max` | Khớp | REVIEW_NOTES E-A-03/I-A-01 | Dùng `Iphone` đồng nhất precondition, data, steps, expected |
| `TC-FR05-DT-003` | Tìm kiếm từ khóa không có kết quả | Response rỗng nhưng UI thiếu empty state | Lệch | REVIEW_NOTES E-A-03 | Giữ expected empty state |
| `TC-FR05-DT-004` | Tìm kiếm từ khóa có ký tự đặc biệt | Response rỗng; UI an toàn nhưng thiếu empty state | Lệch | REVIEW_NOTES E-A-03 | Chốt nhánh expected empty state, giữ yêu cầu không lỗi/crash |
| `TC-FR05-DT-005` | Tìm kiếm chỉ khoảng trắng | Ba dấu cách được gửi như query rỗng; UI hiện đủ 5 sản phẩm | Khớp | REVIEW_NOTES E-A-03 | Chốt nhánh trim về chuỗi rỗng và hiển thị toàn bộ |
| `TC-FR05-DT-006` | Tìm kiếm với XSS Payload | Không alert/script inject nhưng API 500 và UI lộ raw DB error | Lệch | REVIEW_NOTES E-A-03 | Giữ expected an toàn trên UI/DOM/network |
| `TC-FR05-DT-007` | Tìm kiếm với SQL Injection Payload | Payload trả toàn bộ 5 sản phẩm baseline | Lệch | REVIEW_NOTES E-A-01/E-A-03 | Giữ expected không trả toàn bộ, không lỗi/rò rỉ |
| `TC-FR05-DT-008` | UI-1: Danh sách sản phẩm hiển thị dạng grid | Desktop có 3 cột; viewport 500px đổi còn 1 cột | Khớp | REVIEW_NOTES E-A-04 | Giữ expected |
| `TC-FR05-DT-009` | UI-2: Card sản phẩm hiển thị đầy đủ Ảnh + Tên + Giá | Có 5 card và mỗi card có `img`/`src` trỏ tới ảnh sản phẩm chủ đích trên `placehold.co`; alt rỗng, giá dùng VND. Host ảnh ngoài bị sandbox probe chặn nhưng không được diễn giải là sản phẩm thiếu ảnh | Lệch | REVIEW_NOTES E-A-02/E-A-04 + quyết định người dùng | Giữ expected ảnh/alt/tên/giá `₫`; UI/DOM là oracle chính, network ảnh chỉ diagnostic |
| `TC-FR05-DT-010` | UI-4: Trạng thái loading khi đang tải dữ liệu | Khi request pending không có loading indicator | Lệch | REVIEW_NOTES E-A-05 | Giữ expected loading UI |
| `TC-FR05-DT-011` | UI-6: Trang chủ có đúng 1 thẻ h1 | DOM/accessibility có 2 h1 | Lệch | REVIEW_NOTES E-A-02/E-A-04/I-A-02 | Canonical ID DT-011; giữ expected đúng 1 h1 |
| `TC-FR05-DT-012` | UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn | Có phân cách hàng nghìn nhưng dùng VND thay vì ₫ | Lệch | REVIEW_NOTES E-A-02/E-A-04/I-A-02 | Canonical ID DT-012; giữ expected `₫` và phân cách |

## Bộ test case cuối

| ID | Tiêu đề | Loại | Tiền điều kiện | Input / fixture key dự kiến | Bước chính | Expected duy nhất đã duyệt | `automationSurface` | Nguồn | Ghi chú thay đổi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `TC-FR05-DT-001` | Tìm kiếm với từ khóa rỗng (Domain Testing) | edge — EP1 empty boundary | EShop hoạt động; có ít nhất 1 sản phẩm; người dùng đã vào trang chủ | `search.empty`; `search_keyword = ""` | Mở trang chủ → xác nhận textbox → để trống/xóa input → Enter hoặc nút Tìm → quan sát danh sách | Hiển thị toàn bộ danh sách sản phẩm công khai; không lọc theo từ khóa; không có thông báo lỗi; trang hoạt động bình thường, không crash | UI+network — UI primary, API bổ trợ baseline | HW02 | Không đổi input/expected; “toàn bộ” chỉ đối chiếu API công khai, không database nội bộ |
| `TC-FR05-DT-002` | Tìm kiếm từ khóa hợp lệ có kết quả (Domain Testing) | positive — EP2 valid match | EShop hoạt động; có ít nhất 1 sản phẩm tên chứa `Iphone` khi so sánh không phân biệt hoa/thường; người dùng đã vào trang chủ | `search.validResult`; `search_keyword = "Iphone"` | Mở trang chủ → focus textbox → nhập `Iphone` → submit → kiểm tra mọi product heading trả về | Hiển thị danh sách sản phẩm có tên chứa `Iphone` theo đối sánh đã quan sát; mọi kết quả đều liên quan, sản phẩm không liên quan không xuất hiện; không lỗi; hệ thống hoạt động bình thường | UI+network — UI primary, API bổ trợ dữ liệu | HW02 | **Đã duyệt:** cũ `Áo` trong precondition/data/domain matrix nhưng `Iphone` trong steps/expected; mới dùng `Iphone` nhất quán. Lý do: quyết định người dùng + actual Phase A |
| `TC-FR05-DT-003` | Tìm kiếm từ khóa không có kết quả (Domain Testing) | negative — EP3 no match | EShop hoạt động; không sản phẩm công khai nào chứa `xyznoexist123`; người dùng đã vào trang chủ | `search.noResult`; `search_keyword = "xyznoexist123"` | Mở trang → nhập keyword → submit → kiểm tra product headings và empty state | Hiển thị empty state phù hợp; không có product card; không lỗi 500/exception; không crash | UI+network — UI primary, response rỗng hỗ trợ synchronization | HW02 | Giữ nguyên expected dù actual hiện thiếu empty state |
| `TC-FR05-DT-004` | Tìm kiếm từ khóa có ký tự đặc biệt (Domain Testing) | edge — EP4 special characters | EShop hoạt động; người dùng đã vào trang chủ; baseline công khai không có sản phẩm khớp keyword | `search.specialCharacters`; `search_keyword = "Áo @#$%"` | Mở trang → nhập đủ keyword → submit → kiểm tra UI, URL/request quan sát được, empty state và lỗi hệ thống | Input được hiển thị an toàn; với kết quả rỗng, UI hiển thị empty state phù hợp; không 500/exception/stack trace; không crash, treo hoặc redirect bất thường; hệ thống tiếp tục hoạt động | UI+network — UI primary, request URL chỉ chẩn đoán encoding | HW02 | **Expected cũ:** “kết quả phù hợp hoặc empty state”. **Mới:** chốt empty state vì Phase A trả rỗng và FR-05 bắt buộc empty state. Không biến URL diagnostic thành API contract mới |
| `TC-FR05-DT-005` | Tìm kiếm chỉ khoảng trắng (Domain Testing) | edge — EP5 whitespace-only | EShop hoạt động; có ít nhất 1 sản phẩm; người dùng đã vào trang chủ | `search.whitespaceOnly`; `search_keyword = "   "` | Mở trang → nhập đúng 3 spaces → submit → quan sát input/query và danh sách | Whitespace được trim tương đương chuỗi rỗng; UI hiển thị toàn bộ danh sách sản phẩm công khai; không 500/exception; không crash/treo; hệ thống hoạt động bình thường | UI+network — UI primary, request hỗ trợ xác nhận trim | HW02 | **Expected cũ:** hai nhánh trim hoặc “kết quả phù hợp”. **Mới:** chốt nhánh trim và hiển thị toàn bộ theo actual Phase A đã được duyệt |
| `TC-FR05-DT-006` | Tìm kiếm với XSS Payload (Domain Testing) | negative — EP6 security | EShop hoạt động; người dùng đã vào trang chủ; browser cho phép quan sát dialog, DOM, console và response | `search.xssPayload`; `<script>alert('XSS')</script>` | Nhập payload → submit → theo dõi dialog → kiểm tra giá trị hiển thị escaped/plain text → kiểm tra DOM không có script inject → kiểm tra console/response/UI | Payload chỉ xuất hiện dạng text, không render HTML/JS; không alert; không có script inject; không 500/raw DB error; không crash/treo/redirect; hệ thống hoạt động bình thường | UI+network — UI/DOM primary; status/body network là oracle bổ sung trực tiếp | HW02 | Giữ nguyên expected; không hạ theo actual 500. Liên kết HW02: SEC-04 |
| `TC-FR05-DT-007` | Tìm kiếm với SQL Injection Payload (Domain Testing) | negative — EP7 security | EShop hoạt động; người dùng đã vào trang chủ; lấy trước baseline count/names qua bề mặt công khai | `search.sqlInjection`; `' OR '1'='1' --` | Lấy baseline công khai → nhập payload → submit → so sánh count/names → kiểm tra UI/status/body/URL không lộ thông tin nhạy cảm | Không trả toàn bộ sản phẩm bất thường; kết quả rỗng và UI có empty state; không 500/database error/SQL syntax/stack trace; không crash/redirect; không lộ thông tin database | UI+network — UI primary, network hỗ trợ count/status/body | HW02 | Giữ expected hành vi bên ngoài. Cụm “parameterized query hoặc sanitization” trong HW02 chỉ là rationale, không phải assertion hộp đen. Liên kết HW02: SEC-05 |
| `TC-FR05-DT-008` | UI-1: Danh sách sản phẩm hiển thị dạng grid (Domain Testing) | positive — UI layout | EShop hoạt động; có ít nhất 2 sản phẩm; browser hỗ trợ CSS Grid/Flexbox | `page.home.grid`; URL `/`; viewport desktop và hẹp | Mở trang → chờ danh sách → kiểm tra nhiều cột/computed display → đổi viewport → kiểm tra số cột responsive | Desktop hiển thị grid nhiều cột; container dùng `display:grid` hoặc `display:flex` + wrap; không phải list một cột ở desktop; số cột thay đổi phù hợp theo viewport | UI | HW02 | Không đổi expected |
| `TC-FR05-DT-009` | UI-2: Card sản phẩm hiển thị đầy đủ Ảnh + Tên + Giá (Domain Testing) | positive — UI content | EShop hoạt động; có ít nhất 3 sản phẩm công khai có dữ liệu ảnh/tên/giá | `page.home.cardContent`; URL `/`; sample tối thiểu 3 card | Mở trang → scope từng card từ heading level 2 → kiểm tra có `img`, `src` ảnh sản phẩm không rỗng, alt và kích thước/object-fit hiển thị → tên không rỗng → giá có `₫` → lặp ≥3 card | Mỗi card có ảnh sản phẩm chủ đích, alt mô tả, tên và giá; ảnh có `src` không rỗng và hiển thị đúng tỷ lệ/không méo; tên không rỗng; giá dùng `₫`; cấu trúc nhất quán | UI+network — UI/DOM primary; response ảnh chỉ diagnostic, không quyết định pass/fail | HW02 | **Đã duyệt:** `placehold.co` là ảnh sản phẩm, không phải trạng thái thiếu ảnh. Không fail vì sandbox chặn host; DT-009 vẫn lệch nếu alt rỗng, giá sai hoặc cấu trúc/hiển thị UI sai |
| `TC-FR05-DT-010` | UI-4: Trạng thái loading khi đang tải dữ liệu (Domain Testing) | positive — UI state | EShop hoạt động; harness/browser có thể giữ request sản phẩm pending hoặc throttle mạng | `page.home.loading`; URL `/`; pending product request | Mở/refresh trang với request pending → quan sát indicator → release request → xác nhận indicator biến mất và danh sách xuất hiện → lặp lại | Trong lúc API pending có spinner/skeleton/text loading rõ ràng; indicator tồn tại suốt thời gian chờ; sau response indicator biến mất và danh sách thay thế; không để vùng nội dung trắng/không phản hồi | UI+network — UI oracle, network chỉ tạo pending state/synchronization | HW02 | Giữ nguyên expected dù actual thiếu loading |
| `TC-FR05-DT-011` | UI-6: Trang chủ có đúng 1 thẻ h1 (Domain Testing) | positive — DOM/accessibility | EShop hoạt động; browser cho phép quan sát DOM/accessibility; danh sách đã tải | `page.home.h1`; URL `/` | Mở trang → chờ danh sách → đếm heading level 1/`h1` → đọc nội dung | DOM có đúng 1 `h1`; nội dung không rỗng và mô tả đúng trang; accessibility tree chỉ có một heading cấp cao nhất | UI | HW02 | **Canonical đã duyệt:** filename/manual run DT-011 là case h1. Nội dung cũ bên trong file ghi DT-012; expected không đổi |
| `TC-FR05-DT-012` | UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn (Domain Testing) | positive — UI format | EShop hoạt động; có ít nhất 3 sản phẩm và ít nhất 1 giá ≥1.000 | `page.home.priceFormat`; URL `/`; sample tối thiểu 3 card | Mở trang → scope giá trong ≥3 card → kiểm ký hiệu `₫` → kiểm dấu `.` hoặc `,` phân cách hàng nghìn → kiểm nhất quán | Mọi giá dùng ký hiệu `₫`, có phân cách hàng nghìn rõ ràng và format nhất quán; không chấp nhận số liền thiếu separator | UI | HW02 | **Canonical đã duyệt:** filename/manual run DT-012 là case format giá. Nội dung cũ bên trong file ghi DT-014; expected không đổi |

## Thay đổi đã duyệt và truy vết nội dung cũ/mới

| Case | Nội dung cũ HW02 | Nội dung cuối Phase B | Lý do / bằng chứng duyệt |
| --- | --- | --- | --- |
| DT-002 | Domain matrix/precondition/test data dùng `Áo`; steps/expected dùng `Iphone` | Dùng `Iphone` xuyên suốt | Người dùng chọn `Iphone`; actual Phase A trả `iPhone 15 Pro Max` |
| DT-004 | Expected cho phép “kết quả phù hợp hoặc empty state” | Với input/dataset đã kiểm chứng trả rỗng, expected duy nhất là empty state + không lỗi/crash | FR-05 bắt buộc empty state khi không kết quả; Phase A response rỗng; Checkpoint A đã duyệt |
| DT-005 | Expected cho phép trim thành rỗng hoặc kết quả phù hợp | Expected duy nhất: trim thành rỗng và hiển thị toàn bộ | Actual Phase A gửi `?search=` và hiện đủ baseline; Checkpoint A đã duyệt |
| DT-011 | Filename/manual run DT-011; comment/heading/matrix bên trong DT-012 | Canonical `TC-FR05-DT-011`, case h1 | Người dùng duyệt filename/manual run canonical |
| DT-012 | Filename/manual run DT-012; comment/heading/matrix bên trong DT-014 | Canonical `TC-FR05-DT-012`, case format giá | Người dùng duyệt filename/manual run canonical |

Không thay expected của DT-003/006/007/009/010/011/012 theo actual đang lệch. Không sửa trực tiếp 12 file HW02 ở Phase B; bảng này là artifact normalized chờ review.

## Kiểm tra số lượng, nguồn và coverage

| Chỉ số | Giá trị |
| --- | ---: |
| Tổng case HW02 | 12 |
| Case trùng lặp | 0 |
| Tổng case bổ sung | 0 |
| Tổng case độc lập cuối | 12 |
| Case lệch được chuẩn hóa theo quyết định đã duyệt | 3 — DT-004, DT-011, DT-012 |
| Case Khớp/Không xác định được chuẩn hóa để loại mâu thuẫn/đa nhánh | 2 — DT-002, DT-005 |
| Case giữ expected dù actual lệch | 7 — DT-003, DT-006, DT-007, DT-009, DT-010, DT-011, DT-012 |
| Case có `Nguồn = HW02` | 12 |
| Case có `Nguồn = Bổ sung` | 0 |
| Đạt tối thiểu 12 case | Có |

Không bổ sung case vì bộ 12 case đã bao phủ mọi ý công khai của FR-05: danh sách/grid, card ảnh-tên-giá, search theo tên, hiển thị input an toàn, loading, empty state và đúng một h1. DT-006/007 còn giữ coverage bảo mật kế thừa HW02; không tuyên bố SEC-04/SEC-05 là requirement mới của FR-05 README.

## Quyết định tại Checkpoint B

| STT | Giả định / điểm chưa rõ | Case ảnh hưởng | Câu hỏi cần xác nhận | Quyết định người duyệt |
| ---: | --- | --- | --- | --- |
| 1 | HW02 không khai báo cột positive/negative/edge; Phase B phân loại minh bạch từ partition và mục tiêu case | Tất cả | Duyệt mapping loại trong bảng cuối? | **Đã duyệt** — giữ mapping trong bảng cuối |
| 2 | Host ảnh `placehold.co` bị network sandbox chặn trong Phase A | DT-009 | Ảnh này có được coi là ảnh sản phẩm hay trạng thái thiếu ảnh? Network có làm oracle chính không? | **Đã quyết định** — đây là ảnh sản phẩm chủ đích; không coi sandbox block là sản phẩm thiếu ảnh; UI/DOM là oracle, network chỉ diagnostic |
| 3 | Payload DT-007 có khả năng gây tác động dữ liệu nếu SUT không an toàn; Phase C/D sẽ chạy lặp lại và đa trình duyệt | DT-006, DT-007 | Xác nhận `localhost:5173/:3000` là môi trường test cô lập, không phải production? | **Đã xác nhận** — localhost là môi trường test cô lập, không phải production |
| 4 | DT-004 hiện gửi request chỉ tới phần trước `#`; Phase A dùng network làm chẩn đoán, không coi endpoint là API contract | DT-004 | Giữ URL/request encoding diagnostic, pass/fail dựa UI safe display + empty state + không lỗi? | **Đã duyệt** — đúng vai trò diagnostic/UI primary |

## File Phase B

- Đã tạo: `playwrite-test/fr05-search/TEST_CASES.md`.
- Đã cập nhật: `playwrite-test/fr05-search/REVIEW_NOTES.md`, `reports/ai-audit-report.md`.
- Đã xóa theo yêu cầu: `debug.log` — không thể khôi phục từ workspace nếu không có bản sao ngoài.
- Không tạo: fixture `data/fr05-search.*`, Playwright spec, Playwright config hoặc bug report.

## Checkpoint B

- Trạng thái nội dung Phase B: **Đã duyệt** — đủ bốn quyết định lúc `08/08/2026 21:24`.
- Người duyệt: người dùng.
- Bằng chứng Checkpoint A: prompt `xóa debug.log và tôi approved, continue phase B` lúc `08/08/2026 21:13`.
- Bằng chứng quyết định Checkpoint B: prompt bắt đầu bằng `Duyệt mapping loại trong bảng cuối` lúc `08/08/2026 21:24`.
- Phase C đã bắt đầu theo prompt `approve, continue phase C` lúc `08/08/2026 21:27`; bảng Phase B này không bị sửa expected sau khi chuyển phase.
