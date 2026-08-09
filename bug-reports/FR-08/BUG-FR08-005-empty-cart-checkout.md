---
title: "[BUG][Checkout] Giỏ trống vẫn checkout và tạo order"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-005`

## Found by Test Case

`TC-FR08-DT-014` và `FR08-UI-README-004` — cùng xác minh giỏ trống không được tạo order, lần lượt qua API và Checkout UI thật.

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout API không kiểm tra giỏ có item trước khi tạo order.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: user tạm mới được tạo; precondition assertion xác nhận cart count bằng `0`; soft assertions xác nhận response `200` và order count tăng `1`.
- Đã loại trừ environment issue: cart/orders API hoạt động và cùng hành vi tái hiện trên ba project.
- Số lần tái hiện: `9/9` quan sát độc lập có bằng chứng bền vững.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 19:23` |

## Tiền điều kiện

- User tạm role `user` có giỏ được xác nhận rỗng.

## Steps to reproduce

1. Tạo/login user tạm và xác nhận `GET /api/cart` trả `0` item.
2. Ghi nhận số order hiện tại.
3. Gọi `POST /api/checkout` với dữ liệu checkout hợp lệ nhưng không thêm sản phẩm.
4. Gọi lại orders API và so sánh số order.

## Expected result

Checkout bị từ chối bằng response non-2xx và không tạo order.

## Actual result

API trả `200` và số order tăng `1`; Phase A quan sát order được tạo từ giỏ `0` item.

## Severity / Priority

- Severity: `Major`
- Priority: `P1`
- Lý do: Cho phép tạo order không có sản phẩm, làm sai dữ liệu giao dịch và quy trình fulfillment.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#230` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/230
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-08/[BUG][Checkout] Giỏ trống vẫn checkout và tạo order.png>)

![GitHub Issue #230](<../screenshots_issues/FR-08/[BUG][Checkout] Giỏ trống vẫn checkout và tạo order.png>)
