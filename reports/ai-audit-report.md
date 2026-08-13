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
| Thiết kế & sinh test plan (§6 Task 1) | Claude (Opus 5, trong Claude Code) | Ánh xạ Workflow 5 sang sampler, chọn workload model, mô hình hoá dữ liệu CSV, sinh `.jmx` và script k6, rà soát và sửa |
| Thực thi | Apache JMeter 5.6.3 · k6 v2.2.0 | Chạy Load / Stress / Spike / Endurance trên backend API |
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

## 4. Tổng hợp độ chính xác của AI

*(Cập nhật lại sau mỗi entry — tổng số entry, số VALID / INVALID / INCOMPLETE và
tỉ lệ phần trăm.)*

| Verdict | Số entry | Tỉ lệ |
|---|---:|---:|
| `VALID` | 0 | — |
| `INVALID` | 0 | — |
| `INCOMPLETE` | 0 | — |
| **Tổng** | **0** | **100%** |

## 5. Kết luận

*(Viết sau khi hoàn tất Task 1–3: các nhóm lỗi lặp lại của AI, chỗ AI làm tốt, và
bài học rút ra. Mọi nhận định phải dẫn được về một số entry cụ thể.)*

## 6. Công bố bắt buộc (Mandatory Disclosure)

*(Điền khi chốt bài.)*

**Ký tên:** Hà Bảo Ngọc — 23127300 — *(ngày nộp)*
