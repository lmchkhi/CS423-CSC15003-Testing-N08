# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D4 — Endurance`
- JMX: `tests/returning-customer-order/test-cases/endurance/23127464_Endurance_20260814.jmx`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `tests/returning-customer-order/test-runs/endurance/20260814-024700-user-executed/`
- Backend PID: `18048`

## Workload

- VU/thread stages: 20 VU sustained
- Ramp-up: 30 giây
- Duration: 1800 giây (30 phút)
- Think time: random 1–3 giây (6 timer)
- Listener/report: Response Time Graph

## Execution time

- Start time: `2026-08-14T03:01:20.2841052+07:00`
- End time: `2026-08-14T03:31:23.5243929+07:00`
- Measured interval: `1803,2 giây`
- JMeter exit code: `0`
- HTML generation time: sau measured interval
- HTML generation exit code: `0`

## Reset and provisioning

- Reset/seed result: `Connected to database`, `Database initialized and seeded (Phase 2).`, `Server is running on http://localhost:3000` — backend restart thành công, DB drop/reseed.
- Accounts created: `20`
- Create failures: `0`
- Login with non-empty token: `20`
- Login failures: `0`
- Empty cart verified: `20`
- Empty order history verified: `20`
- Provisioning gate: `PROVISIONING_OK`

## Visual evidence

- Video path/link: [YouTube D4 Endurance (2:09:30 - 3:03:17)](https://youtu.be/slTA5ErFCQ4?t=7770)
- Screenshot paths: `tests/returning-customer-order/evidence/endurance/20260814-024700-user-executed/d4-endurance-start-jmeter-backend-pid-18048.png`
- Milestones captured: chỉ start (JMeter + Task Manager + PID 18048 cùng frame)
- JMeter and correct backend PID/CPU/Memory in same frame: `YES`
- Vietnamese narration present: `Đã thực hiện trong clip`

## Observed console/resource behavior

- Target VU reached: `YES` — peak `allThreads=20`
- Throughput shown in console: `summary = 20 in 00:30:00 = 0.0/s Avg: 5380 Min: 7 Max: 13673 Err: 0 (0.00%)` (20 là scheduler-cutoff transaction, không phải HTTP total)
- Console error observations: `Err: 0 (0.00%)` — không có error
- Backend CPU observations: avg `0,172%`, max `0,452%` — rất thấp, ổn định
- Backend memory observations: Working Set avg `59,7 MiB`, max `61,6 MiB` — tăng nhẹ +4,7 MiB/30 phút, tốc độ giảm dần
- Timeout/4xx/5xx/lockout/crash: không có
- Other anomalies: Heartbeat job (Start-Job) không ghi được vào console log (0 entries) do Tee-Object pipe interaction; monitor vẫn liên tục (387 row, max gap 5s).

## Endurance-specific observations

- Memory trend across milestones (T+2, T+5, T+10, T+15, T+30): WS avg per 5-min bucket: `56,5 → 59,3 → 59,9 → 60,4 → 60,8 → 61,2 MiB`; tốc độ tăng giảm dần, ổn định sau T+10.
- Response time trend across milestones: HTTP avg `8,6 → 8,3 → 8,1 → 7,4 → 7,6 → 7,7 ms` — giảm nhẹ / ổn định, không degradation.
- CPU stability across milestones: CPU avg `0,19 → 0,18 → 0,17 → 0,16 → 0,17 → 0,15%` — ổn định, giảm nhẹ.
- Backend crash during run: `NO`
- Machine sleep/hibernate during run: `NO`

## Artifact confirmation

- Raw JTL: `PRESENT`, 3.706.909 bytes, 23.655 rows (20.690 HTTP + 2.965 E2E)
- JMeter log: `PRESENT`, 3.078.554 bytes
- Console log: `PRESENT`, 2.732 bytes, có start/end/exit 0/POST_RUN_GUARD_OK
- HTML report: `PRESENT`, `html-report/index.html` 9.669 bytes
- Backend resource CSV/log: `PRESENT`, 36.259 bytes, 387 rows, max gap 5s, `RESOURCE_COVERAGE_OK`
- Backend PID evidence: `PRESENT`, 175 bytes, PID `18048`
- Provisioning evidence: `PRESENT`, 373 bytes, 20/0/20/0

## Guard và coverage

- Monitor gate: `MONITOR_GATE_OK SAMPLES=3 AGE_SECONDS=0.767`
- Monitor/start alignment: `3,528 giây` (< 5s threshold)
- Post-run guard: `POST_RUN_GUARD_OK SAMPLES=23655 DURATION=1803.2s`
- Resource coverage: first `03:00:46.614` ≤ start `03:01:20.284`, last `03:33:02.932` ≥ end `03:31:23.524`; 387 rows ≥ 360 expected; max gap `5s` ≤ 15s; `RESOURCE_COVERAGE_OK`

Do not mark the run `VALID` here. The agent analyses the complete same-run evidence, then the user performs Human Review.
