# Calibration probe — 2026-08-14

HW05, Workflow 5 (Khôi phục tài khoản rồi mua hàng), student 23127300.
Method per `.superpowers/sdd/2026-08-13-hw05-performance-testing/task-12-brief.md`.

## Hardware and harness

- Apple M4 Pro, 12 cores, 24 GB RAM, macOS 26.5.2
- OpenJDK 21.0.10 (Homebrew), Apache JMeter 5.6.3
- JMeter and the SUT (`node server.js`) run **co-located on the same 12
  cores**. Every threshold below describes the JMeter+SUT pair on this
  machine, not the SUT in isolation. At 300 threads JMeter's own process
  peaked at 168.6 % CPU (>1.5 cores) — the harness itself is not free
  overhead at higher concurrency.
- Test plan: `perf/plans/jmeter/23127300_Load_20260814.jmx`, driven by
  `-Jload.threads` / `-Jload.ramp` / `-Jload.duration` JMeter properties,
  no plan edits between probes.
- SUT reset (`perf/scripts/sut.sh reset`) + `perf/scripts/seed-accounts.sh`
  (600/600 accounts verified) run once before the sweep. `accounts.csv` is
  600 rows, `CSVDataSet` sharing mode `shareMode.all`, `recycle=true`; the
  reset-password step always sets the password back to the CSV row's fixed
  `newPassword`, so the journey is idempotent per row and recycling a row
  mid-run does not by itself produce a wrong-password failure — write
  contention on the shared SQLite file is the only genuine risk from
  concurrent recycling, and none was observed as errors.
- `perf/scripts/reset-lockout.sh` run before every probe (reported
  `locked_before=0` before every one of the 5 sweep probes — no probe
  tripped the 2-failed-login lockout).

## Step 1 — Unloaded baseline (1 thread, 60 s)

```
label                                count  errors    err%      mean     p50     p90     p95     p99      max     req/s
--------------------------------------------------------------------------------------------------------------------------------
01 POST /api/forgot-password             5       0    0.00      10.6      10      17      17      17       17      0.09
02 POST /api/reset-password              4       0    0.00       7.5       7       8       8       8        8      0.10
03 POST /api/login                       4       0    0.00       7.5       7       9       9       9        9      0.10
04 GET /api/products                     4       0    0.00       3.8       3       5       5       5        5      0.10
05 GET /api/products/{id}                4       0    0.00       3.8       3       5       5       5        5      0.10
06 POST /api/cart                        4       0    0.00       6.0       5       9       9       9        9      0.10
07 POST /api/checkout                    4       0    0.00       7.5       7       9       9       9        9      0.10
--------------------------------------------------------------------------------------------------------------------------------
ALL                                     29       0    0.00       6.8       7      10      11      17       17      0.52
```

**Checkout p95 baseline = 9 ms.** Raw log: `perf/results/calibration/baseline.jtl`.

## Step 2 — Knee sweep (25 / 50 / 100 / 200 / 300 threads, 90 s each, 15 s ramp, `--skip-ramp 15`)

| Threads | Checkout p95 (ms) | Overall error % | SUT peak CPU % (1 core = 100%) | JMeter peak CPU % | Overall throughput (req/s) |
|---:|---:|---:|---:|---:|---:|
| 1 (baseline) | 9 | 0.00 | not monitored | not monitored | 0.52 |
| 25 | 9 | 0.00 | 10.2 | 111.2 | 12.28 |
| 50 | 8 | 0.00 | 14.0 | 53.6 | 24.97 |
| 100 | 8 | 0.00 | 20.7 | 130.6 | 49.50 |
| 200 | 7 | 0.00 | 30.1 | 75.3 | 100.08 |
| 300 | 8 | 0.00 | 41.5 | 168.6 | 148.94 |

Raw logs: `perf/results/calibration/cal-{25,50,100,200,300}.jtl`, resource
samples: `perf/results/calibration/cal-{25,50,100,200,300}.csv`. Full
per-label analyser output for every probe is reproducible with:

```bash
python3 perf/scripts/analyze_jtl.py perf/results/calibration/cal-<T>.jtl --skip-ramp 15
```

