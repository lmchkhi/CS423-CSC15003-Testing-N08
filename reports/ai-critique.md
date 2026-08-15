# AI Critique — HW05 (§10)

Trong bài này AI được dùng cho ba nhiệm vụ: sinh test plan, phân tích log
hiệu năng (Entry #1 — `ai-audit-report.md`), và đề xuất mô hình CI. Nhận xét
này tập trung vào Entry #1 vì đó là giai đoạn duy nhất có một cuộc rà soát
độc lập đầy đủ với số liệu đối chiếu từ `.jtl`.

**AI sai ở đâu.** Bốn lỗi diễn giải được lập chứng đầy đủ trong
`reports/ai-analysis-review.md`. Đáng chú ý nhất: (1) AI đọc error % *gộp*
0.03% và kết luận Spike \"passed cleanly\", trong khi toàn bộ 157 lỗi tập
trung ở *một* label và *hai* cửa sổ đột biến — cấu trúc không thể thấy từ
một con số gộp; (2) AI gán p95 của dòng tổng hợp (139 ms) cho riêng endpoint
checkout, trong khi p95 thật của checkout là 82 ms; (3) AI đọc throughput thô
thành năng lực sản xuất đã kiểm chứng dù CPU đỉnh của SUT chỉ đạt 126.7%
*một* lõi trên máy 12 lõi và calibration không tìm được điểm gãy nào; (4) AI
đề xuất rate-limit `reset-password` vì 157 lỗi HTTP 400, trong khi đó là
artefact của con trỏ CSV dùng chung trong bộ khung kiểm thử, không phải
traffic lạm dụng.

**Vì sao AI không tự phát hiện.** File `.jtl` không mang theo ngữ nghĩa
domain: không có think-time, không có thông tin burst design, không có tín
hiệu CPU/RSS. Điều thú vị là arithmetic *thô* của AI đúng hoàn toàn — lỗi
nằm ở tầng diễn giải phía trên, nơi model tự tin rút kết luận khi câu hỏi mời
gọi câu trả lời cụ thể (ngưỡng, capacity) nhưng dữ liệu đầu vào không đủ để
trả lời chắc chắn. AI tự nhận giới hạn đúng lúc khi được hỏi về memory leak
(kết luận #6: *\"a proper leak check would need a memory/RSS time series...
which isn't in the `.jtl`\"*) — nhưng lại không áp dụng sự thận trọng đó
nhất quán cho throughput hay error-rate.

**Nguyên tắc rút ra.** Cung cấp ngữ cảnh domain *trước* khi AI phân tích:
workload model của từng kịch bản (think-time, burst windows), kiến trúc SUT
(số lõi, số kết nối DB, kích thước catalog), và ranh giới phân biệt harness
artifact với SUT defect. Không có ngữ cảnh đó, model sẽ lấp chỗ trống bằng
giả định hợp lý cho một kiến trúc *chung chung* — và những giả định đó sẽ
sai trên bất kỳ SUT nào đủ cụ thể.

