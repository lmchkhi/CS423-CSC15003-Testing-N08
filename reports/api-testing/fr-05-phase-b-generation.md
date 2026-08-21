# FR-05 — Nhật ký sinh ca kiểm thử Phase B

## Gate đầu vào

- Chỉ dẫn phê duyệt của con người: `approve, continue`.
- Phase A: **APPROVED** ngày `2026-08-21`.
- Phạm vi khóa: Pool A, FR-05, chỉ `GET /api/products` với query tùy chọn `?search=<keyword>`.
- Contract đầu vào: `reports/api-testing/fr-05-phase-a-contract.md`.
- Student ID: `23127464`.
- Thực thi HTTP: **NOT EXECUTED**.

## Chuỗi prompt có chủ đích

### Prompt B1 — Khóa contract và oracle

> Chỉ dùng contract Phase A đã được phê duyệt cho FR-05. Giữ riêng hành vi có nguồn và quan sát implementation. Không tự đặt status code, content type, response envelope, exact schema, ordering hoặc search semantics. Mọi oracle thiếu nguồn phải ghi `INCOMPLETE ORACLE / SPEC GAP`.

Kết quả:

- Quy ước nguồn/oracle được ghi ở đầu artifact ca kiểm thử.
- Exact schema tiếp tục ở trạng thái `SCHEMA ORACLE: INCOMPLETE` từ Phase A.
- Hành vi `LIKE` trong source không được dùng làm expected partial-search contract.

### Prompt B2 — Phân vùng listing và search

> Sinh các ca khác nghĩa cho request không có search, baseline rỗng/nhiều sản phẩm, keyword tồn tại/không tồn tại, empty, duplicate query, whitespace, một ký tự, keyword dài, numeric, ký tự đặc biệt, Unicode/tiếng Việt và encoded input. Không tạo ca ngoài FR-05.

Kết quả:

- Listing/response: `FR05-LST-001`–`FR05-LST-003`.
- Existing/no-match: `FR05-EXI-001`–`FR05-NOM-002`.
- Empty/whitespace/one-character: `FR05-EMP-001`–`FR05-ONE-002`.
- Length/numeric/special characters: `FR05-LEN-001`–`FR05-SPC-004`.
- Unicode/encoding: `FR05-UNI-001`–`FR05-ENC-004`.
- Mọi hành vi partial/exact, case, whitespace, length, encoding, no-match representation và ordering chưa có nguồn đều giữ oracle incomplete.

### Prompt B3 — Security áp dụng trực tiếp

> Chỉ bao phủ injection qua `search`, information exposure và unsafe output tại sink được FR-05 tài liệu hóa. Không thêm authentication test vì contract không yêu cầu. Không thực thi payload hoặc báo bug trong Phase B.

Kết quả:

- Security trực tiếp: `FR05-SEC-001`–`FR05-SEC-005`.
- Các ca kiểm tra semantic không thay đổi cấu trúc SQL, không lộ lỗi/metadata DB và không render từ khóa HTML tại sink UI.
- Source observation về nội suy SQL và `err.message` chỉ được dùng để ưu tiên threat partition, không được tuyên bố là kết quả runtime.

### Prompt B4 — Response/schema và data dependency

> Chỉ dùng thông tin response có nguồn: listing, search theo tên, nhu cầu UI về ảnh/tên/giá và empty state. Gắn rõ fixture dependency; không biến cột database hoặc `SELECT *` thành exact external schema.

Kết quả:

- `FR05-LST-001`–`FR05-LST-003` tách listing semantic khỏi schema oracle.
- Các fixture name chỉ là dữ liệu có kiểm soát; không phải contract data.
- Không có exact schema/status/order assertion được tạo.

### Prompt B5 — Khử trùng và truy vết

> Kiểm tra ID duy nhất, mục tiêu không trùng ý nghĩa, tổng tối thiểu 35 ca, mọi partition được truy vết, human audit còn pending, automation chưa tạo và không có HTTP execution. Không thực hiện Phase C.

Kết quả:

- 40 ca AI sinh; 40 ID duy nhất; 0 ID trùng.
- 12 nhóm truy vết bao phủ toàn bộ partition Phase A và security concern trực tiếp.
- 36 lần ghi nhãn `INCOMPLETE ORACLE / SPEC GAP` trong artifact, gồm cả quy ước/ma trận; không dùng số này làm số ca audit.
- Không có ca `CON-NGUOI-BO-SUNG`.
- Human case-by-case audit: `PENDING`.
- Automation: `NOT CREATED`.
- Execution: `NOT EXECUTED`.

## Artifact kết quả AI đầy đủ

- File: `tests/api-testing/test-cases/fr-05-ai-generated-phase-b.md`.
- SHA-256 tại thời điểm hoàn tất Phase B: `C9392ECB27D3AA60DEB4B673B9B61348A18884BD9ADB39D6E168C145A54FE324`.
- Kích thước tại thời điểm hoàn tất Phase B: `16951` byte.
- File trên là kết quả ca kiểm thử AI đầy đủ. Phase C phải giữ dấu vết bản AI ban đầu khi audit/chỉnh sửa.

## Kiểm tra tĩnh

| Kiểm tra | Kết quả |
|---|---:|
| Tổng dòng test case | 40 |
| ID duy nhất | 40 |
| ID trùng | 0 |
| Nhóm phân vùng/truy vết | 12 |
| Human-added case | 0 |
| Human audit | PENDING |
| Executable test | NOT CREATED |
| HTTP request đã gửi | 0 |

## Artifact Paths

- Phase A contract đã phê duyệt: `reports/api-testing/fr-05-phase-a-contract.md`
- Nhật ký Phase B: `reports/api-testing/fr-05-phase-b-generation.md`
- Kết quả AI đầy đủ: `tests/api-testing/test-cases/fr-05-ai-generated-phase-b.md`
- AI Audit: `reports/ai-audit-report.md` — Entry #19

## Trạng thái

PHASE B: COMPLETE  
AI-GENERATED TEST CASES: 40  
HUMAN CASE-BY-CASE AUDIT: PENDING  
NEXT ALLOWED PHASE: C — HUMAN REVIEW  
EXECUTION: NOT EXECUTED

