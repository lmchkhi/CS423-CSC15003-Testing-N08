# Test Run: FR-24 — Đăng ký tài khoản

## Thông tin chung

| Field | Value |
|---|---|
| **Requirement** | FR-24: Đăng ký tài khoản (Mobile) |
| **Ngày thực thi** | 26/06/2026 |
| **Môi trường** | App: Expo Go · OS: iOS · Device: iPhone 16 Pro |
| **Build / Commit** | 85af3ba |

---

## Kết quả thực thi

| Test Case ID | Testing Technique | Mô tả | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|---|
| TC-FR-24-001 | Domain Testing | Đăng ký thành công với tất cả dữ liệu hợp lệ | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-002 | Domain Testing | Đăng ký với Họ Tên rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-003 | Domain Testing | Đăng ký với Email rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-004 | Domain Testing | Đăng ký với Email sai định dạng (thiếu @) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-005 | Domain Testing | Đăng ký với Email sai định dạng (thiếu domain) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-006 | Domain Testing | Đăng ký với Email đã tồn tại | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-007 | Domain Testing | Đăng ký với Mật khẩu rỗng | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-008 | Domain Testing | Đăng ký với Mật khẩu quá ngắn (< 8 ký tự) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-009 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ hoa | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-010 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ thường | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-011 | Domain Testing | Đăng ký với Mật khẩu thiếu chữ số | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-012 | Domain Testing | Đăng ký với Mật khẩu thiếu ký tự đặc biệt | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-013 | Domain Testing | Đăng ký với Xác nhận mật khẩu không khớp | Lâm Vĩ Khang | ❌ Failed | BUG-FR-24-001 | Không có trường Xác nhận mật khẩu nên hệ thống không thể kiểm tra trường hợp mật khẩu xác nhận không khớp |
| TC-FR-24-014 | BVA | Mật khẩu đúng 8 ký tự (ON — min) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-015 | BVA | Mật khẩu 7 ký tự (OFF⁻ — min-1) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |
| TC-FR-24-016 | BVA | Mật khẩu 9 ký tự (OFF⁺ — min+1) | Lâm Vĩ Khang | 🚫 Blocked | BUG-FR-24-001 | Không thể thực hiện đúng test steps vì màn hình đăng ký không có trường Xác nhận mật khẩu |

---

## Tổng kết

| Trạng thái | Số lượng |
|---|---|
| ✅ Passed | 0 |
| ❌ Failed | 1 |
| 🚫 Blocked | 15 |
| ⬜ Not Run | 0 |
| **Tổng** | **16** |
