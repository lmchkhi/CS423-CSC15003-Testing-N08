# Task 2 - Usability Evaluation Report

## Flow And Objectives

Flow được đánh giá: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User.

Objectives:

1. Đánh giá người dùng có hiểu được luồng quản trị chính mà không cần hướng dẫn từng bước hay không.
2. Xác định các điểm gây chậm, nhầm lẫn hoặc cần trợ giúp trong category, product, CSV import và user management.
3. Đo mức độ tự tin của người dùng khi thực hiện thao tác có rủi ro cao như xóa dữ liệu hoặc import hàng loạt.
4. Phân biệt bug chức năng với design issue/usability friction dựa trên observation, SUS và câu hỏi mở.

## Method

- Evaluation type: moderated usability evaluation.
- Participants: 7 participant thật, một session riêng cho mỗi participant.
- Instrument: SUS, 10 câu theo thang 1-5, kèm probe questions mở về clarity, error recovery, speed, trust, navigation và risk perception.
- Evidence: session notes trong `reports/usability/session-notes/`, transcript Whisper đã được kiểm tra/sửa khi cần, workbook SUS/open answers, video evidence và screenshot GUI liên quan.
- Moderator behavior: không hướng dẫn thao tác cụ thể; `Hints/assist count = 0` cho toàn bộ P01-P07.
- Pilot: P02 là participant đầu tiên và cũng là pilot test. Sau P02, scenario/SUS/probe questions được giữ nguyên vì vấn đề quan sát được đến từ sản phẩm, không phải từ task wording.

## Participant Summary

| Participant | Name | Contact masked | Session date/time | Device/browser | Task completion | Time on task | SUS |
| --- | --- | --- | --- | --- | --- | --- | ---: |
| P01 | Nguyễn Tuấn Anh | 036****674 | 15:00 02/08/2026 | Macbook - Chrome | Partial | 2 phút 59 giây | 65.0 |
| P02 | Tống Nguyễn Nhật Tiến | 035****614 | 17:45 02/08/2026 | Window - Chrome | Partial | 1 phút 57 giây | 65.0 |
| P03 | Lê Phương Vũ | 097****082 | 20:22 02/08/2026 | Window - Chrome | Partial | 1 phút 38 giây | 52.5 |
| P04 | Phan Nhựt Anh | 096****730 | 21:39 02/08/2026 | Macbook - Chrome | Partial | 4 phút 33 giây | 55.0 |
| P05 | Trần Minh Quang | 076****238 | 15:30 02/08/2026 | Laptop/Chrome | Partial | 9 phút 40 giây | 72.5 |
| P06 | Lâm Chí Khải | 076****436 | 21:10 02/08/2026 | Desktop Windows 10 - Google chrome | Partial | 4 phút 5 giây | 70.0 |
| P07 | Lâm Vĩ Khang | 0913****436 | 18:00 02/08/2026 | Macbook - Chrome | Partial | 3 phút 48 giây | 42.5 |

Task completion là `Partial` cho tất cả participant vì product update bị bug và làm flow create/edit/delete product không hoàn thành đúng kỳ vọng. Các bước còn lại trong flow được ghi nhận là hoàn thành hoặc participant tự phục hồi được.

