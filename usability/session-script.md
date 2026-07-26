# Kịch bản buổi test — Member 1

Flow: Browse products → search by keyword → open product detail → choose
quantity → add product to cart. Dùng cho cả pilot + 7 buổi thật, nói tự
nhiên theo ý mình, không cần học thuộc — mấy dòng in nghiêng bên dưới chỉ là
gợi ý nội dung cần có, không phải thoại phải đọc y chang.

## Ghi hình từ đâu tới đâu?

Đề chỉ yêu cầu quay lúc họ **thao tác thật** (friction points, errors,
hesitation) — không bắt phải có cảnh xin consent hay chào hỏi trên video.

- Xin phép quay bằng miệng trước, off-record (không cần lên hình đoạn này).
- **Bấm record ngay lúc giao nhiệm vụ** (bước 2) — đúng lúc task bắt đầu,
  vừa để tính giờ, vừa có sẵn bằng chứng bạn giao mục tiêu chứ không dẫn
  dắt từng bước.
- **Dừng ghi sau phần probe questions** (bước 5). Đoạn điền Google Form
  không cần trong video.

## 1. Mở đầu (~15s, off-record)

Nói vài câu tự nhiên, đại ý:
- Xin phép quay màn hình + âm thanh
- Cảm ơn họ dành thời gian
- *"Mình đang test cái web thôi, không test bạn, nên sai gì cũng là do web"*
- *"Vừa làm vừa nói ra bạn đang nghĩ gì nha, kiểu 'tao đang tìm nút này'..."*

*(Bấm record ngay sau đoạn này, trước khi giao nhiệm vụ ở bước 2.)*

## 2. Giao nhiệm vụ

Đọc đúng câu ứng với số thứ tự participant trong
`usability/task-scenarios.md` (mỗi người 1 câu hơi khác nhau về giá/số
lượng, cùng cấu trúc). Chỉ nói mục tiêu, không chỉ bấm nút nào. Bấm giờ ngay
sau câu này.

## 3. Trong lúc họ làm

- Im lặng quan sát, không gợi ý, không giải thích UI
- Chỉ giúp khi họ bí thật sự (im lặng >15-20s, hỏi thẳng "mình bị kẹt rồi")
- Note nhanh vào `usability/sessions/session-0N.md`: mốc thời gian — họ đang
  ở bước nào — thấy gì (lỗi, do dự, câu buột miệng)
- Có can thiệp thì ghi rõ can thiệp lúc nào, gợi ý gì — để khi tính task
  success không bị lẫn với việc họ tự làm được

## 4. Kết thúc task

Xong (hoặc bỏ cuộc / quá ~10 phút): *"Ok xong rồi, cảm ơn bạn!"* — ghi giờ
bắt đầu/kết thúc + task success (Yes/Partial/No).

## 5. Probe questions (hỏi miệng)

Bám vào cái mình vừa thấy họ làm, không hỏi chung chung — xem thêm
`.claude/skills/usability-evaluation/references/probe-questions.md`:

- **Clarity**: "Lúc nãy ở chỗ \<...> bạn hơi khựng lại, đang nghĩ gì vậy?"
- **Error recovery**: "Có chỗ nào bấm nhầm không? Lúc đó xử lý sao?"
- **Speed**: "Thấy nhanh/chậm hơn bạn nghĩ không? Bước nào lâu nhất?"
- **Trust**: "Lúc thêm vào giỏ, bạn có chắc web ghi đúng số lượng/sản phẩm
  không?"

*(Dừng ghi hình ở đây.)*

## 6. Sau khi tắt máy quay

Gửi link Google Form (`usability/post-test-survey.md`) cho họ tự điền SUS —
đừng đọc hộ, để họ tự đánh giá không bị mình ảnh hưởng. Điền nốt
`session-0N.md` trong ~15 phút sau đó, đừng để lâu rồi quên chi tiết.
