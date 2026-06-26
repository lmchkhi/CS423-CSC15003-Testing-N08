<!-- tests/test-cases/FR-22-form-mobile/domain-testing/TC-FR22-DT-004.md -->

# TC-FR22-DT-004: Ký hiệu `*` trên trường bắt buộc — Form Đặt lại mật khẩu Bước 2 (Domain Testing)

## Requirement ID

FR-22

## Module / Test type / Technique

Form Requirements (Mobile) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable               | Type             | Domain / Constraints                                  |
| ---------------------- | ---------------- | ----------------------------------------------------- |
| Ký hiệu bắt buộc (`*`) | Boolean / Visual | Mỗi trường bắt buộc phải hiển thị `*` bên cạnh label  |
| Form mục tiêu          | Categorical      | Form Đặt lại MK Bước 2 (OTP, MK mới, Xác nhận MK mới) |

### Domain Matrix

| TC     | Ký hiệu `*`       | Form          | Expected                           |
| ------ | ----------------- | ------------- | ---------------------------------- |
| DT-004 | Kiểm tra hiển thị | Đặt lại MK B2 | ✅ Tất cả 3 trường bắt buộc có `*` |

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng Mobile đã được cài đặt
- Người dùng đã hoàn tất Bước 1 (nhập Email và nhận OTP)

## Test data

| Field          | Value          |
| -------------- | -------------- |
| Email (Bước 1) | test@eshop.com |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Điều hướng đến màn hình Quên mật khẩu
3. Nhập email `test@eshop.com` và gửi yêu cầu OTP (hoàn tất Bước 1)
4. Quan sát màn hình Đặt lại mật khẩu — Bước 2
5. Kiểm tra nhãn (label) của trường "OTP" có ký hiệu `*` hay không
6. Kiểm tra nhãn (label) của trường "Mật khẩu mới" có ký hiệu `*` hay không

## Expected result

- Trường "OTP" hiển thị nhãn có ký hiệu `*`
- Trường "Mật khẩu mới" hiển thị nhãn có ký hiệu `*`
- Trường "Xác nhận mật khẩu mới" hiển thị nhãn có ký hiệu `*`

## Actual result

- Các trường "OTP", "Mật khẩu mới" ở Bước 2 không hiển thị nhãn có ký hiệu `*` bên cạnh.

## Status

FAILED
