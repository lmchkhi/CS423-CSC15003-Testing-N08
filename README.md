# HW06 — AI-First API Testing on EShop

> **Sinh viên:** Trần Minh Quang — `23127464`
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Repository:** [github.com/lmchkhi/CS423-CSC15003-Testing-N08 (Branch: test/23127464-API-Testing)](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-API-Testing)

---

## Bảng tự đánh giá

| No. | Criteria | Grade | Self-Assessed Grade |
|:---:|---|:---:|:---:|
| 1 | API 1 (FR-05) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 2 | API 2 (FR-11) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 3 | API 3 (FR-16) — full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 4 | Agent Skills (AI-driven test generator: diagram + pseudocode + skill) | 10 | 10 |
| | **Total** | **100** | **100** |

### Justification

| Criteria | Evidence |
|---|---|
| **API 1 — FR-05 (30/30)** | 40 AI + 5 human = 45 ca · 16 VALID / 2 INVALID / 22 INCOMPLETE đã hiệu chỉnh · 45/45 thực thi · 35 đạt / 10 không đạt · 1 bug report (SQL injection Critical) · CI/CD pipeline pass · Header screenshot provided |
| **API 2 — FR-11 (30/30)** | 70 AI + 10 human = 80 ca · 33 VALID / 2 INVALID / 35 INCOMPLETE đã hiệu chỉnh · 80/80 thực thi · 60 đạt / 20 không đạt · 1 bug report (IDOR Critical) · CI/CD pipeline pass · Header screenshot provided |
| **API 3 — FR-16 (30/30)** | 40 AI + 5 human = 45 ca · 29 VALID / 2 INVALID / 9 INCOMPLETE đã hiệu chỉnh · 45/45 thực thi · 29 đạt / 16 không đạt · 3 bug reports (security + functional) · CI/CD pipeline pass · Header screenshot provided |
| **Agent Skills (10/10)** | Sơ đồ tự vẽ (PNG) + Pseudocode 700 dòng + Skill implementation hoạt động · Thuật toán bao phủ domain partition / state transition / security / schema validation |

---

## 1. Phạm vi API

Ba API được chọn, mỗi API thuộc một Pool khác nhau theo yêu cầu đề bài:

| Pool | Feature | Endpoint | Mô tả |
|:---:|---|---|---|
| A | FR-05 — Product Listing & Search | `GET /api/products` | Xem danh sách và tìm kiếm sản phẩm |
| B | FR-11 — Order History View | `GET /api/orders/my-orders` | Xem lịch sử đơn hàng của user |
| B | FR-11 — Order History View | `GET /api/orders/:id` | Xem chi tiết một đơn hàng |
| C | FR-16 — Product Import | `POST /api/admin/import-products` | Admin import sản phẩm hàng loạt |

Mọi request đều mang header `X-Student-Id: 23127464`.

---

## 2. Tổng quan kết quả kiểm thử

| Pool | FR | Endpoint | Thiết kế | AI sinh | Người bổ sung | VALID | INVALID | INCOMPLETE | Thực thi | Đạt | Không đạt | Bugs |
|:---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A | FR-05 | `GET /api/products` | 45 | 40 | 5 | 16 | 2 | 22 | 45 | 35 | 10 | 1 |
| B | FR-11 | `GET /api/orders/my-orders`; `GET /api/orders/:id` | 80 | 70 | 10 | 33 | 2 | 35 | 80 | 60 | 20 | 1 |
| C | FR-16 | `POST /api/admin/import-products` | 45 | 40 | 5 | 29 | 2 | 9 | 45 | 29 | 16 | 3 |
| | **Tổng** | — | **170** | **150** | **20** | **78** | **6** | **66** | **170** | **124** | **46** | **5** |

- **170/170** ca kiểm thử đã được thực thi (100%).
- **124** ca đạt, **46** ca không đạt.
- **5 bug reports** đã tạo (1 FR-05 + 1 FR-11 + 3 FR-16).
- Test cases CSV: `reports/23127464_test_cases.csv`
- Test summary CSV: `reports/23127464_test_summary.csv`

---

## 3. Pipeline cho từng API

### 3.1. FR-05 — Product Listing and Search (Pool A)

