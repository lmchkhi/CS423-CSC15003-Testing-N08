# D1 Load — Measured Evidence Analysis

## Artifact received

- Executor: `User`
- Scenario: `D1 — Load`
- JMX: `tests/returning-customer-order/test-cases/load/23127464_Load_20260813.jmx`
- JMX SHA-256: `1C52367FC08532D92DD0C6A5F9561AA69A81BACB3E9B5C3932EDDC97CEA3D5D5`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Exact run folder: `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`
- Start/end: `2026-08-14 00:20:33–00:27:36 +07:00`
- JMeter exit code: `0`
- Backend PID: `15308` (`node.exe`), HTTP 200 before the run
- Provisioning: 20 requested/created, 0 create failure, 20 non-empty login tokens, 0 login failure; 20 empty carts and order histories verified

## Run validity

- Decision: `VALID WITH LIMITATION`
- Reviewed plan matched: Yes — 20 VU, ramp-up 60 seconds, hold 360 seconds, randomized 1–3 second think time and Summary Report.
- Fresh output folder: Yes according to the preparation guard and same-run artifact timestamps; no overwrite indication was found.
- Expected labels/correlation/assertions: all seven HTTP labels and the E2E transaction label exist; all 5,207 JTL rows have `success=true` and HTTP/transaction response code 200.
- Same-run coherence: JTL, JMeter/console logs, HTML, resource CSV, PID and provisioning files use the same folder and consistent time window.
- Setup/HTML excluded: provisioning ended at `00:19:58`, measured run started at `00:20:33`, and HTML generation began at `00:30:02` after JMeter ended.
- Limitations: one completion screenshot was supplied after the measured interval; it does not cover ramp-up or steady state and its Task Manager memory column is `Working set delta`, not absolute working set. No load-generator CPU/RAM evidence exists. Therefore the result supports JTL/backend-process findings but not a claim that the load generator was definitely not a bottleneck.

## Raw JTL summary

- JTL rows: `5,207` = `4,547` HTTP requests + `660` E2E transaction-controller rows.
- Completed workflows: `640`; each has seven child requests and zero failing child requests.
- Scheduler cutoff rows: `20` E2E rows have no child-count message and are excluded from completed-workflow latency metrics.
- HTTP failures: `0 / 4,547` (`0.00%`); all HTTP response codes are 200.
- Raw JTL span: `416.999 seconds`; HTTP request span: `415.207 seconds`.
- Percentiles below use linear interpolation over sorted raw JTL elapsed values. HTML/JMeter percentile values are used as a cross-check.

## Metrics

| Metric | HTTP requests | Completed E2E workflows | Evidence/method |
| --- | ---: | ---: | --- |
| Samples | 4,547 | 640 | Raw JTL; empty cutoff transaction rows excluded |
| Failed | 0 | 0 | Raw JTL `success` |
| Error % | 0.00% | 0.00% | Raw JTL |
| Avg ms | 3.448 | 11,954.092 | Raw JTL |
| Median ms | 3 | 11,922.5 | Raw JTL, linear interpolation |
| p90 ms | 7 | 13,831.3 | Raw JTL, linear interpolation |
| p95 ms | 9 | 14,295 | Raw JTL, linear interpolation |
| p99 ms | 13 | 15,373.58 | Raw JTL, linear interpolation |
| Throughput | 10.951 req/s | 1.535 workflow/s | Count divided by each set's observed span |
| Backend CPU avg/max | 0.163% / 0.542% | same measured window | `backend-resource.csv`, normalized across 20 logical processors |
| Backend working set avg/max | 54.416 / 56.730 MiB | same measured window | `backend-resource.csv` |
| Backend private memory avg/max | 63.993 / 67.371 MiB | same measured window | `backend-resource.csv` |

## Per-sampler result

| Sampler | Samples | Failed | Error % | Avg ms | Median | p90 | p95 | p99 | Throughput req/s |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| RCO-01-Login | 660 | 0 | 0.00% | 3.936 | 3 | 6 | 7 | 9 | 1.590 |
| RCO-02-Search | 655 | 0 | 0.00% | 1.982 | 2 | 3 | 4 | 5 | 1.589 |
| RCO-03-ProductDetail | 652 | 0 | 0.00% | 1.956 | 2 | 3 | 4 | 6 | 1.588 |
| RCO-04-GetCart | 649 | 0 | 0.00% | 2.458 | 2 | 4 | 5 | 6 | 1.594 |
| RCO-05-AddCart | 646 | 0 | 0.00% | 2.723 | 2 | 4 | 5 | 6.55 | 1.594 |
| RCO-06-Checkout | 645 | 0 | 0.00% | 7.919 | 7 | 12 | 14 | 20.56 | 1.591 |
| RCO-07-MyOrders | 640 | 0 | 0.00% | 3.197 | 3 | 5 | 6 | 9 | 1.587 |
| Completed E2E workflow | 640 | 0 | 0.00% | 11,954.092 | 11,922.5 | 13,831.3 | 14,295 | 15,373.58 | 1.535 |

