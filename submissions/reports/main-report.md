# HW03 – GUI & Usability

# Thông tin sinh viên
- Họ tên: Ngô Hồng Thanh
- MSSV: 23127475

## Task 1 - GUI Testing Main Report

### Phạm vi kiểm thử

Checklist GUI được thiết kế và thực thi cho các màn hình Admin của EShop:

- Admin Login
- Admin Dashboard
- Category Management
- Product Management, bao gồm section CSV import
- User Management

Việc thực thi checklist được ghi nhận trên Web Admin tại `http://localhost:5174/` với backend `http://localhost:3000`. Checklist ghi chú đã test bằng Chrome; một số mục compatibility cũng ghi nhận đã chạy trên Chrome và Edge. Mobile chưa được test trực tiếp; các mục responsive được kiểm tra bằng viewport hẹp trên browser.

### Nguyên tắc black-box

Quy trình kiểm thử dùng tài liệu yêu cầu, hành vi UI quan sát được, rendered DOM/accessibility tree, screenshot và thao tác thủ công. Không đọc các thư mục mã nguồn triển khai trong quá trình thiết kế/thực thi checklist và viết bug report:

- `backend/`
- `frontend-admin/`
- `frontend-web/`
- `frontend-mobile/`

### Kết quả checklist

Tổng số checklist item hiện tại: 65.

| Result | Số lượng |
| --- | ---: |
| Pass | 28 |
| Fail | 37 |
| Blocked | 0 |
| Not Run | 0 |

Phân bố theo IA:

| IA | Số lượng |
| --- | ---: |
| IA-01 | 23 |
| IA-02 | 15 |
| IA-03 | 7 |
| IA-04 | 20 |

Phân bố theo Category:

| Category | Số lượng |
| --- | ---: |
| Visual | 14 |
| Functional | 11 |
| Validation | 14 |
| Usability | 1 |
| Responsive | 2 |
| Compatibility | 2 |
| Accessibility | 6 |
| Feedback | 15 |

Phân bố theo màn hình:

| Screen | Số lượng item |
| --- | ---: |
| Admin Login | 13 |
| Admin Dashboard | 10 |
| Category Management | 9 |
| Product Management | 22 |
| User Management | 10 |
| All Admin Screens | 1 |

### Bug report status

