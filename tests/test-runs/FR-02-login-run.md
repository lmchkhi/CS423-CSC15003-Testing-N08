# Test Run: FR-02 - Đăng nhập và khóa tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-02: Đăng nhập và khóa tài khoản |
| **Ngày thực thi** | 01/07/2026 |
| **Môi trường** | Browser: Chrome Version 149.0.7827.103 · OS: macOS Tahoe 26.5.1 · Backend URL: `http://localhost:3000` · Frontend Web URL: `http://localhost:5173/` |
| **Build / Commit** | `a172955` |
| **Tester** | Người dùng tự thực thi và cung cấp Actual Result/Evidence |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR02-DT-001 | Đăng nhập thành công với tài khoản hợp lệ | Người dùng | Fail | Pending | Đăng nhập thành công nhưng API trả về toàn bộ dữ liệu user, bao gồm `password` dạng không mã hóa và các trường ẩn khác. Evidence: [TC-FR02-DT-001-password-in-api-response.png](../../bug-reports/screenshots/TC-FR02-DT-001-password-in-api-response.png). |
| TC-FR02-DT-002 | Từ chối email sai định dạng HTML5 | Người dùng | Fail | Pending | Ô email dùng `type="text"` nên browser không kiểm tra định dạng; nhập `abc` vẫn gửi được rồi mới hiện lỗi đăng nhập. Đồng thời ô mật khẩu cũng dùng `type="text"`. Evidence: [TC-FR02-DT-002-TC-FR02-DT-009-input-type-text.png](../../bug-reports/screenshots/TC-FR02-DT-002-TC-FR02-DT-009-input-type-text.png). |
| TC-FR02-DT-003 | Từ chối email đúng định dạng nhưng không tồn tại | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-DT-004 | Đăng nhập sai dưới ngưỡng khóa không khóa tài khoản | Người dùng | Fail | Pending | Tài khoản bị khóa chỉ sau 2 lần nhập sai mật khẩu; ở lần thử thứ 3, dù nhập đúng mật khẩu vẫn báo lỗi `Tài khoản bị khóa` và không đăng nhập được. Evidence: [TC-FR02-DT-004-TC-FR02-BVA-001-lock-after-two-failures.png](../../bug-reports/screenshots/TC-FR02-DT-004-TC-FR02-BVA-001-lock-after-two-failures.png). |
| TC-FR02-DT-005 | Khóa tài khoản sau 3 lần đăng nhập sai liên tiếp | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-DT-006 | Từ chối đăng nhập bằng mật khẩu đúng khi tài khoản đang bị khóa | Người dùng | Fail | Pending | Khi tài khoản bị khóa, frontend chỉ hiển thị `Đăng nhập thất bại`; API có trả về `Tài khoản đã bị khóa` nhưng frontend không hiển thị cho người dùng. Evidence: [TC-FR02-DT-006-lock-message-not-shown.png](../../bug-reports/screenshots/TC-FR02-DT-006-lock-message-not-shown.png). |
| TC-FR02-DT-007 | Đăng nhập lại thành công sau khi hết 30 giây tạm khóa | Người dùng | Fail | Pending | Thời gian khóa kéo dài khoảng 180 giây thay vì 30 giây; thử lại ở giây 30 và 31/33 vẫn báo tài khoản bị khóa, đến khoảng giây 180 mới đăng nhập được. Evidence: [0s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-0s.png), [30s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-30s.png), [33s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-33s.png), [180s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-180s.png). |
| TC-FR02-DT-008 | Từ chối đăng nhập khi email để trống | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-DT-009 | Từ chối đăng nhập khi mật khẩu để trống | Người dùng | Fail | Pending | Khi gõ mật khẩu, ký tự hiện rõ trên màn hình do ô input dùng `type="text"` thay vì `type="password"`. Evidence: [TC-FR02-DT-002-TC-FR02-DT-009-input-type-text.png](../../bug-reports/screenshots/TC-FR02-DT-002-TC-FR02-DT-009-input-type-text.png). |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR02-BVA-001 | Không khóa tài khoản sau 2 lần đăng nhập sai liên tiếp | Người dùng | Fail | Pending | Tài khoản bị khóa chỉ sau 2 lần nhập sai mật khẩu; lần thử tiếp theo bằng mật khẩu đúng vẫn bị báo `Tài khoản bị khóa`. Evidence: [TC-FR02-DT-004-TC-FR02-BVA-001-lock-after-two-failures.png](../../bug-reports/screenshots/TC-FR02-DT-004-TC-FR02-BVA-001-lock-after-two-failures.png). |
| TC-FR02-BVA-002 | Khóa tài khoản tại lần đăng nhập sai thứ 3 liên tiếp | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-BVA-003 | Tài khoản vẫn bị từ chối khi vượt ngưỡng 3 lần sai liên tiếp | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-BVA-004 | Không cho đăng nhập lại sau 29 giây kể từ khi bị khóa | Người dùng | Pass | None | Actual Result giống Expected Result theo xác nhận của tester. |
| TC-FR02-BVA-005 | Cho đăng nhập lại tại mốc 30 giây sau khi bị khóa | Người dùng | Fail | Pending | Ở mốc 30 giây sau khi khóa, hệ thống vẫn báo tài khoản bị khóa; thực tế phải chờ khoảng 180 giây mới đăng nhập lại được. Evidence: [30s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-30s.png), [180s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-180s.png). |
| TC-FR02-BVA-006 | Cho đăng nhập lại sau 31 giây kể từ khi bị khóa | Người dùng | Fail | Pending | Ở mốc sau 30 giây, tester thử lại tại khoảng 31/33 giây nhưng hệ thống vẫn báo tài khoản bị khóa; đến khoảng 180 giây mới đăng nhập được. Evidence: [33s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-33s.png), [180s](../../bug-reports/screenshots/TC-FR02-DT-007-TC-FR02-BVA-005-BVA-006-locktime-180s.png). |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---:|
| Passed | 6 |
| Failed | 9 |
| Blocked | 0 |
| Not Run | 0 |
| **Tổng** | **15** |

> **Ghi chú:** Các test case Fail hiện để **Related Bug = Pending** vì chưa tạo bug report riêng trong prompt này. Evidence đã được đổi tên và tham chiếu theo test case/nhóm hiện tượng.
