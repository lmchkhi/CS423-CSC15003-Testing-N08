# Test Run: FR-24 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-24: Đăng ký tài khoản (Mobile) |
| **Ngày thực thi** | DD/MM/YYYY |
| **Môi trường** | App: Expo Go · OS: iOS · Device: iPhone 16 Pro |
| **Build / Commit** | 85af3ba |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-24-001 | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ | | ⬜ Not Run | — | — |
| TC-FR-24-002 | Domain Testing | Đăng ký với Họ Tên rỗng | | ⬜ Not Run | — | — |
| TC-FR-24-003 | Domain Testing | Đăng ký với Email rỗng | | ⬜ Not Run | — | — |
| TC-FR-24-004 | Domain Testing | Đăng ký với Email sai định dạng (thiếu @) | | ⬜ Not Run | — | — |
| TC-FR-24-005 | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain) | | ⬜ Not Run | — | — |
| TC-FR-24-006 | Domain Testing | Đăng ký với Email đã tồn tại | | ⬜ Not Run | — | — |
| TC-FR-24-007 | Domain Testing | Đăng ký với Mật khẩu rỗng | | ⬜ Not Run | — | — |
| TC-FR-24-008 | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự) | | ⬜ Not Run | — | — |
| TC-FR-24-009 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa | | ⬜ Not Run | — | — |
| TC-FR-24-010 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường | | ⬜ Not Run | — | — |
| TC-FR-24-011 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số | | ⬜ Not Run | — | — |
| TC-FR-24-012 | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | | ⬜ Not Run | — | — |
| TC-FR-24-013 | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp | | ⬜ Not Run | — | — |
| TC-FR-24-014 | BVA | Mật khẩu đúng 8 ký tự (ON — min) | | ⬜ Not Run | — | — |
| TC-FR-24-015 | BVA | Mật khẩu 7 ký tự (OFF⁻ — min-1) | | ⬜ Not Run | — | — |
| TC-FR-24-016 | BVA | Mật khẩu 9 ký tự (OFF⁺ — min+1) | | ⬜ Not Run | — | — |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 0 |
| 🚫 Blocked | 0 |
| ⬜ Not Run | 16 |
| **Tổng** | **16** |
