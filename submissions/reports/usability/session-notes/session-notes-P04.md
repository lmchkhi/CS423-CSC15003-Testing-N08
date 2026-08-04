# Task 2 Session Notes - P04

## Session Metadata

- Session ID: P04
- Participant ID: P04
- Participant name: Phan Nhựt Anh
- Date/time: 21:39 02/08/2026
- Device/browser: Macbook - Chrome
- Flow: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User
- Moderator: Thanh
- Recording/evidence path: `reports/usability/transcript/P04.txt`
- Transcript note: transcript được tạo từ Whisper nên observation dưới đây chỉ ghi các mốc quan trọng, kết hợp với SUS/câu hỏi mở của P04 để diễn giải.

## Outcome

- Task completion: Partial
- Reason for partial completion: chức năng cập nhật sản phẩm bị lỗi; sau khi cập nhật có thông báo thành công nhưng dữ liệu không lưu đúng và danh sách sản phẩm hiển thị sai. Các phần còn lại được ghi nhận là hoàn thành.
- Time on task: 4 phút 33 giây, dựa trên transcript từ `00:00` đến `04:33`.
- Hints/assist count: 0
- Error count: 5 lỗi/điểm friction chính được quan sát: tạo được category rỗng, product form thiếu hướng dẫn required fields, tạo product thiếu feedback rõ, cập nhật product sai dữ liệu/hiển thị, và thao tác xóa thiếu confirmation.

## Observation Notes

| Time | Screen/step | Observation | Friction type | Evidence |
| --- | --- | --- | --- | --- |
| 00:00-00:09 | Admin Login | Participant đăng nhập admin thành công. | Success path | `reports/usability/transcript/P04.txt` |
| 00:09-00:24 | Dashboard | Participant thấy Dashboard hiển thị tổng doanh thu và tổng số đơn hàng của hệ thống. | Success path / information overview | `reports/usability/transcript/P04.txt` |
| 00:24-01:11 | Category Management | Participant chuyển sang Danh mục, thử tạo category khi tên để trống; hệ thống không hiển thị lỗi và vẫn cho tạo thành công. Sau đó participant tạo category “Tai nghe” thành công. | Validation / error prevention | `reports/usability/transcript/P04.txt`; open answer Error recovery |
| 01:11-02:20 | Product Management - create product | Participant thấy form có khá nhiều trường nhập liệu nhưng không có hướng dẫn trường nào là bắt buộc. Sau khi tạo product “AirPod” giá 5 triệu thuộc category “Tai nghe”, hệ thống không có thông báo tạo thành công; participant phải kéo xuống danh sách mới thấy product vừa thêm. | Clarity / feedback | `reports/usability/transcript/P04.txt`; open answer Clarity/Trust |
| 02:20-02:42 | Product Management - edit product | Participant chuyển sang chỉnh sửa product, sửa mô tả thành “Mô tả cho AirPod” và sửa giá thành 10 triệu. Theo câu hỏi mở, participant phân vân vì thao tác sửa không có thông báo/chuyển trang rõ, phải tự lướt lên form để sửa. | Navigation within page / affordance | `reports/usability/transcript/P04.txt`; open answer Clarity |
| 02:42-03:15 | Product Management - update result | Sau khi lưu chỉnh sửa, hệ thống hiển thị thông báo thành công. Tuy nhiên tất cả sản phẩm có sẵn bị đổi tên thành “AirPod”, trong khi giá chưa được cập nhật. | Task blocker / trust / consistency | `reports/usability/transcript/P04.txt`; SUS Q5; open answer Speed/Trust |
| 03:15-03:34 | Product Management - delete product | Participant xóa product vừa tạo; sau khi xóa, các sản phẩm khác quay trở lại đúng tên ban đầu. Trong câu hỏi mở, participant phản ánh thao tác xóa không có confirmation. | Risk perception / recovery by side effect | `reports/usability/transcript/P04.txt`; open answer Risk perception |
| 03:34-03:46 | CSV Import | Participant thử chức năng import sản phẩm và quá trình import hoàn tất thành công. | Success path | `reports/usability/transcript/P04.txt` |
| 03:46-04:17 | User Management | Participant chuyển sang phần Người dùng và xóa tài khoản “Test”; sau khi xóa, hệ thống không hiển thị cảnh báo hoặc hộp thoại xác nhận. | Risk perception / feedback | `reports/usability/transcript/P04.txt`; open answer Trust/Risk perception |
| 04:17-04:33 | Overall reflection | Participant tổng kết đã phát hiện nhiều vấn đề liên quan đến kiểm tra dữ liệu đầu vào, phản hồi của hệ thống và chức năng cập nhật dữ liệu. | Summary insight | `reports/usability/transcript/P04.txt` |

## Participant Quotes

- “Khi mình tạo danh mục với tên để trống, hệ thống không hiển thị thông báo lỗi mà vẫn cho phép tạo thành công.”
- “Ở đây mình thấy có khá nhiều trường nhập liệu, nhưng không có hướng dẫn trường nào là bắt buộc.”
- “Sau khi bấm Lưu, mình không thấy thông báo tạo thành công.”
- “Tất cả sản phẩm có sẵn đều bị đổi tên thành ‘AirPod’, trong khi giá lại chưa được cập nhật.”
- “Hệ thống không hiển thị bất kỳ cảnh báo hay hộp thoại xác nhận nào.”

## SUS Raw Answers

