# Run manifest — HW05 performance runs

Một dòng cho mỗi lần chạy thực sự, ghi ngay khi chạy xong. Kết quả được ghi
đúng như đã xảy ra: một lần chạy có lỗi vẫn giữ nguyên log và report — tỉ lệ lỗi
dưới tải là bằng chứng, không phải thứ để giấu.

| Kịch bản | Test plan | Công cụ | Bắt đầu (ISO) | Thời lượng | Threads/VU | Samples | Error % | p95 (ms) | Throughput (req/s) | `.jtl` | HTML report | Ảnh bằng chứng |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|---|---|
| Load | `23127300_Load_20260814.jmx` | JMeter | 2026-08-14T22:06:20+07:00 | 362s | 50 | 8193 | 0.0 | 7 | 22.875 | `perf/results/jtl/23127300_Load_20260814.jtl.gz` | `perf/results/html/23127300_Load_20260814/` | `perf/evidence/resource-monitor/Load-20260814-220824.png` |
| Stress | `23127300_Stress_20260814.jmx` | JMeter | 2026-08-14T22:13:48+07:00 | 607s | 300 (5×60 bậc) | 590123 | 0.0 | 4 | 983.774 | `perf/results/jtl/23127300_Stress_20260814.jtl.gz` | `perf/results/html/23127300_Stress_20260814/` | `perf/evidence/resource-monitor/Stress-20260814-222150.png` |
| Spike | `23127300_Spike_20260814.jmx` | JMeter | 2026-08-14T22:25:17+07:00 | 306s | 20 nền + 2×300 đột biến | 466165 | 0.034 | 139 | 1565.505 | `perf/results/jtl/23127300_Spike_20260814.jtl.gz` | `perf/results/html/23127300_Spike_20260814/` | `perf/evidence/resource-monitor/Spike-20260814-222701.png` |
| Endurance | `23127300_Endurance_20260814.jmx` | JMeter | 2026-08-14T22:32:47+07:00 | 903s | 40 | 17327 | 0.0 | 5 | 19.297 | `perf/results/jtl/23127300_Endurance_20260814.jtl.gz` | `perf/results/html/23127300_Endurance_20260814/` | `perf/evidence/resource-monitor/Endurance-start-rss-20260814-223710.png`, `perf/evidence/resource-monitor/Endurance-min14-rss-20260814-224652.png` |

**Số lần chạy đã ghi:** 4

## Trạng thái khoá tài khoản (`locked_before`) và tài nguyên đỉnh

`locked_before` lấy từ `perf/scripts/reset-lockout.sh` chạy **sau** mỗi lần chạy.
Giá trị khác 0 nghĩa là lần chạy đó đã kích hoạt cơ chế khoá tài khoản (2 lần
đăng nhập sai liên tiếp khoá ~180 s) và tỉ lệ lỗi phải được đọc kèm ghi chú đó.

| Kịch bản | `locked_before` trước khi chạy | `locked_before` sau khi chạy | CPU đỉnh của SUT | RSS đỉnh của SUT | RSS đỉnh của JMeter |
|---|---:|---:|---:|---:|---:|
| Load | 0 | **0** | 16.0 % | 98 MB | 494 MB |
| Stress | 0 | **0** | 61.2 % | 168 MB | 930 MB |
| Spike | 0 | **0** | 126.7 % | 173 MB | 987 MB |
| Endurance | 0 | **0** | 12.5 % | 99 MB | 775 MB |

Cả bốn lần chạy đều có `locked_before=0` sau khi chạy: **không lần nào chạm cơ
chế khoá tài khoản**, nên các tỉ lệ lỗi ở bảng trên đọc trực tiếp được, không cần
trừ đi phần lỗi do khoá tài khoản.

## Lỗi: lỗi thật của SUT so với nhiễu do bộ khung kiểm thử

