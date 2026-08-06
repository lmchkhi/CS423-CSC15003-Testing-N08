---
title: "[BUG][Checkout] Backend tin cậy total_amount do client gửi"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-001`

## Found by Test Case

`TC-FR08-BVA-001`, `TC-FR08-DT-004`, `TC-FR08-DT-005`, `TC-FR08-DT-006`, `TC-FR08-DT-007`, `TC-FR08-DT-008`, `TC-FR08-DT-009`. Các case gộp `TC-FR08-BVA-002` và `TC-FR08-BVA-003` được truy vết lần lượt qua `DT-005` và `DT-004`.

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout API lưu `total_amount` do client cung cấp, kể cả giá trị âm, quá thấp, quá cao, thiếu hoặc sai kiểu, thay vì lấy tổng `12,000,000` đã quan sát từ giỏ.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: fixture dùng sản phẩm thật `6,000,000 × 2`; pre-cart assertion xác nhận tổng `12,000,000`; expected đã duyệt và cùng actual tái hiện sau refinement.
- Đã loại trừ environment issue: API và ba browser launch probe đều hoạt động; cùng hành vi xuất hiện trên Chromium, Firefox và Edge.
- Số lần tái hiện: `9/9` nhóm quan sát độc lập có bằng chứng bền vững (Phase A, hai business run Phase C, ba project Phase D và ba project rerun artifact-safe Phase E).

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `2026-08-06T03:55:40.572Z` |

## Tiền điều kiện

- User tạm role `user` đã đăng nhập.
- Giỏ có AirPods Pro 2, đơn giá `6,000,000`, số lượng `2`.

## Steps to reproduce

1. Qua API công khai, tạo user tạm, đăng nhập và thêm sản phẩm vào giỏ.
2. Xác nhận tổng giỏ là `12,000,000`.
3. Gọi `POST /api/checkout` lần lượt với `total_amount` từ các case nêu trên hoặc bỏ trường này.
4. Đọc order vừa tạo qua order detail API.

## Expected result

Order dùng tổng do backend tính từ giỏ: `12,000,000`.

## Actual result

Order lưu nguyên input client: `-1`, `1`, `0`, `-50000`, `99999999`, `null` hoặc string `"NaN"`.

## Severity / Priority

- Severity: `Critical`
- Priority: `P1`
- Lý do: Cho phép làm sai lệch trực tiếp giá trị tài chính của đơn hàng bằng dữ liệu client kiểm soát.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Trace | `N/A` | Trace tắt trong report public vì request trace chứa credential/token runtime |
| Network / result summary | `reports/FR-08-checkout/evidence/phase-a-api-results.md`, `phase-c-run.md`, `phase-d-run.md` | Không ghi credential/token |
| HTML report | `reports/FR-08-checkout/playwright-report/index.html` | Bảy TC-ID fail trên cả ba project |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A`; FR-08 suite API-only và report public không giữ request trace.
