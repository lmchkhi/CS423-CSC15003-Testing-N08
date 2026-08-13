# Measured Command Preparation

## Scenario

- Phase/scenario:
- Executor: `User`
- JMX:
- CSV:
- Base URL:

## Preconditions

- [ ] Previous phase/result explicitly approved.
- [ ] Reviewed JMX/CSV/workload selected.
- [ ] Backend reset/seed procedure identified.
- [ ] Provisioning procedure identified.
- [ ] JMeter, Java, backend and monitor available.
- [ ] Every command below uses resolved real paths; no execution placeholder remains.
- [ ] If a required input is missing/empty, preparation is marked blocked and no runnable command is presented.

## Empty output folder prepared

- Run folder: `tests/returning-customer-order/test-runs/<scenario>/YYYYMMDD-HHMMSS-user-executed/`
- Empty verification time:
- Raw JTL:
- JMeter log:
- HTML folder (empty):
- Backend resource output:
- Backend PID evidence:
- Provisioning evidence:
- Monitor stop file:

## JMX / CSV

- XML parse:
- CSV row/unique-account validation:
- CSV sharing/recycle/stop behavior:
- Correlation/assertion validation:

## Workload

- Thread model/VU stages:
- Ramp-up:
- Duration:
- Think time:
- Listener/report:
- Expected scenario evidence stages:

## Sequential setup commands

### Terminal A — backend command

Provide the exact repository location and reviewed backend-start command. State that this terminal remains open throughout the run.

### Terminal B — create and verify fresh run folder

Provide complete PowerShell that sets scenario/timestamp/run paths, creates the run/empty HTML folders and fails if a result target already exists or is non-empty.

### Resolve and validate inputs

Provide complete PowerShell that resolves JMeter/JMX/CSV/support-script paths and stops on missing or empty input.

### Resolve backend PID and reachability

Provide exact commands to obtain the backend PID from the reviewed port/process, save `backend-pid.txt`, verify process identity and require HTTP 200.

### Reset/seed and provision

Provide exact reviewed commands and required success output. These complete before measured time and must not overlap the workload.

## Exact command for user to run

Provide a complete multiline PowerShell command using `Tee-Object` so console output remains visible and is also saved as `jmeter-console.log`. Capture `$startTime`, `$endTime` and `$LASTEXITCODE`. Agent prepares only; user starts it after backend, Task Manager, resource monitor and recording are ready.

Do not include `-e -o` unless the preparation documents how HTML-generation time is excluded from resource analysis.

## Resource monitor command

- Start command:
- PID/output/interval:
- Stop command:
- Wait/flush confirmation:

Provide actual start and stop PowerShell blocks. Stop only after JMeter completion and wait for monitor exit before checking the CSV.

## Terminal and screen layout

- Terminal A — backend kept running:
- Terminal B — execution/control and JMeter:
- Task Manager shows `node.exe`, correct PID, CPU and Memory:
- JMeter terminal and Task Manager visible in the same frame:
- Password/token/secret hidden:

## Parallel execution timeline

```text
backend -> Task Manager -> monitor -> recorder -> JMeter
JMeter completes -> record exit/time -> stop/wait monitor -> final frame -> stop recorder
```

## Console output tracking

Explain in the filled preparation:

- `summary +`: samples for the latest reporting interval;
- `summary =`: cumulative samples;
- rate such as `40.0/s`: observed throughput;
- `Avg/Min/Max`: response-time values, never p95;
- `Err`: failed samples and percentage;
- `Active/Started/Finished`: thread state.

List conditions the user must record: mass 401/lockout, connection refused, timeout surge, `OutOfMemoryError`, backend crash, early thread completion, failure to reach target VU or monitor failure. Console observations support analysis; raw JTL remains the metric source.

## HTML generation command

Provide the exact post-run `jmeter -g <actual-JTL> -o <actual-empty-HTML-folder>` command and capture its exit code. Prefer generation after measured interval. Do not leave placeholder paths in the filled preparation.

## Scenario evidence milestones

| Planned time/stage | Expected VU | JMeter output visible | Backend fields visible | Narration | Evidence marker/path |
| --- | ---: | --- | --- | --- | --- |
| | | | Correct PID, CPU, Memory | | |

## Visual evidence checklist

- [ ] Opening narration identifies student, scenario, JMX, run folder, base URL, workload, backend PID and `Executor: User`.
- [ ] JMeter/terminal and correct backend PID/CPU/Memory are in the same frame.
- [ ] Required Load/Stress/Spike/Endurance stages are captured.
- [ ] Exit/end state and newly created run artifacts are shown.
- [ ] Vietnamese narration describes stages and anomalies.
- [ ] No secret/token/password is visible.

## Expected artifacts after user execution

- [ ] Non-empty raw JTL.
- [ ] JMeter log.
- [ ] HTML report.
- [ ] Backend resource CSV/log.
- [ ] `backend-pid.txt`.
- [ ] Provisioning evidence.
- [ ] Screenshot/video path.
- [ ] User execution note with start/end, exit code and anomalies.

## Post-run artifact verification command

Provide complete PowerShell that reports existence and byte size for JTL, JMeter log, console log, resource CSV, PID evidence, provisioning evidence and `html-report/index.html`. Require non-empty JTL/resource evidence and record missing artifacts without fabricating them.

## User execution note

Copy [user-execution-note.md](user-execution-note.md) into the new run folder or provide its exact filled structure. The user fills actual time, exit codes, evidence paths and observations; the agent does not invent them.

## Evidence the user sends back to AI

State the exact run folder, visual-evidence path, exit code and anomaly note the user must provide. The agent may analyse saved artifacts after completion but cannot watch an independently opened user terminal or replace same-frame visual evidence.

## Risks / limitations

- Scheduler cutoff:
- Account-pool exhaustion/lockout:
- Cart/order state drift and payload growth:
- Listener/load-generator overhead:
- Mixed-run or missing visual evidence:
- Other:

## Current status

`D<n> <SCENARIO> COMMAND READY — PENDING USER EXECUTION`
