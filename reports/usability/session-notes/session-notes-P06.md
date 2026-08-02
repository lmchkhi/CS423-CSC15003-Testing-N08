# Task 2 Session Notes - P06

## Session Metadata

- Session ID: P06
- Participant ID: P06
- Participant name: Lâm Chí Khải
- Date/time: 21:10 02/08/2026
- Device/browser: Desktop Windows 10 - Google chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P06.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P06 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm bị lỗi; participant thấy cập nhật có thông báo thành công nhưng thay đổi không đúng và còn làm tên sản phẩm khác bị ảnh hưởng. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 4 phút 5 giây, dựa trên transcript từ `00:00` đến `04:05`.
- Hints/assist count: 0
- Error count: 4 lỗi/điểm friction chính được quan sát: product price thiếu đơn vị, product image URL không rõ, create/update product thiếu feedback đáng tin, và delete user thiếu confirmation.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-00:17 | Admin Login / Dashboard | Participant đăng nhập và xem Dashboard, nhận diện được tổng doanh thu và tổng số đơn hàng. | Success path | `reports/usability/transcript/P06.txt` |
| 00:18-00:30 | Category Management | Participant tạo category “ABC” và thấy category được cập nhật trên UI. | Success path | `reports/usability/transcript/P06.txt` |
| 00:30-00:59 | Product Management - create product | Participant nhập sản phẩm mới, nhưng phân vân vì field giá không ghi rõ đơn vị tiền tệ. | Clarity | `reports/usability/transcript/P06.txt`; open answer Clarity |
| 00:59-01:28 | Product Management - image URL | Participant không rõ phải lấy URL ảnh sản phẩm ở đâu. Đây là điểm phân vân được nhắc lại trong câu hỏi mở. | Clarity / content guidance | `reports/usability/transcript/P06.txt`; open answer Clarity |
| 01:28-01:51 | Product Management - save product | Sau khi lưu, form biến mất nhưng không có thông báo đã lưu thành công; participant phải tự kiểm tra danh sách sản phẩm ở dưới. | Feedback / trust | `reports/usability/transcript/P06.txt`; open answer Trust |
| 01:51-02:41 | Product Management - edit product | Participant cập nhật product và thấy có thông báo thành công, nhưng dữ liệu không cập nhật đúng; tên các sản phẩm khác bị đổi theo. | Task blocker / consistency / trust | `reports/usability/transcript/P06.txt`; SUS Q9; open answer Speed |
| 02:45-03:09 | Product Management - delete product | Participant xóa product thử nghiệm; product mất ngay lập tức và các tên sản phẩm còn lại quay lại đúng. | Risk perception / recovery by side effect | `reports/usability/transcript/P06.txt` |
| 03:11-03:40 | CSV Import | Participant chọn file CSV, xem danh sách sản phẩm trong file và import thành công. | Success path | `reports/usability/transcript/P06.txt` |
| 03:46-04:05 | User Management | Participant vào danh sách người dùng và xóa user; user bị xóa ngay, participant nhận xét thiếu thông báo xác nhận trước khi xóa. | Risk perception / feedback | `reports/usability/transcript/P06.txt`; open answer Risk perception |

## Participant Quotes

- “Ở đây đơn vị là gì?”
- “URL ảnh mình lấy URL ảnh ở đâu vậy?”
- “Sản phẩm được thêm chưa?”
- “Sau khi cập nhật thì có thông báo cập nhập thành công.”
- “Sao nó xóa lập tức vậy bạn?”
- “Nó thiếu cái đó ha.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 4 | Nếu là người quản trị thì có một số điểm participant muốn tốt hơn, như chức năng xác nhận xoá. |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 2 | Không có ghi chú riêng. |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 4 | Không có ghi chú riêng. |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 1 | Không có ghi chú riêng. |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 5 | Không có ghi chú riêng. |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 2 | Không có ghi chú riêng. |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 3 | Trang có vài điểm không rõ ràng so với các hệ thống quản lý hàng khác như Reflowhq. |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 2 | Không có ghi chú riêng. |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 2 | Cần khá cận trọng vì hệ thống không có xác nhận khi thực hiện thao tác xoá và participant phải kiểm tra lại nhiều thứ vì không rõ thao tác đã thực hiện chưa. |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 3 | Participant cần thử nghiệm với hệ thống trước để biết cần làm gì để lấy được kết quả mong đợi. |

SUS score: 70.0

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Participant thấy bước đăng nhập và di chuyển giữa các tác vụ là rõ ràng nhất. Bước phân vân là thêm danh mục sản phẩm và thêm ảnh sản phẩm. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Với giao diện hiện tại, thao tác sai thì participant phải tự kiểm tra mới thấy, giao diện không đề cập gì đến lỗi cập nhật sai. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Bước chỉnh sửa sản phẩm vì ban đầu participant không rõ đã chỉnh chưa; sau khi thực hiện lại và kiểm tra lại mới thấy là chưa chỉnh sửa. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Participant phải tự kiểm tra lại là đã chỉnh sửa chưa; tạo thì có thông báo đã thực hiện, còn xóa chỉ cập nhật lại mà không có thông báo đã xóa. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Giao diện khá dễ tìm. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không thấy đủ an toàn vì tất cả thao tác xóa đều thực hiện ngay lập tức, không có confirmation dialog. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Product price field thiếu đơn vị tiền tệ nên participant không chắc cách nhập. | Design issue | Minor | Transcript 00:46-00:58 |
| Product image URL field thiếu hướng dẫn nguồn ảnh/cách nhập. | Design issue | Minor | Transcript 00:59-01:28; open answer Clarity |
| Sau khi lưu product, UI thiếu success feedback rõ nên participant phải tự kiểm tra danh sách. | Design issue / bug | Major | Transcript 01:28-01:51; open answer Trust |
| Product update báo thành công nhưng không cập nhật đúng và làm sai tên sản phẩm khác. | Bug | Major | Transcript 01:51-02:41; open answer Speed/Error recovery |
| Thiếu confirmation dialog khi xóa user/product. | Bug | Major | Transcript 02:45-04:05; SUS Q1/Q9 |

## Video Evidence
Link to video evidence: [https://youtu.be/xFT_mmH-Z8Q](https://youtu.be/xFT_mmH-Z8Q)