# Endurance Test 2026-08-15

## Mục tiêu

Chạy sustained load trong 15 phút để xác định mức tải ổn định trên máy cá nhân và quan sát CPU/RAM có drift theo thời gian hay không.

## Cấu hình chạy

- Scenario: Endurance
- Plan: `testing-artifacts/hw05/plans/23127475_Endurance_20260815.jmx`
- JTL: `testing-artifacts/hw05/results/endurance/23127475_Endurance_20260815.jtl`
- JMeter log: `testing-artifacts/hw05/results/endurance/jmeter-endurance.log`
- HTML Dashboard: `testing-artifacts/hw05/html/endurance/index.html`
- Summary CSV: `testing-artifacts/hw05/analysis/endurance-summary.csv`
- Start: 2026-08-15 05:32:40 GMT+7
- End: 2026-08-15 05:47:40 GMT+7
- Threads/VUs: 50
- Ramp-up: 60s
- Duration: 900s
- Think time: 1500ms constant + random 1500ms

## Kết quả chính

- Samples: 3837
- Errors: 0
- Error rate: 0.00%
- Avg response time: 2.42 ms
- p50 response time: 2 ms
- p90 response time: 4 ms
- p95 response time: 4 ms
- p99 response time: 5 ms
- Max response time: 14 ms
- Throughput: 4.3127 RPS

## Resource evidence

- Start top snapshot: `testing-artifacts/hw05/evidence/hardware/top-endurance-start-20260815.txt`
- Mid-run top snapshot: `testing-artifacts/hw05/evidence/hardware/top-endurance-mid-20260815.txt`
- Late-run top snapshot: `testing-artifacts/hw05/evidence/hardware/top-endurance-late-20260815.txt`
- Post-run top snapshot: `testing-artifacts/hw05/evidence/hardware/top-endurance-postrun-20260815.txt`
- Process snapshot: `testing-artifacts/hw05/evidence/hardware/process-endurance-midrun-20260815.txt`

Resource snapshots:

- Start 05:32:55: CPU 7.86% user, 11.89% system, 80.24% idle; PhysMem 34G used, 1795M unused.
- Mid 05:38:00: CPU 18.65% user, 12.60% system, 68.73% idle; PhysMem 34G used, 1757M unused.
- Late 05:44:21: CPU 12.4% user, 13.43% system, 74.52% idle; PhysMem 34G used, 1482M unused.
- Post 05:47:58: CPU 8.55% user, 12.35% system, 79.8% idle; PhysMem 34G used, 914M unused.

## Kết luận ngưỡng ổn định

Mức tải 50 VUs với think time 1500ms + random 1500ms duy trì ổn định trong 15 phút: 0% error, p95 4 ms, p99 5 ms, throughput 4.3127 RPS và không quan sát thấy drift latency hoặc resource ceiling. Đây là mức tải ổn định cao nhất đã kiểm chứng bằng Endurance trong phạm vi HW05 hiện tại.
