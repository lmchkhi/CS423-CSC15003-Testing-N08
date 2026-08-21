# FR-05 — Ca kiểm thử do AI sinh — Phase B

## Phạm vi và gate đầu vào

- Pool: **A**.
- Tính năng: **FR-05 — Xem danh sách và tìm kiếm sản phẩm**.
- Điểm cuối duy nhất: `GET /api/products` với query tùy chọn `?search=<keyword>`.
- Phase A được con người phê duyệt ngày `2026-08-21` qua chỉ dẫn `approve, continue`.
- Nguồn gốc toàn bộ ca trong file: `AI-SINH`.
- Human case-by-case audit: `PENDING`; chỉ được thực hiện ở Phase C.
- Trạng thái tự động hóa của toàn bộ ca: `NOT CREATED`.
- HTTP execution: `NOT EXECUTED`.

## Quy ước hợp đồng và oracle

- Mọi request ở phase thực thi sau này phải có `X-Student-Id: 23127464`. Không tạo ca riêng chỉ để kiểm tra header của bài tập.
- Hợp đồng có nguồn chỉ xác định: `search` là tùy chọn; tìm theo tên sản phẩm; bỏ `search` thuộc use case liệt kê tất cả sản phẩm; giao diện cần ảnh/tên/giá, empty state và hiển thị từ khóa an toàn.
- Không có JWT hoặc vai trò admin được yêu cầu cho endpoint đọc này.
- Không tự đặt status code, content type, response envelope, exact schema, thứ tự hoặc search semantics.
- Cụm `INCOMPLETE ORACLE / SPEC GAP` nghĩa là ca vẫn có giá trị khám phá/phân vùng nhưng chưa đủ nguồn để quyết định accept/reject hoặc kết quả khớp chính xác.
- Các oracle bảo mật có nguồn: input không được thay đổi cấu trúc SQL (SEC-05), không được làm lộ thông tin lỗi nhạy cảm, và từ khóa phải được hiển thị an toàn tại sink giao diện đã được README định nghĩa (FR-05/SEC-04).
- Dữ liệu ví dụ dựa trên seed source chỉ là fixture candidate, không phải dữ liệu contract cố định.

## Điều kiện tiên quyết và các bước chung

1. Chuẩn bị baseline sản phẩm có kiểm soát và ghi lại tập tên sản phẩm thực tế trước mỗi ca.
2. Với ca cần dữ liệu tồn tại, baseline có các tên đã nêu; với ca no-match, xác minh trước rằng keyword không xuất hiện trong bất kỳ tên nào.
3. Tạo `GET /api/products` với query đúng theo từng ca và header `X-Student-Id: 23127464`.
4. Chỉ gửi request ở phase thực thi sau khi ca đã được con người duyệt; Phase B không gửi request.
5. Đối chiếu response theo oracle semantic có nguồn. Không chuyển implementation observation thành expected behavior.

## Bảng ca kiểm thử

