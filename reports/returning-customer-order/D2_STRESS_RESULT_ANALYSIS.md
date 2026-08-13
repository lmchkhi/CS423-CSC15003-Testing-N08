# D2 Stress — Phân tích measured evidence

## Artifact nhận được

- Executor: `User`
- Scenario: `D2 — Stress`
- JMX: `tests/returning-customer-order/test-cases/stress/23127464_Stress_20260813.jmx`
- JMX SHA-256: `55C3A971DE7FF8DA8389A6A35541EA1A9EF5B853A39D22D80FCEF54591BB5A09`
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`
- Base URL: `http://127.0.0.1:3000`
- Run folder: `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`
- User command: `01:39:59–01:45:22 +07:00`; JMeter actual workload: `01:40:19.912–01:45:21.031 +07:00`
- JMeter exit code: `0`; User transcript có `POST_RUN_GUARD_OK SAMPLES=8370`
- Backend: `node.exe`, PID `16488`; HTTP 200 trước run
- Provision: 80 requested/created, 0 create failure, 80 token, 0 login failure; 80 cart và order history rỗng
- HTML generation: `01:46:29–01:46:33 +07:00`, exit code `0`, ngoài measured interval
- Visual evidence: User nói đã quay quy trình nhưng chưa cung cấp path/file/link; Agent chưa xem được video

## Run validity

- Decision: `VALID WITH LIMITATION`
- Reviewed plan matched: Có — staircase `10 → 20 → 40 → 60 → 80 VU`, 60 giây/bậc, scheduler 300 giây, think time 1–3 giây và Aggregate Report.
- Fresh output folder: Có bằng guard/preparation và timestamp artifact; không có dấu hiệu overwrite raw result.
- Expected labels/correlation/assertions: đủ 7 HTTP label và transaction label; toàn bộ JTL `success=true`, response code 200, failureMessage rỗng; JMeter log không có ERROR/OOM/main-controller/Test failed.
- Setup/HTML excluded: provisioning kết thúc `01:39:19`; JMeter actual start `01:40:19.912`; HTML bắt đầu `01:46:29` sau workload.
- Max concurrency: raw JTL đạt `allThreads=80`.
- Limitation nghiêm trọng nhưng có ranh giới: monitor bị dừng ở `01:39:44`, trước workload; 6 resource rows không đo Stress. Video chưa có path nên same-frame PID/CPU/Memory, narration và milestone chưa xác minh. Vì vậy run chỉ hỗ trợ kết luận JTL/request-level; không hỗ trợ backend CPU/RAM, breaking point theo tài nguyên hoặc capacity ổn định của phần cứng.
- Không có defect làm vô hiệu core JTL: không blanket 401/403, lockout, correlation failure, malformed request, backend unavailable, JMeter OOM hoặc zero sample.

## Raw JTL summary

- JTL rows: `8.370` = `7.293` HTTP requests + `1.077` E2E transaction rows.
- Completed seven-request workflows: `997`.
- Scheduler cutoff: `80` transaction rows có responseMessage rỗng, tương ứng workflow chưa hoàn chỉnh khi scheduler kết thúc; không tính vào completed-workflow latency.
- Failed HTTP/workflow: `0`; Error rate `0,00%`.
- Actual span dùng cho overall throughput: `301,119 giây`, từ JMeter actual start đến sample end cuối.
- Stage window neo theo timestamp JMeter log `1786646419912`: `[0,60)`, `[60,120)`, `[120,180)`, `[180,240)`, `[240,300)` giây.
- Percentile: linear interpolation trên elapsed values đã sort, cùng cách dùng trong phân tích D1; HTML/JMeter dùng để cross-check, có thể lệch phần thập phân do implementation/rounding.

## Overall metrics

| Metric | HTTP requests | Completed E2E workflows | Evidence/method |
| --- | ---: | ---: | --- |
| Samples | 7.293 | 997 | Raw JTL; loại transaction cutoff khỏi completed workflow |
| Failed | 0 | 0 | Raw JTL `success` |
| Error % | 0,00% | 0,00% | Raw JTL |
| Avg ms | 8,581 | 12.038,745 | Raw JTL |
| Median ms | 3 | 12.056 | Linear interpolation |
| p90 ms | 28 | 13.873 | Linear interpolation |
| p95 ms | 37 | 14.302,2 | Linear interpolation |
| p99 ms | 55,08 | 15.081,36 | Linear interpolation |
| Throughput | 24,220 req/s | 3,311 workflow/s | Count / 301,119 giây |
| Backend CPU avg/max | Không xác định | Không xác định | Resource monitor không chạy trong measured interval |
| Backend RAM avg/max | Không xác định | Không xác định | Resource monitor không chạy trong measured interval |

