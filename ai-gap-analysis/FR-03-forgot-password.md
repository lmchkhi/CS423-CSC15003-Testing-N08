# AI Gap Analysis - FR-03 - Forgot Password and Password Reset

## Summary

Sau khi thực thi 18 test cases cho FR-03, có 5 nhóm lỗi chính được ghi nhận:

| Bug ID | Nội dung | Test cases liên quan |
| --- | --- | --- |
| BUG-FR03-001 | OTP chỉ có 4 chữ số thay vì 6 chữ số | DT-001, DT-011, DT-012, BVA-001 đến BVA-006 |
| BUG-FR03-002 | Thiếu nút Quay lại đăng nhập | DT-002 |
| BUG-FR03-003 | Email sai định dạng báo `User not found` | DT-004 |
| BUG-FR03-004 | Thiếu ô Xác nhận mật khẩu mới | DT-007, DT-008, DT-010, DT-011, DT-012, BVA-001 đến BVA-006 |
| BUG-FR03-005 | Frontend từ chối sai mật khẩu mạnh hợp lệ | DT-006, DT-008, DT-009, BVA-001, BVA-002, BVA-003, BVA-005, BVA-006 |

## AI Misses / Corrections

- AI ban đầu thiết kế TC-FR03-DT-001 như happy path nhưng chưa nhấn mạnh rằng OTP length cũng là điều kiện pass/fail của test này. Sau human review, test case được đổi từ Passed sang Failed vì OTP thực tế chỉ có 4 chữ số.
- AI tạo TC-FR03-DT-009 với giả định có thể chuẩn bị tài khoản thứ hai qua UI. Khi UI bị lỗi frontend password validation, tester không chạy được bằng UI. Sau đó AI kiểm tra lại bằng API và xác nhận rule OTP ownership hoạt động đúng ở backend.
- AI ban đầu không tách rõ lỗi frontend và backend cho mật khẩu mạnh. API verification cho thấy backend reset thành công với mật khẩu mạnh, còn frontend chặn request trước khi gửi API.

## Human Review Action

- Cập nhật `tests/test-runs/FR-03-forgot-password-run.md` với kết quả thực thi thật, Related Bug và note đã chuẩn hóa.
- Cập nhật `Status / Related bugs` trong từng file test case FR-03.
- Tạo 5 bug reports cho các lỗi FR-03.
- Cập nhật summary trong main report và README để phản ánh kết quả FR-03 đã thực thi.
