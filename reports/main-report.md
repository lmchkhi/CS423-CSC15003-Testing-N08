# Báo cáo chính — HW06: AI-First API Testing on EShop

## Sinh viên: 23127464 — Trần Minh Quang

| | |
|:---|:---|
| **Nhóm** | N08 |
| **Môn** | CS423 / CSC15003 — Kiểm thử Phần mềm |
| **Branch** | [test/23127464-API-Testing](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-API-Testing) |
| **Video demo** | [https://youtu.be/k49pwd-5vUs](https://youtu.be/k49pwd-5vUs) |

---

## 1. Bảng tự đánh giá

| No. | Criteria | Grade | Self-Assessed Grade |
|:---:|---|:---:|:---:|
| 1 | API 1 (FR-05) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 2 | API 2 (FR-11) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 3 | API 3 (FR-16) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 4 | Agent Skills (AI-driven test generator: diagram + pseudocode + skill) | 10 | 10 |
| | **Total** | **100** | **100** |

| Criteria | Evidence |
|---|---|
| **API 1 — FR-05 (30/30)** | 45 ca (40 AI + 5 human) · Phase C: 16 VALID / 2 INVALID / 22 INCOMPLETE đã hiệu chỉnh · 45/45 thực thi · 35 đạt / 10 fail · 1 bug report Critical SQL injection · CI/CD pass · [Issue #263](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263) |
| **API 2 — FR-11 (30/30)** | 80 ca (70 AI + 10 human) · Phase C: 33 VALID / 2 INVALID / 35 INCOMPLETE đã hiệu chỉnh · 80/80 thực thi · 60 đạt / 20 fail · 1 bug report Critical IDOR · CI/CD pass · [Issue #262](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262) |
| **API 3 — FR-16 (30/30)** | 45 ca (40 AI + 5 human) · Phase C: 29 VALID / 2 INVALID / 9 INCOMPLETE đã hiệu chỉnh · 45/45 thực thi · 29 đạt / 16 fail · 3 bug reports · CI/CD pass · [Issue #264](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264)–[#266](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266) |
| **Agent Skills (10/10)** | Sơ đồ tự vẽ PNG + Pseudocode 700 dòng + Skill implementation hoạt động (`ai-first-api-testing/`) |

---

## 2. Tổng quan SUT và Phạm vi lựa chọn

### 2.1. System Under Test

| Thông số | Giá trị |
|---|---|
| SUT | EShop — Vietnamese e-commerce demo application |
| Repository | [github.com/ttbhanh/eshop-sut](https://github.com/ttbhanh/eshop-sut) |
| Stack | Node.js + Express + SQLite |
| Host kiểm thử | `http://localhost:3000` |
| Công cụ kiểm thử | Postman + Newman 6.2.2 + `htmlextra` reporter |
| CI/CD | GitHub Actions (`ubuntu-latest`, Node.js 22) |

### 2.2. Lựa chọn 3 API

Ba API được chọn, mỗi API thuộc một Pool khác nhau theo yêu cầu đề bài (Section 5):

| Pool | Feature | Endpoint | Mô tả |
|:---:|---|---|---|
| A | FR-05 — Product Listing & Search | `GET /api/products` | Xem danh sách và tìm kiếm sản phẩm |
| B | FR-11 — Order History View | `GET /api/orders/my-orders` | Xem lịch sử đơn hàng của user |
| B | FR-11 — Order History View | `GET /api/orders/:id` | Xem chi tiết một đơn hàng |
| C | FR-16 — Product Import | `POST /api/admin/import-products` | Admin import sản phẩm hàng loạt |

Mọi request đều mang header `X-Student-Id: 23127464` (gắn tự động qua collection-level pre-request script).

---

## 3. Quy trình kiểm thử AI-First — 5 Phase

Quy trình tuân theo phương pháp luận AI-First được giảng dạy trong môn học, gồm 5 giai đoạn:

### Phase A — Contract Extraction

Trích xuất hợp đồng API từ `api_specification.md` và source code `server.js` của SUT. Xác định:
- Endpoint, method, request/response schema.
- Business rules (FR-05: search by keyword, FR-11: ownership isolation, FR-16: bulk import với atomicity).
- Security requirements (SEC-01 đến SEC-07).
- Spec gaps (những chỗ tài liệu không định nghĩa rõ).

Artifacts: `reports/api-testing/fr-{05,11,16}-phase-a-contract.md`

### Phase B — AI Generation (≥ 35 ca/API)

Dùng AI sinh test cases có hệ thống, bao phủ:
- **Domain partitions**: phân vùng trên mọi tham số (keyword search, order ID, JWT, product fields).
- **State transitions**: checkout → order history, admin import → product listing.
- **Security**: SQL injection, IDOR, role escalation, JWT tampering, XSS (SEC-01–SEC-07).
- **Schema validation**: response shape, field types, Content-Type.

Kết quả: 150 ca AI-generated (40 FR-05 + 70 FR-11 + 40 FR-16).

Do API specification gốc không công bố đầy đủ response schema, exact schema oracle không được suy diễn như một yêu cầu nguyên thủy của tài liệu. Sau human review, bộ test khóa một **human-approved resolved contract** dựa trên field được công bố, mô hình dữ liệu và response thực thi ổn định; nguồn quyết định được ghi trong Phase A/C. Collection kiểm tra exact keys, kiểu dữ liệu và JSON media type cho product list, order list/detail, cùng success/error response của product import.

Artifacts: `tests/api-testing/test-cases/fr-{05,11,16}-ai-generated-phase-b.md`

### Phase C — Human Audit & Extension

Gắn nhãn từng ca AI-generated: `VALID` / `INVALID` / `INCOMPLETE` kèm reasoning.

| Pool | FR | VALID | INVALID | INCOMPLETE |
|:---:|---|---:|---:|---:|
| A | FR-05 | 16 | 2 | 22 |
| B | FR-11 | 33 | 2 | 35 |
| C | FR-16 | 29 | 2 | 9 |
| | **Tổng** | **78** | **6** | **66** |

Sau audit, con người bổ sung thêm **20 ca** (5 ca/API hoặc 5 ca/endpoint) tập trung vào:
- Protocol-level: method mismatch (POST/DELETE/PUT/HEAD trên endpoint chỉ công bố GET/POST).
- Security nâng cao: comment-style SQL bypass, null-byte injection, path traversal, JWT missing identity claim.
- Concurrency & idempotency: concurrent requests, read-after-write consistency.
- Integration: flow checkout → order history, non-admin persistence verification.

Mọi ca `INVALID` và `INCOMPLETE` đã được hiệu chỉnh thành ca cuối cùng có thể thực thi. Chi tiết hiệu chỉnh: `reports/api-testing/human-correction-rerun.md`.

Artifacts: `tests/api-testing/test-cases/fr-{05,11,16}-phase-c-human-review-workbook.md`

### Phase D — Automated Execution

Chạy toàn bộ 170 ca bằng Newman CLI, ghi nhận evidence tự động (JSON report, HTML report, console log, SUT log, execution metadata).

| Pool | FR | Ca thực thi | Đạt | Không đạt | Assertions đạt / không đạt |
|:---:|---|---:|---:|---:|---:|
| A | FR-05 | 45 | 35 | 10 | 109 / 11 |
| B | FR-11 | 80 | 60 | 20 | 167 / 22 |
| C | FR-16 | 45 | 29 | 16 | 97 / 16 |
| | **Tổng** | **170** | **124** | **46** | **373 / 49** |

FR-05 có 120 assertions trong các lần chạy chính và baseline rỗng. Tổng ba suite có 422 assertions, gồm 373 đạt và 49 không đạt.

Artifacts:
- Newman HTML: `tests/api-testing/evidence/fr-{05,11,16}/*/newman-*-report.html`
- Newman JSON: `tests/api-testing/evidence/fr-{05,11,16}/*/newman-*-report.json`
- Execution analysis: `reports/api-testing/fr-{05,11,16}-phase-d-execution-analysis.md`

### Phase E — Bug Reporting & CI/CD

Phân loại mỗi failure:
- `LOI_BAO_MAT_SUT` — lỗi bảo mật của SUT (SQL injection, IDOR, missing auth, missing role check).
- `LOI_CHUC_NANG_SUT` — lỗi chức năng của SUT (missing validation, missing rollback, ID coercion).

Tạo 5 bug reports tại `bug-report/`, xuất bản GitHub Issues (#262–#266), tích hợp CI/CD pipeline.

---

## 4. Chi tiết kết quả kiểm thử từng API

### 4.1. FR-05 — Product Listing & Search (Pool A)

| Hạng mục | Kết quả |
|---|---|
| **Endpoint** | `GET /api/products` |
| **Test cases** | 45 (40 AI-generated + 5 human-origin) |
| **Phân vùng bao phủ** | Listing, existing/no-match keyword, empty/duplicate query, whitespace, encoding, Unicode (NFC/NFD, accent), ký tự đặc biệt (wildcard `%`, `_`), SQL injection, XSS, long keyword |
| **Phase C audit** | 16 VALID · 2 INVALID · 22 INCOMPLETE |
| **Ca con người bổ sung** | FR05-H01 (method mismatch POST), FR05-H02 (concurrent 5 requests), FR05-H03 (comment-style SQL bypass), FR05-H04 (Content-Type header), FR05-H05 (null-byte injection) |
| **Execution** | 45/45 thực thi · 35 đạt · 10 không đạt · 120 assertions (109 đạt / 11 không đạt) |
| **Bug** | 1 — SQL injection qua `search` parameter |

#### Bug phát hiện: SQL Injection qua Search

| | |
|---|---|
| **Issue** | [#263 — SQL injection qua query parameter search](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263) |
| **Severity** | Critical / P0 |
| **Root cause** | `server.js:143–149` — chuỗi `search` được nối trực tiếp vào SQL query `LIKE '%${searchQuery}%'` không qua parameterized query |
| **4 biểu hiện** | FR05-SEC-001 (tautology `' OR '1'='1'`), FR05-SEC-002 (UNION-based), FR05-SEC-004 (information exposure qua metacharacter), FR05-H05 (null-byte `%00`) |
| **Remediation** | Thay chuỗi nối bằng parameterized query: `WHERE name LIKE ?` với `%${searchQuery}%` truyền qua parameter |

Bug report: `bug-report/fr-05-sql-injection-search.md`

Evidence: `tests/api-testing/evidence/fr-05/20260822-230735/`

### 4.2. FR-11 — Order History View (Pool B)

| Hạng mục | Kết quả |
|---|---|
| **Endpoints** | `GET /api/orders/my-orders` (35 AI + 5 human) · `GET /api/orders/:id` (35 AI + 5 human) |
| **Test cases** | 80 (70 AI-generated + 10 human-origin) |
| **Phân vùng bao phủ** | Ownership isolation (User A vs User B), JWT authentication (missing/empty/invalid/expired/tampered), IDOR (foreign order), parameter pollution, schema/response, ID domain (zero/negative/string/decimal/scientific/leading-zero) |
| **Phase C audit** | 33 VALID · 2 INVALID · 35 INCOMPLETE |
| **Ca con người bổ sung** | FR11-MYO-H01–H05: method mismatch POST, flow checkout→history, read consistency, HEAD, content negotiation · FR11-DET-H01–H05: method mismatch DELETE, PUT, history after state change, path traversal, idempotency |
| **Execution** | 80/80 thực thi · 60 đạt · 20 không đạt · 189 assertions (167 đạt / 22 không đạt) |
| **Bug** | 1 — IDOR + Missing Authentication |

#### Bug phát hiện: IDOR & Missing Authentication

| | |
|---|---|
| **Issue** | [#262 — IDOR + thiếu authentication trên order detail](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262) |
| **Severity** | Critical / P0 |
| **Root cause** | `GET /api/orders/:id` không kiểm tra JWT authentication và không kiểm tra ownership — bất kỳ ai biết order ID đều xem được dữ liệu đơn hàng |
| **Test cases xác nhận** | FR11-DET-009 (IDOR A→B), FR11-DET-010 (IDOR B→A), FR11-DET-011 (switch token), FR11-DET-026–033 (missing auth variants) |
| **Impact** | Toàn bộ order data (mã đơn, ngày đặt, tổng tiền, trạng thái, sản phẩm) bị lộ cho bất kỳ ai |

Bug report: `bug-report/fr-11-idor-missing-auth.md`

Evidence: `tests/api-testing/evidence/fr-11/20260822-schema-rerun-final/`

### 4.3. FR-16 — Product Import (Pool C)

| Hạng mục | Kết quả |
|---|---|
| **Endpoint** | `POST /api/admin/import-products` |
| **Test cases** | 45 (40 AI-generated + 5 human-origin) |
| **Phân vùng bao phủ** | Valid import (single/batch/full fields), authentication (missing/empty/bearer/invalid/expired/tampered), name validation (empty/missing/null/whitespace/length), price validation (boundary/zero/negative/wrong type/null), category dependency (existing/nonexistent/missing/wrong type), atomicity (invalid first/middle/last + persistence), SQL injection, XSS, CSV conflict |
| **Phase C audit** | 29 VALID · 2 INVALID · 9 INCOMPLETE |
| **Contract decision** | JSON array là primary; CSV upload là exploratory/negative |
| **Ca con người bổ sung** | FR16-H01 (method mismatch GET), FR16-H02 (large batch 500+), FR16-H03 (duplicate product), FR16-H04 (extra field), FR16-H05 (non-admin persistence) |
| **Execution** | 45/45 thực thi · 29 đạt · 16 không đạt · 113 assertions (97 đạt / 16 không đạt) |
| **Bugs** | 3 |

#### Bug 1: Missing Admin Role Check

| | |
|---|---|
| **Issue** | [#264 — Thiếu kiểm tra role admin](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264) |
| **Severity** | Critical / P0 |
| **Root cause** | Endpoint chỉ kiểm tra JWT hợp lệ nhưng không kiểm tra role — user thường có JWT hợp lệ vẫn import được sản phẩm |
| **Test cases** | FR16-AUTH-002, FR16-H05, FR16-SEC-003 |

#### Bug 2: Missing Price Validation

| | |
|---|---|
| **Issue** | [#265 — Không validate price > 0](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/265) |
| **Severity** | Minor / P1 |
| **Root cause** | Endpoint không kiểm tra giá trị price — price = 0, âm, string, null đều được lưu vào database |
| **Test cases** | FR16-PRICE-002, FR16-PRICE-003, FR16-PRICE-004, FR16-PRICE-005 |

#### Bug 3: Missing Atomicity / Rollback

| | |
|---|---|
| **Issue** | [#266 — Không rollback batch khi có dòng lỗi](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266) |
| **Severity** | Major / P0 |
| **Root cause** | Batch import xử lý từng dòng tuần tự không có transaction — khi dòng giữa/cuối invalid, các dòng valid trước đó đã được commit (partial commit) |
| **Test cases** | FR16-ATOM-001, FR16-ATOM-002, FR16-ATOM-003, FR16-ATOM-004 |

Bug reports: `bug-report/fr-16-missing-admin-role-check.md`, `bug-report/fr-16-missing-price-validation.md`, `bug-report/fr-16-missing-atomicity-rollback.md`

Evidence: `tests/api-testing/evidence/fr-16/20260822-230924/`

---

## 5. Tổng hợp số liệu

### 5.1. Bảng tổng hợp test cases

| Pool | FR | Endpoint | Thiết kế | AI sinh | Người bổ sung | VALID | INVALID | INCOMPLETE | Thực thi | Đạt | Không đạt | Bugs |
|:---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A | FR-05 | `GET /api/products` | 45 | 40 | 5 | 16 | 2 | 22 | 45 | 35 | 10 | 1 |
| B | FR-11 | `GET /api/orders/my-orders`; `GET /api/orders/:id` | 80 | 70 | 10 | 33 | 2 | 35 | 80 | 60 | 20 | 1 |
| C | FR-16 | `POST /api/admin/import-products` | 45 | 40 | 5 | 29 | 2 | 9 | 45 | 29 | 16 | 3 |
| | **Tổng** | — | **170** | **150** | **20** | **78** | **6** | **66** | **170** | **124** | **46** | **5** |

### 5.2. Phân loại failure

| Phân loại | Số ca | Ví dụ |
|---|---:|---|
| `LOI_BAO_MAT_SUT` | 23 | SQL injection (FR-05), IDOR + missing auth (FR-11), missing role check (FR-16) |
| `LOI_CHUC_NANG_SUT` | 23 | Wildcard handling (FR-05), ID coercion (FR-11), missing validation + rollback (FR-16) |
| **Tổng không đạt** | **46** | |

### 5.3. Deliverable files

| File | Path |
|---|---|
| Test Cases CSV (UTF-8 BOM) | `reports/23127464_test_cases.csv` |
| Test Summary CSV | `reports/23127464_test_summary.csv` |
| Test Cases Excel | `reports/23127464_test_cases.xlsx` |
| Test Summary Excel | `reports/23127464_test_summary.xlsx` |

---

## 6. Tính năng Postman & Newman đã sử dụng

| # | Feature | Mô tả sử dụng |
|---:|---|---|
| 1 | **Collections & Folders** | Tổ chức test case theo endpoint và category (listing, search, auth, security, schema) |
| 2 | **Collection variables** | Quản lý `baseUrl`, `adminToken`, `userToken`, fixture IDs giữa các request |
| 3 | **Environment variables** | Tách biến môi trường (`studentId`, `baseUrl`) ra file environment |
| 4 | **Postman environment file** | File `.postman_environment.json` dùng cho cả local và CI |
| 5 | **Collection-level pre-request script** | Tự động gắn `X-Student-Id: 23127464` vào header mọi request |
| 6 | **Test scripts & Assertions** | Semantic assertions kiểm tra ownership, non-disclosure, schema, security invariants |
| 7 | **`pm.sendRequest`** | Kiểm tra post-condition: đọc database sau request để xác minh persistence/rollback bằng marker duy nhất |
| 8 | **Iteration data configuration** | Mỗi suite dùng một data row có kiểm soát cho run label, Student ID và contract decision; các biến thể input được mô hình hóa thành request item riêng |
| 9 | **Newman CLI** | Chạy tự động với `--reporters cli,json,htmlextra` |
| 10 | **Newman `htmlextra` reporter** | Tạo HTML report chi tiết với request/response body, assertion results |
| 11 | **GitHub Actions integration** | Newman chạy trong CI pipeline, HTML report upload làm artifact |

---

## 7. CI/CD — GitHub Actions

### 7.1. Pipeline

- Workflow: `.github/workflows/api-test-pools-a-b-c.yml`
- Kiến trúc: **Matrix strategy** tạo 3 job độc lập (Pool A / Pool B / Pool C) với `fail-fast: false`.
- Mỗi job: clone → `npm ci` → generate collections → apply corrections → prepare fixture → Newman run → upload artifacts.
- Nền tảng: `ubuntu-latest`, Node.js 22, Newman 6.2.2, `newman-reporter-htmlextra` 1.23.1.

### 7.2. Hai mẫu commit evidence

| Run | Chế độ | Commit | Kết quả | Link |
|---|---|---|---|---|
| **All-pass** | `all-pass` | `34455d7` | SUCCESS — 3/3 jobs đạt | [GitHub Actions Run](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502275099) |
| **Controlled-failure** | `controlled-failure` | `c2610bb` | FAILURE — Pool C fail do FR16-AUTH-002 | [GitHub Actions Run](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502722228) |

**All-pass run:** Cả 3 Pool đều chạy subset ca kiểm thử (5 ca/Pool trong chế độ `all-pass`) và đạt 100%.

**Controlled-failure run:** Pool A và Pool B đạt. Pool C chạy thêm ca `FR16-AUTH-002` (user thường import — lỗi thật do SUT thiếu role check) → pipeline fail. Đây là lỗi thực tế (genuine bug), không phải lỗi giả lập.

### 7.3. Evidence screenshots

- All-pass: `tests/api-testing/evidence/ci-cd/all-pass/github-actions-overview.png`
- Controlled-failure: `tests/api-testing/evidence/ci-cd/controlled-failure/github-actions-overview.png`

CI/CD report chi tiết: `reports/api-testing/api-cicd-report.md`

---

## 8. Agent Skill — AI-Driven API Test Generator

### 8.1. Sơ đồ tự vẽ

Sơ đồ kiến trúc do sinh viên tự thiết kế (self-drawn), minh họa pipeline từ API specification đến test suite cuối cùng:

`reports/Self-Drawn_AI_Driven_Diagram.png`

### 8.2. Thuật toán (Pseudocode)

Thuật toán `GenerateAllTests` gồm các bước chính:

1. **Parse specification** — trích xuất endpoint, schema, business rules, security requirements.
2. **Generate domain partitions** — phân vùng trên mọi tham số (valid/invalid/boundary/null/missing).
3. **Generate state transitions** — kiểm thử các chuyển đổi trạng thái (checkout → order, import → product listing).
4. **Generate security tests** — SQL injection, IDOR, role escalation, JWT tampering, XSS (SEC-01–SEC-07).
5. **Generate schema validation** — response shape, field types, Content-Type.
6. **Deduplicate** — loại bỏ ca trùng lặp về semantic.
7. **Evaluate coverage** — đánh giá coverage và bổ sung test cho vùng thiếu.
8. **Output** — `generatedTestSuites`, `coverageReports`, `traceabilityMatrix`, `specificationGaps`.

Pseudocode đầy đủ (700 dòng): `reports/PSEUDOCODE.md`

### 8.3. Skill implementation

Thư mục `ai-first-api-testing/` chứa Agent Skill có thể tái sử dụng, cho phép AI tự động sinh test case cho các API tương tự khi được cung cấp specification.

---

## 9. Danh mục lỗi phát hiện & GitHub Issues

### 9.1. Tổng hợp 5 lỗi

| # | Issue | FR | Severity | Mô tả | Test Cases |
|---:|---|---|---|---|---|
| 1 | [#263](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263) | FR-05 | Critical / P0 | SQL injection qua `search` parameter với 4 biểu hiện | FR05-SEC-001, SEC-002, SEC-004, H05 |
| 2 | [#262](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262) | FR-11 | Critical / P0 | IDOR + thiếu authentication trên `GET /api/orders/:id` | FR11-DET-009–011, DET-026–033 |
| 3 | [#264](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264) | FR-16 | Critical / P0 | Thiếu kiểm tra role admin khi import product | FR16-AUTH-002, H05, SEC-003 |
| 4 | [#265](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/265) | FR-16 | Minor / P1 | Không validate price > 0 (zero, âm, string, null đều lưu) | FR16-PRICE-002–005 |
| 5 | [#266](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266) | FR-16 | Major / P0 | Không rollback batch khi có dòng invalid (partial commit) | FR16-ATOM-001–004 |

### 9.2. Issue screenshots

| Issue | Screenshot |
|---|---|
| #263 — FR-05 SQL Injection | `bug-report/issue_screenshot/[BUG][FR-05] SQL injection qua query parameter search.png` |
| #262 — FR-11 IDOR | `bug-report/issue_screenshot/[BUG][FR-11] thiếu authentication và ownership check.png` |
| #264 — FR-16 Missing Role Check | `bug-report/issue_screenshot/[BUG][FR-16] thiếu kiểm tra role admin.png` |
| #265 — FR-16 Missing Price Validation | `bug-report/issue_screenshot/[BUG][FR-16] không validate price lớn hơn 0.png` |
| #266 — FR-16 Missing Rollback | `bug-report/issue_screenshot/[BUG][FR-16] không rollback batch khi có dòng lỗi.png` |

---

## 10. Phê bình AI & Bài học rút ra

**AI sai hoặc thiếu sót ở đâu:** AI sinh 150 ca phân vùng tốt nhưng bỏ sót:
- FR-05: method mismatch, injection nâng cao (comment-style, null-byte), nhầm oracle API/browser sink.
- FR-11: không kiểm tra IDOR thực tế cross-account (User B truy xuất đơn User A).
- FR-16: không xác minh DB persistence sau request non-admin, thiếu batch lớn / trùng lặp / extra field.

**Tại sao bỏ sót:** AI tư duy cục bộ per-endpoint, thiên lệch theo template, thiếu attacker mindset.

**Bài học:** AI = bộ tăng tốc bao phủ; con người thẩm định oracle + bổ sung 20 ca bảo mật + chịu trách nhiệm cuối cùng.

---

## 11. Kết luận và Danh mục tài liệu nộp kèm

### 11.1. Kết luận

Quy trình AI-First API Testing đã hoàn thành đầy đủ 5 Phase cho cả 3 API:
- **170 ca kiểm thử** được thiết kế (150 AI + 20 human), toàn bộ đã thực thi.
- **124 ca đạt**, **46 ca không đạt** — mỗi failure đều truy vết được về lỗi thực sự của SUT.
- **5 bug reports** đã tạo và xuất bản trên GitHub Issues (#262–#266).
- **CI/CD pipeline** hoạt động với 2 mẫu commit evidence (all-pass + controlled-failure).
- **Agent Skill** với sơ đồ tự vẽ, pseudocode 700 dòng và implementation hoạt động.

### 11.2. Danh mục tài liệu

| # | Deliverable | Path |
|---:|---|---|
| 1 | README (bảng tự đánh giá + test summary) | `README.md` |
| 2 | Báo cáo chính | `reports/main-report.md` |
| 2a | Báo cáo chính PDF | `reports/main-report.pdf` |
| 3 | AI Audit Report | `reports/ai-audit-report.md` |
| 4 | AI Critique (298 từ) | `reports/ai-critique.md` |
| 4a | AI Critique PDF | `reports/ai-critique.pdf` |
| 5 | Phase A Contract — FR-05 | `reports/api-testing/fr-05-phase-a-contract.md` |
| 6 | Phase A Contract — FR-11 | `reports/api-testing/fr-11-phase-a-contract.md` |
| 7 | Phase A Contract — FR-16 | `reports/api-testing/fr-16-phase-a-contract.md` |
| 8 | Phase B AI Test Cases — FR-05 | `tests/api-testing/test-cases/fr-05-ai-generated-phase-b.md` |
| 9 | Phase B AI Test Cases — FR-11 | `tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md` |
| 10 | Phase B AI Test Cases — FR-16 | `tests/api-testing/test-cases/fr-16-ai-generated-phase-b.md` |
| 11 | Phase C Human Review — FR-05 | `tests/api-testing/test-cases/fr-05-phase-c-human-review-workbook.md` |
| 12 | Phase C Human Review — FR-11 | `tests/api-testing/test-cases/fr-11-phase-c-human-review-workbook.md` |
| 13 | Phase C Human Review — FR-16 | `tests/api-testing/test-cases/fr-16-phase-c-human-review-workbook.md` |
| 14 | Phase D Execution Analysis — FR-05 | `reports/api-testing/fr-05-phase-d-execution-analysis.md` |
| 15 | Phase D Execution Analysis — FR-11 | `reports/api-testing/fr-11-phase-d-execution-analysis.md` |
| 16 | Phase D Execution Analysis — FR-16 | `reports/api-testing/fr-16-phase-d-execution-analysis.md` |
| 17 | Human Correction & Rerun | `reports/api-testing/human-correction-rerun.md` |
| 18 | Postman Collection — FR-05 | `tests/api-testing/collections/23127464_FR05_Product_Search.postman_collection.json` |
| 19 | Postman Collection — FR-11 | `tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json` |
| 20 | Postman Collection — FR-16 | `tests/api-testing/collections/23127464_FR16_Product_Import.postman_collection.json` |
| 21 | Newman HTML Report — FR-05 | `tests/api-testing/evidence/fr-05/20260822-230735/newman-main-report.html` |
| 22 | Newman HTML Report — FR-11 | `tests/api-testing/evidence/fr-11/20260822-schema-rerun-final/newman-report.html` |
| 23 | Newman HTML Report — FR-16 | `tests/api-testing/evidence/fr-16/20260822-230924/newman-report.html` |
| 24 | Bug Report — FR-05 SQL Injection | `bug-report/fr-05-sql-injection-search.md` |
| 25 | Bug Report — FR-11 IDOR | `bug-report/fr-11-idor-missing-auth.md` |
| 26 | Bug Report — FR-16 Missing Role Check | `bug-report/fr-16-missing-admin-role-check.md` |
| 27 | Bug Report — FR-16 Missing Price Validation | `bug-report/fr-16-missing-price-validation.md` |
| 28 | Bug Report — FR-16 Missing Rollback | `bug-report/fr-16-missing-atomicity-rollback.md` |
| 29 | Issue Screenshots (5 ảnh) | `bug-report/issue_screenshot/` |
| 30 | CI/CD Report | `reports/api-testing/api-cicd-report.md` |
| 31 | CI/CD Workflow | `.github/workflows/api-test-pools-a-b-c.yml` |
| 32 | CI/CD Evidence — All-pass | `tests/api-testing/evidence/ci-cd/all-pass/` |
| 33 | CI/CD Evidence — Controlled-failure | `tests/api-testing/evidence/ci-cd/controlled-failure/` |
| 34 | Test Cases CSV (UTF-8 BOM) | `reports/23127464_test_cases.csv` |
| 35 | Test Summary CSV | `reports/23127464_test_summary.csv` |
| 36 | Test Cases Excel | `reports/23127464_test_cases.xlsx` |
| 37 | Test Summary Excel | `reports/23127464_test_summary.xlsx` |
| 38 | Sơ đồ AI Test Generator (tự vẽ) | `reports/Self-Drawn_AI_Driven_Diagram.png` |
| 39 | Pseudocode AI Test Generator | `reports/PSEUDOCODE.md` |
| 40 | Agent Skill implementation | `ai-first-api-testing/` |
| 41 | Git commit log | `git-log.txt` |
| 42 | Header screenshots (3 ảnh) | `tests/api-testing/evidence/fr-{05,11,16}/postman-header-screenshot.png` |
| 43 | Video demo | [https://youtu.be/k49pwd-5vUs](https://youtu.be/k49pwd-5vUs) |

### 11.3. Anti-AI-Cheat Evidence

| Yêu cầu | Evidence |
|---|---|
| `X-Student-Id: 23127464` header | Screenshot Postman Console cho mỗi FR |
| Newman hostname | `http://127.0.0.1:3000` — ghi nhận trong mọi execution metadata |
| AI test-generator diagram | Tự vẽ bởi sinh viên: `reports/Self-Drawn_AI_Driven_Diagram.png` |
