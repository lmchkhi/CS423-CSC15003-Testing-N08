# HW05 — Script narration video Task 1 (Kiểm thử hiệu năng)

> **Yêu cầu:** ≥ 7 phút, tiếng Việt, giọng của sinh viên, công cụ và
> Activity Monitor phải xuất hiện cùng khung hình trong suốt video.
> Tên file phải hiển thị rõ trên màn hình.

---

## Chuẩn bị trước khi quay

- Mở Activity Monitor → tab CPU → cột "Process Name" hiển thị `node` (SUT).
- Mở Terminal trong cùng màn hình — cửa sổ JMeter headless sẽ chạy ở đây.
- Cài sẵn layout: Terminal bên trái (~60 %), Activity Monitor bên phải (~40 %).
- Kiểm tra: `bash perf/scripts/sut.sh status` in ra URL và pid.
- Đặt font Terminal ≥ 16 pt để số liệu đọc được qua video.

---

## Phần 0 — Giới thiệu (≈ 0:00–0:45)

> *(Nói trước khi bật ghi màn hình nếu muốn, hoặc ghi thẳng)*

*"Xin chào, em là Hà Bảo Ngọc, MSSV 23127300, nhóm N08,
môn CS423/CSC15003 Kiểm thử Phần mềm.*

*Trong video này em sẽ trình bày Task 1 của HW05: chạy bốn kịch bản kiểm
thử hiệu năng — Load, Stress, Spike và Endurance — trên SUT EShop backend
chạy ở localhost:3000.*

*Workflow được kiểm thử là Workflow 5: đặt lại mật khẩu rồi thực hiện một
đơn mua hàng. Hành trình này gồm 7 sampler: forgot-password, reset-password,
login, products-list, product-detail, cart và checkout.*

*Tất cả bốn test plan được đặt tên theo định dạng
`23127300_{ScenarioType}_{YYYYMMDD}.jmx`, chạy bằng JMeter 5.6.3 headless
trên máy Apple M4 Pro 12-core, 24 GB RAM."*

---

## Phần 1 — Môi trường và cửa sổ (≈ 0:45–1:30)

*"Trước tiên em sẽ cho thấy bố cục màn hình làm việc."*

**Hành động:**
1. Phóng to Terminal và Activity Monitor — phải cùng khung hình.
2. Gõ `bash perf/scripts/sut.sh status` — show `SUT running on http://localhost:3000 (pid XXXX)`.
3. Chỉ vào cột CPU của `node` trong Activity Monitor — đang ~1 % (idle).
4. Gõ `ls perf/plans/jmeter/` — show 4 file `.jmx` với MSSV và ngày 20260814.
5. Gõ `ls perf/results/jtl/` — show 4 file `.jtl.gz` đã có.

*"Đây là bốn test plan đã được em chạy. em sẽ load lại `.jtl` và mở HTML
dashboard để các bạn thấy kết quả thực tế."*

---

## Phần 2 — Load run (≈ 1:30–2:45)

*"Kịch bản Load: 50 virtual user (VU), ramp-up 60 giây, chạy 360 giây."*

**Hành động:**
1. Gõ lệnh load lại dashboard:
   ```
   open perf/results/html/23127300_Load_20260814/index.html
   ```
2. Trình bày HTML dashboard trong trình duyệt:
   - Trỏ vào biểu đồ throughput: *"~22 req/s ổn định sau ramp."*
   - Trỏ vào cột "Error %": *"0.00 % — không có lỗi nào."*
   - Trỏ vào Response Time Percentiles: *"p95 = 7 ms — rất thấp."*
3. Chuyển về Terminal, show Summary Report listener:
   ```
   gunzip -c perf/results/jtl/23127300_Load_20260814.jtl.gz | \
     python3 perf/scripts/analyze_jtl.py /dev/stdin
   ```
   Trỏ vào dòng `ALL`.
4. Mở ảnh bằng chứng:
   ```
   open perf/evidence/resource-monitor/Load-20260814-220824.png
   ```
   *"CPU của node tại đỉnh Load: [đọc số từ ảnh] — máy còn nhiều tài nguyên."*

---

## Phần 3 — Stress run (≈ 2:45–4:00)

*"Kịch bản Stress: 5 bậc, mỗi bậc tăng 60 VU, nghỉ 100–300 ms giữa các
request, đỉnh 300 VU."*

**Hành động:**
1. ```
   open perf/results/html/23127300_Stress_20260814/index.html
   ```
2. Trình bày Aggregate Report:
   - Trỏ vào biểu đồ throughput — hình thang tăng theo từng bậc.
   - *"~983 req/s tổng throughput ở đỉnh — 590 nghìn mẫu, 0.00 % lỗi."*
3. Chỉ vào biểu đồ Response Time Over Time — p95 vẫn bằng phẳng qua các bậc.
4. Mở ảnh bằng chứng:
   ```
   open perf/evidence/resource-monitor/Stress-20260814-222150.png
   ```
   *"CPU đỉnh của SUT trong Stress: 61.2 % của 1 lõi — chưa đến 6 % tổng
   năng lực máy. Không tìm được điểm gãy trong bộ calibration."*