E2E time bao gồm 6 think timer ngẫu nhiên 1–3 giây, nên không được gọi là backend response time.

## Per-sampler metrics

| Sampler | Samples | Failed | Error % | Avg ms | Median | p90 | p95 | p99 | Throughput req/s |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| RCO-01-Login | 1.077 | 0 | 0,00% | 7,389 | 4 | 9 | 15,2 | 95,0 | 3,577 |
| RCO-02-Search | 1.071 | 0 | 0,00% | 4,679 | 2 | 9 | 21 | 39 | 3,557 |
| RCO-03-ProductDetail | 1.058 | 0 | 0,00% | 4,236 | 2 | 7 | 19 | 38 | 3,514 |
| RCO-04-GetCart | 1.043 | 0 | 0,00% | 3,073 | 3 | 4 | 6 | 11,58 | 3,464 |
| RCO-05-AddCart | 1.029 | 0 | 0,00% | 3,520 | 3 | 5 | 7 | 14 | 3,417 |
| RCO-06-Checkout | 1.018 | 0 | 0,00% | 31,383 | 30 | 46 | 54 | 73,83 | 3,381 |
| RCO-07-MyOrders | 997 | 0 | 0,00% | 6,374 | 4 | 11 | 24 | 52,08 | 3,311 |
| Completed E2E | 997 | 0 | 0,00% | 12.038,745 | 12.056 | 13.873 | 14.302,2 | 15.081,36 | 3,311 |

Checkout có HTTP p95 cao nhất (`54 ms`) nhưng không có error. Số sample giảm từ Login 1.077 xuống MyOrders 997 chính xác 80, phù hợp 80 workflow đang dở bị scheduler cutoff; không phải 80 functional failure.

## D2 stage analysis

Stage table dùng HTTP sample theo sample-start timestamp. CPU/RAM để `Không xác định`, không dùng 6 mẫu pre-run.

| Stage/time window | VU | HTTP samples | Failed | Error % | Throughput req/s | HTTP p95 ms | HTTP p99 ms | Completed workflow / p95 ms | CPU avg/max | RAM avg/max |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| T+0–<60s | 10 | 328 | 0 | 0,00% | 5,467 | 36 | 135 | 52 / 15.996,1 | Không xác định | Không xác định |
| T+60–<120s | 20 | 677 | 0 | 0,00% | 11,283 | 27,2 | 40 | 101 / 14.379 | Không xác định | Không xác định |
| T+120–<180s | 40 | 1.373 | 0 | 0,00% | 22,883 | 39 | 55,28 | 204 / 14.188,8 | Không xác định | Không xác định |
| T+180–<240s | 60 | 2.085 | 0 | 0,00% | 34,750 | 44 | 62,16 | 308 / 14.230 | Không xác định | Không xác định |
| T+240–<300s | 80 | 2.776 | 0 | 0,00% | 46,267 | 31 | 45 | 332 / 14.141,5 | Không xác định | Không xác định |

### Interpretation theo stage

- Throughput HTTP tăng gần tỷ lệ với VU: `5,467 → 11,283 → 22,883 → 34,750 → 46,267 req/s`; không thấy plateau trong 5 cửa sổ.
- Error rate giữ `0,00%` ở mọi stage; không có dấu hiệu breaking point dựa trên error.
- HTTP p95 dao động `27,2–44 ms` sau stage đầu, không tăng đơn điệu; p95 cao nhất ở 60 VU (`44 ms`) rồi giảm còn `31 ms` ở 80 VU. Raw JTL không chứng minh latency collapse ở peak.
- Workflow p95 ổn định quanh `14,1–14,4 giây` từ 20–80 VU và chủ yếu chứa think time. Stage đầu p95 `15.996,1 ms` cao hơn nhưng không tiếp tục tăng theo VU.
- Do thiếu resource evidence trong workload, không thể kết luận CPU/RAM còn headroom, không thể loại trừ load-generator bottleneck và không thể gọi 80 VU là stable hardware capacity.
- Không phát hiện breaking point trong phạm vi request/error metrics đến 80 VU. Câu này không đồng nghĩa “capacity ≥80 VU” hoặc ngưỡng endurance.

## HTML/statistics consistency

- HTML tồn tại và được generate sau measured interval.
- `statistics.json` per-sampler sample/error/Avg/Median/p90/p95 khớp raw JTL, cho phép sai số rounding/interpolation.
- HTML `Total=7.373`: 7.293 HTTP rows cộng 80 transaction cutoff rows; completed transaction parents không được cộng vào Total. Vì vậy báo cáo này dùng HTTP-only raw JTL cho request metrics và chỉ transaction đủ 7 child cho workflow metrics.
- Console `summary = 80 in 00:05:00`, Avg 5.842 ms là nhóm transaction cutoff được summariser ghi ở shutdown, không phải tổng HTTP sample và không phải p95.

