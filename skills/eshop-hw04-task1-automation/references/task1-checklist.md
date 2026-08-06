# Checklist HW04 Task 1

## Phạm vi feature

- Tự động hóa đúng ba feature web đã làm ở HW02: FR-03, FR-11, FR-14.
- Không tính hoặc tự động hóa FR mobile.
- Mỗi feature cần tối thiểu 12 test case automated.

## Tiêu chí automation

- Dùng Playwright hoặc Selenium; ưu tiên Playwright.
- Dữ liệu test nằm trong file `.json` hoặc `.csv` riêng.
- Script có ít nhất ba assertion pattern khác nhau.
- Chạy trên ít nhất ba browser: Chromium, Firefox, WebKit hoặc Chrome, Edge, Firefox.
- Mỗi feature chạy đủ ba browser, tổng tối thiểu 9 browser runs.
- Mỗi cặp feature-browser có một HTML report riêng, không bị ghi đè bởi run khác.
- HTML report phải hiển thị `Run by: {StudentID}` và ISO timestamp.
- Có manifest hoặc bảng tổng hợp ghi đủ 9 dòng: feature, browser, command, exit code/status, report path, label verification.

## Tiêu chí review

- Nêu rõ phần AI sinh ra bị sai hoặc thiếu.
- Sửa các lỗi có trách nhiệm: selector mong manh, wait flaky, assertion yếu, dữ liệu hardcode, thiếu negative/edge case, lệch SRS/API.
- Không xem mã nguồn SUT khi xác định expected result; chỉ dùng SRS, API spec, UI/API runtime và test case manual.

## Evidence cần gom

- Automation scripts và data files.
- HTML reports đa browser.
- Log hoặc manifest chứng minh đã kiểm tra `Run by:` trong từng report.
- Screenshot khi có bug thật.
- Bug report Markdown và GitHub Issue nếu có defect.
- Bảng tổng kết: số feature, số case automated/executed/pass/fail, số browser run, số bug.
- AI audit log: tên AI tool, ngày giờ, prompt, output.
