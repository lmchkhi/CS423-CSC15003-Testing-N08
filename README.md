# HW02 - Domain Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc - 23127300  
> **Nhóm:** N08  
> **Môn:** CS423 / CSC15003 - Kiểm thử Phần mềm  
> **Phạm vi hiện tại:** FR-02, FR-10, FR-13, FR-26.

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Selected Feature | Self-Assessed Grade |
|---|---|---:|---|---:|
| 1 | Feature A - Domain Testing + Boundary Value Analysis | 25 | FR-02: Đăng nhập và khóa tài khoản | 25 |
| 2 | Feature B - Domain Testing + Boundary Value Analysis | 25 | FR-10: Trạng thái đơn hàng | 25 |
| 3 | Feature C - Domain Testing + Boundary Value Analysis | 25 | FR-13: Dashboard | 25 |
| 4 | Feature D - Mobile, Domain Testing + Boundary Value Analysis | 15 | FR-26: Giỏ hàng trên Mobile | 15 |
| 5 | Agent Skills | 10 | `.agents/skills/` | 10 |
| | **Total** | **100** | | **100 / 100** |

---

## 2. Test Summary Report

### 2.1. Features Tested

| Pool | Feature ID | Feature Name | Platform | Status |
|---|---|---|---|---|
| A | FR-02 | Đăng nhập và khóa tài khoản | Web | Completed |
| B | FR-10 | Trạng thái đơn hàng | Web / Admin | Completed |
| C | FR-13 | Dashboard | Web Admin | Completed |
| D | FR-26 | Giỏ hàng trên Mobile | Mobile | Completed |

### 2.2. Test Case Summary

| Feature | Technique | Designed | Executed | Passed | Failed | Not Run | Blocked |
|---|---|---:|---:|---:|---:|---:|---:|
| FR-02 | Domain Testing | 9 | 9 | 3 | 6 | 0 | 0 |
| FR-02 | Boundary Value Analysis | 6 | 6 | 3 | 3 | 0 | 0 |
| FR-10 | Domain Testing | 14 | 14 | 11 | 3 | 0 | 0 |
| FR-10 | Boundary Value Analysis | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-13 | Domain Testing | 6 | 6 | 3 | 3 | 0 | 0 |
| FR-13 | Boundary Value Analysis | 0 | 0 | 0 | 0 | 0 | 0 |
| FR-26 | Domain Testing | 14 | 14 | 5 | 9 | 0 | 0 |
| FR-26 | Boundary Value Analysis | 5 | 5 | 3 | 2 | 0 | 0 |
| **Total** | | **54** | **54** | **28** | **26** | **0** | **0** |

> FR-10 và FR-13 không có test case BVA vì requirement không đặc tả boundary hợp lệ. Quyết định này đã được ghi trong `analysis/FR-10-order-state-machine/bva-analysis.md`, `analysis/FR-13-dashboard/bva-analysis.md` và review tương ứng.

### 2.3. Bug Summary

