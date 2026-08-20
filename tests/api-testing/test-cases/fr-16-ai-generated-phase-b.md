# FR-16 — AI-generated test cases — Phase B

## Scope và contract đã được con người quyết định

- Pool: **C**.
- Feature: **FR-16 — Product Import from CSV**.
- Endpoint duy nhất: `POST /api/admin/import-products`.
- **HUMAN DECISION — PRIMARY CONTRACT:** gửi `Content-Type: application/json` với body `{ "products": [...] }`.
- **HUMAN DECISION — SECONDARY/EXPLORATORY:** chỉ có hai ca CSV upload để ghi nhận conflict README/API specification; không coi CSV là primary executable contract.
- Nguồn gốc toàn bộ ca trong file: `AI-SINH`.
- Human case-by-case audit: `PENDING` và chỉ được thực hiện ở Phase C.

## Preconditions chung

- Mọi request ở phase thực thi tương lai phải có `X-Student-Id: 23127464`; không tạo test case riêng cho header này.
- Trừ ca authentication/authorization và CSV exploratory có ghi khác, request dùng JWT hợp lệ của admin và `Content-Type: application/json`.
- `<existingCategoryId>` là category ID tồn tại ổn định trong fixture; `<nonexistentCategoryId>` không tồn tại nhưng đúng grammar sau khi grammar được làm rõ.
- Mỗi product dùng marker `name` duy nhất để có thể kiểm tra mutation. Dữ liệu phải được cô lập/reset giữa các ca.
- “Được import/tạo” và “reject” là semantic oracle; không suy diễn exact HTTP status, response body hoặc error schema.
- Khi cần xác minh rollback hoặc unauthorized mutation, phải so sánh trạng thái dữ liệu trước/sau mà không mở rộng phạm vi sang API admin khác.

### Bảng test case endpoint POST /api/admin/import-products

