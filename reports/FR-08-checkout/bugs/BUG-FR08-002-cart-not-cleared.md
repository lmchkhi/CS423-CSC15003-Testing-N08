---
title: "[BUG][Checkout] Giỏ hàng không được xóa sau checkout thành công"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-002`

## Found by Test Case

`TC-FR08-DT-001`, `TC-FR08-DT-015` — `DT-015` là case trùng được gộp vào assertion hậu điều kiện của `DT-001`.

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout tạo order thành công nhưng không xóa item khỏi giỏ của user.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: user mới được tạo riêng; cart count được kiểm tra là `1` ngay trước checkout và expected hậu điều kiện là `0`.
- Đã loại trừ environment issue: checkout/order/cart API đều trả response hợp lệ và actual `1` tái hiện trên ba project.
- Số lần tái hiện: `9/9` quan sát độc lập có bằng chứng bền vững.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `2026-08-06T03:55:40.572Z` |

## Tiền điều kiện

- User tạm role `user` có đúng một cart item.

## Steps to reproduce

1. Tạo/login user tạm và thêm AirPods Pro 2 vào giỏ.
2. Xác nhận cart count là `1`.
3. Checkout hợp lệ và xác nhận order được tạo.
4. Gọi lại `GET /api/cart`.

## Expected result

Giỏ rỗng sau checkout; cart count bằng `0`.

## Actual result

Giỏ vẫn còn item; cart count bằng `1`.

## Severity / Priority

- Severity: `Major`
- Priority: `P1`
- Lý do: State giỏ sai sau giao dịch có thể khiến người dùng đặt trùng ở lần checkout tiếp theo.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Trace | `N/A` | Trace tắt trong report public vì request trace chứa credential/token runtime |
| Network / result summary | `reports/FR-08-checkout/evidence/phase-a-api-results.md`, `phase-c-run.md`, `phase-d-run.md` | Pre/post cart count thật |
| HTML report | `reports/FR-08-checkout/playwright-report/index.html` | `DT-001` fail trên ba project |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`; suite API-only.
