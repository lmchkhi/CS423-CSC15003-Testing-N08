---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][Product Management] CSV import không có loading hoặc progress state"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
GUI-046

## Requirement liên quan
GUI_Testing state-based + FR-16

## Severity / Priority
Minor / P2

## Environment
Chromium headless, Web Admin URL `http://localhost:5174/`, Backend URL `http://localhost:3000`, thực thi theo checklist GUI.

## Steps to reproduce
1. Đăng nhập Web Admin bằng tài khoản admin hợp lệ.
2. Đi tới Product Management / Sản phẩm.
3. Mở section CSV import.
4. Chọn file CSV hợp lệ.
5. Bấm import.
6. Quan sát trạng thái UI trong lúc import đang xử lý.

## Expected result
Khi import đang xử lý, giao diện hiển thị loading/progress state và không cho bấm import lặp.

## Actual result
Không thấy progress/loading state rõ ràng cho quá trình import, nên admin không có phản hồi trực quan rằng import đang được xử lý.

## Evidence
- Screenshot: ![Screenshot](../reports/screenshots/gui-checklist/GUI-051.png)
- Checklist row: `GUI-046`
