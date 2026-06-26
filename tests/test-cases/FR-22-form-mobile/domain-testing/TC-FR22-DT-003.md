<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-003.md -->

# TC-FR22-DT-003: Ký hiệu `*` trên trường bắt buộc — Form Quên mật khẩu Bước 1 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable               | Type             | Domain / Constraints                                 |
| ---------------------- | ---------------- | ---------------------------------------------------- |
| Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc phải hiển thị `*` bên cạnh label |
| Form mục tiêu          | Categorical      | Form Quên MK Bước 1 (Email)                          |

### Domain Matrix

| TC     | Ký hiệu `*`       | Form       | Expected               |
| ------ | ----------------- | ---------- | ---------------------- |
| DT-003 | Kiểm tra hiển thị | Quên MK B1 | ✅ Trường Email có `*` |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng ở màn hình Đăng nhập

## Test data

| Field                  | Value                  |
| ---------------------- | ---------------------- |
| Không cần nhập dữ liệu | Chỉ quan sát giao diện |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn vào liên kết "Quên mật khẩu"
4. Quan sát màn hình Quên mật khẩu — Bước 1 (nhập Email)
5. Kiểm tra nhãn (label) của trường "Email" có ký hiệu `*` hay không

## Expected result

- Trường "Email" trên form Quên mật khẩu Bước 1 hiển thị nhãn có ký hiệu `*`

## Actual result

- Trường "Email" trên form Quên mật khẩu Bước 1 không hiển thị nhãn có ký hiệu `*` bên cạnh.

## Status

FAILED
