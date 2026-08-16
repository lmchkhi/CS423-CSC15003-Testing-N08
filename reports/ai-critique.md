# AI Critique — HW05 (§10)

Trong bài này AI được dùng cho ba nhiệm vụ: sinh test plan, phân tích log
hiệu năng, và đề xuất mô hình CI. Nhận xét này tập trung vào giai đoạn
phân tích `.jtl` (Entry #1 trong `ai-audit-report.md`) vì đó là giai đoạn
duy nhất có cuộc rà soát đối chiếu đầy đủ với số liệu thô.

**AI sai ở đâu.** Bốn lỗi diễn giải được lập chứng trong
`reports/ai-analysis-review.md`: (1) AI đọc error % gộp 0.03% và kết luận
Spike "passed cleanly", trong khi toàn bộ 157 lỗi tập trung ở một label và
hai cửa sổ đột biến; (2) AI gán p95 của dòng tổng hợp (139 ms) cho riêng
checkout, trong khi p95 thật của checkout là 82 ms; (3) AI đọc throughput
thô thành năng lực đã kiểm chứng dù CPU đỉnh chỉ đạt ~11% tổng năng lực
máy; (4) AI đề xuất rate-limit `reset-password` vì 157 lỗi, trong khi đó
là nhiễu do bộ khung kiểm thử.

**Vì sao AI không tự phát hiện.** File `.jtl` không mang ngữ nghĩa domain:
không có think-time, burst design, hay tín hiệu CPU/RSS. Arithmetic thô
của AI đúng hoàn toàn; lỗi nằm ở tầng diễn giải, nơi model tự tin rút kết
luận khi dữ liệu không đủ. Đáng chú ý: khi được hỏi về memory leak, AI tự
nhận "a proper leak check would need a memory/RSS time series... which
isn't in the `.jtl`" — nhưng không áp dụng sự thận trọng đó cho throughput
hay error-rate.

**Nguyên tắc rút ra.** Cung cấp ngữ cảnh domain trước khi AI phân tích:
workload model, kiến trúc SUT, ranh giới giữa harness artifact và SUT
defect. Không có ngữ cảnh đó, model sẽ lấp chỗ trống bằng giả định hợp lý
cho kiến trúc chung chung — và những giả định đó sẽ sai trên bất kỳ SUT
nào đủ cụ thể.
