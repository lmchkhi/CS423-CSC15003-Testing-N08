# Session 07 — Người tham gia #7 (Lê Hữu Sang)

- **Ngày/giờ**: 27/07/2026, ~11:05 (giờ nộp SUS form; buổi test diễn ra ngay
  trước đó)
- **Đồng ý ghi hình (Consent to record)**: Yes (bằng lời, off-record, theo
  `session-script.md` bước 1 — không có trong bản ghi hình)
- **Nhiệm vụ giao**: dùng ô tìm kiếm gõ "keychron", mở chi tiết, mua 1 cái,
  bỏ vào giỏ hàng
- **Giờ bắt đầu/kết thúc task**: ~0:30 → ~2:15 (~105 giây, gồm **3 lần thử
  lại liên tiếp**) — điều phối viên chủ động kết thúc do hết thời gian/số
  lần thử, không phải participant tự báo hoàn thành
- **Kết quả task (task success)**: **N (No)** — **buổi test nghiêm trọng
  nhất trong 7 người**: sau 3 lần lặp lại đầy đủ chu trình (search → chi
  tiết → thêm vào giỏ hàng), giỏ hàng vẫn trống ở lần kiểm tra cuối cùng;
  participant không bao giờ nhận được xác nhận sản phẩm đã vào giỏ

## Ghi chú quan sát (structured, từ transcript `transcript/participant_7.tsv`)

| Thời điểm | Bước trong flow | Quan sát (khó khăn/lỗi/do dự/câu nói của người dùng) |
|---|---|---|
| 0:30–0:52 | Search → chi tiết (lần 1) | Search "keycrown" (keychron), mở chi tiết — trôi chảy |
| 0:52–0:60 | Thêm vào giỏ (lần 1) | *"nó đã bị bấm"* — thấy có phản ứng khi bấm nút |
| 0:62–0:72 | Kiểm tra — thất bại | *"ủa gì vậy... sao không có thêm được"* — hỏi điều phối viên, không thấy sản phẩm |
| 0:76–0:90 | Thử lại (lần 2) | Lặp lại đầy đủ: search → chi tiết → thêm vào giỏ hàng |
| 0:94–0:98 | Kiểm tra — vẫn thất bại | *"bấm vào giỏ hàng, nó không có cái gì hết"* — **giỏ hàng trống hoàn toàn** |
| 0:98–1:06 | Nghi ngờ nguyên nhân | *"mình bấm chưa đăng nhập ta?"* — tự đặt giả thuyết sai (nghĩ do chưa đăng nhập); hỏi lại điều phối viên, không rõ câu trả lời |
| 1:10–1:16 | *"mình nói lỗi rồi bạn à"* | Tự kết luận có lỗi hệ thống |
| 1:16–2:14 | Thử lại (lần 3) | Lặp lại toàn bộ chu trình lần thứ 3 — kết quả: *"nó vẫn không ra gì cả"* |
| 2:16 | Kết thúc do hết thời gian | Điều phối viên chủ động dừng, không phải participant tự báo xong |

**Đây là bằng chứng người dùng thật mạnh nhất cho cùng root cause đã ghi
nhận ở Task 1** — xem `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md` (nút
"Thêm vào giỏ hàng" cần bấm đúng 2 lần liên tiếp mới ghi nhận, không có
toast/badge xác nhận). Ở đây hậu quả nghiêm trọng hơn mức quan sát được khi
tự kiểm thử: một người dùng thật kiên trì thử tới 3 lần đầy đủ chu trình mà
vẫn không chắc chắn đã thành công — đủ điều kiện xếp **Blocker**, không chỉ
là Major.

## Kết quả SUS

Nguồn: CSV response 27/07/2026 11:05:44, hàng "Lê Hữu Sang".

| # | Câu SUS | Trả lời | Giá trị (1–5) |
|---|---|---|---|
| 1 | Muốn dùng thường xuyên | Hoàn toàn không đồng ý | 1 |
| 2 | Phức tạp không cần thiết | Hoàn toàn không đồng ý | 1 |
| 3 | Dễ sử dụng | Hoàn toàn đồng ý | 5 |
| 4 | Cần hỗ trợ kỹ thuật | Hoàn toàn không đồng ý | 1 |
| 5 | Các chức năng tích hợp tốt | Bình thường | 3 |
| 6 | Quá nhiều thiếu nhất quán | Không đồng ý | 2 |
| 7 | Học nhanh | Hoàn toàn đồng ý | 5 |
| 8 | Rườm rà, khó dùng | Hoàn toàn không đồng ý | 1 |
| 9 | Tự tin khi dùng | Hoàn toàn đồng ý | 5 |
| 10 | Cần học nhiều trước khi dùng | Hoàn toàn không đồng ý | 1 |

**SUS = 2.5 × [(1−1)+(5−1)+(3−1)+(5−1)+(5−1) + (5−1)+(5−1)+(5−2)+(5−1)+(5−1)]
= 2.5 × (14 + 19) = 82.5 / 100** — điểm cao thứ 3, **mâu thuẫn rõ rệt với
việc task thất bại hoàn toàn** (xem phân tích ở `usability/analysis.md`: SUS
đo cảm nhận tổng thể về hệ thống — điều hướng/tìm kiếm/UI nhìn chung dễ
dùng — chứ không phải "task này có thành công hay không"; đây là ví dụ rõ
nhất trong 7 buổi cho thấy vì sao SUS phải luôn đi kèm phân tích định tính,
đúng như `sus-scale.md` đã cảnh báo).

Ghi chú tự do trong form: *"Tôi thấy khi bấm thêm sản phẩm vào giỏ hàng
không hiện thông báo thành công hay thất bại."*

## Trả lời câu hỏi probe

- **Độ rõ ràng (Clarity)**: *"mình nghĩ là phần thêm vào giỏ hàng nó không
  có hiện một cái thông báo thành công hay thất bại nên rất khó để biết"* —
  xác nhận trực tiếp nguyên nhân gốc.
- **Khả năng phục hồi sau lỗi (Error recovery)**: *"mình nghĩ mình sẽ vào
  giỏ hàng mình coi, còn quay lại thì..."* — câu trả lời bỏ lửng, không có
  chiến lược phục hồi rõ ràng ngoài việc thử lại từ đầu (đã làm 3 lần, đều
  thất bại).
- **Tốc độ (Speed)**: *"khá nhanh và thuận tiện bởi vì chỉ cần vài click
  thôi"* — câu trả lời này **mâu thuẫn với kết quả task thực tế** (3 lần
  thử thất bại); có thể do participant đánh giá tốc độ điều hướng UI (nhanh
  thật) tách biệt khỏi việc kết quả cuối cùng có đúng hay không.
- **Độ tin cậy (Trust)**: hỏi về nhập thông tin/thanh toán → *"làm như có
  cái thanh toán đâu"* (né câu hỏi vì flow không có bước thanh toán); khi
  hỏi thẳng "có tin cậy để dùng ứng dụng này không" → **"mình nghĩ là
  không, tại vì nó ít thông tin"** — mức tin cậy thấp nhất, phù hợp với trải
  nghiệm thất bại lặp lại.
