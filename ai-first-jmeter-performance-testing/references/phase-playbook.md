# Checkpoint Playbook

## Phase A — Verify and reconcile

Read the HW05 requirement, repo README, SUT README/API specification, existing JMeter files, reports and data. Inspect Java/JMeter availability, OS, CPU, cores, RAM, backend process and idle resources. Probe at most one user and one logical workflow; do not load test.

Verify reachability, payload, auth, correlation, search data, checkout feasibility, cart/account/order state, reset procedure and login lockout. Record source-derived facts separately from runtime observations.

Produce or update:

```text
reports/WF-02/REVIEW_NOTES.md
reports/WF-02/WORKFLOW_DESIGN.md
tests/WF-02/evidence/baseline/
tests/WF-02/evidence/hardware/
```

Use statuses `Khớp`, `Lệch`, `Không xác định`. End `PENDING HUMAN REVIEW`; do not design final workload profiles.

## Phase B — Design workload and data

Require explicit Phase A approval. Lock the seven-step flow, correlation, assertions and test-data policy for all graded scenarios. Design the workflow CSV, optional provisioning CSV, VU/account mapping, CSV sharing/recycle/stop behavior and reset strategy.

Propose Load/Stress/Spike values as `INITIAL_PROPOSAL`. Do not call them thresholds. Record that the assignment supplies no official business SLA unless the current requirement says otherwise. Design acceptance/assertion criteria and keep the endurance load undecided until Stress evidence exists.

Update `WORKFLOW_DESIGN.md`, `REVIEW_NOTES.md` and CSV files. End `PENDING HUMAN REVIEW`; do not create final JMX.

## Phase C — Generate JMeter and validate smoke

Require explicit Phase B approval. Generate `WF02-smoke.jmx` first with one thread and one iteration. Validate fixture rows, unique accounts when needed, positive quantity, useful keyword and shipping address. Run smoke only if SUT and JMeter are ready, logging exact command, timestamp, exit code, samples, assertion failures and corrections.

Verify token, product correlation, price normalization, total calculation, cart, checkout order ID and order lookup. Fix only harness defects (JSONPath, Groovy, request body/header, CSV, assertions, variables), not the SUT.

Generate the three dated graded plans only after a successful smoke. Confirm identical workflow/correlation/think time, distinct listeners and different workload models. If smoke cannot run, record `Chưa chạy — <real reason>` and do not claim success. End `PENDING HUMAN REVIEW`; do not run graded scenarios.

## Phase D1 — Load

Require explicit Phase C approval. Reset the SUT by the reviewed procedure, provision/validate accounts, prepare resource monitoring/recording and a new result folder, then sanity-check the plan. Run non-GUI and preserve raw JTL, HTML and resource evidence. Record exact configuration, command, exit code, start/end time and anomalies. Classify the run. End `LOAD RESULT PENDING HUMAN REVIEW`.

## Phase D2 — Stress

Require explicit D1 approval. Refine steps using the valid Load result. Observe throughput, average, median, p90/p95/p99, errors, CPU/RAM, timeout and 5xx. Find a degradation region rather than pre-declaring a thread threshold. If lockout, broken data or correlation invalidates the run, preserve and label it INVALID, reset/fix, then rerun. End `STRESS RESULT PENDING HUMAN REVIEW`.

## Phase D3 — Spike

Require explicit D2 approval. Select magnitude from Load/Stress evidence and measure baseline, spike and recovery separately: p95, throughput, errors, CPU/RAM and recovery time. Preserve JTL/HTML/resource evidence. End `SPIKE RESULT PENDING HUMAN REVIEW`.

## Phase D4 — Endurance

Require explicit D3 approval. Derive a sustained level from Stress evidence and run 10–15 minutes. Track VU, RPS, p95, error percentage, CPU and RAM over time. Do not label memory growth a leak until cart/order/response growth, account reuse and JVM/JMeter overhead are excluded. Draft an empirical threshold from actual observations. End `ENDURANCE RESULT PENDING HUMAN REVIEW`.

## Phase E — Analyse, challenge and report

Require approval of Phase D. Read raw JTL first, then HTML, execution logs and resource evidence. Produce:

```text
reports/WF-02/RESULT_ANALYSIS.md
reports/WF-02/AI_MISINTERPRETATION_HUNT.md
reports/WF-02/OPTIMIZATION_REVIEW.md
reports/WF-02/CONTINUOUS_PERFORMANCE.md
reports/ai-critique.md
reports/main-report.md
reports/test-summary.md
README.md updates
```

Group genuine issues by probable root cause; draft local reports only with real evidence and propose publishing rather than claiming a GitHub issue exists. Cite raw values for every AI correction. Use source inspection only to assess feasibility. End with a gap analysis and `PENDING HUMAN REVIEW`.