## Resource evidence

- `backend-pid.txt`: PID `16488`, node.exe, HTTP 200.
- `backend-resource.csv`: 6 rows, `01:39:34.190–01:39:44.277`, interval 2 giây, PID 16488 sống.
- JMeter actual workload bắt đầu `01:40:19.912`; resource sample cuối sớm hơn khoảng 35,6 giây.
- Kết luận: CSV chỉ mô tả pre-run state (`CPU 0%`, working set `54,137 MiB`, private `66,141 MiB`) và tuyệt đối không dùng làm Stress CPU/RAM.
- Root cause từ transcript: User chạy block stop monitor ngay sau start block, trước measured command. Đây là operator-sequence/evidence defect, không phải SUT performance failure.

## Visual evidence

- User tuyên bố đã quay quy trình.
- Không có video/screenshot path trong run folder, evidence directory hoặc user note; Agent chưa xem file.
- Không xác định: cùng-frame JMeter + đúng PID/CPU/Memory, các milestone 10/20/40/60/80 VU, narration tiếng Việt và secret exposure.
- Video không thay thế resource CSV số hóa; nếu video được cung cấp, có thể bổ sung observation nhưng không tự tạo CPU/RAM time series.

## Failure classification và AI misinterpretation guard

- Resource monitor dừng sớm: `Evidence/operator-sequence limitation`, không phải backend crash.
- 80 cutoff transaction rows: scheduler cutoff đã dự kiến; không tính là 80 failed workflow vì `success=true`, nhưng cũng không tính là completed workflow.
- Console Avg `5.842 ms`: không phải HTTP Avg và không phải p95.
- Highest VU reached `80`: không phải stable threshold.
- CPU `0%`/RAM `54,137 MiB` trong CSV: pre-run only, không đại diện bậc 80 VU.
- Không có bằng chứng để gọi memory leak, database bottleneck hoặc load-generator saturation.

## Risks và giới hạn diễn giải

- Không có backend CPU/RAM measured interval và không có resource evidence load generator.
- Visual evidence chưa được cung cấp để kiểm tra.
- User note ban đầu chưa điền; Agent đã điền các trường xác định được từ artifact và để rõ trường chưa xác định.
- Cart/order history tăng trong từng account vì SUT không clear cart và orders tích lũy; stage sau có state/payload lớn hơn stage trước. Không thấy latency tăng tương ứng rõ ràng trong run này, nhưng confounder vẫn tồn tại.
- Stage chỉ dài 60 giây và 80 VU chỉ là peak ngắn; không dùng làm endurance threshold.

## Human Review recommendation

- Recommended decision: `Approved with corrections`
- Đề nghị chấp nhận classification `VALID WITH LIMITATION` cho JTL/request-level và giữ toàn bộ limitation khi dùng metric.
- Correction bắt buộc cho D3/D4: monitor phải chạy `monitor start → recorder → JMeter → monitor stop`; xác minh timestamp resource bao phủ workload trước khi phân tích.
- Nếu cần D2 đầy đủ CPU/RAM hoặc rubric bắt buộc resource evidence cho Stress, rerun bằng folder mới; không ghép resource/video từ run khác.
- User cần gửi exact video path/file/link và điền observation thật nếu muốn bổ sung visual validation cho chính run này.
- D3 gate đã được mở sau Human Review lúc `14/08/2026 01:59 +07:00`; các limitation vẫn bắt buộc đi kèm downstream analysis.

## Human Review decision

- [x] Approved
- [ ] Approved with corrections
- [ ] Rejected
- Reviewed artifact: báo cáo này và run `tests/returning-customer-order/test-runs/stress/20260814-012626-user-executed/`.
- Accepted classification: `VALID WITH LIMITATION`; chấp nhận request-level JTL metrics, giữ nguyên giới hạn resource monitor pre-run và visual evidence chưa xác minh.
- Exact approval: **“Approve D2 Stress result with documented limitations. Authorize D3 Spike preparation.”**
- Reviewer/date: User — `14/08/2026 01:59`, Asia/Ho_Chi_Minh.
- Next phase authorized: `D3 — Spike`, chỉ bắt đầu bằng interaction PRECHECK / COMMAND PREPARATION riêng.
- Interaction approval này không tạo folder/command D3 và không chạy Spike.

## Current status

`D2 STRESS RESULT APPROVED — PHASE D3 AUTHORIZED`