The E2E time includes six randomized 1–3 second think timers, so it must not be interpreted as backend response time. Checkout has the highest HTTP p95 (`14 ms`) among the seven endpoints in this run.

## HTML/statistics consistency

- HTML per-sampler sample/error/average/median/p90/p95 values agree with raw JTL, allowing for rounding.
- HTML `Total` reports 4,567 samples: 4,547 HTTP rows plus 20 empty scheduler-cutoff transaction rows. This report therefore uses HTTP-only raw JTL for overall request metrics and completed seven-child transactions for workflow metrics.
- Console final `20` is the summariser's parent transaction count at shutdown, not the raw request/sample total; it is not used as the official sample count.

## Resource and stage evidence

- Resource samples inside the measured command window: `210`, at approximately two-second intervals.
- PID set: only `15308`; `ProcessAlive=True` for every in-window sample.
- Working set changed from `47.316 MiB` at the first in-window sample to `56.375 MiB` at the last; this single short run is insufficient to claim a memory leak.
- JMeter log shows threads starting from `00:20:38` to `00:21:35`, consistent with the reviewed 60-second ramp-up, and all 20 threads finishing around `00:27:33–00:27:35`.
- JTL records `allThreads=20`, supporting that the target concurrency was reached. The supplied screenshot confirms the completion frame only; visual ramp-up and steady-state milestones were not supplied.
- No JMeter `ERROR`/`FATAL`, 4xx/5xx, timeout, assertion failure or backend-process death was found.

## Visual evidence

- File: `tests/returning-customer-order/evidence/load/20260814-001003-user-executed/d1-load-completion-jmeter-backend-pid-15308.png`
- The same frame shows the completed JMeter terminal and Task Manager filtered to `node.exe`, PID `15308`, CPU and a memory-related column.
- JMeter terminal shows the reviewed Load JMX, normal `Tidying up`/`end of run`, start/end times, exit code 0 and `POST_RUN_GUARD_OK SAMPLES=5207`.
- The screenshot was captured around `00:42`, after the `00:27:36` run end. It is valid completion/PID attribution evidence, not measured-interval CPU/RAM or stage evidence.
- Task Manager displays `Working set delta (memory)` as `0 K`; this must not be reported as the backend's absolute memory usage. Absolute working-set metrics continue to come from `backend-resource.csv`.
- No visible password, token or secret was found.

## Interpretation limitations

- Missing: measured-interval ramp-up/steady-state visual milestones, Vietnamese narration evidence, absolute Task Manager memory in the frame and load-generator resource metrics.
- Unsupported conclusions intentionally withheld: maximum SUT capacity, production SLA compliance, absence of load-generator bottleneck, database bottleneck and memory leak.
- This D1 run demonstrates the observed behavior of this workload on this local environment; it does not establish a universal threshold.

## Human Review recommendation

- Recommended decision: `Approved with corrections`
- Correction: accept the D1 JTL/backend metrics and completion screenshot with the limitations above. If the assignment requires measured-interval stage/video evidence, rerun D1 in a new folder with a complete same-run evidence set; do not merge evidence from another run.
- Next phase remains blocked until explicit D1 approval: `No — approval received at 14/08/2026 00:59 +07:00`

## Human Review decision

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected
- Reviewed artifact: this analysis and run `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`
- Accepted classification: `VALID WITH LIMITATION`; the documented visual/load-generator limitations remain attached to every downstream use of this result.
- Exact approval: **“Approve D1 Load result. Authorize D2 Stress.”**
- Reviewer/date: User — `14/08/2026 00:59`, Asia/Ho_Chi_Minh
- Next phase authorized: `D2 — Stress`, beginning with a separate PREPARE ONLY interaction.

## Current status

`D1 LOAD RESULT APPROVED — PHASE D2 AUTHORIZED`
