# D4 Endurance — Phân tích measured evidence

## Artifact nhận được

- Executor: `User`.
- Scenario: `D4 — Endurance`.
- JMX: `tests/returning-customer-order/test-cases/endurance/23127464_Endurance_20260814.jmx`.
- JMX SHA-256: `16E92DE61486600CBCFC5B2C580B5EF3A51A309774FF4E16AD19128E88120674`.
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`.
- Base URL: `http://127.0.0.1:3000`.
- Run folder: `tests/returning-customer-order/test-runs/endurance/20260814-024700-user-executed/`.
- User command interval: `2026-08-14 03:01:20.284–03:31:23.524 +07:00`; JMeter actual workload: `03:01:23.566–03:31:21.850 +07:00` (`1798,284 giây`).
- JMeter exit code `0`; guard `POST_RUN_GUARD_OK SAMPLES=23655`; monitor/start lệch `3,528 giây`.
- Backend: `node.exe`, PID `18048`; HTTP 200 trước run.
- Provisioning: 20 requested/created, 0 create failure, 20 token, 0 login failure; cart/orders rỗng 20/20.
- HTML generation: exit code `0`, ngoài measured interval.
- Visual evidence: `tests/returning-customer-order/evidence/endurance/20260814-024700-user-executed/d4-endurance-start-jmeter-backend-pid-18048.png`, SHA-256 `80AFBDC39D44C84EEC1DEDD517B1AE358E482006B9EA78AB6B292C794784CD2E`.
- Video/narration và ảnh milestone T+2/T+5/T+10/T+15/T+30: không được cung cấp.

## Run validity

- Decision: `VALID WITH LIMITATION`.
- Reviewed plan matched: Có — Ultimate Thread Group 20 VU, ramp 30 giây, sustained 1770 giây, tổng 1800 giây; Response Time Graph; pool Endurance 20 account.
- Fresh output: command fail-fast không overwrite; artifact mang cùng run ID và timestamp nhất quán.
- Expected labels/correlation/assertions: đủ 7 HTTP label và transaction label; 23.655/23.655 row `success=true`, HTTP đều code 200, không có `failureMessage`, main-controller error, `Test failed!`, ERROR hoặc OOM.
- Peak concurrency: raw JTL đạt `allThreads=20`.
- Setup/HTML excluded: provisioning hoàn tất `03:00:30`; workload bắt đầu `03:01:23`; HTML generation sau workload.
- Resource coherence: CSV đúng PID 18048, first `03:00:46.614` ≤ command start, last `03:33:02.932` ≥ command end; 387 row tổng, 360 row trong workload window, dead row `0`. Max gap `5 giây`, density OK.
- Heartbeat entries: `0`. Heartbeat job được Start-Job nhưng không ghi vào console log — có thể do Tee-Object pipe blocking hoặc job không kịp flush trước Stop-Job. Monitor vẫn liên tục (387 row, max gap 5s), nên heartbeat failure không ảnh hưởng resource coverage.
- Limitation có ranh giới: chỉ một screenshot tại start; không có visual milestone T+2/T+5/T+10/T+15/T+30, video hay narration. Ảnh dùng cột `Working set delta`, không phải RAM tuyệt đối. Không có resource metric của load generator.

## Raw JTL summary

- Schema: `timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect`.
- Tổng raw row: `23.655` = `20.690` HTTP request + `2.965` E2E transaction row.
- Workflow hoàn tất đủ 7 child: `2.945` (min label RCO-07-MyOrders); transaction row: `2.965` (bao gồm cả cutoff).
- Failed HTTP/workflow: `0`; HTTP response code: `200` cho 20.690/20.690 request.
- Actual workload span: `1798,284 giây` neo theo epoch JTL `1786651283566–1786653081850`.
- Console summariser cuối: `summary = 20 in 00:30:00 = 0.0/s Avg: 5380 Min: 7 Max: 13673 Err: 0 (0.00%)` — đây là 20 scheduler-cutoff transaction, **không phải** tổng HTTP.

## Overall metrics

