# HW03 Task 1 - GUI Testing Main Report

## Phạm vi kiểm thử

Checklist GUI được thiết kế và thực thi cho các màn hình Admin của EShop:

- Admin Login
- Admin Dashboard
- Category Management
- Product Management, bao gồm section CSV import
- User Management

Việc thực thi checklist được ghi nhận trên Web Admin tại `http://localhost:5174/` với backend `http://localhost:3000`. Checklist ghi chú đã test bằng Chrome; một số mục compatibility cũng ghi nhận đã chạy trên Chrome và Edge. Mobile chưa được test trực tiếp; các mục responsive được kiểm tra bằng viewport hẹp trên browser.

## Nguyên tắc black-box

Quy trình kiểm thử dùng tài liệu yêu cầu, hành vi UI quan sát được, rendered DOM/accessibility tree, screenshot và thao tác thủ công. Không đọc các thư mục mã nguồn triển khai trong quá trình thiết kế/thực thi checklist và viết bug report:

- `backend/`
- `frontend-admin/`
- `frontend-web/`
- `frontend-mobile/`

## Kết quả checklist

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

## Bug report status

Do số lượng failed item lớn, bug report được tạo theo từng batch để người học review trước khi tiếp tục. Batch 1, batch 2, batch 3 và batch cuối đã tạo bug report cho toàn bộ 37 failed item theo thứ tự xuất hiện trong `reports/gui-checklist.md`. GitHub issue đã được tạo cho toàn bộ 37 bug report.

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

Số failed item đã có bug report: 37/37.

Số failed item còn lại cần xử lý ở các batch sau: 0. Toàn bộ failed item hiện tại đã có bug report cục bộ.

## GitHub issue publish status

Đã tạo GitHub issue cho toàn bộ 37 bug report. Cột `Bug ID` trong checklist/main report vẫn giữ dạng ID cục bộ để dễ đối chiếu với checklist.

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

## Đánh giá rủi ro

Các lỗi rủi ro cao nhất trong batch đầu tập trung ở validation và state handling:

- `GUI-003`: thiếu email validation trên Admin Login có thể làm giảm chất lượng kiểm tra input trước khi submit.
- `GUI-018` và `GUI-019`: Dashboard thiếu loading/error state, dễ làm admin hiểu nhầm dữ liệu đang tải hoặc dữ liệu lỗi là dữ liệu hợp lệ.
- `GUI-020`: layout Dashboard ở viewport hẹp chưa ổn, ảnh hưởng khả năng đọc và thao tác trong điều kiện responsive.
- `GUI-025`, `GUI-028` và `GUI-036`: các lỗi validation/destructive action có impact cao hơn vì có thể gửi dữ liệu không hợp lệ hoặc thực hiện thao tác nguy hiểm mà không xác nhận.
- `GUI-037`, `GUI-041`, `GUI-044` và `GUI-045`: các lỗi trong Product Management/CSV import có rủi ro cao vì cho phép dữ liệu sản phẩm không hợp lệ, file sai định dạng hoặc thao tác xóa không xác nhận.
- `GUI-055` và `GUI-056`: lỗi User Management có rủi ro cao vì xóa người dùng là thao tác nguy hiểm; riêng `GUI-056` nghiêm trọng hơn vì UI không ngăn/cảnh báo khi admin tự xóa tài khoản đang đăng nhập.
- `HR-GUI-001`: trạng thái khóa tài khoản sau nhiều lần đăng nhập sai là business state quan trọng, cần phản hồi rõ để người dùng hiểu thời gian bị khóa và tránh thử lại vô ích.

Tính trên toàn checklist, Product Management là khu vực có nhiều failed item nhất và cần được ưu tiên trong các batch bug report tiếp theo.

## Ghi chú AI và human review

Checklist ban đầu được tạo bởi AI theo requirement và quy trình GUI testing. Sau đó người học bổ sung thêm bảng `Human Review Additions` để chỉ ra các item AI bỏ sót và lý do, gồm business state đăng nhập sai nhiều lần, HTML email input type, consistency màu nút, CSV RFC 4180 và alt text hình ảnh sản phẩm.

Các bug report trong batch 1, batch 2, batch 3 và batch cuối được viết dựa trên kết quả đã test trong `reports/gui-checklist.md`, notes quan sát, screenshot evidence và template `.github/ISSUE_TEMPLATE/bug-report-template.md`. Hiện đã publish GitHub issue cho toàn bộ 37 bug report.

## Video demo agent skill: [https://youtu.be/KGLVbTaVeB4](https://youtu.be/KGLVbTaVeB4)