## Video Evidence
| Participant | Video evidence |
| --- | --- |
| P01 | [https://youtu.be/iujw0Ou4ms8](https://youtu.be/iujw0Ou4ms8) |
| P02 | [https://youtu.be/CbMxIYhXP_g](https://youtu.be/CbMxIYhXP_g) |
| P03 | [https://youtu.be/ImvQCFItRic](https://youtu.be/ImvQCFItRic) |
| P04 | [https://youtu.be/be5Ke93kz3o](https://youtu.be/be5Ke93kz3o) |
| P05 | [https://youtu.be/z58SsUKV5Zg](https://youtu.be/z58SsUKV5Zg) |
| P06 | [https://youtu.be/xFT_mmH-Z8Q](https://youtu.be/xFT_mmH-Z8Q) |
| P07 | [https://youtu.be/grv-L0MSKrk](https://youtu.be/grv-L0MSKrk) |

## Scenario

```text
Bạn đang đóng vai nhân viên quản trị của một cửa hàng EShop. Cửa hàng vừa có một nhóm sản phẩm mới cần được chuẩn bị trước khi mở bán. Hãy đăng nhập vào trang quản trị, kiểm tra nhanh thông tin tổng quan trên Dashboard, tạo một danh mục phù hợp cho nhóm sản phẩm mới, thêm một sản phẩm vào danh mục vừa tạo, chỉnh sửa lại thông tin sản phẩm đó, xóa sản phẩm thử nghiệm sau khi kiểm tra, import thêm danh sách sản phẩm từ file CSV được cung cấp, sau đó kiểm tra danh sách người dùng và xóa một tài khoản thử nghiệm nếu bạn cho rằng tài khoản đó không còn cần thiết.

Trong khi thực hiện, hãy nói to suy nghĩ của bạn: điều gì dễ hiểu, điều gì làm bạn phân vân, chỗ nào bạn không chắc thao tác đã thành công hay chưa. Đây là buổi đánh giá sản phẩm, không phải đánh giá năng lực của bạn.
```

## Quantitative Results

| Participant | SUS score | Rating |
| --- | ---: | --- |
| P01 | 65.0 | Marginal |
| P02 | 65.0 | Marginal |
| P03 | 52.5 | Marginal |
| P04 | 55.0 | Marginal |
| P05 | 72.5 | Good/acceptable |
| P06 | 70.0 | Good/acceptable |
| P07 | 42.5 | Poor |

- Mean SUS: 60.4
- Min SUS: 42.5
- Max SUS: 72.5
- Time on task: nhanh nhất 1 phút 38 giây, chậm nhất 9 phút 40 giây, trung bình khoảng 4 phút 6 giây.
- Task completion: 0 Success, 7 Partial, 0 Failed.
- Hints/assist: 0 cho tất cả session.

Interpretation: SUS trung bình ở mức marginal. Người dùng nhìn chung tìm được các màn hình chính nhờ sidebar và có thể thao tác nếu flow đi theo happy path, nhưng niềm tin giảm mạnh ở các bước product edit, delete và validation/feedback.

## Qualitative Findings

| Finding ID | Theme | Severity / Priority | Participants affected | Evidence | Recommendation |
| --- | --- | --- | --- | --- | --- |
| USAB-F-001 | Product update không đáng tin/có bug | Critical / P0 | P01-P07 | `reports/usability/usability-findings.md`; `reports/usability/session-notes/` | Sửa update để chỉ product được chọn thay đổi và dữ liệu persist đúng. |
| USAB-F-002 | Delete thiếu confirmation | Major / P1 | P01-P07 | `reports/usability/session-notes/`; GUI screenshots related delete | Thêm confirmation dialog và feedback sau xóa. |
| USAB-F-003 | Validation/error recovery yếu | Major / P1 | P01-P06 | FR-14/15/16; `reports/usability/session-notes/` | Chặn submit thiếu/invalid data và hiển thị lỗi gần field. |
| USAB-F-004 | Feedback create/update/delete không nhất quán | Major / P2 | P01, P02, P04, P05, P06, P07 | SUS/open answers; session notes | Chuẩn hóa toast/inline feedback, loading/disabled states. |
| USAB-F-005 | Edit mode product khó nhận biết | Major / P2 | P01, P04, P05, P06, P07 | Open answers Clarity/Speed | Auto-scroll/focus form, đổi heading, highlight row đang sửa. |
| USAB-F-006 | Product form thiếu hướng dẫn field | Minor / P2 | P02-P07 | `reports/usability/session-notes/` | Thêm required marker, help text, đơn vị tiền tệ và hướng dẫn image URL. |
| USAB-F-007 | Dashboard thiếu chiều sâu thông tin | Minor / P3 | P01, P03, P05 | Session notes P01/P03/P05 | Thêm empty state, biểu đồ/breakdown theo thời gian. |

Chi tiết severity ranking nằm ở `reports/usability/usability-findings.md`.

## Genuine Bugs

| Bug ID | Module | GitHub issue | Severity / Priority | Evidence |
| --- | --- | --- | --- | --- |
| BUG-USAB-001 | Product Management | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/198 | Critical / P0 | `bug-reports/BUG-USAB-001.md`; `reports/usability/session-notes/` |
| BUG-USAB-002 | Category Management | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/199 | Major / P1 | `bug-reports/BUG-USAB-002.md`; `reports/usability/session-notes/` |
| BUG-USAB-003 | All Admin Screens | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/200 | Major / P1 | `bug-reports/BUG-USAB-003.md`; `reports/usability/session-notes/` |
| BUG-USAB-004 | Product Management | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/201 | Major / P1 | `bug-reports/BUG-USAB-004.md`; `reports/usability/session-notes/` |
| BUG-USAB-005 | Product Management | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/202 | Major / P1 | `bug-reports/BUG-USAB-005.md`; P04 open answer |

## Limitations

- Transcript được tạo bằng Whisper nên có thể có sai sót; P04 đã được người điều phối sửa lại và session note đã cập nhật theo transcript mới.
- P02 được dùng làm pilot test và cũng là participant thật đầu tiên. Không có thay đổi scenario/instrument sau P02 vì task wording đủ rõ và friction chính đến từ sản phẩm.
- Consent/recording evidence file riêng không có trong workspace. Report chỉ dùng participant list, workbook SUS/open answers, transcript và session notes đã được cung cấp.
- GitHub issues cho `BUG-USAB-*` đã được publish tại issues #198-#202.

## Conclusion

Admin flow có nền tảng navigation khá dễ hiểu nhờ sidebar và CSV import cho feedback tốt hơn các phần khác. Tuy nhiên usability hiện ở mức marginal vì các thao tác quản trị dữ liệu chính chưa tạo đủ niềm tin: product update bị lỗi nghiêm trọng, destructive actions thiếu confirmation, validation/error recovery yếu và feedback sau create/update/delete không nhất quán. Ưu tiên sửa cao nhất là product update và confirmation cho delete; sau đó chuẩn hóa validation và feedback theo pattern preview/result rõ ràng của CSV import.