| Bug ID | Test case | Module | Severity / Priority | Tóm tắt lỗi | Evidence |
| --- | --- | --- | --- | --- | --- |
| `BUG-GUI-001` | GUI-001 | Admin Login | Minor / P2 | Trang đăng nhập dùng nhãn tiếng Anh, chưa nhất quán tiếng Việt. | `reports/screenshots/gui-checklist/GUI-001.png` |
| `BUG-GUI-002` | GUI-002 | Admin Login | Minor / P3 | Trang đăng nhập không có tiêu đề chính `<h1>`. | `reports/screenshots/gui-checklist/GUI-002.png` |
| `BUG-GUI-003` | GUI-003 | Admin Login | Major / P1 | Trường Email không dùng `type="email"` để hỗ trợ validate định dạng. | `reports/screenshots/gui-checklist/GUI-003.png` |
| `BUG-GUI-005` | GUI-005 | Admin Login | Minor / P3 | Trường bắt buộc không có dấu `*` cạnh nhãn. | `reports/screenshots/gui-checklist/GUI-005.png` |
| `BUG-GUI-009` | GUI-009 | Admin Login | Minor / P2 | Nút Login không có loading/disabled state khi submit. | `reports/screenshots/gui-checklist/GUI-009.png` |
| `BUG-GUI-012` | GUI-012 | Admin Dashboard | Minor / P3 | Tiêu đề nội dung Dashboard không được expose là `<h1>`. | `reports/screenshots/gui-checklist/GUI-012.png` |
| `BUG-GUI-018` | GUI-018 | Admin Dashboard | Major / P2 | Dashboard không có loading state khi dữ liệu thống kê đang tải. | `reports/screenshots/gui-checklist/GUI-018.png` |
| `BUG-GUI-019` | GUI-019 | Admin Dashboard | Major / P1 | Dashboard không có error state khi không tải được dữ liệu. | `reports/screenshots/gui-checklist/GUI-019.png` |
| `BUG-GUI-020` | GUI-020 | Admin Dashboard | Major / P2 | Dashboard bị co layout quá mức ở viewport hẹp. | `reports/screenshots/gui-checklist/GUI-020.png` |
| `BUG-GUI-022` | GUI-022 | Category Management | Minor / P3 | Tiêu đề trang Category Management không được expose là `<h1>`. | `reports/screenshots/gui-checklist/GUI-022.png` |
| `BUG-GUI-024` | GUI-024 | Category Management | Minor / P3 | Form thêm danh mục không đánh dấu trường bắt buộc bằng `*`. | `reports/screenshots/gui-checklist/GUI-025.png` |
| `BUG-GUI-025` | GUI-025 | Category Management | Major / P1 | Submit danh mục rỗng vẫn gửi request thay vì hiển thị lỗi bắt buộc rõ ràng. | `reports/screenshots/gui-checklist/GUI-026.png` |
| `BUG-GUI-026` | GUI-026 | Category Management | Minor / P2 | Thêm danh mục thành công nhưng không có thông báo thành công rõ ràng. | `reports/screenshots/gui-checklist/GUI-027.png` |
| `BUG-GUI-027` | GUI-027 | Category Management | Minor / P3 | Danh sách danh mục rỗng hiển thị bảng trắng thay vì empty state. | `reports/screenshots/gui-checklist/GUI-028.png` |
| `BUG-GUI-028` | GUI-028 | Category Management | Major / P1 | Xóa danh mục không có confirmation dialog. | `reports/screenshots/gui-checklist/GUI-029.png` |
| `BUG-GUI-031` | GUI-031 | Product Management | Minor / P3 | Tiêu đề trang Product Management không được expose là `<h1>`. | `reports/screenshots/gui-checklist/GUI-032.png` |
| `BUG-GUI-032` | GUI-032 | Product Management | Minor / P2 | Giá sản phẩm không có phân cách hàng nghìn. | `reports/screenshots/gui-checklist/GUI-033.png` |
| `BUG-GUI-034` | GUI-034 | Product Management | Minor / P3 | Các trường bắt buộc trong form sản phẩm không được đánh dấu nhất quán. | `reports/screenshots/gui-checklist/GUI-036.png` |
| `BUG-GUI-035` | GUI-035 | Product Management | Minor / P2 | Tên sản phẩm rỗng chỉ dựa vào native validation, không có lỗi ứng dụng rõ ràng. | `reports/screenshots/gui-checklist/GUI-037.png` |
| `BUG-GUI-036` | GUI-036 | Product Management | Major / P1 | Tên sản phẩm dài hơn 255 ký tự vẫn được submit. | `reports/screenshots/gui-checklist/GUI-038.png` |
| `BUG-GUI-037` | GUI-037 | Product Management | Major / P1 | Giá bằng 0, số âm hoặc không phải số vẫn được gửi request. | `reports/screenshots/gui-checklist/GUI-039.png` |
| `BUG-GUI-038` | GUI-038 | Product Management | Major / P2 | Dropdown Danh mục mặc định chọn sẵn và không buộc admin chọn chủ động. | `reports/screenshots/gui-checklist/GUI-040.png` |
| `BUG-GUI-039` | GUI-039 | Product Management | Minor / P2 | Thêm sản phẩm thành công nhưng không có feedback thành công rõ ràng. | `reports/screenshots/gui-checklist/GUI-041.png` |
| `BUG-GUI-040` | GUI-040 | Product Management | Minor / P2 | Cập nhật sản phẩm không phản hồi rõ sản phẩm nào vừa được sửa. | `reports/screenshots/gui-checklist/GUI-042.png` |
| `BUG-GUI-041` | GUI-041 | Product Management | Major / P1 | Xóa sản phẩm không có confirmation dialog. | `reports/screenshots/gui-checklist/GUI-043-1.png`, `reports/screenshots/gui-checklist/GUI-043-2.png` |
| `BUG-GUI-044` | GUI-044 | Product Management | Major / P1 | File upload CSV không giới hạn rõ định dạng `.csv`. | `reports/screenshots/gui-checklist/GUI-048.png` |
| `BUG-GUI-045` | GUI-045 | Product Management | Major / P1 | CSV thiếu `name` hoặc `price` không dương không hiển thị lỗi theo dòng. | `reports/screenshots/gui-checklist/GUI-052.png` |
| `BUG-GUI-046` | GUI-046 | Product Management | Minor / P2 | CSV import không có loading/progress state. | `reports/screenshots/gui-checklist/GUI-051.png` |
| `BUG-GUI-049` | GUI-049 | User Management | Minor / P2 | User Management còn cột `Role` và giá trị `admin/user` bằng tiếng Anh. | `reports/screenshots/gui-checklist/GUI-056.png` |
| `BUG-GUI-050` | GUI-050 | User Management | Minor / P3 | Tiêu đề trang User Management không được expose là `<h1>`. | `reports/screenshots/gui-checklist/GUI-056.png` |
| `BUG-GUI-053` | GUI-053 | User Management | Minor / P2 | Danh sách người dùng không có loading state khi đang tải. | `reports/screenshots/gui-checklist/GUI-059.png` |
| `BUG-GUI-054` | GUI-054 | User Management | Major / P2 | Danh sách người dùng không có empty/error state rõ ràng. | `reports/screenshots/gui-checklist/GUI-060.png` |
| `BUG-GUI-055` | GUI-055 | User Management | Major / P1 | Xóa người dùng không có confirmation dialog. | `reports/screenshots/gui-checklist/GUI-061-1.png`, `reports/screenshots/gui-checklist/GUI-061-2.png` |
| `BUG-GUI-056` | GUI-056 | User Management | Critical / P0 | UI không ngăn hoặc cảnh báo khi admin tự xóa tài khoản đang đăng nhập. | `reports/screenshots/gui-checklist/GUI-056.png` |
| `BUG-HR-GUI-001` | HR-GUI-001 | Admin Login | Major / P1 | Sau 3 lần đăng nhập sai không hiển thị trạng thái khóa tài khoản. | `reports/screenshots/gui-checklist/HR-GUI-001.png` |
| `BUG-HR-GUI-002` | HR-GUI-002 | Admin Login | Major / P1 | Trường Email không sử dụng HTML5 `type="email"`. | `reports/screenshots/gui-checklist/HR-GUI-002.png` |
| `BUG-HR-GUI-003` | HR-GUI-003 | All Admin Screens | Minor / P2 | Màu nút hành động tích cực chưa nhất quán. | `reports/screenshots/gui-checklist/HR-GUI-003.png` |

