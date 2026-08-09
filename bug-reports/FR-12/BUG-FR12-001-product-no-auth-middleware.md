---
title: "[BUG][Access Control] Product mutation API không thực thi xác thực/phân quyền"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR12-001`

## Found by Test Case

`TC-FR12-DT-023`, `TC-FR12-DT-024`, `TC-FR12-DT-026`, `TC-FR12-DT-027`, `TC-FR12-DT-029`, `TC-FR12-DT-030`

## Requirement liên quan

`FR-12`, `SEC-02`, `SEC-03`

## Root cause chung

Quan sát hộp đen cho thấy `POST/PUT/DELETE /api/products` chấp nhận cả request không token và token role `user`; lớp kiểm soát xác thực/phân quyền không được thực thi tại biên API này.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: fixture khóa chính xác sáu TC-ID, expected giữ nguyên theo HW02 đã duyệt; direct API assertions tái hiện cùng status/body trên ba project.
- Đã loại trừ environment issue: backend và ba browser launch thành công; các control case admin `DT-025/028/031` pass trong cùng run.
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

- Backend EShop test đang chạy và database đã được seed.
- Với PUT/DELETE, tạo product tạm qua API công khai; không tác động product seed.
- Với partition role `user`, suite dùng tài khoản kiểm thử mặc định khai báo trực tiếp trong fixture JSON.

## Steps to reproduce

1. Gửi `POST /api/products` không có `Authorization`, với payload product tạm hợp lệ.
2. Lặp lại với token của account role `user`.
3. Lặp lại hai partition trên cho `PUT /api/products/:id` và `DELETE /api/products/:id` với resource tạm.
4. Quan sát status và response body.

## Expected result

Không token phải trả `401 Unauthorized`; token role `user` phải trả `403 Forbidden`. Product không được tạo, sửa hoặc xóa.

## Actual result

Cả sáu request trả `200`; product được tạo, sửa hoặc xóa tương ứng.

## Severity / Priority

- Severity: `Critical`
- Priority: `P0`
- Lý do: client chưa đăng nhập hoặc user thường có thể thay đổi catalog sản phẩm.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `playwrite-test/fr12-access/playwright-report/data/0c608f181ee7b99cc1a3bb7df5fd98febad1e891.png` | Web Admin login surface tại failure no-token; chi tiết response nằm trong HTML report/error context. |
| Trace / video | `N/A` | Trace và video per-test tắt; screenshot + error context được giữ. |
| Network / result summary | `playwrite-test/fr12-access/evidence/phase-a-api-results.md`, `phase-d-run.md` | Response thật; bí mật không ghi vào evidence. |
| HTML report | `playwrite-test/fr12-access/playwright-report/index.html` | Sáu TC-ID fail trên Chromium, Firefox và Edge. |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`
