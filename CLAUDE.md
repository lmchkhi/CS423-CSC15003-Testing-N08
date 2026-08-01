# Project context

- **Course**: CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS. Group N08.
- **Current homework**: HW03-AI — GUI & Usability Testing. **Individual
  assignment** (§1) — I submit my own complete Task 1 + Task 2 + Task 3, not
  a slice of a group submission. The repo is shared within group N08 only
  because we point at the same SUT and coordinate so no two members pick the
  same primary GUI screen or the same usability flow (§5's anti-duplication
  rule) — it is not a group project split.
- **Student**: StudentID `23127300`. Use `23127300@student.hcmus.edu.vn` for any
  required screenshot username overlay.
- **My HW03 scope** (my own choice, coordinated with N08 only to avoid
  duplicating a teammate's primary screen/flow per §5):
  - GUI checklist screens (Task 1, my full scope — not a 1/N slice): Home
    page, product grid, search results, empty search state, product detail
    page. Multiple screens chosen because §5 notes one screen won't
    realistically reach the 40-item minimum; all 40+ items and all 4 IAs are
    still my sole responsibility to deliver.
  - Usability flow (Task 2, my full scope, 7 real participants, all mine to
    recruit/run/analyze): Browse products → search by keyword → open
    product detail → choose quantity → add product to cart.
- **SUT**: EShop, `github.com/ttbhanh/eshop-sut`.
- **`sut-requirements.md`** (repo root): curated excerpt of the SUT's own FR
  spec (FR-05/FR-06 product listing+detail, FR-21–FR-24 GUI requirements)
  copied in by the student from `eshop-sut/README.md` §3 and §8 — ground
  truth to check checklist items against, not something an AI tool should
  regenerate or reword. Any skill/prompt generating GUI checklist items must
  read this file first instead of relying only on a live look at the
  rendered page.
- **Skills**: see `.claude/skills/` — `gui-checklist`, `usability-evaluation`,
  `cross-platform-testing`, `bug-report`, `ai-audit-log`, `prompt-log` cover
  HW03 Tasks 1–3 end to end. Read the relevant SKILL.md before starting a
  task rather than re-deriving the HW03 workflow from the PDF each time.
- **AI logging (per TA instruction, on top of HW03 §9)**: two separate files
  — `reports/prompt-log.md` (every AI interaction, unfiltered, via
  `prompt-log`) and `reports/ai-audit-report.md` (the HW03 §9 appendix with
  Verdict/Reasoning/Student Fix, via `ai-audit-log`). Run both skills for any
  interaction that produced a kept deliverable artifact.
