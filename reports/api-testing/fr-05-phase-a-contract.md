# FR-05 — Phạm vi và hợp đồng Phase A

## Phạm vi FR-05

- Pool: **A**.
- Tính năng: **FR-05 — Xem danh sách và tìm kiếm sản phẩm**.
- Điểm cuối duy nhất trong phạm vi là `GET /api/products`, với tham số truy vấn tùy chọn `?search=<keyword>`.
- Base URL được công bố: `http://localhost:3000` (`src/eshop-sut/api_specification.md`).
- Mã sinh viên: `23127464`, được xác định từ `ai-first-api-testing/SKILL.md` và nhất quán với các artifact kiểm thử API hiện có trong repository.
- Mọi yêu cầu HTTP ở phase thực thi sau này phải có `X-Student-Id: 23127464`. Phase A không gửi yêu cầu nào.
- Ánh xạ phạm vi có nguồn từ `ai-first-api-testing/references/api-selection-contract.md`, mục 3.1 của `src/eshop-sut/api_specification.md` và FR-05 trong `src/eshop-sut/README.md`.
- Chi tiết sản phẩm, CRUD sản phẩm, API danh mục, tính năng xác thực và mọi FR/điểm cuối khác đều nằm ngoài phạm vi.

## Hợp đồng

| Khía cạnh | Hợp đồng có nguồn | Nguồn và giới hạn |
|---|---|---|
| Phương thức/đường dẫn | `GET /api/products` | Đặc tả API mục 3.1; hợp đồng lựa chọn API cho FR-05. |
| Tham số tìm kiếm | `search`, được truyền dưới dạng `?search=keyword` | Đặc tả API mục 3.1. Không có tham số truy vấn nào khác được tài liệu hóa. |
| Bắt buộc/tùy chọn | `search` là tùy chọn | Đặc tả API ghi rõ query string là “Tùy chọn”. |
| Đối tượng tìm kiếm | Tìm theo tên sản phẩm | Đặc tả API mục 3.1 và README FR-05. |
| Yêu cầu không có `search` | Trường hợp liệt kê sản phẩm hiển thị tất cả sản phẩm | README FR-05 yêu cầu trang chủ hiển thị tất cả sản phẩm; đặc tả API ánh xạ việc lấy danh sách sản phẩm vào điểm cuối này. Cách biểu diễn phản hồi chính xác chưa được định nghĩa. |
| Xác thực | Không có yêu cầu JWT/vai trò nào được tài liệu hóa cho phương thức `GET` này. README FR-12 bảo vệ `/api/admin/*` và các phương thức thay đổi sản phẩm `POST/PUT/DELETE`, không bao gồm phương thức đọc này. | Không đưa xác thực vào như một yêu cầu của FR-05. Header `X-Student-Id` theo yêu cầu bài tập vẫn bắt buộc khi thực thi sau này. |
| Thông tin sản phẩm | FR-05 yêu cầu giao diện hiển thị ảnh, tên sản phẩm và giá | README FR-05. Các trường hiển thị trên giao diện không xác lập tên trường, kiểu, tính bắt buộc hay lược đồ phản hồi API chính xác. |
| Hành vi không có kết quả | Tìm kiếm không có kết quả phải hỗ trợ giao diện hiển thị empty state phù hợp | README FR-05. Status/body/mảng/envelope mà API dùng để biểu diễn không có kết quả chưa được định nghĩa. |
| Hiển thị từ khóa an toàn | Từ khóa tìm kiếm phải được hiển thị an toàn và không render HTML | README FR-05 và SEC-04. Đây là yêu cầu có nguồn cho phía tiêu thụ/giao diện, không phải assertion phản hồi API hoàn chỉnh. |

### Quan sát trực tiếp từ implementation để kiểm tra khoảng trống và bảo mật

Các quan sát dưới đây chỉ mô tả source hiện tại của SUT, không thay thế hoặc mở rộng hợp đồng mong đợi.

