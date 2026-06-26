<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-009.md -->

# TC-FR22-DT-009: Bàn phím Email — Form Quên mật khẩu Bước 1 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable            | Type               | Domain / Constraints                                                                                        |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Kiểu bàn phím Email | Categorical / Prop | Trường Email phải kích hoạt bàn phím email (`keyboardType="email-address"`). Web equivalent: `type="email"` |
| Form mục tiêu       | Categorical        | Form Quên mật khẩu — Bước 1                                                                                 |

### Domain Matrix

| TC     | Bàn phím      | Form       | Expected                    |
| ------ | ------------- | ---------- | --------------------------- |
| DT-009 | email-address | Quên MK B1 | ✅ Bàn phím email xuất hiện |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng ở màn hình Đăng nhập

## Test data

| Field                         | Value                                            |
| ----------------------------- | ------------------------------------------------ |
| Không cần nhập dữ liệu cụ thể | Chỉ quan sát bàn phím khi focus vào trường Email |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn vào liên kết "Quên mật khẩu"
4. Tại màn hình Quên mật khẩu — Bước 1, nhấn (tap) vào trường nhập "Email" để focus
5. Quan sát bàn phím ảo xuất hiện
6. Kiểm tra xem bàn phím có hiển thị phím `@` và `.` trực tiếp hay không

## Expected result

- Khi focus vào trường Email trên form Quên mật khẩu Bước 1, bàn phím ảo hiển thị dạng email
- Có phím `@` và `.` dễ truy cập
- Tương đương `keyboardType="email-address"` (Web: `type="email"`)

## Actual result

- Khi focus vào trường Email trên form Quên mật khẩu Bước 1, bàn phím ảo không hiển thị đúng dạng email, không có phím `@` và `.` trực tiếp.

## Status

FAILED
