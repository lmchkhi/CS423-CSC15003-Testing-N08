# [AI-02] AI Audit Report — HW05 Performance Testing

## 1. Thông tin Sinh viên

| Field | Content |
| --- | --- |
| **Họ tên** | Hà Bảo Ngọc |
| **MSSV** | 23127300 |
| **Lớp / Nhóm** | CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS — Nhóm N08 |
| **Ngày làm bài** | 13/08/2026 – *(đang cập nhật)* |
| **Công cụ AI đã dùng** | Claude (Opus 5, chạy trong Claude Code) |

## 2. Tuyên bố sử dụng AI (HW05 §9)

> **I use AI tools for the following tasks.**

Tôi có sử dụng AI trong bài này. Công cụ, thời điểm, prompt nguyên văn và output
nguyên văn của từng lần tương tác được ghi ở mục 3 dưới đây; bản ghi thô không
lọc nằm ở [`prompt-log.md`](prompt-log.md).

| Nhóm công việc | Công cụ | Được dùng để làm gì |
|---|---|---|
| Thiết kế & sinh test plan (§6 Task 1) | Claude (Opus 5, trong Claude Code) | Ánh xạ Workflow 5 sang sampler, chọn workload model, mô hình hoá dữ liệu CSV, sinh `.jmx`, rà soát và sửa |
| Thực thi | Apache JMeter 5.6.3 | Chạy Load / Stress / Spike / Endurance trên backend API |
| Phân tích log (§6 Task 2) | Claude (Opus 5, trong Claude Code) | Phân tích `.jtl` thô, đề xuất ngưỡng và tối ưu hoá — sau đó bị sinh viên rà soát lại |
| Đề xuất CI hiệu năng (§6 Task 3) | Claude (Opus 5, trong Claude Code) | Dựng bản nháp mô hình continuous performance testing |

Mức Bloom-AI mà HW05 §8 yêu cầu — **G9.2 (Apply), G9.3 (Analyse), G9.4
(Collaborate), G9.6 (Disrupt)** — được thể hiện lần lượt ở: quy trình từng bước
áp dụng cho ba kịch bản (Apply), cuộc săn lỗi diễn giải ở Task 2 (Analyse), các
vòng sửa qua lại ghi ở mục **Student Fix** của từng entry (Collaborate), và đề
xuất continuous performance testing ở Task 3 (Disrupt).

## 3. Hướng dẫn / Phạm vi

Phụ lục bắt buộc theo HW05 §9. Mỗi entry ghi lại một giai đoạn của quy trình
thiết kế / thực thi / phân tích, kèm phán quyết của sinh viên về chất lượng
output. Bản ghi thô, không lọc, nằm ở [`prompt-log.md`](prompt-log.md).

Nguyên tắc: **Full prompt** và **AI Output** giữ nguyên văn, không dịch, không
rút gọn. Các phần còn lại (Verdict, Reasoning, Student Fix) là nhận định của
sinh viên, viết bằng tiếng Việt.

<!-- Các entry được `ai-audit-log` chèn từ đây trở xuống, đánh số liên tục. -->

## Entry #1

### (1) Prompt + Tool

| Field             | Content         |
| ----------------- | --------------- |
| **Tool**          | Claude (Sonnet 5, Claude Code) — thực hiện trực tiếp trong phiên này, **không** qua subagent riêng như Task 21 brief yêu cầu (xem lý do trong ghi chú phương pháp ở đầu `perf/results/ai-analysis-raw.md`: phiên này có chỉ thị của operator cấm spawn subagent, và một lần thử gọi `claude -p` ở tiến trình riêng — chạy ngoài repo để không nạp `CLAUDE.md` — bị bộ phân loại auto-mode của harness chặn trước khi cho ra output nào) |
| **Timestamp**     | 8:33 AM 15/08/2026 |
| **Artifact type** | Task 2 — phân tích không ngữ cảnh (uncontexted) 4 file `.jtl` thô, đề xuất ngưỡng và tối ưu hoá, làm nguyên liệu cho cuộc săn lỗi diễn giải ở Entry sau |

**Full prompt:**

```text
(Theo task-21-brief.md Step 1, nguyên văn ý định của prompt lẽ ra dùng để dispatch subagent — không dùng được nguyên bản là subagent nên chuyển thành một lượt tính toán trực tiếp, có kỷ luật giữ nguyên ràng buộc "chỉ dùng":)

Paths: perf/results/jtl/23127300_Load_20260814.jtl.gz, perf/results/jtl/23127300_Stress_20260814.jtl.gz, perf/results/jtl/23127300_Spike_20260814.jtl.gz, perf/results/jtl/23127300_Endurance_20260814.jtl.gz (giải nén trước khi đọc)

Analyse performance and propose thresholds. Propose concrete optimizations.

Ràng buộc "không được nhắc tới" giữ nguyên như brief: không workflow, không think time, không lockout, không thiết kế CSV, không việc JMeter và SUT chạy chung máy, không việc SUT là Node/SQLite.
```

### (2) AI Output

Ghi ở [`perf/results/ai-analysis-raw.md`](../perf/results/ai-analysis-raw.md)
(giữ nguyên văn, không sửa) — bảng tổng hợp 4 file, 5 mục quan sát, bảng
ngưỡng đề xuất, 5 đề xuất tối ưu hoá. Số liệu trong đó là **tính thật** bằng
arithmetic tổng hợp thô (đếm toàn bộ, error % gộp mọi label, percentile nội
suy tuyến tính trên `elapsed` gồm cả ramp-up, throughput = count ÷
wall-clock) trên chính 4 file `.jtl` đã chấm điểm — không phải số bịa.

### (3) Verdict

**`INCOMPLETE`** *(tạm thời — xem Entry #2, cuộc săn lỗi diễn giải, để có
phán quyết cuối cùng theo đúng trình tự task-21-brief.md Step 3 / task-22-brief.md
Step 6.)*

### (4) Reasoning

Chưa đánh giá ở entry này — việc rà soát từng kết luận sai được tách thành
Entry #2 (Task 22) để giữ đúng ranh giới "phân tích của AI" và "rà soát của
sinh viên" mà `reports/ai-analysis-review.md` yêu cầu.

### (5) Student Fix

*(Điền ở Entry #2.)*

---

## 4. Tổng hợp độ chính xác của AI

*(Cập nhật lại sau mỗi entry — tổng số entry, số VALID / INVALID / INCOMPLETE và
tỉ lệ phần trăm.)*

| Verdict | Số entry | Tỉ lệ |
|---|---:|---:|
| `VALID` | 0 | 0% |
| `INVALID` | 0 | 0% |
| `INCOMPLETE` | 1 | 100% |
| **Tổng** | **1** | **100%** |

## 5. Kết luận

*(Viết sau khi hoàn tất Task 1–3: các nhóm lỗi lặp lại của AI, chỗ AI làm tốt, và
bài học rút ra. Mọi nhận định phải dẫn được về một số entry cụ thể.)*

## 6. Công bố bắt buộc (Mandatory Disclosure)

*(Điền khi chốt bài.)*

**Ký tên:** Hà Bảo Ngọc — 23127300 — *(ngày nộp)*
