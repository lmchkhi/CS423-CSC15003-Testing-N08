# TC-FR01-DT-001: Đăng ký thành công với tất cả dữ liệu hợp lệ (Domain Testing)

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| Họ Tên (name) | String | Bắt buộc, không được rỗng |
| Email | String | Bắt buộc, định dạng `user@domain.com`, duy nhất trong hệ thống |
| Mật khẩu (password) | String | Bắt buộc, tối thiểu 8 ký tự, ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt (`@$!%*?&`) |
| Xác nhận mật khẩu (confirmPassword) | String | Bắt buộc, phải khớp với Mật khẩu |

### Domain Matrix

| TC | name | email | password | confirmPassword | Expected |
|---|---|---|---|---|---|
| DT-001 | Valid | Valid (unique) | Valid (strong) | Khớp password | ✅ Đăng ký thành công |
| DT-002 | (rỗng) | Valid | Valid | Khớp password | ❌ Lỗi: Họ Tên bắt buộc |
| DT-003 | Valid | (rỗng) | Valid | Khớp password | ❌ Lỗi: Email bắt buộc |
| DT-004 | Valid | Sai định dạng | Valid | Khớp password | ❌ Lỗi: Email không hợp lệ |
| DT-005 | Valid | Đã tồn tại | Valid | Khớp password | ❌ Lỗi: Email đã được sử dụng |
| DT-006 | Valid | Valid | (rỗng) | (rỗng) | ❌ Lỗi: Mật khẩu bắt buộc |
| DT-007 | Valid | Valid | < 8 ký tự | Khớp password | ❌ Lỗi: Mật khẩu không đủ mạnh |
| DT-008 | Valid | Valid | Thiếu chữ hoa | Khớp password | ❌ Lỗi: Mật khẩu không đủ mạnh |
| DT-009 | Valid | Valid | Thiếu chữ thường | Khớp password | ❌ Lỗi: Mật khẩu không đủ mạnh |
| DT-010 | Valid | Valid | Thiếu chữ số | Khớp password | ❌ Lỗi: Mật khẩu không đủ mạnh |
| DT-011 | Valid | Valid | Thiếu ký tự đặc biệt | Khớp password | ❌ Lỗi: Mật khẩu không đủ mạnh |
| DT-012 | Valid | Valid | Valid | Không khớp | ❌ Lỗi: Xác nhận mật khẩu không khớp |

## Preconditions
- Hệ thống EShop đang hoạt động
- User đang ở trang Đăng ký
- Email dùng để test chưa tồn tại trong hệ thống (trừ DT-005)

## Test data
| Field | Value |
|---|---|
| Họ Tên | Nguyen Van A |
| Email | newuser_dt001@gmail.com |
| Mật khẩu | Abc@123456 |
| Xác nhận mật khẩu | Abc@123456 |

## Test steps
1. Mở trang Đăng ký (`/register`)
2. Nhập Họ Tên hợp lệ
3. Nhập Email hợp lệ (chưa tồn tại trong hệ thống)
4. Nhập Mật khẩu thỏa mãn yêu cầu mật khẩu mạnh
5. Nhập Xác nhận mật khẩu khớp với Mật khẩu
6. Bấm nút Đăng ký

## Expected result
Đăng ký thành công, hệ thống chuyển hướng đến trang Đăng nhập.

## Status / Related bugs
Not Run / None