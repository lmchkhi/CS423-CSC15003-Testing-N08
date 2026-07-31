# Usability Analysis — HW03 Task 2, Phase 3

## Scores

Công thức: `SUS = 2.5 × (20 + sum(odd) − sum(even))` — xem
`.claude/skills/usability-evaluation/references/sus-scale.md`. Chi tiết
từng câu/từng participant nằm trong `usability/sessions/session-0N.md`.

| # | Participant | Task success | SUS score |
|---|---|---|---|
| 1 | Nguyễn Hà Chiêu Dương | Y (hesitant) | 35 |
| 2 | Nguyễn Thành Đạt | Partial (over-add) | 15 |
| 3 | Nguyễn Ngọc Trúc Mây | Y (hesitant) | 87.5 |
| 4 | Huỳnh Yến Nhi | Partial (multi-add failed) | 20 |
| 5 | Dương Quang Thắng | Y | 57.5 |
| 6 | Nguyễn Quốc Huy | Y (task deviation, self-corrected) | 75 |
| 7 | Lê Hữu Sang | **N (3 lần thử thất bại)** | 82.5 |
| **Mean** | | 4 Y / 2 Partial / 1 N | **53.2** |

**Min** = 15 (participant #2) · **Max** = 87.5 (participant #3) · **Độ lệch
chuẩn (population)** ≈ 27.8 — độ tản mát rất lớn giữa 7 người, phản ánh
đúng những gì quan sát định tính cho thấy: trải nghiệm không đồng đều, phụ
thuộc nhiều vào việc từng người có tình cờ hiểu đúng cơ chế "bấm 2 lần" hay
không hơn là vào chất lượng UI tổng thể. Mốc tham khảo thường dùng cho SUS
là ~68 = "trung bình" (Bangor et al.) — 53.2 nằm **dưới** mốc này, nhưng bản
thân con số trung bình che giấu vấn đề nghiêm trọng nhất của nghiên cứu này
(xem "SUS vs. task success" bên dưới).

### SUS vs. task success — phát hiện quan trọng nhất của Phase 3

SUS **không tương quan** với việc task có thành công hay không trong dữ
liệu này — ví dụ rõ nhất là **participant #7**: SUS = 82.5 (cao thứ 3 trong
7 người) nhưng đây lại là buổi **thất bại hoàn toàn** (3 lần thử, giỏ hàng
vẫn trống). Ngược lại **participant #2** có SUS thấp nhất (15) dù cuối cùng
sản phẩm vẫn vào được giỏ hàng (chỉ là thêm dư). Kết luận: SUS đo cảm nhận
tổng thể về hệ thống (điều hướng, bố cục, tốc độ cảm nhận...), không phải
thước đo độ tin cậy của riêng bước "thêm vào giỏ hàng" — đúng như cảnh báo
trong `references/sus-scale.md` ("SUS is a single composite score, not a
diagnostic tool by itself"). Không có phân tích định tính (7 session file),
con số trung bình 53.2 sẽ khiến người đọc đánh giá thấp mức độ nghiêm trọng
thật sự của lỗi thêm-vào-giỏ-hàng.

## Synthesis

### Systemic design issues (nhiều participant cùng gặp)

1. **Không có phản hồi trực quan sau khi bấm "Thêm vào giỏ hàng"** — root
   cause duy nhất, xuất hiện dưới nhiều hình thức ở **5/7 người** (nêu trực
   tiếp trong probe: #1, #2, #3, #4, #7; #5/#6 không phàn nàn trực tiếp
   nhưng cả hai vẫn phải tự vào giỏ hàng/mô tả hành vi kiểm tra thủ công
   tương tự). Hệ quả quan sát được, từ nhẹ tới nặng:
   - Bối rối/do dự tại chỗ, phải tự vào giỏ hàng kiểm tra (#1, #3).
   - Hiểu lầm là lỗi kỹ thuật, bấm lại nhiều lần, dẫn tới thêm dư sản phẩm
     ngoài ý muốn (#2).
   - Task thất bại một phần — không rõ thao tác thêm nhiều số lượng có
     thành công không (#4).
   - Task thất bại hoàn toàn sau 3 lần thử (#7) — mức độ nghiêm trọng nhất.
   - Đây chính xác là root cause đã được xác định qua kiểm thử GUI Task 1:
     `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md` ("nút cần bấm 2 lần, lần
     đầu bị bỏ qua im lặng, không toast/badge, không cộng dồn số lượng").
     **Không file bug mới** — đã cross-link 5 session làm bằng chứng bổ
     sung trực tiếp vào bug report này (xem mục "Cũng xác nhận qua Usability
     Testing" trong file đó).
   - **Củng cố thêm bởi buổi pilot** (`usability/plan.md` §Pilot session):
     buổi pilot chạy độc lập, trước cả 7 buổi chính thức, cũng bắt đúng vấn
     đề này — cùng một root cause xuất hiện nhất quán qua 2 đợt thu thập dữ
     liệu độc lập, không phải hiện tượng ngẫu nhiên của riêng nhóm 7 người.
2. **Mất dấu mục tiêu khi điều hướng qua nhiều trang** — participant #6
   (người đánh giá giao diện tích cực nhất) vẫn thêm nhầm một sản phẩm
   ngoài nhiệm vụ (iPhone Pro Max thay vì Galaxy S24 Ultra) sau khi quay về
   trang chủ giữa chừng. Quan sát đơn lẻ (1/7) nên xếp Minor, nhưng có khả
   năng liên quan tới `bug-reports/BUG-IA03-HOMEPAGE-002.md` (từ khóa tìm
   kiếm bị mất khi bấm Back/quay về trang chủ) — nếu từ khóa lọc không được
   giữ lại, người dùng quay lại danh sách đầy đủ 5 sản phẩm thay vì danh
   sách đã lọc, dễ chọn nhầm sản phẩm. Đây là suy luận có cơ sở nhưng chưa
   được kiểm chứng trực tiếp trong session — ghi nhận như một giả thuyết
   cần kiểm chứng thêm, không khẳng định chắc chắn.

### Isolated bugs (không file mới — đã có sẵn, chỉ cross-link)

| Bug ID | Severity | Participants affected | Link |
|---|---|---|---|
| BUG-IA04-PRODUCTDETAIL-001 | Critical/P0 (đã có từ Task 1) | #1, #2, #3, #4, #7 (5/7) | `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`, GitHub #100 |
| BUG-IA03-HOMEPAGE-002 (liên hệ giả thuyết, chưa xác nhận) | Major (đã có từ Task 1) | #6 (1/7, suy luận) | `bug-reports/BUG-IA03-HOMEPAGE-002.md` |

Không phát hiện defect nào hoàn toàn mới ngoài các bug đã file ở Task 1 —
tất cả friction quan sát được trong 7 buổi test đều quy về (hoặc suy luận
hợp lý về) 2 root cause đã biết ở trên. Đây là tín hiệu tốt cho độ bao phủ
của checklist GUI ở Task 1 (đã bắt đúng lỗi lớn nhất từ trước khi có dữ liệu
người dùng thật).

### Isolated một-lần (Minor, không đủ điều kiện file bug)

- Participant #5: "nút số lượng bị ẩn" — ô/nút chọn số lượng không đủ nổi
  bật trên giao diện. 1/7, không lặp lại ở người khác, không đủ căn cứ để
  kết luận là defect (có thể do thói quen cá nhân) — ghi nhận làm gợi ý cải
  tiến UI, không file bug.

## Severity-ranked findings

| Severity | Finding | Evidence (session refs) |
|---|---|---|
| **Blocker** | Thêm vào giỏ hàng thất bại hoàn toàn sau 3 lần thử lặp lại đầy đủ chu trình — task không hoàn thành | `session-07.md` (participant #7) |
| **Major** | Không có phản hồi trực quan (toast/badge) sau khi bấm "Thêm vào giỏ hàng" khiến người dùng không chắc thao tác đã thành công, phải tự kiểm tra thủ công hoặc bấm lại nhiều lần (dẫn tới thêm dư sản phẩm ở #2) | `session-01.md`, `session-02.md`, `session-03.md`, `session-04.md` |
| **Minor** | Mất dấu sản phẩm mục tiêu khi điều hướng qua lại giữa nhiều trang, thêm nhầm sản phẩm ngoài nhiệm vụ | `session-06.md` (participant #6) |
| **Minor** | Ô/nút chọn số lượng không đủ nổi bật trên trang chi tiết sản phẩm | `session-05.md` (participant #5) |

## Ghi chú AI-assisted

Việc tính điểm SUS (áp dụng công thức cố định cho 7×10 câu trả lời), gộp
nhóm friction points từ 7 session thành systemic vs. isolated, và xếp hạng
severity ở trên có sự hỗ trợ của AI (Claude) — xem
`reports/ai-audit-report.md` Entry #24 và `reports/prompt-log.md` cho toàn
bộ prompt/output, bao gồm cả các quyết định thủ công (không file bug trùng
lặp, xếp participant #6 là giả thuyết chưa xác nhận thay vì kết luận chắc
chắn).