- `src/eshop-sut/backend/server.js:141-157` triển khai route mà không gắn middleware xác thực.
- `server.js:142-144` phân nhánh theo truthiness của `req.query.search` và nội suy giá trị vào `LIKE '%${searchQuery}%'`. Điều này cho thấy implementation hiện tại có vẻ dùng partial match, nhưng **không** giải quyết khoảng trống oracle partial/exact trong tài liệu.
- `server.js:145-150` trả `rows` dưới dạng JSON ở nhánh có tìm kiếm và chèn `err.message` vào phản hồi lỗi cơ sở dữ liệu dạng HTML. Điểm sau tạo concern trực tiếp về lộ thông tin.
- `server.js:152-155` thực thi `SELECT * FROM products` và trả `rows` dưới dạng JSON khi `search` vắng mặt hoặc có giá trị falsy.
- `src/eshop-sut/backend/database.js:64-70` hiện định nghĩa các cột `id`, `name`, `price`, `description`, `imageUrl` và `category_id`; vì route dùng `SELECT *`, đây là các trường đầu ra ở cấp implementation. Chúng không phải lược đồ API bên ngoài đã được phê duyệt.

## Mô hình đầu vào tìm kiếm

Các mục sau là **planned partitions cho Phase B**, không phải test case đã sinh. Không có status/lược đồ/kết quả mong đợi nào được tự đặt ra.

| Phân vùng dự kiến | Mô hình đầu vào | Trạng thái oracle |
|---|---|---|
| Yêu cầu không có search | Bỏ tham số truy vấn `search` | Hành vi có nguồn: trường hợp liệt kê sản phẩm bao phủ tất cả sản phẩm. Status/body/schema/thứ tự chính xác: **INCOMPLETE ORACLE / SPEC GAP**. |
| Từ khóa hợp lệ đang tồn tại | Từ khóa có kiểm soát, lấy từ tên một sản phẩm đang tồn tại | Tìm theo tên có nguồn. Hành vi partial/exact, phân biệt hoa thường và chuẩn hóa: **INCOMPLETE ORACLE / SPEC GAP**. |
| Từ khóa không tồn tại | Từ khóa có kiểm soát, chắc chắn không xuất hiện trong tên sản phẩm nào của fixture | Trạng thái không có kết quả chỉ có nguồn ở cấp giao diện. Cách biểu diễn API chính xác: **INCOMPLETE ORACLE / SPEC GAP**. |
| Rỗng | `?search=` | **INCOMPLETE ORACLE / SPEC GAP** — semantics của giá trị rỗng chưa được định nghĩa. |
| Khoảng trắng | Một hoặc nhiều ký tự khoảng trắng, bao gồm khoảng trắng đầu/cuối quanh văn bản | **INCOMPLETE ORACLE / SPEC GAP** — hành vi trim và chỉ có khoảng trắng chưa được định nghĩa. |
| Từ khóa một ký tự | Một ký tự đã biết là có xuất hiện và có thể thêm một ký tự đã biết là không xuất hiện | **INCOMPLETE ORACLE / SPEC GAP** — độ dài tối thiểu và semantics so khớp chưa được định nghĩa. |
| Từ khóa dài | Giá trị dài có kiểm soát; ghi lại boundary thực tế thay vì tự đoán | **INCOMPLETE ORACLE / SPEC GAP** — độ dài tối đa, cắt ngắn và hành vi từ chối chưa được định nghĩa. |
| Từ khóa dạng số | Chỉ gồm chữ số | **INCOMPLETE ORACLE / SPEC GAP** — cách xử lý văn bản dạng số chưa được định nghĩa. |
| Ký tự đặc biệt | Dấu câu/metacharacter vẫn là dữ liệu truy vấn hợp lệ | **INCOMPLETE ORACLE / SPEC GAP** — semantics literal/escape/wildcard chưa được định nghĩa. |
| Unicode/tiếng Việt | Văn bản tiếng Việt có dấu và văn bản Unicode khác | **INCOMPLETE ORACLE / SPEC GAP** — collation, normalization và độ nhạy dấu chưa được định nghĩa. |
| Đầu vào được mã hóa | Từ khóa percent-encoded hợp lệ; phân biệt giá trị thô, giá trị đã decode và giá trị double-encoded | **INCOMPLETE ORACLE / SPEC GAP** — số lớp decode và quy tắc tương đương chưa được định nghĩa. |
| Đầu vào hướng injection | Payload hướng SQL; từ khóa giống HTML/script dành cho sink hiển thị đã được tài liệu hóa | SEC-05 và FR-05/SEC-04 khiến các phân vùng này phù hợp. Không tự đoán status/body/kết quả tìm kiếm; oracle bảo mật có nguồn là không thay đổi cấu trúc truy vấn, không lộ lỗi nhạy cảm và hiển thị an toàn khi sink giao diện được đánh giá. |

### Checklist semantics được yêu cầu

