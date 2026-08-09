---
title: "[BUG][Checkout] Không dùng địa chỉ mặc định khi thiếu shipping_address"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-004`

## Found by Test Case

`TC-FR08-DT-011` và `FR08-UI-README-005` — cùng xác minh order phải dùng địa chỉ mặc định, lần lượt qua API và thao tác Checkout UI thật.

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
| Thời điểm | `09/08/2026 19:23` |

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

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#229` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/229
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-08/[BUG][Checkout] Không dùng địa chỉ mặc định khi thiếu shipping_address.png>)

![GitHub Issue #229](<../screenshots_issues/FR-08/[BUG][Checkout] Không dùng địa chỉ mặc định khi thiếu shipping_address.png>)
