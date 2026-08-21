# HW06 — AI-First API Testing on EShop

> **Sinh viên:** Trần Minh Quang — 23127464
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm

## 1. Phạm vi API

| Hạng mục | Nội dung |
|---|---|
| Pool | Pool A, Pool B và Pool C |
| Feature | FR-05 — Product Listing and Search; FR-11 — Order History View; FR-16 — Product Import from CSV |
| Endpoint 1 | `GET /api/products` |
| Endpoint 2 | `GET /api/orders/my-orders` |
| Endpoint 3 | `GET /api/orders/:id` |
| Endpoint 4 | `POST /api/admin/import-products` |
| Student header | `X-Student-Id: 23127464` |

## Final human-corrected full rerun

The earlier Phase D subset results below are retained as execution history. After correcting every AI case previously labelled `INVALID` or `INCOMPLETE`, the final collections execute all designed cases:

| Pool | FR | Designed / executed | Passed cases | Failed cases | Assertions passed / failed | Final evidence |
|---|---|---:|---:|---:|---:|---|
| A | FR-05 | 45 / 45 | 35 | 10 | 108 / 11 | `tests/api-testing/evidence/fr-05/20260821-223004/` |
| B | FR-11 | 80 / 80 | 60 | 20 | 167 / 22 | `tests/api-testing/evidence/fr-11/20260821-corrected-rerun-final/` |
| C | FR-16 | 45 / 45 | 29 | 16 | 89 / 16 | `tests/api-testing/evidence/fr-16/20260821-223035/` |
| **Total** | — | **170 / 170** | **124** | **46** | **364 / 49** | `reports/api-testing/human-correction-rerun.md` |

Correction rationale and the distinction between sourced and human-approved oracles are documented in `reports/api-testing/human-correction-rerun.md`. The AI Audit Report was not modified.

## 2. Assessment summary

| No. | Assessment item | FR-11 result | Status / evidence |
|---:|---|---:|---|
| 1 | Selected feature | FR-11 — Order History View | Pool B |
| 2 | Selected endpoints | 2 | `GET /api/orders/my-orders`; `GET /api/orders/:id` |
| 3 | AI-generated test cases | 70 | 35 cases per endpoint |
| 4 | Human-added test cases | 10 | 5 cases per endpoint |
| 5 | Total designed test cases | 80 | 70 AI-generated + 10 human-added |
| 6 | Human audit of AI cases | 70 | 33 `VALID`; 2 `INVALID`; 35 `INCOMPLETE` |
| 7 | Executed cases | 42 | 33 valid AI cases + 9 executable human-origin cases |
| 8 | Assertions | 101 | 92 passed; 9 failed |
| 9 | Confirmed bugs | 1 | IDOR + missing authentication on `GET /api/orders/:id` |
| 10 | Phase status | — | `PHASE E: COMPLETE` |

`FR11-MYO-H03` được giữ ở trạng thái `INCOMPLETE / NOT AUTOMATED` vì chưa có oracle cho lỗi cơ sở dữ liệu và cơ chế fault injection an toàn.

## 3. Kết quả kiểm thử

- `GET /api/orders/my-orders`: các executable test trong canonical run không có assertion thất bại.
- `GET /api/orders/:id`: có 9 assertion thất bại tại `FR11-DET-011` và `FR11-DET-026`–`FR11-DET-033`.
- Các failure được con người xác nhận là `LOI_BAO_MAT_SUT`.
- Lỗi bảo mật: endpoint detail thiếu authentication và ownership check, dẫn đến IDOR và làm lộ order data.

## 4. FR-05 — Product Listing and Search (Pool A)

| Hạng mục | Kết quả |
|---|---|
| API | FR-05 — `GET /api/products` |
| Test cases | 45 — 40 AI-generated + 5 human-origin |
| Human audit | 16 `VALID`; 2 `INVALID`; 22 `INCOMPLETE` |
| Executed | 20 ca; 55 assertions; 50 passed; 5 failed |
| Bugs | 1 — SQL injection qua `search` với 4 biểu hiện: tautology, UNION, information exposure và null byte |
| Phase status | `PHASE E: COMPLETE` |

Local bug report: `bug-report/fr-05-sql-injection-search.md`. Canonical evidence nằm tại `tests/api-testing/evidence/fr-05/20260821-213052/`. GitHub Issue và CI/CD riêng cho FR-05 chưa được tạo.

## 5. FR-16 — Product Import (Pool C)

| Hạng mục | Kết quả |
|---|---|
| API | FR-16 — `POST /api/admin/import-products` |
| Test cases | 45 — 40 AI-generated + 5 human-origin |
| Human audit | 29 `VALID`; 2 `INVALID`; 9 `INCOMPLETE` |
| Executed | 32 ca; 77 assertions; 69 passed; 8 failed |
| Confirmed failures | 2 `LOI_BAO_MAT_SUT`; 6 `LOI_CHUC_NANG_SUT` |
| Bugs | 3 — missing role check; missing price validation; missing rollback |
| Contract decision | JSON array là primary; CSV upload là exploratory/negative |
| Phase status | `PHASE E: COMPLETE` |

