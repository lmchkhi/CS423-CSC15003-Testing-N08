# Test Run: FR-03 — Quên mật khẩu & Đặt lại mật khẩu

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước) |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 · API: http://localhost:3000 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR03-DT-001 | Lấy OTP thành công với email đã đăng ký | Ngô Hồng Thanh | Passed | | |
| TC-FR03-DT-002 | Kiểm tra nút Quay lại đăng nhập ở bước lấy OTP | Ngô Hồng Thanh | Failed | | Không có nút quay lại |
| TC-FR03-DT-003 | Lấy OTP với email rỗng | Ngô Hồng Thanh | Passed | | |
| TC-FR03-DT-004 | Lấy OTP với email sai định dạng | Ngô Hồng Thanh | Failed | | Báo lỗi User not found chứ không phải email sai định dạng |
| TC-FR03-DT-005 | Lấy OTP với email chưa đăng ký | Ngô Hồng Thanh | Passed | | |
| TC-FR03-DT-006 | Đặt lại mật khẩu thành công với OTP hợp lệ | Ngô Hồng Thanh | Failed | | Báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." mặc dù mật khẩu đã thỏa mãn điều kiện (NewPass123!) |
| TC-FR03-DT-007 | Đặt lại mật khẩu khi chưa lấy OTP | Ngô Hồng Thanh | Not Run | | |
| TC-FR03-DT-008 | Đặt lại mật khẩu với OTP sai | Ngô Hồng Thanh | Not Run | | |
| TC-FR03-DT-009 | Không dùng OTP của email khác để đặt lại mật khẩu | Ngô Hồng Thanh | Not Run | | |
| TC-FR03-DT-010 | Đặt lại mật khẩu với mật khẩu mới yếu | Ngô Hồng Thanh | Not Run | | |
| TC-FR03-DT-011 | Đặt lại mật khẩu khi xác nhận mật khẩu không khớp | Ngô Hồng Thanh | Not Run | | |
| TC-FR03-DT-012 | Đặt lại mật khẩu với mật khẩu mới rỗng | Ngô Hồng Thanh | Not Run | | |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR03-BVA-001 | OTP đúng 6 chữ số (ON - độ dài OTP) | | Not Run | | |
| TC-FR03-BVA-002 | OTP 5 chữ số (OFF- - độ dài OTP) | | Not Run | | |
| TC-FR03-BVA-003 | OTP 7 chữ số (OFF+ - độ dài OTP) | | Not Run | | |
| TC-FR03-BVA-004 | Mật khẩu mới 7 ký tự (OFF- - min length) | | Not Run | | |
| TC-FR03-BVA-005 | Mật khẩu mới đúng 8 ký tự (ON - min length) | | Not Run | | |
| TC-FR03-BVA-006 | Mật khẩu mới 9 ký tự (OFF+ - min length) | | Not Run | | |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 0 |
| Failed | 0 |
| Blocked | 0 |
| Not Run | 18 |
| **Tổng** | **18** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** → phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
