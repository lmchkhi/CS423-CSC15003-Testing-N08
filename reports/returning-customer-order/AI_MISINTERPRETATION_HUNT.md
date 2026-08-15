# AI Misinterpretation Hunt — Returning Customer Search and Order

## Mục đích

Tài liệu này tuân thủ Task 2 của HW05: chủ động tạo một bản phân tích AI ban đầu từ raw JTL, để draft đó thực sự chứa các lỗi diễn giải điển hình, rồi tự phát hiện và sửa từng lỗi bằng cách đối chiếu raw data thật.

---

## Phần 1: Bản phân tích AI ban đầu

> **Draft AI Analysis:**
>
> "Kết quả Load test cho thấy hệ thống xử lý 5.207 samples với error rate 0% và average response time 11.740 ms. Throughput đạt 1,54 req/s. Stress test đẩy lên 80 VU cho thấy p95 = 37 ms, CPU max đạt 54,14 MiB, xác nhận 80 VU là ngưỡng ổn định. Spike test cho thấy hệ thống có memory leak nghiêm trọng — RAM tăng từ 53 lên 85 MiB trong vài phút. Endurance test 30 phút với 20 VU có throughput 11,52 req/s; p90 = 40 ms; Search endpoint là bottleneck chính với p95 cao nhất là 52 ms. Checkout endpoint chỉ mất trung bình 7,9 ms, nhanh hơn nhiều so với mức dự kiến. Error rate tổng cộng trong Stress là 0,03%. Dựa trên Stress đạt 80 VU, endurance threshold là 80 VU sustained."

---

## Phần 2: Phát hiện lỗi và sửa chữa

### Lỗi #1 — Nhầm Average với Percentile

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Average response time 11.740 ms" — trích dẫn như thể đây là HTTP avg |
| **Giá trị đúng** | `11.740 ms` là **E2E workflow avg**, bao gồm 6 think timer (6–18 giây). HTTP avg thực tế của Load chỉ là **3,4 ms** |
| **Raw evidence** | `tests/.../load/20260814-001003-user-executed/result.jtl` — HTTP elapsed sort-based avg = 3,4 ms; E2E label `RCO-E2E-ReturningCustomerOrder` avg = 11.740 ms |
| **Verdict** | Sai — gán metric tổng thể E2E cho HTTP request |
| **Correction** | HTTP avg Load = 3,4 ms; E2E avg (có think time) = 11.740 ms. Hai giá trị phải được tách biệt rõ ràng |
| **Tại sao AI bỏ lỡ** | AI không phân biệt label `RCO-E2E-*` (transaction controller) với 7 HTTP sampler labels; gộp tất cả row và lấy avg chung |

### Lỗi #2 — Gán metric tổng thể cho một endpoint / ngược lại

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "5.207 samples" — gọi đây là tổng request |
| **Giá trị đúng** | `5.207` là tổng **tất cả JTL rows** (gồm cả 660 E2E transaction rows). HTTP requests thực tế chỉ là **4.547** |
| **Raw evidence** | `result.jtl` Load — 5209 dòng (gồm header), label `RCO-E2E-*`: 660 row, HTTP labels: 4.547 row |
| **Verdict** | Sai — trộn transaction rows vào HTTP sample count |
| **Correction** | Phải tách: 4.547 HTTP requests + 660 E2E transactions (trong đó 640 hoàn chỉnh, 20 bị scheduler cutoff) |
| **Tại sao AI bỏ lỡ** | JMeter JTL ghi cả transaction controller và child sampler trên cùng schema; AI đếm tất cả dòng mà không lọc theo label |

### Lỗi #3 — Nhầm RAM với CPU; nhầm đơn vị

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "CPU max đạt 54,14 MiB" |
| **Giá trị đúng** | `54,14 MiB` là **Working Set (RAM)** pre-run của Stress, không phải CPU. CPU Stress **không xác định** vì resource monitor bị lệch thời gian |
| **Raw evidence** | `tests/.../stress/.../backend-resource.csv` — chỉ 6 row trước workload; cột `WorkingSetMiB` = 54,137; cột `CpuPercentNormalized` = 0 (pre-run idle) |
| **Verdict** | Sai — trộn đơn vị CPU/RAM và dùng pre-run baseline thay cho measured data |
| **Correction** | Stress CPU/RAM trong measured interval = **Không xác định** do monitor bị dừng ~35 giây trước JMeter bắt đầu |
| **Tại sao AI bỏ lỡ** | AI đọc file `backend-resource.csv` mà không kiểm tra timestamp so với measured interval. 6 row pre-run trông hợp lệ về format nhưng hoàn toàn ngoài workload window |