### GitHub issue publish status

| Bug ID | GitHub issue |
| --- | --- |
| `BUG-GUI-001` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/152 |
| `BUG-GUI-002` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/153 |
| `BUG-GUI-003` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/154 |
| `BUG-GUI-005` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/155 |
| `BUG-GUI-009` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/156 |
| `BUG-GUI-012` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/157 |
| `BUG-GUI-018` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/158 |
| `BUG-GUI-019` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/159 |
| `BUG-GUI-020` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/160 |
| `BUG-GUI-022` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/161 |
| `BUG-GUI-024` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/162 |
| `BUG-GUI-025` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/163 |
| `BUG-GUI-026` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/164 |
| `BUG-GUI-027` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/165 |
| `BUG-GUI-028` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/166 |
| `BUG-GUI-031` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/167 |
| `BUG-GUI-032` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/168 |
| `BUG-GUI-034` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/169 |
| `BUG-GUI-035` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/170 |
| `BUG-GUI-036` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/171 |
| `BUG-GUI-037` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/172 |
| `BUG-GUI-038` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/173 |
| `BUG-GUI-039` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/174 |
| `BUG-GUI-040` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/175 |
| `BUG-GUI-041` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/176 |
| `BUG-GUI-044` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/177 |
| `BUG-GUI-045` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/178 |
| `BUG-GUI-046` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/179 |
| `BUG-GUI-049` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/180 |
| `BUG-GUI-050` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/181 |
| `BUG-GUI-053` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/182 |
| `BUG-GUI-054` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/183 |
| `BUG-GUI-055` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/184 |
| `BUG-GUI-056` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/185 |
| `BUG-HR-GUI-001` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/186 |
| `BUG-HR-GUI-002` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/187 |
| `BUG-HR-GUI-003` | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/188 |

