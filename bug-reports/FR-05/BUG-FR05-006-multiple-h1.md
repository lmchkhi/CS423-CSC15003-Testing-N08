---
title: "[BUG][FR-05 Semantics] Trang chủ render hai thẻ h1"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-006`

## Found by Test Case

`TC-FR05-DT-011`

## Requirement liên quan

`FR-05`

## Root cause chung

Trang chủ render cả heading danh sách và heading tổng số sản phẩm ở level 1, làm DOM có hai thẻ `<h1>` thay vì đúng một thẻ.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: case kiểm tra trực tiếp cấu trúc DOM bằng `locator('h1')`, đúng bề mặt đã duyệt; accessibility snapshot cũng ghi hai heading level 1 với text khác nhau.
- Đã loại trừ environment issue: received count `2` trên Chromium, Firefox và Edge sau khi danh sách đã tải.
- Số lần tái hiện: `3/3` browser projects.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Microsoft Edge `151.0.4129.72` |
| OS | Microsoft Windows NT `10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định qua UI/API công khai |
| Thời điểm | `09/08/2026 15:28` |

## Tiền điều kiện

- Trang chủ và danh sách sản phẩm đã tải.
- Canonical DT-011 = kiểm tra h1 đã được duyệt tại Phase B.

## Steps to reproduce

1. Mở trang chủ và chờ danh sách sản phẩm xuất hiện.
2. Quan sát heading hierarchy/accessibility tree.
3. Đếm phần tử DOM `h1`.

## Expected result

Trang chủ có đúng một `<h1>` không rỗng.

## Actual result

DOM có hai `<h1>`: `Danh sách sản phẩm` và `Hiển thị 5 sản phẩm`.

## Severity / Priority

- Severity: `Minor`
- Priority: `P3`
- Lý do: Vi phạm semantics/accessibility và requirement công khai nhưng không chặn chức năng tìm kiếm hoặc xem sản phẩm.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#225` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/225
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-05/[BUG][FR-05 Semantics] Trang chủ render hai thẻ h1.png>)

![GitHub Issue #225](<../screenshots_issues/FR-05/[BUG][FR-05 Semantics] Trang chủ render hai thẻ h1.png>)