No probe stalled — every one of the 6 JMeter invocations (baseline + 5 sweep
steps) completed inside its wall-clock bound (baseline: 64 s of a 240 s
bound; each sweep step: 93-94 s of a 360 s bound). Hang rate observed: **0
of 6**. All were wrapped in a `caffeinate -i` + background-and-poll wall-clock
guard (no `gtimeout` on this machine) that verified it actually kills a
stalled child (tested against a deliberately hung `sleep 20` with a 5 s
deadline before the sweep: killed at 6 s, exit 124).

Throughput scales almost exactly linearly with thread count (~0.5 req/s per
thread at every step), and checkout p95 stays flat at 7-9 ms — statistically
indistinguishable from the unloaded baseline — all the way to 300 threads.
That linear throughput scaling is itself evidence the run stayed
arrival-rate-bound by the plan's 1-3 s Uniform Random Timer think time, not
capacity-bound by the SUT: the SUT's own CPU never broke 42 % of one core
even at 300 concurrent virtual users.

## Conclusions

**No knee, no error threshold, and no p95 threshold was crossed anywhere in
the swept range 25-300.** Error % was 0.00 and checkout p95 stayed within 2
ms of the single-thread baseline at every single step, including the top of
the range. This is the honest result, not an invented one: on this
12-core M4 Pro, with this workflow's 1-3 s think time and this SUT (Node.js
+ single SQLite file), 300 concurrent virtual users is still comfortably
idle hardware (peak SUT CPU 41.5 % of one core). The brief's three criteria
are applied below with that fact stated plainly rather than papered over.

### 1. Load thread count: **50 (unchanged from the Task 11 `.jmx` default)**

Criterion: highest concurrency with 0 % error and checkout p95 within ~2x
baseline. Taken completely literally, every tested point from 25 through
300 satisfies this — the criterion is degenerate here because no knee
exists in-range, so "highest tested value" would mechanically select 300,
which is also this sweep's Stress-equivalent peak. Picking that number for
Load would erase the distinction the four scenarios exist to draw (Load =
"is steady-state traffic healthy", Stress = "where does it break") and would
not itself be evidence of anything — it would just be the last number that
happened to be swept.

Falling back to the actual scope-ruling test — does 50 sit past the knee,
or so far below it that the run is trivially idle — the answer is no to
both: at 50 threads the SUT sustains ~25 req/s, spends 14 % of one core, and
every one of the 7 samplers runs at 0 % error. That is real, measurable,
non-trivial concurrent load against a workflow that mutates account state
(password reset) under genuine multi-thread write contention on the shared
SQLite file — not an idle no-op. **50 VU stands.** It satisfies the numeric
criteria, it is not trivially idle, and it preserves headroom below the
undiscovered knee for Stress and Spike to explore. The Load `.jmx`'s
`load.threads` default of 50 is left unchanged.

### 2. Stress ceiling: **not found within the swept range; Task 13's provisional peak of 300 (5 x 60) stands, documented as an evidence-safe ceiling rather than a measured breaking point**

Criterion: concurrency at which error % first exceeds 1 % or checkout p95
first exceeds 1000 ms. Neither was observed anywhere up to 300 threads (max
observed: 0.00 % error, 9 ms p95 — two orders of magnitude below the 1000 ms
bar). The true ceiling for this workflow+hardware pair lies above 300
threads, and this calibration does not know where.

I did not extend the sweep past 300 to go find it, for two concrete,
evidenced reasons rather than a guess:

- `accounts.csv` has 600 rows, sized (per spec §5.1) as roughly 2x the
  planned peak concurrency of ~320 (Stress 300 / Spike's 300-VU burst).
  Pushing raw thread count materially past 300 exceeds what the data model
  was sized for and risks two threads holding the same account row at the
  same instant — a data-exhaustion artifact that can produce failures which
  look like saturation but are not (this project's data model and CLAUDE.md
  explicitly flag this failure mode). Fixing that would mean regenerating a
  larger account CSV, which is out of this task's scope (Task 12 is
  calibration, not a data-model change).
- At 300 threads JMeter's own process already peaked at 168.6 % CPU on the
  same 12 cores as the SUT. Pushing concurrency materially higher risks the
  harness itself becoming the bottleneck, at which point an observed
  "ceiling" would describe JMeter-vs-SUT resource contention, not a genuine
  SUT limit — exactly the harness-plus-SUT caveat this record opens with.

