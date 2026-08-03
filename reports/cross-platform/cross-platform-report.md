# Task 3 - Cross-Browser / Cross-Platform Report

## Scope

Task 3 được thực hiện cho Web Admin EShop trên 3 browser/platform:

| Platform | Source / Environment | Status |
| --- | --- | --- |
| Chrome local | Kết quả Task 1 trong `reports/gui-checklist.md` | Completed baseline |
| Firefox 153 latest | BrowserStack, Mac device | Completed |
| Safari 27 latest | BrowserStack, Mac device | Completed |

Chrome local không test lại vì đã là baseline từ Task 1. Firefox và Safari được test trên BrowserStack bằng checklist rút gọn tại `reports/cross-platform/cross-platform-checklist.md`.

## Why This Checklist Is Focused

Task 1 có 65 GUI checklist items. Tuy nhiên, chạy lại toàn bộ 65 item trên Firefox và Safari sẽ tạo nhiều thao tác lặp nhưng không tăng nhiều giá trị phân tích, vì nhiều lỗi đã thấy trên Chrome là lỗi static DOM hoặc app logic, không phụ thuộc browser engine.

Các nhóm không cần retest toàn bộ gồm:

- Static text/heading semantics: ví dụ thiếu `<h1>`, nhãn tiếng Anh, tiêu đề trang. Đây là DOM/content issue; nếu Chrome đã thấy thì Firefox/Safari gần như sẽ giống.
- Pure app-logic bugs: thiếu confirmation dialog, self-delete admin, product update bug. Đây là logic của ứng dụng/backend/API, không phải khác biệt browser.
- Backend/authentication flow riêng: login admin hợp lệ chủ yếu xác nhận backend, authentication và cookie. Đã cover đủ bằng compatibility smoke item `GUI-059`.
- CSV parser/business validation: parser JavaScript/backend xử lý CSV giống nhau trên cùng source code; browser không trực tiếp quyết định RFC4180 hay validation thiếu `name`/`price`.
- Generic feedback states: loading/toast/empty/error state phần lớn phụ thuộc app state, không phải browser-native behavior.

Vì vậy, bộ cross-platform chỉ giữ 15 item có khả năng khác biệt lớn hơn giữa Chrome/Firefox/Safari:

- native validation: `type=email`, `required`, `type=number`, submit bằng Enter;
- native form controls: `select`, file picker, file input;
- focus/keyboard/accessibility: tab order, focus visible trong form và bảng;
- responsive/layout: Dashboard và User table ở viewport hẹp;
- file picker behavior: `accept=.csv`, keyboard access;
- compatibility smoke: Login page và Product Management render/function cơ bản.

## Result Summary

| Platform | Total selected items | Pass | Fail | Different from Chrome baseline |
| --- | ---: | ---: | ---: | ---: |
| Chrome local | 15 | 8 | 7 | Baseline |
| Firefox 153 latest on BrowserStack Mac | 15 | 7 | 8 | 1 |
| Safari 27 latest on BrowserStack Mac | 15 | 7 | 8 | 1 |

Hầu hết kết quả trên Firefox và Safari giống Chrome. Điểm khác biệt duy nhất là `CP-012` (`GUI-058`) ở màn hình User Management: Chrome local pass, nhưng Firefox và Safari trên BrowserStack fail.

## Detailed Findings

### CP-012 - User Management responsive table differs on BrowserStack Firefox/Safari

| Field | Detail |
| --- | --- |
| Source GUI item | `GUI-058` |
| Screen | User Management |
| Chrome baseline | Pass |
| Firefox 153 latest on BrowserStack Mac | Fail |
| Safari 27 latest on BrowserStack Mac | Fail |
| Firefox evidence | `reports/cross-platform/screenshots/firefox/GUI-FF-058-1.png`, `reports/cross-platform/screenshots/firefox/GUI-FF-058-2.png` |
| Safari evidence | `reports/cross-platform/screenshots/safari/GUI-SF-058-1.png`, `reports/cross-platform/screenshots/safari/GUI-SF-058-2.png` |

Observation: trên Chrome local, User Management table ở viewport hẹp vẫn có cơ chế cuộn ngang/hiển thị đủ để đọc và thao tác. Trên Firefox và Safari của BrowserStack, cùng nhóm kiểm tra responsive cho thấy table không cuộn ngang được như Chrome local và chữ bị mất/cắt, khiến các cột quan trọng khó đọc hoặc khó thao tác.

Impact: đây là lỗi cross-platform/responsive thật vì kết quả khác Chrome baseline và liên quan trực tiếp đến layout engine/viewport behavior. Module bị ảnh hưởng là User Management; mức độ nên xem là Major nếu admin dùng Firefox/Safari hoặc môi trường macOS BrowserStack với viewport hẹp.

Bug tracking:

- Bug report: `bug-reports/BUG-CP-012.md`
- GitHub issue: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/203
- Labels: `Type: Bug`, `Status: New`, `Module: User Management`, `Priority: P2`, `Severity: Major`

Recommendation:

- Bọc User Management table trong container có `overflow-x: auto`.
- Đặt `min-width` hợp lý cho table hoặc cột quan trọng.
- Kiểm tra lại trên Firefox/Safari bằng BrowserStack sau khi sửa.

## Same-As-Chrome Results

Các item còn lại có kết quả giống Chrome baseline:

- Fail giống Chrome: `CP-001`, `CP-003`, `CP-004`, `CP-006`, `CP-007`, `CP-008`, `CP-010`.
- Pass giống Chrome: `CP-002`, `CP-005`, `CP-009`, `CP-011`, `CP-013`, `CP-014`, `CP-015`.

Interpretation:

- Các lỗi fail giống Chrome là lỗi ứng dụng đã tồn tại ở baseline, không phải lỗi riêng Firefox/Safari.
- Các item pass giống Chrome xác nhận những phần có rủi ro cross-browser như focus/keyboard, file input keyboard access, login smoke và Product Management smoke vẫn hoạt động ổn định trên Firefox/Safari.

## Evidence

Checklist kết quả chi tiết nằm tại:

- `reports/cross-platform/cross-platform-checklist.md`

Screenshots được lưu tại:

- `reports/cross-platform/screenshots/firefox/`
- `reports/cross-platform/screenshots/safari/`

## Conclusion

Cross-platform testing cho thấy Firefox 153 latest và Safari 27 latest trên BrowserStack nhìn chung nhất quán với Chrome local baseline. Bộ 15 item được chọn đủ để phủ các vùng có khả năng khác biệt lớn giữa browser mà không lặp lại toàn bộ Task 1 một cách ít giá trị. Chỉ có một khác biệt đáng chú ý là responsive table ở User Management (`CP-012`/`GUI-058`), nơi Firefox và Safari fail trong khi Chrome local pass. Đây là finding cross-platform chính cần theo dõi và nên được sửa/verify lại trên BrowserStack.
