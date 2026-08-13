# D1 Load — Execution Status

D1 Load đã được User thực thi trong run folder:

`tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`

File này không còn lặp lại toàn bộ lệnh/hướng dẫn thao tác sau khi execution đã hoàn tất. Bản runbook đúng tại thời điểm thực thi được giữ nguyên để truy vết tại:

`reports/returning-customer-order/D1_LOAD_COMMAND_PREPARATION_RERUN1.md`

## Kết quả hiện tại

- Executor: `User`
- Start/end: `2026-08-14 00:20:33–00:27:36 +07:00`
- JMeter exit code: `0`
- HTTP requests: `4,547`; failed: `0`; error rate: `0.00%`
- HTTP p95: `9 ms`; throughput: `10.951 req/s`
- Completed seven-step workflows: `640`; workflow p95: `14,295 ms`
- Backend PID: `15308`; process stayed alive throughout the measured command window
- Classification: `VALID WITH LIMITATION`
- Limitation chính: chỉ có screenshot cùng khung ở thời điểm completion, chưa có visual milestone trong measured interval và chưa có resource evidence của máy chạy JMeter

Phân tích đầy đủ và phương pháp tính:

`reports/returning-customer-order/D1_LOAD_RESULT_ANALYSIS.md`

## Gate

`D1 LOAD RESULT APPROVED — PHASE D2 AUTHORIZED`

User đã phê duyệt rõ kết quả D1 lúc `14/08/2026 00:59 +07:00` và authorize D2 Stress. Lượt phê duyệt này chưa chuẩn bị command/run folder D2 và không chạy measured workload.