| Mã | Mục tiêu | Dữ liệu đầu vào | Kết quả mong đợi | Danh mục | Nguồn |
|---|---|---|---|---|---|
| FR16-VLD-001 | Import đúng một product hợp lệ theo primary JSON contract. | Admin JWT hợp lệ; `products` có 1 object: `name="FR16-VLD-001"`, `price=10000`, `description="Basic"`, `imageUrl="https://example.test/1.png"`, `category_id=<existingCategoryId>`. | Product được import; báo cáo kết quả phải phản ánh semantic thành công, không assert exact status/body/schema. | Valid import | HUMAN CONTRACT DECISION; API spec §6.3; README FR-16 |
| FR16-VLD-002 | Import batch nhiều product đều hợp lệ. | Admin JWT hợp lệ; `products` có 3 object hợp lệ với marker `FR16-VLD-002-A/B/C`, giá dương và category tồn tại. | Cả 3 product được import; không có partial omission; không assert exact response format. | Valid import / batch | HUMAN CONTRACT DECISION; API spec §6.3; README FR-16 |
| FR16-VLD-003 | Xác nhận dấu phẩy trong description được truyền an toàn trong JSON, tương ứng quoted-comma context của README. | Một product hợp lệ với `description="Mô tả có dấu phẩy, vẫn là một field"`; JSON encoding hợp lệ. | Product được import và dấu phẩy thuộc cùng giá trị description; không áp dụng CSV parsing cho JSON body. | Valid import / RFC 4180 context | HUMAN CONTRACT DECISION; README FR-16; API spec §6.3 |
| FR16-VLD-004 | Import product có đủ cả năm field được công bố. | `name="FR16-VLD-004"`, `price=25000`, `description="Đủ field"`, `imageUrl="https://example.test/full.png"`, `category_id=<existingCategoryId>`. | Product được import với dữ liệu thuộc năm field; exact persisted/response schema không được assert. | Valid import / full fields | API spec §6.3; README FR-16 |
| FR16-AUTH-001 | Xác nhận admin có JWT hợp lệ được phép thực hiện bulk import. | Admin JWT hợp lệ; batch 2 product hợp lệ với marker riêng. | Import được phép và cả hai product được tạo. | Authentication / admin authorization | FR-12; SEC-02; SEC-03; API spec Admin section |
| FR16-AUTH-002 | Ngăn user không phải admin thực hiện import. | JWT hợp lệ của user thường; batch hợp lệ. | Request phải bị reject và không product nào của batch được tạo; không assert 401/403. | Authorization / non-admin | FR-12; SEC-03; API spec Admin section |
| FR16-AUTH-003 | Ngăn import khi thiếu Authorization header. | Không có `Authorization`; batch hợp lệ. | Request phải bị reject và không product nào được tạo; không assert exact status/body. | Authentication / missing token | SEC-02; FR-12 |
| FR16-AUTH-004 | Ngăn import khi Authorization có giá trị rỗng. | `Authorization: ""`; batch hợp lệ. | Request phải bị reject và không product nào được tạo. | Authentication / empty header | SEC-02; FR-12 |
| FR16-AUTH-005 | Ngăn import với Bearer scheme nhưng thiếu token. | `Authorization: Bearer`; batch hợp lệ. | Request phải bị reject và không product nào được tạo. | Authentication / missing bearer token | SEC-02; FR-12 |
| FR16-AUTH-006 | Ngăn import với token ngẫu nhiên không phải JWT hợp lệ. | `Authorization: Bearer not-a-valid-jwt`; batch hợp lệ. | Request phải bị reject và không product nào được tạo. | Authentication / invalid token | SEC-02; FR-12 |
| FR16-AUTH-007 | Ngăn import với JWT đã hết hạn. | JWT admin có `exp` trong quá khứ, chữ ký hợp lệ; batch hợp lệ. | Request phải bị reject và không product nào được tạo; không assert exact rejection response. | Authentication / expired token | SEC-02; FR-12 |
| FR16-AUTH-008 | Ngăn import với JWT admin bị sửa signature. | JWT admin có payload/role giữ nguyên nhưng signature bị thay đổi; batch hợp lệ. | Request phải bị reject và không product nào được tạo. | Authentication / tampered token | SEC-02; FR-12 |
| FR16-NAME-001 | Reject product có `name` là chuỗi rỗng. | Batch 1 object với `name=""`, `price=10000`, category tồn tại. | Request/batch phải bị reject và toàn bộ batch rollback; không product nào được lưu. | Name validation / empty | README FR-16 |
| FR16-NAME-002 | Reject product thiếu key `name`. | Batch 1 object không có `name`, các field còn lại hợp lệ. | Request/batch phải bị reject và toàn bộ batch rollback. | Name validation / missing | README FR-16; API spec §6.3 |
| FR16-NAME-003 | Reject product có `name=null`. | Batch 1 object với `name=null`, `price=10000`, category tồn tại. | Null không thỏa `name` không rỗng; request/batch phải bị reject và rollback toàn bộ. | Name validation / null | README FR-16 |
| FR16-NAME-004 | Khảo sát semantics của `name` chỉ gồm whitespace. | Batch 1 object với `name="   "`, các field khác hợp lệ. | **INCOMPLETE / SPEC GAP** — tài liệu không định nghĩa trim/whitespace-only là rỗng hay hợp lệ; không đặt oracle accept/reject trước human review. | Name validation / whitespace | README FR-16; Phase A Spec Gaps |
| FR16-NAME-005 | Khảo sát giới hạn độ dài `name`. | Batch 1 object với `name` rất dài (ví dụ 10.000 ký tự), các field khác hợp lệ. | **INCOMPLETE / SPEC GAP** — FR-16 không định nghĩa maximum length hoặc behavior khi vượt giới hạn. | Name validation / length | README FR-16; Phase A Spec Gaps |
| FR16-PRICE-001 | Import product có `price` là số nguyên dương. | Một product hợp lệ với `price=1`. | Product được import vì `price > 0`; không assert exact response. | Price validation / positive boundary | README FR-16 |
| FR16-PRICE-002 | Reject boundary `price=0`. | Batch 1 object với `price=0`, `name` hợp lệ, category tồn tại. | Request/batch phải bị reject và rollback toàn bộ vì price không lớn hơn 0. | Price validation / zero | README FR-16 |
| FR16-PRICE-003 | Reject `price` âm. | Batch 1 object với `price=-1`, các field khác hợp lệ. | Request/batch phải bị reject và rollback toàn bộ. | Price validation / negative | README FR-16 |
| FR16-PRICE-004 | Khảo sát price là string không thể chuyển thành số. | Batch 1 object với `price="abc"`, các field khác hợp lệ. | **INCOMPLETE / SPEC GAP** — chưa có contract về type checking/coercion và exact handling cho non-number. | Price validation / wrong type | README FR-16; Phase A Spec Gaps |
| FR16-PRICE-005 | Khảo sát price null và thiếu key price. | Hai biến thể độc lập: `price=null`; object không có `price`. | **INCOMPLETE / SPEC GAP** — chưa có oracle được phê duyệt cho null/missing hoặc coercion; không assert exact handling. | Price validation / null or missing | README FR-16; Phase A Spec Gaps |
| FR16-PRICE-006 | Import price thập phân dương. | Một product hợp lệ với JSON number `price=1.5`. | Product được import vì là số và `> 0`; precision/persisted representation không được assert. | Price validation / positive decimal | README FR-16 |
| FR16-CAT-001 | Import với `category_id` tham chiếu category tồn tại. | Một product hợp lệ với `category_id=<existingCategoryId>`. | Product được import; không assert response schema. | Category dependency / existing | HUMAN CONTRACT DECISION; API spec §6.3; README FR-16 |
| FR16-CAT-002 | Khảo sát `category_id` không tồn tại. | Một product có `category_id=<nonexistentCategoryId>`, name/price hợp lệ. | **INCOMPLETE / SPEC GAP** — FR-16 không định nghĩa referential validation hoặc accept/reject behavior. | Category dependency / nonexistent | API spec §6.3; Phase A Spec Gaps |
| FR16-CAT-003 | Khảo sát object thiếu `category_id`. | Một product không có key `category_id`, name/price hợp lệ. | **INCOMPLETE / SPEC GAP** — required/optional/default của category chưa được định nghĩa. | Category dependency / missing | API spec §6.3; Phase A Spec Gaps |
| FR16-CAT-004 | Khảo sát `category_id` sai kiểu. | Một product với `category_id="abc"`, name/price hợp lệ. | **INCOMPLETE / SPEC GAP** — type/grammar/coercion và rejection behavior chưa được định nghĩa. | Category dependency / wrong type | API spec §6.3; Phase A Spec Gaps |
| FR16-ATOM-001 | Xác nhận một dòng invalid nằm giữa các dòng valid làm rollback toàn batch. | Batch `[valid A, invalid name="", valid C]`, mọi marker duy nhất. | Batch phải bị reject; không product A, invalid row hoặc C nào được lưu. | Atomicity / invalid middle | README FR-16 |
| FR16-ATOM-002 | Xác nhận dòng đầu invalid làm rollback các dòng valid phía sau. | Batch `[invalid price=0, valid B, valid C]`. | Toàn bộ batch rollback; không product nào của batch được lưu. | Atomicity / invalid first | README FR-16 |
| FR16-ATOM-003 | Xác nhận dòng cuối invalid rollback các dòng valid đã xử lý trước đó. | Batch `[valid A, valid B, invalid name missing]`. | Toàn bộ batch rollback; không product nào của batch được lưu. | Atomicity / invalid last | README FR-16 |
| FR16-ATOM-004 | Xác minh trực tiếp hậu trạng thái DB sau failed batch. | Ghi baseline; gửi batch có marker `FR16-ATOM-004-A/B/C` và một row `price=-1`; kiểm tra lại data store bằng cơ chế fixture/read-only đã được duyệt. | Không marker product nào của batch tồn tại sau request; dữ liệu baseline không đổi. | Atomicity / persistence verification | README FR-16; Phase A Data Dependencies |
| FR16-INPUT-001 | Reject JSON body rỗng. | Body `{}`. | Request phải bị reject và không product nào được tạo; không assert exact status/body. | Empty/invalid input / empty object | HUMAN CONTRACT DECISION; API spec §6.3 |
| FR16-INPUT-002 | Reject body thiếu `products` nhưng có property khác. | Body `{ "items": [<validProduct>] }`. | Request phải bị reject và không product nào được tạo. | Empty/invalid input / missing products | HUMAN CONTRACT DECISION; API spec §6.3 |
| FR16-INPUT-003 | Reject `products` là array rỗng. | Body `{ "products": [] }`. | Request phải bị reject và không product nào được tạo. | Empty/invalid input / empty array | HUMAN CONTRACT DECISION; README FR-16 import nhiều sản phẩm |
| FR16-INPUT-004 | Reject `products` không phải array. | Các biến thể độc lập: `{ "products": {} }`, `{ "products": "abc" }`, `{ "products": null }`. | Mỗi request phải bị reject và không product nào được tạo; exact rejection response không được assert. | Empty/invalid input / wrong container type | HUMAN CONTRACT DECISION; API spec §6.3 |
| FR16-SEC-001 | Ngăn SQL injection qua `name` gây thực thi truy vấn ngoài ý muốn. | Admin JWT hợp lệ; `name="x'); DROP TABLE products;--"`, price dương, category tồn tại. | Giá trị phải được xử lý như dữ liệu; không được thực thi SQL hoặc thay đổi/xóa schema và record không liên quan. Việc lưu hay reject literal value là **INCOMPLETE / SPEC GAP**. | Security / SQL injection | SEC-05; README FR-16 |
| FR16-SEC-002 | Ngăn script trong description được thực thi như mã. | Admin JWT hợp lệ; `description="<script>alert(1)</script>"`, các field khác hợp lệ. | Import không được thực thi script hoặc gây mutation ngoài product dự kiến. Exact sanitization, persisted representation và accept/reject là **INCOMPLETE / SPEC GAP**; khi hiển thị phải được escape. | Security / XSS-oriented value | SEC-04; README FR-16 |
| FR16-SEC-003 | Xác nhận auth failure không gây partial hoặc delayed bulk mutation. | Token không hợp lệ; batch nhiều product hợp lệ với marker riêng; kiểm tra trạng thái trước/sau. | Request phải bị reject và không product nào của batch được tạo tại bất kỳ thời điểm quan sát nào. | Security / unauthorized bulk mutation | SEC-02; FR-12; SEC-03 |
| FR16-CSV-001 | Ghi nhận conflict khi gửi file `.csv` bằng multipart/form-data. | Admin JWT hợp lệ; multipart chứa file `.csv` với header `name,price,description,imageUrl,category_id` và một row hợp lệ. | **HUMAN DECISION — EXPLORATORY/NEGATIVE:** request nằm ngoài primary JSON contract; server phải reject hoặc không import product. Exact status/body và multipart field name là **INCOMPLETE / SPEC GAP**. | Spec conflict / CSV multipart | HUMAN CONTRACT DECISION; README FR-16; API spec §6.3 |
| FR16-CSV-002 | Ghi nhận conflict khi gửi raw CSV body. | Admin JWT hợp lệ; `Content-Type: text/csv`; raw body gồm exact header và một row hợp lệ. | **HUMAN DECISION — EXPLORATORY/NEGATIVE:** request nằm ngoài primary JSON contract; server phải reject hoặc không import product. Exact status/body là **INCOMPLETE / SPEC GAP**. | Spec conflict / raw CSV | HUMAN CONTRACT DECISION; README FR-16; API spec §6.3 |

