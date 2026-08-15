# Phân tích kết quả tổng hợp — Returning Customer Search and Order

## Phạm vi

Tài liệu tổng hợp kết quả đo lường từ 4 scenario: Load (D1), Stress (D2), Spike (D3) và Endurance (D4) cho workflow "Returning Customer Search and Order" của sinh viên 23127464.

Mọi giá trị trong bảng đều được trace ngược từ raw JTL (sort-based percentile trên cột `elapsed`) và `backend-resource.csv`. Giá trị HTML report chỉ dùng làm cross-check, không phải nguồn gốc.

## Bảng metric tổng hợp — HTTP requests (không bao gồm E2E transaction)

| Metric | Load (D1) | Stress (D2 rerun) | Spike (D3) | Endurance (D4) |
| --- | ---: | ---: | ---: | ---: |
| **Samples** | 4.547 | 7.192 | 2.230 | 20.690 |
| **Failed** | 0 | 0 | 0 | 0 |
| **Error %** | 0,00% | 0,00% | 0,00% | 0,00% |
| **Avg (ms)** | 3,4 | 17,4 | 8,1 | 8,0 |
| **Median (ms)** | 3 | 3 | 3 | 3 |
| **p90 (ms)** | 7 | 59 | 26 | 32 |
| **p95 (ms)** | 9 | 80 | 35 | 40 |
| **p99 (ms)** | 13 | 160 | 49 | 51 |
| **Throughput (req/s)** | 10,95 | 24,09 | 12,03 | 11,52 |
| **Max CPU %** | 0,542¹ | 93,200¹ | 1,011¹ | 0,452¹ |
| **Max RAM (MiB)** | 56,73¹ | 83,98¹ | 85,10¹ | 61,61¹ |

**Nguồn dữ liệu:**
- Samples, Failed, Error %, Avg, Median, p90, p95, p99: raw JTL `elapsed` column, sort-based percentile (PowerShell `Sort-Object` + index).
- Throughput: HTTP sample count / (maxTimestamp + maxElapsed − minTimestamp) / 1000.
- ¹ Max CPU / Max RAM: `backend-resource.csv` — cột `CpuPercentNormalized` × 100 và `WorkingSetMiB`.
- D2 Stress sử dụng kết quả rerun (run folder `20260814-041320-user-executed`) với resource monitor coverage đầy đủ (196 rows, RESOURCE_COVERAGE_OK). Run cũ (`20260814-012626-user-executed`) được giữ làm evidence lịch sử.

## Bảng metric tổng hợp — E2E Transaction (workflow hoàn chỉnh)

| Metric | Load (D1) | Stress (D2 rerun) | Spike (D3) | Endurance (D4) |
| --- | ---: | ---: | ---: | ---: |
| **E2E Count** | 660 | 1.062 | 344 | 2.965 |
| **E2E Failed** | 0 | 0 | 0 | 0 |
| **E2E Avg (ms)** | 11.740 | 11.579 | 10.999 | 12.027 |
| **E2E p95 (ms)** | 14.295 | 14.212 | 14.236 | 14.368 |
| **E2E p99 (ms)** | 15.404 | 15.081 | 15.280 | 15.421 |
| **Workflow/s** | 1,54 | 3,56 | 1,86 | 1,65 |

## Cross-check HTML report

Giá trị HTML `statistics.json` (per-sampler mean/median/p90/p95) nhất quán với raw JTL trong sai số rounding/interpolation. Một số điểm khác biệt nhỏ:
- HTML `Total` bao gồm cả E2E transaction rows; report này tách riêng HTTP và E2E.
- JMeter console summariser cuối cùng (ví dụ `summary = 20 in 00:30:00`) là transaction count, **không phải** tổng HTTP samples.

## Per-endpoint analysis (Endurance — run dài nhất, 20 VU, 30 phút)

| Sampler | Samples | Avg (ms) | p95 (ms) | Vai trò |
| --- | ---: | ---: | ---: | --- |
| RCO-01-Login | 2.965 | 4,0 | 7 | Auth-heavy |
| RCO-02-Search | 2.964 | 2,7 | 5 | Read-heavy |
| RCO-03-ProductDetail | 2.959 | 2,8 | 6 | Read-heavy |
| RCO-04-GetCart | 2.956 | 2,4 | 4 | Transactional |
| RCO-05-AddCart | 2.952 | 2,5 | 5 | Transactional |
| RCO-06-Checkout | 2.949 | 36,3 | 52 | Transactional (nặng nhất) |
| RCO-07-MyOrders | 2.945 | 4,8 | 10 | Read-heavy |


## Endurance threshold statement

> Trên phần cứng này (Intel Core i7-12700H, 20 logical processors, 32 GB RAM; Node.js backend + SQLite), tải bền vững tối đa quan sát được ổn định trong **30 phút** là khoảng **20 VU / 11,5 req/s**, với **p95 = 40 ms** (HTTP), **error rate = 0,00%**, **backend CPU max = 0,452%** (normalized), **RAM max = 61,61 MiB** (working set).

**Cơ sở:**
- Endurance run D4: 20.690 HTTP samples, 0 failure, throughput ổn định 10,95–11,71 req/s xuyên suốt 6 bucket (mỗi 5 phút).
- Working set tăng +4,7 MiB/30 phút (tốc độ giảm dần, ổn định sau T+10); không phải dấu hiệu leak rõ ràng.
- Response time giảm nhẹ / ổn định qua 30 phút; CPU giảm nhẹ.
- Stress D2 cho thấy throughput tuyến tính đến 80 VU (46,27 req/s) với error 0%; nhưng thiếu resource evidence để đánh giá sustainability lâu dài ở mức cao hơn 20 VU.

**Giới hạn:**
- Chỉ 1 measured Endurance run (30 phút). Leak chậm (<0,05 MiB/phút) có thể không bị phát hiện.
- Stress không có resource data trong measured interval do lỗi monitor timing.
- SUT không clear cart sau checkout; order history tích lũy, gây state/payload drift.