### Đánh giá rủi ro

Các lỗi rủi ro cao nhất trong batch đầu tập trung ở validation và state handling:

- `GUI-003`: thiếu email validation trên Admin Login có thể làm giảm chất lượng kiểm tra input trước khi submit.
- `GUI-018` và `GUI-019`: Dashboard thiếu loading/error state, dễ làm admin hiểu nhầm dữ liệu đang tải hoặc dữ liệu lỗi là dữ liệu hợp lệ.
- `GUI-020`: layout Dashboard ở viewport hẹp chưa ổn, ảnh hưởng khả năng đọc và thao tác trong điều kiện responsive.
- `GUI-025`, `GUI-028` và `GUI-036`: các lỗi validation/destructive action có impact cao hơn vì có thể gửi dữ liệu không hợp lệ hoặc thực hiện thao tác nguy hiểm mà không xác nhận.
- `GUI-037`, `GUI-041`, `GUI-044` và `GUI-045`: các lỗi trong Product Management/CSV import có rủi ro cao vì cho phép dữ liệu sản phẩm không hợp lệ, file sai định dạng hoặc thao tác xóa không xác nhận.
- `GUI-055` và `GUI-056`: lỗi User Management có rủi ro cao vì xóa người dùng là thao tác nguy hiểm; riêng `GUI-056` nghiêm trọng hơn vì UI không ngăn/cảnh báo khi admin tự xóa tài khoản đang đăng nhập.
- `HR-GUI-001`: trạng thái khóa tài khoản sau nhiều lần đăng nhập sai là business state quan trọng, cần phản hồi rõ để người dùng hiểu thời gian bị khóa và tránh thử lại vô ích.

Tính trên toàn checklist, Product Management là khu vực có nhiều failed item nhất và cần được ưu tiên trong các batch bug report tiếp theo.

### Task 1 submission artifacts

Các artifact riêng phục vụ Submission Regulations cho Task 1:

- Excel checklist: `reports/gui-checklist-task1.xlsx`
- Test summary: `reports/task1-test-summary.md`

### Video demo agent skill: [https://youtu.be/KGLVbTaVeB4](https://youtu.be/KGLVbTaVeB4)

## Task 2 - Usability Evaluation Plan

Flow phụ trách cho Task 2: Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User.

Phase 1 đã chuẩn bị các artifact sau:

- `reports/usability/usability-plan.md`: objectives, target user profile, task scenario, moderator setup, success criteria, probe questions và pilot plan.
- `reports/usability/sus-questionnaire.md`: SUS instrument gồm 10 câu và quy tắc scoring.
- `reports/usability/participants.md`: bảng 7 participant thật.
- `reports/usability/session-notes-template.md`: template ghi chú cho pilot và 7 session thật.
- `reports/usability/sus-responses.csv`: template nhập raw SUS responses để tính điểm bằng script.
- `reports/usability/admin-import-products-task.csv`: file CSV mẫu phục vụ bước import trong task scenario.

### Objectives

