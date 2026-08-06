# FR-03: Quên mật khẩu và đặt lại mật khẩu

## Nguồn cần đọc

- `SystemRequirementsSpecification.md`, mục FR-03 và điều kiện mật khẩu của FR-01.
- `api_specification.md`, endpoint `POST /api/forgot-password` và `POST /api/reset-password`.
- `tests/test-cases/FR-03-forgot-password`.
- `tests/test-runs/FR-03-forgot-password-run.md`.
- `bug-reports/BUG-FR03-*.md` khi automation phát hiện lại defect.

## Requirement oracle

- Bước 1 nhập email đã đăng ký, sinh OTP 6 chữ số ngẫu nhiên và hiển thị trực tiếp ở môi trường demo.
- UI có step indicator, ví dụ `Bước 1 / 2`.
- UI có nút quay lại đăng nhập.
- Bước 2 nhập OTP, mật khẩu mới, xác nhận mật khẩu mới.
- Mật khẩu mới tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số, ký tự đặc biệt.
- Hai trường mật khẩu mới phải khớp.
- OTP chỉ hợp lệ cho đúng email đã yêu cầu.

## API liên quan

- `POST /api/forgot-password` body `{ "email": "test@eshop.com" }`.
- Response demo có `resetToken`; assertion theo SRS yêu cầu OTP 6 chữ số.
- `POST /api/reset-password` body `{ "email", "resetToken", "newPassword" }`.

## Case nên ưu tiên tự động hóa

- Domain: TC-FR03-DT-001 đến TC-FR03-DT-012.
- BVA: TC-FR03-BVA-001 đến TC-FR03-BVA-006 nếu cần đủ edge case.
- Đảm bảo trong 12 case có: email hợp lệ, email rỗng, email sai định dạng, email chưa đăng ký, OTP sai, OTP email khác, password yếu, password đúng boundary 8 ký tự, password confirmation mismatch.

## Bug đã biết từ HW02

- OTP có thể chỉ 4 chữ số thay vì 6.
- UI có thể thiếu nút quay lại đăng nhập.
- Email sai định dạng có thể báo `User not found`.
- UI có thể thiếu ô xác nhận mật khẩu mới.
- Frontend có thể báo mật khẩu yếu với password hợp lệ.

Viết assertion theo requirement đúng; nếu fail, ghi defect thay vì đổi expected cho khớp hành vi sai.
