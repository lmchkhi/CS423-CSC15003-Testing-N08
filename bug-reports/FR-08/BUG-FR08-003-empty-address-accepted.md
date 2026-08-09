---
title: "[BUG][Checkout] Chấp nhận địa chỉ rỗng khi hồ sơ không có địa chỉ mặc định"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-003`

## Found by Test Case

`TC-FR08-DT-010`

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout API không từ chối `shipping_address=""` khi user không có địa chỉ mặc định và vẫn tạo order.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: user tạm mới không có địa chỉ mặc định; soft assertions xác nhận đồng thời response `200` và order count tăng `1`.
- Đã loại trừ environment issue: API hoạt động và hành vi giống nhau trên ba project.
- Số lần tái hiện: `9/9` quan sát độc lập có bằng chứng bền vững.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 15:32` |

## Tiền điều kiện

- User tạm role `user` không có địa chỉ mặc định.
- Giỏ có sản phẩm hợp lệ.

## Steps to reproduce

1. Tạo/login user tạm và thêm sản phẩm vào giỏ.
2. Ghi nhận số order hiện tại.
3. Gọi `POST /api/checkout` với `shipping_address=""`.
4. Gọi lại orders API và so sánh số order.

## Expected result

Checkout bị từ chối bằng response non-2xx và không tạo order.

## Actual result

API trả `200` và số order tăng `1`; Phase A quan sát order lưu địa chỉ rỗng.

## Severity / Priority

- Severity: `Major`
- Priority: `P1`
- Lý do: Tạo đơn không có địa chỉ giao hàng hợp lệ, ảnh hưởng trực tiếp fulfillment.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Trace | `N/A` | Trace tắt trong report public vì request trace chứa credential/token runtime |
| Network / result summary | `playwrite-test/FR-08-checkout/evidence/phase-a-api-results.md`, `phase-c-run.md`, `phase-d-run.md` | Response/order count thật |
| HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` | `DT-010` fail trên ba project |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`; suite API-only.
