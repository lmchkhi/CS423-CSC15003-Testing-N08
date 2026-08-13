# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D1 — Load`
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx`
- CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260814-001003-user-executed`
- Backend PID: `15308` (`node.exe`); process started `2026-08-14 00:19:30 +07:00`; reachability check returned HTTP 200

## Workload

- VU/thread stages: `20 VU`
- Ramp-up: `60 seconds`
- Hold duration: `360 seconds`
- Think time: randomized `1–3 seconds` between business steps
- Listener/report: Summary Report; raw JTL is the official metric source

## Execution time

- Start time: `2026-08-14 00:20:33 +07:00`
- End time: `2026-08-14 00:27:36 +07:00`
- Command elapsed time: `423 seconds`
- Raw JTL observed span: `416.999 seconds`
- JMeter exit code: `0`
- HTML generation time: `2026-08-14 00:30:02 +07:00`
- HTML generation exit code: `0`

## Reset and provisioning

- Old backend PID: `NONE`; a new backend process was started before provisioning
- Accounts requested/created: `20 / 20`
- Create failures: `0`
- Unique emails: `20`
- Login with non-empty token: `20`
- Login failures: `0`
- Empty cart/order history verified: `20 / 20`

## Observed artifacts

- Raw JTL: present, `5,207` rows (`4,547` HTTP + `660` transaction rows)
- Completed seven-step E2E workflows: `640`
- Failed JTL rows: `0`; HTTP/transaction response code 200 for every row
- JMeter log: present; no `ERROR` or `FATAL`; 20 threads started and finished
- Console log: present; exit code 0 and normal `Tidying up`/`end of run`
- HTML report: present and generated after the measured run
- Backend resource CSV: present; PID `15308` stayed alive throughout the command window
- Provisioning/PID evidence: present

## Visual evidence and user-only observations

- Video path/link: `Not provided`
- Screenshot path: `tests/returning-customer-order/evidence/load/20260814-001003-user-executed/d1-load-completion-jmeter-backend-pid-15308.png`
- Milestones captured visually: `Completion only`; ramp-up and steady-state screenshots were not supplied
- JMeter and correct backend PID/CPU/Memory in the same frame: `YES — completion frame`; JMeter terminal shows normal completion, exit code 0 and 5,207 samples, while Task Manager shows `node.exe`, PID `15308`, CPU and the `Working set delta (memory)` column
- Vietnamese narration present: `Determined in clip`
- Timeout/4xx/5xx/lockout/crash observed by user: `No time out scenarios; raw JTL/log contains no such failure`
- Other user-observed anomalies: `None and no visual evidence supplied; no other anomalies reported`

This note was completed from same-run files after execution. It does not invent missing visual/user observations and does not itself decide run validity. See `reports/returning-customer-order/D1_LOAD_RESULT_ANALYSIS.md` for the evidence decision and metrics.