### Lỗi #4 — Nhầm max thread count với ngưỡng stress ổn định

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "80 VU là ngưỡng ổn định" và "endurance threshold là 80 VU sustained" |
| **Giá trị đúng** | 80 VU là **max thread count** trong JMeter schedule, không phải sustained capacity. Endurance chỉ chạy ở **20 VU** và ngưỡng bền vững quan sát được là **20 VU / 11,5 req/s** |
| **Raw evidence** | Stress JTL `allThreads` max = 80; nhưng mỗi bậc chỉ kéo dài 60 giây. Endurance JTL chạy 30 phút ở 20 VU |
| **Verdict** | Sai — nhầm peak concurrent thread với sustainable capacity |
| **Correction** | 80 VU là peak concurrent count trong staircase Stress (mỗi bậc 60 giây). Endurance threshold thực nghiệm = 20 VU / 11,5 req/s sustained 30 phút |
| **Tại sao AI bỏ lỡ** | Stress test đạt 80 VU với 0% error, nên AI ngầm coi đó là "stable". Nhưng 60 giây/bậc quá ngắn để kết luận bền vững; cần Endurance run dài hơn để xác minh |

### Lỗi #5 — Gọi memory tăng là leak quá sớm

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Memory leak nghiêm trọng — RAM tăng từ 53 lên 85 MiB" |
| **Giá trị đúng** | Spike working set tăng từ 52,8 → 85,1 MiB rồi **giảm về 54,0 MiB** tại recovery. Endurance working set chỉ tăng +4,7 MiB/30 phút, tốc độ giảm dần |
| **Raw evidence** | `tests/.../spike/.../backend-resource.csv` — baseline avg 53,8, spike avg 69,0, recovery avg 54,0 MiB. `tests/.../endurance/.../backend-resource.csv` — bucket T+25-30m avg 61,2 MiB, tốc độ tăng 0,05 MiB/phút |
| **Verdict** | Sai — RAM tăng lúc spike là transient; đã phục hồi khi VU giảm. Không phải leak |
| **Correction** | Working set tăng lúc spike là do concurrent request/cart/order accumulation; giảm về baseline sau spike là hành vi bình thường. Endurance +4,7 MiB/30 phút phù hợp với state accumulation (order/cart SQLite), tốc độ giảm dần, không phải unbounded leak |
| **Tại sao AI bỏ lỡ** | AI chỉ nhìn peak value mà không theo dõi xu hướng sau spike. Không phân biệt transient spike memory với persistent leak pattern |

### Lỗi #6 — Nhầm p90 thành p95

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "p90 = 40 ms" cho Endurance |
| **Giá trị đúng** | p90 Endurance HTTP = **32 ms**; p95 = **40 ms** |
| **Raw evidence** | `tests/.../endurance/.../result.jtl` — sort-based: index 90% = 32 ms, index 95% = 40 ms |
| **Verdict** | Sai — hoán đổi nhãn p90/p95 |
| **Correction** | p90 = 32 ms, p95 = 40 ms |
| **Tại sao AI bỏ lỡ** | Hai giá trị gần nhau (32 vs 40); AI đọc nhầm vị trí percentile trong output. Cần ghi rõ label khi trích dẫn |

### Lỗi #7 — Gán metric endpoint sai

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Search endpoint là bottleneck chính với p95 cao nhất là 52 ms" |
| **Giá trị đúng** | p95 = 52 ms là của **RCO-06-Checkout**, không phải Search. Search p95 chỉ là **5 ms** (Endurance) |
| **Raw evidence** | `tests/.../endurance/.../result.jtl` — label `RCO-06-Checkout` sort-based p95 = 52 ms; label `RCO-02-Search` sort-based p95 = 5 ms |
| **Verdict** | Sai — gán metric của Checkout cho Search |
| **Correction** | Checkout (p95 = 52 ms, avg = 36,3 ms) là endpoint nặng nhất do SQLite write; Search (p95 = 5 ms) là read-only và rất nhanh |
| **Tại sao AI bỏ lỗi** | AI có thể nhầm tên label khi nhìn danh sách per-sampler; "search" nghe trực giác như database-heavy nhưng thực tế SUT chỉ dùng `LIKE` trên 5 sản phẩm seed |

