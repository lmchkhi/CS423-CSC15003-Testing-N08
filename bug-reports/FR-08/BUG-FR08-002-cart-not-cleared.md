---
title: "[BUG][Checkout] Giỏ hàng không được xóa sau checkout thành công"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-002`

## Found by Test Case

`TC-FR08-DT-001`, `TC-FR08-DT-015` và `FR08-UI-README-003`. `DT-015` là case trùng được gộp vào assertion hậu điều kiện của `DT-001`; case UI tái hiện cùng root cause sau click thật trên frontend.

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout tạo order thành công nhưng không xóa item khỏi giỏ của user.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: user mới được tạo riêng; cart count được kiểm tra là `1` ngay trước checkout và expected hậu điều kiện là `0`.
- Đã loại trừ environment issue: checkout/order/cart API đều trả response hợp lệ và actual `1` tái hiện trên ba project.
- Số lần tái hiện: API baseline tái hiện ổn định; UI bổ sung tái hiện `3/3` project.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm gần nhất | `09/08/2026 15:32` |

## Tiền điều kiện

- User tạm role `user` có đúng một cart item.

## Steps to reproduce

1. Tạo user tạm và thêm AirPods Pro 2 vào giỏ; xác nhận cart count là `1`.
2. Đăng nhập qua web frontend và mở `/checkout`.
3. Click `Xác Nhận Thanh Toán`.
4. Xác nhận UI gửi `POST /api/checkout`, nhận `200` và hiển thị `Thanh toán thành công!`.
5. Gọi lại `GET /api/cart` bằng session của cùng user.

## Expected result

Giỏ rỗng sau checkout; cart count bằng `0`.

## Actual result

Giỏ vẫn còn item; cart count bằng `1`.

## Severity / Priority

- Severity: `Major`
- Priority: `P1`
- Lý do: State giỏ sai sau giao dịch có thể khiến người dùng đặt trùng ở lần checkout tiếp theo.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#227` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/227
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-08/[BUG][Checkout] Giỏ hàng không được xóa sau checkout thành công.png>)

![GitHub Issue #227](<../screenshots_issues/FR-08/[BUG][Checkout] Giỏ hàng không được xóa sau checkout thành công.png>)