Given that, inventing a specific higher number (e.g. "the ceiling is
probably around 500") would be exactly the kind of fabricated knee the task
brief warns against. The defensible, evidence-backed number is the highest
concurrency actually measured safe: **300**. Task 13's staircase already
tops out there (60 VU x 5 steps = 300 peak), so **no change to Task 13's
numbers is made**. What changes is the documentation: Task 13 and spec
§4.1/§4.2 are updated to state plainly that this peak is a
calibration-confirmed-safe ceiling, not a discovered breaking point, and
that the Stress run is expected to also show 0 % errors and flat latency
throughout — which is itself a valid, reportable finding about this SUT
under this hardware pairing, not evidence of a broken test design.

### 3. Spike burst size: **300 (unchanged from the provisional spec value)**

Criterion: burst >= 3x Load and >= the Stress ceiling. Load = 50, so 3x =
150. The evidence-safe Stress ceiling proxy from conclusion 2 is 300. A
burst of 300 clears both bars (300 >= 150 and 300 >= 300). Spike's
provisional burst size is left unchanged.

### Plan/spec changes made (Step 4)

No thread-count numbers changed in Tasks 13, 14, 15 or spec §4.2 — none of
the provisional values are contradicted by measurement; all sit inside the
range this calibration confirmed safe (0 % error, healthy latency). What
was edited:

- `docs/superpowers/plans/2026-08-13-hw05-performance-testing.md`: Task 13
  and Task 14 gained a short note pointing at this calibration file and
  stating the 300-peak is a confirmed-safe ceiling, not a discovered
  breaking point, so the Stress run is expected to show flat, healthy
  numbers throughout rather than a knee.
- `docs/superpowers/specs/2026-08-13-hw05-performance-testing-design.md`
  §4.1: the "provisional numbers" framing is replaced with the actual
  calibration result — checkout p95 never crossed 500 ms and error rate
  never crossed 1 % inside the tested 25-300 thread range, so those
  crossing points were not found, only bounded from below.

### Load `.jmx` change (VU-axis part)

**None.** `load.threads` default stays at 50 in
`perf/plans/jmeter/23127300_Load_20260814.jmx`, per the reasoning in
conclusion 1.

---

## Extension — the arrival-rate axis (2026-08-14, same day)

The VU sweep above measured an axis this SUT isn't bound by at the plan's
default 1-3 s think time: 7 samplers x ~2 s think = ~14 s/iteration = ~0.5
req/s/thread, so even 300 threads only bought ~149 req/s and 42 % of one
core. Arrival shape (think time) is a second, independent workload-model
variable (HW05 §6, spec §4.2) that raises per-thread request rate by 1-2
orders of magnitude without touching the constraints that bounded the VU
axis (CSV sizing, JMeter's own CPU use). This section sweeps it.

### Method

`UniformRandomTimer "Think time 1-3s"` in
`perf/plans/jmeter/23127300_Load_20260814.jmx` was parameterised:

```xml
<stringProp name="ConstantTimer.delay">${__P(think.delay,1000)}</stringProp>
<stringProp name="RandomTimer.range">${__P(think.range,2000.0)}</stringProp>
```

Defaults (`1000`, `2000.0`) are byte-identical to what was reviewed and
committed in `a1d85853`, so an unparameterised run of this plan is
unchanged. `RandomTimer.range` is parsed as a double by JMeter internally;
the default is written `2000.0`, not `2000`, so the rendered default string
matches the original literal exactly. Verified with two untracked smoke
runs (3 threads, 20 s): no `-Jthink.*` override reproduced the original
~0.5 req/s/thread shape (1.4 req/s at 3 threads); `-Jthink.delay=0
-Jthink.range=0` produced 3511 req/s from the same 3 threads with 0 %
errors, confirming the property actually reaches the timer.

Threads held at 50 (JMeter measured at only 53.6 % CPU at this count in the
VU sweep — comfortably not the harness bottleneck on its own). Same 90 s
probes, 15 s ramp, `--skip-ramp 15`, same wall-clock guard (`run_bounded.sh`,
360 s deadline) + `caffeinate -i`, `reset-lockout.sh` before each probe
(reported `locked_before=0` every time).

### Results

| think.delay/range | Checkout p95 (ms) | Overall error % | SUT peak CPU % | JMeter peak CPU % | Throughput (req/s) |
|---|---:|---:|---:|---:|---:|
| 1000/2000 (control, = plan default) | 8 | 0.00 | 13.7 | 54.2 | 25.34 |
| 300/400 | 8 | 0.00 | 38.4 | 52.8 | 98.39 |
| 100/200 | 7 | 0.00 | 51.0 | 117.8 | 239.88 |
| 0/0 | 7 | **7.76** | 126.5 | 259.5 | 3924.16 |

Raw logs: `perf/results/calibration/arr-{1000-2000,300-400,100-200}.jtl`
and `arr-0-0.jtl.gz` (compressed for repository size; gunzip before
analysing, see the "Files" list below) and matching `.csv` resource
samples. No probe stalled; all 4 completed inside their 360 s
wall-clock bound (93-94 s each).

The control (1000/2000) reproduces the original T=50 VU-sweep row almost
exactly (checkout p95 8 ms, throughput ~25 req/s, SUT CPU ~14 %),
confirming the parameterisation is behaviourally inert at its default.
300/400 and 100/200 both stay at **0.00 % error and checkout p95 flat at
7-8 ms** while throughput climbs to 98 and then 240 req/s and SUT CPU rises
to 38 % and 51 % of one core — real, gentle load growth, still no threshold
crossed.

**0/0 (zero think time) is where the numbers move — but not the way a
capacity ceiling would move them.** Overall error % jumps to 7.76 %,
mechanically crossing the brief's 1 % bar. Inspecting *why*, from the raw
`.jtl`'s `failureMessage` field:

```
Non HTTP response code: java.net.BindException
Non HTTP response message: Can't assign requested address
```

22689 of the 22837 steady-state errors (99.35 %) are this exact message —
the classic BSD/macOS symptom of local ephemeral-port exhaustion
(`net.inet.ip.portrange`: 49152-65535, ~16383 ports) when a process opens
far more short-lived outbound TCP connections than the OS can recycle out
of `TIME_WAIT` fast enough. At ~4000 req/s from 50 threads with zero think
time, JMeter's own HTTP client (keep-alive is already `true` on every
sampler in this plan) hit that wall. **This request never reached the SUT**
— it is a client-side socket-allocation failure, not an HTTP response, so
by the black-box rule it cannot be cited as SUT behaviour.

The remaining 148 errors (0.05 % of steady-state traffic) *are* genuine
SUT-returned responses: 19x `400` on `02 POST /api/reset-password`, 56x
`403` on `06 POST /api/cart`, 73x `403` on `07 POST /api/checkout` — still
two orders of magnitude under the 1 % bar. `07 POST /api/checkout`'s own
p95 stayed at 7 ms, unmoved from every other step and from the unloaded
baseline. One genuine, localised SUT-side signal did appear only at 0/0:
`01 POST /api/forgot-password`'s latency jumped to mean 53.7 ms / p95 64 ms
(every other sampler, including checkout, stayed at 4-9 ms p95) — a
specific slowdown on that one step under extreme concurrent arrival,
plausibly its own hashing/token-generation work queueing up, not general
SQLite write contention (checkout, the other write-heavy step, was
unaffected).

### Was this a genuine SUT capacity ceiling?

**No.** Neither of the brief's two trigger metrics — error % or checkout
p95 — was ever crossed by a genuine, SUT-returned signal across either
axis: not across 25-300 threads at the default think time, and not across
1000ms-down-to-0ms think time at a fixed, harness-safe 50 threads. The one
threshold crossing observed (0/0 think time's raw 7.76 % error) is
overwhelmingly a **test-harness artifact** — the JMeter HTTP client running
out of local ephemeral ports — not a SUT-side capacity failure. Per the
stop rule given for this sweep ("stop when you cross the criterion, or
reach zero think time, whichever comes first"), and because 0/0 did not
show a healthy SUT by the raw numbers, threads were not raised further
along this shape; the sweep stops here.

## Conclusions, restated as (concurrency, arrival shape) pairs

### 1. Load: **50 VU, 1-3 s think time (unchanged)** — confirmed on both axes

The fresh 1000/2000 control at 50 VU reproduces the original VU-sweep
result exactly (0 % error, 8 ms checkout p95, ~25 req/s). Reasoning from
the VU-axis section still holds: non-trivial, non-idle load, no knee
crossed, preserves separation from Stress. No change.

### 2. Stress ceiling: **no genuine SUT-driven ceiling exists inside the safely-measurable envelope of either axis — the true boundary discovered by this calibration is the test harness's own connection capacity, not the SUT's**

This is a more precise finding than a bare VU number, and it is the honest
one: pushed along the VU axis (up to 300 threads, default think time) or
along the arrival axis (down to 100/200 ms think at a fixed, harness-safe
50 threads), the SUT never showed >0.05 % genuine error or checkout p95
above 7-9 ms. The only threshold crossing found by this calibration, at 0/0
think time, is dominated by JMeter's own ephemeral-port exhaustion — a
property of the test harness on this OS, not of the SUT.

Recommendation for Task 13 (recorded in the plan doc): keep the existing
five-step, 60-VU staircase to a 300 peak (the evidence-safe VU-axis
boundary from the first half of this record) **and** additionally tighten
the think timer at the plan level from its 1-3 s default to **100/200 ms**
(`-Jthink.delay=100 -Jthink.range=200`) — the fastest arrival rate measured
clean at 0.00 % genuine error and 7 ms checkout p95 — so Stress pushes both
axes at once without walking into the known harness wall at 0/0. **Do not
set Stress's think time to 0/0**: at only 50 VU this already broke the test
harness before it revealed anything about the SUT; at Stress's 300-VU peak
it would be worse, and any resulting error spike would need to be triaged
for `BindException`/"Can't assign requested address" before being reported
as an SUT defect.

### 3. Spike burst: **300 VU (unchanged) — but flag a now-known risk in the existing zero-think-time burst design**

Spike's burst groups (Task 14 Step 3) are specified with their think timer
*removed entirely* — zero think time by design, at a 300-VU burst. This
calibration measured zero think time only at 50 VU, where it already
produced a 7.76 % raw error rate dominated by JMeter ephemeral-port
exhaustion (~4000 req/s from 50 threads exhausted the ~16383-port range
faster than `TIME_WAIT` could recycle it). At 300 VU with zero think time,
the same mechanism should be expected to be **worse**, not better — more
concurrent threads opening connections at once. This is inference from the
observed mechanism, not a direct measurement at 300 VU (not performed:
the coordinator's stop rule for this sweep did not authorise raising
threads once 0/0 at 50 VU showed the raw-number "unhealthy" result).

This matters for how Task 14's results get read: an error-rate spike during
the burst must be triaged by `failureMessage` (`BindException` / "Can't
assign requested address" = harness artifact; an actual HTTP status from
the SUT = genuine signal) before being reported as a SUT defect — exactly
the same discipline this project already applies to lockout-shaped 401s.
The burst thread count itself (300) is unchanged: it still clears both
required bars (>= 3x Load's 50, >= the Stress ceiling discussion above),
and removing the think timer for the burst groups is the correct design
for modelling "impatient arrivals" — this note only flags how the *results*
of that design should be read, not that the design is wrong.

## Files (arrival-axis extension)

- `perf/results/calibration/arr-1000-2000.{jtl,csv}` (control)
- `perf/results/calibration/arr-300-400.{jtl,csv}`
- `perf/results/calibration/arr-100-200.{jtl,csv}`
- `perf/results/calibration/arr-0-0.jtl.gz` + `arr-0-0.csv` (the `.jtl`
  is gzipped for repository size — 51 MB uncompressed. Reproduce any
  quoted figure with:
  `gunzip -k -c perf/results/calibration/arr-0-0.jtl.gz > /tmp/arr-0-0.jtl`
  then `python3 perf/scripts/analyze_jtl.py /tmp/arr-0-0.jtl --skip-ramp 15`)
- `perf/plans/jmeter/23127300_Load_20260814.jmx` — think timer parameterised
  (`think.delay`, `think.range`), defaults unchanged.
