---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][User Management] Danh sách người dùng không có loading state khi đang tải"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-053

## Requirement liên quan
GUI_Testing state-based

## Severity / Priority
Minor / P2

## Environment
Chrome, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới User Management / Người dùng.
3. Mở hoặc refresh màn hình danh sách người dùng.
4. Quan sát trạng thái UI trong lúc danh sách đang tải.

## Expected result
Khi danh sách người dùng đang tải, giao diện hiển thị loading state thay vì bảng rỗng gây hiểu nhầm.

## Actual result
Không thấy loading state riêng khi mở danh sách người dùng trong phiên test. Giao diện có thể làm admin hiểu nhầm rằng danh sách đang rỗng hoặc đã tải xong.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-059.png)
- Checklist row: `GUI-053`
