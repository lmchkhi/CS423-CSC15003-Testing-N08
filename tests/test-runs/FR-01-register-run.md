# Test Run: FR-01 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-01: Đăng ký tài khoản |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | Browser: Zen Browser 1.21.3b (Firefox 152.0.1) · OS: Fedora 44 · URL: http://localhost:5173 |
| **Build / Commit** | `commit_hash` |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-01-001 | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ | Lâm Vĩ Khang | ❌ Failed | BUG-FR-01-001 | Thiếu trường "Xác nhận mật khẩu", không thể đăng ký |
| TC-FR-01-002 | Domain Testing | Đăng ký với Họ Tên rỗng | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-003 | Domain Testing | Đăng ký với Email rỗng | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-004 | Domain Testing | Đăng ký với Email sai định dạng (thiếu @) | Lâm Vĩ Khang | ❌ Failed | BUG-FR-01-002 | Email sai định dạng nhưng báo mật khẩu yếu |
| TC-FR-01-005 | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain) | Lâm Vĩ Khang | ❌ Failed | BUG-FR-01-003 | Email thiếu domain nhưng báo mật khẩu sai |
| TC-FR-01-006 | Domain Testing | Đăng ký với Email đã tồn tại | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-007 | Domain Testing | Đăng ký với Mật khẩu rỗng | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-008 | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự) | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-009 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-010 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-011 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-012 | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-013 | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-014 | BVA | Mật khẩu đúng 8 ký tự (ON — min) | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-015 | BVA | Mật khẩu 7 ký tự (OFF⁻ — min-1) | Lâm Vĩ Khang | ⬜ Not Run | — | — |
| TC-FR-01-016 | BVA | Mật khẩu 9 ký tự (OFF⁺ — min+1) | Lâm Vĩ Khang | ⬜ Not Run | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 3 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 13 |
| **Tổng** | **16** |
