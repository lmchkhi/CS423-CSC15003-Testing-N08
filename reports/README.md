# HW05 Submission README

## Thông tin chung

| Mục | Giá trị |
| --- | --- |
| Họ tên sinh viên | Ngô Hồng Thanh |
| MSSV | 23127475 |
| Bài tập | HW05 - AI Performance Testing |
| SUT | EShop backend API |
| Tool | Apache JMeter CLI |
| Workflow | Workflow 1 - login, categories, search, product detail, cart, checkout |
| Public GitHub repository | [https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/hw05/23127475](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/hw05/23127475) |
| Demo video | [https://youtu.be/AcoNQVMlhS4](https://youtu.be/AcoNQVMlhS4) |
| Main report | [`reports/main-report.md`](./main-report.md) |
| AI Audit Report | [`reports/ai-audit-report.md`](./ai-audit-report.md) |
| AI Critique | [`reports/ai-critique.md`](./ai-critique.md) |

## Self-assessment table

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | ---: |
| 1 | Task 1 - Load testing | 20 | 20 |
| 2 | Task 1 - Stress testing | 20 | 20 |
| 3 | Task 1 - Spike testing | 20 | 20 |
| 4 | Task 2 - AI analysis + misinterpretation hunt | 10 | 10 |
| 5 | Task 3 - Continuous Performance Testing proposal | 10 | 10 |
| 6 | Agent Skills | 10 | 10 |
|   | Total | 100 | 100 |

## Test summary report

### Các kịch bản đã chạy

| Kịch bản | VUs | Ramp-up | Thời lượng | Samples | Error rate | p95 | p99 | Throughput |
| --- | ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| Load | 50 | 60s | 300s | 1176 | 0.00% | 5 ms | 6 ms | 4.0384 RPS |
| Stress | 150 | 120s | 420s | 8930 | 0.00% | 4 ms | 5 ms | 21.6052 RPS |
| Spike | 200 | 30s | 120s | 1,225,240 | 0.00% | 37 ms | 55 ms | 10212.2907 RPS |
| Endurance | 50 | 60s | 900s | 3837 | 0.00% | 4 ms | 5 ms | 4.3127 RPS |

### Nhóm endpoint được bao phủ

| Nhóm | Endpoint |
| --- | --- |
| Auth-heavy | `POST /api/login` |
| Read-heavy | `GET /api/categories`, `GET /api/products?search=${keyword}`, `GET /api/products/${productId}` |
| Transactional | `POST /api/cart`, `POST /api/checkout` |

`POST /api/register` chỉ được dùng để chuẩn bị account test cho `testing-artifacts/hw05/data/workflow1_users.csv`. Endpoint này không nằm trong workflow được đo hiệu năng. File CSV là snapshot dữ liệu test; nếu reset database hoặc chạy lại trên môi trường khác, cần chạy `skills/hw05-jmeter-workflow1/scripts/create_workflow1_accounts.py` trước khi chạy JMeter.

### Ngưỡng Endurance

Ngưỡng ổn định đã đo được là 50 VUs trong 15 phút, với p95 = 4 ms, p99 = 5 ms, throughput = 4.3127 RPS và error rate = 0.00%. Đây là mức tải ổn định cao nhất đã được kiểm chứng trong phạm vi Endurance run của HW05, không phải năng lực tối đa tuyệt đối của SUT.

### Bug và vấn đề hiệu năng

Không ghi nhận bug SUT hoặc performance issue đã được xác nhận. Các run chính thức Load, Stress, Spike và Endurance đều có error rate 0.00%, không có HTTP 5xx lặp lại, timeout, backend crash, lỗi token hoặc account lockout.

### Artifact chính

| Loại artifact | Path |
| --- | --- |
| JMeter plans | `testing-artifacts/hw05/plans/` |
| CSV test data | `testing-artifacts/hw05/data/workflow1_users.csv` |
| JTL results | `testing-artifacts/hw05/results/` |
| Spike compressed JTL | `testing-artifacts/hw05/results/spike/23127475_Spike_20260815.jtl.gz` |
| HTML dashboards | `testing-artifacts/hw05/html/` |
| Analysis summaries | `testing-artifacts/hw05/analysis/` |
| Screenshots and hardware evidence | `testing-artifacts/hw05/evidence/` |
| Bug reports folder | `reports/bug-reports/` |
