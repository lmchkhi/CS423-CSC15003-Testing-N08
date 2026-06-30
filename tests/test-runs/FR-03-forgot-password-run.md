# Test Run: FR-03 — Quên mật khẩu & Đặt lại mật khẩu

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước) |
| **Ngày thực thi** | 30/06/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 · API: http://localhost:3000 |
| **Build / Commit** | `c6a9ace` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR03-DT-001 | Lấy OTP thành công với email đã đăng ký | Ngô Hồng Thanh | Failed | BUG-FR03-001 | OTP được hiển thị là 4 chữ số chứ không phải 6 chữ số. API kiểm tra lại cũng trả `resetToken` 4 chữ số. |
| TC-FR03-DT-002 | Kiểm tra nút Quay lại đăng nhập ở bước lấy OTP | Ngô Hồng Thanh | Failed | BUG-FR03-002 | Không có nút quay lại đăng nhập. |
| TC-FR03-DT-003 | Lấy OTP với email rỗng | Ngô Hồng Thanh | Passed | | |
| TC-FR03-DT-004 | Lấy OTP với email sai định dạng | Ngô Hồng Thanh | Failed | BUG-FR03-003 | Báo lỗi `User not found` chứ không phải email sai định dạng. API kiểm tra lại cũng trả `404 User not found`. |
| TC-FR03-DT-005 | Lấy OTP với email chưa đăng ký | Ngô Hồng Thanh | Passed | | |
| TC-FR03-DT-006 | Đặt lại mật khẩu thành công với OTP hợp lệ | Ngô Hồng Thanh | Failed | BUG-FR03-005 | Báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." mặc dù mật khẩu hợp lệ (`NewPass123!`); frontend chặn nên không gửi API. API kiểm tra lại chấp nhận mật khẩu này. |
| TC-FR03-DT-007 | Đặt lại mật khẩu khi chưa lấy OTP | Ngô Hồng Thanh | Passed | BUG-FR03-004 | Expected chính đạt. Quan sát thêm: không có ô nhập xác nhận mật khẩu mới. |
| TC-FR03-DT-008 | Đặt lại mật khẩu với OTP sai | Ngô Hồng Thanh | Failed | BUG-FR03-004, BUG-FR03-005 | Không có ô xác nhận mật khẩu mới. Frontend báo sai lỗi mật khẩu yếu với `NewPass123!`, không thông báo OTP sai và không gửi API. API kiểm tra lại trả lỗi token/email khi OTP sai. |
| TC-FR03-DT-009 | Không dùng OTP của email khác để đặt lại mật khẩu | Ngô Hồng Thanh | Passed | BUG-FR03-005 | UI setup bị chặn khi tạo tài khoản bằng frontend do lỗi password validation. Đã kiểm tra lại bằng API với tài khoản tạm: OTP của email khác bị từ chối đúng. |
| TC-FR03-DT-010 | Đặt lại mật khẩu với mật khẩu mới yếu | Ngô Hồng Thanh | Passed | BUG-FR03-004 | Expected chính đạt. Quan sát thêm: không có ô xác nhận mật khẩu mới. |
| TC-FR03-DT-011 | Đặt lại mật khẩu khi xác nhận mật khẩu không khớp | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004 | Không có ô xác nhận mật khẩu mới nên không kiểm tra được mismatch; OTP được hiển thị là 4 chữ số chứ không phải 6 chữ số. |
| TC-FR03-DT-012 | Đặt lại mật khẩu với mật khẩu mới rỗng | Ngô Hồng Thanh | Passed | BUG-FR03-001, BUG-FR03-004 | Expected chính đạt. Quan sát thêm: không có ô xác nhận mật khẩu mới, OTP được hiển thị là 4 chữ số chứ không phải 6 chữ số. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR03-BVA-001 | OTP đúng 6 chữ số (ON - độ dài OTP) | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 | OTP hiển thị 4 chữ số không phải 6, không có ô xác nhận mật khẩu mới, không đổi mật khẩu mới được vì frontend báo sai lỗi mật khẩu yếu với `BvaPass123!`. |
| TC-FR03-BVA-002 | OTP 5 chữ số (OFF- - độ dài OTP) | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 | OTP hiển thị 4 chữ số không phải 6, không có ô xác nhận mật khẩu mới, frontend báo sai lỗi mật khẩu yếu với `BvaPass123!`, không báo lỗi OTP sai. API kiểm tra lại có từ chối OTP 5 chữ số. |
| TC-FR03-BVA-003 | OTP 7 chữ số (OFF+ - độ dài OTP) | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 | OTP hiển thị 4 chữ số không phải 6, không có ô xác nhận mật khẩu mới, frontend báo sai lỗi mật khẩu yếu với `BvaPass123!`. API kiểm tra lại có từ chối OTP 7 chữ số. |
| TC-FR03-BVA-004 | Mật khẩu mới 7 ký tự (OFF- - min length) | Ngô Hồng Thanh | Passed | BUG-FR03-001, BUG-FR03-004 | Expected chính đạt vì mật khẩu 7 ký tự bị từ chối. Quan sát thêm: OTP hiển thị 4 chữ số và không có ô xác nhận mật khẩu mới. |
| TC-FR03-BVA-005 | Mật khẩu mới đúng 8 ký tự (ON - min length) | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 | OTP hiển thị 4 chữ số, không có ô xác nhận mật khẩu mới, frontend báo sai lỗi mật khẩu yếu mặc dù `Ab1!abcd` hợp lệ. |
| TC-FR03-BVA-006 | Mật khẩu mới 9 ký tự (OFF+ - min length) | Ngô Hồng Thanh | Failed | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 | OTP hiển thị 4 chữ số, không có ô xác nhận mật khẩu mới, frontend báo sai lỗi mật khẩu yếu mặc dù `Ab1!abcde` hợp lệ. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 7 |
| Failed | 11 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **18** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** → phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
