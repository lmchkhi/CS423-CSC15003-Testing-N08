# D3 Spike — Phân tích measured evidence

## Artifact nhận được

- Executor: `User`.
- Scenario: `D3 — Spike`.
- JMX: `tests/returning-customer-order/test-cases/spike/23127464_Spike_20260813.jmx`.
- JMX SHA-256: `AB01BD4FEBB0FC3D4879590420CECADCFB37EA38DFD1D0D2E60FD9A769CBDFF5`.
- CSV: `tests/returning-customer-order/data/returning-customer-order.csv`.
- Base URL: `http://127.0.0.1:3000`.
- Run folder: `tests/returning-customer-order/test-runs/spike/20260814-021040-user-executed/`.
- User command interval: `2026-08-14 02:23:17.914–02:26:30.807 +07:00`; JMeter actual workload: `02:23:20.131–02:26:29.217 +07:00` (`189,086 giây`).
- JMeter exit code `0`; guard `POST_RUN_GUARD_OK SAMPLES=2574`; monitor/start lệch `0,074 giây`.
- Backend: `node.exe`, PID `15944`; HTTP 200 trước run.
- Provisioning: 50 requested/created, 0 create failure, 50 token, 0 login failure; cart/orders rỗng 50/50.
- HTML generation: bắt đầu `02:27:05`, hoàn tất khoảng `02:27:06`, exit code `0`, ngoài measured interval.
- Visual evidence: `tests/returning-customer-order/evidence/spike/20260814-021040-user-executed/d3-spike-start-jmeter-backend-pid-15944.png`, SHA-256 `BC9682763A18288F0F0D78EB73CFB60E2B4FAC82BA4604421D1F033941C8A090`.
- Video/narration và ảnh milestone spike/recovery/completion: không được cung cấp.

## Run validity

- Decision: `VALID WITH LIMITATION`.
- Reviewed plan matched: Có — Ultimate Thread Group baseline 5 VU, thêm 45 VU tại T+60 trong 5 giây, peak 50 VU giữ 60 giây, ramp-down 5 giây và recovery 5 VU; View Results Tree; pool Spike 50 account.
- Fresh output: command fail-fast không overwrite; artifact mang cùng run ID và timestamp nhất quán.
- Expected labels/correlation/assertions: đủ 7 HTTP label và transaction label; 2.574/2.574 row `success=true`, HTTP đều code 200, không có `failureMessage`, main-controller error, `Test failed!`, ERROR hoặc OOM.
- Peak concurrency: raw JTL đạt `allThreads=50`.
- Setup/HTML excluded: provisioning hoàn tất `02:19:40`; workload bắt đầu `02:23:20`; HTML bắt đầu `02:27:05` sau workload.
- Resource coherence: CSV đúng PID 15944, first `02:20:04.404` ≤ command start, last `02:26:57.611` ≥ command end; 206 row tổng, không có process-dead row.
- Limitation có ranh giới: chỉ một screenshot tại start; không có visual milestone đúng spike/recovery/completion hoặc video/narration. Ảnh dùng cột `Working set delta`, không phải RAM tuyệt đối. Không có resource metric của load generator; View Results Tree có overhead tiềm tàng.
- Các limitation trên không làm vô hiệu raw JTL/backend resource time series, nhưng hạn chế xác minh thao tác trực quan và loại trừ load-generator bottleneck.

## Raw JTL summary

- Schema: `timeStamp,elapsed,label,responseCode,responseMessage,threadName,dataType,success,failureMessage,bytes,sentBytes,grpThreads,allThreads,URL,Latency,IdleTime,Connect`.
- Tổng raw row: `2.574` = `2.230` HTTP request + `344` E2E transaction row.
- Workflow hoàn tất đủ 7 child: `294`; transaction bị scheduler cutoff: `50`.
- Failed HTTP/workflow: `0`; HTTP response code: `200` cho 2.230/2.230 request.
- Actual workload span dùng cho throughput: `189,086 giây`, neo theo JMeter log `1786649000131–1786649189217`.
- Percentile trong báo cáo: linear interpolation trên elapsed đã sort; HTML dùng để cross-check và có thể khác phần thập phân do thuật toán/rounding.

## Overall metrics

