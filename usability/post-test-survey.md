# Mẫu Google Form — Khảo sát sau khi test (SUS)

Copy nội dung dưới đây vào Google Forms thủ công (Forms không có API tạo từ
text ở đây, nên đây là bản để bạn dựng form bằng tay — mất khoảng 5 phút).
Gửi cùng 1 link form cho cả 7 participant, nhưng nhớ đổi câu hỏi "Mã người
tham gia" mỗi lần / hoặc lọc theo timestamp để biết response nào của ai.

Thang đo dùng **SUS** (giữ nguyên câu tiếng Anh gốc + dịch tiếng Việt để giữ
đúng ý nghĩa gốc phục vụ chấm điểm — xem công thức tại
`.claude/skills/usability-evaluation/references/sus-scale.md`).

---

## Form title
**EShop Usability Test — Khảo sát sau trải nghiệm**

## Form description
> Bạn vừa thử thao tác tìm và thêm sản phẩm vào giỏ hàng trên EShop. Hãy
> đánh giá trải nghiệm của bạn — không có câu trả lời đúng/sai. Mất khoảng
> 2-3 phút.

## Section 1 — Thông tin buổi test

**Q1. Mã người tham gia (moderator điền giúp, ví dụ P1–P7)**
*Short answer*

**Q2. Ngày test**
*Date*

## Section 2 — System Usability Scale (SUS)

Loại câu hỏi: **Linear scale 1–5**
Nhãn 1 = "Hoàn toàn không đồng ý" (Strongly disagree)
Nhãn 5 = "Hoàn toàn đồng ý" (Strongly agree)

Tạo 10 câu hỏi linear-scale, mỗi câu dùng đúng nội dung sau (giữ cả bản Anh
lẫn Việt trong 1 ô câu hỏi):

1. "I think that I would like to use this system frequently." / Tôi nghĩ tôi sẽ muốn sử dụng hệ thống này thường xuyên.
2. "I found the system unnecessarily complex." / Tôi thấy hệ thống này phức tạp một cách không cần thiết.
3. "I thought the system was easy to use." / Tôi thấy hệ thống này dễ sử dụng.
4. "I think that I would need the support of a technical person to be able to use this system." / Tôi nghĩ tôi sẽ cần người có chuyên môn kỹ thuật hỗ trợ để dùng được hệ thống này.
5. "I found the various functions in this system were well integrated." / Tôi thấy các chức năng trong hệ thống này được tích hợp tốt với nhau.
6. "I thought there was too much inconsistency in this system." / Tôi thấy hệ thống này có quá nhiều điểm không nhất quán.
7. "I would imagine that most people would learn to use this system very quickly." / Tôi nghĩ hầu hết mọi người sẽ học cách dùng hệ thống này rất nhanh.
8. "I found the system very cumbersome to use." / Tôi thấy hệ thống này khá cồng kềnh/bất tiện khi sử dụng.
9. "I felt very confident using the system." / Tôi cảm thấy khá tự tin khi sử dụng hệ thống này.
10. "I needed to learn a lot of things before I could get going with this system." / Tôi cần phải học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này.

> Đừng đổi thứ tự / gộp bớt câu — công thức chấm SUS phụ thuộc vào đúng vị
> trí item lẻ (tích cực) và item chẵn (tiêu cực).

## Section 3 — Cảm nhận nhanh (tuỳ chọn, không bắt buộc trong đề nhưng hữu ích)

**Q13. Có điều gì khiến bạn thấy khó chịu/bối rối nhất trong lúc thao tác
không? (mô tả ngắn gọn)**
*Paragraph, optional*

---

## Sau khi thu thập

1. Google Forms → tab **Responses** → mở Google Sheet liên kết.
2. Với mỗi participant: tính điểm SUS theo công thức trong
   `.claude/skills/usability-evaluation/references/sus-scale.md`, ghi cả điểm
   thô từng câu lẫn điểm tổng vào `usability/sessions/session-0N.md` (mục
   "SUS / UEQ-S responses").
3. Đưa bảng điểm 7 người + trung bình vào `usability/analysis.md`.
