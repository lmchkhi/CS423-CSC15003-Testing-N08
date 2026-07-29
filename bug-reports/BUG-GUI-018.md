---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Admin Dashboard] Dashboard không hiển thị loading state khi tải thống kê"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-018

## Requirement liên quan
GUI_Testing state-based

## Severity / Priority
Major / P2

## Environment
Chromium headless, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Mở hoặc refresh Admin Dashboard.
3. Quan sát các số liệu thống kê trong lúc dữ liệu đang được tải.

## Expected result
Khi dữ liệu thống kê đang tải, Dashboard hiển thị loading state thay vì vùng trống gây hiểu nhầm.

## Actual result
Không thấy loading state rõ ràng. Trong phiên test, Dashboard hiển thị trực tiếp `0 ₫` rồi sau đó mới cập nhật sang số liệu đúng, dễ gây hiểu nhầm dữ liệu ban đầu là hợp lệ.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-018.png)
- Checklist row: `GUI-018`
