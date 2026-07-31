# Usability Evaluation Plan — HW03 Task 2

## Objectives

- Xác định xem người dùng có tự tìm ra và dùng đúng ô tìm kiếm để lọc sản
  phẩm hay không (thay vì chỉ duyệt qua 5 sản phẩm có sẵn), và họ có gặp khó
  khăn gì khi từ khóa không khớp chữ hoa/thường hoặc chỉ khớp một phần tên.
- Xác định điểm nghẽn (bottleneck) lớn nhất trong luồng browse → search →
  chi tiết sản phẩm → chọn số lượng → thêm vào giỏ hàng, đặc biệt là ngay
  sau bước "Thêm vào giỏ hàng" — nơi `checklist/gui-checklist.md`
  (GUI-020/033/040, xem `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`) đã ghi
  nhận việc thiếu phản hồi trực quan (toast/badge) và cần bấm 2 lần mới thêm
  được. Mục tiêu là kiểm chứng bằng người dùng thật xem lỗi này có thực sự
  gây bối rối/mất niềm tin ở quy mô lớn hơn 1 người kiểm thử hay không.
- Đo mức độ tự tin (confidence) và độ tin cậy (trust) mà người dùng cảm nhận
  khi hoàn thành luồng này — đặc biệt là họ có chắc chắn sản phẩm/số lượng
  đã được ghi nhận đúng vào giỏ hàng hay không.

## Chosen end-to-end flow

**Browse products → search by keyword → open product detail → choose
quantity → add product to cart** (xem `CLAUDE.md` — phạm vi Task 2 đã chọn,
không trùng với flow của thành viên khác trong nhóm N08 theo quy tắc §5).

## Task scenario (goal-oriented, with a deliberate trade-off — see below)

Nhiệm vụ đầy đủ cho từng người tham gia: `usability/task-scenarios.md`.

Đề bài (§6, Phase 1) yêu cầu kịch bản "goal-oriented, not step-by-step" (ví
dụ: "Tìm áo khoác mùa đông dưới 500.000₫ và thanh toán bằng mã giảm giá").
Bản đang dùng lệch khỏi lý tưởng đó một chút, có chủ đích: mỗi câu nhiệm vụ
nói rõ "dùng ô tìm kiếm, gõ **<từ khóa>**, mở chi tiết, chọn mua **<N> cái**,
bỏ vào giỏ hàng" — cụ thể hơn mức "goal-oriented" thuần túy.

**Lý do lệch có chủ đích** (xem lịch sử 2 lần sửa trong
`usability/task-scenarios.md`): catalog SUT chỉ có 5 sản phẩm nằm gọn trên
1 màn hình. Với 1 câu nhiệm vụ chung chung kiểu "tìm 1 sản phẩm bạn thích",
người tham gia hoàn toàn có thể bấm thẳng "Xem chi tiết" từ lưới sản phẩm mà
**không bao giờ chạm vào ô tìm kiếm** — bước "search by keyword" của flow đã
chọn (§5) sẽ không bao giờ thực sự xảy ra và không thể quan sát được. Ép rõ
từ khóa cụ thể (đổi dạng viết hoa/thường/một phần tên giữa 7 người) là cách
duy nhất đảm bảo bước search luôn được thực hiện và đồng thời quan sát được
hành vi khớp từ khóa của search. Đánh đổi: nhiệm vụ kém "tự nhiên" hơn một
chút so với ví dụ mẫu của đề, nhưng vẫn giữ "goal, not click-by-click" ở
2 bước còn lại (không nói bấm nút nào để vào chi tiết, không nói bấm nút +
hay gõ số cho ô số lượng, không nói vị trí nút "Thêm vào giỏ hàng").

## Instrument

