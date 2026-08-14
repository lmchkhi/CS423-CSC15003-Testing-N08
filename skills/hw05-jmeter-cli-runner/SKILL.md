---
name: hw05-jmeter-cli-runner
description: Chạy JMeter bằng CLI cho HW05 Performance Testing, quản lý cấu trúc artifact, lệnh non-GUI, raw JTL, HTML dashboard, screenshot/resource evidence bằng htop/Activity Monitor và ghi chú reset account lockout. Dùng khi cần execute Load, Stress, Spike, Endurance test plan đã tạo cho EShop backend API local mà không sửa code SUT.
---

# HW05 JMeter CLI Runner

## Mục tiêu

Chạy các `.jmx` của HW05 bằng JMeter non-GUI, lưu đầy đủ raw log, HTML report và evidence theo yêu cầu đề. Chỉ thao tác artifact testing; không sửa code implement của SUT.

## Chuẩn bị

Đọc `references/cli-evidence-workflow.md` khi cần checklist chạy chi tiết.

Xác nhận các điều kiện trước khi chạy:

- Backend API đang chạy ở `http://localhost:3000`.
- Java, JMeter và `htop` đã có trong máy.
- Test plan được đặt tên `{StudentID}_{ScenarioType}_{YYYYMMDD}.jmx`.
- CSV có đủ account/dữ liệu cho mức tải dự kiến.
- Các lần chạy Stress/Spike có kế hoạch reset lockout nếu login fail 3 lần.

## Cấu trúc artifact chuẩn

Tạo cây thư mục:

```text
testing-artifacts/hw05/
├── plans/
├── data/
├── results/
│   ├── load/
│   ├── stress/
│   ├── spike/
│   └── endurance/
├── html/
│   ├── load/
│   ├── stress/
│   ├── spike/
│   └── endurance/
├── evidence/
│   ├── screenshots/
│   ├── hardware/
│   └── notes/
└── analysis/
```

Tạo nhanh bằng:

```bash
python3 skills/hw05-jmeter-cli-runner/scripts/create_hw05_artifacts.py --root testing-artifacts/hw05
```

## Lệnh chạy chuẩn

Chạy từng scenario bằng JMeter non-GUI:

```bash
jmeter -n \
  -t testing-artifacts/hw05/plans/23127475_Load_20260815.jmx \
  -l testing-artifacts/hw05/results/load/23127475_Load_20260815.jtl \
  -e -o testing-artifacts/hw05/html/load
```

Trước khi chạy lại cùng scenario, đảm bảo thư mục HTML output rỗng hoặc đổi tên thư mục mới, vì JMeter thường từ chối ghi vào thư mục HTML đã có nội dung.

## Quy trình chạy

1. Smoke test tải rất thấp trước:

- 1-2 threads, duration ngắn.
- Kiểm tra login lấy được token.
- Kiểm tra cart/checkout không fail do payload hoặc dữ liệu.

2. Chạy Load:

- Mở JMeter GUI hoặc CLI output ở một cửa sổ.
- Mở `htop` hoặc Activity Monitor ở cửa sổ khác.
- Chụp screenshot thấy tool và resource monitor cùng khung hình.
- Lưu `.jtl` và HTML dashboard.

3. Chạy Stress:

- Tăng tải theo plan.
- Ghi lại điểm bắt đầu có latency/error tăng mạnh.
- Nếu bị lockout do login fail, reset/đợi 30 giây và ghi vào evidence notes.

4. Chạy Spike:

- Giảm/bỏ timer.
- Chụp khoảnh khắc tải tăng đột ngột và resource monitor.
- Phân biệt lỗi do dữ liệu/account với lỗi hiệu năng thật.

5. Chạy Endurance:

- Dùng mức tải gần ngưỡng an toàn.
- Duy trì 10-15 phút theo đề.
- Ghi maximum stable RPS, p95, error rate, CPU/RAM ceiling.

## Evidence bắt buộc

Lưu vào `testing-artifacts/hw05/evidence`:

- Screenshot JMeter/CLI cùng `htop` hoặc Activity Monitor cho từng scenario.
- Hardware evidence: spec table, `system_profiler`/screenfetch/neofetch hoặc screenshot tương đương.
- Ghi chú reset lockout/database nếu có.
- Link GitHub Issue nếu phát hiện bug/performance issue thật.
- Link demo video YouTube unlisted ít nhất 6 phút, có tiếng Việt và thấy tool + resource monitor.

## Bug report khi phát hiện lỗi

Nếu phát hiện bug/performance issue thật của SUT trong lúc smoke test hoặc chạy JMeter:

1. Dùng `$hw05-bug-report` để tạo Markdown bug report từ `.github/ISSUE_TEMPLATE/bug-report-template.md` vào `reports/bug-reports/`.
2. Đính kèm evidence path trong bug report: screenshot, `.jtl`, HTML report, stdout/stderr hoặc video timestamp.
3. Chỉ sau khi bug report local đã ổn, dùng `$gh-create-bug-issues` nếu cần tạo GitHub Issue từ file Markdown đó.
4. Không tạo bug report cho lỗi do sandbox Codex, backend chưa chạy, CSV sai, account lockout do dữ liệu test, hoặc JMeter plan thiếu token/header.

## Nguyên tắc diễn giải lỗi

Không tự kết luận mọi HTTP 4xx/5xx là lỗi SUT. Phân loại:

- Script/data error: token thiếu, account bị lockout, productId không tồn tại, CSV thiếu dòng.
- Expected business rejection: login sai, coupon không hợp lệ, auth thiếu.
- Performance/SUT issue: timeout, 5xx, latency tăng vọt ổn định, backend crash, throughput tụt khi resource chạm trần.

Ghi phân loại này vào report và AI audit.

## AI audit

Trước final, dùng `$hw05-ai-audit-log` để append entry cho lượt hiện tại vào `reports/ai-audit-report.md`, gồm prompt, thao tác chạy CLI/smoke test/evidence và kết quả chính.
