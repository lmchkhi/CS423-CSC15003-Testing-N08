---
name: perf-test-workflow
description: Apply the HW05 Workflow-5 performance testing loop — map endpoints to samplers, calibrate the workload, model CSV data so no two virtual users collide, build extractors and assertions, generate a JMeter .jmx from the template, seed accounts, run headless, collect .jtl, and analyse results against the raw log. Use whenever a new endpoint group (auth, read, transactional) needs a JMeter test plan, workload calibration, or raw-log analysis for the EShop backend. Includes the full trap list from HW05: silent extractor defaults, functional defects inflating error rate, CSV-cursor collisions, lockout masquerading as saturation, and connection-reuse misconfiguration.
---

# Performance Test Workflow Skill

Applies the end-to-end performance testing loop developed for HW05 to **any
endpoint group** of the EShop backend. The journey type (auth-heavy,
read-heavy, transactional) dictates which traps apply, but the loop and
quality gates are the same every time.

## Scope

Covers the full cycle:

1. **Map** — endpoint → sampler
2. **Calibrate** — choose workload model from measurement, not habit
3. **Model data** — CSV design with no concurrent-user collision
4. **Wire** — extractor + assertion on every sampler
5. **Generate** — `.jmx` from the template
6. **Seed** — accounts through the API
7. **Run** — headless JMeter with resource monitoring
8. **Collect** — `.jtl` + HTML dashboard + resource CSV + screenshots
9. **Analyse** — re-derive every metric from the raw log; never eyeball a graph

Does **not** cover: browser-based UI testing, k6, non-EShop SUT adaption,
or writing the main report (that's the caller's job).

---

## Step 1 — Map the workflow to samplers

Read `api_specification.md` and `workflows.md`. For each HTTP call in the
target workflow, create one JMeter sampler:

| Sampler | Method + path | Extraction needed | Assertion |
|---|---|---|---|
| 01 | `POST /api/forgot-password` | `resetToken` from JSON body | HTTP 200, non-empty token |
| 02 | `POST /api/reset-password` | — | HTTP 200 |
| … | … | … | … |

**Ordering rule:** samplers must follow the user's real journey order. Never
reorder to improve the numbers — a wrong order produces false successes
(`POST /api/checkout` before `POST /api/login` always returns 401).

**State dependencies to note:**
- Any sampler that creates a token, JWT or order ID must feed it as a JMeter
  variable to every downstream sampler in the same thread.
- The reset-password sampler must consume the *token from this iteration's
  forgot-password call*, not a hardcoded value.

---

## Step 2 — Calibrate the workload model

Do not copy thread counts or think-times from a template. Measure.

### Thread-count sweep

```bash
# Run 5-step sweep: 25, 50, 100, 200, 300 VU, think-time fixed
for VU in 25 50 100 200 300; do
  RUNDATE=$(date +%Y%m%d)
  timeout 120 jmeter -n -t perf/plans/jmeter/PROBE_${VU}.jmx \
    -p perf/config/jmeter-run.properties \
    -l /tmp/cal-${VU}.jtl -j /tmp/cal-${VU}.log
  python3 perf/scripts/analyze_jtl.py /tmp/cal-${VU}.jtl
done
```

Stop at the first VU count where:
- error rate is nonzero **and** the errors are `5xx` or `RST` (not test-data
  collisions — see trap list), **or**
- checkout p95 > 500 ms, **or**
- SUT CPU > 90 % of total machine cores.

If no knee is found, document the ceiling of the harness (JMeter process
CPU, ephemeral port pool) rather than claiming the SUT has no limit.

### Arrival-rate sweep (if thread sweep finds no knee)

Lower think-time rather than adding threads. Start at 1 000 ms, step down
to 500 / 200 / 100 / 0 ms. Repeat at the highest safe VU count. Check
`netstat | grep TIME_WAIT` before concluding port exhaustion is a SUT defect
— it is almost always `httpclient.reset_state_on_thread_group_iteration=true`
(JMeter default). Fix it in `perf/config/jmeter-run.properties`:

