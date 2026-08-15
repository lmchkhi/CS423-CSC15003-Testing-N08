# Run manifest — HW05 performance runs

Một dòng cho mỗi lần chạy thực sự, ghi ngay khi chạy xong. Kết quả được ghi
đúng như đã xảy ra: một lần chạy có lỗi vẫn giữ nguyên log và report — tỉ lệ lỗi
dưới tải là bằng chứng, không phải thứ để giấu.

| Kịch bản | Test plan | Công cụ | Bắt đầu (ISO) | Thời lượng | Threads/VU | Samples | Error % | p95 (ms) | Throughput (req/s) | `.jtl` | HTML report | Ảnh bằng chứng |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|---|---|
| Load | `23127300_Load_20260814.jmx` | JMeter | 2026-08-15T15:46:19+07:00 | 362s | 50 | 8210 | 0.0 | 7 | 22.958 | `perf/results/jtl/23127300_Load_20260814.jtl.gz` | `perf/results/html/23127300_Load_20260814/` | `perf/evidence/resource-monitor/Load-20260815-155148.png` |
| Stress | `23127300_Stress_20260814.jmx` | JMeter | 2026-08-15T15:53:27+07:00 | 607s | 300 (5×60 bậc) | 595741 | 0.0 | 4 | 993.833 | `perf/results/jtl/23127300_Stress_20260814.jtl.gz` | `perf/results/html/23127300_Stress_20260814/` | `perf/evidence/resource-monitor/Stress-20260815-160117.png` |
| Spike | `23127300_Spike_20260814.jmx` | JMeter | 2026-08-15T16:05:02+07:00 | 306s | 20 nền + 2×300 đột biến | 455302 | 0.0 | 140 | 1533.726 | `perf/results/jtl/23127300_Spike_20260814.jtl.gz` | `perf/results/html/23127300_Spike_20260814/` | `perf/evidence/resource-monitor/Spike-20260815-160819.png` |
| Endurance | `23127300_Endurance_20260814.jmx` | JMeter | 2026-08-15T16:11:10+07:00 | 903s | 40 | 17346 | 0.0 | 7 | 19.327 | `perf/results/jtl/23127300_Endurance_20260814.jtl.gz` | `perf/results/html/23127300_Endurance_20260814/` | `perf/evidence/resource-monitor/Endurance-start-20260815-161234.png`, `perf/evidence/resource-monitor/Endurance-min14-20260815-162532.png` |

**Số lần chạy đã ghi:** 4

## Trạng thái khoá tài khoản (`locked_before`) và tài nguyên đỉnh

`locked_before` lấy từ `perf/scripts/reset-lockout.sh` chạy **sau** mỗi lần chạy.
Giá trị khác 0 nghĩa là lần chạy đó đã kích hoạt cơ chế khoá tài khoản (2 lần
đăng nhập sai liên tiếp khoá ~180 s) và tỉ lệ lỗi phải được đọc kèm ghi chú đó.

| Kịch bản | `locked_before` trước khi chạy | `locked_before` sau khi chạy | CPU đỉnh của SUT | RSS đỉnh của SUT | RSS đỉnh của JMeter |
|---|---:|---:|---:|---:|---:|
| Load | 0 | **0** | 20.5 % | 97 MB | 834 MB |
| Stress | 0 | **0** | 76.0 % | 167 MB | 926 MB |
| Spike | 0 | **0** | 123.4 % | 177 MB | 995 MB |
| Endurance | 0 | **0** | 17.3 % | 98 MB | 853 MB |

Cả bốn lần chạy đều có `locked_before=0` sau khi chạy: **không lần nào chạm cơ
chế khoá tài khoản**, nên các tỉ lệ lỗi ở bảng trên đọc trực tiếp được, không cần
trừ đi phần lỗi do khoá tài khoản.

## Lỗi: lỗi thật của SUT so với nhiễu do bộ khung kiểm thử

| Kịch bản | Tổng lỗi | Lỗi thật của SUT | Nhiễu do bộ khung | Chi tiết |
|---|---:|---:|---:|---|
| Load | 0 | 0 | 0 | — |
| Stress | 0 | 0 | 0 | — |
| Spike | 0 | 0 | 0 | Rerun sau khi bind tài khoản riêng cho từng VU; `View Results Tree (errors only)` rỗng và `.jtl` không còn HTTP 400 ở `02 POST /api/reset-password`. |
| Endurance | 0 | 0 | 0 | — |

Không lần chạy nào ghi nhận `BindException` / "Can't assign requested address"
(kiểm tra bằng `grep -ciE` trên cả bốn file log của JMeter đều trả về 0), xác
nhận cấu hình cổng tạm trong `perf/config/jmeter-run.properties` giữ được ở mức
620 luồng khai báo và 1533.726 req/s. Bốn file log này được commit tại
`perf/results/jtl/23127300_{Load,Stress,Spike,Endurance}_20260814.log` nên phép
kiểm tra `grep` trên có thể tái lập trực tiếp từ repo.

**Về `locked_before` sau khi chạy:** `perf/scripts/run-scenario.sh` chỉ in dòng
reset lockout ra console, không ghi vào file nào trong repo, nên các giá trị
`locked_before=0` sau khi chạy ở bảng trên không có file lưu trữ trực tiếp.
Chúng được **corroborate** (đối chiếu độc lập), không phải archive, qua hai
nguồn: (1) ba trong bốn khung ảnh bằng chứng cho thấy dòng *trước khi chạy*
`locked_before=0 cleared=0 attempts_pending=0 remaining=0` ngay trong pane
terminal; (2) cả bốn file `.jtl` thô đều có 0 lỗi ở sampler `03 POST
/api/login` trên tổng cộng 1.076.599 mẫu — nếu tài khoản nào đó đã bị khoá
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
Spike: bảng này ghi p95 = 140 (nearest-rank), dashboard ghi `pct2ResTime:
136.0` (nội suy). Cả hai đều đúng theo phương pháp của mình; ba lần chạy còn
lại chỉ khác tối đa 1ms giữa hai phương pháp.
