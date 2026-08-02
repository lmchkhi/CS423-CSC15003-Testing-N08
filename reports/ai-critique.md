# AI Critique

Sai sót của AI ở bài này rơi vào hai loại khác hẳn nhau.

Loại thứ nhất là bỏ sót do phạm vi. AI không tự khái quát một gap đã biết
sang ngữ cảnh mới: mục "dark mode contrast" bị bỏ sót ở **cả 4 màn hình**
(GUI-042, 084, 099, 110), vì mỗi lần soạn prompt IA01 cho màn mới tôi lại
quên nó. Tương tự, AI huấn luyện chủ yếu trên SUT tiếng Anh nên không tự
nghĩ ra rủi ro vỡ dấu tiếng Việt. Đó là thiên lệch do dữ liệu huấn luyện,
không phải lỗi logic.

Loại thứ hai nặng hơn nhiều. GUI-027 được đánh Failed với câu "scrollY = 0
ở mọi mốc thời gian", và tôi đã file bug, mở issue #99. Đo lại bằng bộ lấy
mẫu 200ms qua 2 mức trễ mạng, vị trí cuộn được khôi phục đúng: 1339 so với
1359 ban đầu, giữ nguyên suốt 26 giây. Phép đo gốc dừng ở 3.5 giây, trước
lượt khôi phục thứ hai của trình duyệt. Ở đây AI không thiếu phạm vi mà
**dừng đo sớm rồi phát biểu bằng ngôn ngữ tuyệt đối**, nghe như đã đo vét
cạn. Dạng sai này không tự lộ khi đọc lại, chỉ lộ khi chạy lại phép đo.
Tôi đã rút bug và đóng issue.

Nguyên tắc rút ra: AI là trợ lý kỷ luật tốt trong phạm vi được giao, nhưng
việc nhớ, khái quát và **đo lại** vẫn là trách nhiệm của người kiểm thử.
Cụ thể: mọi kết luận Failed dựa trên một phép đo có giới hạn thời gian đều
phải chạy lại với cửa sổ dài hơn trước khi được file thành bug.
