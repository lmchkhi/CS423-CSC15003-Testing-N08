# FR-05 — Worksheet kiểm toán con người Phase C

## Thông tin kiểm soát

- Pool: **A**.
- Tính năng/điểm cuối: **FR-05 — `GET /api/products`**, query tùy chọn `?search=<keyword>`.
- Student ID: `23127464`.
- Bản AI gốc được giữ nguyên tại `tests/api-testing/test-cases/fr-05-ai-generated-phase-b.md`.
- SHA-256 bản AI gốc: `C9392ECB27D3AA60DEB4B673B9B61348A18884BD9ADB39D6E168C145A54FE324`.
- Cột **Đề xuất AI** là pre-audit để hỗ trợ review, không phải kết luận của con người.
- Người review phải điền độc lập **Kết luận con người** bằng đúng một nhãn `VALID`, `INVALID` hoặc `INCOMPLETE`, kèm lý do và chỉnh sửa cuối cùng.
- Con người đã hoàn tất audit 40/40 ca, bổ sung 5 ca nguồn gốc `CON-NGUOI-BO-SUNG` và phê duyệt gate cuối bằng chỉ dẫn `approve, continue`.

## Quy tắc pre-audit

- **VALID:** input, bước và oracle có nguồn, thực thi được. Không cần exact schema nếu đã có oracle semantic như “trả đúng/tất cả sản phẩm”.
- **VALID với security oracle:** ca có thể hợp lệ khi chỉ assert invariant có nguồn từ SEC-04/SEC-05 như không inject SQL, không lộ SQL/DB detail hoặc không render HTML ở sink phù hợp.
- **INVALID:** trùng mục tiêu với ca khác hoặc nằm ngoài phạm vi.
- **INCOMPLETE:** ca có ý nghĩa khám phá nhưng hoàn toàn thiếu oracle để quyết định kết quả; chưa thể assert accept/reject/match/no-match.
- Exact status code, response schema và ordering không được tự thêm.

## Phần A: Bảng kiểm toán AI pre-audit cho 40 ca

