# HW05 - Báo cáo Performance Testing trên EShop

> **Sinh viên:** Hà Bảo Ngọc - 23127300 · **Nhóm:** N08
> **Workflow:** #5 - *Khôi phục tài khoản rồi mua hàng* (`workflows.md`)
> **Công cụ:** Apache JMeter 5.6.3
> **SUT:** EShop backend API - `http://localhost:3000`

---

## 1. Phạm vi và ánh xạ nhóm endpoint (§5)

Một hành trình end-to-end duy nhất, chạy giống hệt nhau ở cả bốn kịch bản
(ba kịch bản chấm điểm chính + Endurance):

```
POST /api/forgot-password  →  ${resetToken}
POST /api/reset-password
POST /api/login            →  ${token}
GET  /api/products
GET  /api/products/${productId}
POST /api/cart
POST /api/checkout
```

| Nhóm endpoint | Endpoint | Vì sao thuộc nhóm này |
|---|---|---|
| Auth-heavy | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` | Cả ba đều xác thực hoặc thay đổi trạng thái tài khoản (sinh token khôi phục, ghi mật khẩu mới, đăng nhập lấy JWT); riêng `POST /api/login` còn chịu cơ chế khoá tài khoản sau 2 lần sai liên tiếp (~180s) - một đặc tính chỉ nhóm auth mới có trong workflow này. |
| Read-heavy | `GET /api/products`, `GET /api/products/${productId}` | Hai lệnh gọi thuần đọc, không có đường ghi nào - không tạo, không sửa dữ liệu, chỉ trả về catalogue (5 sản phẩm) và chi tiết một sản phẩm. |
| Transactional | `POST /api/cart`, `POST /api/checkout` | Cả hai đều thay đổi trạng thái: `POST /api/cart` thêm dòng vào giỏ hàng của phiên, `POST /api/checkout` tạo một bản ghi đơn hàng mới (`orderId`) - đây là hai bước duy nhất trong hành trình tạo dữ liệu mới thay vì chỉ đọc hoặc xác thực. |

Không trùng workflow với thành viên nào khác trong N08 - bảng phân công ở
`workflows.md`.

## 2. Task 1 - Thiết kế và sinh test plan bằng AI (§6)

### 2.1. Quy trình dẫn dắt AI theo từng bước

**Ghi chú phạm vi khi viết báo cáo này:** `reports/ai-audit-report.md` không
có entry nào ghi lại các stage thiết kế Task 1 dưới đây - file này có 0
entry cho tới khi Task 2 (Entry #1, phân tích `.jtl`) được thêm vào. Đây là
một khoảng trống quy trình có thật, phát hiện khi biên soạn báo cáo này,
không phải lựa chọn của báo cáo - không có entry thật để trích nên bảng dưới
dẫn tới commit đã review (`git log`) và bản ghi prompt thô
(`reports/prompt-log.md`) thay vì một số entry không tồn tại.

| Stage | Nội dung | Bằng chứng (commit / transcript) |
|---|---|---|
| 1 | Ánh xạ workflow → sampler | `a1d85853 feat(perf): add Load test plan for Workflow 5 with extractors and assertions` - bộ khung 7 sampler dùng lại nguyên vẹn ở cả Stress/Spike/Endurance |
| 2 | Chọn workload model (VU / ramp-up / think-time) | `062faa8a test(perf): calibrate workload thread counts against this hardware`, `ed535761 feat(perf): parameterise think time and calibrate the arrival-rate axis` - kết luận ở `perf/results/calibration/calibration-20260814.md` |
| 3 | Mô hình hoá dữ liệu CSV | `6c3b360c fix(perf): grow accounts.csv to 1000 rows to cover Spike's 620 threads` |
| 4 | Extractor + assertion | cùng `a1d85853` (JSONPostProcessor cho `resetToken`/`token`/`orderId`, ResponseAssertion + JSONPathAssertion trên từng sampler) |
| 5 | Sinh `.jmx` cho Stress/Spike/Endurance | `739a75cb` (Stress), `e1178ccc` (Spike), `ae206de8` (Endurance) |
| 6 | Rà soát và sửa (human review) | `0dc3aaba fix(perf): stop JMeter from thrashing connections every iteration`; chi tiết ở mục 2.5 |

### 2.2. Ba workload model