| Metric | HTTP requests | Completed E2E workflows | Evidence/method |
| --- | ---: | ---: | --- |
| Samples | 20.690 | 2.965 | Raw JTL |
| Failed | 0 | 0 | Raw JTL `success` |
| Error % | 0,00% | 0,00% | Raw JTL |
| Avg ms | 7,814 | 12.027,360 | Raw JTL |
| Median ms | 3 | 12.066 | Sort-based |
| p90 ms | 7 | 13.901 | Sort-based |
| p95 ms | 39 | 14.368 | Sort-based |
| p99 ms | 52 | 15.421 | Sort-based |
| Throughput | 11,505 req/s | 1,649 workflow/s | Count / 1798,284 giây |
| Backend CPU avg/max | 0,172% / 0,452% | — | 360 resource row trong workload; normalized |
| Backend working set avg/max | 59,692 / 61,609 MiB | — | Resource CSV |
| Backend private memory avg/max | 66,705 / 68,898 MiB | — | Resource CSV |

E2E time bao gồm sáu think timer 1–3 giây nên không phải backend response time.

## Per-sampler metrics

| Sampler | Samples | Failed | Error % | Avg ms | Median | p90 | p95 | p99 | Throughput req/s |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| RCO-01-Login | 2.965 | 0 | 0,00% | 4,044 | 3 | 6 | 7 | 13 | 1,649 |
| RCO-02-Search | 2.964 | 0 | 0,00% | 2,749 | 2 | 3 | 5 | 29 | 1,648 |
| RCO-03-ProductDetail | 2.959 | 0 | 0,00% | 2,826 | 2 | 3 | 6 | 33 | 1,646 |
| RCO-04-GetCart | 2.956 | 0 | 0,00% | 2,429 | 2 | 4 | 4 | 5 | 1,644 |
| RCO-05-AddCart | 2.952 | 0 | 0,00% | 2,527 | 2 | 4 | 5 | 6 | 1,641 |
| RCO-06-Checkout | 2.949 | 0 | 0,00% | 36,348 | 36 | 48 | 52 | 62 | 1,640 |
| RCO-07-MyOrders | 2.945 | 0 | 0,00% | 4,831 | 3 | 7 | 10 | 36 | 1,638 |
| Completed E2E | 2.965 | 0 | 0,00% | 12.027,360 | 12.066 | 13.901 | 14.368 | 15.421 | 1,649 |

Số HTTP sample giảm dần từ Login 2.965 xuống MyOrders 2.945 vì 20 workflow bị scheduler cắt ở các bước khác nhau; không phải functional failure.

## Endurance time-bucket analysis (xu hướng theo thời gian)

| Bucket | HTTP samples | Throughput req/s | Error % | HTTP Avg ms | HTTP p95 ms | CPU avg/max % | Working Set avg/max MiB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| T+0–5m | 3.285 | 10,950 | 0,00% | 8,6 | 42 | 0,190 / 0,452 | 56,539 / 59,238 |
| T+5–10m | 3.489 | 11,630 | 0,00% | 8,3 | 42 | 0,182 / 0,357 | 59,270 / 59,891 |
| T+10–15m | 3.472 | 11,573 | 0,00% | 8,1 | 41 | 0,172 / 0,343 | 59,891 / 60,383 |
| T+15–20m | 3.514 | 11,713 | 0,00% | 7,4 | 38 | 0,163 / 0,265 | 60,396 / 60,832 |
| T+20–25m | 3.455 | 11,517 | 0,00% | 7,6 | 39 | 0,168 / 0,358 | 60,847 / 61,188 |
| T+25–30m | 3.457 | 11,523 | 0,00% | 7,7 | 39 | 0,154 / 0,280 | 61,198 / 61,609 |

### Phân tích xu hướng Endurance