| Mã | Mô tả rút gọn | Danh mục | Đề xuất AI | Lý do AI | Kết luận con người | Lý do con người | Chỉnh sửa cuối cùng |
|---|---|---|---|---|---|---|---|
| FR05-LST-001 | Bỏ search, baseline nhiều sản phẩm | Listing | VALID | FR-05 có oracle semantic liệt kê tất cả sản phẩm; có thể đối chiếu tập fixture mà không cần exact schema/order. | VALID | FR-05 quy định không có search phải liệt kê tất cả sản phẩm; baseline kiểm soát cho phép đối chiếu semantic mà không cần schema/thứ tự. | Giữ ca; đối chiếu tập sản phẩm với baseline, không assert exact schema hoặc ordering. |
| FR05-LST-002 | Bỏ search, baseline rỗng | Listing / empty baseline | VALID | “Tất cả sản phẩm” trên tập rỗng vẫn có oracle semantic là không có product; không cần tự đặt envelope/status. | VALID | Baseline rỗng làm tập “tất cả sản phẩm” rỗng; FR-05 có empty-state semantic nên vẫn có oracle. | Giữ ca; assert không có product item ở mức semantic, không khóa status/body rỗng. |
| FR05-LST-003 | Response hỗ trợ ảnh/tên/giá | Response/schema | INCOMPLETE | README chỉ nêu nhu cầu UI; chưa có field mapping/API schema để tạo assertion thực thi cho ảnh, tên và giá. | INCOMPLETE | README chỉ mô tả ảnh, tên và giá trên UI; chưa có field mapping hay API schema để kiểm tra. | Chưa tự động hóa; cần phê duyệt mapping field ảnh, tên, giá và requiredness. |
| FR05-EXI-001 | Full name `iPhone 15 Pro Max` | Existing keyword | VALID | Search theo tên có nguồn; fixture exact-name cho phép assert target được trả ở mức semantic dù schema chưa khóa. | VALID | Tên đầy đủ iPhone 15 Pro Max tồn tại trong fixture và contract nêu search theo tên, nên target phải được trả. | Giữ ca; assert target exact-name, không assert status, schema hoặc order. |
| FR05-EXI-002 | Full name `MacBook Pro M3` | Existing keyword | VALID | Exact existing name có oracle semantic trực tiếp và dữ liệu fixture xác định. | VALID | Fixture MacBook Pro M3 là existing-name độc lập; search theo tên đủ xác định target phải xuất hiện. | Giữ ca như dữ liệu existing-name thứ hai; chỉ kiểm tra target semantic. |
| FR05-EXI-003 | Prefix `iPhone` | Partial/exact | INCOMPLETE | Tài liệu không định nghĩa prefix/partial có khớp; không có accept/match oracle. | INCOMPLETE | Tài liệu không xác định prefix iPhone có được coi là match; partial/exact semantics còn thiếu. | Chưa tự động hóa; cần phê duyệt prefix search được chấp nhận hay không. |
| FR05-EXI-004 | Substring `Pro` | Partial/exact | INCOMPLETE | Substring semantics và số kết quả hoàn toàn chưa được định nghĩa. | INCOMPLETE | Không có quy tắc substring cho Pro hoặc oracle về số sản phẩm được trả. | Chưa tự động hóa; cần chốt substring semantics và tập kết quả mong đợi. |
| FR05-EXI-005 | Full name đổi chữ thường | Case sensitivity | INCOMPLETE | Chưa có oracle về case sensitivity/collation nên không thể assert target có hay không. | INCOMPLETE | Case sensitivity và collation không được tài liệu hóa nên chưa biết lowercase có phải match. | Chưa tự động hóa; cần phê duyệt quy tắc phân biệt hoa thường. |
| FR05-NOM-001 | Keyword ASCII chắc chắn không tồn tại | No-match | VALID | Fixture chứng minh keyword không thuộc tên nào; FR-05 có semantic empty state cho no-match, dù exact response còn mở. | VALID | Keyword marker được chứng minh vắng khỏi baseline và FR-05 định nghĩa no-match/empty-state semantic. | Giữ ca; assert không có product khớp marker, không khóa exact no-match response. |
| FR05-NOM-002 | Keyword tiếng Việt chắc chắn không tồn tại | No-match / Unicode | VALID | Có thể assert semantic không có product khớp từ baseline; không cần exact no-match schema. | VALID | Keyword tiếng Việt được xác minh không tồn tại; oracle semantic không có sản phẩm khớp có nguồn. | Giữ ca cho no-match Unicode; không assert envelope hoặc status. |
| FR05-EMP-001 | `?search=` | Empty search | INCOMPLETE | Empty có tương đương omitted, no-match hay invalid đều chưa được định nghĩa; không có oracle quyết định. | INCOMPLETE | Chưa có quy tắc search rỗng tương đương omitted, no-match hay invalid. | Chưa tự động hóa; cần chốt semantic cho `?search=`. |
| FR05-EMP-002 | Query bare `?search` | Empty/search syntax | INCOMPLETE | Parsing và semantics của query bare không có nguồn; chỉ có giá trị khám phá. | INCOMPLETE | Query bare `?search` không có parsing hoặc behavior được công bố. | Chưa tự động hóa; cần phê duyệt cách diễn giải query bare. |
| FR05-EMP-003 | Duplicate search: empty trước, existing sau | Duplicate query | INCOMPLETE | Không có quy tắc chọn first/last/array hoặc rejection cho duplicate query. | INCOMPLETE | Duplicate query không có quy tắc chọn first, last, array hay reject khi empty đứng trước. | Chưa tự động hóa; cần chốt duplicate policy cho thứ tự này. |
| FR05-EMP-004 | Duplicate search: existing trước, empty sau | Duplicate query | INCOMPLETE | Thứ tự ưu tiên duplicate query chưa có oracle; biến thể có ý nghĩa nhưng chưa assert được. | INCOMPLETE | Không có oracle ưu tiên khi existing value đứng trước và empty value đứng sau. | Chưa tự động hóa; cần chốt duplicate policy và expected result. |
| FR05-WS-001 | Keyword chỉ một khoảng trắng | Whitespace | INCOMPLETE | Trim và whitespace-only semantics chưa được định nghĩa. | INCOMPLETE | Tài liệu không nói whitespace-only có được trim hoặc xem như empty. | Chưa tự động hóa; cần chốt trim rule cho whitespace-only. |
| FR05-WS-002 | Khoảng trắng đầu/cuối full name | Whitespace | INCOMPLETE | Không có nguồn yêu cầu trim trước khi search. | INCOMPLETE | Không có yêu cầu trim khoảng trắng đầu/cuối quanh full name. | Chưa tự động hóa; cần phê duyệt leading/trailing whitespace behavior. |
| FR05-WS-003 | Nhiều khoảng trắng nội bộ | Whitespace normalization | INCOMPLETE | Normalization khoảng trắng nội bộ chưa có oracle. | INCOMPLETE | Normalization nhiều khoảng trắng nội bộ chưa được định nghĩa. | Chưa tự động hóa; cần chốt internal-whitespace normalization. |
| FR05-ONE-001 | Một ký tự có trong tên | One-character | INCOMPLETE | Minimum length, partial match và case sensitivity đều chưa được định nghĩa; không thể assert match. | INCOMPLETE | Keyword M phụ thuộc minimum length, partial matching và case sensitivity chưa có nguồn. | Chưa tự động hóa; cần chốt minimum length và one-character semantics. |
| FR05-ONE-002 | Một ký tự chắc chắn không có trong tên | One-character / no-match | VALID | Fixture cho phép xác nhận ký tự vắng khỏi mọi tên; semantic no-match có nguồn từ FR-05. | VALID | Ký tự § được xác minh không có trong tên fixture; no-match semantic của FR-05 đủ làm oracle. | Giữ ca; assert không có product khớp, không khóa representation rỗng. |
| FR05-LEN-001 | Keyword dài 256 ký tự | Long keyword | INCOMPLETE | 256 không phải boundary có nguồn; accept/reject/truncate đều chưa có oracle. | INCOMPLETE | Mốc 256 không phải boundary contract và không có accept/reject/truncation rule. | Chưa tự động hóa; cần nguồn cho maximum length và behavior tại 256 ký tự. |
| FR05-LEN-002 | Keyword dài 4096 ký tự | Long keyword | INCOMPLETE | Không có giới hạn URL/keyword hoặc error behavior được công bố. | INCOMPLETE | Không có giới hạn keyword/URL hoặc error behavior cho 4096 ký tự. | Chưa tự động hóa; cần giới hạn có nguồn và oracle khi vượt giới hạn. |
| FR05-NUM-001 | Numeric `15` có trong tên fixture | Numeric / partial | INCOMPLETE | Chỉ có thể khớp nếu partial/numeric-text semantics được xác định; hiện chưa có oracle. | INCOMPLETE | Việc 15 khớp tên chỉ đúng nếu numeric text dùng partial matching, hiện chưa được định nghĩa. | Chưa tự động hóa; cần chốt numeric-text và substring behavior. |
| FR05-NUM-002 | Numeric chắc chắn không có trong tên | Numeric / no-match | VALID | Baseline xác định cho phép assert không có product khớp; exact response không cần khóa. | VALID | Chuỗi số được xác minh vắng khỏi baseline nên áp dụng được no-match semantic có nguồn. | Giữ ca; assert không có product khớp numeric marker, không assert exact body. |
| FR05-SPC-001 | Dấu nháy đơn và lộ lỗi | Special / information exposure | INVALID | Trùng mục tiêu và input cốt lõi với FR05-SEC-004; giữ ca security chuyên biệt giúp traceability rõ hơn. | INVALID | Quote và mục tiêu lộ lỗi trùng input cốt lõi với FR05-SEC-004 chuyên về information exposure. | Loại ca; giữ FR05-SEC-004 làm ca canonical. |
| FR05-SPC-002 | Ký tự `%` trong search | Special / SQL wildcard | INCOMPLETE | SEC-05 không quyết định `%` là literal hay LIKE wildcard; không có match/no-match oracle quan sát được. | INCOMPLETE | SEC-05 không quyết định `%` là literal hay LIKE wildcard; chưa có match/no-match oracle. | Chưa tự động hóa; cần phê duyệt escaping và wildcard semantics của `%`. |
| FR05-SPC-003 | Ký tự `_` trong search | Special / SQL wildcard | INCOMPLETE | Literal/wildcard semantics chưa được định nghĩa; chỉ kiểm tra “không đổi cấu trúc SQL” không quyết định kết quả ca này. | INCOMPLETE | Tài liệu không xác định `_` là literal hay wildcard nên chưa quyết định được kết quả. | Chưa tự động hóa; cần chốt escaping và wildcard semantics của `_`. |
| FR05-SPC-004 | Nhóm `+&=#?` được encode | Special / URL encoding | INCOMPLETE | Không có source cho literal handling, URL equivalence hoặc no-match representation của nhóm ký tự này. | INCOMPLETE | Literal handling, URL decoding và expected no-match cho `+&=#?` đều chưa có nguồn. | Chưa tự động hóa; cần chốt encoding/equivalence cho từng ký tự. |
| FR05-UNI-001 | Full name tiếng Việt chính xác | Unicode/Vietnamese existing | VALID | Exact existing name và search-by-name tạo oracle semantic target phải được trả; không cần exact schema. | VALID | Tên Bàn phím cơ Keychron Q1 tồn tại chính xác; search-by-name cho oracle target phải được trả. | Giữ ca; gửi UTF-8 đúng và assert target exact-name ở mức semantic. |
| FR05-UNI-002 | Unicode decomposed | Unicode normalization | INCOMPLETE | Không có quy tắc NFC/NFD normalization. | INCOMPLETE | Contract không có quy tắc NFC/NFD hoặc Unicode normalization. | Chưa tự động hóa; cần phê duyệt normalization form và equivalence. |
| FR05-UNI-003 | Tên tiếng Việt bỏ dấu | Accent sensitivity | INCOMPLETE | Accent sensitivity/collation chưa được định nghĩa nên không thể assert match. | INCOMPLETE | Accent sensitivity và collation cho phiên bản bỏ dấu chưa được định nghĩa. | Chưa tự động hóa; cần chốt accent-insensitive matching. |
| FR05-UNI-004 | Emoji chắc chắn không tồn tại | Unicode / no-match / robustness | VALID | Có semantic no-match từ fixture và oracle bảo mật không lộ lỗi nội bộ; Unicode match representation không cần exact schema. | VALID | Emoji được xác minh không tồn tại, tạo oracle no-match; đồng thời có thể kiểm tra không lộ lỗi nội bộ. | Giữ ca; assert no-match semantic và không có DB detail. |
| FR05-ENC-001 | Full name percent-encoded chuẩn | Encoded existing keyword | INVALID | Trùng operationally với FR05-EXI-001 vì request chứa space hợp lệ vốn phải URL-encode; không tạo partition hành vi mới. | INVALID | Operationally trùng FR05-EXI-001 vì full name chứa space vốn phải percent-encode khi gửi URL. | Loại ca; giữ EXI-001 và ghi URL-encoding chuẩn trong dữ liệu thực thi. |
| FR05-ENC-002 | Dấu cộng thay space | Encoded input | INCOMPLETE | Plus-to-space decoding/equivalence chưa được định nghĩa. | INCOMPLETE | Không có quy tắc dấu cộng được decode thành space hay giữ literal. | Chưa tự động hóa; cần chốt plus-to-space equivalence. |
| FR05-ENC-003 | Double-encoded keyword | Encoded input | INCOMPLETE | Số lớp decode và expected match hoàn toàn chưa có oracle. | INCOMPLETE | Số lớp decode cho double-encoded keyword và expected match chưa được định nghĩa. | Chưa tự động hóa; cần phê duyệt single/double-decoding policy. |
| FR05-ENC-004 | Percent-encoding không hợp lệ | Invalid encoding / exposure | VALID | Dù accept/reject chưa rõ, oracle bảo mật “không lộ SQL/DB detail” có nguồn và thực thi được. | VALID | Dù accept/reject chưa rõ, invariant không lộ SQL/DB detail và không crash có nguồn bảo mật. | Giữ ca với oracle không lộ thông tin/không crash; không assert status hay match result. |
| FR05-SEC-001 | SQL tautology injection | SQL injection | VALID | SEC-05 cho oracle rõ: payload là dữ liệu, không thay đổi cấu trúc SQL hoặc mở rộng kết quả bằng tautology. | VALID | SEC-05 yêu cầu input là dữ liệu nên tautology không được đổi cấu trúc SQL hoặc mở rộng kết quả. | Giữ ca; assert không có tautology effect và không lộ DB detail. |
| FR05-SEC-002 | UNION-based injection | SQL injection / exposure | VALID | SEC-05 và concern lộ thông tin cho phép assert không thực thi UNION, không thêm dữ liệu ngoài search và không lộ DB detail. | VALID | SEC-05 cho oracle không thực thi UNION, không thêm dữ liệu ngoài search và không lộ metadata. | Giữ ca; chạy trong môi trường cô lập và assert không có injected rows/DB disclosure. |
| FR05-SEC-003 | Stacked/destructive injection | SQL injection / integrity | VALID | SEC-05 cho invariant không chạy statement thứ hai, không đổi schema/dữ liệu; exact response không cần thiết. | VALID | SEC-05 cho invariant stacked statement không chạy và schema/dữ liệu giữ nguyên. | Giữ ca; chỉ chạy trong môi trường cô lập, kiểm tra không mutation và không lộ lỗi. |
| FR05-SEC-004 | Quote/metacharacter không lộ DB detail | Information exposure | VALID | Oracle không lộ SQL, table/column, stack/path hoặc `err.message` là bảo mật có nguồn và kiểm tra được. | VALID | Oracle cụ thể là không chứa SQL text, table/column, stack, path hoặc `err.message` nhạy cảm. | Giữ ca canonical cho quote/metacharacter; kiểm tra dấu hiệu DB disclosure. |
| FR05-SEC-005 | HTML/script keyword tại sink hiển thị | Unsafe output / XSS | VALID | README FR-05 và SEC-04 trực tiếp yêu cầu hiển thị như text, không render/execute HTML; schema API không ảnh hưởng oracle sink này. | VALID | README FR-05 và SEC-04 yêu cầu keyword hiển thị như text, không render/execute HTML. | Giữ ca; xác minh tại sink hiển thị phù hợp, không kết luận chỉ từ API response. |

