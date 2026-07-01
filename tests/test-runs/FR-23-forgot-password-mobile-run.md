# Test Run: FR-23 - Quên mật khẩu & Đặt lại mật khẩu trên Mobile

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-23: Quên mật khẩu & Đặt lại mật khẩu trên Mobile |
| **Ngày thực thi** | 01/07/2026 |
| **Môi trường** | Mobile: React Native/Expo · OS: Ubuntu 22.04 · API: http://172.20.10.3:3000/api |
| **Build / Commit** | `8afc676` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR23-DT-001 | Mobile lấy OTP thành công với email đã đăng ký | Ngô Hồng Thanh | Failed | BUG-FR23-001 | Không hiển thị OTP trên giao diện, ô nhập OTP có ghi chú 4 chữ số. API verification: `POST /api/forgot-password` trả `200 OK` và có `resetToken` nhưng token dài 4 chữ số. |
| TC-FR23-DT-002 | Mobile có nút Quay lại đăng nhập ở bước lấy OTP | Ngô Hồng Thanh | Failed | BUG-FR23-002 | Không hiển thị nút Quay lại đăng nhập trên màn hình mobile. |
| TC-FR23-DT-003 | Mobile lấy OTP với email rỗng | Ngô Hồng Thanh | Failed | BUG-FR23-003 | Từ chối tạo OTP nhưng hiển thị lỗi `User not found`, không phải lỗi bắt buộc nhập email. API verification cũng trả `404 User not found`. |
| TC-FR23-DT-004 | Mobile lấy OTP với email sai định dạng | Ngô Hồng Thanh | Failed | BUG-FR23-003 | Hiển thị lỗi `User not found`, không phải lỗi định dạng email. API verification cũng trả `404 User not found`. |
| TC-FR23-DT-005 | Mobile lấy OTP với email chưa đăng ký | Ngô Hồng Thanh | Passed | | API verification với email chưa đăng ký trả `404 User not found`, phù hợp expected chính. |
| TC-FR23-DT-006 | Mobile đặt lại mật khẩu thành công với OTP hợp lệ | Ngô Hồng Thanh | Failed | BUG-FR23-001, BUG-FR23-004 | Không nhập được OTP hợp lệ do mobile không hiển thị OTP; form reset cũng thiếu ô xác nhận mật khẩu mới. |
| TC-FR23-DT-007 | Mobile không cho đặt lại mật khẩu khi chưa lấy OTP | Ngô Hồng Thanh | Passed | BUG-FR23-004 | Expected chính đạt: có thông báo OTP sai. Quan sát thêm: form chỉ có ô OTP, ô mật khẩu và nút đặt lại mật khẩu, không có ô xác nhận mật khẩu mới. |
| TC-FR23-DT-008 | Mobile đặt lại mật khẩu với OTP sai | Ngô Hồng Thanh | Passed | BUG-FR23-004 | Expected chính đạt: có thông báo OTP sai. Quan sát thêm: không có ô nhập xác nhận mật khẩu mới. |
| TC-FR23-DT-009 | Mobile không dùng OTP của email khác để đặt lại mật khẩu | Ngô Hồng Thanh | Blocked | BUG-FR23-001 | Không thể test qua mobile UI do ứng dụng không hiển thị OTP để chuẩn bị OTP của email khác. |
| TC-FR23-DT-010 | Mobile đặt lại mật khẩu với mật khẩu mới yếu | Ngô Hồng Thanh | Passed | BUG-FR23-001, BUG-FR23-004 | Expected chính đạt: hiển thị lỗi mật khẩu yếu. Quan sát thêm: OTP không hiển thị nên tester để trống OTP; form cũng thiếu ô xác nhận mật khẩu mới. |
| TC-FR23-DT-011 | Mobile đặt lại mật khẩu khi xác nhận mật khẩu không khớp | Ngô Hồng Thanh | Blocked | BUG-FR23-001, BUG-FR23-004 | Không thể test qua mobile UI do không hiển thị OTP và không có ô nhập xác nhận mật khẩu mới. |
| TC-FR23-DT-012 | Mobile đặt lại mật khẩu với mật khẩu mới rỗng | Ngô Hồng Thanh | Passed | BUG-FR23-001, BUG-FR23-004 | Expected chính đạt: hiển thị lỗi mật khẩu yếu/bắt buộc. Quan sát thêm: OTP không hiển thị nên tester để trống OTP; form cũng thiếu ô xác nhận mật khẩu mới. |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR23-BVA-001 | Mobile OTP đúng 6 chữ số (ON - độ dài OTP) | Ngô Hồng Thanh | Failed | BUG-FR23-001 | UI không hiển thị OTP, ô nhập OTP có ghi chú 4 chữ số. API verification: forgot-password trả `resetToken` dài 4 chữ số. |
| TC-FR23-BVA-002 | Mobile OTP 5 chữ số (OFF- - độ dài OTP) | Ngô Hồng Thanh | Passed | | Có thông báo lỗi OTP không hợp lệ. API verification với OTP 5 chữ số trả `400 Invalid token or email`. |
| TC-FR23-BVA-003 | Mobile OTP 7 chữ số (OFF+ - độ dài OTP) | Ngô Hồng Thanh | Passed | | Có thông báo lỗi OTP không hợp lệ. API verification với OTP 7 chữ số trả `400 Invalid token or email`. |
| TC-FR23-BVA-004 | Mobile mật khẩu mới 7 ký tự (OFF- - min length) | Ngô Hồng Thanh | Passed | | Mật khẩu ngắn hơn 8 ký tự bị từ chối đúng expected. |
| TC-FR23-BVA-005 | Mobile mật khẩu mới đúng 8 ký tự (ON - min length) | Ngô Hồng Thanh | Failed | BUG-FR23-001, BUG-FR23-004 | Không thông báo mật khẩu không hợp lệ nữa nhưng do mobile không hiển thị OTP nên không thể đổi mật khẩu. API verification với token backend hợp lệ chấp nhận mật khẩu 8 ký tự; đã restore mật khẩu mặc định sau khi kiểm tra. |
| TC-FR23-BVA-006 | Mobile mật khẩu mới 9 ký tự (OFF+ - min length) | Ngô Hồng Thanh | Failed | BUG-FR23-001, BUG-FR23-004 | Không thông báo mật khẩu không hợp lệ nữa nhưng do mobile không hiển thị OTP nên không thể đổi mật khẩu. API verification với token backend hợp lệ chấp nhận mật khẩu 9 ký tự; đã restore mật khẩu mặc định sau khi kiểm tra. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 8 |
| Failed | 8 |
| Blocked | 2 |
| Not Run | 0 |
| **Tổng** | **18** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
