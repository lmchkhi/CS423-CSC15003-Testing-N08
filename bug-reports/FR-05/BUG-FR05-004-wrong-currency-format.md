---
title: "[BUG][FR-05 Product Card] Giá dùng VND thay vì ký hiệu ₫"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-004`

## Found by Test Case

`TC-FR05-DT-009`, `TC-FR05-DT-012`

## Requirement liên quan

`FR-05`

## Root cause chung

Tất cả product card dùng chuỗi đơn vị `VND` thay vì ký hiệu `₫` mà requirement quy định. Phân cách hàng nghìn có xuất hiện; sai lệch chung là currency unit.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: locator được scope theo heading/card thật và pattern fixture yêu cầu số có phân cách hàng nghìn theo sau bởi `₫`; UI snapshot cho thấy cùng vị trí đang hiển thị `VND`.
- Đã loại trừ environment issue: cùng text giá trên Chromium, Firefox và Edge.
- Số lần tái hiện: `6/6` case–project runs (`2` TC-ID × `3` projects).

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Microsoft Edge `151.0.4129.72` |
| OS | Microsoft Windows NT `10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định qua UI/API công khai |
| Thời điểm | `09/08/2026 15:28` |

## Tiền điều kiện

- Trang chủ có ít nhất ba sản phẩm với giá từ 1.000 trở lên.
- Danh sách sản phẩm đã tải xong.

## Steps to reproduce

1. Mở trang chủ.
2. Quan sát giá trên ba product card đầu.
3. Đối chiếu đơn vị tiền tệ và phân cách hàng nghìn với FR-05.

## Expected result

Giá hiển thị ký hiệu `₫` và có phân cách hàng nghìn, ví dụ `30,000,000 ₫`.

## Actual result

Giá có phân cách hàng nghìn nhưng dùng `VND`, ví dụ `30,000,000 VND`.

## Severity / Priority

- Severity: `Minor`
- Priority: `P2`
- Lý do: Sai format hiển thị được quy định công khai trên toàn bộ product card, nhưng giá trị số vẫn đọc được.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#223` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/223
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-05/[BUG][FR-05 Product Card] Giá dùng VND thay vì ký hiệu ₫.png>)

![GitHub Issue #223](<../screenshots_issues/FR-05/[BUG][FR-05 Product Card] Giá dùng VND thay vì ký hiệu ₫.png>)
