# Phân tích kết quả usability (HW03 Task 2, Phase 3)

## Điểm số

Công thức SUS chuẩn theo Brooke (1996): `SUS = 2.5 × (20 + tổng câu lẻ − tổng
câu chẵn)`. Chi tiết từng câu của từng người nằm trong
`usability/sessions/session-0N.md`.

| # | Người tham gia | Kết quả task | Điểm SUS |
|---|---|---|---|
| 1 | Nguyễn Hà Chiêu Dương | Y (có do dự) | 35 |
| 2 | Nguyễn Thành Đạt | Một phần (thêm dư sản phẩm) | 15 |
| 3 | Nguyễn Ngọc Trúc Mây | Y (có do dự) | 87.5 |
| 4 | Huỳnh Yến Nhi | Một phần (thêm nhiều số lượng không thành) | 20 |
| 5 | Dương Quang Thắng | Y | 57.5 |
| 6 | Nguyễn Quốc Huy | Y (đi lệch nhiệm vụ rồi tự sửa) | 75 |
| 7 | Lê Hữu Sang | **N (3 lần thử đều thất bại)** | 82.5 |
| **Trung bình** | | 4 Y / 2 một phần / 1 N | **53.2** |

Thấp nhất 15 (người #2), cao nhất 87.5 (người #3), độ lệch chuẩn tổng thể
khoảng 27.8. Độ tản mát này rất lớn so với một nhóm chỉ 7 người, và nó khớp
với quan sát định tính: trải nghiệm phụ thuộc nhiều vào chuyện từng người có
tình cờ hiểu ra cơ chế "bấm 2 lần" hay không, hơn là vào chất lượng giao diện
nói chung.

Mốc tham chiếu thường dùng cho SUS là 68 điểm cho mức "trung bình" (Bangor,
Kortum & Miller, 2008). Con số 53.2 nằm dưới mốc đó, nhưng bản thân giá trị
trung bình lại che mất vấn đề nghiêm trọng nhất mà nghiên cứu này tìm ra.

### Điểm SUS không đi cùng kết quả task

Trong bộ dữ liệu này, điểm SUS và việc task có hoàn thành hay không gần như
không liên quan tới nhau. Ví dụ rõ nhất là **người #7**: SUS 82.5, cao thứ nhì
trong 7 người, nhưng đây lại là buổi thất bại hoàn toàn, thử đủ 3 lần mà giỏ
hàng vẫn trống. Ở chiều ngược lại, người #2 có điểm thấp nhất (15) nhưng cuối
cùng vẫn đưa được sản phẩm vào giỏ, chỉ là thêm dư.

Lý do là SUS đo cảm nhận tổng thể về hệ thống, gồm điều hướng, bố cục, tốc độ
cảm nhận, chứ không đo độ tin cậy của riêng một bước. Brooke (1996) mô tả SUS
là một thang đo tổng hợp một chiều, dùng để so sánh giữa các hệ thống, không
phải công cụ chẩn đoán lỗi cụ thể. Nếu chỉ báo cáo con số 53.2 mà không kèm
phần phân tích định tính từ 7 buổi test, người đọc sẽ đánh giá thấp hẳn mức
nghiêm trọng của lỗi thêm vào giỏ hàng.

## Tổng hợp phát hiện

### Vấn đề thiết kế mang tính hệ thống

**1. Không có phản hồi trực quan sau khi bấm "Thêm vào giỏ hàng".** Đây là một
root cause duy nhất nhưng biểu hiện ra nhiều mức độ khác nhau ở 5 trên 7 người
(#1, #2, #3, #4, #7 nêu trực tiếp trong phần probe; #5 và #6 không phàn nàn
nhưng vẫn tự vào giỏ hàng kiểm tra bằng tay). Hậu quả quan sát được, xếp từ
nhẹ tới nặng:

- Bối rối tại chỗ, phải tự vào giỏ hàng kiểm tra (#1, #3).
- Hiểu là lỗi kỹ thuật nên bấm lại nhiều lần, kết quả là thêm dư sản phẩm
  ngoài ý muốn (#2).
- Task hoàn thành một phần, người dùng không rõ thao tác thêm nhiều số lượng
  có thành công hay không (#4).
- Task thất bại hoàn toàn sau 3 lần thử (#7).

Đây đúng là root cause đã xác định được từ kiểm thử GUI ở Task 1, ghi trong
`bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`: nút cần bấm 2 lần, lần đầu bị bỏ
qua im lặng, không có toast hay badge, số lượng không cộng dồn. Tôi không file
bug mới cho phát hiện này, thay vào đó cross-link 5 buổi test vào chính bug
report đó làm bằng chứng bổ sung từ người dùng thật.

Buổi pilot chạy độc lập trước cả 7 buổi chính thức cũng bắt đúng vấn đề này
(`usability/plan.md`, mục Pilot). Cùng một root cause xuất hiện ở 2 đợt thu
thập dữ liệu tách biệt nhau nên khó có khả năng là hiện tượng ngẫu nhiên của
riêng nhóm 7 người.

**2. Mất dấu sản phẩm mục tiêu khi đi qua lại nhiều trang.** Người #6, cũng là
người đánh giá giao diện tích cực nhất, vẫn thêm nhầm một sản phẩm ngoài nhiệm
vụ (iPhone 15 Pro Max thay vì Galaxy S24 Ultra) sau khi quay về trang chủ giữa
chừng. Chỉ 1 trên 7 người nên tôi xếp Minor.

Quan sát này có thể liên quan tới `bug-reports/BUG-IA03-HOMEPAGE-002.md` (từ
khóa tìm kiếm bị mất khi quay về trang chủ): nếu bộ lọc không được giữ lại,
người dùng quay lại danh sách đầy đủ 5 sản phẩm thay vì danh sách đã lọc và dễ
chọn nhầm. Tôi không kiểm chứng được mối liên hệ này ngay trong buổi test, nên
ghi lại như một giả thuyết cần xác minh thêm, không khẳng định.

### Bug liên quan (đều đã có sẵn từ Task 1, chỉ cross-link)

| Bug ID | Mức độ | Người tham gia bị ảnh hưởng | Liên kết |
|---|---|---|---|
| BUG-IA04-PRODUCTDETAIL-001 | Critical/P0 | #1, #2, #3, #4, #7 (5/7) | `bug-reports/BUG-IA04-PRODUCTDETAIL-001.md`, GitHub #100 |
| BUG-IA03-HOMEPAGE-002 (giả thuyết, chưa xác nhận) | Major | #6 (1/7, suy luận) | `bug-reports/BUG-IA03-HOMEPAGE-002.md` |

7 buổi test không làm lộ ra defect nào nằm ngoài các bug đã file ở Task 1. Mọi
điểm vướng quan sát được đều quy về 2 root cause đã biết ở trên. Điều này cho
thấy checklist GUI ở Task 1 đã bắt đúng lỗi lớn nhất từ trước khi có dữ liệu
người dùng thật.

### Quan sát đơn lẻ, chưa đủ căn cứ để file bug

Người #5 nói "nút số lượng bị ẩn", tức là ô chọn số lượng chưa đủ nổi bật trên
giao diện. Chỉ xuất hiện 1 lần, không lặp lại ở người khác, và có thể do thói
quen cá nhân, nên tôi ghi lại như một gợi ý cải tiến chứ chưa file bug.

## Xếp hạng theo mức độ nghiêm trọng

| Mức độ | Phát hiện | Bằng chứng |
|---|---|---|
| **Blocker** | Thêm vào giỏ hàng thất bại hoàn toàn sau 3 lần lặp lại đầy đủ chu trình, task không hoàn thành | `session-07.md` (người #7) |
| **Major** | Không có phản hồi trực quan sau khi bấm "Thêm vào giỏ hàng", khiến người dùng không chắc thao tác đã thành công, phải tự kiểm tra bằng tay hoặc bấm lại nhiều lần (dẫn tới thêm dư ở #2) | `session-01.md`, `session-02.md`, `session-03.md`, `session-04.md` |
| **Minor** | Mất dấu sản phẩm mục tiêu khi đi qua lại giữa nhiều trang, thêm nhầm sản phẩm ngoài nhiệm vụ | `session-06.md` (người #6) |
| **Minor** | Ô chọn số lượng trên trang chi tiết chưa đủ nổi bật | `session-05.md` (người #5) |

Thang phân loại theo mức độ nghiêm trọng dựa trên tiêu chí của Nielsen (1994):
tần suất gặp phải, mức tác động lên người dùng, và khả năng người dùng tự vượt
qua được.

## Ghi chú về phần AI hỗ trợ

AI (Claude) có tham gia vào việc áp công thức SUS cho 7×10 câu trả lời, gom
nhóm các điểm vướng từ 7 buổi test thành nhóm hệ thống và nhóm đơn lẻ, và đề
xuất thứ tự severity. Toàn bộ prompt và output nằm ở `reports/prompt-log.md`
và `reports/ai-audit-report.md` Entry #24, gồm cả các quyết định tôi tự đưa ra
ngược với đề xuất của AI: không file bug trùng lặp, và hạ kết luận về người #6
xuống thành giả thuyết chưa xác nhận.

## Tài liệu tham khảo

- Brooke, J. (1996). *SUS: A "quick and dirty" usability scale.* Usability
  Evaluation in Industry.
- Bangor, A., Kortum, P. & Miller, J. (2008). *An Empirical Evaluation of the
  System Usability Scale.* International Journal of Human-Computer Interaction.
- Nielsen, J. (1994). *Severity Ratings for Usability Problems.*