| Mã | Mục tiêu | Dữ liệu yêu cầu | Oracle AI | Danh mục / Nguồn |
|---|---|---|---|---|
| FR05-LST-001 | Liệt kê sản phẩm khi bỏ hoàn toàn query `search` trên baseline có nhiều sản phẩm. | `GET /api/products`; baseline có ít nhất ba tên biết trước. | Kết quả phải phục vụ use case hiển thị tất cả sản phẩm trong baseline. Status/body/schema/order chính xác: **INCOMPLETE ORACLE / SPEC GAP**. | Listing / API spec §3.1; README FR-05 |
| FR05-LST-002 | Liệt kê sản phẩm khi baseline có 0 sản phẩm. | Bỏ `search`; baseline rỗng có kiểm soát. | Use case vẫn là “tất cả sản phẩm”, nhưng cách API biểu diễn tập rỗng là **INCOMPLETE ORACLE / SPEC GAP**. | Listing / README FR-05; Phase A data dependency |
| FR05-LST-003 | Đánh giá thông tin response có đủ hỗ trợ UI hiển thị ảnh, tên và giá. | Bỏ `search`; baseline có sản phẩm với ảnh/tên/giá đã biết. | README chỉ cho biết nhu cầu hiển thị; mapping field, requiredness và exact schema của API là **INCOMPLETE ORACLE / SPEC GAP**. | Response semantics / README FR-05 |
| FR05-EXI-001 | Tìm bằng toàn bộ tên chính xác của sản phẩm Latin/ASCII đang tồn tại. | `search=iPhone 15 Pro Max`; fixture có đúng tên này. | Tìm theo tên có nguồn nên target phải được tìm thấy ở mức semantic; status/envelope/schema/order không được assert. | Existing keyword / API spec §3.1; README FR-05 |
| FR05-EXI-002 | Tìm bằng toàn bộ tên chính xác khác để tránh phụ thuộc một fixture duy nhất. | `search=MacBook Pro M3`; fixture có đúng tên này. | Target phải được tìm thấy ở mức semantic; không suy diễn hình dạng response. | Existing keyword / API spec §3.1; README FR-05 |
| FR05-EXI-003 | Khảo sát tìm kiếm bằng prefix của tên đang tồn tại. | `search=iPhone`; fixture có `iPhone 15 Pro Max`. | **INCOMPLETE ORACLE / SPEC GAP** — tài liệu không xác định prefix/partial có khớp hay không. | Partial/exact gap / Phase A |
| FR05-EXI-004 | Khảo sát tìm kiếm bằng substring nằm giữa nhiều tên. | `search=Pro`; baseline có các tên chứa và không chứa chuỗi này. | **INCOMPLETE ORACLE / SPEC GAP** — substring semantics và số kết quả chưa được định nghĩa. | Partial/exact gap / Phase A |
| FR05-EXI-005 | Khảo sát biến thể chữ thường của tên tồn tại. | `search=iphone 15 pro max` trong khi fixture dùng `iPhone 15 Pro Max`. | **INCOMPLETE ORACLE / SPEC GAP** — case sensitivity/collation chưa được định nghĩa. | Case sensitivity gap / Phase A |
| FR05-NOM-001 | Tìm keyword ASCII chắc chắn không tồn tại. | `search=FR05-NO-MATCH-9F4C2A`; xác minh keyword vắng khỏi mọi tên baseline. | README yêu cầu UI có empty state; cách API biểu diễn no-match là **INCOMPLETE ORACLE / SPEC GAP**. | No-match / README FR-05; Phase A |
| FR05-NOM-002 | Tìm keyword tiếng Việt chắc chắn không tồn tại. | `search=Sản phẩm không tồn tại FR05`; xác minh vắng khỏi baseline. | No-match semantic có nguồn ở UI; exact API result vẫn **INCOMPLETE ORACLE / SPEC GAP**. | No-match + Unicode / README FR-05; Phase A |
| FR05-EMP-001 | Khảo sát query có giá trị rỗng. | `GET /api/products?search=`. | **INCOMPLETE ORACLE / SPEC GAP** — chưa biết empty có tương đương bỏ query, trả no-match hay bị từ chối. | Empty search / Phase A |
| FR05-EMP-002 | Khảo sát query bare không có dấu bằng. | `GET /api/products?search`. | **INCOMPLETE ORACLE / SPEC GAP** — parsing và semantics của query bare chưa được định nghĩa. | Empty/search syntax / Phase A |
| FR05-EMP-003 | Khảo sát nhiều tham số `search` khi giá trị đầu rỗng và giá trị sau tồn tại. | `?search=&search=iPhone%2015%20Pro%20Max`. | **INCOMPLETE ORACLE / SPEC GAP** — tài liệu không định nghĩa duplicate query hay giá trị nào được chọn. | Duplicate query / Phase A |
| FR05-EMP-004 | Khảo sát nhiều tham số `search` khi giá trị đầu tồn tại và giá trị sau rỗng. | `?search=iPhone%2015%20Pro%20Max&search=`. | **INCOMPLETE ORACLE / SPEC GAP** — thứ tự ưu tiên và semantics duplicate chưa được định nghĩa. | Duplicate query / Phase A |
| FR05-WS-001 | Khảo sát keyword chỉ gồm một khoảng trắng. | `?search=%20`. | **INCOMPLETE ORACLE / SPEC GAP** — trim và whitespace-only behavior chưa được định nghĩa. | Whitespace / Phase A |
| FR05-WS-002 | Khảo sát khoảng trắng đầu/cuối quanh tên chính xác. | `?search=%20iPhone%2015%20Pro%20Max%20`. | **INCOMPLETE ORACLE / SPEC GAP** — chưa biết có trim trước khi tìm hay không. | Whitespace / Phase A |
| FR05-WS-003 | Khảo sát nhiều khoảng trắng nội bộ thay cho một khoảng trắng trong tên. | `search=iPhone  15 Pro Max`, encode hợp lệ trên URL. | **INCOMPLETE ORACLE / SPEC GAP** — normalization khoảng trắng nội bộ chưa được định nghĩa. | Whitespace normalization / Phase A |
| FR05-ONE-001 | Khảo sát keyword một ký tự có xuất hiện trong baseline. | `search=M`; baseline có ít nhất một tên chứa `M`. | **INCOMPLETE ORACLE / SPEC GAP** — minimum length, partial match và case sensitivity chưa được định nghĩa. | One-character / Phase A |
| FR05-ONE-002 | Khảo sát keyword một ký tự được xác minh không xuất hiện. | `search=§`, percent-encode UTF-8; xác minh vắng khỏi baseline. | No-match UI semantic có nguồn; exact API representation và Unicode handling là **INCOMPLETE ORACLE / SPEC GAP**. | One-character + no-match / README FR-05; Phase A |
| FR05-LEN-001 | Khảo sát keyword dài 256 ký tự. | Chuỗi `A` lặp đúng 256 lần; ghi lại raw và encoded length. | **INCOMPLETE ORACLE / SPEC GAP** — 256 không được coi là contract boundary; accept/reject/truncation chưa được định nghĩa. | Long keyword / Phase A |
| FR05-LEN-002 | Khảo sát keyword rất dài 4096 ký tự. | Chuỗi `B` lặp đúng 4096 lần; ghi lại URL thực tế. | **INCOMPLETE ORACLE / SPEC GAP** — giới hạn URL/keyword và error handling chưa được định nghĩa. | Long keyword / Phase A |
| FR05-NUM-001 | Khảo sát keyword chỉ gồm số và có thể xuất hiện trong tên fixture. | `search=15`; fixture có `iPhone 15 Pro Max`. | **INCOMPLETE ORACLE / SPEC GAP** — numeric text có được xử lý như substring hay không chưa được định nghĩa. | Numeric keyword / Phase A |
| FR05-NUM-002 | Tìm keyword số chắc chắn không xuất hiện trong baseline. | `search=987654321098765`; xác minh vắng khỏi tên baseline. | No-match UI semantic có nguồn; exact API representation là **INCOMPLETE ORACLE / SPEC GAP**. | Numeric no-match / README FR-05; Phase A |
| FR05-SPC-001 | Khảo sát dấu nháy đơn như dữ liệu tìm kiếm literal. | `search='`, URL-encode phù hợp. | **INCOMPLETE ORACLE / SPEC GAP** cho match/accept/reject; không được lộ thông tin lỗi nhạy cảm. | Special character + information exposure / Phase A; SEC-05 |
| FR05-SPC-002 | Khảo sát ký tự phần trăm thường là wildcard trong SQL LIKE. | `search=%` được gửi dưới dạng `%25`. | **INCOMPLETE ORACLE / SPEC GAP** — tài liệu không nói `%` là literal hay wildcard; không được làm thay đổi cấu trúc truy vấn. | Special/wildcard / Phase A; SEC-05 |
| FR05-SPC-003 | Khảo sát dấu gạch dưới thường là wildcard trong SQL LIKE. | `search=_`. | **INCOMPLETE ORACLE / SPEC GAP** — literal/wildcard semantics chưa được định nghĩa. | Special/wildcard / Phase A; SEC-05 |
| FR05-SPC-004 | Khảo sát nhóm ký tự có ý nghĩa trong URL khi được encode làm dữ liệu. | Keyword raw `+&=#?`; gửi bản percent-encoded tương ứng. | **INCOMPLETE ORACLE / SPEC GAP** — literal handling và no-match representation chưa được định nghĩa; input không được làm sai cấu trúc query ngoài ý muốn. | Special characters + encoding / Phase A |
| FR05-UNI-001 | Tìm bằng toàn bộ tên tiếng Việt chính xác đang tồn tại. | `search=Bàn phím cơ Keychron Q1`, UTF-8 percent-encoded; fixture có đúng tên. | Search-by-name có nguồn nên target phải được tìm thấy ở mức semantic; schema/status/order không được assert. | Unicode/Vietnamese existing / API spec §3.1; README FR-05 |
| FR05-UNI-002 | Khảo sát cùng từ tiếng Việt ở dạng Unicode decomposed. | Tạo keyword tương đương trực quan với `Bàn` nhưng dùng combining marks; ghi code points. | **INCOMPLETE ORACLE / SPEC GAP** — Unicode normalization chưa được định nghĩa. | Unicode normalization / Phase A |
| FR05-UNI-003 | Khảo sát phiên bản bỏ dấu của tên tiếng Việt. | `search=Ban phim co Keychron Q1` trong khi fixture có tên có dấu. | **INCOMPLETE ORACLE / SPEC GAP** — accent sensitivity/collation chưa được định nghĩa. | Vietnamese accent sensitivity / Phase A |
| FR05-UNI-004 | Khảo sát emoji như keyword không tồn tại. | `search=📦🔎`, UTF-8 percent-encoded; xác minh vắng khỏi baseline. | **INCOMPLETE ORACLE / SPEC GAP** cho Unicode handling và exact no-match response; không được lộ lỗi nội bộ. | Unicode robustness / Phase A |
| FR05-ENC-001 | Khảo sát tên tồn tại được percent-encode chuẩn. | `?search=iPhone%2015%20Pro%20Max`. | Tài liệu không định nghĩa decoding/equivalence; kết quả so với raw keyword là **INCOMPLETE ORACLE / SPEC GAP**. | Encoded input / Phase A |
| FR05-ENC-002 | Khảo sát dấu cộng được dùng thay khoảng trắng. | `?search=iPhone+15+Pro+Max`. | **INCOMPLETE ORACLE / SPEC GAP** — plus-to-space decoding chưa được định nghĩa. | Encoded input / Phase A |
| FR05-ENC-003 | Khảo sát keyword được double-encode. | `?search=iPhone%252015%2520Pro%2520Max`. | **INCOMPLETE ORACLE / SPEC GAP** — số lớp decode và match semantics chưa được định nghĩa. | Double encoding / Phase A |
| FR05-ENC-004 | Khảo sát percent-encoding không hợp lệ. | `?search=%E0%A4%A` hoặc chuỗi malformed tương đương được client cho phép gửi raw. | **INCOMPLETE ORACLE / SPEC GAP** — parsing, rejection và error response chưa được định nghĩa; không được lộ thông tin nhạy cảm. | Invalid encoding + information exposure / Phase A |
| FR05-SEC-001 | Phát hiện SQL injection kiểu tautology làm mở rộng tập kết quả. | Raw keyword `' OR '1'='1' --`, percent-encode khi tạo URL. | Input phải được xử lý như dữ liệu và không được thay đổi cấu trúc SQL hoặc trả unrelated products do tautology. Exact accept/reject/status/body là **INCOMPLETE ORACLE / SPEC GAP**. | Injection / SEC-05 |
| FR05-SEC-002 | Phát hiện UNION-based injection và lộ dữ liệu ngoài product search. | Keyword hướng `%' UNION SELECT ... --` được điều chỉnh số cột chỉ ở phase được duyệt, không nhắm dữ liệu nhạy cảm thật. | Không được thực thi UNION do caller điều khiển, thêm cột/dòng ngoài search hoặc lộ metadata/lỗi DB. Exact response là **INCOMPLETE ORACLE / SPEC GAP**. | Injection + information exposure / SEC-05 |
| FR05-SEC-003 | Phát hiện stacked-query/destructive injection mà không cho phép gây mutation. | Keyword `'; DROP TABLE products;--`; chỉ thực thi sau khi có môi trường cô lập và human approval. | Input phải là dữ liệu; không được chạy statement thứ hai, thay đổi schema hoặc dữ liệu. Phase B không thực thi payload. | Injection / SEC-05 |
| FR05-SEC-004 | Kiểm tra lỗi cú pháp do quote không làm lộ chi tiết database. | Keyword gồm quote/metacharacter tối thiểu có khả năng đi vào error path. | Response không được chứa SQL text, tên bảng/cột, stack trace, filesystem path hoặc `err.message` nhạy cảm. Exact status/body không được suy diễn. | Information exposure / Phase A source observation |
| FR05-SEC-005 | Bao phủ từ khóa giống HTML/script tại sink hiển thị đã được README định nghĩa. | `<img src=x onerror=alert(1)>` hoặc `<script>alert(1)</script>`, percent-encode trên URL. | Từ khóa phải được hiển thị như text an toàn, không render/execute HTML tại sink UI. API có phản chiếu keyword hay không và response chính xác là **INCOMPLETE ORACLE / SPEC GAP**; endpoint-only execution không đủ kết luận UI. | Unsafe output / README FR-05; SEC-04 |