| Kịch bản | Tên file | Threads / VU | Ramp-up | Duration | Think-time | Lý do chọn |
|---|---|---:|---|---|---|---|
| Load | `23127300_Load_20260814.jmx` | 50 | 60s | 360s | 1–3s (Uniform) | Calibration quét 25–300 luồng, không tìm được điểm gãy nào trong toàn dải (p95 checkout giữ 7–9ms xuyên suốt); 50 VU giữ nguyên vì đã tạo tải thật (25 req/s, 14% CPU của SUT, ghi mật khẩu tranh chấp thật trên SQLite) mà vẫn chừa khoảng cách rõ với Stress/Spike - xem `calibration-20260814.md` mục "Final conclusions" §1. |
| Stress | `23127300_Stress_20260814.jmx` | 5 bậc × 60 VU (đỉnh 300, staggered `delay` 0/90/180/270/360s) | 30s mỗi bậc | ~600s (mỗi bậc dừng ở t=600) | 100–300ms (siết từ 1–3s mặc định) | Calibration không tìm được trần do SUT gây ra ở cả trục concurrency lẫn trục arrival-rate; khuyến nghị cuối cùng là giữ nguyên staircase 5×60→300 (đã an toàn) và siết think-time xuống 100/200ms - tốc độ arrival nhanh nhất đã đo sạch (0% lỗi thật) ở đúng số luồng này - thay vì đặt think-time về 0 (chưa test ở 300 VU, xem `calibration-20260814.md` mục "Final conclusions" §2). |
| Spike | `23127300_Spike_20260814.jmx` | Nền 20 VU liên tục + 2 đợt đột biến 300 VU (t=90–150s, t=210–270s) | Nền 20s / mỗi đợt đột biến 5s | 300s (nền), mỗi đợt đột biến 60s | Nền 1–3s; đột biến **không có** think-timer (bỏ hẳn, mô phỏng arrival "thiếu kiên nhẫn") | Burst ≥ 3× Load (300 ≥ 150) và ≥ trần Stress an toàn (300 ≥ 300) - cả hai điều kiện đều thoả, giữ nguyên số đã có từ trước calibration (`calibration-20260814.md` mục "Final conclusions" §3). Rủi ro `BindException` do JMeter tự đóng/mở lại socket mỗi iteration (phát hiện ở calibration Extension 2) đã được vá tận gốc ở `perf/config/jmeter-run.properties` trước khi chạy chính thức. |

*Endurance (soak, không phải một trong ba kịch bản chấm điểm chính của §6
nhưng vẫn dùng chung hành trình):* `23127300_Endurance_20260814.jmx`, 40 VU,
ramp 60s, duration 900s (15 phút), think-time 1–3s - xem mục 2.7.

### 2.3. Dữ liệu CSV (§6 - data-driven)

| File | Cột | Số dòng | Dùng ở sampler |
|---|---|---:|---|
| `perf/data/accounts.csv` | `email`, `newPassword`, `shippingAddress` (mỗi VU giữ một hàng riêng, không share) | 1000 | `01 POST /api/forgot-password`, `02 POST /api/reset-password`, `03 POST /api/login`, `07 POST /api/checkout` |
| `perf/data/products.csv` | `productId`, `productName`, `unitPrice`, `quantity` | 5 | `05 GET /api/products/{id}`, `06 POST /api/cart`, `07 POST /api/checkout` (tính `orderTotal` qua `JSR223PreProcessor`) |

1000 dòng `accounts.csv` được chọn để phủ đỉnh concurrency lớn nhất trong
bốn kịch bản - Spike's 620 luồng đồng thời (20 nền + 2×300 đột biến dùng
chung một khoảng thời gian file) - theo đúng nguyên tắc "mỗi VU một hàng
riêng, size theo VU lớn nhất" ở `CLAUDE.md`.

### 2.4. Ba report view khác nhau (§6)

Ba loại listener/report khác nhau, không lặp lại giữa ba kịch bản chấm điểm
chính:

| Kịch bản | Report view | Bằng chứng |
|---|---|---|
| Load | Summary Report (`ResultCollector guiclass="SummaryReport"`) | `perf/evidence/resource-monitor/listener-Load-20260815.png` |
| Stress | Aggregate Report (`ResultCollector guiclass="StatVisualizer"`) | `perf/evidence/resource-monitor/listener-Stress-20260815.png` |
| Spike | View Results Tree - chỉ lỗi (`ResultCollector guiclass="ViewResultsFullVisualizer"`, testname "View Results Tree (errors only)") | `perf/evidence/resource-monitor/listener-Spike-20260815.png` |

