# Final Test Summary — HW06 AI-First API Testing

## Sinh viên: 23127464 — Trần Minh Quang

## SUT: EShop REST Backend (`http://127.0.0.1:3000`)

---

### Phạm vi kiểm thử

| Pool | FR | Endpoint | Mô tả |
|:---:|---|---|---|
| A | FR-05 | `GET /api/products` | Product Listing & Search |
| B | FR-11 | `GET /api/orders/my-orders` | Order History (danh sách) |
| B | FR-11 | `GET /api/orders/:id` | Order History (chi tiết) |
| C | FR-16 | `POST /api/admin/import-products` | Product Import (admin) |

### Tổng hợp test cases

| Pool | FR | Thiết kế | AI sinh | Người bổ sung | VALID | INVALID | INCOMPLETE | Thực thi | Đạt | Không đạt | Bugs |
|:---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| A | FR-05 | 45 | 40 | 5 | 16 | 2 | 22 | 45 | 35 | 10 | 1 |
| B | FR-11 | 80 | 70 | 10 | 33 | 2 | 35 | 80 | 60 | 20 | 1 |
| C | FR-16 | 45 | 40 | 5 | 29 | 2 | 9 | 45 | 29 | 16 | 3 |
| | **Tổng** | **170** | **150** | **20** | **78** | **6** | **66** | **170** | **124** | **46** | **5** |

### Tỉ lệ

| Metric | Giá trị |
|---|---:|
| Tỉ lệ thực thi | 170 / 170 = **100%** |
| Tỉ lệ đạt | 124 / 170 = **72,9%** |
| Tỉ lệ không đạt | 46 / 170 = **27,1%** |
| Assertions đạt / không đạt | 373 / 49 |
| Assertions | **422** tổng cộng — 373 đạt / 49 không đạt |
| Bugs phát hiện | **5** (3 Critical, 1 Major, 1 Minor) |

### Canonical Newman evidence

| Pool | FR | Ca thực thi | Đạt | Không đạt | Assertions đạt / không đạt | Evidence cuối |
|:---:|---|---:|---:|---:|---:|---|
| A | FR-05 | 45 | 35 | 10 | 109 / 11 | `tests/api-testing/evidence/fr-05/20260822-230735/` |
| B | FR-11 | 80 | 60 | 20 | 167 / 22 | `tests/api-testing/evidence/fr-11/20260822-schema-rerun-final/` |
| C | FR-16 | 45 | 29 | 16 | 97 / 16 | `tests/api-testing/evidence/fr-16/20260822-230924/` |
| | **Tổng** | **170** | **124** | **46** | **373 / 49** | |

Mỗi request thuộc phạm vi kiểm thử đều mang header `X-Student-Id: 23127464`. Ba ảnh Postman Console tương ứng được lưu tại `tests/api-testing/evidence/fr-*/postman-header-screenshot.png`.

### Bugs phát hiện

| # | FR | Severity | Mô tả | GitHub Issue |
|---:|---|---|---|---|
| 1 | FR-05 | Critical / P0 | SQL injection qua `search` parameter | [#263](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/263) |
| 2 | FR-11 | Critical / P0 | IDOR + thiếu authentication trên order detail | [#262](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/262) |
| 3 | FR-16 | Critical / P0 | Thiếu kiểm tra role admin khi import | [#264](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/264) |
| 4 | FR-16 | Minor / P1 | Không validate price > 0 | [#265](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/265) |
| 5 | FR-16 | Major / P0 | Không rollback batch khi có dòng invalid | [#266](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/266) |

### CI/CD

| Run | Commit | Kết quả | Link |
|---|---|---|---|
| All-pass | `34455d7` | SUCCESS | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502275099) |
| Controlled-failure | `c2610bb` | FAILURE | [GitHub Actions](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32502722228) |

Hai run trên là hai mẫu pipeline bắt buộc: một run all-pass và một run có lỗi được kiểm soát. Ảnh tổng quan được lưu trong `tests/api-testing/evidence/ci-cd/`.

### Trạng thái tài liệu nộp kèm

| Deliverable | Markdown / Source | PDF / Output | Trạng thái |
|---|---|---|:---:|
| Main Report | `reports/main-report.md` | `reports/main-report.pdf` | Đủ |
| Test Summary | `reports/test-summary.md` | `reports/test-summary.pdf` | Đủ |
| AI Critique | `reports/ai-critique.md` | `reports/ai-critique.pdf` | Đủ |
| AI Audit Report | `reports/ai-audit-report.md` | `reports/ai-audit-report.pdf` | Đủ — 23/23 human reviews `REVIEWED` |
| Test Cases | `reports/23127464_test_cases.csv` | `reports/23127464_test_cases.xlsx` | Đủ |
| Test Summary Data | `reports/23127464_test_summary.csv` | `reports/23127464_test_summary.xlsx` | Đủ |
| AI Test Generator | `ai-first-api-testing/`, `reports/PSEUDOCODE.md` | `reports/Self-Drawn_AI_Driven_Diagram.png` | Đủ |
| Bug Evidence | 5 bug reports | 5 Issue screenshots + 5 runtime screenshots | Đủ |

### Video demo

| Link |
|---|
| [https://youtu.be/k49pwd-5vUs](https://youtu.be/k49pwd-5vUs) |

### Repository

- Branch: [test/23127464-API-Testing](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-API-Testing)
- Public repository: [lmchkhi/CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08)
- Self-assessed grade: **100/100**.
- Submission filename: `23127464_HW06_AI_API_100.zip`.

---

**FINAL STATUS: READY FOR SUBMISSION**
