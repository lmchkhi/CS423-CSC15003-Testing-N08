---
title: "[BUG][Access Control] Admin API không từ chối token role user"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR12-002`

## Found by Test Case

`TC-FR12-DT-003`, `TC-FR12-DT-006`, `TC-FR12-DT-009`, `TC-FR12-DT-012`, `TC-FR12-DT-015`, `TC-FR12-DT-018`, `TC-FR12-DT-021`

## Requirement liên quan

`FR-12`, `SEC-03`

## Root cause chung

Các endpoint `/api/admin/*` chấp nhận token hợp lệ của account role `user`; enforcement quan sát được chỉ xác nhận token mà không chặn role không phải admin.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: bảy expected `403` giữ nguyên theo bộ HW02 đã duyệt; token được lấy mới qua login và annotation/fixture ánh xạ đúng TC-ID.
- Đã loại trừ environment issue: no-token/admin-token control cases pass; cùng actual `200` tái hiện trên ba project và backend luôn đáp ứng.
- Số lần tái hiện: `3/3` project cho mỗi TC-ID.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium 151.0.7922.34; Firefox 153.0; Microsoft Edge 151.0.4129.72 |
| OS | Microsoft Windows 10.0.26200 |
| Frontend/Admin/API URL | `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 16:40` |

## Tiền điều kiện

- Account test mặc định có role `user` và được khai báo trực tiếp trong fixture JSON.
- Resource mutation dùng user/coupon/order tạm hoặc order ID 1 được reset/tạo lại theo precondition đã duyệt.

## Steps to reproduce

1. Login bằng account kiểm thử mặc định có role `user`; token không được ghi vào artifact.
2. Gửi request với `Authorization: Bearer <user_token>` tới các endpoint được liệt kê trong bảy TC-ID.
3. Với mutation, dùng resource tạm hoặc order 1 đã được tái tạo.
4. Quan sát status, response body và side effect.

## Expected result

Mọi request phải trả `403 Forbidden`; user thường không được đọc hoặc mutate tài nguyên admin.

## Actual result

Mọi request trả `200`; dữ liệu được đọc hoặc mutation được thực hiện.

## Severity / Priority

- Severity: `Critical`
- Priority: `P0`
- Lý do: user thường có thể đọc users/orders và thực hiện các thao tác quản trị trên toàn bộ nhóm Admin API.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#235` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/235
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-12/[BUG][Access Control] Admin API không từ chối token role user.png>)

![GitHub Issue #235](<../screenshots_issues/FR-12/[BUG][Access Control] Admin API không từ chối token role user.png>)
