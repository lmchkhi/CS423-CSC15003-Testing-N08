# Task 2 Session Notes - P03

## Session Metadata

- Session ID: P03
- Participant ID: P03
- Participant name: Lê Phương Vũ
- Date/time: 20:22 02/08/2026
- Device/browser: Window - Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P03.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P03 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm bị lỗi; sau khi cập nhật, tất cả sản phẩm còn lại đổi tên theo sản phẩm vừa sửa. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 1 phút 38 giây, dựa trên transcript từ `00:00` đến `01:38`.
- Hints/assist count: 0
- Error count: 3 lỗi chính được quan sát: Dashboard thiếu thông tin hỗ trợ, form product không thể hiện rõ required fields, và cập nhật sản phẩm làm sai hiển thị danh sách.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-00:03 | Admin Login | Participant bắt đầu bằng việc đăng nhập. Transcript không ghi nhận lỗi đăng nhập. | Success path | `reports/usability/transcript/P03.txt` |
| 00:03-00:12 | Dashboard | Participant nhận xét Dashboard khá trống, đề xuất thêm biểu đồ doanh thu và đơn hàng theo ngày/tháng/tuần. | Information density / clarity | `reports/usability/transcript/P03.txt` |
| 00:12-00:18 | Category Management | Participant vào phần danh mục và thêm category mới “tai nghe” thành công. | Success path | `reports/usability/transcript/P03.txt` |
| 00:22-00:43 | Product Management - create product | Participant nhập sản phẩm “Airpods”, giá 500 và thấy sản phẩm được tạo. | Success path | `reports/usability/transcript/P03.txt` |
| 00:43-00:57 | Product Management - required fields | Participant nhận thấy trước đó chưa nhập mô tả nhưng vẫn lưu được, đồng thời UI không thể hiện rõ trường nào là bắt buộc. | Clarity / validation | `reports/usability/transcript/P03.txt`; SUS/open answers |
| 00:58-01:08 | Product Management - edit product | Participant cập nhật sản phẩm; sau khi cập nhật, tất cả sản phẩm còn lại đổi tên theo sản phẩm vừa sửa. | Task blocker / consistency / trust | `reports/usability/transcript/P03.txt`; SUS Q6 |
| 01:08-01:14 | Product Management - delete product | Participant xóa sản phẩm; danh sách quay trở lại như cũ. Trong câu hỏi mở, participant phản ánh xóa là lập tức xóa, không hỏi lại. | Risk perception / recovery by side effect | `reports/usability/transcript/P03.txt`; open answer Risk perception |
| 01:14-01:27 | CSV Import | Participant import sản phẩm từ CSV và thấy thao tác thành công. | Success path | `reports/usability/transcript/P03.txt` |
| 01:27-01:38 | User Management | Participant vào phần người dùng và xóa thử một người dùng. Transcript ghi nhận user bị xóa, nhưng không có đoạn xác nhận/cảnh báo. | Risk perception | `reports/usability/transcript/P03.txt`; open answer Risk perception |

## Participant Quotes

- “Phần dashboard khá là trống nha.”
- “Nên cần có thêm biểu đồ doanh thu với lại đơn hàng theo ngày tháng tuần.”
- “Nãy mình chưa nhập vào mô tả mà nó vẫn lưu được.”
- “Nó thể hiện các trường bắt buộc gì, nên thêm những cái đó.”
- “Khi cập nhật thì nó bị lỗi là tất cả những sản phẩm còn lại đều thay đổi tên theo luôn.”
- “Khi bấm nút xóa là lập tức xóa đi không có hỏi lại người dùng.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 2 | Chưa đầy đủ những CRUD |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 2 | Giao diện đơn giản, không phức tạp |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 3 | Khá dễ để sử dụng |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 2 | Không, nhưng thiếu và xác nhận khiến thao tác có thể bị nhầm lẫn |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 1 | Các trang có bố cục nhất quán nhưng thiếu liên kết dữ liệu qua lại |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 4 | Phần sửa sản phẩm khi sửa xong tất cả sản phần còn lại đều đổi theo |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 4 | Cấu trúc đơn giản |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 2 | Không rườm rà |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 2 | Thiếu thao tác xác nhận khi xóa |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 1 | Không cần học nhiều |

SUS score: 52.5

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Phân vân nhất là ở form thêm sản phẩm vì không có label cố định. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Không, không thấy bất cứ thông báo lỗi nào hiện khi để trống hoặc nhập sang định dạng. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Thêm sản phẩm, vì phải đoán ý nghĩa toàn ô không có label. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Không có thông báo xác nhận khi thao tác hoàn tất. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Có, khá dễ vì có sidebar liệt kê rõ ràng. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không an toàn, khi bấm nút xóa là lập tức xóa đi không có hỏi lại người dùng là có muốn xóa hay không. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Dashboard quá trống, thiếu biểu đồ hoặc phân tích theo thời gian. | Design issue | Minor | Transcript 00:03-00:12 |
| Form product không thể hiện rõ trường bắt buộc/label cố định. | Design issue | Minor | Transcript 00:43-00:57; open answers Clarity/Speed |
| Product edit làm sai hiển thị tên toàn bộ sản phẩm còn lại. | Bug | Major | Transcript 00:58-01:08; SUS Q6 |
| Thiếu thông báo lỗi/khả năng phục hồi khi nhập sai hoặc thiếu dữ liệu. | Bug / design issue | Major | Open answer Error recovery |
| Thiếu confirmation dialog khi xóa sản phẩm/người dùng. | Bug | Major | Transcript 01:08-01:38; open answer Risk perception |

## Video Evidence
Link to video evidence: [https://youtu.be/ImvQCFItRic](https://youtu.be/ImvQCFItRic)