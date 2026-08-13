# User Execution Note

## Identity and scenario

- Executor: `User`
- Student: `23127464`
- Phase/scenario: `D1 — Load`
- JMX: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-cases\load\23127464_Load_20260813.jmx`
- CSV: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\data\returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `E:\Testing\CS423-CSC15003-Testing-N08\tests\returning-customer-order\test-runs\load\20260813-233819-user-executed`
- Backend PID: `Chưa chạy — User điền PID mới sau khi restart backend`

## Workload

- VU/thread stages: `20 VU`
- Ramp-up: `60 giây`
- Duration: `360 giây steady state sau ramp-up`
- Think time: `ngẫu nhiên 1–3 giây giữa các business step`
- Listener/report: `Summary Report; raw JTL là nguồn metric chính thức`

## Execution time

- Start time: `Chưa chạy — User điền thời gian thật`
- End time: `Chưa chạy — User điền thời gian thật`
- Measured interval: `Chưa chạy — User điền thời lượng thật`
- JMeter exit code: `Chưa chạy — User điền exit code thật`
- HTML generation time: `Chưa chạy — User điền thời gian thật sau measured interval`
- HTML generation exit code: `Chưa chạy — User điền exit code thật`

## Reset and provisioning

- Reset/seed result: `Chưa chạy — User ghi PID cũ/mới, HTTP 200 và seed log`
- Accounts created: `Chưa chạy — yêu cầu 20`
- Create failures: `Chưa chạy — yêu cầu 0`
- Login with non-empty token: `Chưa chạy — yêu cầu 20`
- Login failures: `Chưa chạy — yêu cầu 0`

## Visual evidence

- Video path/link: `Chưa chạy — User điền path/link thật`
- Screenshot paths: `Chưa chạy — User điền path thật nếu có`
- Milestones captured: `Chưa chạy — T+0, T+30s, T+60s, giữa steady state, completion`
- JMeter and correct backend PID/CPU/Memory in same frame: `NO — chưa chạy; User đổi thành YES chỉ khi evidence thật đạt`
- Vietnamese narration present: `NO — chưa chạy; User đổi thành YES chỉ khi evidence thật đạt`

## Observed console/resource behavior

- Target VU reached: `Chưa chạy — User ghi quan sát thật`
- Throughput shown in console: `Chưa chạy — User ghi rate thật, không gọi Avg là p95`
- Console error observations: `Chưa chạy — User ghi quan sát thật`
- Backend CPU observations: `Chưa chạy — User ghi CPU của đúng PID`
- Backend memory observations: `Chưa chạy — User ghi Memory của đúng PID`
- Timeout/4xx/5xx/lockout/crash: `Chưa chạy — User ghi quan sát thật`
- Other anomalies: `Chưa chạy — User ghi quan sát thật`

## Artifact confirmation

- Raw JTL: `Chưa chạy — result.jtl`
- JMeter log: `Chưa chạy — jmeter.log`
- Console log: `Chưa chạy — jmeter-console.log`
- HTML report: `Chưa chạy — html-report/index.html`
- Backend resource CSV/log: `Chưa chạy — backend-resource.csv`
- Backend PID evidence: `Chưa chạy — backend-pid.txt`
- Provisioning evidence: `Chưa chạy — account-provisioning.txt`

Do not mark the run `VALID` here. The agent analyses the complete same-run evidence, then the user performs Human Review.
