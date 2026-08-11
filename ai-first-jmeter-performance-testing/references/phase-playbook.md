# Checkpoint Playbook

## Phase A — Verify and reconcile

### A1. Inspect requirement, repository and environment

Read:

- the current HW05 assignment requirement;
- repository `README.md`;
- SUT `README.md`;
- SUT API specification;
- existing JMeter configuration;
- existing WF-02 test artifacts, reports and data if they exist.

Legacy or template report content must not be treated as current HW05 runtime evidence.

`reports/main-report.md` and `reports/test-summary.md` may remain structural templates until Phase E.

During Phases A-D, only treat an artifact as current HW05 evidence when it is explicitly associated with WF-02 or the current execution.

Inspect the local environment before asking the user for information that can be verified directly.

Confirm:

- SUT path;
- backend base URL;
- Java availability and version;
- JMeter availability and version;
- operating system;
- CPU model;
- number of logical processors;
- total RAM;
- hostname;
- backend process;
- idle CPU usage;
- idle memory usage.

Do not perform Load, Stress, Spike or Endurance testing in Phase A.

### A2. Verify the WF-02 API contract

Verify the intended workflow against the actual SUT:

```text
POST /api/login
-> GET /api/products?search=${keyword}
-> GET /api/products/${productId}
-> GET /api/cart
-> POST /api/cart
-> POST /api/checkout
-> GET /api/orders/my-orders
```

For each endpoint, verify where possible:

- HTTP method;
- actual path and port;
- request payload/query parameters;
- authentication requirement;
- response status;
- response structure;
- dynamic values required by the next request.

Specifically verify that the following correlations are technically possible:

```text
login
-> token

search
-> productId
-> productName

product detail
-> detailPrice

detailPrice * quantity
-> totalAmount

checkout
-> orderId

my-orders
-> verify orderId
```

Do not treat the workflow contract as proof of runtime behavior.

Record separately:

1. assignment/API expectation;
2. source-code observation;
3. runtime observation.

### A3. Verify test-data and state risks

Inspect the SUT behavior that can affect performance-test validity.

Verify or explicitly mark unresolved:

- account sharing behavior;
- cart ownership/state;
- whether cart state persists across iterations;
- whether checkout clears the cart;
- order accumulation;
- login failed-attempt behavior;
- login lockout behavior;
- account reset procedure;
- SUT reset/restart procedure;
- deterministic starting state between scenarios.

Do not assume that assignment-described lockout behavior exactly matches the current implementation.

If the actual SUT differs from the assignment/API documentation, record:

```text
Expected/documented behavior
Observed implementation/runtime behavior
Performance-test impact
Required mitigation/reset strategy
```

Do not modify the SUT merely to make the planned performance test easier.

### A4. Minimal runtime probe

If the SUT, Java and JMeter/runtime tools are available, perform only a minimal functional probe.

Maximum scope:

```text
1 user
1 logical WF-02 workflow
```

The purpose is to establish:

- SUT reachability;
- valid authentication;
- usable test credentials;
- search data availability;
- product-detail availability;
- cart accessibility;
- checkout feasibility;
- order-history feasibility;
- correlation feasibility.

This is not a performance test.

Do not infer performance capacity, p95 threshold or stable RPS from the Phase A probe.

If the probe cannot be executed, record:

```text
Chưa chạy — <real reason>
```

instead of claiming success.

### A5. Hardware and environment baseline

Before workload design is approved, collect attributable hardware and environment evidence from the actual machine that will execute HW05.

Capture:

- hostname;
- operating system;
- CPU model;
- number of logical processors;
- total installed RAM;
- Java version;
- JMeter version;
- backend process name;
- backend process ID if available;
- backend idle CPU usage;
- backend idle memory usage;
- total system CPU usage at idle;
- total system memory usage at idle.

Use actual runtime evidence. Do not infer missing hardware values from documentation and do not fabricate values.

Capture a hardware report using an environment-appropriate tool.

Examples:

