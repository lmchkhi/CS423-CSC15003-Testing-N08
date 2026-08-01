# Kế hoạch đánh giá usability (HW03 Task 2)

## Mục tiêu

- Xác định xem người dùng có tự tìm ra và dùng đúng ô tìm kiếm để lọc sản phẩm
  hay không, thay vì chỉ duyệt qua 5 sản phẩm có sẵn, và họ gặp khó khăn gì khi
  từ khóa không khớp chữ hoa chữ thường hoặc chỉ khớp một phần tên.
- Xác định điểm nghẽn lớn nhất trong luồng duyệt sản phẩm, tìm kiếm, mở chi
  tiết, chọn số lượng, thêm vào giỏ hàng. Đặc biệt là ngay sau bước "Thêm vào
  giỏ hàng", nơi checklist Task 1 (GUI-020/033/040, xem
  `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`) đã ghi nhận việc thiếu phản hồi
  trực quan và phải bấm 2 lần mới thêm được. Mục tiêu là kiểm chứng bằng người
  dùng thật xem lỗi này có thực sự gây bối rối ở quy mô lớn hơn một người kiểm
  thử hay không.
- Đo mức độ tự tin của người dùng khi hoàn thành luồng, cụ thể là họ có chắc
  chắn sản phẩm và số lượng đã được ghi nhận đúng vào giỏ hàng hay không.

## Luồng end-to-end đã chọn

Duyệt sản phẩm → tìm theo từ khóa → mở trang chi tiết → chọn số lượng → thêm
vào giỏ hàng. Phạm vi này đã khai báo trong `CLAUDE.md` và không trùng với
luồng của thành viên khác trong nhóm N08 theo quy tắc §5.

## Kịch bản nhiệm vụ

Nhiệm vụ đầy đủ cho từng người: `usability/task-scenarios.md`.

Đề bài (§6, Phase 1) yêu cầu kịch bản hướng mục tiêu chứ không phải hướng dẫn
từng bước, ví dụ "Tìm áo khoác mùa đông dưới 500.000₫ và thanh toán bằng mã
giảm giá". Bản tôi dùng lệch khỏi mức lý tưởng đó một chút và đây là lựa chọn
có chủ đích: mỗi câu nhiệm vụ nói rõ "dùng ô tìm kiếm, gõ **<từ khóa>**, mở chi
tiết, chọn mua **<N> cái**, bỏ vào giỏ hàng".

Lý do: catalog của SUT chỉ có 5 sản phẩm và nằm gọn trên một màn hình. Với một
câu nhiệm vụ chung chung kiểu "tìm một sản phẩm bạn thích", người tham gia hoàn
toàn có thể bấm thẳng "Xem chi tiết" từ lưới mà không bao giờ chạm vào ô tìm
kiếm. Bước tìm kiếm trong luồng đã chọn ở §5 sẽ không xảy ra và không quan sát
được. Giao từ khóa cụ thể, đổi cách viết hoa thường và độ khớp giữa 7 người, là
cách duy nhất để bước tìm kiếm luôn được thực hiện.

Đánh đổi: nhiệm vụ kém tự nhiên hơn ví dụ mẫu của đề. Bù lại, 2 bước còn lại
vẫn giữ đúng tinh thần hướng mục tiêu: không nói bấm nút nào để vào trang chi
tiết, không nói cách nhập ô số lượng, không chỉ vị trí nút "Thêm vào giỏ hàng".

## Công cụ đo

**Thang đo**: SUS (System Usability Scale), 10 câu chuẩn theo Brooke (1996).
Thu thập qua Google Form tiếng Việt, giữ nguyên thứ tự và phân cực dương âm của
bản gốc vì công thức chấm điểm phụ thuộc vào vị trí câu. Link form không lưu
trong repo; 7 phản hồi thật đã thu về nằm tại `usability/EShop Usability Test -
Khảo sát Trải nghiệm Người dùng (SUS) (Responses) - Form Responses 1.csv`.

**Câu hỏi probe**: theo `usability/session-script.md` mục 5, bám sát 4 khía
cạnh bắt buộc của đề (§6, Phase 1):

- Độ rõ ràng: "Lúc nãy ở chỗ ... bạn hơi khựng lại, đang nghĩ gì vậy?"
- Khả năng phục hồi sau lỗi: "Có chỗ nào bấm nhầm không? Lúc đó xử lý sao?"
- Tốc độ: "Thấy nhanh hay chậm hơn bạn nghĩ? Bước nào lâu nhất?"
- Độ tin cậy: "Lúc thêm vào giỏ, bạn có chắc web ghi đúng số lượng và sản phẩm
  không?"

## Buổi pilot

Tôi chạy 1 buổi pilot với một người ngoài danh sách 7 người chính thức, trước
khi vào các buổi thật. Buổi này không ghi âm nên không có transcript kèm theo,
khác với 7 buổi chính thức đều có file trong `usability/transcript/`. Ngày cụ
thể không được ghi lại.

Phát hiện chính từ pilot trùng với vấn đề lớn nhất mà 5 trên 7 buổi chính thức
sau đó xác nhận lại: nút "Thêm vào giỏ hàng" không có phản hồi hay xác nhận rõ
ràng, cùng root cause với `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`. Việc
pilot bắt được vấn đề này từ sớm, ở một đợt thu thập dữ liệu tách biệt, làm
tăng độ tin cậy của phát hiện.

Ngoài buổi pilot, kịch bản còn qua 2 vòng tự rà soát trước khi chạy thật, bắt
được 2 lỗi thiết kế (xem `usability/task-scenarios.md` và các commit
`fix(usability): correct price bands...`, `fix(usability): force the search
step...`):

1. **Sai khoảng giá**: mức giá gán cho nhiệm vụ (300.000₫ đến 1.000.000₫) thấp
   hơn sản phẩm rẻ nhất trong catalog rất nhiều, không sản phẩm nào khớp và
   người tham gia sẽ không thể hoàn thành nhiệm vụ. Đã sửa bằng cách đối chiếu
   giá thật của 5 sản phẩm trên SUT trước khi viết nhiệm vụ.
2. **Bước tìm kiếm không bị ép xảy ra**: câu nhiệm vụ gốc cho phép bỏ qua hoàn
   toàn ô tìm kiếm. Đã sửa bằng cách giao từ khóa cụ thể (xem mục Kịch bản
   nhiệm vụ ở trên).
