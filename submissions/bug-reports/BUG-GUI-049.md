---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][User Management] Màn hình quản lý người dùng chưa nhất quán ngôn ngữ tiếng Việt"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-049

## Requirement liên quan
SRS GUI-01 + FR-19

## Severity / Priority
Minor / P2

## Environment
Chrome, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới User Management / Người dùng.
3. Quan sát tiêu đề, các cột bảng, nhãn vai trò và hành động xóa.
4. So sánh ngôn ngữ hiển thị với yêu cầu giao diện tiếng Việt nhất quán.

## Expected result
Màn hình User Management dùng tiếng Việt nhất quán cho tiêu đề, cột bảng, nhãn vai trò và hành động xóa.

## Actual result
Tiêu đề và một số cột dùng tiếng Việt, nhưng cột `Role` và giá trị `admin/user` vẫn là tiếng Anh nên giao diện chưa nhất quán ngôn ngữ.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-056.png)
- Checklist row: `GUI-049`
