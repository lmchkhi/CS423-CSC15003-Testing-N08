# Báo cáo chính — HW05 Performance Testing

## Sinh viên: 23127464 — Trần Minh Quang
## Workflow: Returning Customer Search and Order
## SUT: EShop REST Backend (Node.js + Express + SQLite)

---

## 1. Phạm vi kiểm thử và lựa chọn endpoint

### 1.1. Workflow end-to-end

Workflow "Returning Customer Search and Order" mô phỏng một khách hàng quay lại: đăng nhập, tìm kiếm sản phẩm, xem chi tiết, thêm vào giỏ hàng, thanh toán và kiểm tra lịch sử đơn hàng. Workflow gồm 7 bước API tuần tự:

| Bước | Sampler | Method | Endpoint | Nhóm endpoint |
| ---: | --- | --- | --- | --- |
| 1 | RCO-01-Login | POST | `/api/login` | Auth-heavy |
| 2 | RCO-02-Search | GET | `/api/products?search={keyword}` | Read-heavy |
| 3 | RCO-03-ProductDetail | GET | `/api/products/{id}` | Read-heavy |
| 4 | RCO-04-GetCart | GET | `/api/cart` | Transactional |
| 5 | RCO-05-AddCart | POST | `/api/cart` | Transactional |
| 6 | RCO-06-Checkout | POST | `/api/checkout` | Transactional |
| 7 | RCO-07-MyOrders | GET | `/api/orders/my-orders` | Read-heavy |

Giữa mỗi bước có think timer ngẫu nhiên 1–3 giây mô phỏng thời gian đọc/thao tác của người dùng thật.

### 1.2. Correlation chain

Workflow sử dụng chuỗi correlation xuyên suốt:
- Login → trích JWT `token` → dùng trong header `Authorization: Bearer {token}` cho tất cả bước sau
- Search → trích `productId` từ kết quả đầu tiên
- ProductDetail → trích `price` (normalize BigDecimal do SUT trả string cho product ID chẵn, integer cho lẻ) → tính `totalAmount = price × quantity`
- Checkout → trích `orderId` → verify trong MyOrders

### 1.3. Hardware

| Thông số | Giá trị |
| --- | --- |
| CPU | Intel Core i7-12700H (20 logical processors) |
| RAM | 32 GB DDR5 |
| OS | Windows 11 Pro 24H2 |
| Java | OpenJDK 17.0.16 LTS |
| JMeter | Apache JMeter 5.6.3 (non-GUI mode) |
| SUT | Node.js + Express + SQLite, `localhost:3000` |

---

## 2. Task 1 — Thiết kế và thực thi kiểm thử với AI

### 2.1. Thiết kế test plan với AI (AI-first)

AI được dẫn dắt qua từng bước (không phải single generic prompt):
- **Phase A:** AI xác minh API contract, runtime probe 1 user × 1 flow, phát hiện 10 điểm lệch giữa spec và implementation (login lockout `+2` thay vì `+1`, checkout không clear cart, price type không nhất quán, v.v.).
- **Phase B:** AI thiết kế workload profile, CSV data (150 account pool, mỗi VU 1 account riêng), reset strategy (restart backend → provision → verify trước mỗi measured interval).
- **Phase C:** AI sinh JMX thông qua script `generate-phase-c-jmx.js`, tạo smoke JMX trước, rồi derive 3 graded JMX từ smoke đã verify.

### 2.2. Workflow data-driven

Sử dụng 2 file CSV:
- `returning-customer-order.csv` — 170 dòng (Load 20 + Stress 80 + Spike 50 + Endurance 20), mỗi dòng chứa: `email`, `password`, `keyword`, `quantity`, `shippingAddress`. Recycle = false, stopOnEOF = true → mỗi VU dùng 1 dòng duy nhất, không trùng account.
- `account-provisioning.csv` — 170 dòng với cột `name`, `scenario`, `vuIndex` để provision account trước mỗi run.

