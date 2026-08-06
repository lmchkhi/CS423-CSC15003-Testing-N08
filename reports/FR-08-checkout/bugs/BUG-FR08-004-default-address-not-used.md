---
title: "[BUG][Checkout] Không dùng địa chỉ mặc định khi thiếu shipping_address"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-004`

## Found by Test Case

`TC-FR08-DT-011`

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout API không lấy địa chỉ mặc định đã lưu trong hồ sơ khi request bỏ trường `shipping_address`.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: profile setup trả `200`; spec chỉ checkout sau khi setup thành công; expected dùng đúng fixture key `addresses.default`.
- Đã loại trừ environment issue: order detail API trả hợp lệ và actual `null` tái hiện trên ba project.
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

- User tạm role `user` có địa chỉ mặc định `456 Nguyen Hue, Q1, TP.HCM` đã được cập nhật thành công.
- Giỏ có sản phẩm hợp lệ.

## Steps to reproduce

1. Tạo/login user tạm.
2. Cập nhật hồ sơ với địa chỉ mặc định và xác nhận response `200`.
3. Thêm sản phẩm vào giỏ.
4. Checkout mà không gửi trường `shipping_address`, sau đó đọc order detail.

## Expected result

Order lưu địa chỉ mặc định từ hồ sơ.

## Actual result

Order lưu `shipping_address=null`.

## Severity / Priority

- Severity: `Major`
- Priority: `P2`
- Lý do: Đơn được tạo nhưng thiếu dữ liệu giao hàng dù hồ sơ có dữ liệu hợp lệ.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Trace | `N/A` | Trace tắt trong report public vì request trace chứa credential/token runtime |
| Network / result summary | `reports/FR-08-checkout/evidence/phase-a-api-results.md`, `phase-c-run.md`, `phase-d-run.md` | Profile `PUT 200`, order address `null` |
| HTML report | `reports/FR-08-checkout/playwright-report/index.html` | `DT-011` fail trên ba project |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`; suite API-only.
