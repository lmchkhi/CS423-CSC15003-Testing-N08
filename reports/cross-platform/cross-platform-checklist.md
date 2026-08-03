# Task 3 - Cross-Browser / Cross-Platform Focused Checklist

## Scope

Task 3 yêu cầu chạy Task 1 trên ít nhất 3 platform. Chrome local đã được thực thi trong Task 1 tại `reports/gui-checklist.md`, nên file này chỉ chuẩn bị phần retest cho:

- Firefox trên BrowserStack
- Safari trên BrowserStack

Bộ checklist này không lặp lại toàn bộ 65 item. Mục tiêu là kiểm tra những vùng mà Chrome, Firefox và Safari có khả năng khác biệt thật: native form validation, focus/keyboard, responsive layout, `select`/`number input`, file picker/CSV upload và smoke flow của các màn hình chính.

## Why Not Retest All 65 Items

Lặp lại toàn bộ 65 item trên Firefox/Safari sẽ tạo nhiều evidence nhưng ít giá trị, vì phần lớn item là static content hoặc app logic đã fail/pass trên Chrome và không phụ thuộc browser engine. Ví dụ: thiếu `<h1>`, nhãn tiếng Anh, thiếu confirmation dialog, thiếu success toast, hay API cho phép xóa user là hành vi do code ứng dụng quyết định; nếu không có CSS/browser API đặc thù liên quan, khả năng kết quả khác giữa Chrome/Firefox/Safari là thấp.

Do đó, cross-platform test được rút xuống 15 item có ý nghĩa hơn. Bộ này vẫn đi qua các màn hình chính và các interaction gate quan trọng, nhưng tập trung vào những nơi browser có thể ảnh hưởng trực tiếp:

- Native validation UI: `type=email`, `required`, `type=number`, submit bằng Enter.
- Form control rendering: `select`, file picker, focus ring.
- Layout engine: flex/grid/table overflow ở viewport hẹp.
- File APIs: file picker, `accept=.csv`, file input focus/keyboard behavior.
- Smoke flow: Login page và Product Management render/function cơ bản, vì đây là đường vào và màn hình nhiều rủi ro nhất.

Nếu Firefox/Safari có hành vi khác Chrome ở các item này, tạo bug cross-platform riêng. Nếu không có khác biệt, các item static/app-logic còn lại dùng Chrome baseline từ Task 1.

## Browser Matrix

| Platform | Source | Status |
| --- | --- | --- |
| Chrome local | Task 1 `reports/gui-checklist.md` | Completed baseline |
| Firefox 153 latest on BrowserStack Mac | Tester execution | Completed |
| Safari 27 latest on BrowserStack Mac | Tester execution | Completed |

Screenshot/evidence khi chạy BrowserStack nên lưu trong:

- `reports/cross-platform/screenshots/firefox/`
- `reports/cross-platform/screenshots/safari/`

Mỗi screenshot cần thể hiện browser/OS/device name, SUT URL và overlay username theo yêu cầu đề.

## Focused Checklist