### Lỗi #8 — Tính throughput sai duration

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Throughput đạt 1,54 req/s" — gán cho HTTP requests |
| **Giá trị đúng** | 1,54 là **workflow/s** (E2E transaction rate). HTTP throughput Load = **10,95 req/s** |
| **Raw evidence** | Load JTL — 4.547 HTTP / 415,2 giây = 10,95 req/s; 640 completed E2E / 416,999 giây ≈ 1,535 workflow/s |
| **Verdict** | Sai — trộn E2E throughput với HTTP throughput |
| **Correction** | HTTP throughput = 10,95 req/s; workflow throughput = 1,54 workflow/s |
| **Tại sao AI bỏ lỡ** | Giống lỗi #1 — không tách E2E transaction khỏi HTTP sampler |

### Lỗi #9 — Đọc sai thang đo error percentage

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Error rate tổng cộng trong Stress là 0,03%" |
| **Giá trị đúng** | Error rate Stress = **0,00%** (0 failed / 7.293 HTTP samples) |
| **Raw evidence** | `tests/.../stress/.../result.jtl` — cột `success`: toàn bộ 7.293 HTTP rows = `true` |
| **Verdict** | Sai — bịa số error không tồn tại |
| **Correction** | 0 failed samples trong tất cả 4 scenario. Error rate = 0,00% cho mọi scenario |
| **Tại sao AI bỏ lỡ** | AI có thể nhầm lẫn giữa scheduler-cutoff transaction rows (80 row bị cắt) với failed samples. Cutoff transaction có `success=true` vì JMeter đánh dấu chúng là hoàn tất bình thường |

### Lỗi #10 — Bỏ qua overhead của listener/load-generator

| Mục | Chi tiết |
| --- | --- |
| **Nhận định AI ban đầu** | "Checkout endpoint chỉ mất trung bình 7,9 ms" — gán cho tất cả scenario |
| **Giá trị đúng** | 7,9 ms là avg Checkout của **Load (20 VU)** chỉ. Endurance (cũng 20 VU nhưng 30 phút) avg Checkout = **36,3 ms** do state accumulation |
| **Raw evidence** | Load JTL Checkout avg = 7,9 ms (645 samples); Endurance JTL Checkout avg = 36,3 ms (2.949 samples) |
| **Verdict** | Sai — dùng metric ngắn hạn để mô tả behavior dài hạn |
| **Correction** | Checkout avg tăng từ 7,9 ms (Load, 6 phút) lên 36,3 ms (Endurance, 30 phút) do SQLite database file tăng kích thước khi mỗi VU tạo ~150 orders. View Results Tree listener (Spike) cũng có overhead nhất định |
| **Tại sao AI bỏ lỗi** | AI lấy giá trị từ scenario đầu tiên mà không so sánh xuyên scenario. State accumulation (cart không clear, orders tích lũy) là confounder đặc thù của SUT này |

---

## Tổng kết Misinterpretation Hunt

| # | Loại lỗi | Danh mục (evidence-analysis.md) | Mức nghiêm trọng |
| --- | --- | --- | --- |
| 1 | Nhầm average E2E với HTTP avg | #4 — gán metric tổng thể cho endpoint | Cao |
| 2 | Gộp transaction rows vào HTTP count | #4 — gán metric tổng thể cho endpoint | Cao |
| 3 | Nhầm RAM pre-run với CPU measured | #4 + #11 — nhầm metric + bỏ qua overhead | Cao |
| 4 | Nhầm max thread với sustained capacity | #8 — nhầm max thread count với ngưỡng ổn định | Cao |
| 5 | Gọi transient spike memory là leak | #9 — gọi memory tăng là leak quá sớm | Trung bình |
| 6 | Hoán đổi p90/p95 | #2 — nhầm p90 thành p95 | Trung bình |
| 7 | Gán p95 Checkout cho Search | #4 — gán metric endpoint sai | Cao |
| 8 | Nhầm E2E throughput với HTTP throughput | #6 — tính throughput sai duration/scope | Cao |
| 9 | Bịa error rate 0,03% | #3 — đọc sai thang đo error percentage | Trung bình |
| 10 | Dùng Load Checkout avg cho kết luận chung | #11 — bỏ qua listener/state accumulation | Trung bình |

**10 lỗi được phát hiện**, bao gồm ít nhất 10/13 loại lỗi được liệt kê trong `evidence-analysis.md`.
