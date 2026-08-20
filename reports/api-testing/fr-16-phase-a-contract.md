# FR-16 — Phạm vi và hợp đồng Phase A

## FR-16 Scope

- Pool: **C**.
- Tính năng: **FR-16 — Product Import from CSV**.
- Endpoint duy nhất trong phạm vi: `POST /api/admin/import-products`.
- Base URL được API specification công bố: `http://localhost:3000`.
- Student ID được xác định từ skill và README của repository: `23127464`.
- Mọi HTTP request trong các phase thực thi sau này phải có `X-Student-Id: 23127464`; Phase A không gửi request nào.
- Phạm vi endpoint được xác nhận bởi `ai-first-api-testing/references/api-selection-contract.md`, FR-16 trong `src/eshop-sut/README.md`, và §6.3 trong `src/eshop-sut/api_specification.md`.
- Repository không cung cấp bằng chứng lựa chọn của các thành viên khác, nên tính không trùng của lựa chọn Pool C vẫn cần con người xác nhận.

## Contract

### Hành vi có nguồn

| Khía cạnh | Contract được tài liệu nêu | Giới hạn của contract |
|---|---|---|
| Endpoint | `POST /api/admin/import-products` | Không có endpoint khác thuộc phạm vi FR-16 này. |
| Mục tiêu | Admin import nhiều sản phẩm trong một lần. | Kích thước batch/file tối đa không được định nghĩa. |
| Request representation theo README | Upload một file có đuôi `.csv`. | Tên multipart field, `Content-Type`, encoding, giới hạn file và cơ chế upload không được định nghĩa. |
| Request representation theo API specification | JSON object có thuộc tính `products`, là array các product object. | Hai tài liệu mâu thuẫn; không có quyền chọn JSON hay CSV làm contract cuối. |
| Product fields | Cả CSV header và JSON example đều dùng `name`, `price`, `description`, `imageUrl`, `category_id`. | Kiểu dữ liệu chính xác, required/optional/nullability/default của từng field chưa được định nghĩa. JSON được trình bày dưới dạng example, không phải exact schema. |
| Validation FR-16 | `name` không được rỗng; `price` phải là số dương (`> 0`). | Không có định nghĩa whitespace-only, numeric string, NaN/infinity, precision, maximum, locale hoặc đơn vị tiền. |
| CSV header | Dòng đầu tiên: `name,price,description,imageUrl,category_id`. | Chưa định nghĩa BOM, khoảng trắng, case sensitivity, thứ tự khác, thiếu/thừa/trùng cột hoặc header lặp. |
| RFC 4180 | README yêu cầu hỗ trợ field chứa dấu phẩy khi được bọc trong dấu nháy kép và gắn nhãn RFC 4180. | README không định nghĩa rõ toàn bộ RFC 4180 có bắt buộc hay chỉ quoted-comma; CRLF, escaped quote, multiline field và trailing record chưa có oracle riêng được phê duyệt. |
| Atomicity | Nếu bất kỳ dòng nào lỗi, toàn bộ import phải rollback; all-or-nothing. | Chưa định nghĩa cách báo số dòng “thành công” khi transaction bị rollback hoặc các loại lỗi nào được tính là lỗi dòng. |
| Result reporting | Báo cáo rõ số dòng thành công, số dòng lỗi và lý do. | Không có status code, response body, field names, types, envelope, error granularity hoặc exact schema. |

### Product fields và validation

- `name`: có trong cả CSV header và JSON product example; FR-16 quy định không rỗng.
- `price`: có trong cả hai representation; FR-16 quy định là số dương.
- `description`: có trong cả hai representation; FR-16 không định nghĩa required/optional, độ dài, null hoặc empty.
- `imageUrl`: có trong cả hai representation; FR-16 không định nghĩa required/optional, URL grammar, scheme, null hoặc empty.
- `category_id`: có trong cả hai representation. FR-16 không nói rõ category phải tồn tại, có bắt buộc hay không, kiểu ID, hoặc hành vi khi tham chiếu không hợp lệ; giữ **INCOMPLETE / SPEC GAP**.

