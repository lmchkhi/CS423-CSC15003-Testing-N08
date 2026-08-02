# Task 2 - Severity-Ranked Usability Findings

Nguồn dữ liệu:

- `reports/usability/usability-plan.md`
- `reports/usability/participants.md`
- `reports/usability/sus-responses.csv`
- `reports/usability/sus-summary.md`
- `reports/usability/session-notes/session-notes-P01.md` đến `reports/usability/session-notes/session-notes-P07.md`
- `reports/usability/transcript/P01.txt` đến `reports/usability/transcript/P07.txt`
- `SystemRequirementsSpecification.md`, FR-13 đến FR-16 và FR-19

## Summary

Tất cả 7 participant hoàn thành được hầu hết flow admin: đăng nhập, xem Dashboard, tạo category, tạo/xóa product, import CSV và inspect/delete user. Tuy nhiên tất cả session được đánh giá `Partial` vì bước cập nhật product bị lỗi, làm participant không hoàn thành trọn vẹn create/edit/delete product flow. SUS trung bình là 60.4, nằm ở mức marginal; điểm thấp nhất là P07 với 42.5 và điểm cao nhất là P05 với 72.5.

## Severity Ranking

| Finding ID | Theme | Type | Severity / Priority | Participants affected | Evidence | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| USAB-F-001 | Cập nhật product không đáng tin và làm sai product list | Bug | Critical / P0 | P01, P02, P03, P04, P05, P06, P07 | `reports/usability/session-notes/session-notes-P01.md` đến `reports/usability/session-notes/session-notes-P07.md`; FR-15 | Sửa logic update để chỉ product được chọn thay đổi, dữ liệu persist đúng, và refresh list theo response thật từ backend. |
| USAB-F-002 | Thao tác xóa thiếu confirmation dialog | Bug / risk issue | Major / P1 | P01, P02, P03, P04, P05, P06, P07 | Session notes P01-P07; screenshots GUI-029, GUI-043-1, GUI-043-2, GUI-061-1, GUI-061-2 | Thêm confirmation dialog cho delete category/product/user, hiển thị đối tượng sắp xóa và success/error feedback sau khi xóa. |
| USAB-F-003 | Validation và error recovery yếu khi tạo category/product/import CSV | Bug | Major / P1 | P01, P02, P03, P04, P05, P06 | FR-14, FR-15, FR-16; session notes P01-P06 | Chặn submit dữ liệu thiếu/không hợp lệ ở UI và API; hiển thị lỗi gần field và giữ dữ liệu người dùng đã nhập để sửa. |
| USAB-F-004 | Feedback sau create/update/delete không nhất quán | Design issue / bug | Major / P2 | P01, P02, P04, P05, P06, P07 | SUS/open answers; session notes P01, P02, P04-P07 | Chuẩn hóa toast/inline feedback cho create, update, delete; disable/loading state trong lúc submit; thông báo rõ entity nào vừa thay đổi. |
| USAB-F-005 | Edit mode trong Product Management khó nhận biết | Design issue | Major / P2 | P01, P04, P05, P06, P07 | Open answers Clarity/Speed; transcripts P04-P07 | Khi bấm Edit, auto-scroll/focus form, đổi heading sang “Sửa sản phẩm”, highlight product đang sửa và cung cấp nút Cancel rõ. |
| USAB-F-006 | Product form thiếu hướng dẫn về required fields, giá và image URL | Design issue | Minor / P2 | P02, P03, P04, P05, P06, P07 | Session notes P02-P07 | Thêm label/required marker/help text; ghi rõ đơn vị tiền tệ; hỗ trợ upload image hoặc hướng dẫn image URL. |
| USAB-F-007 | Dashboard thiếu chiều sâu thông tin cho admin | Design issue | Minor / P3 | P01, P03, P05 | Session notes P01, P03, P05; FR-13 | Bổ sung empty state, biểu đồ theo thời gian hoặc breakdown đơn hàng để Dashboard bớt giống trạng thái lỗi/trống. |
| USAB-F-008 | CSV import là điểm sáng về feedback | Positive pattern | N/A | P01, P04, P05, P06, P07 | Session notes P01, P04-P07; open answers P05/P07 | Dùng pattern preview + inline result count của CSV import làm chuẩn cho các thao tác create/update/delete khác. |

## Genuine Bugs To Track

| Bug ID | Finding | Module | Severity / Priority | GitHub issue |
| --- | --- | --- | --- | --- |
| BUG-USAB-001 | Product update không lưu/cập nhật đúng và làm sai danh sách sản phẩm | Product Management | Critical / P0 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/198 |
| BUG-USAB-002 | Category form cho phép tạo category rỗng | Category Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/199 |
| BUG-USAB-003 | Xóa category/product/user không có confirmation dialog | All Admin Screens | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/200 |
| BUG-USAB-004 | Product form không chặn/không giải thích rõ dữ liệu thiếu hoặc không hợp lệ | Product Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/201 |
| BUG-USAB-005 | CSV import không phản hồi lỗi rõ khi dữ liệu import không hợp lệ | Product Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/202 |

## Design Issues Not Filed As Bugs

| Issue | Participants | Reason not filed as a bug |
| --- | --- | --- |
| Edit mode không rõ vì form nằm phía trên list | P01, P04, P05, P06, P07 | Đây là interaction design issue; có thể gây chậm/nhầm lẫn nhưng expected/actual không đủ rõ như bug chức năng. |
| Dashboard ít thông tin, nhìn trống | P01, P03, P05 | FR-13 chỉ yêu cầu tổng doanh thu và tổng số đơn hàng; đề xuất bổ sung biểu đồ là cải thiện usability. |
| Product image URL khó hiểu | P06, P07 | Có ảnh hưởng clarity nhưng chưa đủ bằng chứng để khẳng định chức năng sai trên mọi dữ liệu. |

## Evidence Notes

- Transcript được tạo từ Whisper và có chỗ đã được người điều phối sửa lại, đặc biệt P04. Khi transcript chưa rõ, report ưu tiên session notes trong `reports/usability/session-notes/` và SUS/open answers đã nhập từ participant.
- Không có hint từ moderator trong các session: `Hints/assist count = 0` cho P01-P07.
- Không tự tạo participant, contact, quote, SUS score hoặc transcript. Các phần chưa có artifact riêng, như consent form hoặc pilot recording, được ghi nhận trong limitation thay vì tự điền.
