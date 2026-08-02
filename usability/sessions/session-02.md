# Session 02: Người tham gia #2 (Nguyễn Thành Đạt)

- **Ngày/giờ**: 26/07/2026, ~21:28 (giờ nộp SUS form; buổi test diễn ra ngay
  trước đó)
- **Đồng ý ghi hình (Consent to record)**: Yes (bằng lời, off-record, theo
  `session-script.md` bước 1, không có trong bản ghi hình)
- **Bản ghi hình buổi test**: https://youtu.be/czE9kNIG_y0
- **Nhiệm vụ giao**: dùng ô tìm kiếm gõ "GALAXY" (viết hoa), mở chi tiết,
  mua 1 cái, bỏ vào giỏ hàng
- **Giờ bắt đầu/kết thúc task**: ~0:16 → ~1:17 (~61 giây)
- **Kết quả task (task success)**: **Partial**, sản phẩm cuối cùng có vào
  giỏ hàng, nhưng do bấm nút "Thêm vào giỏ hàng" lặp lại nhiều lần (tưởng nút
  bị lỗi vì không có phản hồi), giỏ hàng kết thúc với **nhiều dòng sản phẩm
  hơn ý định ban đầu**, không phải kết quả "làm đúng như giao", mà là hệ
  quả của một defect

## Ghi chú quan sát (structured, từ transcript `transcript/participant_2.tsv`)

| Thời điểm | Bước trong flow | Quan sát (khó khăn/lỗi/do dự/câu nói của người dùng) |
|---|---|---|
| 0:16–0:26 | Search | Gõ "GALAXY", search, không gặp khó khăn |
| 0:26–0:33 | Chọn sản phẩm | Thấy 1 sản phẩm, mở chi tiết |
| 0:33–0:46 | Thêm vào giỏ (lần 1) | *"Đã thêm chưa ta?"*, không chắc thao tác đã thành công |
| 0:46–0:56 | Nghi ngờ có lỗi | *"Hình như là nó bị vấn đề gì rồi"*, nhờ điều phối viên xác nhận có phải nút bị lỗi |
| 0:56–1:08 | Bấm lại nhiều lần | Bấm "Thêm vào giỏ hàng" lặp lại vì tưởng lần trước không ăn, **đúng hành vi của bug đã biết ở Task 1** (`BUG-IA04-PRODUCTDETAIL-001`, cần bấm nhiều lần, không có toast/badge xác nhận) |
| 1:08–1:15 | Phát hiện over-add | *"Hình như là mình bấm thêm vô nhiều quá rồi"*, tự nhận ra giỏ hàng có nhiều hơn ý định |
| 1:17 | Kết thúc | Điều phối viên dừng task |

## Kết quả SUS

Nguồn: CSV response 26/07/2026 21:28:42, hàng "Nguyễn Thành Đạt".

| # | Câu SUS | Trả lời | Giá trị (1–5) |
|---|---|---|---|
| 1 | Muốn dùng thường xuyên | Hoàn toàn không đồng ý | 1 |
| 2 | Phức tạp không cần thiết | Hoàn toàn đồng ý | 5 |
| 3 | Dễ sử dụng | Hoàn toàn không đồng ý | 1 |
| 4 | Cần hỗ trợ kỹ thuật | Bình thường | 3 |
| 5 | Các chức năng tích hợp tốt | Hoàn toàn không đồng ý | 1 |
| 6 | Quá nhiều thiếu nhất quán | Hoàn toàn đồng ý | 5 |
| 7 | Học nhanh | Không đồng ý | 2 |
| 8 | Rườm rà, khó dùng | Hoàn toàn đồng ý | 5 |
| 9 | Tự tin khi dùng | Không đồng ý | 2 |
| 10 | Cần học nhiều trước khi dùng | Bình thường | 3 |

**SUS = 2.5 × [(1−1)+(1−1)+(1−1)+(2−1)+(2−1) + (5−5)+(5−3)+(5−5)+(5−5)+(5−3)]
= 2.5 × (2 + 4) = 15 / 100**: điểm thấp nhất trong 7 người, khớp với trải
nghiệm bị over-add do bug thật.

Ghi chú tự do trong form: *"tôi có bấm để thêm vào giỏ hàng thì hệ thống
không ghi nhận cho tôi cũng như phải bấm vào phần chi tiết cũng vậy, nhưng
mà khi bấm vào giỏ hàng tôi thấy quá nhiều sản phẩm tôi đã bấm thêm"*, xác
nhận trực tiếp quan sát ở transcript.

## Trả lời câu hỏi probe

- **Độ rõ ràng (Clarity)**: *"lúc nãy ở chỗ bạn bấm những cái nút thêm giỏ
  hàng thì mình thấy bạn hơi phân vân"* → participant: *"mình nghĩ cái nút
  nó bị một vấn đề gì đó... giống cái nút bị lỗi"*, không rõ ràng, hiểu lầm
  là lỗi kỹ thuật chứ không phải thiếu feedback.
- **Trust**: *"mình không có biết là đã thêm vô bao nhiêu món rồi... mình
  không biết là mình đã thêm vô hay chưa"*, mất niềm tin ngay tại thời điểm
  thao tác, chỉ phát hiện ra vấn đề (over-add) sau khi việc đã rồi.
- **Tốc độ / Error recovery**: không được hỏi trực tiếp trong buổi này (chỉ
  hỏi 1 câu clarity), quan sát gián tiếp: hành vi "bấm lại nhiều lần" chính
  là một nỗ lực error-recovery thất bại (không giải quyết được sự mơ hồ,
  chỉ tạo thêm lỗi mới là over-add).