Keyword search (5 giá trị xoay vòng: iPhone, Samsung, MacBook, AirPods, Keychron) và quantity (1–3) được phân bổ trước trong CSV.

### 2.3. Ba report view khác nhau

| Scenario | Listener | Lý do chọn |
| --- | --- | --- |
| Load | Summary Report | Tổng hợp throughput/error rate/avg ổn định qua thời gian |
| Stress | Aggregate Report | So sánh per-sampler percentile giữa các bậc tải |
| Spike | View Results Tree | Kiểm tra từng request/response tại các giai đoạn baseline/spike/recovery |

Endurance (bổ sung): Response Time Graph — theo dõi response time trend qua 30 phút.

### 2.4. Đặt tên test plan

| File | Convention |
| --- | --- |
| `23127464_Load_20260813.jmx` | StudentID_ScenarioType_YYYYMMDD |
| `23127464_Stress_20260813.jmx` | StudentID_ScenarioType_YYYYMMDD |
| `23127464_Spike_20260813.jmx` | StudentID_ScenarioType_YYYYMMDD |
| `23127464_Endurance_20260814.jmx` | StudentID_ScenarioType_YYYYMMDD |

### 2.5. Human review — AI đã sai gì

| # | Lỗi AI | Phát hiện ở | Sửa chữa |
| --- | --- | --- | --- |
| 1 | JMX thiếu `ThreadGroup.main_controller` + `LoopController loops=-1` | Phase C — run D1 lần 1 tạo JTL 0 sample hữu ích | Vá generator, tái sinh cả 3 JMX |
| 2 | Search HTTPArgument thiếu tên query param | Phase C — smoke chạy không đúng keyword | Thêm `name="search"` vào element |
| 3 | Assertion search quá yếu (chỉ check HTTP 200, không verify keyword match) | Phase C — smoke pass nhưng không phát hiện response sai | Thêm assertion kiểm tra keyword xuất hiện trong response body |
| 4 | Resource monitor runbook đặt "Stop" trước "Start JMeter" | Phase D2 — monitor dừng 35 giây trước workload, mất toàn bộ CPU/RAM | Sửa thứ tự: start monitor → verify ≥3 sample → start JMeter. Chạy lại D2 |

**Nguyên nhân AI sai:**
- Lỗi 1: Template string trong generator không khớp schema JMeter 5.6.3; AI không có smoke validation tự động cho XML output.
- Lỗi 2–3: AI tối ưu hóa sớm (generate nhanh) mà không kiểm tra correlation end-to-end.
- Lỗi 4: AI sinh tài liệu theo thứ tự logic (setup → run → teardown) nhưng thứ tự thời gian thực khác (monitor phải chạy song song, không teardown trước run).

### 2.6. Thực thi và kết quả

#### 2.6.1. Load Test — 20 VU, Ramp 60s, Hold 360s

| Metric | Giá trị |
| --- | --- |
| HTTP Samples | 4.547 |
| Error Rate | 0,00% (0 failure) |
| Avg Response Time | 3,4 ms |
| Median | 3 ms |
| p90 | 7 ms |
| p95 | 9 ms |
| p99 | 13 ms |
| Throughput | 10,95 req/s |
| E2E Workflows | 660 (640 hoàn chỉnh, 20 scheduler cutoff) |
| Workflow/s | 1,54 |
| Backend CPU Max | 0,542% (normalized) |
| Backend RAM Max | 56,73 MiB (working set) |
| Resource Monitor | 267 rows, 2s interval, RESOURCE_COVERAGE_OK |

**Per-endpoint Load:**

| Sampler | Samples | Avg (ms) | p95 (ms) |
| --- | ---: | ---: | ---: |
| RCO-01-Login | 660 | 3,7 | 7 |
| RCO-02-Search | 659 | 2,5 | 5 |
| RCO-03-ProductDetail | 657 | 2,3 | 4 |
| RCO-04-GetCart | 655 | 2,0 | 4 |
| RCO-05-AddCart | 653 | 2,1 | 4 |
| RCO-06-Checkout | 645 | 7,9 | 13 |
| RCO-07-MyOrders | 618 | 3,2 | 6 |

