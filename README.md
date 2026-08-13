# HW05 – Performance Testing on EShop

> **Sinh viên:** Hà Bảo Ngọc — 23127300
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Phạm vi:** Workflow 5 — *Khôi phục tài khoản rồi mua hàng*, phủ đủ ba nhóm endpoint auth-heavy / read-heavy / transactional (§5).
> **Công cụ:** Apache JMeter 5.6.3 (chính, §8 mặc định) · k6 v2.2.0 (bonus §8)

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---:|
| 1 | Task 1 — Load testing | 20 | |
| 2 | Task 1 — Stress testing | 20 | |
| 3 | Task 1 — Spike testing | 20 | |
| 4 | Task 2 — AI analysis + misinterpretation hunt | 10 | |
| 5 | Task 3 — Continuous Performance Testing proposal (G9.6) | 10 | |
| 6 | Agent Skills | 10 | |
| | **Total** | **100** | |

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
| Load | | | | | |
| Stress | | | | | |
| Spike | | | | | |
| Endurance | | | | | |

### 2.3. Ngưỡng chịu tải của phần cứng

*(Điền bằng số: RPS ổn định tối đa, trần bộ nhớ, mức tải mà p95 bắt đầu trượt.)*

### 2.4. Bug / performance issue

| ID | Loại | Severity / Priority | Báo cáo | GitHub Issue |
|---|---|---|---|---|

**Tổng số:** 0 bug · 0 performance issue

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
| `perf/plans/k6/` | Bản k6 của cùng workflow (bonus §8) |
| `perf/data/` | Dữ liệu CSV cho toàn bộ tham số (§6 — data-driven) |
| `perf/results/jtl/` | Log `.jtl` thô, đính kèm đầy đủ (§11) |
| `perf/results/html/` | Thư mục HTML report của từng lần chạy |
| `perf/results/k6/` | Output tương đương của k6 |
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
