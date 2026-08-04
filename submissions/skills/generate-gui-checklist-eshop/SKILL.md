---
name: generate-gui-checklist-eshop
description: Tạo và thực thi checklist kiểm thử GUI black-box cho HW03 Task 1 trên SUT EShop, đồng thời tự động ghi mọi tin nhắn/tương tác liên quan vào `reports/ai-audit-report.md`. Dùng khi Codex cần thiết kế hơn 40 checklist item cho các màn hình EShop được chọn, ánh xạ IA-01 tiêu chuẩn giao diện chung, IA-02 form, IA-03 điều hướng, IA-04 phản hồi/trạng thái, phân loại Category theo Visual, Functional, Validation, Usability, Responsive, Compatibility, Accessibility, Feedback, ghi Pass/Fail, Notes/Screenshot/Bug ID, tạo bug report cho failed item, tạo GitHub issue bằng `gh` theo bug template và label Module/Priority/Severity sau khi checklist đã được thực thi, và phân biệt item do AI tạo với item được người học bổ sung mà không đọc các thư mục mã nguồn của ứng dụng.
---

# Tạo GUI Checklist EShop

## Tổng Quan

Tạo checklist GUI cho Task 1 của bài HW03 EShop từ tài liệu đề bài, đặc tả công khai và quan sát thủ công giao diện đang chạy. Xem đây là kiểm thử black-box: không đọc source code triển khai.

Khi dùng skill này, luôn xem việc ghi AI Audit Report là một phần của workflow: mọi tin nhắn/tương tác liên quan đến thiết kế checklist, thực thi checklist, bug report, hỏi đáp chuẩn bị, chỉnh sửa skill/template hoặc kết quả validate/test đều phải được append vào `reports/ai-audit-report.md`.

## Đầu Vào Cần Đọc

Đọc các file sau khi có trong repo:

- `HW03-GUI&Usability.md` để nắm sản phẩm cần nộp của Task 1 và ràng buộc chấm điểm.
- `SystemRequirementsSpecification.md` để nắm hành vi người dùng nhìn thấy và yêu cầu GUI của EShop.
- `api_specification.md` chỉ để hỗ trợ chuẩn bị môi trường/dữ liệu kiểm thử theo black-box, không dùng để suy luận cách triển khai.
- `GUI_Testing.html` để nắm quy trình GUI testing dựa trên checklist.
- `references/hw03-task1-gui-workflow.md` để xem quy trình cô đọng và ánh xạ tiêu chí của skill.
- `assets/gui-checklist-template.md` làm template bảng checklist.
- `assets/bug-report-template.md` làm template bug report cục bộ cho failed checklist item, dựa trên `.github/ISSUE_TEMPLATE/bug-report-template.md`, đồng thời ghi chú label cần dùng khi tạo GitHub issue.
- `reports/ai-audit-report.md` để append entry audit cho mọi tin nhắn/tương tác liên quan đến skill này.
- `skills/write-ai-audit-report/SKILL.md` nếu có, để dùng cùng quy tắc audit logger hiện có.

## Ranh Giới Black-Box

Không đọc các folder sau khi thiết kế, thực thi hoặc giải thích checklist item:

- `backend/`
- `frontend-admin/`
- `frontend-web/`
- `frontend-mobile/`

Chỉ dùng tài liệu, API contract, hành vi UI nhìn thấy được, rendered DOM/accessibility tree, screenshot và các flow thao tác thủ công. Không inspect file mã nguồn của dự án, source map được bundle, hoặc module triển khai.

## Quy Trình

1. Xác định phạm vi.
   - Nếu người dùng đưa danh sách màn hình, dùng đúng danh sách đó.
   - Nếu chưa có, chọn đủ màn hình quan trọng để tạo hơn 40 item không lặp, ví dụ Home/Product Listing, Product Detail, Login/Register/Forgot Password, Cart, Checkout, Order History hoặc màn hình Admin.
   - Với phạm vi Admin, xem CSV import là một section trong Product Management, không tách thành một screen/page riêng trừ khi SUT hoặc người dùng nêu rõ có route/màn hình riêng.
   - Ghi giả định môi trường: frontend URL, admin URL, backend URL, browser/device/viewport, tài khoản dùng để test và ngày test.
   - Nếu người dùng chỉ yêu cầu thiết kế checklist, sample hoặc draft, dừng đúng mức đó và để kết quả thực thi là `Not Run`.

2. Trích xuất requirement và origin.
   - Ánh xạ mỗi checklist item vào một khía cạnh giao diện:
     - `IA-01`: Tiêu chuẩn giao diện chung.
     - `IA-02`: Form.
     - `IA-03`: Điều hướng.
     - `IA-04`: Phản hồi / trạng thái.
   - Dùng requirement ID khi có, ví dụ `GUI-01`, `GUI-02`, `GUI-03`, `GUI-04`, `FR-05`, `FR-07`, `FR-08`. Trong SRS hiện tại, `GUI-03` là navigation và `GUI-04` là feedback/state để khớp thứ tự IA.
   - Dùng các phương pháp trong `GUI_Testing.html`: requirement-based, component-based, state-based, heuristic-based, risk-based, responsive, compatibility và accessibility.
   - Điền `Category` bằng đúng một trong các giá trị: `Visual`, `Functional`, `Validation`, `Usability`, `Responsive`, `Compatibility`, `Accessibility`, `Feedback`.