Cả bốn kịch bản còn có HTML dashboard sinh từ `.jtl` (`perf/results/html/<stem>/index.html`)
- đây là báo cáo tổng hợp cuối cùng, không tính là một trong ba report view
kể trên (Endurance dùng `SimpleDataWriter`, một writer thô không có GUI,
không tính vào yêu cầu "ba loại khác nhau" vì đó không phải một trong ba
kịch bản chấm điểm chính).

### 2.5. Human review - AI sai gì và vì sao

Hai trường hợp cụ thể, có bằng chứng trong repo (không suy diễn thêm ngoài
hai trường hợp này):

**1. Ngưỡng khoá tài khoản.** `CLAUDE.md` từng ghi một giả định sai - "≥3
lần đăng nhập sai / khoá 30 giây" - trước khi có phép đo black-box. Oracle
(`perf/evidence/smoke-oracle-20260813-230513.txt`, mục OR-2) đo trực tiếp:
tài khoản đã bị khoá **ngay ở lần sai thứ 2** (`FAIL lockout threshold: 2
failed attempt(s) before a login was refused` - thấp hơn giả định ban đầu),
và lock kéo dài **~180 giây**, không phải 30 giây. Ghi chú sai trong
`CLAUDE.md` đã được sửa lại theo đúng số đo được. Đây là lỗi thuộc loại "giả
định chưa kiểm chứng bằng black-box" - mô hình đưa ra một con số hợp lý về
mặt thiết kế điển hình (3 lần là ngưỡng phổ biến trong nhiều hệ thống) nhưng
không khớp với đặc thù cụ thể của EShop, và chỉ bị lộ ra khi đo trực tiếp
qua API chứ không thể suy ra được từ `api_specification.md` (spec không có
một dòng nào nói về lockout).

**2. Tính tổng đơn hàng ở checkout.** Bản nháp ban đầu của sampler `07 POST
/api/checkout` dùng hàm JMeter `${__intSum(...)}` để tính `total_amount` -
một hàm cộng các tham số cố định, không nhân `unitPrice × quantity` theo
từng dòng CSV sản phẩm đã chọn. Được thay bằng một `JSR223PreProcessor`
("Compute order total") tính đúng tổng trước khi gửi request - xác nhận
bằng cách mở `.jmx` và kiểm tra body của sampler `07 POST /api/checkout`:
body gửi `{"total_amount": ${orderTotal},...}` (biến do PreProcessor tính),
không còn dùng `${__intSum(...)}`. Đây là lỗi thuộc giới hạn của model đối
với cú pháp JMeter cụ thể - `__intSum` nghe tên có vẻ đúng chức năng nhưng
ngữ nghĩa thật sự không khớp với việc cần tính tổng tiền từ dữ liệu CSV.

### 2.6. Thực thi và bằng chứng

| Kịch bản | Thời điểm chạy | `.jtl` | HTML report | Ảnh tool + resource monitor |
|---|---|---|---|---|
| Load | 2026-08-15T15:46:19+07:00, 362s | `perf/results/jtl/23127300_Load_20260814.jtl.gz` | `perf/results/html/23127300_Load_20260814/` | `perf/evidence/resource-monitor/Load-20260815-155148.png` |
| Stress | 2026-08-15T15:53:27+07:00, 607s | `perf/results/jtl/23127300_Stress_20260814.jtl.gz` | `perf/results/html/23127300_Stress_20260814/` | `perf/evidence/resource-monitor/Stress-20260815-160117.png` |
| Spike | 2026-08-15T16:05:02+07:00, 306s | `perf/results/jtl/23127300_Spike_20260814.jtl.gz` | `perf/results/html/23127300_Spike_20260814/` | `perf/evidence/resource-monitor/Spike-20260815-160819.png` |
| Endurance | 2026-08-15T16:11:10+07:00, 903s | `perf/results/jtl/23127300_Endurance_20260814.jtl.gz` | `perf/results/html/23127300_Endurance_20260814/` | `perf/evidence/resource-monitor/Endurance-start-20260815-161234.png`, `Endurance-min14-20260815-162532.png` |

Số liệu tóm tắt từng lần chạy (đầy đủ ở `reports/run-manifest.md`, tái lập
được bằng `gunzip -c perf/results/jtl/23127300_<Scenario>_20260814.jtl.gz >
/tmp/x.jtl && python3 perf/scripts/analyze_jtl.py /tmp/x.jtl`):