### Documented response/schema

- README chỉ đặt yêu cầu nghiệp vụ về báo cáo số dòng thành công, số dòng lỗi và lý do.
- API specification không công bố success/failure status code hoặc response example/schema cho endpoint này.
- Vì vậy exact status code, body, error reporting format và response schema đều là **INCOMPLETE / SPEC GAP**.

## Authentication / Admin Requirement

- API specification đặt endpoint trong phần “Quản trị viên (Admin)” và ghi tất cả API ở phần này yêu cầu `Authorization: Bearer <token>` cùng tài khoản có quyền Admin.
- README FR-12 yêu cầu mọi `/api/admin/*` có JWT hợp lệ và `role = 'admin'` trong token.
- SEC-02 áp dụng trực tiếp: endpoint được bảo vệ phải yêu cầu JWT hợp lệ.
- SEC-03 áp dụng trực tiếp: không đủ nếu chỉ kiểm tra sự tồn tại/hợp lệ của token; phải kiểm tra `role = 'admin'`.
- Các partition quyền truy cập cần hoạch định: admin với JWT hợp lệ; user không phải admin với JWT hợp lệ; thiếu token; token malformed/invalid; token hết hạn nếu có fixture kiểm soát.
- Tài liệu không công bố exact status code hoặc error body cho bất kỳ trường hợp từ chối nào: **INCOMPLETE / SPEC GAP**.

## Contract Conflict

**SPEC GAP / CONTRACT CONFLICT**

- README FR-16 mô tả upload file `.csv`, header `name,price,description,imageUrl,category_id`, hỗ trợ quoted comma theo RFC 4180, validate từng dòng và rollback toàn bộ nếu có một dòng lỗi.
- API specification §6.3 có tiêu đề “Import Sản phẩm từ CSV (JSON Array)” nhưng công bố `POST /api/admin/import-products` với JSON body `{ "products": [...] }`.
- Conflict nằm ở request representation và do đó ảnh hưởng trực tiếp đến `Content-Type`, body construction, empty-input/header/malformed-row/quoted-comma partitions, executable test data và request scripts ở Phase B trở đi.
- AI không chọn CSV upload hoặc JSON array làm expected contract.

### IMPLEMENTATION OBSERVATION

Các quan sát dưới đây chỉ mô tả source hiện tại, không thay thế expected contract:

- `src/eshop-sut/backend/server.js:198-203` mô tả CSV được parse ở frontend rồi gửi JSON array; route đọc `req.body.products`.
- `src/eshop-sut/backend/server.js:199` chỉ gắn `authenticateToken`; middleware tại `:100-110` xác minh JWT nhưng không kiểm tra `role = 'admin'`.
- `src/eshop-sut/backend/server.js:202-239` từ chối array rỗng, chỉ kiểm tra thiếu `name`, insert từng dòng và trả `inserted/errors`; không thấy transaction bao bọc batch, rollback toàn bộ, kiểm tra `price > 0`, hoặc parse CSV/RFC 4180 tại endpoint.
- `category_id` hiện được source mặc định thành `1` khi giá trị falsy. Đây không phải expected default vì tài liệu không định nghĩa default đó.

## HUMAN DECISION REQUIRED

- **README nói gì:** upload file `.csv`; header cố định `name,price,description,imageUrl,category_id`; quoted comma theo RFC 4180; `name` không rỗng; `price > 0`; một dòng lỗi làm rollback toàn bộ; báo số dòng thành công/lỗi và lý do.
- **API specification nói gì:** cùng endpoint nhận JSON object chứa array `products` với năm field tương ứng.
- **Conflict:** transport/request representation là CSV file hay JSON array; các chi tiết request và validation liên quan không thể đồng thời dùng làm một oracle executable duy nhất.
- **Ảnh hưởng Phase B:** không thể chốt partition representation, header/CSV parsing, body mẫu, `Content-Type`, empty input, malformed row, quoted comma hoặc expected response/schema thành test case hoàn chỉnh trước quyết định.
- **Quyết định của AI:** không tự chọn contract.

