# HW05 – Performance Testing on EShop

> **Sinh viên:** Trần Minh Quang - 23127464
> **Nhóm:** N08
> **Môn:** CS423 / CSC15003 — Kiểm thử Phần mềm
> **Repository:** [23127464 Performance Testing HW05](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-Performance-Testing)

---

## 1. Self-Assessment Table

| No. | Criteria | Grade | Self-Assessed Grade |
| ---: | --- | ---: | ---: |
| 1 | Task 1 — Load testing | 20 | 20 |
| 2 | Task 1 — Stress testing | 20 | 20 |
| 3 | Task 1 — Spike testing | 20 | 20 |
| 4 | Task 2 — AI analysis + misinterpretation hunt (with correct values from raw logs) | 10 | 10 |
| 5 | Task 3 — Continuous Performance Testing proposal (G9.6) | 10 | 10 |
| 6 | Agent Skills | 10 | 10 |
| | **Total** | **100** | **100** |

---

## 2. Test Summary Report

### 2.1. Phạm vi kiểm thử

Workflow: **Returning Customer Search and Order** — 7 bước API end-to-end:
1. `POST /api/login` (auth-heavy)
2. `GET /api/products?search=` (read-heavy)
3. `GET /api/products/:id` (read-heavy)
4. `GET /api/cart` (transactional)
5. `POST /api/cart` (transactional)
6. `POST /api/checkout` (transactional)
7. `GET /api/orders/my-orders` (read-heavy)

### 2.2. Scenarios và kết quả

| Scenario | JMX | VU | HTTP Samples | Error % | p95 (ms) | Throughput (req/s) | Classification |
| --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| Load | 23127464_Load_20260813.jmx | 20 | 4.547 | 0,00% | 9 | 10,95 | VALID WITH LIMITATION |
| Stress (rerun) | 23127464_Stress_20260813.jmx | 10→80 | 7.192 | 0,00% | 80 | 24,09 | VALID WITH LIMITATION |
| Spike | 23127464_Spike_20260813.jmx | 5→50→5 | 2.230 | 0,00% | 35 | 12,03 | VALID WITH LIMITATION |
| Endurance | 23127464_Endurance_20260814.jmx | 20 | 20.690 | 0,00% | 40 | 11,52 | VALID WITH LIMITATION |

### 2.3. Endurance threshold

> **20 VU / 11,5 req/s** sustained 30 phút, p95 = 40 ms, error = 0,00%, CPU max = 0,452%, RAM max = 61,61 MiB.

### 2.4. Bugs / Performance issues

| # | Loại | Mô tả |
| --- | --- | --- |
| 1 | Performance | Checkout latency tăng từ 7,9 → 36,3 ms sau 30 phút (state accumulation) |
| 2 | Functional | Checkout không clear cart |
| 3 | Security | SQL injection trong search endpoint |
| 4 | Design | Login lockout +2/180s thay vì +1/30s |

### 2.5. Demo video

| Phase | Timestamp | Link |
| --- | --- | --- |
| D1 Load | 22:41 - 1:25:20 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=1361) |
| D2 Stress | 1:26:00 - 1:48:36 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=5160) |
| D3 Spike | 1:48:42 - 2:09:20 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=6522) |
| D4 Endurance | 2:09:30 - 3:03:17 | [YouTube](https://youtu.be/slTA5ErFCQ4?t=7770) |
| Full video | 0:00 - 3:15:39 | [https://youtu.be/slTA5ErFCQ4](https://youtu.be/slTA5ErFCQ4) |

---

## 3. Project Structure

```text
CS423-CSC15003-Testing-N08/
├── README.md
├── reports/
│   ├── main-report.md                              # Báo cáo chính HW05
│   ├── test-summary.md                              # Tổng hợp kết quả
│   ├── ai-audit-report.md                           # AI audit (27 entries)
│   ├── ai-critique.md                               # AI critique (274 từ)
│   └── returning-customer-order/
│       ├── WORKFLOW_DESIGN.md                       # Thiết kế workflow + workload
│       ├── REVIEW_NOTES.md                          # Human review notes A–E
│       ├── RESULT_ANALYSIS.md                       # Phân tích tổng hợp 4 scenario
│       ├── AI_MISINTERPRETATION_HUNT.md             # Hunt 10 lỗi AI
│       ├── OPTIMIZATION_REVIEW.md                   # Review 7 đề xuất tối ưu
│       ├── CONTINUOUS_PERFORMANCE.md                # Pipeline CI/CD đề xuất
│       ├── D1_LOAD_RESULT_ANALYSIS.md
│       ├── D1_LOAD_COMMAND_PREPARATION.md
│       ├── D2_STRESS_RESULT_ANALYSIS.md
│       ├── D2_STRESS_COMMAND_PREPARATION.md
│       ├── D3_SPIKE_RESULT_ANALYSIS.md
│       ├── D3_SPIKE_COMMAND_PREPARATION.md
│       ├── D4_ENDURANCE_RESULT_ANALYSIS.md
│       └── D4_ENDURANCE_COMMAND_PREPARATION.md
├── tests/
│   └── returning-customer-order/
│       ├── test-cases/
│       │   ├── load/23127464_Load_20260813.jmx
│       │   ├── stress/23127464_Stress_20260813.jmx
│       │   ├── spike/23127464_Spike_20260813.jmx
│       │   └── endurance/23127464_Endurance_20260814.jmx
│       ├── test-runs/
│       │   ├── load/20260814-001003-user-executed/
│       │   ├── stress/20260814-012626-user-executed/
│       │   ├── spike/20260814-021040-user-executed/
│       │   └── endurance/20260814-024700-user-executed/
│       ├── data/
│       │   ├── returning-customer-order.csv          # 170 workflow rows
│       │   └── account-provisioning.csv              # 170 account rows
│       ├── evidence/
│       │   ├── hardware/
│       │   ├── baseline/
│       │   ├── load/
│       │   ├── stress/
│       │   ├── spike/
│       │   └── endurance/
│       └── support/
│           ├── generate-phase-c-jmx.js
│           ├── provision-load-accounts.ps1
│           └── monitor-backend-resource.ps1
├── src/eshop-sut/                                    # SUT source code
└── ai-first-jmeter-performance-testing/              # Agent Skill
```

---

## 4. Công cụ & Kỹ thuật

| Hạng mục | Chi tiết |
| --- | --- |
| **Công cụ test** | Apache JMeter 5.6.3 (non-GUI mode) |
| **Công cụ AI** | Codex GPT-5.6-Sol Medium, Claude Opus 4.6 Thinking |
| **Monitoring** | Task Manager, PowerShell script (`monitor-backend-resource.ps1`) |
| **Runtime** | Java OpenJDK 17.0.16 LTS, Node.js |
| **Hardware** | Intel Core i7-12700H, 20 LP, 32 GB RAM, Windows 11 Pro |
| **Agent Skill** | `ai-first-jmeter-performance-testing` (Phase A–E workflow) |
