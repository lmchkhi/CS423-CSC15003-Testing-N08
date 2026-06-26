<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-013.md -->

# TC-FR22-DT-013: Vị trí thông báo lỗi trên nút Submit — Form Đăng nhập (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type                | Domain / Constraints                                              |
| -------------------- | ------------------- | ----------------------------------------------------------------- |
| Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi phải xuất hiện TRÊN nút Submit, không phải bên dưới |
| Form mục tiêu        | Categorical         | Form Đăng nhập                                                    |

### Domain Matrix

| TC     | Vị trí lỗi      | Form      | Expected                           |
| ------ | --------------- | --------- | ---------------------------------- |
| DT-013 | Trên nút Submit | Đăng nhập | ✅ Lỗi hiển thị TRÊN nút Đăng nhập |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng chưa đăng nhập

## Test data

| Field    | Value      |
| -------- | ---------- |
| Email    | (để trống) |
| Mật khẩu | (để trống) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Đăng nhập
3. Để trống cả hai trường Email và Mật khẩu
4. Nhấn nút "Đăng nhập" (Submit)
5. Quan sát vị trí của thông báo lỗi validation xuất hiện trên màn hình
6. Xác định thông báo lỗi nằm TRÊN hay DƯỚI nút "Đăng nhập"

## Expected result

- Thông báo lỗi validation hiển thị **phía trên** nút "Đăng nhập" (Submit)
- Thông báo lỗi KHÔNG được hiển thị phía dưới nút Submit
- Vị trí lỗi trong layout: Error Text → Submit Button (từ trên xuống)

## Actual result

- Thông báo lỗi validation hiển thị **phía dưới** nút "Đăng nhập" (Submit)

## Status

FAILED