| Bug ID | Feature | Severity / Priority | Status | Local Report | GitHub Issue |
|---|---|---|---|---|---|
| BUG-FR02-001 | FR-02 | Critical / P1 | Open | [BUG-FR02-001](bug-reports/BUG-FR02-001.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69 |
| BUG-FR02-002 | FR-02 | High / P2 | Open | [BUG-FR02-002](bug-reports/BUG-FR02-002.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/70 |
| BUG-FR02-003 | FR-02 | High / P1 | Open | [BUG-FR02-003](bug-reports/BUG-FR02-003.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/71 |
| BUG-FR02-004 | FR-02 | Low / P3 | Open | [BUG-FR02-004](bug-reports/BUG-FR02-004.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/72 |
| BUG-FR02-005 | FR-02 | High / P1 | Open | [BUG-FR02-005](bug-reports/BUG-FR02-005.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/73 |
| BUG-FR10-001 | FR-10 | High / P2 | Open | [BUG-FR10-001](bug-reports/BUG-FR10-001.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/85 |
| BUG-FR10-002 | FR-10 | High / P2 | Open | [BUG-FR10-002](bug-reports/BUG-FR10-002.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/86 |
| BUG-FR10-003 | FR-10 | Critical / P1 | Open | [BUG-FR10-003](bug-reports/BUG-FR10-003.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/87 |
| BUG-FR13-001 | FR-13 | High / P2 | Open | [BUG-FR13-001](bug-reports/BUG-FR13-001.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/58 |
| BUG-FR26-001 | FR-26 | Low / P2 | Open | [BUG-FR26-001](bug-reports/BUG-FR26-001.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/75 |
| BUG-FR26-002 | FR-26 | Medium / P2 | Open | [BUG-FR26-002](bug-reports/BUG-FR26-002.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/76 |
| BUG-FR26-003 | FR-26 | High / P2 | Open | [BUG-FR26-003](bug-reports/BUG-FR26-003.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/77 |
| BUG-FR26-004 | FR-26 | Low / P3 | Open | [BUG-FR26-004](bug-reports/BUG-FR26-004.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/78 |
| BUG-FR26-005 | FR-26 | Low / P2 | Open | [BUG-FR26-005](bug-reports/BUG-FR26-005.md) | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/79 |

> **Tổng số bugs:** 14 unique bugs.
> Link GitHub Issue đã được cập nhật tương ứng; bug report nội bộ và screenshot được đính kèm trong `bug-reports/`.

### 2.4. Bằng chứng test run

| Feature | Test Run |
|---|---|
| FR-02 | [FR-02-login-run.md](tests/test-runs/FR-02-login-run.md) |
| FR-10 | [FR-10-order-state-machine-run.md](tests/test-runs/FR-10-order-state-machine-run.md) |
| FR-13 | [FR-13-dashboard-run.md](tests/test-runs/FR-13-dashboard-run.md) |
| FR-26 | [FR-26-mobile-cart-run.md](tests/test-runs/FR-26-mobile-cart-run.md) |

### 2.5. Demo Videos

| Item | Video Link |
|---|---|
| Agent Skill Demo | https://youtu.be/QkuGNTtqedA |

---

## 3. Main Deliverables

| Deliverable | Path |
|---|---|
| Báo cáo chính | [reports/main-report.md](reports/main-report.md) |
| Báo cáo chính PDF | [reports/main-report.pdf](reports/main-report.pdf) |
| AI Critique | [reports/ai-critique.md](reports/ai-critique.md) |
| AI Critique PDF | [reports/ai-critique.pdf](reports/ai-critique.pdf) |
| AI Audit Report | [reports/ai-audit-report.md](reports/ai-audit-report.md) |
| AI Audit Report PDF | [reports/ai-audit-report.pdf](reports/ai-audit-report.pdf) |
| AI Gap Analysis | [ai-gap-analysis/HW02-ai-gap-analysis.md](ai-gap-analysis/HW02-ai-gap-analysis.md) |
| Prompt log | [prompt_log.md](prompt_log.md) |
| Git commit log | [git-log.txt](git-log.txt) |
| Requirements | [requirements/](requirements/) |
| Analysis artifacts | [analysis/](analysis/) |
| Test cases | [tests/test-cases/](tests/test-cases/) |
| Test runs | [tests/test-runs/](tests/test-runs/) |
| Reviews | [reviews/](reviews/) |
| Bug reports | [bug-reports/](bug-reports/) |

---

## 4. Agent Skills

Project-level skills nằm trong `.agents/skills/`:

- `$domain-testing`
- `$boundary-value-analysis`
- `$test-case-review`
- `$test-execution`
- `$bug-report`
- `$qa-workflow`
- `$prompt-log`

Các skill được dùng để tạo analysis, review test case, ghi nhận execution, tạo bug report và lưu prompt log theo workflow black-box testing.