```properties
httpclient.reset_state_on_thread_group_iteration=false
```

### Workload decisions to record

After calibration, write a one-paragraph justification of each scenario's:
- VU count (why this number relative to the knee or the harness ceiling)
- think-time (why arrival rate is realistic for the workflow)
- ramp-up duration (rule of thumb: 1 s per VU, max 120 s)
- duration (Load: 6 min steady-state; Stress: staircase to 2× Load; Spike:
  2 burst windows at 3× Load; Endurance: 15 min)

---

## Step 3 — Model the CSV data

### Accounts CSV (`perf/data/accounts.csv`)

Columns: `email,newPassword`

Rules:
- **One row per concurrent VU** — size to the *largest* VU count across all
  scenarios. Spike with 300 + 300 burst threads needs at minimum 600 rows; add
  20 % margin → 720.
- `email` pattern: `perf<NNNN>@hw05.local` (zero-padded 4 digits).
- `newPassword`: constant string reused across iterations — makes the
  reset-password journey idempotent (confirmed by oracle OR-1).
- Never embed commas in any field; the CSV parser is not quote-aware.

```bash
python3 perf/scripts/gen-data.py --accounts 720 --products 5
```

Verify: `awk -F, 'NF!=2' perf/data/accounts.csv` must print nothing.

### Products CSV (`perf/data/products.csv`)

Columns: `productId,productName,unitPrice,quantity`

Size to the number of distinct products in the SUT catalogue (5 for EShop).
`unitPrice` must be integer — `GET /api/products/:id` returns `price` as a
JSON number for odd ids and a string for even ids (oracle OR-3); the
`JSR223PreProcessor` that computes `orderTotal` must handle both:

```groovy
def price = vars.get("unitPrice")
def qty   = vars.get("quantity").toInteger()
def total = (price =~ /^\d+$/ ? price.toLong() : 0L) * qty
vars.put("orderTotal", total.toString())
```

---

## Step 4 — Wire extractors and assertions

### Extractor rules

| Extracted variable | Sampler | Extractor type | Pattern |
|---|---|---|---|
| `resetToken` | `POST /api/forgot-password` | `JSONPostProcessor` | `$.resetToken` |
| `token` (JWT) | `POST /api/login` | `JSONPostProcessor` | `$.token` |
| `orderId` | `POST /api/checkout` | `JSONPostProcessor` | `$.orderId` |
| `productId` | CSV Data Set | — | column from `products.csv` |

**Default-value trap:** every `JSONPostProcessor` must set
`Default Value = EXTRACTION_FAILED`. If the extractor silently returns
`${resetToken}` (the literal JMeter variable string), every downstream call
succeeds at the HTTP layer but sends a nonsense token — assertions pass, the
run looks clean, and the plan is wrong. Catching it:

```bash
grep -c "EXTRACTION_FAILED" perf/results/jtl/<run>.jtl
# must be 0 for a clean run
```

### Assertion rules

Every sampler must have at least:
1. **Response Assertion** — HTTP 200 (or the expected code); scope = Main
   Sample Only.
2. **JSONPath Assertion** on any token/id the plan later uses — test that the
   extracted value matches `\d+` or the appropriate pattern, so an empty
   extraction fails the sampler rather than propagating silently.

---

## Step 5 — Generate the .jmx

Copy `templates/journey.jmx.template` and substitute:

| Marker | Replace with |
|---|---|
| `{{STUDENT_ID}}` | `23127300` |
| `{{SCENARIO}}` | `Load` / `Stress` / `Spike` / `Endurance` |
| `{{RUNDATE}}` | `$(date +%Y%m%d)` — always the **real run date** |
| `{{VU_COUNT}}` | calibrated thread count |
| `{{RAMP_SECONDS}}` | calibrated ramp |
| `{{DURATION_SECONDS}}` | calibrated duration |
| `{{THINK_MIN_MS}}` / `{{THINK_MAX_MS}}` | think-time range from calibration |
| `{{LISTENER_CLASS}}` | `SummaryReport` / `StatVisualizer` / `ViewResultsFullVisualizer` |
| `{{LISTENER_GUICLASS}}` | matching guiclass string |