**CONTRACT DECISION: PENDING HUMAN REVIEW**

## Inputs / Planned Partitions

Đây là planned partition model cho Phase B sau khi contract được con người quyết định; không phải test cases và chưa có request nào được tạo/thực thi.

| Nhóm partition | Planned partitions | Oracle hiện có |
|---|---|---|
| Valid import | Một hoặc nhiều product hợp lệ; mọi dòng hợp lệ; category/data fixture phù hợp | Mục tiêu import nhiều sản phẩm có nguồn; success status/body chính xác chưa có. Representation còn conflict. |
| Invalid file/request representation | Sai representation so với contract cuối; file không `.csv` nếu chọn CSV; JSON/body sai kiểu nếu chọn JSON | README có `.csv`, API spec có JSON; chưa thể chốt expected representation. Exact rejection là **INCOMPLETE / SPEC GAP**. |
| Empty input | Không file/body; file rỗng; chỉ header; `products` thiếu/rỗng nếu JSON được chọn | Tài liệu không định nghĩa từng biến thể hay response chính xác. |
| Header issues | Header chính xác; thiếu/thừa/trùng/sai tên/sai thứ tự/sai case/BOM/whitespace | Chỉ exact header string có nguồn. Chính sách các biến thể là **INCOMPLETE / SPEC GAP**. |
| Malformed rows | Thiếu/thừa cột; record không hoàn chỉnh; quote không đóng; kiểu field không phù hợp | Chưa có parser/error contract chi tiết. |
| Quoted comma fields | Field có dấu phẩy được bọc double quote; dấu phẩy không quote; escaped quote/multiline nếu toàn RFC 4180 được xác nhận | Quoted comma có nguồn; phạm vi RFC 4180 còn lại cần human decision. |
| `name` validation | Giá trị thông thường; empty; missing; whitespace-only; null/non-string tùy representation cuối | Chỉ “không được rỗng” có nguồn; semantics khác chưa rõ. |
| `price` validation | Số dương; `0`; số âm; non-number; missing; boundary/precision/numeric string | `> 0` có nguồn; kiểu/coercion/maximum/precision chưa rõ. |
| `category_id` dependency | ID category tồn tại; không tồn tại; missing/null; sai kiểu | Field có nguồn; yêu cầu tồn tại/default/rejection trong FR-16 chưa rõ. |
| Một dòng invalid giữa các dòng valid | Valid-before-invalid-valid; invalid ở đầu/cuối; nhiều dòng invalid | README yêu cầu bất kỳ dòng lỗi nào làm rollback toàn bộ. |
| Rollback/atomicity | So sánh trạng thái dữ liệu trước/sau batch thất bại; không product nào của batch được commit | All-or-nothing có nguồn; cách quan sát/setup/cleanup và reporting khi rollback cần được quyết định. |
| Auth/role | Admin + valid JWT; non-admin + valid JWT; unauthenticated; invalid/malformed/expired JWT | Yêu cầu JWT + admin có nguồn; exact rejection response chưa có. |

## Applicable Security

- **Missing/invalid authentication (SEC-02):** bulk import không được chạy khi thiếu hoặc có JWT không hợp lệ.
- **Non-admin access (FR-12/SEC-03):** valid JWT của user thường không được phép thực hiện import.
- **Unauthorized bulk mutation:** mọi trường hợp bị từ chối phải không tạo bất kỳ product nào; đây là hệ quả trực tiếp của kiểm soát truy cập trên endpoint mutation hàng loạt.
- **Injection-oriented imported values (SEC-04/SEC-05):** `name`, `description`, `imageUrl` và các field do caller kiểm soát cần được xem xét với giá trị hướng SQL/HTML/script. Import không được làm thay đổi cấu trúc/truy vấn ngoài dữ liệu dự kiến; khi giá trị được hiển thị sau này phải được escape. Không suy diễn exact sanitization, response, hoặc mở rộng kiểm thử sang endpoint/UI khác.
- Không ánh xạ các SEC khác vì không ảnh hưởng trực tiếp đến FR-16.

