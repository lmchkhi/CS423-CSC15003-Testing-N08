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
| Participants | 7 (real, ngoài lớp học phần — `usability/participants.md`) |
| Mean SUS score | **53.2 / 100** (min 15, max 87.5, SD ≈ 27.8) |
| Task success | 4 Yes (hesitant) / 2 Partial / 1 No (thất bại hoàn toàn — participant #7) |
| Findings (Blocker / Major / Minor) | 1 / 1 / 2 |
| Bugs filed | 0 mới — 2 bug đã có từ Task 1 được cross-link làm bằng chứng bổ sung (`BUG-IA04-PRODUCTDETAIL-001`, `BUG-IA03-HOMEPAGE-002`) |

> Phát hiện quan trọng nhất: SUS không tương quan với task success —
> participant #7 có SUS cao thứ 3 (82.5) nhưng task thất bại hoàn toàn sau
> 3 lần thử. Full detail: `usability/plan.md`, `usability/sessions/`,
> `usability/analysis.md`.

### 2.4. Cross-Platform Summary (Task 3)

| Platform | Status |
|---|---|
| Chrome | TODO — chờ tài khoản trial BrowserStack/LambdaTest |
| Firefox | TODO — chờ tài khoản trial BrowserStack/LambdaTest |
| Safari / Android Chrome | TODO — chờ tài khoản trial BrowserStack/LambdaTest |

> Full detail: `cross-platform/report.md`.

### 2.5. Bug Summary

| Bug ID | Source (Task) | Severity | Status | GitHub Issue |
|---|---|---|---|---|
| BUG-IA02-HOMEPAGE-003 | Task 1 | Critical | Open | [#106](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/106) |
| BUG-IA02-HOMEPAGE-002 | Task 1 | Critical | Open | [#105](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/105) |
| BUG-IA02-PRODUCTDETAIL-001 | Task 1 | Critical | Open | [#97](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/97) |
| BUG-IA04-HOMEPAGE-003 | Task 1 | Critical | Open | [#112](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/112) |
| BUG-IA04-PRODUCTDETAIL-001 | Task 1 + xác nhận qua Task 2 (5/7 participant) | Critical | Open | [#100](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/100) |
| BUG-IA01-HOMEPAGE-001 | Task 1 | Major | Open | [#101](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/101) |
| BUG-IA01-PRODUCTDETAIL-002 | Task 1 | Major | Open | [#95](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/95) |
| BUG-IA03-HOMEPAGE-002 | Task 1 + liên hệ giả thuyết Task 2 (1/7) | Major | Open | [#108](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/108) |
| BUG-IA03-PRODUCTDETAIL-001 | Task 1 | Major | Open | [#98](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/98) |
| BUG-IA04-EMPTYSEARCH-001 | Task 1 | Major | Open | [#194](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/194) |
| BUG-IA04-SEARCHRESULTS-002 | Task 1 | Major | Open | [#193](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/193) |
| BUG-IA01-HOMEPAGE-002 | Task 1 | Minor | Open | [#102](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/102) |
| BUG-IA01-HOMEPAGE-003 | Task 1 | Minor | Open | [#103](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/103) |
| BUG-IA01-PRODUCTDETAIL-001 | Task 1 | Minor | Open | [#94](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/94) |
| BUG-IA01-PRODUCTDETAIL-003 | Task 1 | Minor | Open | [#96](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/96) |
| BUG-IA02-HOMEPAGE-001 | Task 1 | Minor | Open | [#104](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/104) |
| BUG-IA02-SEARCHRESULTS-001 | Task 1 | Minor | Open | [#190](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/190) |
| BUG-IA02-SEARCHRESULTS-002 | Task 1 | Minor | Open | [#191](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/191) |
| BUG-IA03-HOMEPAGE-001 | Task 1 | Minor | Open | [#107](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/107) |
| BUG-IA03-HOMEPAGE-003 | Task 1 | Minor | Open | [#109](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/109) |
| BUG-IA03-PRODUCTDETAIL-002 | Task 1 | Minor | Open | [#99](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/99) |
| BUG-IA04-HOMEPAGE-001 | Task 1 | Minor | Open | [#110](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/110) |
| BUG-IA04-HOMEPAGE-002 | Task 1 | Minor | Open | [#111](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/111) |
| BUG-IA04-SEARCHRESULTS-001 | Task 1 | Minor | Open | [#192](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/192) |

> **Tổng số bugs: 24** (5 Critical, 6 Major, 13 Minor) — tất cả từ Task 1;
> Task 2 không phát sinh bug mới, chỉ cross-link 2 bug đã có làm bằng chứng
> bổ sung từ người dùng thật (xem cột Source).

### 2.6. Demo Videos

| Skill / Flow | Video Link |
|---|---|
| `gui-checklist` demo | TODO — cần quay + upload YouTube (§7) |
| `usability-evaluation` demo | TODO — cần quay + upload YouTube (§7) |

---

## 3. AI Critique & Audit

- AI Critique (200–300 từ): `reports/ai-critique.md`
- AI Audit Report (mandatory appendix, §9): `reports/ai-audit-report.md`
- Raw prompt log (unfiltered, per TA instruction): `reports/prompt-log.md`
