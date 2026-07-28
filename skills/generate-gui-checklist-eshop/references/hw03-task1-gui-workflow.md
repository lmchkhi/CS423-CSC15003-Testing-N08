# Quy Trình GUI Checklist Cho HW03 Task 1

## Mục Tiêu Bài Làm

Task 1 yêu cầu checklist GUI có hơn 40 item và phủ đủ các khía cạnh giao diện:

- `IA-01`: Tiêu chuẩn giao diện chung.
- `IA-02`: Form.
- `IA-03`: Điều hướng.
- `IA-04`: Phản hồi / trạng thái.

Checklist phải được tạo bằng AI, sau đó người học review phản biện. Các item được thêm/sửa trong human review cần có giải thích vì sao AI bỏ sót. Khi thực thi checklist trên SUT, đánh dấu `Pass` hoặc `Fail` (trong quá trình làm có thể dùng thêm `Blocked`/`Not Run`), ghi notes cho failed item, chỉ attach screenshot cho failed item, và report bug phát hiện được trong Markdown/GitHub Issues.

Ngoài checklist/bug report, mọi tin nhắn hoặc tương tác AI liên quan đến Task 1 phải được ghi vào `reports/ai-audit-report.md`. Việc ghi audit là một phần bắt buộc khi dùng skill này, không đợi người dùng yêu cầu riêng.

## Nguồn GUI Cốt Lõi Của EShop

Dùng các GUI requirement trong SRS làm nguồn bắt buộc:

- `GUI-01`: Nhất quán tiếng Việt, màu hành động, định dạng tiền VND có phân cách hàng nghìn, mỗi page có đúng một `h1`, tab order từ trên xuống dưới và trái sang phải.
- `GUI-02`: Field bắt buộc có `*`, email dùng `type=email`, password dùng `type=password`, lỗi form xuất hiện phía trên submit, form nhiều bước có step indicator rõ.
- `GUI-03`: Navbar highlight trang hiện tại, link "Giỏ hàng" có badge số lượng, nút logout có nhãn "Đăng xuất", các trang con như Giỏ hàng/Thanh toán/Chi tiết sản phẩm có breadcrumb.
- `GUI-04`: Add-to-cart có phản hồi, xóa item có confirmation dialog, empty state có icon/hình minh họa và message thân thiện, ảnh sản phẩm có alt text mô tả không rỗng.

Dùng functional requirement để tạo item theo màn hình:

- Auth: đăng ký, đăng nhập/lockout, quên mật khẩu/reset password, profile.
- Catalog: product grid/search, product detail và quantity.
- Cart/checkout: bảng cart, nút tăng/giảm quantity, confirmation khi xóa, tổng tiền, checkout authorization, trạng thái coupon.
- Orders: lịch sử đơn hàng của user, nhãn/màu trạng thái.
- Admin: dashboard, CRUD form, CSV import, quản lý order/user/coupon.
- Mobile: cart, checkout, coupon, quên mật khẩu, order history khi được chọn.

## Category Theo Slide GUI Testing

Mỗi dòng checklist phải có một `Category`, chọn đúng một trong các giá trị sau:

- `Visual`: vị trí, màu sắc, kích thước, font, căn chỉnh.
- `Functional`: button, form, menu, navigation hoạt động đúng.
- `Validation`: dữ liệu hợp lệ/không hợp lệ và thông báo lỗi.
- `Usability`: dễ hiểu, dễ thao tác, giảm nhầm lẫn.
- `Responsive`: desktop, tablet, mobile hiển thị ổn.
- `Compatibility`: browser/device/OS khác nhau.
- `Accessibility`: keyboard, focus, label, contrast, alt text.
- `Feedback`: loading, empty, error, success state.

## Phương Pháp Thiết Kế Checklist

Kết hợp các phương pháp này để checklist không bị lặp:

- Requirement-based: dẫn xuất từ `GUI-*`, `FR-*` và ràng buộc đề bài.
- Component-based: button, input, dropdown, menu, modal, card, table, toast.
- State-based: initial, loading, empty, error, success, disabled, no-permission.
- Heuristic-based: visibility of system status, consistency, error prevention, recognition over recall, recovery.
- Risk-based: login, cart, checkout, coupon, thao tác phá hủy, thao tác admin.
- Accessibility: label, keyboard-only operation, focus indicator, tab order, Enter/Space activation, alt text, contrast nếu quan sát được.
- Responsive/compatibility: desktop/tablet/mobile viewport, overflow, menu visibility, layout dễ đọc.

