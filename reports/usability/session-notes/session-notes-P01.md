# Task 2 Session Notes - P01

## Session Metadata

- Session ID: P01
- Participant ID: P01
- Participant name: Nguyễn Tuấn Anh
- Date/time: 15:00 02/08/2026
- Device/browser: Macbook - Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P01.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P01 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm không hoàn tất đúng dù UI báo cập nhật thành công; các phần còn lại được ghi nhận là hoàn thành theo ghi chú study.
- Time on task: 2 phút 59 giây, dựa trên transcript từ `00:00` đến `02:59`.
- Hints/assist count: 0
- Error count: 2 lỗi chính được quan sát rõ trong transcript: tạo được category rỗng và cập nhật sản phẩm không phản ánh dữ liệu mới.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-00:32 | Admin Login | Participant tự bắt đầu flow, nhập tài khoản `admin@eshop.com` và đăng nhập vào admin dashboard. | None | `reports/usability/transcript/P01.txt` |
| 00:32-00:43 | Dashboard | Participant nhìn thấy Dashboard nhưng mô tả giao diện “toàn trống” và chỉ nhận ra tổng số đơn hàng. | Clarity / feedback | `reports/usability/transcript/P01.txt` |
| 00:50-01:05 | Category Management | Participant thử thêm category khi chưa nhập tên và nhận thấy hệ thống tạo ra một category rỗng. | Error recovery / validation | `reports/usability/transcript/P01.txt`; SUS Q4 note |
| 01:11-01:18 | Category Management | Participant thêm category hợp lệ tên “tai nghe” và thấy category mới xuất hiện trong danh sách. | Success path | `reports/usability/transcript/P01.txt` |
| 01:21-01:46 | Product Management - create product | Participant thêm product “test 1”, nhập giá khoảng 500k, mô tả, chọn category “tai nghe” và lưu sản phẩm. Participant cũng nhận thấy dropdown category có lựa chọn rỗng. | Clarity / data quality | `reports/usability/transcript/P01.txt` |
| 01:51-02:24 | Product Management - edit product | Participant bấm sửa, form nhảy/lấp dữ liệu lên phía trên, lưu và thấy thông báo cập nhật thành công nhưng dữ liệu không được cập nhật như mong đợi. Participant thử lại với giá 600k nhưng vẫn kết luận “không có sửa được”. | Task blocker / trust / feedback mismatch | `reports/usability/transcript/P01.txt`; SUS Q5-Q6; open answers Error recovery, Speed, Trust |
| 02:24-02:31 | Product Management - delete product | Participant xóa product thử nghiệm và thấy sản phẩm bị xóa. Trong câu hỏi mở, participant ghi không thấy confirmation dialog khi xóa sản phẩm. | Risk perception | `reports/usability/transcript/P01.txt`; open answer Risk perception |
| 02:31-02:51 | CSV Import | Participant upload CSV và nhận thấy import được sản phẩm. | Success path | `reports/usability/transcript/P01.txt`; open answer Trust |
| 02:51-02:59 | Overall impression | Participant nhận xét tổng quan giao diện hơi khó hiểu. | Overall usability | `reports/usability/transcript/P01.txt` |
| Not clearly captured | User Management | Transcript P01 không ghi rõ đoạn inspect/delete user, nhưng theo ghi chú study từ người điều phối, các phần ngoài cập nhật sản phẩm đều hoàn thành. | Evidence gap | User-provided instruction in chat |

## Participant Quotes

- “Tại sao lại có category rỗng?”
- “Sản phẩm thông báo đã sửa nhưng dưới danh sách sản phẩm thì vẫn như cũ.”
- “Mình không có sửa được.”
- “Ngoại trừ phần sửa thì mọi thứ ok.”
- “Xoá sản phẩm không thấy confirmation dialog nha.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 2 | Tôi không phải admin |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 2 | Không quá phức tạp |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 4 |  |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 3 | Tại sao lại có category rỗng? |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 3 | Không sửa được sản phẩm? |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 4 | Sản phẩm thông báo đã sửa nhưng dưới danh sách sản phẩm thì vẫn như cũ |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 4 |  |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 1 |  |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 4 |  |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 1 |  |

SUS score: 65

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Ở bước thêm sản phẩm, mình thấy sẵn form thì cứ điền thôi. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Không, mình sửa báo thành công nhưng không thấy. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Ở bước sửa sản phẩm, lí do như trên. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Ngoại trừ phần sửa thì mọi thứ ok. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Có, ngay bên thanh sidebar. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Xoá sản phẩm không thấy confirmation dialog nha. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Category rỗng vẫn được tạo khi submit thiếu tên. | Bug | Major | Transcript 00:50-01:05; SUS Q4 note |
| Product edit báo thành công nhưng dữ liệu không cập nhật đúng. | Bug | Major | Transcript 01:51-02:24; SUS Q5-Q6; open answers |
| Edit product đưa dữ liệu lên form phía trên nhưng không đủ rõ cho participant. | Design issue | Minor | Transcript 01:51-01:59; open answer Speed |
| Xóa product không có confirmation dialog. | Bug | Major | Open answer Risk perception |
| Dashboard tạo cảm giác trống/thiếu thông tin tổng quan. | Design issue | Minor | Transcript 00:32-00:43 |
| CSV import được participant hiểu là hoàn thành. | Positive observation | N/A | Transcript 02:31-02:51 |

## Video Evidence
Link to video evidence: [https://youtu.be/iujw0Ou4ms8](https://youtu.be/iujw0Ou4ms8)