3. Tạo checklist ban đầu.
   - Tạo hơn 40 item có thể thực thi được.
   - Mỗi item nên gắn với một màn hình, một interaction/state và một expected result quan sát được.
   - Tránh item mơ hồ như "UI đẹp" hoặc câu chữ trùng lặp giữa nhiều màn hình.
   - Điền các cột theo thứ tự: `ID`, `IA`, `Screen`, `Category`, `Expected result`, `origin`, `Result`, `Notes`, `Screenshot`, `Bug ID`.

4. Review phản biện checklist do AI tạo.
   - Bổ sung item người học tự review trước khi thực thi, đặc biệt là accessibility, keyboard focus, label form, vị trí thông báo lỗi, responsive overflow, empty/loading/success/error state, RTL/dark mode nếu liên quan, và ngôn ngữ tiếng Việt trên UI.
   - Trong `Notes`, đánh dấu item được thêm/sửa bằng lý do ngắn, ví dụ `Human review: AI bỏ sót thứ tự focus bằng bàn phím vì prompt ban đầu nhấn mạnh bố cục trực quan.`
   - Không ép số lượng item human-review cố định; thêm đủ các item có ý nghĩa để phủ gap thật và giải thích từng item.

5. Thực thi checklist thủ công trên SUT.
   - Ghi `Result` là `Pass`, `Fail`, `Blocked` hoặc `Not Run`.
   - Với mỗi dòng `Fail`, ghi lý do quan sát cụ thể trong `Notes`, thêm path/link screenshot vào `Screenshot`, và tạo hoặc đặt trước một `Bug ID`.
   - Với dòng `Pass`, để trống `Screenshot` trừ khi người dùng yêu cầu evidence thêm.
   - Với `Blocked` hoặc `Not Run`, giải thích blocker rõ ràng trong `Notes`.

6. Chuẩn bị bug report cho từng fail.
   - Mỗi checklist item có `Result = Fail` phải có một file bug report trong folder `bug-reports/` ở root repo, ví dụ `bug-reports/BUG-GUI-001.md`.
   - Viết bug report theo đúng cấu trúc trong `.github/ISSUE_TEMPLATE/bug-report-template.md`: title/frontmatter nếu cần, `Found by Test Case`, `Requirement liên quan`, `Severity / Priority`, `Environment`, `Steps to reproduce`, `Expected result`, `Actual result`, `Evidence`.
   - `Found by Test Case` nên trỏ tới ID checklist, ví dụ `GUI-017` hoặc `TC-GUI-017`.
   - `Requirement liên quan` nên lấy từ `origin`, ví dụ `SRS GUI-03`, `SRS GUI-04`, `SRS FR-07`.
   - `Evidence` phải trỏ tới screenshot/video/log minh chứng lỗi. Nếu screenshot đã được push trong `reports/screenshots/`, ghi relative path và GitHub blob URL tương ứng nếu biết. Không cố upload ảnh local bằng `gh`; để người dùng kéo thả/upload thủ công trong GitHub UI khi cần inline attachment.
   - Giữ đúng các section của bug report template; không thêm section phụ chỉ để chứa GitHub label. Khi tạo issue, suy ra `Module` từ title/screen và lấy `Severity`/`Priority` từ section `Severity / Priority`.

