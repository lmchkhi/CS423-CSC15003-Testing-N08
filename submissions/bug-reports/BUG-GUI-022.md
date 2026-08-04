---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Category Management] Tiêu đề trang quản lý danh mục không được expose là h1"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-022

## Requirement liên quan
SRS GUI-01

## Severity / Priority
Minor / P3

## Environment
Chrome, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Category Management / Danh mục.
3. Kiểm tra heading structure bằng rendered DOM hoặc accessibility tree.
4. Xác định tiêu đề trang có được expose là `<h1>` hay không.

## Expected result
Màn hình Category Management có đúng một `<h1>` mô tả chức năng quản lý danh mục.

## Actual result
Thẻ `<h1>` duy nhất là `EShop Admin`. Tiêu đề trang `Quản lý Danh mục` đang là `h2`, nên màn hình không có tiêu đề chính riêng.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-022.png)
- Checklist row: `GUI-022`
