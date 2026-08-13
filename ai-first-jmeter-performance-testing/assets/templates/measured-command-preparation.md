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

Document exact commands in this order: reset/seed, start backend, resolve/save PID, reachability check, provision/validate accounts and confirm output folder empty. These complete before measured time.

## Exact command for user to run

Agent prepares only. User starts this command after backend, Task Manager, resource monitor and recording are ready.

## Resource monitor command

- Start command:
- PID/output/interval:
- Stop command:
- Wait/flush confirmation:

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

## HTML generation command

Prefer generation after measured interval using the raw JTL and an empty HTML folder. If using `-e -o`, document how the workload interval will be separated from HTML-generation time.

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

## Risks / limitations

- Scheduler cutoff:
- Account-pool exhaustion/lockout:
- Cart/order state drift and payload growth:
- Listener/load-generator overhead:
- Mixed-run or missing visual evidence:
- Other:

## Current status

`D<n> <SCENARIO> COMMAND READY — PENDING USER EXECUTION`
