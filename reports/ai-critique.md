# AI Critique

Sai sót rõ nhất của AI trong bài này không phải "không biết" điều gì. AI
chỉ trả lời đúng phạm vi được hỏi, không tự khái quát một gap đã biết
sang ngữ cảnh mới. Ví dụ: mục "dark mode contrast" bị bỏ sót ở **cả 4 màn
hình** tôi kiểm thử (GUI-042, 084, 099, 110). Không phải vì AI không hiểu
dark mode, mà vì mỗi lần tôi soạn prompt IA01 cho màn hình mới tôi lại quên
liệt kê nó, và AI không tự "nhớ" gap đã phát hiện ở batch trước để bù cho
batch sau. Tương tự với tiếng Việt: AI huấn luyện chủ yếu trên SUT tiếng
Anh nên không tự nghĩ ra rủi ro vỡ dấu/encoding khi hiển thị hoặc tìm kiếm
bằng tiếng Việt, dù đây là rủi ro hiển nhiên với EShop. Đó là thiên lệch do
dữ liệu huấn luyện, không phải lỗi logic.

Ở phần thực thi, AI làm tốt hơn khi được cấp công cụ thật (DevTools, gọi
API trực tiếp) và biết tự sửa giả thuyết sai giữa chừng (GUI-096) thay vì
giữ kết luận ban đầu. Ở Task 2, khi suy luận danh tính participant #6 bằng
loại trừ thay vì bằng chứng trực tiếp, AI trình bày kết luận này mượt như
sự thật đã xác nhận. Tôi phải tự đánh dấu là chưa hoàn chỉnh và cần xác nhận
thủ công, nếu không sẽ dễ nhầm thành dữ liệu chắc chắn.

Nguyên tắc tôi rút ra: AI là trợ lý kỷ luật tốt trong phạm vi được giao, nhưng
việc nhớ và khái quát các gap đã phát hiện vẫn là trách nhiệm của người kiểm
thử. Tôi cần một checklist cố định để tự soát prompt trước khi gửi.
