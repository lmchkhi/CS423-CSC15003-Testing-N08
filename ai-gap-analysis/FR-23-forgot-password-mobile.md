# AI Gap Analysis - FR-23 - Mobile Forgot Password and Password Reset

## Summary

Sau khi thực thi 18 test cases cho FR-23, có 4 nhóm lỗi được ghi nhận:

| Bug ID | Nội dung | Test cases liên quan |
| --- | --- | --- |
| BUG-FR23-001 | Mobile không hiển thị OTP demo, ô nhập OTP gợi ý 4 chữ số, API trả `resetToken` 4 chữ số thay vì 6 | TC-FR23-DT-001, TC-FR23-DT-006, TC-FR23-DT-009, TC-FR23-DT-010, TC-FR23-DT-011, TC-FR23-DT-012, TC-FR23-BVA-001, TC-FR23-BVA-005, TC-FR23-BVA-006 |
| BUG-FR23-002 | Mobile thiếu nút Quay lại đăng nhập ở bước lấy OTP | TC-FR23-DT-002 |
| BUG-FR23-003 | Email rỗng hoặc sai định dạng bị báo `User not found` thay vì lỗi required/format | TC-FR23-DT-003, TC-FR23-DT-004 |
| BUG-FR23-004 | Mobile thiếu ô Xác nhận mật khẩu mới ở bước đặt lại mật khẩu | TC-FR23-DT-006, TC-FR23-DT-007, TC-FR23-DT-008, TC-FR23-DT-010, TC-FR23-DT-011, TC-FR23-DT-012, TC-FR23-BVA-005, TC-FR23-BVA-006 |

| Technique | Designed | Executed | Passed | Failed | Blocked | Not Run |
| --- | --- | --- | --- | --- | --- | --- |
| Domain Testing | 12 | 12 | 5 | 5 | 2 | 0 |
| BVA | 6 | 6 | 3 | 3 | 0 | 0 |

## AI Misses / Corrections

- AI thiết kế đúng các miền chính của FR-23: email, OTP, trạng thái luồng, mật khẩu mới, confirm password và điều hướng mobile. Các test này đã phát hiện lỗi UI mobile và lỗi API/backend kế thừa từ FR-03.
- AI gap setup: trước khi tester chạy, mobile app còn hard-code `API_URL = "http://192.168.10.13:3000/api"`, khiến tester không thể test trên mạng hiện tại. Correction đã cập nhật `frontend-mobile/App.js` thành `http://172.20.10.3:3000/api`.
- AI chưa dự phòng trong test design rằng mobile UI có thể không hiển thị OTP demo, khiến TC-FR23-DT-009 và TC-FR23-DT-011 bị Blocked. Correction: ghi rõ nguyên nhân blocked và dùng API verification để phân biệt lỗi mobile UI với hành vi backend.
- API verification xác nhận: `POST /api/forgot-password` với `test@eshop.com` trả `200 OK` nhưng `resetToken` dài 4 chữ số; email rỗng/sai định dạng đều trả `404 User not found`; OTP 5/7 chữ số bị từ chối bằng `400 Invalid token or email`; mật khẩu 8/9 ký tự hợp lệ được backend chấp nhận khi có token hợp lệ.
- Sau API verification, mật khẩu `test@eshop.com` đã được restore về `Password123!`.

## Human Review Action

- Cập nhật `tests/test-runs/FR-23-forgot-password-mobile-run.md` với 8 Passed, 8 Failed, 2 Blocked, 0 Not Run.
- Cập nhật `Status / Related bugs` trong từng file test case FR-23.
- Tạo bug reports `BUG-FR23-001.md` đến `BUG-FR23-004.md`.
- Cập nhật summary trong `reports/main-report.md` và `README.md`.