| Semantics | Kết quả kiểm tra tài liệu |
|---|---|
| Tìm kiếm partial hay exact | **INCOMPLETE ORACLE / SPEC GAP** |
| Phân biệt hoa thường | **INCOMPLETE ORACLE / SPEC GAP** |
| Xử lý khoảng trắng | **INCOMPLETE ORACLE / SPEC GAP** |
| Search rỗng | **INCOMPLETE ORACLE / SPEC GAP** |
| Xử lý Unicode/tiếng Việt | **INCOMPLETE ORACLE / SPEC GAP** |
| Ký tự đặc biệt | **INCOMPLETE ORACLE / SPEC GAP** |
| Từ khóa dài | **INCOMPLETE ORACLE / SPEC GAP** |
| Đầu vào dạng số | **INCOMPLETE ORACLE / SPEC GAP** |
| Đầu vào được mã hóa | **INCOMPLETE ORACLE / SPEC GAP** |
| Kết quả không khớp | README định nghĩa empty state phù hợp trên giao diện; cách biểu diễn API chính xác là **INCOMPLETE ORACLE / SPEC GAP**. |
| Thứ tự | **INCOMPLETE ORACLE / SPEC GAP** |

## Bảo mật áp dụng

- **SEC-05 — injection qua `search`:** áp dụng trực tiếp vì giá trị truy vấn đi vào thao tác tra cứu cơ sở dữ liệu. Thuộc tính bảo mật mong đợi là văn bản do caller kiểm soát không được làm thay đổi cấu trúc SQL. Kiểm tra tĩnh tại `server.js:144` cho thấy source đang nội suy chuỗi thay vì dùng truy vấn tham số hóa, nên Phase B cần có phân vùng hướng injection. Đây là concern từ source, chưa phải báo cáo lỗi runtime.
- **Lộ thông tin:** áp dụng trực tiếp cho xử lý lỗi. Source hiện tại tại `server.js:146-149` đưa thông báo lỗi cơ sở dữ liệu vào phản hồi HTML. Phase B có thể đánh giá liệu đầu vào search có kích hoạt lộ thông tin hay không; Phase A không tuyên bố kết quả runtime hoặc bug.
- **SEC-04 / đầu ra không an toàn:** README FR-05 yêu cầu rõ từ khóa tìm kiếm khi hiển thị không được render thành HTML. Sink giao diện phù hợp đã được tài liệu hóa, nhưng hợp đồng endpoint không nói API phản chiếu `search`. Kiểm tra riêng endpoint không thể hoàn tất oracle escaping của giao diện; đây vẫn là concern có giới hạn cho kiểm thử sau này nếu thực sự đánh giá sink đã được tài liệu hóa.
- **Xác thực:** không áp dụng. Hợp đồng FR-05 không yêu cầu JWT hoặc vai trò admin cho endpoint đọc này. Kiểm thử tính năng xác thực nằm ngoài phạm vi.
- Không ánh xạ SEC-01, SEC-02, SEC-03, SEC-06 và SEC-07 vì chúng không liên quan trực tiếp đến hợp đồng FR-05 này.

## Oracle phản hồi / lược đồ

- Thông tin phản hồi có nguồn chỉ giới hạn ở nhu cầu nghiệp vụ: liệt kê tất cả sản phẩm khi không có search, tìm theo tên sản phẩm, cung cấp đủ thông tin để hiển thị ảnh/tên/giá và hỗ trợ empty state khi không có kết quả.
- `src/eshop-sut/api_specification.md` và README FR-05 đều không công bố success status code, error status code, media type, hình dạng JSON cấp cao nhất, quy tắc array/envelope, tên/kiểu trường chính xác, trường bắt buộc/tùy chọn, nullability, chính sách trường bổ sung hoặc cách biểu diễn kết quả rỗng chính xác.
- Các trường hiển thị trên giao diện trong README không phải assertion lược đồ API chính xác.
- `res.json(rows)`, `SELECT *` và các cột database hiện tại chỉ là quan sát implementation; chúng không biến hợp đồng bên ngoài còn thiếu thành oracle đã được phê duyệt.

**SCHEMA ORACLE: INCOMPLETE**

## Khoảng trống đặc tả

Mọi mục dưới đây là **INCOMPLETE ORACLE / SPEC GAP** nếu chưa có thêm nguồn được con người phê duyệt:

