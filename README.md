# HW03 – GUI & Usability Testing

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Hình thức:** Bài tập cá nhân (individual) — repo dùng chung với nhóm N08
> chỉ để trỏ về cùng SUT và tránh trùng màn hình/luồng chính với đồng đội
> (§5), không phải bài nộp nhóm.

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | |
| 4 | Agent Skills | 10 | |
| | **Total** | **100** | **/100** |

---

## 2. Test Summary Report

### 2.1. Scope

- **GUI checklist screens (Task 1)**: Home page (incl. product grid),
  Search results, Empty search state, Product detail page. 4 effective
  screens — Product grid was folded into Home page rather than checklisted
  separately, since both are the same rendered page/state and the Home Page
  IA01/IA04 batches already cover card layout, image ratio, price
  formatting, and grid responsiveness; re-testing the same cards under a
  second label would be
  duplication, not added coverage.
- **Usability flow (Task 2)**: Browse products → search by keyword → open
  product detail → choose quantity → add product to cart.
- **SUT**: EShop — `github.com/ttbhanh/eshop-sut`, build/commit tested
  `85af3ba`, URL `http://localhost:5173/`.

### 2.2. GUI Checklist Summary (Task 1)

| IA aspect | Designed | Executed | Passed | Failed | N/A |
|---|---|---|---|---|---|
| IA01 — General UI | 34 | 34 | 24 | 10 | 0 |
| IA02 — Forms | 27 | 27 | 12 | 14 | 1 |
| IA03 — Navigation | 24 | 24 | 7 | 15 | 2 |
| IA04 — Feedback/state | 25 | 25 | 4 | 20 | 1 |
| **Total** | **110** | **110** | **47** | **59** | **4** |

> Covers all 4 declared screens, fully designed and executed on the real
> SUT: Product Detail (GUI-001–046), Home Page (GUI-047–086), Search Results
> (GUI-087–099), Empty Search State (GUI-100–110). Search Results/Empty
> Search State executed via Claude for Chrome on 31/07/2026 — 24/24 item,
> 8 Passed / 15 Failed / 1 N/A. Xem `checklist/gui-checklist.md` để biết chi
> tiết từng item và `bug-reports/` cho 24 bug đã file (BUG-IA01-PRODUCTDETAIL-001..003,
> BUG-IA02-PRODUCTDETAIL-001, BUG-IA03-PRODUCTDETAIL-001..002,
> BUG-IA04-PRODUCTDETAIL-001, BUG-IA01-HOMEPAGE-001..003,
> BUG-IA02-HOMEPAGE-001..003, BUG-IA03-HOMEPAGE-001..003,
> BUG-IA04-HOMEPAGE-001..003, BUG-IA02-SEARCHRESULTS-001..002,
> BUG-IA04-SEARCHRESULTS-001..002, BUG-IA04-EMPTYSEARCH-001). Most severe:
> `BUG-IA02-HOMEPAGE-003` (SQL Injection in the product search API) and
> `BUG-IA04-EMPTYSEARCH-001` (Empty Search State violates FR-05/FR-24 —
> renders completely blank, no icon/message/exit).

> Full table: `checklist/gui-checklist.md` / `checklist/gui-checklist.xlsx`.

### 2.3. Usability Evaluation Summary (Task 2)

| Metric | Value |
|---|---|
| Participants | 7 |
| Mean SUS / UEQ-S score | |
| Findings (Blocker / Major / Minor) | / / |
| Bugs filed | |

> Full detail: `usability/plan.md`, `usability/sessions/`, `usability/analysis.md`.

### 2.4. Cross-Platform Summary (Task 3)

| Platform | Status |
|---|---|
| Chrome | |
| Firefox | |
| Safari / Android Chrome | |

> Full detail: `cross-platform/report.md`.

### 2.5. Bug Summary

| Bug ID | Source (Task) | Severity | Status | GitHub Issue |
|---|---|---|---|---|
| | | | | |

> **Tổng số bugs:**

### 2.6. Demo Videos

| Skill / Flow | Video Link |
|---|---|
| `gui-checklist` demo | |
| `usability-evaluation` demo | |

---

## 3. AI Critique & Audit

- AI Critique (200–300 từ): `reports/ai-critique.md`
- AI Audit Report (mandatory appendix, §9): `reports/ai-audit-report.md`
- Raw prompt log (unfiltered, per TA instruction): `reports/prompt-log.md`
