# Project context

- **Course**: CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS. Group N08.
- **Current homework**: HW05-AI — Performance Testing. **Individual assignment**
  (§1) — I submit my own complete Task 1 + Task 2 + Task 3, not a slice of a
  group submission. The repo is shared within N08 only because we point at the
  same SUT and coordinate so no two members test the same workflow (§5's
  anti-duplication rule).
- **Student**: `23127300` — Hà Bảo Ngọc. This exact ID must appear in every test
  plan filename (§11 anti-cheat, see naming below).
- **My HW05 scope** — **Workflow 5** from `workflows.md`, *Khôi phục tài khoản
  rồi mua hàng*, assigned to Ngọc. One end-to-end journey, run identically by
  all three scenarios:

  ```
  POST /api/forgot-password  →  extract ${resetToken}
  POST /api/reset-password
  POST /api/login            →  extract ${token}
  GET  /api/products
  GET  /api/products/${productId}
  POST /api/cart
  POST /api/checkout
  ```

  | Endpoint group | Endpoints |
  |---|---|
  | Auth-heavy | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` |
  | Read-heavy | `GET /api/products`, `GET /api/products/${productId}` |
  | Transactional | `POST /api/cart`, `POST /api/checkout` |

  §6 requires all three plans (Load / Stress / Spike) to exercise **this same
  journey**. Only the workload model changes between them — VU count, ramp-up,
  duration, arrival shape. Never reorder or drop a step to make a scenario run
  cleaner.
- **Tools**: JMeter only (§8 default) — the §8 bonus is for using k6 *instead*
  of JMeter, not in addition, so no k6 mirror is built. Every JMeter-specific
  rubric item (raw `.jtl`, HTML report folder, three distinct listener types)
  is satisfied by the JMeter side under `perf/plans/`.
- **Test-plan naming (§11, verified by TAs)**: `{StudentID}_{ScenarioType}_{YYYYMMDD}`,
  e.g. `23127300_Load_20260813.jmx`. `ScenarioType` ∈ `Load` / `Stress` / `Spike`
  (plus `Endurance` for the soak run). The date is the **real run date**, not a
  placeholder.
- **Three distinct report views (§6)**: across the three plans, three *different*
  JMeter listener / report types — no type reused. Decide the mapping once and
  record it in `reports/main-report.md`.
- **SUT**: EShop, `github.com/ttbhanh/eshop-sut`, cloned locally at
  `~/Documents/eshop-sut`. HW05 drives the **backend API only** —
  `http://localhost:3000`. The SUT source is deliberately **not** vendored into
  this branch (same as HW04); `api_specification.md` at the repo root is the
  endpoint contract and the oracle for assertions.
- **Skills**: see `.claude/skills/` — `bug-report`, `ai-audit-log`, `prompt-log`
  carried over from HW03/HW04, plus the HW05 §7 deliverable skill for the
  performance-testing + log-analysis workflow (to be built). Read the relevant
  SKILL.md before starting a task rather than re-deriving the workflow each time.
- **AI logging (per TA instruction, on top of HW05 §9)**: two separate files —
  `reports/prompt-log.md` (every AI interaction, unfiltered, via `prompt-log`)
  and `reports/ai-audit-report.md` (the §9 appendix with
  Verdict/Reasoning/Student Fix, via `ai-audit-log`). Run both skills for any
  interaction that produced a kept deliverable artifact.
- **Commit discipline (§12)**: one commit per step of the procedure — each
  scenario's test plan, each run's results, the AI analysis, the continuous-
  testing proposal. Do not squash the work into one commit at the end. The log
  ships as `git-log.txt`.
- **Black-box rule** (carried from HW02/HW03/HW04): bug reports and report notes
  cite observable behaviour only — HTTP status, response body, latency, error
  rate, resource usage — never SUT source file paths or line numbers. Reading
  SUT code to understand a failure is fine; citing it as evidence is not.

# Working rules for this repo

- **Data-driven is mandatory (§6).** Every parameterised value comes from CSV
  under `perf/data/` via `CSV Data Set Config`. No credentials, product IDs, or
  payloads hardcoded inside a plan.
- **Workflow 5 mutates real account state.** It changes passwords for real. Each
  virtual user needs its **own** account row in the CSV, and no two threads may
  ever hold the same email — a shared account produces false failures that look
  like performance defects. Size the CSV to the largest VU count across all
  scenarios, and re-seed accounts before a rerun rather than reusing spent rows.
- **`resetToken` and `token` are extracted, never hardcoded.** `POST
  /api/forgot-password` returns `resetToken` in the response body; extract it,
  feed it to `POST /api/reset-password`, then extract the JWT from `POST
  /api/login` and send `Authorization: Bearer ${token}` on cart/checkout. An
  extractor that silently yields an empty string turns the whole downstream
  chain into 401s — assert on the extracted value, not just on the status code.
- **Login lockout is real and will fire under Stress/Spike.** Observed: 2
  consecutive failed logins lock the account for ~180 seconds. §6 requires
  resetting it between runs *and documenting the steps* — script the reset under
  `perf/scripts/` and record it in the main report, don't do it by hand and
  forget how.
- **EShop is one SQLite file.** Write contention on cart/checkout is a genuine
  property of the SUT under load, not a test bug. Report what it does; do not
  tune the SUT to make numbers look better, and do not lower concurrency to dodge
  it.
- **Status-code assertions alone are not enough.** A JMeter sampler can return
  200 with an error body. Every step asserts on response content, and failures
  stay failing — a failure that reflects a genuine EShop defect is evidence
  (§6 "Report issues"), not something to hide.
- **Evidence is captured at run time, never reconstructed.** Each run needs the
  tool window and Activity Monitor **in the same frame**, plus the raw `.jtl`
  and the HTML report folder. §11 treats fabricated evidence as the failure
  mode this homework exists to prevent — if a run wasn't captured, rerun it.
- Screenshots for evidence use the browser `zoom` action, not `screenshot`
  (which re-encodes as lossy JPEG even when saved as `.png`).
