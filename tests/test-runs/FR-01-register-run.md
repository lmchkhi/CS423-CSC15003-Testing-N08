# Test Run: FR-01 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-01: Đăng ký tài khoản |
| **Ngày thực thi** | 24/06/2026 |
| **Môi trường** | Browser: Zen Browser 1.21.3b (Firefox 152.0.1) · OS: Fedora 44 · URL: http://localhost:5173/register |
| **Build / Commit** | 85af3ba |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-01-001 | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể hoàn thành flow đăng ký |
| TC-FR-01-002 | Domain Testing | Đăng ký với Họ Tên rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-003 | Domain Testing | Đăng ký với Email rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-004 | Domain Testing | Đăng ký với Email sai định dạng (thiếu @) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-005 | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-006 | Domain Testing | Đăng ký với Email đã tồn tại | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-007 | Domain Testing | Đăng ký với Mật khẩu rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-008 | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-009 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-010 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-011 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-012 | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-013 | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi |
| TC-FR-01-014 | BVA | Mật khẩu đúng 8 ký tự (ON — min) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-015 | BVA | Mật khẩu 7 ký tự (OFF⁻ — min-1) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |
| TC-FR-01-016 | BVA | Mật khẩu 9 ký tự (OFF⁺ — min+1) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể thực thi đúng test steps |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 0 |
| 🚫 Blocked | 16 |
| ⬜ Not Run | 0 |
| **Tổng** | **16** |

---

## Ghi chú

- Tất cả 16 test case đều bị **Blocked** bởi BUG-FR-01-001: trang Đăng ký thiếu trường "Xác nhận mật khẩu". Vì test steps của mọi TC đều yêu cầu nhập trường này để hoàn thành flow đăng ký, không TC nào có thể thực thi đúng.
- BUG-FR-01-002 và BUG-FR-01-003 đã được loại bỏ — các hiện tượng trước đó (báo lỗi mật khẩu yếu sai, validate email không đúng) không thể xác nhận là bug riêng biệt khi flow đăng ký đã bị block từ đầu do thiếu trường bắt buộc.
- Cần retest toàn bộ sau khi BUG-FR-01-001 được fix.
