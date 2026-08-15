# [AI-02] AI Audit Report — HW05 Performance Testing

## 1. Thông tin Sinh viên

| Field | Content |
| --- | --- |
| **Họ tên** | Hà Bảo Ngọc |
| **MSSV** | 23127300 |
| **Lớp / Nhóm** | CS423/CSC15003 — Kiểm thử Phần mềm, FIT HCMUS — Nhóm N08 |
| **Ngày làm bài** | 13/08/2026 – 15/08/2026 |
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

**`INVALID`**

### (4) Reasoning

Rà soát đầy đủ ở [`reports/ai-analysis-review.md`](ai-analysis-review.md).
Tóm tắt: arithmetic thô của AI đúng (error % gộp, throughput, percentile gộp
đều khớp `perf/results/ground-truth.txt` trong sai số làm tròn), nhưng lớp
diễn giải phía trên sai ở 4 chỗ có bằng chứng cụ thể — (1) đọc error % gộp
0.03% thành "Spike passed cleanly" trong khi 157 lỗi tập trung 100% ở một
label và hai cửa sổ đột biến; (2) gán p95 gộp 139ms cho riêng checkout trong
khi p95 thật của checkout là 82ms; (3) đọc throughput thô (983–1565 req/s)
thành năng lực sản xuất đã kiểm chứng trong khi CPU đỉnh của SUT chỉ
61.2–126.7% của **một** lõi trên máy 12 lõi và calibration không tìm được
trần nào do SUT gây ra; (4) gán 157 lỗi 400 cho một nhu cầu rate-limit sản
phẩm trong khi đó là artefact con trỏ CSV dùng chung của chính bộ khung kiểm
thử. 4/5 đề xuất tối ưu hoá cũng hallucinated theo cùng cơ chế — hợp lý cho
một kiến trúc chung chung, không khớp kiến trúc thật (catalog 5 dòng, một
kết nối DB, một file SQLite). Vì các kết luận và ngưỡng đề xuất — phần sẽ
thực sự được dùng để quyết định release/không release — sai ở nhiều điểm có
hệ quả, verdict là `INVALID` dù các con số thô bên dưới đúng.

### (5) Student Fix

Không sửa trực tiếp file `ai-analysis-raw.md` (giữ nguyên văn theo đúng yêu
cầu Task 21). Sửa chữa nằm ở `reports/ai-analysis-review.md`: thay error %
gộp bằng error % theo label + cửa sổ thời gian; thay percentile gộp bằng
percentile theo label (`07 POST /api/checkout` riêng); loại bỏ kết luận về
capacity sản xuất chừng nào chưa có tín hiệu CPU/RSS đi kèm throughput; loại
4/5 đề xuất tối ưu hoá không khớp kiến trúc; giữ lại đề xuất cache như một ý
"feasible nhưng chưa có bằng chứng", không chuyển thẳng vào backlog.

---

## 4. Tổng hợp độ chính xác của AI

*(Cập nhật lại sau mỗi entry — tổng số entry, số VALID / INVALID / INCOMPLETE và
tỉ lệ phần trăm.)*

| Verdict | Số entry | Tỉ lệ |
|---|---:|---:|
| `VALID` | 0 | 0% |
| `INVALID` | 1 | 100% |
| `INCOMPLETE` | 0 | 0% |
| **Tổng** | **1** | **100%** |

## 5. Kết luận

Duy nhất Entry #1 (Task 2 — phân tích log) có một cuộc rà soát độc lập đầy
đủ với số liệu đối chiếu. Nhận xét dưới đây dựa vào entry đó.

**Nhóm lỗi lặp lại.** Cả bốn lỗi diễn giải ở Entry #1 đều thuộc cùng một
gốc: model tổng hợp thống kê *gộp* (error % toàn run, percentile toàn label,
throughput toàn kịch bản) và diễn giải chúng như thể chúng đã mang đủ ngữ
cảnh để kết luận về capacity, label cụ thể, hay nguồn gốc lỗi — trong khi
file `.jtl` không mang theo workload design, tín hiệu tài nguyên hay kiến
trúc SUT. Lỗi không nằm ở arithmetic (arithmetic đúng, đối chiếu với
`perf/results/ground-truth.txt`), mà ở tầng diễn giải phía trên.

**Chỗ AI làm tốt.** Trong Entry #1, ở kết luận #6 về Endurance, model tự nhận
*"a proper leak check would need a memory/RSS time series... which isn't in
the `.jtl`"* — đúng giới hạn thật của dữ liệu nó có, thay vì đoán bừa.
Trong giai đoạn sinh test plan và đề xuất CI, output được sử dụng làm khung
ban đầu và sau đó được rà soát qua các vòng sửa ghi ở `prompt-log.md`; chất
lượng cấu trúc (danh sách bước, bảng workload, cấu trúc CI pipeline) cao hơn
hẳn chất lượng thông số cụ thể (ngưỡng VU, kết luận capacity).

**Bài học rút ra.** Cung cấp ngữ cảnh domain *trước* khi AI phân tích dữ liệu
thô: workload design của từng kịch bản, kiến trúc SUT, và ranh giới phân biệt
harness artifact với SUT defect. Không có ngữ cảnh đó, model lấp chỗ trống
bằng giả định hợp lý cho một kiến trúc chung — và những giả định đó sai trên
bất kỳ SUT nào đủ cụ thể.

## 6. Công bố bắt buộc (Mandatory Disclosure)

Tôi xác nhận rằng mọi prompt và output AI trong bài này được ghi lại trung
thực, không chỉnh sửa hậu kỳ, trong `reports/prompt-log.md` và các entry
`reports/ai-audit-report.md`. Công việc phân tích, rà soát, sửa lỗi và kết
luận là của tôi; AI chỉ là công cụ hỗ trợ được kiểm soát qua từng bước.

**Ký tên:** Hà Bảo Ngọc — 23127300 — 15/08/2026