## Ma trận truy vết

| Nhóm phân vùng/yêu cầu | Mã ca | Số ca | Nguồn chính |
|---|---|---:|---|
| Listing và thông tin response | `FR05-LST-001`–`FR05-LST-003` | 3 | API spec §3.1; README FR-05 |
| Keyword tồn tại và search semantics | `FR05-EXI-001`–`FR05-EXI-005` | 5 | API spec §3.1; README FR-05; Phase A gaps |
| Không có kết quả | `FR05-NOM-001`–`FR05-NOM-002` | 2 | README FR-05; Phase A |
| Empty và duplicate query | `FR05-EMP-001`–`FR05-EMP-004` | 4 | API spec §3.1; Phase A |
| Whitespace | `FR05-WS-001`–`FR05-WS-003` | 3 | Phase A |
| Một ký tự | `FR05-ONE-001`–`FR05-ONE-002` | 2 | README FR-05; Phase A |
| Keyword dài | `FR05-LEN-001`–`FR05-LEN-002` | 2 | Phase A |
| Numeric | `FR05-NUM-001`–`FR05-NUM-002` | 2 | README FR-05; Phase A |
| Ký tự đặc biệt | `FR05-SPC-001`–`FR05-SPC-004` | 4 | Phase A; SEC-05 |
| Unicode/tiếng Việt | `FR05-UNI-001`–`FR05-UNI-004` | 4 | API spec §3.1; README FR-05; Phase A |
| Encoded input | `FR05-ENC-001`–`FR05-ENC-004` | 4 | Phase A |
| Security trực tiếp | `FR05-SEC-001`–`FR05-SEC-005` | 5 | README FR-05; SEC-04; SEC-05 |
| **Tổng** | 40 ID duy nhất | **40** | Chỉ FR-05 / `GET /api/products` |

## Trạng thái

PHASE B: COMPLETE  
AI-GENERATED TEST CASES: 40  
HUMAN CASE-BY-CASE AUDIT: PENDING  
AUTOMATION: NOT CREATED  
NEXT ALLOWED PHASE: C — HUMAN REVIEW  
EXECUTION: NOT EXECUTED

