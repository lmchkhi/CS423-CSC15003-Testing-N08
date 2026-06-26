<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-015.md -->

# TC-FR22-DT-015: Vị trí thông báo lỗi trên nút Submit — Form Quên MK Bước 1 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type                | Domain / Constraints                                              |
| -------------------- | ------------------- | ----------------------------------------------------------------- |
| Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi phải xuất hiện TRÊN nút Submit, không phải bên dưới |
| Form mục tiêu        | Categorical         | Form Quên mật khẩu — Bước 1                                       |

### Domain Matrix

| TC     | Vị trí lỗi      | Form       | Expected                         |
| ------ | --------------- | ---------- | -------------------------------- |
| DT-015 | Trên nút Submit | Quên MK B1 | ✅ Lỗi hiển thị TRÊN nút Gửi OTP |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng ở màn hình Đăng nhập

## Test data

| Field | Value      |
| ----- | ---------- |
| Email | (để trống) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Nhấn liên kết "Quên mật khẩu"
4. Tại form Quên MK Bước 1, để trống trường Email
5. Nhấn nút "Gửi mã OTP" hoặc nút Submit tương ứng
6. Quan sát vị trí thông báo lỗi

## Expected result

- Thông báo lỗi hiển thị **phía trên** nút Submit (Lấy mã OTP) hoặc **pop-up**

## Actual result

- Thông báo lỗi hiển thị dạng **pop-up** hoặc **toast notification** phía trên nút Submit (Lấy mã OTP)

## Status

PASSED