1. Đánh giá liệu người dùng có hiểu được luồng quản trị chính từ đăng nhập đến các màn hình Dashboard, Category, Product, CSV Import và User Management mà không cần hướng dẫn từng bước hay không.
2. Xác định các điểm gây chậm, nhầm lẫn hoặc cần trợ giúp trong những thao tác admin quan trọng: tạo danh mục, tạo/sửa/xóa sản phẩm, import CSV và kiểm tra/xóa người dùng.
3. Đo mức độ tự tin và cảm nhận kiểm soát của người dùng khi thực hiện các thao tác có rủi ro cao như xóa sản phẩm/người dùng hoặc import dữ liệu hàng loạt.
4. Thu thập phản hồi về clarity, error recovery, speed và trust để phân biệt genuine bugs với vấn đề thiết kế/usability mang tính hệ thống.

### Task Scenario

```text
Bạn đang đóng vai nhân viên quản trị của một cửa hàng EShop. Cửa hàng vừa có một nhóm sản phẩm mới cần được chuẩn bị trước khi mở bán. Hãy đăng nhập vào trang quản trị, kiểm tra nhanh tình trạng tổng quan, tạo một danh mục phù hợp cho nhóm sản phẩm mới, thêm một sản phẩm vào danh mục đó, chỉnh sửa lại thông tin sản phẩm nếu thấy cần, xóa sản phẩm thử nghiệm sau khi kiểm tra, import thêm danh sách sản phẩm từ file CSV được cung cấp, sau đó kiểm tra danh sách người dùng và xóa một tài khoản thử nghiệm nếu bạn cho rằng tài khoản đó không còn cần thiết.

Trong khi thực hiện, hãy nói to suy nghĩ của bạn: điều gì dễ hiểu, điều gì làm bạn phân vân, chỗ nào bạn không chắc thao tác đã thành công hay chưa. Đây là buổi đánh giá sản phẩm, không phải đánh giá năng lực của bạn.
```

### Instruments

Usability scale được chọn là SUS. Sau mỗi session, participant trả lời 10 câu SUS theo thang 1-5. Ngoài SUS, moderator dùng probe questions mở để hỏi về clarity, error recovery, speed, trust, navigation và risk perception. Raw SUS responses sẽ được nhập vào `reports/usability/sus-responses.csv` và tính điểm bằng:

```bash
python3 skills/run-usability-evaluation-eshop/scripts/score_usability.py sus reports/usability/sus-responses.csv
```

## Task 2 - Usability Evaluation Final Report

### Method Summary

Task 2 sử dụng moderated usability evaluation cho flow Admin Login -> View Dashboard -> Create Category -> Create/Edit/Delete Product -> Import Products by CSV -> Inspect/Delete User. Có 7 participant thật, mỗi người một session riêng. P02 là participant đầu tiên và cũng là pilot test; sau P02, scenario/SUS/probe questions được giữ nguyên vì task wording đủ rõ và friction chính đến từ sản phẩm. Sau task, participant điền SUS và trả lời probe questions về clarity, error recovery, speed, trust, navigation và risk perception. Moderator không đưa hint thao tác; tất cả session notes ghi `Hints/assist count = 0`.

Artifact chi tiết:

- `reports/usability/usability-report.md`: report Task 2 đầy đủ.
- `reports/usability/usability-findings.md`: severity-ranked findings và bug mapping.
- `reports/usability/session-notes/session-notes-P01.md` đến `reports/usability/session-notes/session-notes-P07.md`: observation notes từng session.
- `reports/usability/sus-summary.md`: SUS score và theme summary.
- `bug-reports/BUG-USAB-001.md` đến `bug-reports/BUG-USAB-005.md`: genuine bugs phát hiện từ usability sessions.

### Participant And Completion Summary

| Participant | Device/browser | Task completion | Time on task | SUS |
| --- | --- | --- | --- | ---: |
| P01 | Macbook - Chrome | Partial | 2 phút 59 giây | 65.0 |
| P02 | Window - Chrome | Partial | 1 phút 57 giây | 65.0 |
| P03 | Window - Chrome | Partial | 1 phút 38 giây | 52.5 |
| P04 | Macbook - Chrome | Partial | 4 phút 33 giây | 55.0 |
| P05 | Laptop/Chrome | Partial | 9 phút 40 giây | 72.5 |
| P06 | Desktop Windows 10 - Google chrome | Partial | 4 phút 5 giây | 70.0 |
| P07 | Macbook - Chrome | Partial | 3 phút 48 giây | 42.5 |