| Kịch bản | Tổng lỗi | Lỗi thật của SUT | Nhiễu do bộ khung | Chi tiết |
|---|---:|---:|---:|---|
| Load | 0 | 0 | 0 | — |
| Stress | 0 | 0 | 0 | — |
| Spike | 157 | **0** | **157** | Toàn bộ là HTTP 400 ở `02 POST /api/reset-password`, chỉ xảy ra trong hai cửa sổ đột biến (t=90–150 s: 81 lỗi; t=210–270 s: 76 lỗi; ngoài hai cửa sổ: 0). 151/157 rơi vào nhóm luồng nền 20 VU. Nguyên nhân: `CSV Data Set Config` dùng `recycle=true` với con trỏ dùng chung cho 620 luồng, ~66.600 lượt journey trên kho 1000 tài khoản — hai luồng cùng giữ một email thì `forgot-password` của luồng sau ghi đè `resetToken` của luồng trước. Đây là hạn chế của bộ dữ liệu kiểm thử, **không phải lỗi của EShop**. |
| Endurance | 0 | 0 | 0 | — |

Không lần chạy nào ghi nhận `BindException` / "Can't assign requested address"
(kiểm tra bằng `grep -ciE` trên cả bốn file log của JMeter đều trả về 0), xác
nhận cấu hình cổng tạm trong `perf/config/jmeter-run.properties` giữ được ở mức
620 luồng khai báo và 1565 req/s. Bốn file log này được commit tại
`perf/results/jtl/23127300_{Load,Stress,Spike,Endurance}_20260814.log` nên phép
kiểm tra `grep` trên có thể tái lập trực tiếp từ repo.

**Về `locked_before` sau khi chạy:** `perf/scripts/run-scenario.sh` chỉ in dòng
reset lockout ra console, không ghi vào file nào trong repo, nên các giá trị
`locked_before=0` sau khi chạy ở bảng trên không có file lưu trữ trực tiếp.
Chúng được **corroborate** (đối chiếu độc lập), không phải archive, qua hai
nguồn: (1) ba trong bốn khung ảnh bằng chứng cho thấy dòng *trước khi chạy*
`locked_before=0 cleared=0 attempts_pending=0 remaining=0` ngay trong pane
terminal; (2) cả bốn file `.jtl` thô đều có 0 lỗi ở sampler `03 POST
/api/login` trên tổng cộng ~1,08 triệu mẫu — nếu tài khoản nào đó đã bị khoá
trong lúc chạy, sampler này sẽ ghi nhận lỗi đăng nhập, và không có lỗi nào như
vậy xuất hiện.

## Tái lập số liệu từ log thô

Các file `.jtl` thô được commit ở dạng nén `.gz` (repo dùng chung cho cả nhóm;
bản chưa nén của Stress là 86,8 MB và của Spike là 70,6 MB). Để dựng lại bất kỳ
con số nào trong bảng trên:

```bash
gunzip -k perf/results/jtl/23127300_<Scenario>_20260814.jtl.gz
python3 perf/scripts/analyze_jtl.py perf/results/jtl/23127300_<Scenario>_20260814.jtl
```

Bảng HTML dashboard của JMeter đã được sinh sẵn từ bản `.jtl` chưa nén ngay
trong lần chạy, nằm ở `perf/results/html/<stem>/index.html`.

**Phương pháp tính percentile:** cột `p95` ở bảng đầu tiên là giá trị
nearest-rank do `perf/scripts/analyze_jtl.py` tính (đúng như lệnh tái lập ở
trên). JMeter dashboard tự sinh (`index.html`, trường `pct2ResTime`) dùng phép
nội suy tuyến tính nên có thể ra số khác một chút ở cùng một lần chạy — ví dụ
Spike: bảng này ghi p95 = 139 (nearest-rank), dashboard ghi `pct2ResTime:
136.0` (nội suy). Cả hai đều đúng theo phương pháp của mình; ba lần chạy còn
lại cho cùng một số ở cả hai nguồn.