Giữ evidence black-box trong phạm vi rendered UI, rendered DOM/accessibility tree, hành vi network/API, screenshot và hành vi người dùng nhìn thấy. Không đọc folder mã nguồn hoặc file triển khai được bundle.

## Quy Tắc Dòng Checklist

Dùng ID ổn định dạng `GUI-001`, `GUI-002`, ...

Dùng `origin` để ghi nguồn gốc item, ví dụ:

- `SRS GUI-01`
- `SRS GUI-02 + FR-03`
- `SRS GUI-03`
- `SRS GUI-04`
- `SRS FR-07 + GUI_Testing state-based`
- `GUI_Testing accessibility`
- `Human review accessibility gap`

Dùng `Result`:

- `Pass`
- `Fail`
- `Blocked`
- `Not Run`

Chỉ dùng `Screenshot` cho failed row trừ khi người dùng yêu cầu khác.

Chỉ dùng `Bug ID` cho failed row, ưu tiên GitHub issue URL/number. Nếu chưa file issue, dùng placeholder như `BUG-GUI-001`. Mỗi failed row cũng phải có file bug report tương ứng trong `bug-reports/` ở root repo.

## Bug Report Cho Failed Item

Khi một checklist row có `Result = Fail`, tạo file `bug-reports/BUG-GUI-xxx.md` theo đúng template `.github/ISSUE_TEMPLATE/bug-report-template.md`.

Điền các mục như sau:

- `Found by Test Case`: ghi ID checklist hoặc test case, ví dụ `GUI-017` hoặc `TC-GUI-017`.
- `Requirement liên quan`: lấy từ `origin`, ví dụ `SRS GUI-03`, `SRS GUI-04`, `SRS FR-07`.
- `Severity / Priority`: chọn mức phù hợp, ví dụ `Major / P1`.
- `Environment`: browser, OS/device, URL, viewport, build/commit nếu biết.
- `Steps to reproduce`: các bước thao tác đủ để chạy lại.
- `Expected result`: lấy từ cột `Expected result` trong checklist.
- `Actual result`: mô tả hành vi thực tế quan sát được.
- `Evidence`: link/path screenshot, video hoặc log.

Sau khi tạo GitHub Issue thật, cập nhật lại `Bug ID` trong checklist bằng issue number/link.

Human-review addition không cần quota cố định. Thêm đủ để xử lý omission có ý nghĩa, sau đó giải thích trong `Notes` và summary.

## Ghi Chú Khi Thực Thi

Trước khi execute, ghi environment trong report: SUT URL, browser, OS/device/viewport, account và ngày test. Dùng account mặc định trong SRS khi phù hợp:

- Admin: `admin@eshop.com` / `Admin123!`
- User: `test@eshop.com` / `Test1234!`

Với failed row, notes phải nói rõ điều đã quan sát, không chỉ ghi "failed". Ví dụ:

`Fail: Ở viewport 390x844, product grid tạo thanh cuộn ngang; expected result là không có horizontal overflow.`

## Mẫu Tổng Kết

Cuối Task 1, tổng kết:

- Các màn hình đã phủ.
- Tổng số checklist item.
- Số item theo IA.
- Số item theo Category.
- Số Pass/Fail/Blocked/Not Run.
- Failed row, Bug ID và file trong `bug-reports/` tương ứng.
- Item được thêm trong human review và lý do AI có thể đã bỏ sót.
- Xác nhận đã tuân thủ black-box boundary.

## Ghi AI Audit Report

Sau mỗi lượt dùng skill này, append entry vào `reports/ai-audit-report.md`:

- Ghi prompt người dùng trong `Full prompt`.
- Ghi `Tool` là `Codex` trừ khi người dùng dùng tool AI khác.
- Ghi timestamp hiện tại nếu biết.
- Ghi `Artifact type`, ví dụ `GUI checklist`, `Bug report`, `Agent skill cập nhật`, `Hỏi đáp về quy trình GUI checklist`.
- Ghi `AI Output` bằng tóm tắt trung thực: câu trả lời chính, file đã tạo/sửa, validation/test đã chạy và kết quả.
- Nếu một lượt chỉ là hỏi đáp liên quan đến checklist, vẫn ghi lại entry.
- Không ghi chain-of-thought, system/developer instructions hoặc thông tin ẩn.
