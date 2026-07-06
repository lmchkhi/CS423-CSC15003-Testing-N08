<!-- tests/test-runs/FR-16-import-run.md -->

# Test Run Summary: FR-16 Import Sản phẩm từ CSV

- **Date:** 2026-07-06
- **Tester:** Trần Minh Quang
- **Environment:** Windows, React + Vite (http://localhost:5174), Node + Express + SQLite (http://localhost:3000)

## Summary of Results

- **Total Test Cases:** 9
- **Passed:** 3
- **Failed:** 6
- **Blocked/Not Run:** 0
- **Pass Rate:** 33.3%

## Test Case Execution Details

| Test Case ID | Test Case Name | Status | Bug ID | Note |
| --- | --- | --- | --- | --- |
| TC-FR16-UC-001 | Import hợp lệ | PASSED | N/A | Dữ liệu hợp lệ được chèn vào DB thành công. |
| TC-FR16-UC-002 | Dữ liệu chứa dấu phẩy (RFC 4180) | FAILED | BUG-FR16-001 | Bị lệch cột dữ liệu khi split(",") dòng CSV. |
| TC-FR16-UC-003 | Sai định dạng đuôi file | FAILED | BUG-FR16-002 | Không kiểm tra đuôi file, hệ thống cố đọc bất kỳ file nào. |
| TC-FR16-UC-004 | Sai cấu trúc header dòng đầu | FAILED | BUG-FR16-003 | Không validate header, tự động chèn giá trị mặc định cho cột thiếu. |
| TC-FR16-UC-005 | Có dòng bị rỗng cột `name` | PASSED | N/A | Chặn thành công dòng trống tên ở backend. |
| TC-FR16-UC-006 | Có dòng price không hợp lệ | FAILED | BUG-FR16-004 | Cho phép chèn giá trị price <= 0 (giá trị âm). |
| TC-FR16-UC-007 | Rollback toàn bộ khi có 1 dòng lỗi | FAILED | BUG-FR16-005 | Không rollback, hàng trước vẫn được chèn mặc dù hàng sau lỗi. |
| TC-FR16-UC-008 | Payload độc hại (XSS / SQLi) | PASSED | N/A | Prepared statement và React tự động escape an toàn. |
| TC-FR16-UC-009 | CSV Formula Injection | FAILED | BUG-FR16-006 | Cho phép chèn công thức Excel không escape. |