```text
Windows:
- dxdiag
- Task Manager
- System Information / msinfo32

Linux:
- screenfetch / fastfetch
- lscpu
- free
- htop

macOS:
- System Information
- Activity Monitor
- system_profiler
```

At minimum, preserve evidence showing:

```text
hostname
CPU
logical processors
RAM
OS
```

Store hardware screenshots under:

```text
tests/WF-02/evidence/hardware/
```

Suggested filenames:

```text
tests/WF-02/evidence/hardware/
├── hardware-system-info.png
├── hardware-cpu-memory.png
├── java-version.png
└── jmeter-version.png
```

Equivalent filenames are acceptable if the evidence is clear.

### A6. Backend idle-resource baseline

Start the SUT using the normal reviewed procedure.

Before sending performance workload:

1. allow the backend to reach an idle/stable state;
2. open Task Manager / htop / Activity Monitor;
3. identify the actual backend process;
4. observe baseline CPU and memory;
5. capture attributable evidence.

Record at least:

```text
Backend process:
PID:
Idle CPU:
Idle memory:
Observation time:
```

Store baseline evidence under:

```text
tests/WF-02/evidence/baseline/
```

Suggested evidence:

```text
tests/WF-02/evidence/baseline/
├── backend-idle-resource.png
└── environment-baseline.png
```

Do not use a resource screenshot from another run or another machine.

### A7. Create the hardware specification table

Add a structured hardware/environment section to:

```text
reports/WF-02/WORKFLOW_DESIGN.md
```

Use:

```markdown
## Hardware and Environment Baseline

| Item                | Observed Value | Evidence |
| ------------------- | -------------- | -------- |
| Hostname            |                |          |
| Operating System    |                |          |
| CPU                 |                |          |
| Logical Processors  |                |          |
| Total RAM           |                |          |
| Java Version        |                |          |
| JMeter Version      |                |          |
| Backend Process     |                |          |
| Backend PID         |                |          |
| Backend Idle CPU    |                |          |
| Backend Idle Memory |                |          |
| System Idle CPU     |                |          |
| System Idle Memory  |                |          |
| Observation Time    |                |          |
```

Every populated value must be traceable to runtime evidence or command output.

If a value cannot be determined, write:

```text
Không xác định — <reason>
```

Do not leave an unknown value looking as if it were accidentally omitted.

### A8. Reconciliation table

Update:

```text
reports/WF-02/REVIEW_NOTES.md
```

with a reconciliation table such as:

```markdown
| Item | Requirement / Expected | Actual Observation | Source Type | Status | Evidence | Impact / Action |
| ---- | ---------------------- | ------------------ | ----------- | ------ | -------- | --------------- |
```

Use only these statuses:

```text
Khớp
Lệch
Không xác định
```

Recommended `Source Type` values:

```text
Assignment
API specification
Source inspection
Runtime observation
```

Important differences affecting performance-test validity must not be silently corrected or omitted.

### A9. Phase A outputs

By the end of Phase A, produce or update:

```text
reports/WF-02/REVIEW_NOTES.md
reports/WF-02/WORKFLOW_DESIGN.md
tests/WF-02/evidence/hardware/
tests/WF-02/evidence/baseline/
```

Phase A must establish, or explicitly mark unresolved:

- WF-02 endpoint contract;
- authentication;
- dynamic correlation feasibility;
- account/cart/order state risks;
- reset strategy;
- SUT reachability;
- Java/JMeter availability;
- hardware specification;
- backend idle-resource baseline.

Phase A does not require:

- final Load parameters;
- final Stress parameters;
- final Spike parameters;
- endurance workload;
- performance threshold;
- graded JMX plans;
- graded JTL results.

### A10. Hard stop

Before ending Phase A, report:

```text
Files created/changed
Actions actually executed
Runtime evidence collected
Source-derived findings
Runtime findings
Khớp / Lệch / Không xác định items
Blockers
Risks for Phase B
```

Then set:

```text
PENDING HUMAN REVIEW
```

Do not design the final workload profiles.

Do not start Phase B until the user explicitly approves Phase A.

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
