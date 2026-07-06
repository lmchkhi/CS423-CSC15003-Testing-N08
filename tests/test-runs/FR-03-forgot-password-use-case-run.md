# Test Run: FR-03 - Quên mật khẩu & Đặt lại mật khẩu (Use Case Testing)

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước) |
| **Ngày thực thi** | 06/07/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 · API: http://localhost:3000 |
| **Build / Commit** | `d95418e` |

---

## Kết quả thực thi

### Use Case Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR03-UC-001 | Đặt lại mật khẩu thành công end-to-end | Ngô Hồng Thanh | Failed | BUG-FR03-UC-001, BUG-FR03-UC-002, BUG-FR03-UC-003, BUG-FR03-UC-005, BUG-FR03-UC-006 | Happy path không đạt: OTP sinh ra 4 chữ số, không thấy Step Indicator, không có nút Quay lại đăng nhập ở bước lấy OTP, bước reset thiếu trường xác nhận mật khẩu mới và frontend báo mật khẩu mạnh `NewPass123!` là yếu nên không gửi reset API. API kiểm tra riêng có thể reset bằng mật khẩu mạnh và sau test đã khôi phục `test@eshop.com` về `Test1234!`. |
| TC-FR03-UC-002 | Quay lại đăng nhập từ luồng quên mật khẩu | Ngô Hồng Thanh | Failed | BUG-FR03-UC-003 | Bước lấy OTP không có nút/liên kết Quay lại đăng nhập. Ở bước reset chỉ có nút quay lại bước lấy OTP, không phải quay về Login. |
| TC-FR03-UC-003 | Không lấy OTP khi email rỗng | Ngô Hồng Thanh | Passed | | Trên UI, trường email có validation bắt buộc nên không sinh OTP khi để trống. |
| TC-FR03-UC-004 | Không lấy OTP khi email sai định dạng | Ngô Hồng Thanh | Failed | BUG-FR03-UC-004 | Nhập `invalid-email` không sinh OTP nhưng hệ thống báo `User not found` thay vì lỗi định dạng email; API kiểm tra lại trả `404 User not found`. |
| TC-FR03-UC-005 | Không lấy OTP cho email chưa đăng ký | Ngô Hồng Thanh | Passed | | API trả `404 User not found` cho `fr03.uc.unregistered@example.com`; không sinh reset token. |
| TC-FR03-UC-006 | Không reset khi chưa lấy OTP hợp lệ | Ngô Hồng Thanh | Passed | | API `POST /api/reset-password` với token không hợp lệ trả `400 Invalid token or email`; mật khẩu không đổi. |
| TC-FR03-UC-007 | Không reset với OTP sai | Ngô Hồng Thanh | Failed | BUG-FR03-UC-005, BUG-FR03-UC-006 | Trên UI, flow không đi đến kiểm tra OTP sai vì thiếu trường confirm và frontend báo mật khẩu mạnh `NewPass123!` là yếu. API kiểm tra riêng với token sai trả `400 Invalid token or email`. |
| TC-FR03-UC-008 | Không dùng OTP của email khác để reset mật khẩu | Ngô Hồng Thanh | Passed | | Đã chuẩn bị tài khoản phụ `fr03.uc.other@example.com`; API từ chối dùng OTP của email phụ để reset `test@eshop.com` với `400 Invalid token or email`. |
| TC-FR03-UC-009 | Không reset với mật khẩu mới yếu | Ngô Hồng Thanh | Failed | BUG-FR03-UC-007 | API `POST /api/reset-password` chấp nhận `weakpass` và trả `200 Password reset successfully`, làm đổi mật khẩu dù password yếu. Sau test đã khôi phục `test@eshop.com` về `Test1234!`. |
| TC-FR03-UC-010 | Không reset khi xác nhận mật khẩu mới không khớp | Ngô Hồng Thanh | Failed | BUG-FR03-UC-005 | UI bước reset không có trường Xác nhận mật khẩu mới nên không thể nhập confirm mismatch và không thể kiểm tra rule này ở mức use case. |
| TC-FR03-UC-011 | Không reset khi mật khẩu mới rỗng | Ngô Hồng Thanh | Failed | BUG-FR03-UC-007 | API `POST /api/reset-password` chấp nhận `newPassword` rỗng và trả `200 Password reset successfully`. Sau test đã khôi phục `test@eshop.com` về `Test1234!`. |
| TC-FR03-UC-012 | Request OTP lại cho cùng email đã đăng ký | Ngô Hồng Thanh | Failed | BUG-FR03-UC-001 | API cho phép request OTP lại cùng email, nhưng cả các lần request đều sinh reset token 4 chữ số thay vì OTP hợp lệ 6 chữ số theo FR-03. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 4 |
| Failed | 8 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **12** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