## Spec Gaps

Mọi mục sau là **INCOMPLETE / SPEC GAP** trừ khi có quyết định hợp đồng của con người:

- Request representation cuối cùng: uploaded CSV hay JSON `products` array.
- `Content-Type`, multipart field name, filename handling, file encoding, BOM, maximum file/batch size và upload limits.
- Full RFC 4180 compliance hay chỉ hỗ trợ quoted comma; newline, escaped quote, multiline field, blank lines và trailing newline.
- Header matching policy: case, order, whitespace, thiếu/thừa/trùng cột.
- Required/optional/nullability/type/default/length/format của năm product fields.
- Semantics của `name` rỗng và numeric parsing/coercion/precision/range của `price`.
- `category_id` có bắt buộc và phải tham chiếu category tồn tại hay không; behavior/default khi thiếu hoặc không hợp lệ.
- Validation và handling cho `description`/`imageUrl`, duplicate product và duplicate rows.
- Atomic boundary trước/sau validation, database/constraint errors có kích hoạt rollback không, và concurrency behavior.
- Ý nghĩa số dòng thành công khi batch rollback, cách đánh số dòng, nhiều lỗi trên một dòng và thứ tự lỗi.
- Success/failure/auth/authorization status codes và error bodies.
- Exact response envelope, fields, types, schema và error-reporting format.
- Hành vi khi input rỗng, chỉ có header, malformed file/body hoặc unsupported representation.
- Xác nhận lựa chọn Pool C không trùng với thành viên khác.

## Data Dependencies

- Một admin account có JWT hợp lệ và một non-admin account có JWT hợp lệ; token thiếu/invalid/malformed và token hết hạn có kiểm soát nếu partition hết hạn được dùng sau này.
- Category fixture có ID tồn tại ổn định; một ID đúng định dạng nhưng không tồn tại sau khi contract ID được làm rõ.
- Dataset sản phẩm hợp lệ chứa đủ năm field theo representation được con người chọn.
- Dataset có một dòng invalid giữa các dòng valid để đánh giá atomicity.
- Baseline/count hoặc danh sách product trước import và cơ chế kiểm tra sau import để xác nhận commit/rollback, không mở rộng phạm vi thành kiểm thử endpoint admin khác.
- Cơ chế cô lập/reset dữ liệu giữa các lần thử để batch mutation có tính xác định.
- Bộ dữ liệu quoted-comma và malformed CSV chỉ được chuyển thành executable input sau quyết định CSV/JSON và mức RFC 4180.
- `X-Student-Id: 23127464` cho mọi request ở phase thực thi tương lai; Phase A không execute request.

## Artifact Paths

- Phase A contract: `reports/api-testing/fr-16-phase-a-contract.md`
- AI Audit cho interaction: `reports/ai-audit-report.md` — Entry #10

## Nguồn đã đọc

- `ai-first-api-testing/SKILL.md`
- `ai-first-api-testing/references/phase-playbook.md`
- `ai-first-api-testing/references/api-selection-contract.md`
- `ai-first-api-testing/references/api-testing-runbook.md`
- `ai-first-api-testing/references/assignment-requirements.md`
- `src/eshop-sut/api_specification.md`
- `src/eshop-sut/README.md`
- Chỉ đối chiếu implementation trực tiếp FR-16: `src/eshop-sut/backend/server.js:100-110`, `:198-239`.

## Status

PHASE A: COMPLETE  
CONTRACT DECISION: PENDING HUMAN REVIEW  
HUMAN REVIEW: PENDING  
NEXT ALLOWED PHASE: B — AI GENERATION  
EXECUTION: NOT EXECUTED
