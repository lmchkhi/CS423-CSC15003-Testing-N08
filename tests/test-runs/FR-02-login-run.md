# Test Run: FR-02 - Đăng nhập & Khóa tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-02: Đăng nhập & Khóa tài khoản |
| **Ngày thực thi** | 06/07/2026 |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 · API: http://localhost:3000 |
| **Build / Commit** | `29da7b0` |

---

## Kết quả thực thi

### State Transition Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR02-ST-001 | Đăng nhập thành công và sử dụng JWT token | Ngô Hồng Thanh | Passed | | |
| TC-FR02-ST-002 | Sai mật khẩu lần 1 chưa khóa tài khoản | Ngô Hồng Thanh | Passed | | |
| TC-FR02-ST-003 | Sai mật khẩu lần 2 liên tiếp vẫn chưa khóa tài khoản | Ngô Hồng Thanh | Failed | BUG-FR02-001, BUG-FR02-002 | Sau 2 lần sai, lần thứ 3 nhập đúng vẫn bị lỗi 403/bị cấm. Tài khoản còn bị khóa lâu hơn 30 giây, phải chạy lại backend để reset và tiếp tục test. |
| TC-FR02-ST-004 | Sai mật khẩu lần 3 liên tiếp khóa tài khoản 30 giây | Ngô Hồng Thanh | Passed | BUG-FR02-002 | Expected chính đạt vì tài khoản bị khóa sau lần sai thứ 3. Quan sát thêm: thời gian khóa lâu hơn 30 giây. |
| TC-FR02-ST-005 | Từ chối đăng nhập bằng mật khẩu đúng khi tài khoản đang bị khóa | Ngô Hồng Thanh | Passed | | |
| TC-FR02-ST-006 | Hết 30 giây khóa rồi đăng nhập lại thành công | Ngô Hồng Thanh | Failed | BUG-FR02-002 | Sau khi chờ hơn 30 giây, tài khoản vẫn bị khóa và không đăng nhập lại được. |
| TC-FR02-ST-007 | Email sai định dạng bị chặn trước khi submit login | Ngô Hồng Thanh | Failed | BUG-FR02-003 | UI vẫn gọi API login và API trả lỗi `Invalid email or password` thay vì chặn bằng HTML5 email validation trước khi submit. |
| TC-FR02-ST-008 | Sai 1 lần rồi đăng nhập đúng thành công | Ngô Hồng Thanh | Passed | | |
| TC-FR02-ST-009 | Sai 2 lần rồi đăng nhập đúng thành công trước khi bị khóa | Ngô Hồng Thanh | Failed | BUG-FR02-001 | Sau 2 lần sai, lần thứ 3 dùng credential đúng vẫn bị khóa thay vì đăng nhập thành công. |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| Passed | 5 |
| Failed | 4 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **9** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** -> phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.
