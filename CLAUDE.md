# Project context

- **Course**: CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS. Group N08.
- **Current homework**: HW04-AI — Automation Testing. **Individual assignment**
  (§1) — I submit my own complete Task 1 + Task 2, not a slice of a group
  submission. The repo is shared within group N08 only because we point at the
  same SUT and coordinate so no two members automate the same feature (§5's
  anti-duplication rule) — it is not a group project split.
- **Student**: `23127300` — Hà Bảo Ngọc. This exact ID must appear as
  `Run by: 23127300` **together with an ISO timestamp** in every HTML report
  (§11 anti-cheat). Never hardcode it in a spec — it comes from
  `automation/.env`.
- **My HW04 scope** — the same three web features I did in HW02 (§5 requires
  this), one per pool:
  - **FR-02** Đăng nhập & khóa tài khoản (Pool A, web `:5173`)
  - **FR-10** Trạng thái đơn hàng / order state machine (Pool B, web `:5173` +
    admin `:5174`)
  - **FR-13** Dashboard (Pool C, admin `:5174`)
  Pool D (mobile) is out of scope for HW04.
- **Per-feature minimum**: ≥12 automated cases **each** (not 36 across the
  suite), each running on Chromium + Firefox + WebKit = ≥9 browser runs and 9
  separate HTML reports.
- **HW02 carry-over**: the manual cases live in
  `~/Downloads/23127300_HW02_AI_DomainTesting_100/tests/test-cases/`. Counts
  brought forward: FR-02 = 15 (9 DT + 6 BVA), FR-10 = 14 DT, **FR-13 = 6 DT**.
  FR-13 is short of 12, so ~6 additional cases are designed fresh in HW04 and
  must be documented as new HW04 design work in `reports/main-report.md`.
- **SUT**: EShop, `github.com/ttbhanh/eshop-sut`, cloned locally at
  `~/Documents/eshop-sut`. Backend API `:3000`, frontend web `:5173`, admin
  `:5174`. Default accounts: `admin@eshop.com` / `Admin123!`,
  `test@eshop.com` / `Test1234!`.
- **`sut-requirements.md`** (repo root): curated excerpt of the SUT's own FR
  spec for FR-02 / FR-08 / FR-10 / FR-11 / FR-12 / FR-13, copied in by the
  student from `eshop-sut/README.md` — this is the **oracle**. Assertions
  encode what this file says the system *should* do, never what the buggy
  build currently does. Do not regenerate or reword it.
- **Skills**: see `.claude/skills/` — `playwright-automation` (the HW04 §7
  deliverable skill, covering the whole generate→review→run→report workflow),
  plus `bug-report`, `ai-audit-log`, `prompt-log` carried over from HW03. Read
  the relevant SKILL.md before starting a task rather than re-deriving the
  workflow from the PDF each time.
- **AI logging (per TA instruction, on top of HW04 §9)**: two separate files —
  `reports/prompt-log.md` (every AI interaction, unfiltered, via `prompt-log`)
  and `reports/ai-audit-report.md` (the §9 appendix with
  Verdict/Reasoning/Student Fix, via `ai-audit-log`). Run both skills for any
  interaction that produced a kept deliverable artifact.
- **Commit discipline (§12)**: ≥8 commits, and **only commits that change
  test-script files** (`.spec.ts`, and the data/config they drive) count toward
  the 8. README/PDF-only commits do not. The old "over ≥4 different days"
  clause **no longer applies** (dropped 2026-08-08) — the count alone is the
  requirement. Still do not squash feature work into one commit at the end.
- **Black-box rule** (carried from HW02/HW03): bug reports and test-case notes
  cite observable behaviour only — never SUT source file paths or line numbers.
  Reading SUT code to understand a failure is fine; citing it as evidence is not.

# Working rules for this repo

- The automation project is `automation/` — TypeScript + `@playwright/test`.
  Test data lives in `automation/test-data/*.json`; inline case arrays in a
  spec are an automatic rubric failure (§6).
- EShop stores everything in one SQLite file, so the suite runs `workers: 1`
  with `fullyParallel: false`. Tests must create their own users/orders via the
  API (`automation/utils/api.ts`) rather than depend on run order or a shared
  seed row that another test mutates.
- FR-02's lockout is a real 30-second wall-clock timer on **≥3** consecutive
  failed logins. Every FR-02 case that trips it uses a freshly-registered
  throwaway account so it cannot lock out a shared fixture account.
- Never weaken an assertion or skip a test to get green output. A failure that
  reflects a genuine EShop defect stays failing, and gets a bug report + GitHub
  issue via the `bug-report` skill.