### Thống kê đề xuất AI

| Nhãn đề xuất AI | Số ca |
|---|---:|
| VALID | 16 |
| INVALID | 2 |
| INCOMPLETE | 22 |
| **Tổng** | **40** |

Các số trên là kết quả **AI pre-audit** và đã được con người xác nhận theo chỉ dẫn review.

### Thống kê kết luận con người

| Nhãn kết luận | Số ca |
|---|---:|
| VALID | 16 |
| INVALID | 2 |
| INCOMPLETE | 22 |
| **Tổng** | **40** |

## Phần B: 5 slot PENDING cho ca con người bổ sung

| Slot | Mã | Mục tiêu | Nguồn | Lý do AI bỏ sót | Xác nhận |
|---:|---|---|---|---|---|
| 1 | FR05-H01 | Gửi `POST /api/products` không body → server reject, không tạo product. | API specification chỉ công bố `GET` trong contract FR-05. | AI không kiểm tra method mismatch. | CON-NGUOI-BO-SUNG |
| 2 | FR05-H02 | Gửi đồng thời 5 request `GET /api/products?search=iPhone` → tất cả trả cùng kết quả, không lỗi, không crash. | `GET` phải idempotent. | AI chỉ test tuần tự, không test concurrent. | CON-NGUOI-BO-SUNG |
| 3 | FR05-H03 | `search=test/**/OR/**/1=1` → không inject SQL, không mở rộng kết quả, không lộ DB detail. | SEC-05; Phase A, `server.js:144`. | AI có tautology/UNION/stacked nhưng thiếu comment-based bypass. | CON-NGUOI-BO-SUNG |
| 4 | FR05-H04 | Kiểm tra response header `Content-Type: application/json`. | API specification mô tả JSON API; implementation dùng `res.json()`. | AI kiểm tra nội dung response nhưng không kiểm tra response header. | CON-NGUOI-BO-SUNG |
| 5 | FR05-H05 | `search=test%00admin` → không inject, không lộ DB detail, server không crash. | SEC-05. | AI thiếu null-byte attack vector. | CON-NGUOI-BO-SUNG |

