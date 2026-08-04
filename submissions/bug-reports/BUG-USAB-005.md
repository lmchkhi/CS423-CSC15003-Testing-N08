---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Product Management] CSV import không phản hồi lỗi rõ với dữ liệu không hợp lệ"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
USAB-ADMIN-FLOW-P04

## Requirement liên quan
FR-16: Import Sản phẩm từ CSV - `price` phải là số dương; nếu có lỗi ở bất kỳ dòng nào, toàn bộ import phải rollback và hệ thống hiển thị báo cáo lỗi rõ ràng.

## Severity / Priority
Major / P1

## Environment
Web Admin URL `https://frontend-admin-livid-two.vercel.app/`, Macbook - Chrome, session P04.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Product Management / Sản phẩm.
3. Chọn chức năng import CSV.
4. Import file CSV có product với giá âm hoặc dữ liệu không hợp lệ.
5. Quan sát hệ thống có rollback và hiển thị lỗi theo dòng hay không.

## Expected result
Hệ thống chặn import, không thêm bất kỳ dòng nào và hiển thị báo cáo lỗi rõ ràng gồm dòng lỗi, trường lỗi và lý do.

## Actual result
Theo phản hồi P04, khi import sản phẩm với giá âm, participant không thấy thông báo lỗi rõ. Điều này làm admin không biết dữ liệu không hợp lệ đã bị chặn, được import một phần hay import thành công sai.

## Evidence
- Session note: `reports/usability/session-notes/session-notes-P04.md`, Probe Answers - Error recovery
- Related GUI checklist bug: `BUG-GUI-045`

## GitHub issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/202

## GitHub labels
- Type: Bug
- Status: New
- Module: Product Management
- Priority: P1
- Severity: Major
