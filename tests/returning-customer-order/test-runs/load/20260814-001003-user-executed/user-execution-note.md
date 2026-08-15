# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D1 — Load`
- JMX: `tests/returning-customer-order/test-cases/load/23127464_Load_20260813.jmx`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`
- Backend PID: `15308` (`node.exe`); khởi động lúc `2026-08-14 00:19:30 +07:00`; HTTP 200 tại `/api/products`

## Workload

- VU/thread stages: `20 VU`
- Ramp-up: `60 giây`
- Hold duration: `360 giây`
- Think time: Uniform random `1–3 giây`, 6 timer/workflow
- Listener/report: `Summary Report`

## Execution time

- Start time: `2026-08-14 00:20:33 +07:00`
- End time: `2026-08-14 00:27:36 +07:00`
- Command elapsed time: `423 giây`
- Raw JTL observed span: `416,999 giây`
- JMeter exit code: `0`
- HTML generation time: `2026-08-14 00:30:02 +07:00`
- HTML generation exit code: `0`

## Reset and provisioning

- Reset/seed result: backend restart thành công; PID mới `15308`, HTTP 200 tại `/api/products`
- Accounts created: `20`
- Create failures: `0`
- Login with non-empty token: `20`
- Login failures: `0`
- Empty cart verified: `20`
- Empty order history verified: `20`

## Visual evidence

- Video path/link: [YouTube D1 Load (22:41 - 1:25:20)](https://youtu.be/slTA5ErFCQ4?t=1361)
- Screenshot paths: `tests/returning-customer-order/evidence/load/20260814-001003-user-executed/d1-load-completion-jmeter-backend-pid-15308.png`
- JMeter and correct backend PID/CPU/Memory in same frame: `YES — completion frame`; JMeter terminal hiện completion, exit code 0 và 5.207 samples; Task Manager hiện `node.exe` PID `15308`, CPU và `Working set delta`
- Vietnamese narration present: `Đã thực hiện trong clip`

## Observed console/resource behavior

- Target VU reached: `20`, xác nhận bằng raw JTL `max(allThreads)=20`
- Throughput shown in console: final console ghi `660 in 00:06:57 = 1.6/s`; không dùng làm HTTP throughput
- Console error observations: `Err: 0 (0,00%)` trong final summary; raw JTL cũng có 0 failure
- Backend CPU observations: avg `0,241%`, max `0,542%` — rất thấp, ổn định
- Backend memory observations: Working Set avg `55,4 MiB`, max `56,73 MiB`
- Timeout/4xx/5xx/lockout/crash: không thấy trong JTL/JMeter log
- Other anomalies: 20 transaction rows bị scheduler cutoff ở cuối run; không có anomaly khác

## Artifact confirmation

- Raw JTL: `result.jtl` — `5.207` rows (`4.547` HTTP + `660` transaction rows)
- E2E workflows hoàn chỉnh: `640`
- Failed JTL rows: `0`; toàn bộ HTTP/transaction response code 200
- JMeter log: có mặt; không có `ERROR` hoặc `FATAL`; 20 threads khởi động và kết thúc
- Console log: có mặt; exit code 0 và `Tidying up`/`end of run` bình thường
- HTML report: có mặt, sinh sau measured run
- Backend resource CSV: có mặt; PID `15308` hoạt động xuyên suốt
- Provisioning/PID evidence: có mặt

User không tự đánh dấu run `VALID`. Agent phân tích complete same-run evidence; Human Review quyết định cuối.