Output path: `perf/plans/jmeter/{{STUDENT_ID}}_{{SCENARIO}}_{{RUNDATE}}.jmx`

Validate before running:
```bash
python3 -c "import xml.etree.ElementTree as ET; ET.parse('perf/plans/jmeter/<file>.jmx'); print('XML valid')"
```

---

## Step 6 — Seed accounts

```bash
bash perf/scripts/sut.sh reset   # restarts SUT, wipes DB
bash perf/scripts/seed-accounts.sh
```

`seed-accounts.sh` exits nonzero if any account cannot log in after seeding.
A nonzero exit means the SUT or the CSV is broken — do not proceed to the run.

---

## Step 7 — Run headless

```bash
SCENARIO=Load  # or Stress / Spike / Endurance
bash perf/scripts/run-scenario.sh $SCENARIO
```

`run-scenario.sh` handles:
- `caffeinate -i` wrapper (machine must not sleep mid-run)
- `reset-lockout.sh` before and after
- JMeter `-n` headless invocation
- `monitor.sh` for CPU/RSS sampling
- analyser output and manifest row

Do **not** run scenarios without `run-scenario.sh` — the script is the
evidence-integrity boundary. A bare `jmeter -n` invocation produces no
manifest row and no resource CSV.

**caffeinate is mandatory.** If the machine sleeps mid-run the `.jtl` is
truncated and the run must be discarded.

---

## Step 8 — Collect

After each run, verify:
```bash
# Manifest row was written
tail -1 reports/run-manifest.md

# .jtl is non-empty and gzipped
python3 perf/scripts/analyze_jtl.py perf/results/jtl/<stem>.jtl.gz

# Resource CSV has data
wc -l perf/results/resource/<stem>.csv
```

Take the evidence screenshot immediately after the run ends — the Activity
Monitor window must show the SUT pid with a live %CPU value. Use
`record-mode.sh shot` after `record-mode.sh layout`.

---

## Step 9 — Analyse

Re-derive every metric from the raw `.jtl`. Never quote a number from a graph
that cannot be reproduced from the log:

```bash
gunzip -c perf/results/jtl/<stem>.jtl.gz > /tmp/x.jtl
python3 perf/scripts/analyze_jtl.py /tmp/x.jtl
```

The analyser prints per-label p50/p95/p99, error %, and throughput using
JMeter's own throughput formula (`max(ts + elapsed) - min(ts)`). If a
reported figure does not match the HTML dashboard within rounding, investigate
before including it in the report.

---

## Trap list (from HW05 experience)

| Trap | Symptom | Fix |
|---|---|---|
| Silent extractor default | Error % = 0.00 % but downstream samplers send literal `${token}` | Set `Default Value = EXTRACTION_FAILED` on every JSONPostProcessor |
| CSV cursor shared across threads | HTTP 400 on reset-password during Spike bursts — 100 % in burst windows, 0 % outside | Size accounts CSV to ≥ peak VU count; never reuse rows |
| Connection-reuse default | Port exhaustion at zero think-time; `BindException` in JMeter log | Set `httpclient.reset_state_on_thread_group_iteration=false` in `jmeter-run.properties` |
| Lockout masquerading as saturation | Spike: HTTP 403 on login samplers climbing with load | Run `reset-lockout.sh` before and after every run; check `locked_before` count |
| Machine sleep mid-run | Truncated `.jtl`, run timeline has a gap | Wrap every graded run with `caffeinate -i` |
| Date mismatch in filename | `run-scenario.sh` writes `RUNDATE=$(date +%Y%m%d)` at invocation; authoring on a different day produces a filename mismatch | Always run on the same calendar day as authoring, or set `RUNDATE` env var |
| Aggregate/summary statistic gating | AI analysis quotes p95 from the ALL-labels summary row and attributes it to one sampler | Always check per-label rows from `analyze_jtl.py`, not the `ALL` aggregate |