5. Mở listener screenshot:
   ```
   open perf/evidence/resource-monitor/listener-Stress.png
   ```
   *"Đây là Aggregate Report từ JMeter GUI, load từ file `.jtl` đã chấm điểm."*

---

## Phần 4 — Spike run (≈ 4:00–5:15)

*"Kịch bản Spike: nền 20 VU + 2 đợt burst 300 VU, không think-time trong burst."*

**Hành động:**
1. ```
   open perf/results/html/23127300_Spike_20260814/index.html
   ```
2. Trỏ vào biểu đồ Active Threads Over Time — rõ 2 đỉnh.
3. Trỏ vào cột lỗi:
   *"Có 157 lỗi HTTP 400 trên sampler `02 POST /api/reset-password` — những
   lỗi này là nhiễu của bộ khung kiểm thử, không phải lỗi của SUT.
   Nguyên nhân: CSV Data Set Config dùng chung con trỏ cho 620 luồng trong
   burst; hai luồng cùng giữ một dòng tài khoản, luồng sau ghi đè resetToken
   trước khi luồng trước kịp dùng."*
4. Dẫn chứng: mở `reports/run-manifest.md`, trỏ vào hàng Spike, cột `lỗi thật`.
5. Mở ảnh:
   ```
   open perf/evidence/resource-monitor/Spike-20260814-222701.png
   ```
   *"CPU đỉnh 126.7 % của 1 lõi — máy 12 lõi, vẫn chỉ ~11 % tổng CPU."*
6. Mở View Results Tree listener screenshot:
   ```
   open perf/evidence/resource-monitor/listener-Spike.png
   ```

---

## Phần 5 — Endurance run (≈ 5:15–6:20)

*"Kịch bản Endurance: 40 VU, ramp 60 giây, chạy 15 phút — kiểm tra memory
leak và degradation theo thời gian."*

**Hành động:**
1. ```
   open perf/results/html/23127300_Endurance_20260814/index.html
   ```
2. Trỏ vào biểu đồ Response Time Over Time — phẳng suốt 15 phút.
3. *"p95 giữ ở 5 ms từ đầu đến cuối, throughput ~19 req/s ổn định."*
4. So sánh hai ảnh RSS:
   ```
   open perf/evidence/resource-monitor/Endurance-start-rss-20260814-223710.png
   open perf/evidence/resource-monitor/Endurance-min14-rss-20260814-224652.png
   ```
   *"RSS bắt đầu: 67.8 MB; phút 14: 79.8 MB — tăng nhưng không đơn điệu,
   không có dấu hiệu memory leak rõ ràng. Để kết luận chắc cần time-series
   liên tục — đây là giới hạn của bộ evidence hiện tại."*

---

## Phần 6 — Ba listener view và HTML dashboard (≈ 6:20–7:00)

*"Mỗi kịch bản dùng một loại listener khác nhau — đây là yêu cầu của HW05."*

**Hành động:**
1. Mở 3 screenshot listener:
   - `listener-Load.png` — Summary Report
   - `listener-Stress.png` — Aggregate Report
   - `listener-Spike.png` — View Results Tree (errors only)
2. *"Load dùng Summary Report, Stress dùng Aggregate Report, Spike dùng
   View Results Tree chỉ hiển thị các request lỗi. Endurance dùng Simple
   Data Writer — không có screenshot vì listener đó không render table."*
3. Mở lại một HTML dashboard (Load hoặc Stress) và trỏ vào:
   - Response Time Percentiles panel
   - Throughput panel
   - "số mẫu tổng" trong summary box.

---

## Phần 7 — Tổng kết (≈ 7:00–7:30)

*"Tóm lại: cả bốn kịch bản đều hoàn thành với kết quả đo được từ log thô.*

*Load: 8,193 mẫu, 0 % lỗi, p95 7 ms.*
*Stress: 590,123 mẫu, 0 % lỗi, p95 4 ms, throughput ~983 req/s.*
*Spike: 466,165 mẫu, 157 lỗi harness artifact (0 lỗi SUT thật), p95 139 ms.*
*Endurance: 17,327 mẫu, 0 % lỗi, p95 5 ms ổn định suốt 15 phút.*

*Tất cả file `.jtl` đã được gzip và commit vào nhánh `HW05/23127300`.
Chi tiết phân tích đầy đủ có trong `reports/main-report.md`.*

*Cảm ơn.*"

---

## Checklist §14 trước khi export

- [ ] Công cụ (JMeter terminal hoặc HTML dashboard) và Activity Monitor cùng khung hình liên tục
- [ ] Giọng sinh viên trong suốt video
- [ ] Tên file `.jmx` và `.jtl` hiển thị rõ (zoom nếu cần)
- [ ] Mỗi kịch bản có ≥ 1 đoạn phân tích số liệu (không chỉ show màn hình)
- [ ] Tổng thời lượng ≥ 7 phút sau khi cắt ghép
- [ ] Độ phân giải ≥ 1080p, frame rate ≥ 30fps (OBS recommended)
