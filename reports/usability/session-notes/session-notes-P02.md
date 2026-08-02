# Task 2 Session Notes - P02

## Session Metadata

- Session ID: P02
- Participant ID: P02
- Participant name: Tống Nguyễn Nhật Tiến
- Date/time: 17:45 02/08/2026
- Device/browser: Window - Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P02.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P02 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm không hoàn tất đúng; sau khi sửa, các sản phẩm có sẵn bị lỗi hiển thị tên theo sản phẩm vừa sửa. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 1 phút 57 giây, dựa trên transcript từ `00:00` đến `01:57`.
- Hints/assist count: 0
- Error count: 3 lỗi chính được quan sát: tạo category rỗng, form product không chỉ rõ trường bắt buộc, và cập nhật sản phẩm làm sai hiển thị tên các sản phẩm khác.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:04-00:20 | Admin Login | Participant đọc yêu cầu và tự đăng nhập. Participant nhận xét không có cơ chế hiển thị/kiểm tra mật khẩu nên không chắc nhập đúng hay sai. | Clarity / confidence | `reports/usability/transcript/P02.txt` |
| 00:20-00:27 | Dashboard | Participant thấy Dashboard chỉ có tổng doanh thu và tổng số đơn hàng. | Clarity / information density | `reports/usability/transcript/P02.txt` |
| 00:27-00:42 | Category Management | Participant lỡ nhấn Enter khi chưa nhập tên category; UI không cảnh báo và cho tạo category không có tên. | Error recovery / validation | `reports/usability/transcript/P02.txt`; open answer Error recovery |
| 00:42-00:51 | Category Management | Participant thêm category hợp lệ tên “chuột” và hoàn thành bước tạo danh mục. | Success path | `reports/usability/transcript/P02.txt` |
| 00:51-01:12 | Product Management - create product | Participant vào Product Management, thấy form có khoảng 5 trường nhưng không biết trường nào bắt buộc. Khi thử không nhập tên, UI có chặn; sau khi điền tên thì thêm sản phẩm thành công. | Clarity / validation | `reports/usability/transcript/P02.txt`; open answer Clarity |
| 01:12-01:26 | Product Management - edit product | Participant sửa giá thành 600.000; sau khi sửa, các sản phẩm có sẵn cũng bị lỗi hiển thị tên của sản phẩm vừa sửa. | Task blocker / consistency / trust | `reports/usability/transcript/P02.txt` |
| 01:27-01:34 | Product Management - delete product | Participant xóa sản phẩm vừa thêm; sau khi xóa, các sản phẩm khác quay lại đúng tên ban đầu. Trong câu hỏi mở, participant ghi không có xác nhận khi xóa sản phẩm. | Risk perception / recovery by side effect | `reports/usability/transcript/P02.txt`; open answer Trust/Risk perception |
| 01:34-01:44 | CSV Import | Participant import sản phẩm từ CSV và thấy import thành công. | Success path | `reports/usability/transcript/P02.txt` |
| 01:44-01:57 | User Management | Participant vào phần người dùng, xóa tài khoản test và nhận thấy không có cảnh báo/xác nhận. | Risk perception | `reports/usability/transcript/P02.txt`; open answer Trust/Risk perception |

## Participant Quotes

- “Nó không có cái hiển thị mật khẩu, giờ mình không biết mình nhập sai hay nhập đúng nữa.”
- “Dashboard thì chỉ thấy mỗi tổng doanh thu với lại tổng số đơn hàng thôi.”
- “Danh mục có thể là không có cái tên được luôn nè, bị lỗi nè.”
- “Mình không biết là cái nào là trường bắt buộc hoặc không.”
- “Tất cả những cái sản phẩm đã có sẵn nó cũng bị lỗi hiển thị tên của sản phẩm mình vừa sửa.”
- “Sau khi xoá thì nó không có cảnh báo gì hết.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 2 | Tôi không phải là Admin |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 2 | Không phức tạp |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 4 |  |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 3 |  |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 2 |  |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 1 |  |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 4 |  |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 2 |  |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 3 |  |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 1 |  |

SUS score: 65

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Ở trang đăng nhập, tôi biết mình cần làm gì còn ở trang thêm sản phẩm tôi không biết trường nào là bắt buộc. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Không, khi tôi lỡ bấm thêm danh mục khi chưa điền tên thì web vẫn cho tạo danh mục rỗng. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Không. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Không có thông báo xác nhận khi xoá người dùng, sản phẩm, không có thông báo thành công khi tạo được danh mục và sản phẩm mới. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Có vì nó được hiển thị rõ ở sidebar. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không có. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Category rỗng vẫn được tạo khi submit thiếu tên. | Bug | Major | Transcript 00:27-00:42; open answer Error recovery |
| Form product không chỉ rõ trường bắt buộc. | Design issue | Minor | Transcript 00:51-01:01; open answer Clarity |
| Product edit làm sai hiển thị tên các sản phẩm khác. | Bug | Major | Transcript 01:12-01:26 |
| Thiếu confirmation/feedback khi xóa sản phẩm và người dùng. | Bug | Major | Transcript 01:27-01:57; open answers Trust/Risk perception |
| Dashboard thiếu thông tin tổng quan đủ giàu. | Design issue | Minor | Transcript 00:20-00:27 |

## Video Evidence
Link to video evidence: [https://youtu.be/CbMxIYhXP_g](https://youtu.be/CbMxIYhXP_g)