| Kịch bản | Samples | Error % | p95 (ms, nearest-rank) | Throughput (req/s) |
|---|---:|---:|---:|---:|
| Load | 8,210 | 0.00 | 7 | 22.958 |
| Stress | 595,741 | 0.00 | 4 | 993.833 |
| Spike | 455,302 | 0.00 | **140** (nearest-rank; dashboard `pct2ResTime` nội suy tuyến tính ghi **136.0** - cùng lần chạy, khác phương pháp, cả hai đều đúng) | 1533.726 |
| Endurance | 17,346 | 0.00 | 7 | 19.327 |

#### Cấu hình phần cứng

| Hạng mục | Giá trị |
|---|---|
| Hostname | `hbns-MacBook-Pro.local` - HW05 là bài đầu tiên trong repo này ghi lại hostname; không có baseline HW03/HW04 nào trong repo để đối chiếu, hostname này lập baseline cho các bài sau. |
| Chip / CPU | Apple M4 Pro, 12 lõi |
| RAM | 24 GB (25,769,803,776 bytes) |
| OS | macOS 26.5.2 (build 25F84) |
| Java | OpenJDK 21.0.10 (Homebrew) |
| JMeter | 5.6.3 |

Nguồn: `perf/evidence/hardware/hardware-spec.txt` (dòng version JMeter được
bổ sung khi biên soạn báo cáo này - lệnh capture ban đầu chỉ bắt được cảnh
báo khởi động, không bắt được banner phiên bản; số 5.6.3 khớp với
`perf/config/jmeter-run.properties` và mọi lần chạy khác trong repo).

#### Xử lý khoá tài khoản giữa các lần chạy (§6)

`perf/scripts/run-scenario.sh` gọi `perf/scripts/reset-lockout.sh` **trước**
mỗi lần chạy để xoá `locked_until`/`login_attempts` còn sót từ lần trước, và
gọi lại lần nữa **sau** khi chạy để đo `locked_before` hậu-run. Script này
chỉ in kết quả ra console, không ghi file trong repo, nên bốn dòng
`locked_before=0` sau khi chạy trong `reports/run-manifest.md` **không có
file lưu trực tiếp** - chúng được đối chiếu độc lập (corroborate, không
phải archive) qua hai nguồn: (1) ba trong bốn khung ảnh bằng chứng cho thấy
dòng *trước khi chạy* `locked_before=0 cleared=0 attempts_pending=0
remaining=0` ngay trong terminal pane (ví dụ khung Endurance ở trên); (2) cả
bốn `.jtl` đều có 0 lỗi ở `03 POST /api/login` trên tổng 1.076.599 mẫu -
nếu có tài khoản nào bị khoá giữa lúc chạy, sampler này sẽ ghi nhận lỗi, và
không có lỗi nào như vậy xuất hiện. Không lần chạy nào trong bốn lần chấm
điểm kích hoạt cơ chế khoá.

### 2.7. Ngưỡng chịu tải của máy (endurance / soak)

Endurance chạy 40 VU liên tục trong 15 phút (900s cấu hình, 903s thực tế kể
cả overhead khởi động JMeter/SUT).

- **RPS ổn định tối đa quan sát được:** ~19.3 req/s gộp cả 7 sampler trên
  toàn bộ 903s (19.327 theo `run-manifest.md`; 19.92 nếu bỏ 60s đầu ramp-up
  - hai số gần nhau, xác nhận hệ thống vào trạng thái ổn định gần như ngay
  từ đầu, không cần loại bỏ nhiều dữ liệu ramp).
- **p95 không trượt ở bất kỳ thời điểm nào trong 15 phút:** p95 toàn bộ run
  là **7ms** và p95 sau khi bỏ 60s ramp-up là **6ms**
  (`perf/results/ground-truth.txt`) - bằng phẳng từ đầu tới cuối, không có
  điểm nào latency dịch chuyển theo thời gian.
- **Trần bộ nhớ (RSS của SUT):** quan sát từ hai khung Activity Monitor -
  **69.0 MB lúc bắt đầu → 83.3 MB ở phút 14**
  (`perf/evidence/resource-monitor/Endurance-start-20260815-161234.png`,
  `Endurance-min14-20260815-162532.png`) - tăng ròng khoảng 14.3MB sau 15
  phút tải liên tục. Bản ghi CSV mức-giây thô hơn
  (`perf/results/resource/23127300_Endurance_20260814.csv`) cho cùng dải giá
  trị (67–98 MB) nhưng **dao động không đơn điệu** theo từng giây thay vì
  một đường tăng đều - nghĩa là mức tăng ròng quan sát được ở hai khung ảnh
  là thật, nhưng ở độ phân giải một giây, tín hiệu bị nhiễu (GC/bộ nhớ đệm
  của Node) đủ lớn để không thể khẳng định đó là rò rỉ bộ nhớ tuyến tính chỉ
  từ 15 phút dữ liệu này - cần một lần chạy soak dài hơn (mục đích chính xác
  của kịch bản nightly Endurance trong `reports/continuous-perf-proposal.md`
  §3) để phân biệt "tăng chậm thật" khỏi "răng cưa của bộ cấp phát bộ nhớ".