| Metric | HTTP requests | Completed E2E workflows | Evidence/method |
| --- | ---: | ---: | --- |
| Samples | 2.230 | 294 | Raw JTL; loại 50 transaction cutoff khỏi completed workflow |
| Failed | 0 | 0 | Raw JTL `success` |
| Error % | 0,00% | 0,00% | Raw JTL |
| Avg ms | 8,125 | 12.072,636 | Raw JTL |
| Median ms | 3 | 12.137,5 | Linear interpolation |
| p90 ms | 26 | 14.031,7 | Linear interpolation |
| p95 ms | 35 | 14.302,4 | Linear interpolation |
| p99 ms | 48,71 | 15.282,52 | Linear interpolation |
| Throughput | 11,794 req/s | 1,555 workflow/s | Count / 189,086 giây |
| Backend CPU avg/max | 0,206% / 1,011% | như HTTP | 93 resource row trong actual workload; normalized theo logical processors |
| Backend working set avg/max | 59,610 / 85,098 MiB | như HTTP | Resource CSV |
| Backend private memory avg/max | 69,413 / 99,059 MiB | như HTTP | Resource CSV |

E2E time bao gồm sáu think timer 1–3 giây nên không phải backend response time.

## Per-sampler metrics

| Sampler | Samples | Failed | Error % | Avg ms | Median | p90 | p95 | p99 | Throughput req/s |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| RCO-01-Login | 344 | 0 | 0,00% | 7,846 | 5 | 9 | 12,85 | 61,67 | 1,819 |
| RCO-02-Search | 340 | 0 | 0,00% | 3,738 | 2 | 5 | 11,05 | 31,61 | 1,798 |
| RCO-03-ProductDetail | 328 | 0 | 0,00% | 3,924 | 3 | 6 | 13 | 27,73 | 1,735 |
| RCO-04-GetCart | 316 | 0 | 0,00% | 3,171 | 3 | 5 | 5 | 7 | 1,671 |
| RCO-05-AddCart | 306 | 0 | 0,00% | 3,592 | 3 | 6 | 6 | 8,95 | 1,618 |
| RCO-06-Checkout | 302 | 0 | 0,00% | 29,854 | 29 | 44 | 50,9 | 65 | 1,597 |
| RCO-07-MyOrders | 294 | 0 | 0,00% | 5,932 | 4 | 8,7 | 20,7 | 39,14 | 1,555 |
| Completed E2E | 294 | 0 | 0,00% | 12.072,636 | 12.137,5 | 14.031,7 | 14.302,4 | 15.282,52 | 1,555 |

Số HTTP sample giảm dần từ Login 344 xuống MyOrders 294 vì đúng 50 workflow bị scheduler cắt ở các bước khác nhau; không phải 50 functional failure.

## Baseline / Spike / Recovery

Cửa sổ neo theo actual JMeter start `02:23:20.131`. Baseline gồm ramp đầu 0–5 giây; Spike gồm ramp-up 60–65, peak 65–125 và ramp-down 125–130; Recovery là 130–185 giây; 185–190 là ramp kết thúc 5→0.

| Region/time window | VU kỳ vọng | HTTP samples | Error % | Throughput req/s | HTTP p95/p99 ms | CPU avg/max | Working set avg/max MiB | Private avg/max MiB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Baseline T+0–<60s | 0→5, rồi 5 | 161 | 0,00% | 2,683 | 26 / 234 | 0,047% / 0,193% | 53,820 / 55,035 | 61,652 / 62,309 |
| Spike T+60–<130s | 5→50→5 | 1.902 | 0,00% | 27,171 | 36 / 48,99 | 0,465% / 1,011% | 68,969 / 85,098 | 82,654 / 99,059 |
| Recovery T+130–<185s | 5 | 156 | 0,00% | 2,836 | 16 / 35,9 | 0,052% / 0,116% | 54,022 / 54,848 | 61,107 / 61,738 |
| Final ramp T+185–end | 5→0 | 11 | 0,00% | 2,200 | 5,5 / 5,9 | 0,059% / 0,078% | 55,235 / 55,383 | 62,379 / 62,770 |

### Phản ứng tại spike

- HTTP throughput tăng từ `2,683` lên `27,171 req/s` (`+912,7%`, khoảng `10,13×`) khi tải chuyển từ 5 lên peak 50 VU.
- HTTP p95 tăng `26 → 36 ms` (`+38,5%`, +10 ms); error giữ `0,00%`. Không có error surge, timeout, 4xx/5xx hoặc connection refusal trong raw JTL.
- Peak ổn định T+65–125 có 1.733 HTTP sample, throughput `28,883 req/s`, p95 `36 ms`, p99 `49 ms`, max thread `50`.
- Backend CPU avg tăng khoảng `9,9×` nhưng vẫn thấp trên thang normalized toàn máy; max `1,011%`. Working set avg tăng `15,149 MiB` (`28,1%`) và đạt max `85,098 MiB`; private max `99,059 MiB`.
- Không thấy phản ứng lỗi/latency nghiêm trọng hoặc backend crash tại spike. Tuy nhiên không có visual milestone đúng T+60–130 để xác minh quan sát trên màn hình.

### Recovery