| Giai đoạn | Kết quả |
|---|---|
| **Generate (Phase B)** | 40 ca AI-generated bao phủ: listing, existing/no-match keyword, empty/duplicate query, whitespace, encoding, Unicode, ký tự đặc biệt, SQL injection, XSS |
| **Audit (Phase C)** | 16 VALID · 2 INVALID · 22 INCOMPLETE |
| **Extend** | 5 ca human-origin: method mismatch, concurrent, comment-based SQL bypass, Content-Type header, null byte |
| **Execute (Phase D)** | 45/45 ca thực thi · 35 đạt · 10 không đạt · 120 assertions (109 đạt / 11 không đạt) |
| **Bugs** | 1 — SQL injection qua `search` với 4 biểu hiện: tautology, UNION, information exposure, null byte |

Bug report: [`bug-report/fr-05-sql-injection-search.md`](bug-report/fr-05-sql-injection-search.md)

### 3.2. FR-11 — Order History View (Pool B)

| Giai đoạn | Kết quả |
|---|---|
| **Generate (Phase B)** | 70 ca AI-generated (35/endpoint): ownership isolation, JWT authentication, IDOR, schema, parameter pollution |
| **Audit (Phase C)** | 33 VALID · 2 INVALID · 35 INCOMPLETE |
| **Extend** | 10 ca human-origin (5/endpoint): method mismatch, flow checkout→history, HEAD, content negotiation, path traversal, idempotency |
| **Execute (Phase D)** | 80/80 ca thực thi · 60 đạt · 20 không đạt · 189 assertions (167 đạt / 22 không đạt) |
| **Bugs** | 1 — IDOR + missing authentication trên `GET /api/orders/:id` |

Bug report: [`bug-report/fr-11-idor-missing-auth.md`](bug-report/fr-11-idor-missing-auth.md)

### 3.3. FR-16 — Product Import (Pool C)

| Giai đoạn | Kết quả |
|---|---|
| **Generate (Phase B)** | 40 ca AI-generated: valid import, auth, name/price validation, category dependency, atomicity, SQL injection, XSS, CSV conflict |
| **Audit (Phase C)** | 29 VALID · 2 INVALID · 9 INCOMPLETE |
| **Extend** | 5 ca human-origin: method mismatch, large batch, duplicate, extra field, non-admin persistence |
| **Execute (Phase D)** | 45/45 ca thực thi · 29 đạt · 16 không đạt · 113 assertions (97 đạt / 16 không đạt) |
| **Contract decision** | JSON array là primary; CSV upload là exploratory/negative |
| **Bugs** | 3 — missing role check, missing price validation, missing atomicity/rollback |

Bug reports:
- [`bug-report/fr-16-missing-admin-role-check.md`](bug-report/fr-16-missing-admin-role-check.md) — Critical / Security
- [`bug-report/fr-16-missing-price-validation.md`](bug-report/fr-16-missing-price-validation.md) — Minor / P1 / Functional
- [`bug-report/fr-16-missing-atomicity-rollback.md`](bug-report/fr-16-missing-atomicity-rollback.md) — Major / P0 / Functional

---

## 4. Hiệu chỉnh và chạy lại toàn bộ

Sau Phase C, mọi ca từng gắn nhãn `INVALID` hoặc `INCOMPLETE` đã được con người hiệu chỉnh thành ca cuối cùng có thể thực thi, đảm bảo 170/170 ca đều chạy được.

| Pool | FR | Ca thực thi | Đạt | Không đạt | Assertions đạt / không đạt | Evidence cuối |
|:---:|---|---:|---:|---:|---:|---|
| A | FR-05 | 45 | 35 | 10 | 109 / 11 | `tests/api-testing/evidence/fr-05/20260822-230735/` |
| B | FR-11 | 80 | 60 | 20 | 167 / 22 | `tests/api-testing/evidence/fr-11/20260822-schema-rerun-final/` |
| C | FR-16 | 45 | 29 | 16 | 97 / 16 | `tests/api-testing/evidence/fr-16/20260822-230924/` |
| | **Tổng** | **170** | **124** | **46** | **373 / 49** | |

Chi tiết hiệu chỉnh: [`reports/api-testing/human-correction-rerun.md`](reports/api-testing/human-correction-rerun.md)

---

## 5. Bug Reports