Ba local bug report đã tạo:

- `bug-report/fr-16-missing-admin-role-check.md` — Critical / Security.
- `bug-report/fr-16-missing-price-validation.md` — Medium / Functional.
- `bug-report/fr-16-missing-atomicity-rollback.md` — High / Functional.

Canonical evidence nằm tại `tests/api-testing/evidence/fr-16/20260821-024915/`. GitHub Issue và CI/CD riêng cho FR-16 chưa được tạo.

## 6. Postman/Newman features đã sử dụng

- Postman collections và folders.
- Collection variables, environment variables và Postman environment file.
- Collection-level pre-request script để gắn `X-Student-Id: 23127464`.
- Postman test scripts và assertions.
- `pm.sendRequest` để kiểm tra read-only post-condition và persistence/rollback bằng marker duy nhất.
- Collection Runner/Newman data-driven execution với iteration data file.
- Newman CLI với JSON và `htmlextra` reporters.
- GitHub Actions với Newman HTML report được upload làm artifact.

## 7. Execution và CI/CD evidence

### Local canonical run

| Artifact | Path |
|---|---|
| Postman collection | `tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json` |
| Newman console | `tests/api-testing/evidence/fr-11/20260821-001900/newman-console.txt` |
| Newman JSON report | `tests/api-testing/evidence/fr-11/20260821-001900/newman-report.json` |
| Newman HTML report | `tests/api-testing/evidence/fr-11/20260821-001900/newman-report.html` |
| Header screenshot | `tests/api-testing/evidence/fr-11/postman-header-screenshot.png` |

### GitHub Actions runs

| Run | Commit | Result | Evidence |
|---|---|---|---|
| All-pass `my-orders` folder | `fa490400e8145ecc72685328e15542d9ae79e051` | `SUCCESS` | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32402724185); `tests/api-testing/evidence/fr-11/ci-cd-run1-all-pass.png` |
| Full FR-11 collection | `fa469cff4cdf4de5ea71cc2883d182c730684132` | `FAILURE` | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32403028362); `tests/api-testing/evidence/fr-11/ci-cd-run2-with-failure.png` |

## 8. Deliverables

### Hoàn thành

| Deliverable | Path |
|---|---|
| Phase A contract | `reports/api-testing/fr-11-phase-a-contract.md` |
| Phase B generation log | `reports/api-testing/fr-11-phase-b-generation.md` |
| AI-generated test cases | `tests/api-testing/test-cases/fr-11-ai-generated-phase-b.md` |
| Phase C human-review workbook | `tests/api-testing/test-cases/fr-11-phase-c-human-review-workbook.md` |
| Phase D execution analysis | `reports/api-testing/fr-11-phase-d-execution-analysis.md` |
| Evidence manifest | `tests/api-testing/evidence/fr-11/20260821-001900/evidence-manifest.md` |
| Security bug report | `bug-report/fr-11-idor-missing-auth.md` |
| FR-05 SQL injection bug report | `bug-report/fr-05-sql-injection-search.md` |
| FR-16 security bug report | `bug-report/fr-16-missing-admin-role-check.md` |
| FR-16 price-validation bug report | `bug-report/fr-16-missing-price-validation.md` |
| FR-16 atomicity bug report | `bug-report/fr-16-missing-atomicity-rollback.md` |
| GitHub Actions workflow | `.github/workflows/fr-11-api-test.yml` |
| CI/CD report | `reports/api-testing/fr-11-cicd-report.md` |
| AI audit report | `reports/ai-audit-report.md` |

### Còn thiếu hoặc chưa xuất bản

| Deliverable | Status |
|---|---|
| Exact assertion list từ authenticated CI artifact | `PENDING`; canonical local evidence đã ghi `DET-011`, `DET-026`–`DET-033` |
| GitHub Issue và issue screenshot | `NOT CREATED` |
| Sơ đồ AI test-generation do sinh viên tự thiết kế/tự vẽ | `PENDING` |
| Video demo FR-11 | `NOT PROVIDED` — tùy chọn khi áp dụng |

## 9. Trạng thái

FR-11 PHASE E: COMPLETE

FR-05 PHASE E: COMPLETE

FR-16 PHASE E: COMPLETE

FR-11 CI/CD CONFIGURATION: COMPLETE

FR-11 GITHUB ACTIONS EXECUTION: COMPLETE — 1 SUCCESS, 1 FAILURE

FR-16 GITHUB ISSUE: NOT CREATED

FR-05 GITHUB ISSUE: NOT CREATED

FR-05 CI/CD: NOT CREATED

FR-16 CI/CD: NOT CREATED
