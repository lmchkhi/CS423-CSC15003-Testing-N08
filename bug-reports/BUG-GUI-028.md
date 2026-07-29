---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Category Management] Xóa danh mục không có confirmation dialog"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-028

## Requirement liên quan
GUI_Testing risk-based + Usability heuristic

## Severity / Priority
Major / P1

## Environment
Chromium headless, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Category Management / Danh mục.
3. Bấm thao tác xóa trên một danh mục.
4. Quan sát giao diện có yêu cầu xác nhận trước khi xóa hay không.

## Expected result
Khi xóa danh mục, giao diện yêu cầu xác nhận trước khi thực hiện thao tác nguy hiểm.

## Actual result
Thao tác xóa danh mục không hiển thị confirmation dialog trước khi thực hiện hành động nguy hiểm.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-029.png)
- Checklist row: `GUI-028`