## Phần C: Gate Phase C

- [x] COMPLETE — Con người đã gắn nhãn độc lập cho 40/40 ca.
- [x] COMPLETE — Mọi ca `INVALID`/`INCOMPLETE` có lý do và chỉnh sửa cuối cùng.
- [x] COMPLETE — Con người đã bổ sung 5 ca, gắn nguồn gốc `CON-NGUOI-BO-SUNG`.
- [x] COMPLETE — Mỗi ca con người bổ sung có nguồn và lý do AI bỏ sót.
- [x] COMPLETE — Bản cuối đã được con người phê duyệt để chuyển sang executable tests bằng chỉ dẫn `approve, continue`.

## Trạng thái

PHASE C: COMPLETE  
AI PRE-AUDIT: COMPLETE  
HUMAN AUDIT: COMPLETE  
HUMAN-ADDED: 5 COMPLETE  
NEXT ALLOWED PHASE: D — EXECUTION  
EXECUTION: NOT EXECUTED

## Phụ lục Phase C2 — Hiệu chỉnh của con người

Các nhãn phía trên được giữ nguyên làm lịch sử audit. Toàn bộ 22 ca từng là `INCOMPLETE`, 2 ca từng là `INVALID` và `FR05-SEC-005` đã được sửa thành các ca cuối cùng có thể thực thi. Collection cuối chứa đủ 45/45 ca duy nhất, không loại ca nào. Quyết định và evidence được trình bày tại `reports/api-testing/human-correction-rerun.md`.

SỐ CA CUỐI ĐÃ HIỆU CHỈNH: 45/45 CÓ THỂ THỰC THI
LẦN CHẠY LẠI CUỐI: 45 CA ĐÃ THỰC THI — 35 ĐẠT, 10 KHÔNG ĐẠT
