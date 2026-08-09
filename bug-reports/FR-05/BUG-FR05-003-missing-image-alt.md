---
title: "[BUG][FR-05 Product Card] Ảnh sản phẩm có alt rỗng"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-003`

## Found by Test Case

`TC-FR05-DT-009`

## Requirement liên quan

`FR-05`

## Root cause chung

Product card render ảnh sản phẩm với thuộc tính `alt=""` thay vì alt text mô tả sản phẩm. Ảnh placeholder quan sát được là ảnh sản phẩm chủ đích; bug chỉ liên quan accessible alternative text, không liên quan ảnh không tải.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: DOM locator trực tiếp quan sát một `img` trong mỗi card, `src` không rỗng và kích thước render lớn hơn 0; chỉ assertion alt text thất bại.
- Đã loại trừ environment issue: ba card mẫu có alt rỗng trên cả Chromium, Firefox và Edge; image network chỉ là diagnostic.
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

- Trang chủ có ít nhất ba product card với ảnh, tên và giá.
- `placehold.co` được người dùng duyệt là nguồn ảnh sản phẩm chủ đích.

## Steps to reproduce

1. Mở trang chủ.
2. Quan sát ba product card đầu và kiểm tra DOM/accessibility của ảnh.
3. Đối chiếu thuộc tính `alt` với tên/mô tả sản phẩm.

## Expected result

Mỗi ảnh có alt text không rỗng và mô tả sản phẩm.

## Actual result

Ảnh hiển thị đúng nội dung/kích thước, nhưng cả ba card mẫu có `alt=""` nên ảnh bị loại khỏi accessibility tree.

## Severity / Priority

- Severity: `Minor`
- Priority: `P2`
- Lý do: Vi phạm accessibility và requirement công khai, ảnh hưởng người dùng screen reader nhưng không chặn luồng mua hàng bằng thị giác.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#222` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/222
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-05/[BUG][FR-05 Product Card] Ảnh sản phẩm có alt rỗng.png>)

![GitHub Issue #222](<../screenshots_issues/FR-05/[BUG][FR-05 Product Card] Ảnh sản phẩm có alt rỗng.png>)