| CP ID | GUI ID | Màn hình | Trọng tâm cross-platform | Chrome baseline | Chrome evidence | Firefox result | Firefox evidence | Safari result | Safari evidence | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CP-001 | GUI-003 | Admin Login | Kiểm tra `input type=email` và native email validation: nhập email sai định dạng, submit, quan sát browser có chặn/hiển thị validation UI hay không. | Fail | `reports/screenshots/gui-checklist/GUI-003.png` | Fail | `screenshots/firefox/GUI-FF-003-1.png`, `screenshots/firefox/GUI-FF-003-2.png` | Fail | `screenshots/safari/GUI-SF-003-1.png`, `screenshots/safari/GUI-SF-003-2.png` | Vẫn lỗi giống Chrome. |
| CP-002 | GUI-010 | Admin Login | Keyboard `Tab` order và focus visible trên Email -> Password -> Login. | Pass |  | Pass |  | Pass |  | Hoạt động tốt trên tất cả các browser. |
| CP-003 | GUI-020 | Admin Dashboard | Responsive layout ở viewport hẹp: card thống kê/sidebar có bị co, tràn ngang hoặc che nội dung không. | Fail | `reports/screenshots/gui-checklist/GUI-020.png` | Fail | `screenshots/firefox/GUI-FF-020.png` | Fail | `screenshots/safari/GUI-SF-020.png` | Vẫn bị giống Chrome. |
| CP-004 | GUI-025 | Category Management | Submit category rỗng bằng button và bằng phím Enter; quan sát native/custom validation và focus sau lỗi. | Fail | `reports/screenshots/gui-checklist/GUI-026.png` | Fail | `screenshots/firefox/GUI-FF-025.png` | Fail | `screenshots/safari/GUI-SF-025.png` | Vẫn bị giống Chrome. |
| CP-005 | GUI-029 | Category Management | Keyboard access/focus visible trong input thêm category và các nút Xóa trong bảng. | Pass |  | Pass |  | Pass |  | Kết quả giống Chrome. |
| CP-006 | GUI-035 | Product Management | Native `required` validation khi bỏ trống Tên sản phẩm; quan sát validation bubble/focus field lỗi. | Fail | `reports/screenshots/gui-checklist/GUI-037.png` | Fail | `screenshots/firefox/GUI-FF-035.png` | Fail | `screenshots/safari/GUI-SF-035.png` | Form dựa vào native validation của browser cho trường Tên sản phẩm rỗng. Không có thông báo lỗi cấp ứng dụng hiển thị rõ gần form hoặc phía trên nút submit. |
| CP-007 | GUI-037 | Product Management | `number input` cho Giá: thử `0`, số âm, ký tự không phải số; quan sát parsing, stepper và validation UI. | Fail | `reports/screenshots/gui-checklist/GUI-039.png` | Fail | `screenshots/firefox/GUI-FF-037.png` | Fail | `screenshots/safari/GUI-SF-037.png` | Vẫn lỗi giống Chrome. |
| CP-008 | GUI-038 | Product Management | `select` Danh mục: default option, keyboard interaction, mở dropdown và chọn category. | Fail | `reports/screenshots/gui-checklist/GUI-040.png` | Fail | `screenshots/firefox/GUI-FF-038.png` | Fail | `screenshots/safari/GUI-SF-038.png` | Cũng vẫn có thể tạo product mà bỏ qua categori khi gọi bằng api |
| CP-009 | GUI-042 | Product Management | Keyboard/focus trong form Product: đi qua các input, dropdown, nút Lưu/Hủy sửa sau khi bấm Edit. | Pass |  | Pass |  | Pass |  | Hoạt động tốt trên tất cả các browser. |
| CP-010 | GUI-044 | Product Management - CSV Import | File picker/`accept=.csv`: thử chọn file CSV và file không phải CSV, quan sát browser có lọc/chặn hay không. | Fail | `reports/screenshots/gui-checklist/GUI-048.png` | Fail | `screenshots/firefox/GUI-FF-044.png` | Fail | `screenshots/safari/GUI-SF-044.png` | Vẫn có thể chọn được file khác ngoài csv. |
| CP-011 | GUI-048 | Product Management - CSV Import | Keyboard access/focus visible trên file input và nút Import. | Pass |  | Pass |  | Pass |  | File input bằng bàn phím là vùng browser-native dễ lệch. |
| CP-012 | GUI-058 | User Management | Responsive table ở viewport hẹp: bảng user có overflow/cơ chế cuộn rõ, không mất cột quan trọng. | Pass |  | Fail | `screenshots/firefox/GUI-FF-058-1.png`, `screenshots/firefox/GUI-FF-058-2.png` | Fail | `screenshots/safari/GUI-SF-058-1.png`, `screenshots/safari/GUI-SF-058-2.png` | Safari và Firefox trên BrowserStack ở viewport hẹp screen user management không thể cuộn ngang và bị mất chữ trong khi trên máy cá nhân thì cuộn ngang được. Bug report: `BUG-CP-012`, GitHub issue #203. |
| CP-013 | GUI-057 | User Management | Keyboard access/focus visible trong bảng user và nút Xóa. | Pass |  | Pass |  | Pass |  | Giống Chrome |
| CP-014 | GUI-059 | Admin Login | Compatibility smoke: Login page render đúng và thao tác cơ bản hoạt động trên browser mục tiêu. | Pass |  | Pass |  | Pass |  | Login page hoạt động tốt trên cả 3 browser. |
| CP-015 | GUI-060 | Product Management | Compatibility smoke: bảng sản phẩm, form, dropdown và CSV section không lệch layout/mất chức năng. | Pass |  | Pass |  | Pass |  | Các trang đều hoạt động tốt trên cả 3 browser. |

## Excluded From Cross-Platform Retest

| Excluded group | Examples | Why excluded |
| --- | --- | --- |
| Static text/heading semantics | `GUI-001`, `GUI-002`, `GUI-012`, `GUI-022`, `GUI-031`, `GUI-049`, `GUI-050` | Nội dung DOM/heading không phụ thuộc browser; Chrome baseline đủ đại diện. |
| Pure app-logic bugs | `GUI-028`, `GUI-041`, `GUI-055`, `GUI-056`, product update bug từ Task 2 | Thiếu confirmation/self-delete/product update là logic của app, không phải browser-native behavior. Chỉ retest nếu khi smoke test thấy hành vi khác Chrome. |
| Generic feedback states ít phụ thuộc browser | `GUI-009`, `GUI-018`, `GUI-019`, `GUI-026`, `GUI-039`, `GUI-046`, `GUI-053`, `GUI-054` | Loading/toast/empty/error state là app state; không cần retest hết nếu mục tiêu là khác biệt browser. |
| Backend/authentication smoke riêng | `GUI-007` | Đăng nhập admin hợp lệ chủ yếu xác nhận backend/authentication/cookie. Đã được cover đủ trong compatibility smoke `GUI-059`, nên không cần item riêng. |
| CSV parser/business validation | `GUI-045`, `GUI-047`, `HR-GUI-004` | Browser không quyết định CSV parser hoặc business validation. Nếu cùng source code chạy client-side parser/backend parser, kết quả thường giống nhau; chỉ giữ lại file picker/file input vì chúng phụ thuộc browser/OS. |
| Visual consistency thuần túy | màu nút, nhãn cột, format tĩnh | Nếu CSS render tổng thể ổn qua smoke/responsive item, không cần lặp từng lỗi visual đã có ở Chrome. |

## Execution Notes For BrowserStack

1. Chạy Firefox trước, sau đó Safari, dùng cùng Web Admin URL và cùng test data setup.
2. Điền `Firefox result`, `Firefox evidence`, `Safari result`, `Safari evidence` ngay trong bảng.
3. Result dùng `Pass`, `Fail`, `Blocked`, hoặc `Not Run`.
4. Chỉ lưu screenshot cho fail hoặc pass đại diện thật sự quan trọng; tránh chụp quá nhiều ảnh lặp.
5. Nếu Firefox/Safari khác Chrome baseline, ghi rõ browser-specific behavior trong `Ghi chú` và tạo bug report cross-platform riêng nếu là genuine bug.
