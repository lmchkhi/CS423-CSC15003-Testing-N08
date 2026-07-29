---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Product Management] Giá sản phẩm không có phân cách hàng nghìn"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-032

## Requirement liên quan
SRS GUI-01 + FR-15

## Severity / Priority
Minor / P2

## Environment
Chromium headless, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Product Management / Sản phẩm.
3. Quan sát giá sản phẩm trong danh sách và khu vực form/preview nếu có.
4. Kiểm tra định dạng tiền Việt Nam và phân cách hàng nghìn.

## Expected result
Giá sản phẩm trong danh sách và form preview hiển thị theo định dạng tiền Việt Nam có `₫` và phân cách hàng nghìn.

## Actual result
Giá hiển thị dạng số thô như `30000000 ₫`, `28000000 ₫`, không có phân cách hàng nghìn.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-033.png)
- Checklist row: `GUI-032`