| # | FR | Severity | Mô tả / GitHub Issue | File | Issue Screenshot | Runtime Evidence |
|---:|---|---|---|---|---|---|
| 1 | FR-05 | Critical / P0 / Security | SQL injection qua `search` parameter ([Issue #263](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263)) | [`fr-05-sql-injection-search.md`](bug-report/fr-05-sql-injection-search.md) | [`issue`](bug-report/issue_screenshot/[BUG][FR-05]%20SQL%20injection%20qua%20query%20parameter%20search.png) | [`FR05-SEC-002`](bug-report/runtime_screenshot/issue-263-fr05-sec-002-runtime-evidence.png) |
| 2 | FR-11 | Critical / P0 / Security | IDOR + thiếu authentication trên order detail ([Issue #262](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262)) | [`fr-11-idor-missing-auth.md`](bug-report/fr-11-idor-missing-auth.md) | [`issue`](bug-report/issue_screenshot/[BUG][FR-11]%20thiếu%20authentication%20và%20ownership%20check.png) | [`FR11-DET-009`](bug-report/runtime_screenshot/issue-262-fr11-det-009-runtime-evidence.png) |
| 3 | FR-16 | Critical / P0 / Security | Thiếu kiểm tra role admin khi import ([Issue #264](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264)) | [`fr-16-missing-admin-role-check.md`](bug-report/fr-16-missing-admin-role-check.md) | [`issue`](bug-report/issue_screenshot/[BUG][FR-16]%20thiếu%20kiểm%20tra%20role%20admin.png) | [`FR16-AUTH-002`](bug-report/runtime_screenshot/issue-264-fr16-auth-002-runtime-evidence.png) |
| 4 | FR-16 | Minor / P1 / Functional | Không validate price > 0 ([Issue #265](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/265)) | [`fr-16-missing-price-validation.md`](bug-report/fr-16-missing-price-validation.md) | [`issue`](bug-report/issue_screenshot/[BUG][FR-16]%20không%20validate%20price%20lớn%20hơn%200.png) | [`FR16-PRICE-002`](bug-report/runtime_screenshot/issue-265-fr16-price-002-runtime-evidence.png) |
| 5 | FR-16 | Major / P0 / Functional | Không rollback batch khi có dòng lỗi ([Issue #266](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266)) | [`fr-16-missing-atomicity-rollback.md`](bug-report/fr-16-missing-atomicity-rollback.md) | [`issue`](bug-report/issue_screenshot/[BUG][FR-16]%20không%20rollback%20batch%20khi%20có%20dòng%20lỗi.png) | [`FR16-ATOM-001`](bug-report/runtime_screenshot/issue-266-fr16-atom-001-runtime-evidence.png) |

---

## 6. Postman / Newman Features đã sử dụng

- **Collections & Folders** — tổ chức test case theo endpoint/category.
- **Collection variables & Environment variables** — quản lý `baseUrl`, token, fixture IDs.
- **Postman environment file** — tách cấu hình môi trường.
- **Collection-level pre-request script** — tự động gắn `X-Student-Id: 23127464` vào mọi request.
- **Test scripts & Assertions** — semantic assertions và exact response-shape assertions theo contract đã được con người phê duyệt.
- **`pm.sendRequest`** — kiểm tra post-condition, persistence/rollback bằng marker duy nhất.
- **Iteration data configuration** — mỗi suite dùng một data row có kiểm soát để truyền nhãn chạy, Student ID và quyết định contract; các biến thể input nằm trong từng request item.
- **Newman CLI** — chạy tự động với JSON và `htmlextra` reporters.
- **GitHub Actions integration** — Newman HTML report upload làm artifact.

---

## 7. CI/CD

### Pipeline

Workflow chung cho cả 3 Pool: [`.github/workflows/api-test-pools-a-b-c.yml`](.github/workflows/api-test-pools-a-b-c.yml)

### GitHub Actions Runs

| Run | Commit | Kết quả | Evidence |
|---|---|---|---|
| **All-pass** — Pool A/B/C đều đạt | `34455d7` | SUCCESS | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502275099) · `tests/api-testing/evidence/ci-cd/all-pass/` |
| **Controlled-failure** — A/B đạt, C fail | `c2610bb` | FAILURE | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502722228) · `tests/api-testing/evidence/ci-cd/controlled-failure/` |

CI/CD report: [`reports/api-testing/api-cicd-report.md`](reports/api-testing/api-cicd-report.md)

---

## 8. Agent Skill — AI-Driven API Test Generator

| Artifact | Path |
|---|---|
| Sơ đồ tự vẽ (PNG) | [`reports/Self-Drawn_AI_Driven_Diagram.png`](reports/Self-Drawn_AI_Driven_Diagram.png) |
| Pseudocode | [`reports/PSEUDOCODE.md`](reports/PSEUDOCODE.md) |
| Skill implementation | [`folder ai-first-api-testing`](ai-first-api-testing) |

Thuật toán sinh test case tự động gồm: phân tích contract, sinh test theo domain partition / state transition / security / schema validation, loại bỏ trùng lặp, đánh giá coverage và bổ sung test cho vùng thiếu.

---

## 9. Deliverables

### Báo cáo và kiểm toán

| Deliverable | Path |
|---|---|
| Main Report (Markdown) | [`reports/main-report.md`](reports/main-report.md) |
| Main Report (PDF) | [`reports/main-report.pdf`](reports/main-report.pdf) |
| AI Audit Report | [`reports/ai-audit-report.md`](reports/ai-audit-report.md) |
| AI Critique (200–300 từ) | [`reports/ai-critique.md`](reports/ai-critique.md) |
| AI Critique (PDF) | [`reports/ai-critique.pdf`](reports/ai-critique.pdf) |
| CI/CD Report | [`reports/api-testing/api-cicd-report.md`](reports/api-testing/api-cicd-report.md) |
| Human Correction & Rerun | [`reports/api-testing/human-correction-rerun.md`](reports/api-testing/human-correction-rerun.md) |
| Git commit log | [`git-log.txt`](git-log.txt) |

### Artifact theo từng API

| Artifact | FR-05 | FR-11 | FR-16 |
|---|---|---|---|
| Phase A Contract | [`fr-05-phase-a-contract.md`](reports/api-testing/fr-05-phase-a-contract.md) | [`fr-11-phase-a-contract.md`](reports/api-testing/fr-11-phase-a-contract.md) | [`fr-16-phase-a-contract.md`](reports/api-testing/fr-16-phase-a-contract.md) |
| Phase B AI Test Cases | [`fr-05-ai-generated-phase-b.md`](tests/api-testing/test-cases/fr-05-ai-generated-phase-b.md) | [`fr-11-ai-generated-phase-b.md`](tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md) | [`fr-16-ai-generated-phase-b.md`](tests/api-testing/test-cases/fr-16-ai-generated-phase-b.md) |
| Phase C Human Review | [`fr-05-phase-c-...workbook.md`](tests/api-testing/test-cases/fr-05-phase-c-human-review-workbook.md) | [`fr-11-phase-c-...workbook.md`](tests/api-testing/test-cases/fr-11-phase-c-human-review-workbook.md) | [`fr-16-phase-c-...workbook.md`](tests/api-testing/test-cases/fr-16-phase-c-human-review-workbook.md) |
| Phase D Execution Analysis | [`fr-05-phase-d-...analysis.md`](reports/api-testing/fr-05-phase-d-execution-analysis.md) | [`fr-11-phase-d-...analysis.md`](reports/api-testing/fr-11-phase-d-execution-analysis.md) | [`fr-16-phase-d-...analysis.md`](reports/api-testing/fr-16-phase-d-execution-analysis.md) |
| Postman Collection | [`23127464_FR05_...json`](tests/api-testing/collections/23127464_FR05_Product_Search.postman_collection.json) | [`23127464_FR11_...json`](tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json) | [`23127464_FR16_...json`](tests/api-testing/collections/23127464_FR16_Product_Import.postman_collection.json) |
| Newman Evidence | `tests/api-testing/evidence/fr-05/` | `tests/api-testing/evidence/fr-11/` | `tests/api-testing/evidence/fr-16/` |
| Bug Report(s) | [`fr-05-sql-injection-search.md`](bug-report/fr-05-sql-injection-search.md) | [`fr-11-idor-missing-auth.md`](bug-report/fr-11-idor-missing-auth.md) | 3 reports (xem mục 5) |

### Test Cases & Summary (CSV/Excel)

| File | Path |
|---|---|
| Test Cases CSV | [`reports/23127464_test_cases.csv`](reports/23127464_test_cases.csv) |
| Test Summary CSV | [`reports/23127464_test_summary.csv`](reports/23127464_test_summary.csv) |
| Test Cases Excel | [`reports/23127464_test_cases.xlsx`](reports/23127464_test_cases.xlsx) |
| Test Summary Excel | [`reports/23127464_test_summary.xlsx`](reports/23127464_test_summary.xlsx) |

---

## 10. Anti-AI-Cheat Evidence

| Yêu cầu | Evidence |
|---|---|
| `X-Student-Id: 23127464` header | Screenshot Postman Console cho mỗi FR: `tests/api-testing/evidence/fr-*/postman-header-screenshot.png` |
| Newman hostname | `http://127.0.0.1:3000` — ghi nhận trong mọi execution metadata |
| AI test-generator diagram | Tự vẽ bởi sinh viên: [`reports/Self-Drawn_AI_Driven_Diagram.png`](reports/Self-Drawn_AI_Driven_Diagram.png) |
