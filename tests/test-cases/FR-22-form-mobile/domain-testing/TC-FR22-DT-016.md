<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-016.md -->

# TC-FR22-DT-016: Vị trí thông báo lỗi trên nút Submit — Form Đặt lại MK Bước 2 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable             | Type                | Domain / Constraints                                              |
| -------------------- | ------------------- | ----------------------------------------------------------------- |
| Vị trí thông báo lỗi | Positional / Visual | Thông báo lỗi phải xuất hiện TRÊN nút Submit, không phải bên dưới |
| Form mục tiêu        | Categorical         | Form Đặt lại MK — Bước 2                                          |

### Domain Matrix

| TC     | Vị trí lỗi      | Form          | Expected                                  |
| ------ | --------------- | ------------- | ----------------------------------------- |
| DT-016 | Trên nút Submit | Đặt lại MK B2 | ✅ Lỗi hiển thị TRÊN nút Đặt lại mật khẩu |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã hoàn tất Bước 1 (nhận OTP)

## Test data

| Field                 | Value          |
| --------------------- | -------------- |
| Email (Bước 1)        | test@eshop.com |
| OTP                   | (để trống)     |
| Mật khẩu mới          | (để trống)     |
| Xác nhận mật khẩu mới | (để trống)     |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Thực hiện quy trình Quên mật khẩu — hoàn tất Bước 1 với email `test@eshop.com`
3. Tại màn hình Đặt lại mật khẩu — Bước 2
4. Để trống tất cả các trường (OTP, MK mới, Xác nhận MK)
5. Nhấn nút "Đặt lại mật khẩu" (Submit)
6. Quan sát vị trí thông báo lỗi

## Expected result

- Thông báo lỗi hiển thị **phía trên** nút "Đặt lại mật khẩu" hoặc **pop-up**

## Actual result

- Thông báo lỗi hiển thị dạng **pop-up** hoặc **toast notification** phía trên nút Submit (Đặt lại mật khẩu)

## Status

PASSED