Run folder: `tests/returning-customer-order/test-runs/load/20260814-001003-user-executed/`

Demo video: [YouTube D1 Load (22:41 - 1:25:20)](https://youtu.be/slTA5ErFCQ4?t=1361)

#### 2.6.2. Stress Test — Staircase 10→20→40→60→80 VU, 60s/bậc (Rerun)

| Metric | Giá trị |
| --- | --- |
| HTTP Samples | 7.192 |
| Error Rate | 0,00% (0 failure) |
| Avg Response Time | 17,4 ms |
| Median | 3 ms |
| p90 | 59 ms |
| p95 | 80 ms |
| p99 | 160 ms |
| Throughput | 24,09 req/s |
| E2E Workflows | 1.062 |
| Workflow/s | 3,56 |
| Backend CPU Max | 93,200% (normalized) |
| Backend RAM Max | 83,98 MiB (working set) |
| Resource Monitor | 196 rows, 2s interval, RESOURCE_COVERAGE_OK |

**Throughput theo bậc tải (từ run cũ, cùng JMX):**

| Bậc | VU | Throughput (req/s) | Error % |
| --- | ---: | ---: | ---: |
| 1 | 10 | 5,47 | 0,00% |
| 2 | 20 | 11,28 | 0,00% |
| 3 | 40 | 22,88 | 0,00% |
| 4 | 60 | 34,75 | 0,00% |
| 5 | 80 | 46,27 | 0,00% |

Throughput tuyến tính theo VU, chưa đạt plateau, error 0% ở tất cả bậc. Tuy nhiên, CPU max đạt 93,2% (rerun) cho thấy backend gần saturate tại 80 VU.

Run folder (rerun): `tests/returning-customer-order/test-runs/stress/20260814-041320-user-executed/`

Demo video: [YouTube D2 Stress (1:26:00 - 1:48:36)](https://youtu.be/slTA5ErFCQ4?t=5160)

#### 2.6.3. Spike Test — Baseline 5 → Spike 50 → Recovery 5 VU

| Metric | Baseline (5 VU) | Spike (50 VU) | Recovery (5 VU) |
| --- | ---: | ---: | ---: |
| HTTP p95 (ms) | 26 | 36 | 16 |
| Throughput (req/s) | 2,683 | 27,171 | 2,836 |
| CPU Avg (%) | 0,047 | 0,465 | 0,052 |
| RAM Avg (MiB) | 53,820 | 68,969 | 54,022 |

| Metric tổng | Giá trị |
| --- | --- |
| HTTP Samples | 2.230 |
| Error Rate | 0,00% |
| E2E Workflows | 344 (294 hoàn chỉnh, 50 scheduler cutoff) |
| Peak allThreads | 50 |
| Resource Monitor | 206 rows, RESOURCE_COVERAGE_OK |

Recovery hoàn toàn: p95 giảm từ 36 ms (spike) về 16 ms (thấp hơn baseline 26 ms), RAM giảm từ 69,0 về 54,0 MiB. Không có dấu hiệu degradation sau spike.

Run folder: `tests/returning-customer-order/test-runs/spike/20260814-021040-user-executed/`

Demo video: [YouTube D3 Spike (1:48:42 - 2:09:20)](https://youtu.be/slTA5ErFCQ4?t=6522)

#### 2.6.4. Endurance Test — 20 VU, 30 phút

| Metric | Giá trị |
| --- | --- |
| HTTP Samples | 20.690 |
| Error Rate | 0,00% (0 failure) |
| Avg Response Time | 8,0 ms |
| p90 | 32 ms |
| p95 | 40 ms |
| p99 | 51 ms |
| Throughput | 11,52 req/s |
| E2E Workflows | 2.965 |
| Backend CPU Max | 0,452% (normalized) |
| Backend RAM Max | 61,61 MiB |
| Resource Monitor | 387 rows, 5s interval, RESOURCE_COVERAGE_OK |

**Trend analysis (bucket 5 phút):**

| Bucket | Throughput (req/s) | RAM Avg (MiB) | Response Avg (ms) |
| --- | ---: | ---: | ---: |
| 0–5 min | 10,95 | 56,1 | 9,2 |
| 5–10 min | 11,42 | 58,3 | 8,1 |
| 10–15 min | 11,56 | 59,7 | 7,8 |
| 15–20 min | 11,71 | 60,2 | 7,6 |
| 20–25 min | 11,65 | 60,8 | 7,5 |
| 25–30 min | 11,58 | 61,2 | 7,4 |

Working set tăng +4,7 MiB/30 phút, tốc độ giảm dần và ổn định sau T+10. Response time giảm nhẹ (warm-up effect). Throughput ổn định 10,95–11,71 req/s. Không có dấu hiệu memory leak hay degradation.

**Per-endpoint Endurance:**

| Sampler | Samples | Avg (ms) | p95 (ms) |
| --- | ---: | ---: | ---: |
| RCO-01-Login | 2.965 | 4,0 | 7 |
| RCO-02-Search | 2.964 | 2,7 | 5 |
| RCO-03-ProductDetail | 2.959 | 2,8 | 6 |
| RCO-04-GetCart | 2.956 | 2,4 | 4 |
| RCO-05-AddCart | 2.952 | 2,5 | 5 |
| RCO-06-Checkout | 2.949 | 36,3 | 52 |
| RCO-07-MyOrders | 2.945 | 4,8 | 10 |

Checkout (avg 36,3 ms, p95 = 52 ms) là endpoint nặng nhất do SQLite write + state accumulation. Tăng từ 7,9 ms (Load, 6 phút) lên 36,3 ms (Endurance, 30 phút) vì mỗi VU tạo ~150 orders qua 30 phút, order history tích lũy.

Run folder: `tests/returning-customer-order/test-runs/endurance/20260814-024700-user-executed/`

Demo video: [YouTube D4 Endurance (2:09:30 - 3:03:17)](https://youtu.be/slTA5ErFCQ4?t=7770)

### 2.7. Endurance threshold

Trên phần cứng này, tải bền vững tối đa quan sát được ổn định trong 30 phút là khoảng **20 VU / 11,5 req/s**, với:
- p95 = 40 ms (HTTP)
- Error rate = 0,00%
- Backend CPU max = 0,452% (normalized)
- RAM max = 61,61 MiB (working set)

Cơ sở: Endurance run 30 phút với 20 VU cho throughput ổn định, memory trend giảm dần và ổn định. Stress (rerun) cho thấy CPU max 93,2% tại 80 VU — backend gần saturate, vì vậy 20 VU là mức bền vững trên phần cứng này.

### 2.8. Reset strategy giữa các scenario

Mỗi measured run tuân thủ trình tự:
1. Restart backend (`node server.js` — SUT tự drop/recreate/seed database)
2. Resolve PID qua `Get-NetTCPConnection -LocalPort 3000`
3. Verify HTTP 200 trên `/api/products`
4. Provision account pool bằng `provision-load-accounts.ps1` (register + login validate)
5. Start resource monitor (PowerShell script, 2s hoặc 5s interval)
6. Verify monitor ≥3 samples (alignment gate)
7. Start JMeter measured command
8. Post-run guard: verify JTL non-empty, no `main_controller` error, exit code 0
9. Stop monitor sau khi coverage đủ
10. Generate HTML report

### 2.9. Bugs phát hiện

| # | ID | Severity | Mô tả | Evidence |
| --- | --- | --- | --- | --- |
| 1 | PERF-01 | Major/P1 | Checkout không xóa giỏ hàng sau đặt hàng | `server.js:297-308`, D4 Endurance state drift |
| 2 | PERF-02 | Critical/P0 | SQL injection trong search endpoint | `server.js:144`, string interpolation `LIKE '%${searchQuery}%'` |
| 3 | PERF-03 | Major/P1 | Login lockout +2/180s thay vì +1/30s | `server.js:54-57` |
| 4 | PERF-04 | Critical/P0 | Checkout trust client `total_amount` | `server.js:297-308`, không validate server-side |

Chi tiết: xem `bug-reports/hw05-perf/PERF-01..04`.

---

## 3. Task 2 — AI analysis và misinterpretation hunt

### 3.1. AI phân tích raw JTL

AI được yêu cầu đọc raw JTL của 4 scenario và đưa ra phân tích ban đầu. Bản draft AI chứa nhiều lỗi diễn giải điển hình:

> "Kết quả Load test cho thấy hệ thống xử lý 5.207 samples với error rate 0% và average response time 11.740 ms. Throughput đạt 1,54 req/s. Stress test đẩy lên 80 VU cho thấy p95 = 37 ms, CPU max đạt 54,14 MiB, xác nhận 80 VU là ngưỡng ổn định. Spike test cho thấy hệ thống có memory leak nghiêm trọng..."

### 3.2. Phát hiện lỗi AI (10 lỗi)

| # | Lỗi | Giá trị AI nêu | Giá trị đúng (raw JTL) |
| --- | --- | --- | --- |
| 1 | Nhầm E2E avg với HTTP avg | 11.740 ms | HTTP avg = 3,4 ms; 11.740 ms là E2E (có think time) |
| 2 | Gộp transaction rows vào sample count | 5.207 samples | HTTP = 4.547; E2E transaction = 660 |
| 3 | Nhầm RAM pre-run với CPU, sai đơn vị | CPU = 54,14 MiB | 54,14 MiB là RAM pre-run; CPU Stress không xác định (run cũ) |
| 4 | Nhầm max thread với sustainable capacity | 80 VU sustained | 80 VU là peak thread; endurance chỉ 20 VU |
| 5 | Gọi transient spike memory là leak | Memory leak | RAM tăng lúc spike rồi giảm về 54,0 MiB — transient, không leak |
| 6 | Hoán đổi p90/p95 | p90 = 40 ms | p90 = 32 ms; p95 = 40 ms |
| 7 | Gán metric Checkout cho Search | Search p95 = 52 ms | Checkout p95 = 52 ms; Search p95 = 5 ms |
| 8 | Nhầm E2E throughput với HTTP throughput | HTTP = 1,54 req/s | 1,54 là workflow/s; HTTP = 10,95 req/s |
| 9 | Bịa error rate | Stress error = 0,03% | 0,00% (0 failure / 7.293 HTTP) |
| 10 | Dùng metric ngắn hạn cho kết luận chung | Checkout avg = 7,9 ms | 7,9 ms chỉ ở Load (6 phút); Endurance (30 phút) = 36,3 ms |

Chi tiết mỗi lỗi (raw evidence, verdict, correction, nguyên nhân AI bỏ lỡ): xem [AI_MISINTERPRETATION_HUNT.md](./returning-customer-order/AI_MISINTERPRETATION_HUNT.md).

### 3.3. Đánh giá đề xuất tối ưu của AI (7 đề xuất)

| # | Đề xuất | Phân loại | Lý do |
| --- | --- | --- | --- |
| 1 | Index `orders(user_id)` | Plausible but unproven | MyOrders p95 chỉ 10 ms; chưa có evidence bottleneck |
| 2 | SQLite WAL mode | Plausible but unproven | Single-process Node.js, lock contention chưa rõ |
| 3 | Connection Pool | Hallucinated | SQLite dùng single file connection, không có pool concept |
| 4 | In-memory cache products | Plausible but unproven | Search avg = 2,7 ms; dataset 5 sản phẩm quá nhỏ |
| 5 | Pagination my-orders | Feasible | Response time tăng tương quan với order count tích lũy |
| 6 | Rate Limiting | Not supported | 80 VU 0% error, CPU max 93,2% nhưng không crash |
| 7 | Clear cart sau checkout | Feasible | Functional fix + giảm state accumulation |

Chi tiết: xem [OPTIMIZATION_REVIEW.md](./returning-customer-order/OPTIMIZATION_REVIEW.md).

---

## 4. Task 3 — Continuous Performance Testing proposal

Đề xuất pipeline CI/CD tự động:

1. **Trigger:** Mỗi PR thay đổi `src/eshop-sut/backend/` → chạy smoke + short Load gate
2. **Smoke gate:** 1 VU × 1 iteration, kiểm tra functional regression
3. **Load gate (PR):** 20 VU × 60s hold, threshold: `p95 > baseline_p95 × 1.20 OR error_rate > 1%` → block merge
4. **Nightly Stress:** Staircase 10→80 VU, so sánh throughput plateau + error trend
5. **Weekly Spike + Endurance:** 50 VU spike + 15 phút endurance, cập nhật baseline nếu cải thiện

Trade-off chính:
- **Chi phí:** Smoke + Load gate mỗi PR ~2–3 phút — chấp nhận được
- **False alarm:** p95 variance cao trên SUT nhẹ (latency <10 ms → 1–2 ms = 10–20%); dùng moving average baseline 3 lần chạy gần nhất
- **State accumulation:** Bắt buộc restart SUT trước mỗi run để reset DB
- **Isolation:** Cần dedicated runner để tránh runner noise

Chi tiết (flowchart + discussion): xem [CONTINUOUS_PERFORMANCE.md](./returning-customer-order/CONTINUOUS_PERFORMANCE.md).

---

## 5. Tài liệu đính kèm

| Tài liệu | Đường dẫn |
| --- | --- |
| Phân tích tổng hợp | [RESULT_ANALYSIS.md](./returning-customer-order/RESULT_ANALYSIS.md) |
| AI Misinterpretation Hunt | [AI_MISINTERPRETATION_HUNT.md](./returning-customer-order/AI_MISINTERPRETATION_HUNT.md) |
| Optimization Review | [OPTIMIZATION_REVIEW.md](./returning-customer-order/OPTIMIZATION_REVIEW.md) |
| Continuous Performance | [CONTINUOUS_PERFORMANCE.md](./returning-customer-order/CONTINUOUS_PERFORMANCE.md) |
| AI Critique (274 từ) | [ai-critique.md](./ai-critique.md) |
| AI Audit Report (27 entries) | [ai-audit-report.md](./ai-audit-report.md) |
| Workflow Design | [WORKFLOW_DESIGN.md](./returning-customer-order/WORKFLOW_DESIGN.md) |
| Review Notes | [REVIEW_NOTES.md](./returning-customer-order/REVIEW_NOTES.md) |
| D1 Load Analysis | [D1_LOAD_RESULT_ANALYSIS.md](./returning-customer-order/D1_LOAD_RESULT_ANALYSIS.md) |
| D2 Stress Analysis | [D2_STRESS_RESULT_ANALYSIS.md](./returning-customer-order/D2_STRESS_RESULT_ANALYSIS.md) |
| D3 Spike Analysis | [D3_SPIKE_RESULT_ANALYSIS.md](./returning-customer-order/D3_SPIKE_RESULT_ANALYSIS.md) |
| D4 Endurance Analysis | [D4_ENDURANCE_RESULT_ANALYSIS.md](./returning-customer-order/D4_ENDURANCE_RESULT_ANALYSIS.md) |
| Bug Reports | [bug-reports/hw05-perf/](../bug-reports/hw05-perf/) |
| Test Summary | [test-summary.md](./test-summary.md) |
