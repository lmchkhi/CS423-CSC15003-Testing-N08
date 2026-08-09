---
title: "[BUG][Access Control] Invalid token trả 403 thay vì 401"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR12-004`

## Found by Test Case

`TC-FR12-DT-002`

## Requirement liên quan

`FR-12`, `SEC-02`

## Root cause chung

Invalid token được từ chối bằng mã phân quyền `403 Forbidden` thay vì mã xác thực `401 Unauthorized` đã được duyệt cho partition token không hợp lệ.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: người dùng đã duyệt giữ expected duy nhất `401`; DT-002 là invalid-token case duy nhất và fixture không nới thành 401/403.
- Đã loại trừ environment issue: no-token `DT-001` trả đúng `401`, admin-token `DT-004` trả đúng `200`; invalid token tái hiện `403` trên ba project.
- Số lần tái hiện: `3/3` project.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium 151.0.7922.34; Firefox 153.0; Microsoft Edge 151.0.4129.72 |
| OS | Microsoft Windows 10.0.26200 |
| Frontend/Admin/API URL | `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 16:40` |

## Tiền điều kiện

- Backend EShop test đang chạy.
- Dùng chuỗi token giả không chứa credential hoặc JWT thật.

## Steps to reproduce

1. Gửi `GET /api/admin/users` với `Authorization: Bearer <invalid_token>`.
2. Quan sát response status và body.

## Expected result

HTTP `401 Unauthorized` với lỗi xác thực tương ứng.

## Actual result

HTTP `403 Forbidden` với body lỗi `Forbidden`.

## Severity / Priority

- Severity: `Minor`
- Priority: `P2`
- Lý do: request vẫn bị chặn nhưng status phân biệt authentication/authorization sai, ảnh hưởng client handling và tính nhất quán API.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#238` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/238
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-12/[BUG][Access Control] Invalid token trả 403 thay vì 401.png>)

![GitHub Issue #238](<../screenshots_issues/FR-12/[BUG][Access Control] Invalid token trả 403 thay vì 401.png>)
