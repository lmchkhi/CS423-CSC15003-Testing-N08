# Invalid Run — D1 Load

- Run folder: `tests/returning-customer-order/test-runs/load/20260813-233819-user-executed/`
- Executor: `User`
- Start time từ console: `2026-08-14 00:04:37 +07:00`
- End time từ console: `2026-08-14 00:04:41 +07:00`
- JMeter exit code: `0` — không được xem là bằng chứng thành công
- Classification: `INVALID`

## Bằng chứng

- Console summariser: `summary = 0`.
- `result.jtl`: 164 byte, chỉ có header, `0` data row/sample.
- `jmeter.log`: 20 lỗi `Property ThreadGroup.main_controller is unset`.
- Tất cả 20 thread lỗi trong `JMeterThread.initRun` trước khi gửi HTTP sampler.

## Root cause

Hàm `ultimateThreadGroup()` trong `generate-phase-c-jmx.js` đã sinh schedule nhưng bỏ thiếu
`ThreadGroup.main_controller`. Ultimate Thread Group vì vậy không có sampler controller để khởi tạo.

## Quyết định

- Giữ nguyên JTL/log/console/resource/PID/provisioning evidence; không sửa hoặc dùng làm metric.
- Không generate HTML từ JTL 0-sample.
- Không chạy đè hoặc bổ sung artifact vào run này.
- Correction được áp dụng tại generator và cả ba graded JMX; D1 phải rerun trong folder mới sau
  reset/reprovision và User execution.