- Semantics tìm kiếm partial, exact, prefix, substring, tokenized hoặc hình thức khác.
- Phân biệt hoa thường, độ nhạy dấu, Unicode normalization, locale/collation và cách xử lý tiếng Việt.
- Trim, khoảng trắng đầu/cuối/bên trong và trường hợp chỉ có khoảng trắng.
- Hành vi search rỗng và search rỗng có tương đương với việc bỏ `search` hay không.
- Ý nghĩa literal hay wildcard/control của ký tự đặc biệt.
- Độ dài từ khóa tối thiểu/tối đa, xử lý URL dài, cắt ngắn và từ chối.
- Hành vi với từ khóa dạng số và ép kiểu đầu vào.
- Percent decoding, xử lý dấu cộng, encoding không hợp lệ và single/double encoding.
- Cách biểu diễn API chính xác khi không có kết quả.
- Thứ tự và quy tắc phá hòa cho kết quả có hoặc không có search.
- Success/failure status code, content type, hợp đồng lỗi và xử lý lỗi cơ sở dữ liệu.
- Envelope/lược đồ phản hồi chính xác, kiểu/tính bắt buộc/nullability của trường sản phẩm và lược đồ danh sách rỗng.
- Việc có chấp nhận nhiều tham số `search` trùng nhau hay không và giá trị nào được sử dụng.
- Xác nhận lựa chọn Pool A không trùng với thành viên khác trong nhóm; chưa có danh sách lựa chọn của nhóm.

Không tự bổ sung pagination, tham số sắp xếp, bộ lọc khác, status code, response schema hoặc search behavior.

## Phụ thuộc dữ liệu

- Phase B cần baseline sản phẩm xác định để các quan sát “tất cả sản phẩm”, từ khóa tồn tại, không có kết quả và thứ tự có thể tái hiện.
- Source khởi tạo hiện tại (`src/eshop-sut/backend/database.js:96-103`) seed năm sản phẩm: `iPhone 15 Pro Max`, `Samsung Galaxy S24 Ultra`, `MacBook Pro M3`, `Tai nghe AirPods Pro 2` và `Bàn phím cơ Keychron Q1`. Đây là ứng viên fixture, không phải dữ liệu contract cố định.
- Phân vùng từ khóa tồn tại cần ít nhất một sản phẩm có tên biết trước; tên đầy đủ chính xác là đầu vào fixture ít mơ hồ nhất khi semantics partial vẫn chưa được giải quyết.
- Phân vùng không tồn tại cần một từ khóa được chứng minh không xuất hiện trong bất kỳ tên sản phẩm nào của baseline có kiểm soát.
- Bao phủ Unicode/tiếng Việt cần tên sản phẩm ổn định có ký tự tiếng Việt nếu muốn assert kết quả khớp; nếu không, chỉ có thể quan sát robustness/bảo mật.
- Assertion không có kết quả và không có search cần baseline count/list từ fixture có kiểm soát, không dựa trên trạng thái database đang chạy được giả định.
- `GET` không làm thay đổi dữ liệu, nhưng setup/reset fixture vẫn phải cô lập hoạt động thay đổi/import sản phẩm trước đó có thể làm đổi tên hoặc số lượng. Cơ chế setup không được mở rộng việc kiểm thử sang các endpoint đó.
- Thực thi sau này yêu cầu `X-Student-Id: 23127464`; hợp đồng FR-05 không yêu cầu fixture JWT.
- Phase A không gửi HTTP request và không quan sát dữ liệu runtime.

## Đường dẫn artifact

- Hợp đồng Phase A: `reports/api-testing/fr-05-phase-a-contract.md`
- AI Audit của interaction ban đầu: `reports/ai-audit-report.md` — Entry #18. Không cập nhật audit trong lần Việt hóa này.

## Ghi chú sẵn sàng demo

Artifact này giúp quan sát rõ workflow Agent Skill tại điểm bàn giao Phase A: khóa phạm vi, trích xuất hợp đồng theo thứ tự nguồn, tách hành vi có tài liệu khỏi quan sát implementation, lập kế hoạch phân vùng mà chưa sinh test case, giới hạn security mapping trong FR-05 và hiển thị rõ các oracle chưa hoàn chỉnh. Con người đã phê duyệt Phase A ngày 2026-08-21 bằng chỉ dẫn `approve, continue`; Phase B được phép bắt đầu.

## Trạng thái

PHASE A: COMPLETE  
HUMAN REVIEW: APPROVED — 2026-08-21  
NEXT ALLOWED PHASE: B — AI GENERATION  
EXECUTION: NOT EXECUTED
