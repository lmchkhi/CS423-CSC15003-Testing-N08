---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Product Management] Các trường bắt buộc trong form sản phẩm không được đánh dấu nhất quán"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-034

## Requirement liên quan
SRS GUI-02 + FR-15

## Severity / Priority
Minor / P3

## Environment
Chromium headless, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Product Management / Sản phẩm.
3. Quan sát form thêm/sửa sản phẩm.
4. Kiểm tra các trường Tên sản phẩm, Giá và Danh mục có ký hiệu `*` hay không.

## Expected result
Form thêm/sửa sản phẩm đánh dấu các trường bắt buộc Tên sản phẩm, Giá và Danh mục bằng ký hiệu `*`.

## Actual result
Form không hiển thị ký hiệu `*` cho các trường bắt buộc. Chỉ input Tên sản phẩm có `required`, còn Giá/Danh mục không được đánh dấu đầy đủ trên UI.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-036.png)
- Checklist row: `GUI-034`