Tất cả 7 session là `Partial` vì product update bị bug, khiến bước create/edit/delete product không hoàn thành đúng kỳ vọng. Các phần khác của flow được participant hoàn thành hoặc tự phục hồi được.

### Video Evidence
| Participant | Video evidence |
| --- | --- |
| P01 | [https://youtu.be/iujw0Ou4ms8](https://youtu.be/iujw0Ou4ms8) |
| P02 | [https://youtu.be/CbMxIYhXP_g](https://youtu.be/CbMxIYhXP_g) |
| P03 | [https://youtu.be/ImvQCFItRic](https://youtu.be/ImvQCFItRic) |
| P04 | [https://youtu.be/be5Ke93kz3o](https://youtu.be/be5Ke93kz3o) |
| P05 | [https://youtu.be/z58SsUKV5Zg](https://youtu.be/z58SsUKV5Zg) |
| P06 | [https://youtu.be/xFT_mmH-Z8Q](https://youtu.be/xFT_mmH-Z8Q) |
| P07 | [https://youtu.be/grv-L0MSKrk](https://youtu.be/grv-L0MSKrk) |

### SUS Results

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
- Time on task trung bình: khoảng 4 phút 6 giây.

Kết quả SUS cho thấy admin flow ở mức marginal. Navigation bằng sidebar tương đối dễ tìm, nhưng trust giảm mạnh ở các thao tác thay đổi dữ liệu như edit product, delete và validation/error recovery.

### Severity-Ranked Findings

| Finding ID | Theme | Type | Severity / Priority | Participants affected |
| --- | --- | --- | --- | --- |
| USAB-F-001 | Product update không đáng tin và làm sai product list | Bug | Critical / P0 | P01-P07 |
| USAB-F-002 | Thao tác xóa thiếu confirmation dialog | Bug / risk issue | Major / P1 | P01-P07 |
| USAB-F-003 | Validation và error recovery yếu khi tạo category/product/import CSV | Bug | Major / P1 | P01-P06 |
| USAB-F-004 | Feedback sau create/update/delete không nhất quán | Design issue / bug | Major / P2 | P01, P02, P04, P05, P06, P07 |
| USAB-F-005 | Edit mode trong Product Management khó nhận biết | Design issue | Major / P2 | P01, P04, P05, P06, P07 |
| USAB-F-006 | Product form thiếu hướng dẫn về required fields, giá và image URL | Design issue | Minor / P2 | P02-P07 |
| USAB-F-007 | Dashboard thiếu chiều sâu thông tin cho admin | Design issue | Minor / P3 | P01, P03, P05 |
| USAB-F-008 | CSV import là điểm sáng về feedback | Positive pattern | N/A | P01, P04, P05, P06, P07 |

Chi tiết evidence và recommendation nằm trong `reports/usability/usability-findings.md`.

### Genuine Bugs From Task 2

| Bug ID | Module | Severity / Priority | GitHub issue |
| --- | --- | --- | --- |
| `BUG-USAB-001` | Product Management | Critical / P0 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/198 |
| `BUG-USAB-002` | Category Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/199 |
| `BUG-USAB-003` | All Admin Screens | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/200 |
| `BUG-USAB-004` | Product Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/201 |
| `BUG-USAB-005` | Product Management | Major / P1 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/202 |

### Task 2 Conclusion

Admin flow có navigation dễ tìm và CSV import là phần tạo trust tốt nhất nhờ preview/result feedback. Tuy nhiên usability tổng thể chưa đạt mức acceptable ổn định vì bug product update làm toàn bộ session chỉ đạt Partial, thao tác xóa thiếu confirmation và nhiều create/update/delete action thiếu feedback hoặc validation rõ ràng. Ưu tiên sửa nên là: product update, confirmation dialog cho destructive actions, validation/error recovery, sau đó chuẩn hóa feedback theo pattern của CSV import.

## Task 3 - Cross-Browser / Cross-Platform Report

### Scope And Platform Matrix

Task 3 reuse kết quả Chrome local từ Task 1 làm baseline, sau đó chạy thêm Firefox và Safari trên BrowserStack. Không lặp lại toàn bộ 65 GUI checklist item vì phần lớn item kiểm tra static text, heading hoặc business rule không phụ thuộc browser engine. Cross-platform retest chỉ tập trung vào những vùng có khả năng khác biệt thật giữa Chrome/Firefox/Safari: native validation, focus/keyboard, responsive layout, native form controls, file picker/CSV upload và smoke flow của màn hình chính.

| Platform | Source | Status |
| --- | --- | --- |
| Chrome local | Task 1 `reports/gui-checklist.md` | Completed baseline |
| Firefox 153 latest on BrowserStack Mac | `reports/cross-platform/cross-platform-checklist.md` | Completed |
| Safari 27 latest on BrowserStack Mac | `reports/cross-platform/cross-platform-checklist.md` | Completed |

### Focused Cross-Platform Checklist

Checklist rút gọn được lưu tại `reports/cross-platform/cross-platform-checklist.md`. Bộ này gồm 15 item được chọn từ 65 item Task 1, ưu tiên:

- native validation: `type=email`, `required`, `type=number`, submit bằng Enter;
- native form controls: `select`, file picker, file input keyboard access;
- keyboard/focus/accessibility: tab order, focus visible trong form/bảng;
- responsive/layout: Dashboard ở viewport hẹp và User table overflow;
- CSV/file handling chỉ ở phần browser-native: file picker, `accept=.csv`, file input keyboard/focus;
- compatibility smoke tests: Login và Product Management.

Các nhóm bị loại khỏi retest gồm static text/heading semantics, bug logic thuần như thiếu confirmation/self-delete/product update, backend/authentication smoke riêng, CSV parser/business validation và các feedback state ít phụ thuộc browser. Những nhóm này chỉ cần dùng Chrome baseline, trừ khi Firefox/Safari smoke test bộc lộ hành vi khác.

### Result Summary

| Platform | Total selected items | Pass | Fail | Different from Chrome baseline |
| --- | ---: | ---: | ---: | ---: |
| Chrome local | 15 | 8 | 7 | Baseline |
| Firefox 153 latest on BrowserStack Mac | 15 | 7 | 8 | 1 |
| Safari 27 latest on BrowserStack Mac | 15 | 7 | 8 | 1 |

Hầu hết item có kết quả giống Chrome. Khác biệt duy nhất là `CP-012` / `GUI-058`: Chrome local pass, nhưng Firefox và Safari trên BrowserStack fail ở User Management responsive table.

### Cross-Platform Finding

`CP-012` cho thấy bảng User Management ở viewport hẹp trên Firefox/Safari BrowserStack không cuộn ngang được như Chrome local và bị mất/cắt chữ. Evidence:

- Firefox: `reports/cross-platform/screenshots/firefox/GUI-FF-058-1.png`, `reports/cross-platform/screenshots/firefox/GUI-FF-058-2.png`
- Safari: `reports/cross-platform/screenshots/safari/GUI-SF-058-1.png`, `reports/cross-platform/screenshots/safari/GUI-SF-058-2.png`

Đây là finding cross-platform chính vì kết quả khác Chrome baseline và thuộc nhóm responsive/layout, vốn phụ thuộc browser/viewport behavior. Report chi tiết nằm ở `reports/cross-platform/cross-platform-report.md`.

Bug report cho finding này:

| Bug ID | Module | Severity / Priority | GitHub issue |
| --- | --- | --- | --- |
| `BUG-CP-012` | User Management | Major / P2 | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/203 |
