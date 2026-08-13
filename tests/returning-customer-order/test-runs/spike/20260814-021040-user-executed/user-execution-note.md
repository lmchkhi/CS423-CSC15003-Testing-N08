# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D3 — Spike`
- JMX: `tests/returning-customer-order/test-cases/spike/23127464_Spike_20260813.jmx`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `tests/returning-customer-order/test-runs/spike/20260814-021040-user-executed/`
- Backend PID: `15944`

## Workload

- VU/thread stages: baseline 5 VU → spike 50 VU → recovery 5 VU
- Ramp-up: baseline 0→5 trong 5 giây; T+60 thêm 45 trong 5 giây; T+125 giảm 45 trong 5 giây; cuối run 5→0
- Duration: JMeter actual khoảng `189,086 giây`
- Think time: 6 Uniform Random Timer, 1–3 giây
- Listener/report: View Results Tree; raw JTL và HTML là nguồn metric

## Execution time

- Start time: command `2026-08-14T02:23:17.9145009+07:00`; JMeter actual `02:23:20.131 +07:00`
- End time: JMeter actual `02:26:29.217 +07:00`; command `2026-08-14T02:26:30.8070195+07:00`
- Measured interval: command `192,893 giây`; actual JMeter `189,086 giây`
- JMeter exit code: `0`; `POST_RUN_GUARD_OK SAMPLES=2574`
- HTML generation time: `02:27:05–02:27:06 +07:00`, ngoài measured interval
- HTML generation exit code: `0`

## Reset and provisioning

- Reset/seed result: backend restart; PID mới 15944; HTTP 200 tại `/api/products`
- Accounts created: `50`
- Create failures: `0`
- Login with non-empty token: `50`
- Login failures: `0`; cart/orders rỗng `50/50`

## Visual evidence

- Video path/link: `Không xác định — User chưa cung cấp file/path video`
- Screenshot paths: `tests/returning-customer-order/evidence/spike/20260814-021040-user-executed/d3-spike-start-jmeter-backend-pid-15944.png`
- Milestones captured: start/PID attribution; không có ảnh spike/recovery/completion
- JMeter and correct backend PID/CPU/Memory in same frame: `PARTIAL — JMeter start + PID 15944 + CPU; memory chỉ là Working set delta`
- Vietnamese narration present: `Không xác định — ảnh tĩnh không xác minh âm thanh`

## Observed console/resource behavior

- Target VU reached: `50` theo raw JTL `max(allThreads)`; không có visual milestone peak
- Throughput shown in console: console summary chỉ tổng hợp 50 transaction cutoff; raw HTTP overall `11,794 req/s`, spike window `27,171 req/s`
- Console error observations: `Err 0 (0,00%)`; exit 0; guard OK
- Backend CPU observations: actual workload avg/max normalized `0,206% / 1,011%`; baseline/spike/recovery avg `0,047% / 0,465% / 0,052%`
- Backend memory observations: working set avg/max actual workload `59,610 / 85,098 MiB`; recovery avg `54,022 MiB`
- Timeout/4xx/5xx/lockout/crash: không thấy trong raw JTL/log; toàn bộ HTTP code 200
- Other anomalies: 50 transaction scheduler cutoff dự kiến; visual evidence thiếu spike/recovery/completion; Stop block chạy nhầm trước workload đã được guard chặn và không làm monitor dừng

## Artifact confirmation

- Raw JTL: `result.jtl`, 422.885 byte, 2.574 row
- JMeter log: `jmeter.log`, 348.024 byte
- Console log: `jmeter-console.log`, 3.034 byte
- HTML report: `html-report/index.html`, 9.669 byte
- Backend resource CSV/log: `backend-resource.csv`, 18.868 byte, 206 row; coverage OK
- Backend PID evidence: `backend-pid.txt`, PID 15944
- Provisioning evidence: `account-provisioning.txt`, 50/0/50/0 và cart/orders 50/50

Do not mark the run `VALID` here. The agent analyses the complete same-run evidence, then the user performs Human Review.
