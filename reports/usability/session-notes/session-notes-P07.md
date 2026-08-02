# Task 2 Session Notes - P07

## Session Metadata

- Session ID: P07
- Participant ID: P07
- Participant name: Lâm Vĩ Khang
- Date/time: 18:00 02/08/2026
- Device/browser: Macbook - Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P07.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P07 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm bị lỗi; sau khi cập nhật, tất cả sản phẩm trong danh sách hiển thị theo tên product vừa sửa và dữ liệu mô tả/URL ảnh không giữ đúng. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 3 phút 48 giây, dựa trên transcript từ `00:00` đến `03:48`.
- Hints/assist count: 0
- Error count: 4 lỗi/điểm friction chính được quan sát: image không hiển thị đúng sau create, edit mode khó nhận biết, product update làm sai toàn danh sách, và delete user thiếu confirmation/success feedback.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-00:39 | Setup / Admin Login | Participant nhận hướng dẫn, đăng nhập vào tài khoản admin và vào Dashboard. | Setup / success path | `reports/usability/transcript/P07.txt` |
| 00:39-00:47 | Dashboard | Participant nhận diện Dashboard có tổng doanh thu và số lượng đơn hàng. | Success path / information overview | `reports/usability/transcript/P07.txt` |
| 00:47-01:03 | Category Management | Participant vào danh mục, thấy danh mục có sẵn và tạo category “iPad” thành công. | Success path | `reports/usability/transcript/P07.txt` |
| 01:03-01:34 | Product Management - create product | Participant tạo product thuộc category mới; product xuất hiện trong danh sách nhưng hình ảnh không hiển thị đúng. | Success path with visual issue | `reports/usability/transcript/P07.txt` |
| 01:34-02:18 | Product Management - edit product | Khi bấm sửa, participant không biết sản phẩm đang được sửa ở đâu; sau khi cập nhật, tất cả sản phẩm trong danh sách hiển thị theo tên product mới, URL ảnh và mô tả đã nhập trước đó bị mất. | Task blocker / clarity / trust | `reports/usability/transcript/P07.txt`; open answer Error recovery |
| 02:18-02:31 | Product Management - delete product | Participant xóa product thử nghiệm; sau khi xóa, các sản phẩm khác quay lại như cũ. | Recovery by side effect / risk perception | `reports/usability/transcript/P07.txt` |
| 02:32-03:01 | CSV Import | Participant chọn file CSV, xem preview, import thành công và thấy thông báo 2/2 sản phẩm được thêm. Participant cũng thấy sản phẩm mới xuất hiện trong danh sách. | Success path / positive feedback | `reports/usability/transcript/P07.txt`; open answer Trust |
| 03:01-03:48 | User Management | Participant vào danh sách người dùng và xóa user thứ hai; user mất khỏi danh sách nhưng không có màn hình confirm hoặc thông báo xóa thành công. | Risk perception / feedback | `reports/usability/transcript/P07.txt`; open answer Risk perception |

## Participant Quotes

- “Có cái sản phẩm mới ở dưới đây nhưng mà cái hình của nó lại chưa có được hiển thị đúng.”
- “Khi mà mình đi xuống đây thì tất cả mọi sản phẩm nó đều cập nhật theo cái tên của cái sản phẩm mới.”
- “Bấm vào sửa thì mình cũng không có biết là sản phẩm nó đang được sửa ở đâu.”
- “Sau khi import... có thông báo là 2/2 sản phẩm đã được thêm.”
- “Sau khi xóa thì nó cũng không có thông báo... không có cái màn hình để mình confirm.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 3 | Không có ghi chú riêng. |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 3 | Không có ghi chú riêng. |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 2 | Không có ghi chú riêng. |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 2 | Không có ghi chú riêng. |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 4 | Không có ghi chú riêng. |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 4 | Không có ghi chú riêng. |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 2 | Không có ghi chú riêng. |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 4 | Không có ghi chú riêng. |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 3 | Không có ghi chú riêng. |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 4 | Không có ghi chú riêng. |

SUS score: 42.5

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Rõ nhất ở bước thêm danh mục hay xoá người dùng, nhưng phân vân sau khi bấm sửa một sản phẩm. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Sau khi sửa sản phẩm, đột nhiên cả list sản phẩm bị sai thông tin, participant không biết phải làm gì để quay về như cũ. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Bước sửa sản phẩm vì UI không giúp biết phải sửa các thông tin ở đâu, phải cuộn lên mới thấy. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Sau khi import CSV, có preview và thông báo inline rằng các sản phẩm đã được import; participant lướt xuống dưới cũng thấy các sản phẩm mới đó. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Các phần đó được hiển thị trên sidebar nên cũng tương đối dễ tìm. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không, khi bấm xoá thì người dùng bị xoá hoàn toàn, không có dialog để confirm; nếu xoá nhầm thì coi như mất luôn. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Product image không hiển thị đúng sau khi tạo product. | Bug / design issue | Minor | Transcript 01:27-01:34 |
| Edit product không cho participant biết rõ đang sửa ở đâu. | Design issue | Major | Transcript 01:34-02:18; open answer Speed |
| Product update làm sai thông tin toàn bộ product list và mất dữ liệu URL/mô tả. | Bug | Major | Transcript 01:34-02:18; open answer Error recovery |
| CSV import có preview và inline success feedback, tạo cảm giác tin tưởng hơn các thao tác khác. | Design issue / positive pattern | Minor | Transcript 02:32-03:01; open answer Trust |
| Delete user không có confirmation dialog hoặc success message. | Bug | Major | Transcript 03:01-03:48; open answer Risk perception |

## Video Evidence
Link to video evidence: [https://youtu.be/grv-L0MSKrk](https://youtu.be/grv-L0MSKrk)