### 2.8. Video demo

| Nội dung | Link |
|---|---|
| Task 1 - Load/Stress/Spike/Endurance, tool + resource monitor cùng khung hình | https://youtu.be/0TcSNEaEyMA |
| Agent Skill demo (§7) | https://youtu.be/yC2Ksdpl1og |

### 2.9. Bug / performance issue đã ghi nhận

Cả bốn lần chạy chấm điểm không sinh ra lỗi thật nào từ SUT. Spike đã được
rerun sau khi sửa binding tài khoản theo từng VU và không còn lỗi HTTP 400 ở
`02 POST /api/reset-password`. Các defect có thể báo cáo đến từ oracle black-box
chạy riêng ở `perf/evidence/smoke-oracle-20260813-230513.txt`. Bốn file bug
report cục bộ đã được tạo dưới `bug-reports/` và publish thành GitHub Issue
riêng cho từng defect.

| ID | Loại | Severity | Bằng chứng quan sát được | Báo cáo / GitHub |
|---|---|---|---|---|
| BUG-FR02-001 | Undocumented behaviour | Major / P1 | Tài khoản bị khoá ngay sau **2** lần đăng nhập sai liên tiếp, khoá kéo dài **~180 giây**; `POST /api/login` trả **403** trong lúc khoá, ngoài phạm vi hợp đồng tài liệu vì `api_specification.md` không mô tả lockout. | `bug-reports/BUG-FR02-001.md`; https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/250 |
| BUG-FR06-001 | Internal inconsistency | Minor / P2 | `GET /api/products/:id` trả `price` với **kiểu JSON không nhất quán** giữa các id - id lẻ (1, 3, 5) trả số, id chẵn (2, 4) trả chuỗi. | `bug-reports/BUG-FR06-001.md`; https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/248 |
| BUG-FR06-002 | Contract deviation | Minor / P2 | `GET /api/products/:id` với id không tồn tại trả **HTTP 200, body `{}`** thay vì not found. | `bug-reports/BUG-FR06-002.md`; https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/249 |
| BUG-FR03-001 | Contract deviation | Minor / P2 | `resetToken` trả về là **4 chữ số** (ví dụ `5621`, `9832`), trong khi `api_specification.md` tài liệu hoá ví dụ 6 chữ số (`"123456"`, dòng 42 và 50). | `bug-reports/BUG-FR03-001.md`; https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/251 |

## 3. Task 2 - Phân tích của AI và cuộc săn lỗi diễn giải

Xem [`ai-analysis-review.md`](ai-analysis-review.md) (rà soát) và
[`../perf/results/ai-analysis-raw.md`](../perf/results/ai-analysis-raw.md)
(phân tích gốc, kèm ghi chú phương pháp ở đầu file - phiên viết báo cáo này
không được phép spawn subagent, xem chi tiết trong file đó).

## 4. Task 3 - Đề xuất Continuous Performance Testing (G9.6)

Xem [`continuous-perf-proposal.md`](continuous-perf-proposal.md).

## 5. Agent Skill (§7)

Skill đã được tạo ở `.claude/skills/perf-test-workflow/SKILL.md`, kèm
template `.claude/skills/perf-test-workflow/templates/journey.jmx.template`.
Nội dung skill tham số hoá vòng lặp kiểm thử hiệu năng cho workflow EShop
khác Workflow 5: map endpoint sang sampler, calibration trước khi chọn tải,
thiết kế CSV tránh va chạm VU, extractor/assertion có default thất bại rõ,
chạy JMeter headless qua script, thu `.jtl`/HTML/resource evidence và phân
tích lại từ raw log. Video demo tương ứng dùng Workflow 3 trong
`reports/video-script-skill.md`.

## 6. Phụ lục AI

- [`ai-audit-report.md`](ai-audit-report.md) - phụ lục §9
- [`prompt-log.md`](prompt-log.md) - bản ghi thô, không lọc
- [`ai-critique.md`](ai-critique.md) - bài phê bình 200–300 từ (§10)
