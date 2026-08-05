# HW04 – Automation Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Phạm vi:** FR-02 (Pool A), FR-10 (Pool B), FR-13 (Pool C) — đúng bộ feature web đã chọn ở HW02 theo §5.
> **Công cụ:** Playwright (TypeScript) + Playwright HTML reporter, chạy trên Chromium / Firefox / WebKit.

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Selected Feature | Self-Assessed Grade |
|---|---|---:|---|---:|
| 1 | Task 1 — Feature A | 25 | FR-02: Đăng nhập & khóa tài khoản | 25 |
| 2 | Task 1 — Feature B | 25 | FR-10: Trạng thái đơn hàng | 25 |
| 3 | Task 1 — Feature C | 25 | FR-13: Dashboard | 25 |
| 4 | Task 2 — Demo video | 15 | Demo suite chạy end-to-end + HTML report | 15 |
| 5 | Agent Skills | 10 | `.claude/skills/playwright-automation` | 10 |
| | **Total** | **100** | | **100 / 100** |

---

## 2. Test Summary Report

### 2.1. Features Automated

| Pool | Feature ID | Feature Name | Platform | Spec |
|---|---|---|---|---|
| A | FR-02 | Đăng nhập & khóa tài khoản | Web `:5173` | `automation/tests/fr-02-login.spec.ts` |
| B | FR-10 | Trạng thái đơn hàng | Web `:5173` + Admin `:5174` | `automation/tests/fr-10-order-state.spec.ts` |
| C | FR-13 | Dashboard | Admin `:5174` | `automation/tests/fr-13-dashboard.spec.ts` |

### 2.2. Test Case Summary

Số case đếm theo case logic, không nhân theo browser.

| Feature | Automated | Executed | Passed | Failed | Not automated |
|---|---:|---:|---:|---:|---:|
| FR-02 | | | | | |
| FR-10 | | | | | |
| FR-13 | | | | | |
| **Total** | | | | | |

> Case không tự động hoá được và lý do: [`test-design/not-automated.md`](test-design/not-automated.md).
> Ánh xạ case HW02 → case HW04 → automated test: `test-design/<feature>/case-map.md`.

### 2.3. Browser Runs

| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| FR-02 | | | |
| FR-10 | | | |
| FR-13 | | | |

> **Tổng số browser run:** 9 (3 feature × 3 browser). Mỗi run sinh một HTML
> report riêng tại `reports/html/<feature>/<browser>/index.html`, hiển thị
> `Run by: 23127300` kèm ISO timestamp. Kết quả từng cell:
> [`reports/run-manifest.md`](reports/run-manifest.md).

### 2.4. Assertion Patterns

| Pattern | Ví dụ | Dùng ở |
|---|---|---|
| | | |

> §6 yêu cầu tối thiểu 3 assertion pattern khác nhau trong suite.

### 2.5. Bug Summary

| Bug ID | Feature | Severity / Priority | Status | Local Report | GitHub Issue |
|---|---|---|---|---|---|
| | | | | | |

> **Tổng số bugs:** _TBD_

### 2.6. Demo Video

| Nội dung | Link |
|---|---|
| Task 2 — chạy automation end-to-end, multi-browser, HTML report (≥5 phút, tiếng Việt) | _TBD_ |
| Agent Skill demo (§7) | _TBD_ |

---

## 3. Cấu trúc repo

| Đường dẫn | Nội dung |
|---|---|
| `automation/` | Playwright project (TypeScript): spec, test data, page object, matrix runner. Cách chạy: [`automation/README.md`](automation/README.md) |
| `automation/test-data/*.cases.json` | Toàn bộ dữ liệu test — không có case nào hardcode trong spec (§6) |
| `test-design/` | Ánh xạ case HW02 → HW04 → automated test; danh sách case không tự động hoá |
| `reports/html/<feature>/<browser>/` | 9 HTML report của ma trận 3×3 |
| `reports/run-manifest.md` | Kết quả từng cell: pass/fail, số case, timestamp, đường dẫn report |
| `reports/main-report.md` | Báo cáo chính: quy trình từng bước, requirement ledger, review AI |
| `ai-gap-analysis/` | Phân tích AI làm sai / thiếu gì và vì sao (§6) |
| `reports/ai-audit-report.md`, `reports/prompt-log.md`, `reports/ai-critique.md` | Phụ lục AI bắt buộc (§9, §10) |
| `bug-reports/` | Bug report + screenshot + link GitHub Issue |
| `.claude/skills/` | Agent Skills (§7) — `playwright-automation`, `bug-report`, `ai-audit-log`, `prompt-log` |
| `sut-requirements.md` | Trích đặc tả EShop cho FR-02/10/13 — oracle của toàn bộ assertion |
| `git-log.txt` | Git commit log (§12) |

---

## 4. Liên kết

| Mục | Link |
|---|---|
| GitHub repository | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08 (branch `HW04/23127300`) |
| SUT | https://github.com/ttbhanh/eshop-sut |
| Demo video (Task 2) | _TBD_ |