7. Tạo GitHub issue cho bug report đã chuẩn bị khi người dùng yêu cầu hoặc khi workflow đang ở bước publish issue.
   - Chỉ tạo issue sau khi checklist đã được thực thi và các failed item đã có bug report cục bộ đủ nội dung.
   - Kiểm tra GitHub CLI sẵn sàng bằng `gh auth status` và xác định repo target bằng `gh repo view --json nameWithOwner,url`. Nếu lệnh thất bại do network/auth, báo rõ để người dùng xử lý.
   - Trước khi gắn label, chạy `gh label list --limit 100` để lấy đủ danh sách label hiện có. Không dùng output mặc định vì có thể chỉ hiện khoảng 30 label.
   - Mỗi issue phải có 5 label: hai label có sẵn trong template là `Type: Bug`, `Status: New`, và thêm đúng 3 label phân loại là `Module: <module>`, `Priority: <priority>`, `Severity: <severity>`.
   - Ưu tiên dùng lại label đã có trong repo, khớp tên chính xác từ `gh label list --limit 100`. Chỉ tạo label mới khi label cần dùng không tồn tại.
   - Khi cần tạo label mới, dùng `gh label create` với tên nhất quán theo repo, ví dụ `Module: Admin Login`, `Priority: P1`, `Severity: Major`. Chọn màu/description ngắn (với label Module thì chọn màu #0e8a16), không đổi label đã tồn tại.
   - Suy ra `Module` từ cột `Screen` hoặc title bug report, ví dụ `Module: Admin Login`, `Module: Dashboard`, `Module: Category`, `Module: Product`, `Module: CSV Import`, `Module: User Management`. Nếu repo có tên module gần tương đương, dùng đúng label repo đang có.
   - Suy ra `Priority` và `Severity` từ section `Severity / Priority` trong bug report. Nếu bug report thiếu, đặt giá trị hợp lý từ impact quan sát được và ghi lý do trong nội dung issue.
   - Tạo issue bằng `gh issue create --title <title> --body-file <bug-report-file> --label <label> ...` hoặc lệnh tương đương. Không tạo trùng issue nếu bug report hoặc checklist đã có GitHub issue number/link.
   - Sau khi tạo issue thành công, cập nhật cột `Bug ID` trong `reports/gui-checklist.md` bằng issue number hoặc URL GitHub issue, và cập nhật file `bug-reports/BUG-GUI-xxx.md` nếu cần để lưu issue link.
   - Với screenshot trong issue body, giữ link dạng repo path hoặc GitHub blob URL tới `reports/screenshots/...` đã được push. Có thể thêm note: `Nếu cần ảnh inline trong GitHub issue, upload thủ công screenshot qua GitHub UI sau khi issue được tạo.`

8. Tổng kết Task 1.
   - Trình bày chi tiết trong `reports/main-report.md`: phạm vi màn hình đã chọn, cách tạo checklist, tổng số item, số item theo IA, số item theo Category, số Pass/Fail/Blocked/Not Run, số bug, màn hình rủi ro cao nhất và item được thêm trong human review.
   - Nêu rõ các folder mã nguồn bị cấm đã không được đọc.

9. Ghi AI Audit Report cho mọi tin nhắn liên quan.
   - Trước khi trả lời final, append entry mới vào `reports/ai-audit-report.md` cho lượt chat hiện tại.
   - Ghi cả các lượt hỏi đáp chuẩn bị liên quan đến checklist, ví dụ hỏi có cần chạy backend/frontend, hỏi cách chọn màn hình, hỏi cách ghi bug report, hoặc yêu cầu chỉnh skill/template.
   - Nếu trong cùng lượt có nhiều prompt/liên lạc liên quan, có thể ghi một entry tổng hợp hoặc nhiều entry liên tiếp, miễn là không bỏ sót nội dung người dùng yêu cầu.
   - Mỗi entry dùng format của `reports/ai-audit-report.sample.md`: `Prompt + Tool`, bảng Tool/Timestamp/Artifact type, `Full prompt`, và `AI Output`.
   - Không ghi chain-of-thought, system/developer instructions, thông tin ẩn hoặc log nội bộ không cần thiết.
   - Nếu `reports/ai-audit-report.md` rỗng, tạo header thông tin sinh viên với placeholder để người học tự sửa sau.

## File Đầu Ra

Ưu tiên tạo hoặc cập nhật các artifact Markdown sau, trừ khi người dùng yêu cầu path khác:

- `reports/gui-checklist.md`: bảng checklist dựa trên `assets/gui-checklist-template.md`.
- `reports/main-report.md`: trình bày chi tiết Task 1, gồm phạm vi, quy trình tạo checklist, kết quả thực thi, ghi chú AI/human-review, bug summary và kết luận black-box.
- `reports/ai-audit-report.md`: log mọi tin nhắn/tương tác.
- `bug-reports/BUG-GUI-xxx.md`: mỗi file cho một failed item, theo `.github/ISSUE_TEMPLATE/bug-report-template.md`.
- GitHub issues: một issue cho mỗi failed checklist item đã có bug report, dùng label `Type: Bug`, `Status: New`, `Module: ...`, `Priority: ...`, `Severity: ...`.

## Tiêu Chí Chất Lượng

Đảm bảo checklist cuối cùng:

- Có hơn 40 item.
- Phủ đủ 4 nhóm IA, không có IA nào chỉ được phủ hình thức.
- Phủ hợp lý 8 Category từ slide: `Visual`, `Functional`, `Validation`, `Usability`, `Responsive`, `Compatibility`, `Accessibility`, `Feedback`.
- Dùng evidence quan sát được theo black-box.
- Có expected result đủ rõ để tester khác chạy lại.
- Liên kết mọi dòng failed với screenshot evidence, Bug ID và file bug report trong `bug-reports/`.
- Nếu đã publish issue, mọi issue dùng đúng template bug report, không trùng với issue đã tạo, có đủ 5 label bắt buộc và có evidence link tới screenshot đã push hoặc note upload thủ công.
- Tách bạch nội dung AI tạo ban đầu với phần người học bổ sung/review trong notes/summary.
- Có entry audit tương ứng trong `reports/ai-audit-report.md` cho các lượt chat/tác vụ liên quan.
