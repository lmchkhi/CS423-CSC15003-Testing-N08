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
| Public GitHub repository | [https://github.com/lmchkhi/CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08) |
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

### Scenarios run

| Scenario | VUs | Ramp-up | Duration | Samples | Error rate | p95 | p99 | Throughput |
| --- | ---: | --- | --- | ---: | ---: | ---: | ---: | ---: |
| Load | 50 | 60s | 300s | 1176 | 0.00% | 5 ms | 6 ms | 4.0384 RPS |
| Stress | 150 | 120s | 420s | 8930 | 0.00% | 4 ms | 5 ms | 21.6052 RPS |
| Spike | 200 | 30s | 120s | 1,225,240 | 0.00% | 37 ms | 55 ms | 10212.2907 RPS |
| Endurance | 50 | 60s | 900s | 3837 | 0.00% | 4 ms | 5 ms | 4.3127 RPS |

### Endpoint groups covered

| Group | Endpoints |
| --- | --- |
| Auth-heavy | `POST /api/login` |
| Read-heavy | `GET /api/categories`, `GET /api/products?search=${keyword}`, `GET /api/products/${productId}` |
| Transactional | `POST /api/cart`, `POST /api/checkout` |

`POST /api/register` is used only to prepare test accounts for `testing-artifacts/hw05/data/workflow1_users.csv`. It is not part of the measured workflow. The CSV is a test data snapshot; if the database is reset or the tests are rerun in another environment, run `skills/hw05-jmeter-workflow1/scripts/create_workflow1_accounts.py` before running JMeter.

### Endurance threshold

The measured stable endurance threshold is 50 VUs for 15 minutes, with p95 = 4 ms, p99 = 5 ms, throughput = 4.3127 RPS, and error rate = 0.00%. This is the highest stable level verified by the HW05 endurance run, not the absolute maximum capacity of the SUT.

### Bugs and performance issues

No confirmed SUT bug or performance issue was filed. The official Load, Stress, Spike, and Endurance runs all had 0.00% error rate, with no repeated HTTP 5xx, timeout, backend crash, token issue, or account lockout.

### Main artifacts

| Artifact type | Path |
| --- | --- |
| JMeter plans | `testing-artifacts/hw05/plans/` |
| CSV test data | `testing-artifacts/hw05/data/workflow1_users.csv` |
| JTL results | `testing-artifacts/hw05/results/` |
| Spike compressed JTL | `testing-artifacts/hw05/results/spike/23127475_Spike_20260815.jtl.gz` |
| HTML dashboards | `testing-artifacts/hw05/html/` |
| Analysis summaries | `testing-artifacts/hw05/analysis/` |
| Screenshots and hardware evidence | `testing-artifacts/hw05/evidence/` |
| Bug reports folder | `reports/bug-reports/` |