| ID | Câu hỏi SUS | Điểm | Ghi chú / câu trả lời của participant |
| --- | --- | ---: | --- |
| Q1 | Tôi nghĩ rằng tôi muốn sử dụng hệ thống quản trị này thường xuyên. | 2 | Không có ghi chú riêng. |
| Q2 | Tôi thấy hệ thống quản trị này phức tạp một cách không cần thiết. | 2 | Tôi thấy hệ thống thiết kế khá đơn giản nhưng còn nhiều lỗi vặt. |
| Q3 | Tôi nghĩ hệ thống quản trị này dễ sử dụng. | 4 | Không có ghi chú riêng. |
| Q4 | Tôi nghĩ tôi cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống quản trị này. | 2 | Không có ghi chú riêng. |
| Q5 | Tôi thấy các chức năng khác nhau trong hệ thống quản trị này được tích hợp tốt với nhau. | 2 | Còn nhiều lỗi như khi thay đổi thông tin sản phẩm có thông báo thành công nhưng thông tin mới không được lưu; sau khi bấm lưu sản phẩm sau khi thay đổi thì toàn bộ tên của các sản phẩm khác bị thay đổi theo, chỉ khi xoá 1 sản phẩm thì các sản phẩm khác mới về lại như cũ. |
| Q6 | Tôi nghĩ hệ thống quản trị này có quá nhiều điểm không nhất quán. | 4 | Không có ghi chú riêng. |
| Q7 | Tôi cho rằng hầu hết mọi người có thể học cách sử dụng hệ thống quản trị này rất nhanh. | 4 | Không có ghi chú riêng. |
| Q8 | Tôi thấy hệ thống quản trị này rất rườm rà khi sử dụng. | 2 | Không có ghi chú riêng. |
| Q9 | Tôi cảm thấy rất tự tin khi sử dụng hệ thống quản trị này. | 2 | Khi thêm danh mục xong không có thông báo thành công, khi xoá sản phẩm hay xoá user không có thông báo xác nhận trước khi xoá, sau khi xoá cũng không có thông báo thành công. |
| Q10 | Tôi cần học khá nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống quản trị này. | 2 | Không khó hiểu để dùng nhưng còn nhiều lỗi và thiếu thông báo, feedback cho user. |

SUS score: 55.0

## Probe Answers

| Chủ đề | Câu hỏi | Câu trả lời của participant |
| --- | --- | --- |
| Clarity | Ở bước nào bạn thấy rõ nhất mình cần làm gì tiếp theo? Ở bước nào bạn phân vân nhất? | Bước dễ nhất là login, tạo danh mục. Bước phân vân nhất là sửa sản phẩm vì khi bấm vào UI không có thông báo hay chuyển sang page mới mà phải tự lướt lên trên đầu trang phần điền thông tin sản phẩm để sửa. |
| Error recovery | Khi thao tác sai, thiếu dữ liệu hoặc import/xóa không như mong đợi, giao diện có giúp bạn hiểu và sửa lỗi không? | Khi tạo danh mục nhưng quên nhập tên mà bấm tạo thì vẫn tạo được, không thấy bị chặn lại; khi import sản phẩm với giá âm cũng không thấy thông báo lỗi. |
| Speed | Bước nào làm bạn mất nhiều thời gian nhất hoặc phải dừng lại suy nghĩ lâu nhất? Vì sao? | Bước sửa sản phẩm vì sau khi sửa 1 sản phẩm thì danh sách sản phẩm hiển thị tên của toàn bộ sản phẩm theo tên sản phẩm được sửa; chỉ khi thêm hoặc xoá sản phẩm thì UI mới hiển thị lại đúng tên các sản phẩm khác. |
| Trust | Sau khi tạo/sửa/xóa/import dữ liệu, điều gì khiến bạn tin hoặc không tin rằng thao tác đã hoàn tất đúng? Có thông báo xác nhận hay feedback nào giúp bạn yên tâm không? | Nhiều chỗ không có feedback, ví dụ tạo danh mục, thêm/xoá sản phẩm, xoá user. Import CSV có hiển thị thành công bao nhiêu trên tổng số, cập nhật sản phẩm có thông báo thành công nhưng khi bấm sửa lại thì không thấy các thông tin đã thay đổi trước đó. |
| Navigation | Bạn có dễ tìm các màn hình Dashboard, Category, Product và User Management không? | Có, nó được hiển thị rõ ràng ở sidebar. |
| Risk perception | Với các thao tác xóa sản phẩm/người dùng, bạn có cảm thấy đủ an toàn trước khi xác nhận hành động không? Có confirmation dialog khi xóa không? | Không, không có confirmation dialog khi xoá sản phẩm hay user. |

## Potential Findings

| Finding candidate | Bug or design issue | Severity guess | Evidence |
| --- | --- | --- | --- |
| Category form cho phép tạo danh mục rỗng. | Bug | Major | Transcript 00:34-00:54; open answer Error recovery |
| Product form thiếu hướng dẫn required fields và không dẫn focus rõ khi chuyển sang edit mode. | Design issue | Minor | Transcript 01:18-01:32; open answer Clarity |
| Product update báo thành công nhưng dữ liệu không cập nhật đúng và làm sai hiển thị danh sách. | Bug | Major | Transcript 02:42-03:15; SUS Q5 |
| Thiếu feedback sau thao tác create/delete ở category/product/user. | Design issue / bug | Major | SUS Q9; open answer Trust |
| Thiếu confirmation dialog khi xóa sản phẩm/người dùng. | Bug | Major | Transcript 03:46-04:17; open answer Risk perception |

## Video Evidence
Link to video evidence: [https://youtu.be/be5Ke93kz3o](https://youtu.be/be5Ke93kz3o)