- Toàn recovery: p95 `16 ms`, throughput `2,836 req/s`, error `0,00%`; CPU avg/max `0,052/0,116%`; working set avg/max `54,022/54,848 MiB`, gần baseline.
- Hai bucket 10 giây đầu recovery đều có p95 `33,4 ms`; bucket T+150–185 giảm còn p95 `10 ms`. Resource CPU đã về vùng baseline ngay trong recovery; working/private memory trung bình cả recovery cũng về gần baseline.
- Không có recovery criterion định lượng được Human Review khóa trước run. Vì vậy chỉ kết luận quan sát theo bucket rằng latency đã về thấp hơn baseline trong bucket bắt đầu khoảng T+150, tức trong vòng 20 giây sau recovery start; không tuyên bố recovery time chính xác ở mức giây.

## HTML/statistics consistency

- HTML `statistics.json` tồn tại; per-sampler sample/error/mean/median/p90/p95 nhất quán với raw JTL trong sai số percentile/rounding.
- HTML `Total=2.280`: 2.230 HTTP row + 50 transaction cutoff. Completed transaction parent không được cộng vào Total; báo cáo này dùng HTTP-only raw JTL cho request metric và chỉ 294 transaction đủ 7 child cho completed-workflow metric.
- Console `summary = 50`, Avg `4.686 ms` là 50 transaction cutoff được summariser ghi, không phải tổng HTTP sample, không phải overall Avg và không phải p95.

## Resource evidence

- PID trong `backend-pid.txt`, toàn bộ 206 CSV row và screenshot đều là `15944`; process name `node`; dead row `0`.
- CSV toàn phần `02:20:04.404–02:26:57.611`, interval khoảng 2 giây; bao phủ command interval `02:23:17.915–02:26:30.807` và actual JMeter interval.
- 93 sample nằm trong actual workload window. Không lặp lại lỗi D2 monitor dừng trước workload.
- CPU là `CpuPercentNormalized`, đã chia theo logical processor; không so trực tiếp với cột CPU tức thời trong ảnh nếu cách chuẩn hóa khác.

## Visual evidence

- Ảnh được rename/move từ repository root sang `tests/returning-customer-order/evidence/spike/20260814-021040-user-executed/d3-spike-start-jmeter-backend-pid-15944.png`.
- Ảnh timestamp hệ thống khoảng `02:23`, cùng frame có JMeter bắt đầu lúc `02:23:20` và Task Manager Details lọc `node.exe`, PID `15944`, CPU.
- Cột memory là `Working set delta (memory)` với giá trị tức thời, không phải working set tuyệt đối; không dùng làm RAM metric.
- Ảnh chỉ là start/PID attribution. Không hiển thị console `Active/Started/Finished` tại spike/recovery/completion.
- Không có video hoặc ảnh bổ sung để xác minh narration tiếng Việt và các milestone; không thấy token/password/secret trong ảnh đã cung cấp.

## Failure classification và guard diễn giải

- Không có test defect, blanket 401/403, lockout, correlation/assertion failure, backend unavailable, OOM hoặc SUT crash.
- Lần User chạy Stop block trước measured command đã bị `STOP_BLOCKED`; monitor không dừng, CSV tiếp tục tăng và measured run sau đó có coverage đầy đủ. Đây là operator-sequence correction trước run, không làm invalid run.
- 50 cutoff transaction là scheduler behavior dự kiến, không phải failed workflow nhưng cũng không được tính completed workflow.
- View Results Tree có thể tạo load-generator overhead; chưa có load-generator CPU/RAM để lượng hóa.

## Risks và giới hạn diễn giải

- Chỉ có visual evidence tại start; thiếu spike start/peak, recovery, completion và video/narration.
- Không có resource metric của máy/load-generator process; không thể loại trừ hoàn toàn client-side overhead của View Results Tree.
- Cart không được clear sau checkout và order history tích lũy; state/payload cuối run lớn hơn đầu run. Không gọi biến động latency là thuần túy do VU nếu chưa tách confounder này.
- Recovery definition định lượng chưa được khóa trước run; chỉ báo bucket-level observation, không bịa recovery time chính xác.
- Spike peak 60 giây là burst test, không chứng minh sustained capacity/endurance threshold.

## Human Review recommendation

- Recommended decision: `Approved with corrections`.
- Chấp nhận classification `VALID WITH LIMITATION` cho raw JTL và backend resource evidence.
- Giữ limitation visual milestone/video và load-generator resource trong mọi downstream claim.
- Nếu rubric bắt buộc video đầy đủ baseline/spike/recovery/completion, cần cung cấp video cùng run; không ghép video từ run khác. Nếu phải rerun, dùng folder/artifact mới.
- D4 vẫn khóa cho đến khi User phê duyệt rõ D3 result và authorize phase tiếp theo.

## Current status

`SPIKE RESULT PENDING HUMAN REVIEW`