### Traceability matrix

| Partition / requirement | Test case IDs | Số ca | Nguồn chính |
|---|---|---:|---|
| Valid import | `FR16-VLD-001`–`FR16-VLD-004` | 4 | HUMAN CONTRACT DECISION; API spec §6.3; README FR-16 |
| Authentication / authorization | `FR16-AUTH-001`–`FR16-AUTH-008` | 8 | FR-12; SEC-02; SEC-03; API spec Admin section |
| Name validation | `FR16-NAME-001`–`FR16-NAME-005` | 5 | README FR-16; Phase A Spec Gaps |
| Price validation | `FR16-PRICE-001`–`FR16-PRICE-006` | 6 | README FR-16; Phase A Spec Gaps |
| `category_id` dependency | `FR16-CAT-001`–`FR16-CAT-004` | 4 | API spec §6.3; Phase A Spec Gaps |
| Atomicity / rollback | `FR16-ATOM-001`–`FR16-ATOM-004` | 4 | README FR-16; Phase A Data Dependencies |
| Empty / invalid input | `FR16-INPUT-001`–`FR16-INPUT-004` | 4 | HUMAN CONTRACT DECISION; API spec §6.3 |
| Security / injection | `FR16-SEC-001`–`FR16-SEC-003` | 3 | SEC-02; SEC-04; SEC-05; FR-12; SEC-03 |
| CSV spec conflict | `FR16-CSV-001`–`FR16-CSV-002` | 2 | HUMAN CONTRACT DECISION; README FR-16; API spec §6.3 |
| **Tổng** | `FR16-VLD-001`–`FR16-CSV-002` | **40** | Bao phủ toàn bộ partition được giao |

### Status

PHASE B: COMPLETE  
HUMAN CONTRACT DECISION: JSON ARRAY PRIMARY; CSV EXPLORATORY/NEGATIVE  
AI-GENERATED TEST CASES: 40  
HUMAN CASE-BY-CASE AUDIT: PENDING  
NEXT ALLOWED PHASE: C — HUMAN REVIEW  
EXECUTION: NOT EXECUTED
