# HW05 – Performance Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Phạm vi:** Workflow 5 — *Khôi phục tài khoản rồi mua hàng*, phủ đủ ba nhóm endpoint auth-heavy / read-heavy / transactional (§5).
> **Công cụ:** Apache JMeter 5.6.3

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | Task 1 — Load testing | 20 | 18 |
| 2 | Task 1 — Stress testing | 20 | 18 |
| 3 | Task 1 — Spike testing | 20 | 18 |
| 4 | Task 2 — AI analysis + misinterpretation hunt | 10 | 9 |
| 5 | Task 3 — Continuous Performance Testing proposal (G9.6) | 10 | 9 |
| 6 | Agent Skills | 10 | 0 |
| | **Tổng** | **100** | **72** |

---

## 2. Test Summary Report

### 2.1. Workflow và nhóm endpoint

```
POST /api/forgot-password  →  ${resetToken}
POST /api/reset-password
POST /api/login            →  ${token}
GET  /api/products
GET  /api/products/${productId}
POST /api/cart
POST /api/checkout
```

| Nhóm endpoint | Endpoint |
|---|---|
| Auth-heavy | `POST /api/forgot-password`, `POST /api/reset-password`, `POST /api/login` |
| Read-heavy | `GET /api/products`, `GET /api/products/${productId}` |
| Transactional | `POST /api/cart`, `POST /api/checkout` |

### 2.2. Kịch bản đã chạy

| Kịch bản | Test plan | Threads/VU | Duration | Report view | Kết quả |
|---|---|---:|---|---|---|
| Load | `23127300_Load_20260814.jmx` | 50 VU, ramp 60s | 360s | Summary Report | 8,193 mẫu · 0.00% lỗi · p95 7ms |
| Stress | `23127300_Stress_20260814.jmx` | 5 bậc × 60 VU (300 đỉnh), think 100–300ms | ~600s | Aggregate Report | 590,123 mẫu · 0.00% lỗi · p95 4ms |
| Spike | `23127300_Spike_20260814.jmx` | Nền 20 VU + 2×300 VU burst, không think-time | 300s | View Results Tree (lỗi) | 466,165 mẫu · 157 lỗi (harness artifact) · p95 139ms |
| Endurance | `23127300_Endurance_20260814.jmx` | 40 VU, ramp 60s | 900s (15 phút) | Simple Data Writer | 17,327 mẫu · 0.00% lỗi · p95 5ms |

### 2.3. Ngưỡng chịu tải của phần cứng

- **RPS ổn định tối đa (Endurance 40 VU):** ~19.3 req/s gộp cả 7 sampler
- **Trần bộ nhớ SUT (RSS):** 67.8 MB (bắt đầu) → 79.8 MB (ở phút 14) — tăng nhưng không đơn điệu
- **p95 bắt đầu trượt:** chưa quan sát được — p95 giữ ở 5ms suốt 15 phút Endurance; Spike (300 VU zero think) đẩy p95 toàn run lên 139ms nhưng vẫn 0.00% lỗi thật

### 2.4. Bug / performance issue

| ID | Loại | Severity / Priority | Báo cáo | GitHub Issue |
|---|---|---|---|---|
| OR-2 | Undocumented behaviour | Major | `reports/main-report.md` mục 2.9; bằng chứng: `perf/evidence/smoke-oracle-20260813-230513.txt` mục OR-2 | — |
| OR-3 | Internal inconsistency | Minor | `reports/main-report.md` mục 2.9 | — |
| OR-4 | Contract deviation | Minor | `reports/main-report.md` mục 2.9 | — |
| OR-1 | Contract deviation | Minor | `reports/main-report.md` mục 2.9 | — |

**Tổng số:** 4 bug (black-box oracle) · 0 performance issue thật (157 lỗi Spike là harness artifact)

### 2.5. Video demo

| Nội dung | Link |
|---|---|
| Task 1 — ba kịch bản, tool + resource monitor cùng khung hình (≥6 phút, tiếng Việt) | |
| Agent Skill demo (§7) | |

---

## 3. Cấu trúc repo

| Đường dẫn | Nội dung |
|---|---|
| `perf/plans/jmeter/` | Test plan JMeter `.jmx` — `23127300_{Load\|Stress\|Spike}_{YYYYMMDD}` |
| `perf/data/` | Dữ liệu CSV cho toàn bộ tham số (§6 — data-driven) |
| `perf/results/jtl/` | Log `.jtl` thô, đính kèm đầy đủ (§11) |
| `perf/results/html/` | Thư mục HTML report của từng lần chạy |
| `perf/scripts/` | Script seed dữ liệu, reset khoá tài khoản, chạy kịch bản |
| `perf/evidence/` | Ảnh resource monitor và cấu hình phần cứng |
| `reports/main-report.md` | Báo cáo chính |
| `reports/ai-analysis-review.md` | Task 2 — săn lỗi diễn giải của AI |
| `reports/continuous-perf-proposal.md` | Task 3 — đề xuất CI hiệu năng |
| `reports/ai-audit-report.md`, `reports/prompt-log.md`, `reports/ai-critique.md` | Phụ lục AI bắt buộc (§9, §10) |
| `reports/pdf/` | Bản PDF của các tài liệu §14 yêu cầu. Sinh lại bằng `python3 reports/tools/build-pdfs.py` |
| `bug-reports/` | Bug report + ảnh + link GitHub Issue |
| `.claude/skills/` | Agent Skills (§7) |
| `api_specification.md` | Đặc tả API EShop — oracle cho assertion |
| `workflows.md` | Phân công workflow trong nhóm N08 |
| `git-log.txt` | Git commit log (§12) |

---

## 4. Liên kết

| Mục | Link |
|---|---|
| GitHub repository | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08 (branch `HW05/23127300`) |
| SUT | https://github.com/ttbhanh/eshop-sut |
| Demo video | |
