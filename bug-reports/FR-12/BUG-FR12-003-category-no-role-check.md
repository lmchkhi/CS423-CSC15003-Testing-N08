---
title: "[BUG][Access Control] Category mutation API không từ chối token role user"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR12-003`

## Found by Test Case

`TC-FR12-DT-033`, `TC-FR12-DT-036`, `TC-FR12-DT-039`

## Requirement liên quan

`FR-12`, `SEC-03`

## Root cause chung

`POST/PUT/DELETE /api/categories` yêu cầu token nhưng không chặn token role `user`; đây là enforcement khác Product API vì control no-token `DT-032/035/038` đều trả `401`.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: mapping ba TC-ID và expected `403` được khóa trong fixture; resource category tạm được tạo/cleanup độc lập.
- Đã loại trừ environment issue: no-token và admin-token control cases pass trên cùng endpoint; actual `200` lặp lại trên ba project.
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

- Suite dùng tài khoản kiểm thử mặc định có role `user` được khai báo trực tiếp trong fixture JSON.
- PUT/DELETE dùng category runtime tạm, không tác động category seed.

## Steps to reproduce

1. Login bằng account role `user` và nhận token runtime.
2. Gửi `POST /api/categories` với `Authorization: Bearer <user_token>` và tên category tạm.
3. Lặp lại với `PUT /api/categories/:id` và `DELETE /api/categories/:id` trên resource tạm.
4. Quan sát status, body và side effect.

## Expected result

Ba request phải trả `403 Forbidden`; user thường không được mutate category.

## Actual result

Ba request trả `200`; category được tạo, sửa hoặc xóa.

## Severity / Priority

- Severity: `Critical`
- Priority: `P0`
- Lý do: user thường có thể thay đổi taxonomy catalog; lỗi áp dụng cho toàn bộ ba mutation method.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `playwrite-test/fr12-access/playwright-report/data/28f15bdcdc8f8a0691ad37bcaf231d6a29bf2278.png` | Web Admin từ chối user ở UI; response mutation category nằm trong HTML report/error context. |
| Trace / video | `N/A` | Trace và video per-test tắt; screenshot + error context được giữ. |
| Network / result summary | `playwrite-test/fr12-access/evidence/phase-a-api-results.md`, `phase-d-run.md` | Control no-token phân biệt root cause với Product API. |
| HTML report | `playwrite-test/fr12-access/playwright-report/index.html` | Ba TC-ID fail trên ba project. |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`
