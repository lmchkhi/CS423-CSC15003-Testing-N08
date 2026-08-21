# FR-16 — Phase C Human Review Workbook

## Thông tin nguồn và phạm vi

- Pool: **C**.
- Feature/endpoint duy nhất: **FR-16 — `POST /api/admin/import-products`**.
- Student ID: `23127464`.
- HUMAN CONTRACT DECISION: JSON array là primary contract; CSV upload là exploratory/negative.
- Artifact Phase B được kiểm toán: `tests/api-testing/test-cases/fr-16-ai-generated-phase-b.md`.
- SHA-256 Phase B artifact: `D813762456F6ED9D2BE2F53566F650EC3DCB1EAC62134ED9CDC36167CD69C44E`.
- Pre-audit dưới đây là đề xuất của AI, không phải kết luận của con người.
- Không có request nào được thực thi trong Phase C worksheet này.

### Phần A: Bảng kiểm toán AI pre-audit cho 40 ca

| Mã | Mô tả rút gọn | Danh mục | Đề xuất AI | Lý do/đề xuất chỉnh sửa của AI | Kết luận con người | Lý do của con người | Chỉnh sửa cuối cùng |
|---|---|---|---|---|---|---|---|
| FR16-VLD-001 | Import một product JSON hợp lệ | Valid import | VALID | Primary JSON contract, input và semantic success oracle có nguồn; không assert status/schema. | VALID | Primary JSON contract và product hợp lệ cung cấp input cùng semantic success oracle trực tiếp; ca có thể kiểm tra bằng marker duy nhất. | N/A |
| FR16-VLD-002 | Import batch ba product hợp lệ | Valid import / batch | VALID | FR-16 cho phép bulk import; all-success behavior thực thi được bằng marker dữ liệu. | VALID | FR-16 yêu cầu bulk import; batch ba product hợp lệ kiểm tra việc tạo đầy đủ cả batch mà không cần exact response. | N/A |
| FR16-VLD-003 | Description JSON chứa dấu phẩy | Valid import / RFC 4180 context | VALID | API spec có field description; human decision yêu cầu giữ ca quoted-comma context qua JSON. Chỉ assert dấu phẩy là dữ liệu JSON, không suy diễn CSV parser. | VALID | API spec công bố description và human contract giữ quoted-comma context qua JSON; dấu phẩy được kiểm tra như dữ liệu của một field. | N/A |
| FR16-VLD-004 | Import một product đủ năm field | Valid import / full fields | INVALID | Trùng semantic với FR16-VLD-001 vì VLD-001 đã gửi đủ cả năm field. Đề xuất loại hoặc thiết kế lại sau khi optionality/field fidelity có oracle. | INVALID | Ca này trùng FR16-VLD-001 vì cả hai đều import một product hợp lệ có đủ năm field. | Loại khỏi bộ executable; giữ FR16-VLD-001. |
| FR16-AUTH-001 | Admin JWT hợp lệ được import | Authentication / admin authorization | VALID | JWT hợp lệ và role admin có nguồn trực tiếp từ FR-12, SEC-02, SEC-03 và phần Admin của API spec. | VALID | FR-12, SEC-02 và SEC-03 cho phép tài khoản admin có JWT hợp lệ thực hiện endpoint admin; success oracle là có import. | N/A |
| FR16-AUTH-002 | User thường có JWT bị từ chối | Authorization / non-admin | VALID | SEC-03/FR-12 trực tiếp yêu cầu role admin; semantic oracle không tạo product là đủ. | VALID | JWT của user thường không thỏa role admin theo FR-12 và SEC-03; có thể assert request bị từ chối và không tạo product. | N/A |
| FR16-AUTH-003 | Thiếu Authorization | Authentication / missing token | VALID | SEC-02 yêu cầu JWT hợp lệ; thiếu token phải không được import. | VALID | Thiếu Authorization đồng nghĩa không có JWT hợp lệ theo SEC-02; semantic no-import oracle đủ để thực thi. | N/A |
| FR16-AUTH-004 | Authorization rỗng | Authentication / empty header | VALID | Header rỗng không cung cấp JWT hợp lệ; semantic rejection có nguồn. | VALID | Authorization rỗng không cung cấp token hợp lệ; SEC-02 trực tiếp làm căn cứ cho rejection và no mutation. | N/A |
| FR16-AUTH-005 | Bearer không có token | Authentication / missing bearer token | VALID | Không có JWT hợp lệ; chỉ assert không import, không cần status/body. | VALID | Bearer scheme không kèm token không đáp ứng JWT hợp lệ; ca không cần dựa vào exact status hoặc body. | N/A |
| FR16-AUTH-006 | Token ngẫu nhiên | Authentication / invalid token | VALID | Token ngẫu nhiên không phải JWT hợp lệ theo SEC-02; ca thực thi được. | VALID | Chuỗi token ngẫu nhiên không phải JWT hợp lệ theo SEC-02; có thể kiểm tra endpoint không import batch. | N/A |
| FR16-AUTH-007 | JWT hết hạn | Authentication / expired token | VALID | JWT hết hạn không còn hợp lệ theo SEC-02; cần fixture token hết hạn kiểm soát được. | VALID | JWT hết hạn không còn hợp lệ; fixture exp trong quá khứ cho phép kiểm tra semantic rejection xác định. | N/A |
| FR16-AUTH-008 | JWT bị sửa signature | Authentication / tampered token | VALID | Signature sai làm JWT không hợp lệ; semantic rejection có nguồn từ SEC-02. | VALID | JWT có signature bị sửa không vượt qua xác minh tính toàn vẹn; no-import oracle có nguồn từ SEC-02. | N/A |
| FR16-NAME-001 | `name=""` | Name validation / empty | VALID | README FR-16 trực tiếp cấm name rỗng và yêu cầu rollback khi một dòng lỗi. | VALID | README FR-16 cấm name rỗng và yêu cầu rollback khi bất kỳ dòng nào lỗi; input chuỗi rỗng có oracle trực tiếp. | N/A |
| FR16-NAME-002 | Thiếu key name | Name validation / missing | VALID | Không có name không thể thỏa name không rỗng; rollback semantic có nguồn. | VALID | Product thiếu hoàn toàn key name không đáp ứng yêu cầu name không rỗng; reject và rollback là oracle có nguồn. | N/A |
| FR16-NAME-003 | `name=null` | Name validation / null | INCOMPLETE | FR-16 không định nghĩa type/null semantics; cần con người phê duyệt rằng null được xem là rỗng và phải reject trước khi executable. | INCOMPLETE | FR-16 không định nghĩa kiểu của name hoặc null có được đồng nhất với chuỗi rỗng hay không. | Chưa đưa vào executable suite; cần phê duyệt null phải bị reject và kích hoạt rollback. |
| FR16-NAME-004 | Name chỉ có whitespace | Name validation / whitespace | INCOMPLETE | Thiếu trim/whitespace rule. Cần quyết định accept hay reject và cách quan sát giá trị. | INCOMPLETE | Tài liệu không quy định trim hoặc whitespace-only có được xem là name rỗng. | Chưa đưa vào executable suite; cần chốt trim rule và oracle accept/reject. |
| FR16-NAME-005 | Name 10.000 ký tự | Name validation / length | INCOMPLETE | FR-16 không có maximum length. Cần giới hạn và expected behavior có nguồn hoặc loại khỏi executable suite. | INCOMPLETE | FR-16 không công bố giới hạn độ dài name hoặc behavior khi vượt giới hạn. | Chưa đưa vào executable suite; cần nguồn cho maximum length và semantic rejection. |
| FR16-PRICE-001 | `price=1` | Price validation / positive boundary | VALID | Là số dương nhỏ nhất trong partition integer đã chọn; đáp ứng `price > 0`. | VALID | Giá trị 1 là JSON number dương và nằm sát boundary hợp lệ của điều kiện price > 0. | N/A |
| FR16-PRICE-002 | `price=0` | Price validation / zero | VALID | Vi phạm trực tiếp điều kiện `> 0`; reject/rollback semantic có nguồn. | VALID | Giá trị 0 vi phạm trực tiếp điều kiện price > 0; reject và rollback có nguồn từ FR-16. | N/A |
| FR16-PRICE-003 | `price=-1` | Price validation / negative | VALID | Vi phạm trực tiếp điều kiện số dương; reject/rollback semantic có nguồn. | VALID | Giá trị âm không phải số dương; semantic rejection và rollback toàn batch đã được README quy định. | N/A |
| FR16-PRICE-004 | `price="abc"` | Price validation / wrong type | INCOMPLETE | Thiếu field type/coercion rule và oracle cho non-number JSON string. Cần phê duyệt reject/no coercion. | INCOMPLETE | Thiếu quy tắc kiểu dữ liệu và coercion cho JSON string không phải số như abc. | Chưa đưa vào executable suite; cần chốt price phải là JSON number và string abc phải bị reject. |
| FR16-PRICE-005 | Price null hoặc missing | Price validation / null or missing | INCOMPLETE | Required/null/coercion semantics chưa được định nghĩa. Nên tách thành hai ca sau khi có oracle. | INCOMPLETE | Required, null và missing semantics của price chưa được định nghĩa; một ca hiện còn gộp hai biến thể. | Tách null và missing thành hai ca sau khi có oracle reject/coercion được phê duyệt. |
| FR16-PRICE-006 | `price=1.5` | Price validation / positive decimal | VALID | `1.5` là JSON number dương; FR-16 không giới hạn price ở integer. Không assert precision lưu trữ. | VALID | Giá trị 1.5 là JSON number dương và FR-16 không giới hạn price ở số nguyên; không cần assert precision lưu trữ. | N/A |
| FR16-CAT-001 | Category ID tồn tại | Category dependency / existing | VALID | Dùng fixture category tồn tại loại bỏ ambiguity về tham chiếu; product còn lại hợp lệ theo primary contract. | VALID | Category ID tồn tại trong fixture loại bỏ ambiguity tham chiếu và cho phép kiểm tra product hợp lệ theo primary contract. | N/A |
| FR16-CAT-002 | Category ID không tồn tại | Category dependency / nonexistent | INCOMPLETE | FR-16 không định nghĩa referential validation hoặc accept/reject behavior. Cần oracle category dependency. | INCOMPLETE | FR-16 không định nghĩa category referential validation hoặc behavior cho ID không tồn tại. | Chưa đưa vào executable suite; cần chốt nonexistent category phải được accept hay reject. |
| FR16-CAT-003 | Thiếu category_id | Category dependency / missing | INCOMPLETE | Required/optional/default của category_id chưa có nguồn. Không được tự assert default hoặc reject. | INCOMPLETE | Tài liệu không xác định category_id là bắt buộc, tùy chọn hay có default. | Chưa đưa vào executable suite; cần chốt required/default rule và oracle tương ứng. |
| FR16-CAT-004 | Category ID sai kiểu | Category dependency / wrong type | INCOMPLETE | Thiếu type/grammar/coercion rule. Cần xác định kiểu ID và semantic rejection. | INCOMPLETE | Thiếu type, grammar và coercion rule cho category_id sai kiểu. | Chưa đưa vào executable suite; cần xác định kiểu category_id và semantic rejection. |
| FR16-ATOM-001 | Invalid row ở giữa batch | Atomicity / invalid middle | VALID | README FR-16 trực tiếp yêu cầu bất kỳ dòng lỗi nào làm rollback toàn bộ. | VALID | README FR-16 yêu cầu một dòng lỗi ở bất kỳ vị trí nào rollback toàn bộ; vị trí giữa kiểm tra trực tiếp all-or-nothing. | N/A |
| FR16-ATOM-002 | Invalid row ở đầu batch | Atomicity / invalid first | VALID | Vị trí đầu kiểm tra cùng all-or-nothing rule với dữ liệu khác biệt, không cần exact response. | VALID | Invalid row ở đầu batch có oracle rollback toàn bộ và xác nhận các dòng hợp lệ phía sau không được lưu. | N/A |
| FR16-ATOM-003 | Invalid row ở cuối batch | Atomicity / invalid last | VALID | Phát hiện partial commit trước lỗi cuối; oracle không product nào được lưu có nguồn trực tiếp. | VALID | Invalid row ở cuối kiểm tra không có partial commit của các dòng đã xử lý trước; oracle có nguồn trực tiếp từ FR-16. | N/A |
| FR16-ATOM-004 | Kiểm tra DB sau failed batch | Atomicity / persistence verification | VALID | Là kiểm tra hậu trạng thái trực tiếp cho rollback; cần fixture/read-only verification đã duyệt nhưng không thiếu business oracle. | VALID | So sánh data store trước và sau failed batch là phép kiểm tra thực thi được cho yêu cầu không product nào được commit. | N/A |
| FR16-INPUT-001 | Body `{}` | Empty/invalid input / empty object | VALID | Không khớp primary JSON shape `{products:[...]}`; semantic reject/no mutation thực thi được. | VALID | Body rỗng không khớp primary shape có products array; semantic reject và no mutation không cần exact response. | N/A |
| FR16-INPUT-002 | Thiếu products, dùng items | Empty/invalid input / missing products | VALID | API spec §6.3 công bố property products; body không có products không phải request hợp lệ. | VALID | API spec §6.3 công bố key products, nên body chỉ có items không phải request representation hợp lệ. | N/A |
| FR16-INPUT-003 | `products=[]` | Empty/invalid input / empty array | VALID | Không có product để import; human Phase B instruction chốt semantic reject/no mutation, không cần exact response. | VALID | Array rỗng không chứa product để import; human contract đã chốt semantic reject/no mutation cho partition này. | N/A |
| FR16-INPUT-004 | Products là object/string/null | Empty/invalid input / wrong container type | VALID | Primary contract yêu cầu array. Nên tách ba iteration khi executable nhưng semantic oracle đã đủ. | VALID | Primary contract yêu cầu products là array; object, string và null là các kiểu container không hợp lệ có thể chạy theo iteration. | N/A |
| FR16-SEC-001 | SQL injection payload trong name | Security / SQL injection | VALID | SEC-05 trực tiếp yêu cầu parameterized query. Chỉ giữ invariant không thực thi SQL/không đổi dữ liệu ngoài ý muốn; loại accept/reject literal khỏi oracle. | VALID | SEC-05 yêu cầu parameterized query; invariant không thực thi payload SQL và không đổi dữ liệu ngoài ý muốn có thể kiểm tra được. | N/A |
| FR16-SEC-002 | Script payload trong description | Security / XSS-oriented value | INCOMPLETE | SEC-04 đặt oracle tại lúc hiển thị, ngoài response của POST import; exact store/sanitize/accept/reject chưa có. Cần cơ chế quan sát được phê duyệt hoặc defer khỏi endpoint-only executable suite. | INCOMPLETE | SEC-04 đặt yêu cầu escape tại lúc hiển thị, trong khi POST import không cung cấp oracle cho store, sanitize, accept hoặc reject script value. | Chưa đưa vào endpoint-only executable suite; cần cơ chế quan sát lúc hiển thị hoặc contract lưu/sanitize được phê duyệt. |
| FR16-SEC-003 | Auth fail không gây bulk mutation | Security / unauthorized bulk mutation | INVALID | Trùng semantic với FR16-AUTH-006: invalid token, batch hợp lệ và không product nào được tạo. Đề xuất gộp persistence check vào AUTH-006 hoặc loại ca này. | INVALID | Ca này trùng FR16-AUTH-006 vì cùng dùng invalid token, batch hợp lệ và oracle không product nào được tạo. | Loại khỏi bộ executable; bổ sung persistence assertion vào FR16-AUTH-006 nếu cần. |
| FR16-CSV-001 | Multipart file `.csv` | Spec conflict / CSV multipart | VALID | Human decision trực tiếp yêu cầu exploratory/negative CSV case. Chỉ assert không import theo primary JSON contract; không assert status/body. | VALID | Human contract quyết định multipart CSV là exploratory negative; semantic oracle không import đủ để ghi nhận conflict mà không bịa status/body. | N/A |
| FR16-CSV-002 | Raw `text/csv` body | Spec conflict / raw CSV | VALID | Human decision trực tiếp yêu cầu biến thể raw CSV; semantic no-import oracle đủ cho exploratory test. | VALID | Human contract quyết định raw text/csv là exploratory negative riêng; request có thể thực thi với no-import oracle. | N/A |

