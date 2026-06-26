# Test Run: FR-01 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-01: Đăng ký tài khoản |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | Browser: Chrome 1xx · OS: Ubuntu 22.04 · URL: http://localhost:5173 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

### Domain Testing

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR01-DT-001 | Đăng ký thành công với tất cả dữ liệu hợp lệ | | Not Run | | |
| TC-FR01-DT-002 | Đăng ký với Họ Tên rỗng | | Not Run | | |
| TC-FR01-DT-003 | Đăng ký với Email rỗng | | Not Run | | |
| TC-FR01-DT-004 | Đăng ký với Email sai định dạng | | Not Run | | |
| TC-FR01-DT-005 | Đăng ký với Email đã tồn tại | | Not Run | | |
| TC-FR01-DT-006 | Đăng ký với Mật khẩu rỗng | | Not Run | | |
| TC-FR01-DT-007 | Đăng ký với Mật khẩu < 8 ký tự | | Not Run | | |
| TC-FR01-DT-008 | Đăng ký với Mật khẩu thiếu chữ hoa | | Not Run | | |
| TC-FR01-DT-009 | Đăng ký với Mật khẩu thiếu chữ thường | | Not Run | | |
| TC-FR01-DT-010 | Đăng ký với Mật khẩu thiếu chữ số | | Not Run | | |
| TC-FR01-DT-011 | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | | Not Run | | |
| TC-FR01-DT-012 | Đăng ký với Xác nhận mật khẩu không khớp | | Not Run | | |

### Boundary Value Analysis (BVA)

| Test Case ID | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-FR01-BVA-001 | Mật khẩu đúng 8 ký tự (ON — min) | | Not Run | | |
| TC-FR01-BVA-002 | Mật khẩu 7 ký tự (OFF⁻ — min-1) | | Not Run | | |
| TC-FR01-BVA-003 | Mật khẩu 9 ký tự (OFF⁺ — min+1) | | Not Run | | |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 0 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 15 |
| **Tổng** | **15** |

> **Ghi chú:** Khi Result = **Failed** hoặc **Blocked** → phải có **Related Bug** (link đến GitHub Issue) hoặc lý do rõ ràng trong cột **Note**.