# TC-FR01-BVA-001: Kiểm tra biên độ dài mật khẩu — đúng 8 ký tự (giá trị biên ON)

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable | Constraint | Boundary Type | BVA Points |
|---|---|---|---|
| password.length | Tối thiểu 8 ký tự | Min boundary | 7 (OFF⁻), **8 (ON)**, 9 (OFF⁺) |

### BVA Test Matrix

| TC | password | Độ dài | Boundary Point | Các ràng buộc khác | Expected |
|---|---|---|---|---|---|
| BVA-001 | Ab@1xxxx (8 chars) | 8 | ON (min) | Đủ chữ hoa, chữ thường, số, đặc biệt | ✅ Đăng ký thành công |
| BVA-002 | Ab@1xxx (7 chars) | 7 | OFF⁻ (min-1) | Đủ chữ hoa, chữ thường, số, đặc biệt | ❌ Mật khẩu không đủ mạnh |
| BVA-003 | Ab@1xxxxx (9 chars) | 9 | OFF⁺ (min+1) | Đủ chữ hoa, chữ thường, số, đặc biệt | ✅ Đăng ký thành công |

> **Ghi chú:** `x` đại diện cho ký tự chữ thường bất kỳ (ví dụ: `a`). Mỗi password đều đảm bảo có ≥1 chữ hoa, ≥1 chữ thường, ≥1 chữ số, ≥1 ký tự đặc biệt để isolate biến kiểm tra là độ dài.

## Preconditions
- Hệ thống EShop đang hoạt động
- User đang ở trang Đăng ký
- Email dùng để test chưa tồn tại trong hệ thống

## Test data
| Field | Value |
|---|---|
| Họ Tên | Nguyen Van A |
| Email | newuser_bva001@gmail.com |
| Mật khẩu | Ab@1aaaa |
| Xác nhận mật khẩu | Ab@1aaaa |

> Password `Ab@1aaaa` có đúng 8 ký tự: 1 chữ hoa (`A`), 2 chữ thường (`b`, `aaaa`), 1 chữ số (`1`), 1 ký tự đặc biệt (`@`).

## Test steps
1. Mở trang Đăng ký (`/register`)
2. Nhập Họ Tên: `Nguyen Van A`
3. Nhập Email: `newuser_bva001@gmail.com`
4. Nhập Mật khẩu: `Ab@1aaaa` (đúng 8 ký tự — giá trị biên ON)
5. Nhập Xác nhận mật khẩu: `Ab@1aaaa`
6. Bấm nút Đăng ký

## Expected result
Đăng ký thành công, hệ thống chuyển hướng đến trang Đăng nhập.

## Status / Related bugs
Not Run / None