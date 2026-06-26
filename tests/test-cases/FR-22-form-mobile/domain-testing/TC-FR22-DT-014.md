<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-014.md -->

# TC-FR22-DT-014: Vị trí thông báo lỗi trên nút Submit — Form Đăng ký (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type                | Domain / Constraints                                              |
| -------------------- | ------------------- | ----------------------------------------------------------------- |
| Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi phải xuất hiện TRÊN nút Submit, không phải bên dưới |
| Form mục tiêu        | Categorical         | Form Đăng ký                                                      |

### Domain Matrix

| TC     | Vị trí lỗi      | Form    | Expected                         |
| ------ | --------------- | ------- | -------------------------------- |
| DT-014 | Trên nút Submit | Đăng ký | ✅ Lỗi hiển thị TRÊN nút Đăng ký |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field             | Value      |
| ----------------- | ---------- |
| Họ Tên            | (để trống) |
| Email             | (để trống) |
| Mật khẩu          | (để trống) |
| Xác nhận mật khẩu | (để trống) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng ký
3. Để trống tất cả các trường
4. Nhấn nút "Đăng ký" (Submit)
5. Quan sát vị trí của thông báo lỗi validation xuất hiện
6. Xác định thông báo lỗi nằm TRÊN hay DƯỚI nút "Đăng ký"

## Expected result

- Thông báo lỗi validation hiển thị **phía trên** nút "Đăng ký"
- Thông báo lỗi KHÔNG được hiển thị phía dưới nút Submit

## Actual result

- Thông báo lỗi validation hiển thị **phía trên** nút "Đăng ký"
- Thông báo lỗi KHÔNG được hiển thị phía dưới nút Submit

## Status

PASSED