#### Thống kê đề xuất AI

| Nhãn đề xuất AI | Số ca |
|---|---:|
| VALID | 29 |
| INVALID | 2 |
| INCOMPLETE | 9 |
| **Tổng** | **40** |

Các số trên chỉ là AI pre-audit. Con người chưa xác nhận bất kỳ nhãn nào.

### Phần B: Vùng ca kiểm thử do con người bổ sung

| Slot | Mã do người review đặt | Mục tiêu / kết quả mong đợi | Nguồn yêu cầu | Lý do AI bỏ sót | Xác nhận do con người tạo |
|---:|---|---|---|---|---|
| 1 | FR16-H01 | Gửi `GET /api/admin/import-products` với admin JWT hợp lệ → server phải reject và không import product. | API spec §6.3 chỉ công bố phương thức `POST`. | AI không kiểm tra method mismatch. | CON-NGUOI-BO-SUNG |
| 2 | FR16-H02 | Gửi JSON `products` array chứa 500+ object hợp lệ → **INCOMPLETE / SPEC GAP** về giới hạn/behavior của batch lớn; server không được crash. | Phase A spec gap: batch/file size limit không được định nghĩa. | AI chỉ kiểm tra batch nhỏ gồm 1–3 product. | CON-NGUOI-BO-SUNG |
| 3 | FR16-H03 | Gửi batch có 2 product cùng `name` và `category_id` → **INCOMPLETE / SPEC GAP** vì duplicate handling chưa được định nghĩa. | Phase A spec gap: duplicate product/duplicate rows. | AI không xét duplicate logic. | CON-NGUOI-BO-SUNG |
| 4 | FR16-H04 | Gửi product có extra field `malicious_field` → extra field phải bị bỏ qua; chỉ năm field công bố được lưu và không có side effect. | API spec §6.3 chỉ công bố `name`, `price`, `description`, `imageUrl`, `category_id`; SEC-05. | AI kiểm tra field thiếu/sai kiểu nhưng không kiểm tra field thừa. | CON-NGUOI-BO-SUNG |
| 5 | FR16-H05 | User thường gửi batch 3 product hợp lệ; so sánh DB trước/sau → request bị từ chối và không product nào của batch được tạo. | FR-12; SEC-03; atomicity của README FR-16. | AI có AUTH-002 nhưng không verify DB persistence; SEC-003 bị đề xuất INVALID nên thiếu coverage persistence cho non-admin. | CON-NGUOI-BO-SUNG |

### Phần C: Gate Phase C

- [x] Con người đã gắn nhãn cho 40/40 ca.
- [x] Mọi ca INVALID/INCOMPLETE có lý do và chỉnh sửa cuối cùng.
- [x] Đã bổ sung ít nhất 5 ca human-origin.
- [x] Mỗi ca human-origin có nguồn và lý do AI bỏ sót.
- [x] Bản cuối đã được con người phê duyệt để chuyển sang executable tests.

### Trạng thái

PHASE C: COMPLETE
AI PRE-AUDIT: COMPLETE  
HUMAN CASE-BY-CASE AUDIT: COMPLETE  
HUMAN-ADDED CASES: 5 COMPLETE  
EXECUTION: NOT EXECUTED

## Phase C2 human correction addendum

The labels above are retained as audit history. All 9 formerly `INCOMPLETE` AI cases, both formerly `INVALID` AI cases, and `FR16-H02`/`FR16-H03` were corrected into executable final cases. The final collection contains 45/45 unique cases and excludes none. Decisions and evidence are in `reports/api-testing/human-correction-rerun.md`.

FINAL CORRECTED CASES: 45/45 EXECUTABLE
FINAL RERUN: 45 EXECUTED — 29 PASSED, 16 FAILED