- **Scale**: SUS (System Usability Scale, 10 câu chuẩn — xem
  `.claude/skills/usability-evaluation/references/sus-scale.md`). Thu thập
  qua Google Form tiếng Việt (câu hỏi giữ đúng thứ tự/phân cực dương-âm gốc
  của SUS, dịch sát nghĩa — không đổi thứ tự vì công thức chấm điểm phụ
  thuộc vị trí). Link form không lưu trong repo (thông tin nội bộ Google
  Form); 7 phản hồi thật đã thu về nằm tại
  `usability/EShop Usability Test - Khảo sát Trải nghiệm Người dùng (SUS) (Responses) - Form Responses 1.csv`.
  File thiết kế mẫu ban đầu của form (`usability/post-test-survey.md`) đã
  được xóa sau khi form thật đã dựng xong và có phản hồi thật — CSV phản hồi
  mới là bằng chứng cần giữ, không phải bản nháp thiết kế.
- **Probe questions**: theo kịch bản `usability/session-script.md` §5, bám
  sát 4 khía cạnh bắt buộc của đề (§6 Phase 1):
  - **Clarity**: "Lúc nãy ở chỗ ... bạn hơi khựng lại, đang nghĩ gì vậy?"
  - **Error recovery**: "Có chỗ nào bấm nhầm không? Lúc đó xử lý sao?"
  - **Speed**: "Thấy nhanh/chậm hơn bạn nghĩ không? Bước nào lâu nhất?"
  - **Trust**: "Lúc thêm vào giỏ, bạn có chắc web ghi đúng số lượng/sản phẩm
    không?"

## Pilot session

**Có chạy 1 buổi pilot thật với 1 người ngoài danh sách 7 người chính
thức**, trước khi vào 7 buổi thật — nhưng **không ghi hình/ghi âm** buổi
này (khác với 7 buổi chính thức, đều có transcript trong
`usability/transcript/`), nên không có file bằng chứng thô để đính kèm.
Ghi nhận trung thực thay vì bịa file transcript không tồn tại; ngày cụ thể
chưa được ghi lại.

**Phát hiện chính từ pilot**: cùng vấn đề lớn nhất mà sau này 5/7 buổi
chính thức xác nhận lại — nút "Thêm vào giỏ hàng" không có phản hồi/xác
nhận rõ ràng (cùng root cause với `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`).
Việc buổi pilot (chạy độc lập, trước cả 7 buổi thật) đã bắt đúng vấn đề này
ngay từ sớm là một tín hiệu tốt cho độ tin cậy của phát hiện — không phải
ngẫu nhiên chỉ xuất hiện ở một nhóm nhỏ, mà lặp lại nhất quán qua 2 đợt thu
thập dữ liệu độc lập (pilot + 7 buổi chính thức).

Ngoài ra, kịch bản cũng trải qua 2 vòng tự rà soát/dry-run thiết kế (tách
biệt với buổi pilot ở trên) bắt được 2 lỗi kịch bản cụ thể trước khi chạy
7 buổi thật (xem lịch sử commit `fix(usability): correct price bands...` và
`fix(usability): force the search step...`, nội dung đầy đủ trong
`usability/task-scenarios.md`):

1. **Lỗi giá tiền**: mức giá gán cho nhiệm vụ (300.000₫–1.000.000₫) thấp hơn
   sản phẩm rẻ nhất trong catalog thật rất nhiều — không sản phẩm nào khớp,
   participant sẽ không thể hoàn thành nhiệm vụ. → Sửa: đối chiếu lại giá
   thật của 5 sản phẩm trên SUT đang chạy trước khi viết nhiệm vụ.
2. **Bước search không bị ép xảy ra**: câu nhiệm vụ gốc ("tìm 1 sản phẩm bạn
   thích") cho phép participant bỏ qua hoàn toàn ô tìm kiếm. → Sửa: giao từ
   khóa cụ thể bắt buộc gõ vào ô tìm kiếm (xem mục Task scenario ở trên).

**Khuyến nghị cho lần sau**: ghi hình/ghi âm buổi pilot giống hệt 7 buổi
chính thức — dù không tính vào 7 participant chính thức, đây vẫn là dữ liệu
quan sát thật rất có giá trị (ở đây đã xác nhận sớm phát hiện quan trọng
nhất của cả nghiên cứu) và nên có bằng chứng thô đi kèm thay vì chỉ ghi lại
kết luận.
