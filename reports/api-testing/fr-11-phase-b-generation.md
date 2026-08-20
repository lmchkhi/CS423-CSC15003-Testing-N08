# FR-11 — Nhật ký sinh ca kiểm thử Phase B

## Gate đầu vào

- Human approval nhận được: `approved, continue phase B`.
- Phase A: **APPROVED** ngày 2026-08-20.
- Phạm vi khóa: Pool B, FR-11, chỉ `GET /api/orders/my-orders` và `GET /api/orders/:id`.
- Contract đầu vào: `reports/api-testing/fr-11-phase-a-contract.md`.
- Student ID: `23127464`.
- Thực thi HTTP: **NOT EXECUTED**.

## Chuỗi prompt có chủ đích

### Prompt B1 — Khóa contract và oracle

> Chỉ dùng contract Phase A đã được phê duyệt cho FR-11. Tách expected result có nguồn khỏi implementation observation. Không tự đặt status code, error body, exact schema, ID grammar hoặc foreign-order rejection. Mọi oracle thiếu phải ghi `INCOMPLETE / SPEC GAP`.

Kết quả đầy đủ:

- Contract nguồn và gap được giữ trong phần “Quy ước nguồn” và từng cột “Oracle AI” của artifact ca kiểm thử.
- Implementation route chi tiết không được dùng làm expected result.

### Prompt B2 — Phân vùng dữ liệu và ownership

> Sinh các ca khác nghĩa cho từng endpoint, phủ user có 0/1/nhiều order, owned order, foreign-owned order, valid/nonexistent/malformed ID, identity switching và concurrent identity isolation. Không tạo ca ngoài FR-11.

Kết quả đầy đủ:

- Danh sách: `FR11-MYO-001`–`FR11-MYO-017` và `FR11-MYO-029`–`FR11-MYO-030`.
- Chi tiết: `FR11-DET-001`–`FR11-DET-025`.
- Các ID malformed giữ oracle validation ở `INCOMPLETE / SPEC GAP`; chỉ non-disclosure/ownership có nguồn được giữ làm kỳ vọng.

### Prompt B3 — Authentication và security áp dụng trực tiếp

> Phủ valid/missing/empty/malformed/tampered/expired JWT, wrong scheme, authorization, ownership, IDOR và SEC-05. Không ép SEC không liên quan. Mọi request tương lai phải có `X-Student-Id: 23127464` dù Authorization là ca âm.

Kết quả đầy đủ:

- Danh sách: `FR11-MYO-018`–`FR11-MYO-034`.
- Chi tiết: `FR11-DET-009`–`FR11-DET-014`, `FR11-DET-025`–`FR11-DET-034`.
- Không gán status code/error body chưa có nguồn.

### Prompt B4 — Semantic response và schema gap

> Chỉ sinh assertion ở mức semantic mà FR-11 có nguồn: mã đơn, ngày đặt, tổng tiền, trạng thái hiện tại và ownership. Không khẳng định tên/kiểu trường, envelope, Content-Type hoặc exact schema.

Kết quả đầy đủ:

- Danh sách: `FR11-MYO-010`–`FR11-MYO-013`, `FR11-MYO-035`.
- Chi tiết: `FR11-DET-004`–`FR11-DET-007`, `FR11-DET-035`.
- Các ca này ghi rõ phần field mapping/schema cần human review.

### Prompt B5 — Khử trùng và truy vết

> Kiểm tra ID duy nhất, mục tiêu không trùng ý nghĩa, đủ tối thiểu 35 ca cho từng API, mọi ca có nguồn, oracle status, human-review status và automation status. Không audit hoặc thêm human-added case.

Kết quả đầy đủ:

- `GET /api/orders/my-orders`: 35 ca AI sinh.
- `GET /api/orders/:id`: 35 ca AI sinh.
- Tổng: 70 ca; 70 ID duy nhất; 70 ca `PENDING`; 70 ca `NOT CREATED`.
- Không có ca `CON-NGUOI-BO-SUNG`; không có quyết định audit con người.

## Artifact kết quả AI đầy đủ

- File: `tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md`
- SHA-256 tại thời điểm hoàn tất Phase B: `ABB5FE9F7D6148C1F1743AC8500001B7FF7401CBA454695383120414895E4667`
- Kích thước tại thời điểm hoàn tất Phase B: `21856` byte.
- File trên là kết quả đầy đủ, không phải bản tóm tắt. Mọi thay đổi ở Phase C phải giữ bản AI ban đầu hoặc cung cấp dấu vết diff/audit rõ ràng.

## Kiểm tra tĩnh

| Kiểm tra | Kết quả |
|---|---:|
| ID `FR11-MYO-*` | 35 |
| ID `FR11-DET-*` | 35 |
| Tổng ID | 70 |
| ID trùng | 0 |
| `PENDING / NOT CREATED` | 70 |
| HTTP request đã gửi | 0 |
| Postman/Newman artifact đã tạo | 0 |

## Bàn giao cho con người

Phase C cần con người:

1. Gắn đúng một nhãn `VALID`, `INVALID` hoặc `INCOMPLETE` cho từng ca.
2. Ghi lý do, nội dung chỉnh sửa và expected result cuối cùng cho mọi ca cần sửa.
3. Quyết định oracle cho status code, error body, schema, malformed/nonexistent ID, foreign-owned order, admin token và identity mồ côi.
4. Sau audit, tự bổ sung ít nhất 5 ca cho mỗi API với nguồn gốc `CON-NGUOI-BO-SUNG` và giải thích phần AI bỏ sót.

## Trạng thái

PHASE B: COMPLETE  
HUMAN REVIEW: PENDING  
NEXT ALLOWED PHASE: C — HUMAN AUDIT AND EXTENSION  
EXECUTION: NOT EXECUTED
