# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D2 — Stress`
- JMX: `tests/returning-customer-order/test-cases/stress/23127464_Stress_20260813.jmx`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`
- Backend PID: `16488` (`node.exe`)

## Workload

- VU/thread stages: `10 → 20 → 40 → 60 → 80 VU`
- Ramp-up: mỗi nhóm thread ramp trong 1 giây tại T+0/T+60/T+120/T+180/T+240
- Duration: scheduler 300 giây; actual JTL span `301.119 giây`
- Think time: Uniform random `1–3 giây`, 6 timer/workflow
- Listener/report: `Aggregate Report`

## Execution time

- User command start: `2026-08-14 01:39:59 +07:00`
- JMeter actual start: `2026-08-14 01:40:19.912 +07:00`
- JMeter actual end: `2026-08-14 01:45:21.031 +07:00`
- User command end: `2026-08-14 01:45:22 +07:00`
- JMeter exit code: `0`
- Post-run guard: `POST_RUN_GUARD_OK SAMPLES=8370` theo transcript User cung cấp; dòng guard không được Tee vào `jmeter-console.log`
- HTML generation: `2026-08-14 01:46:29–01:46:33 +07:00`
- HTML generation exit code: `0`

## Reset and provisioning

- Reset/seed result: backend restart thành công; PID mới `16488`, HTTP 200 tại `/api/products`
- Accounts created: `80`
- Create failures: `0`
- Login with non-empty token: `80`
- Login failures: `0`
- Empty cart verified: `80`
- Empty order history verified: `80`

## Visual evidence

- Video path/link: [YouTube D2 Stress (1:26:00 - 1:48:36)](https://youtu.be/slTA5ErFCQ4?t=5160)
- Screenshot paths: `tests/returning-customer-order/evidence/stress/20260814-012626-user-executed/d2-stress-start-jmeter-backend-pid-16488.png`
- JMeter and correct backend PID/CPU/Memory in same frame: `PARTIAL — ảnh start có JMeter + Task Manager node.exe PID 16488 + CPU + Working set delta; không có RAM tuyệt đối hoặc Active threads`
- Vietnamese narration present: `Đã thực hiện trong clip`

## Observed console/resource behavior

- Target VU reached: `80`, xác nhận bằng raw JTL `max(allThreads)=80`
- Throughput shown in console: final console chỉ ghi parent summary `80 in 00:05:00 = 0.3/s`; không dùng làm HTTP throughput
- Console error observations: `0 (0.00%)` trong final summary; raw JTL cũng có 0 failure
- Backend CPU observations: `Không xác định trong measured interval — monitor đã dừng trước JMeter`
- Backend memory observations: `Không xác định trong measured interval — monitor đã dừng trước JMeter`
- Timeout/4xx/5xx/lockout/crash: không thấy trong JTL/JMeter log; visual observation chưa xác minh
- Other anomalies: resource monitor dừng lúc khoảng `01:39:44`, trước JMeter actual start `01:40:19.912`; 6 resource rows chỉ là pre-run baseline. Scheduler cutoff tạo 80 transaction rows chưa hoàn chỉnh ở cuối.

## Artifact confirmation

- Raw JTL: `result.jtl` — 1.399.756 byte, 8.370 rows
- JMeter log: `jmeter.log` — 1.101.081 byte
- Console log: `jmeter-console.log` — 2.240 byte
- HTML report: `html-report/index.html` — 9.669 byte
- Backend resource CSV: `backend-resource.csv` — 694 byte, 6 pre-run rows; không dùng cho measured CPU/RAM
- Backend PID evidence: `backend-pid.txt` — PID 16488, HTTP 200
- Provisioning evidence: `account-provisioning.txt` — 80/80 account và token, state sạch

User không tự đánh dấu run `VALID`. Agent phân tích complete same-run evidence; Human Review quyết định cuối.
