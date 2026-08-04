---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Category Management] Submit danh mục rỗng vẫn gửi request"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-025

## Requirement liên quan
SRS GUI-02 + FR-14

## Severity / Priority
Major / P1

## Environment
Chrome, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Category Management / Danh mục.
3. Để trống trường Tên danh mục.
4. Submit form thêm danh mục.
5. Quan sát UI có chặn thao tác và hiển thị lỗi bắt buộc hay không.

## Expected result
Khi bỏ trống Tên danh mục và submit, lỗi bắt buộc hiển thị phía trên nút submit hoặc vị trí dễ thấy trước khi tạo mới.

## Actual result
Submit danh mục rỗng vẫn gửi request thay vì hiển thị lỗi bắt buộc rõ ràng trên UI trước khi submit.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-026.png)
- Checklist row: `GUI-025`