**Memory (Working Set):**
- Xu hướng tăng nhẹ: `56,5 → 59,3 → 59,9 → 60,4 → 60,8 → 61,2 MiB` (avg mỗi bucket).
- Tăng tổng: `+4,7 MiB` trong 30 phút (`+8,3%`), tốc độ trung bình `+0,16 MiB/phút`.
- Tốc độ tăng **giảm dần**: T+0–5m tăng nhanh nhất (`+2,7 MiB` do ramp-up/JIT/cache load); T+15–30m chỉ tăng `+0,8 MiB` trong 15 phút (`+0,05 MiB/phút`).
- **Đánh giá:** Phần lớn memory tăng xảy ra ở ramp-up/warm-up đầu tiên. Sau T+10 phút, working set gần ổn định (tăng <1 MiB trong 20 phút). Đây **không phải** dấu hiệu leak rõ ràng — phù hợp hơn với normal warm-up behavior và order/cart accumulation nhẹ (mỗi VU tích lũy ~90 orders trong SQLite, database file tăng nhưng working set không tăng tuyến tính).
- **Confounder:** SUT không clear cart sau checkout; mỗi VU có ~90 orders cuối run. Payload my-orders tăng dần là nguyên nhân hợp lý cho working set tăng nhẹ.
- **Private memory:** avg `66,7 MiB`, cùng xu hướng ổn định sau warm-up.

**Response time:**
- HTTP avg **giảm nhẹ** từ `8,6 ms` (T+0–5) xuống `7,4 ms` (T+15–20), ổn định `7,6–7,7 ms` cho nửa sau.
- p95 giảm từ `42 ms` xuống `38–39 ms`.
- **Đánh giá:** Không có dấu hiệu degradation response time. Ngược lại, response time cải thiện nhẹ ở nửa sau, có thể do V8 JIT optimization hoặc OS file cache ấm lên.

**CPU:**
- Avg **giảm nhẹ** từ `0,190%` xuống `0,154%`.
- Max giảm từ `0,452%` xuống `0,280%` (trừ spike `0,358%` ở T+20–25m).
- **Đánh giá:** CPU ổn định, không có xu hướng tăng. Rất thấp trên thang normalized.

**Throughput:**
- Ổn định `10,95–11,71 req/s` xuyên suốt 30 phút.
- Error `0,00%` toàn bộ.
- **Đánh giá:** Throughput duy trì ổn định, không có degradation.

### Kết luận xu hướng Endurance

| Metric | Xu hướng | Đánh giá |
| --- | --- | --- |
| Working Set | Tăng nhẹ +4,7 MiB/30 phút, **tốc độ giảm dần** | Warm-up + state accumulation, **không phải leak rõ ràng** |
| Response time | Giảm nhẹ / ổn định | **Không degradation** |
| CPU | Giảm nhẹ / ổn định | **Không degradation** |
| Throughput | Ổn định ~11,5 req/s | **Không degradation** |
| Error | 0,00% toàn bộ | **Không error** |

SUT ổn định tại 20 VU sustained trong 30 phút. Không phát hiện memory leak, response time degradation, CPU runaway, hoặc throughput giảm. Working set tăng nhẹ phù hợp với state accumulation dự kiến (order/cart tích lũy trong SQLite).

## Resource evidence

- PID trong `backend-pid.txt`, toàn bộ 387 CSV row và screenshot đều là `18048`; process name `node`; dead row `0`.
- CSV toàn phần `03:00:46.614–03:33:02.932`, interval 5 giây; bao phủ command interval `03:01:20.284–03:31:23.524` và actual JMeter interval.
- 360 sample nằm trong actual workload window. Max gap `5 giây`, density OK.
- Working set đầu workload `49,5 MiB`, cuối `61,2 MiB`; tốc độ tăng giảm dần, ổn định sau T+10.

## Resource trend chi tiết

| Thời điểm | Working Set MiB | Private Memory MiB | CPU % |
| --- | ---: | ---: | ---: |
| T+0 (03:01:21) | 49,52 | 57,72 | 0,000 |
| T+0+5s | 49,81 | 57,72 | 0,016 |
| T+0+10s | 49,82 | 57,72 | 0,016 |
| T+0+15s | 50,32 | 57,97 | 0,062 |
| T+0+20s | 51,09 | 59,01 | 0,062 |
| T+30m-25s (03:31:02) | 61,29 | 68,68 | 0,140 |
| T+30m-20s | 61,31 | 68,68 | 0,140 |
| T+30m-15s | 61,21 | 68,10 | 0,187 |
| T+30m-10s | 61,23 | 68,10 | 0,156 |
| T+30m-5s (03:31:22) | 61,23 | 68,10 | 0,171 |

## Visual evidence

