# Task 2 Session Notes - P05

## Session Metadata

- Session ID: P05
- Participant ID: P05
- Participant name: Trần Minh Quang
- Date/time: 15:30 02/08/2026
- Device/browser: Laptop/Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P05.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P05 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm bị lỗi; sau khi cập nhật, participant không tin dữ liệu đã lưu đúng vì danh sách/giá/tên sản phẩm thay đổi không nhất quán. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 9 phút 40 giây, dựa trên transcript từ `00:00` đến `09:40`.
- Hints/assist count: 0
- Error count: 5 lỗi/điểm friction chính được quan sát: category rỗng vẫn tạo được, required fields không rõ, edit mode khó nhận biết, product update sai/không đồng bộ ngay, và delete thiếu confirmation.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-01:16 | Setup / Admin Login | Participant đọc scenario, nhận thông tin đăng nhập và đăng nhập vào trang admin. | Setup / success path | `reports/usability/transcript/P05.txt` |
| 01:16-01:52 | Dashboard | Participant xem Dashboard và nhận xét doanh thu hiện là 0 do chưa có đơn hàng. | Success path / information overview | `reports/usability/transcript/P05.txt` |
| 01:52-02:50 | Category Management | Participant thử tạo category rỗng và thắc mắc vì hệ thống vẫn cho tạo; sau đó xóa category rỗng và tạo category “chuột”. Khi xóa không thấy confirmation. | Validation / risk perception | `reports/usability/transcript/P05.txt`; open answer Risk perception |
| 03:00-03:31 | Product Management - required fields | Participant thấy product form không highlight required fields rõ ràng và thử lưu khi còn thiếu dữ liệu. | Clarity / validation | `reports/usability/transcript/P05.txt`; open answer Clarity |
| 03:31-03:59 | Product Management - create product | Participant thêm sản phẩm thuộc category mới, nhưng phản ánh create product không có feedback rõ và phải kiểm tra danh sách để biết đã thêm chưa. | Feedback / trust | `reports/usability/transcript/P05.txt`; open answer Trust |
| 03:59-04:15 | Product Management - edit affordance | Sau khi bấm sửa, participant không biết edit form ở đâu vì UI không mở popup, không tự cuộn, và không thông báo rằng dữ liệu đã được fill lên form phía trên. | Navigation within page / clarity | `reports/usability/transcript/P05.txt`; open answer Clarity/Speed |
| 04:15-05:20 | Product Management - update result | Participant chỉnh giá nhưng thấy giá không cập nhật ngay; khi kiểm tra lại, edit một product còn làm tên sản phẩm khác bị đổi theo, gây hoang mang. | Task blocker / trust / consistency | `reports/usability/transcript/P05.txt`; open answer Speed |
| 05:20-05:38 | Product Management - delete product | Participant xóa product thử nghiệm; thao tác xóa không có confirmation nên participant đánh giá rủi ro nếu bấm nhầm. | Risk perception | `reports/usability/transcript/P05.txt`; open answer Risk perception |
| 05:38-07:40 | CSV Import | Participant import CSV thành công, thấy preview và thông báo số sản phẩm import thành công. Đây là phần participant tin tưởng nhất vì có sample, preview và feedback rõ. | Success path / positive feedback | `reports/usability/transcript/P05.txt`; open answer Trust |
| 07:47-09:40 | User Management / overall reflection | Participant vào danh sách user, xóa tài khoản thử nghiệm; thao tác xóa không có confirmation hoặc success message. Participant nhấn mạnh product edit cần popup hoặc auto-scroll để dễ hiểu hơn. | Risk perception / summary insight | `reports/usability/transcript/P05.txt`; open answers Clarity/Risk perception |

## Participant Quotes

- “Nhập CSV hiểu được cấu trúc từ file mẫu.”
- “Các bước xóa ở các màn hình chưa có thông báo pop-up.”
- “Bước sửa sản phẩm tự điền lên form mà không có thông báo gì khiến phải mất chút thời gian tìm kiếm.”
- “Tạo sản phẩm mới theo danh mục mới, tại bấm sửa không hiện pop-up mà auto fill lên form phải nhìn kĩ mới thấy.”
- “Không đủ an toàn vì không có confirmation dialog.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 3 | Không có ghi chú riêng. |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 1 | Không có ghi chú riêng. |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 4 | Không có ghi chú riêng. |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 2 | Không có ghi chú riêng. |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 3 | Không có ghi chú riêng. |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 3 | Không có ghi chú riêng. |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 4 | Không có ghi chú riêng. |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 1 | Không có ghi chú riêng. |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 5 | Không có ghi chú riêng. |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 3 | Không có ghi chú riêng. |

SUS score: 72.5

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Rõ: nhập CSV, hiểu được cấu trúc từ file mẫu rồi dùng AI sinh dữ liệu phù hợp; khi thành công thì có thông báo xác nhận. Chưa rõ: các bước xóa chưa có thông báo pop-up, bước sửa sản phẩm tự điền lên form mà không có thông báo gì khiến phải mất chút thời gian tìm kiếm. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Không. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Tạo sản phẩm mới theo danh mục mới, vì bấm sửa không hiện pop-up mà auto fill lên form, phải nhìn kĩ mới thấy. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Nhập dữ liệu thì participant tin là hoàn tất vì có thông báo xác nhận cũng như sản phẩm theo file nhập có hiển thị cụ thể. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Có và khá dễ thấy. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không đủ an toàn vì không có confirmation dialog. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Category form cho phép tạo danh mục rỗng. | Bug | Major | Transcript 01:52-02:14 |
| Product form không làm rõ required fields, làm participant phải thử và đoán. | Design issue / validation | Minor | Transcript 03:00-03:31 |
| Edit product dùng form phía trên nhưng không auto-scroll/popup/feedback nên khó nhận biết. | Design issue | Major | Transcript 03:59-04:15; open answer Speed |
| Product update không đồng bộ ngay và có thể làm sai tên sản phẩm khác. | Bug | Major | Transcript 04:15-05:20 |
| CSV import là pattern feedback tốt nên có thể dùng làm chuẩn cho create/update/delete. | Design issue / positive pattern | Minor | Transcript 05:38-07:40; open answer Trust |
| Thiếu confirmation dialog cho thao tác xóa category/product/user. | Bug | Major | Transcript 01:52-02:50; 05:20-05:38; 07:47-09:40 |

## Video Evidence
Link to video evidence: [https://youtu.be/z58SsUKV5Zg](https://youtu.be/z58SsUKV5Zg)