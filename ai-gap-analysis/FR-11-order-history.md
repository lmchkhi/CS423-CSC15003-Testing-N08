# AI Gap Analysis - FR-11 - Order History View

## Summary

Sau khi thực thi 15 test cases cho FR-11, có 2 nhóm lỗi được ghi nhận:

| Bug ID | Nội dung | Test cases liên quan |
| --- | --- | --- |
| BUG-FR11-007 | User thường truy cập được chi tiết đơn hàng của user khác qua API `GET /api/orders/:id` | TC-FR11-DT-007 |
| BUG-FR11-012 | Badge trạng thái `Đã xác nhận` và `Đang giao` dùng màu xanh lam gần nhau, khó phân biệt bằng màu sắc | TC-FR11-DT-012 |

## AI Misses / Corrections

- AI thiết kế TC-FR11-DT-006 và TC-FR11-DT-007 với giả định có thể kiểm tra qua Web detail page hoặc API `GET /api/orders/:id`. Khi chạy thực tế, Web không có page chi tiết một đơn hàng, nên human review chuyển trọng tâm kiểm tra ownership sang API công khai theo `api_specification.md`.
- AI ban đầu chỉ ghi rủi ro "UI có pagination/filter/sort" trước khi test. Sau khi chạy, lỗi thực tế nằm ở authorization chi tiết đơn hàng và phân biệt màu status, nên AI gap được cập nhật theo bug thật thay vì assumption ban đầu.
- API verification xác nhận TC-FR11-DT-006 pass với own order (`GET /api/orders/16` trả `user_id = 2`) và TC-FR11-DT-007 fail với other user's order (`GET /api/orders/4` trả `200 OK`, `user_id = 1` cho token của `test@eshop.com`).

## Human Review Action

- Cập nhật `tests/test-runs/FR-11-order-history-run.md` với 13 Passed, 2 Failed, 0 Not Run.
- Cập nhật `Status / Related bugs` trong từng file test case FR-11.
- Tạo bug reports `BUG-FR11-007.md` và `BUG-FR11-012.md`.
- Cập nhật summary trong `reports/main-report.md` và `README.md`.
