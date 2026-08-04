---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Admin Login] Các trường bắt buộc không có dấu sao trong form đăng nhập"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-005

## Requirement liên quan
SRS GUI-02

## Severity / Priority
Minor / P3

## Environment
Chrome, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Mở trang Admin Login tại `http://localhost:5174/`.
2. Quan sát các trường Email và Password trên form đăng nhập.
3. Kiểm tra nhãn trường và ký hiệu `*` cho các trường bắt buộc.

## Expected result
Các trường bắt buộc trên form Admin Login có ký hiệu `*` cạnh nhãn tương ứng.

## Actual result
Form chỉ dùng placeholder, không có nhãn trường bắt buộc kèm ký hiệu `*` cho Email và Password.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-005.png)
- Checklist row: `GUI-005`