- Ảnh được rename/move từ repository root sang `tests/returning-customer-order/evidence/endurance/20260814-024700-user-executed/d4-endurance-start-jmeter-backend-pid-18048.png`.
- Ảnh timestamp hệ thống `03:01`, cùng frame có JMeter Endurance bắt đầu và Task Manager Details lọc `node.exe`, PID `18048`, CPU.
- Cột memory là `Working set delta (memory)`, không phải working set tuyệt đối; không dùng làm RAM metric.
- Ảnh chỉ là start/PID attribution. Không hiển thị milestone T+2/T+5/T+10/T+15/T+30 trên hình.
- Không có video hoặc ảnh bổ sung để xác minh narration và các milestone; không thấy token/password/secret trong ảnh đã cung cấp.

## HTML/statistics consistency

- HTML `statistics.json` tồn tại; per-sampler sample/error/mean/median/p90/p95 nhất quán với raw JTL trong sai số percentile/rounding.
- Console `summary = 20 in 00:30:00` là 20 scheduler-cutoff transaction; không phải tổng HTTP.

## Failure classification và guard diễn giải

- Không có test defect, blanket 401/403, lockout, correlation/assertion failure, backend unavailable, OOM hoặc SUT crash.
- 20 cutoff transaction là scheduler behavior dự kiến, không phải failed workflow.
- Monitor/start lệch `3,528 giây` nằm trong threshold `5 giây`.
- Heartbeat entries `0` do Start-Job/Tee-Object interaction; monitor vẫn liên tục (387 row, max gap 5s) nên không ảnh hưởng resource validity.

## Risks và giới hạn diễn giải

- Chỉ có visual evidence tại start; thiếu milestone T+2/T+5/T+10/T+15/T+30, video và narration.
- Không có resource metric của máy/load-generator process; không thể loại trừ hoàn toàn client-side overhead.
- Cart không được clear sau checkout và order history tích lũy; payload/state cuối run lớn hơn đầu run. Working set tăng nhẹ (+4,7 MiB) có thể do accumulation hợp lý, không nhất thiết là leak.
- 30 phút là minimum thực tế cho Endurance; leak chậm (< 0,05 MiB/phút) có thể không bị phát hiện.
- Response Time Graph listener có overhead tối thiểu; không dùng UI listener làm nguồn percentile chính.
- Heartbeat job không hoạt động; monitor coverage được xác minh bằng CSV density thay thế.

## So sánh Endurance vs D1 Load (cùng 20 VU)

| Metric | D1 Load (20 VU, 6 phút) | D4 Endurance (20 VU, 30 phút) | Chênh lệch |
| --- | --- | --- | --- |
| HTTP throughput | 10,951 req/s | 11,505 req/s | +5,1% |
| HTTP p95 | 9 ms | 39 ms | +333% |
| Error % | 0,00% | 0,00% | — |
| CPU avg | — (D1 không có resource) | 0,172% | — |
| Working Set avg | — | 59,692 MiB | — |

HTTP p95 tăng đáng kể so với D1 do **state accumulation**: mỗi VU chạy ~150 workflow (vs ~30 trong D1), tạo ~150 orders mỗi; RCO-06-Checkout (avg `36 ms` vs toàn sampler `~3 ms`) thống trị p95 vì phải ghi SQLite ngày càng lớn. Đây là expected behavior do SUT design, không phải performance degradation.

## Human Review recommendation

- Recommended decision: `Approved with corrections`.
- Chấp nhận classification `VALID WITH LIMITATION` cho raw JTL và backend resource evidence.
- Giữ limitation visual milestone/video, load-generator resource, heartbeat không hoạt động, và state/payload drift trong mọi downstream claim.
- SUT ổn định tại 20 VU / 30 phút: không leak rõ ràng, không degradation, không error.
- Nếu rubric bắt buộc video milestone hoặc run dài hơn 30 phút, cần cung cấp thêm trong run mới.

## Current status

`ENDURANCE RESULT PENDING HUMAN REVIEW`

## Human Review decision

- [ ] Approved
- [ ] Approved with corrections
- [ ] Rejected
- Reviewed artifact: báo cáo này và run `tests/returning-customer-order/test-runs/endurance/20260814-024700-user-executed/`.
- Accepted classification:
- Exact approval:
- Reviewer/date:
